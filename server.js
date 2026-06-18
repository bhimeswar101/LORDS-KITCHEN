const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Load environment variables from .env file if it exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const parts = trimmed.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
          process.env[key] = value;
        }
      }
    });
  } catch (err) {
    console.error('Error loading .env file:', err);
  }
}

const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

const DEFAULT_TABLES = [
  { id: 1, number: "T-01", seats: "2 seats", section: "Main Dining Hall" },
  { id: 2, number: "T-02", seats: "4 seats", section: "Main Dining Hall" },
  { id: 3, number: "T-03", seats: "2 seats", section: "Main Dining Hall" },
  { id: 4, number: "T-04", seats: "6 seats", section: "Main Dining Hall" },
  { id: 5, number: "T-05", seats: "2 seats", section: "Garden Terrace" },
  { id: 6, number: "T-06", seats: "4 seats", section: "Garden Terrace" },
  { id: 7, number: "T-07", seats: "4 seats", section: "Garden Terrace" },
  { id: 8, number: "T-08", seats: "6 seats", section: "Garden Terrace" },
  { id: 9, number: "VIP-1", seats: "2 seats", section: "Chef's Counter VIP" },
  { id: 10, number: "VIP-2", seats: "2 seats", section: "Chef's Counter VIP" },
  { id: 11, number: "VIP-3", seats: "2 seats", section: "Chef's Counter VIP" },
  { id: 12, number: "VIP-4", seats: "4 seats", section: "Chef's Counter VIP" }
];

const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

// Supabase configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const IS_SUPABASE_CONFIGURED = !!(SUPABASE_URL && SUPABASE_KEY);

if (IS_SUPABASE_CONFIGURED) {
  console.log('Production Database: Supabase Cloud connected.');
} else {
  console.log('Production Database: Using local bookings.json fallback store.');
}

// Session security configurations
const SESSION_SECRET = process.env.SESSION_SECRET || 'bhim-kitchen-super-secret-key-12345';
const SETTINGS_FILE = path.join(__dirname, 'settings.json');

// Initialize settings structure helper
function loadSettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
      const config = JSON.parse(data || '{}');
      let updated = false;
      if (!config.adminPassword) {
        config.adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        updated = true;
      }
      if (!config.adminEmail) {
        config.adminEmail = 'bhimeswarbhimeswar@gmail.com';
        updated = true;
      }
      if (updated) {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(config, null, 2));
      }
      return config;
    } else {
      const config = {
        adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
        adminEmail: 'bhimeswarbhimeswar@gmail.com'
      };
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(config, null, 2));
      return config;
    }
  } catch (err) {
    console.error('Error loading settings:', err);
    return { adminPassword: 'admin123', adminEmail: 'bhimeswarbhimeswar@gmail.com' };
  }
}

// Get dynamic admin password
function getAdminPassword() {
  return loadSettings().adminPassword;
}

// Get dynamic admin email
function getAdminEmail() {
  return loadSettings().adminEmail;
}

// Save dynamic admin settings
function saveAdminSettings(password, email) {
  try {
    const config = loadSettings();
    if (password !== undefined) {
      config.adminPassword = password;
    }
    if (email !== undefined) {
      config.adminEmail = email;
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(config, null, 2));
    return true;
  } catch (err) {
    console.error('Error saving settings:', err);
    return false;
  }
}

// Cookie parser helper
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });
  return cookies;
}

// Generate secure session token: "expires.signature"
function generateToken() {
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const hmac = crypto.createHmac('sha256', SESSION_SECRET);
  hmac.update(expires.toString());
  const signature = hmac.digest('hex');
  return `${expires}.${signature}`;
}

// Verify token
function verifyToken(token) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [expiresStr, signature] = parts;
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || expires < Date.now()) return false;

  const hmac = crypto.createHmac('sha256', SESSION_SECRET);
  hmac.update(expiresStr);
  const expectedSignature = hmac.digest('hex');

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (e) {
    return false;
  }
}

// Check if a request contains a valid admin session cookie
function isAuthenticated(req) {
  const cookies = parseCookies(req.headers.cookie);
  return verifyToken(cookies['admin_session']);
}

// Helper to make native fetch requests to Supabase REST API
async function supabaseFetch(pathStr, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1${pathStr}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    ...options.headers
  };
  
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Supabase Error (${response.status}): ${errText}`);
  }
  return response.json();
}

// Local File Read Helper
function readBookingsLocal() {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) {
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading local bookings:', err);
    return [];
  }
}

// Local File Write Helper
function writeBookingsLocal(bookings) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing local bookings:', err);
    return false;
  }
}

// Abstraction Layer: Read all bookings
async function getBookings() {
  if (IS_SUPABASE_CONFIGURED) {
    try {
      return await supabaseFetch('/bookings?select=*');
    } catch (err) {
      console.error('Supabase getBookings failed, falling back to local file:', err);
      return readBookingsLocal();
    }
  } else {
    return readBookingsLocal();
  }
}

// Abstraction Layer: Read active bookings for slot
async function getActiveBookingsForSlot(date, time) {
  if (IS_SUPABASE_CONFIGURED) {
    try {
      return await supabaseFetch(`/bookings?select=*&date=eq.${date}&time=eq.${time}&status=neq.cancelled`);
    } catch (err) {
      console.error('Supabase active bookings check failed, falling back to local file:', err);
      const bookings = readBookingsLocal();
      return bookings.filter(b => b.date === date && b.time === time && b.status !== 'cancelled');
    }
  } else {
    const bookings = readBookingsLocal();
    return bookings.filter(b => b.date === date && b.time === time && b.status !== 'cancelled');
  }
}

// Abstraction Layer: Insert new booking
async function insertBooking(booking) {
  if (IS_SUPABASE_CONFIGURED) {
    try {
      await supabaseFetch('/bookings', {
        method: 'POST',
        body: JSON.stringify(booking)
      });
      return true;
    } catch (err) {
      console.error('Supabase insertBooking failed:', err);
      return false;
    }
  } else {
    const bookings = readBookingsLocal();
    bookings.push(booking);
    return writeBookingsLocal(bookings);
  }
}

// Abstraction Layer: Cancel booking
async function cancelBookingInDb(id, code) {
  if (IS_SUPABASE_CONFIGURED) {
    try {
      const query = id ? `id=eq.${id}` : `code=eq.${code}`;
      await supabaseFetch(`/bookings?${query}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'cancelled' })
      });
      return true;
    } catch (err) {
      console.error('Supabase cancelBooking failed:', err);
      return false;
    }
  } else {
    const bookings = readBookingsLocal();
    const booking = bookings.find(b => b.code === code || b.id === id);
    if (!booking) return false;
    booking.status = 'cancelled';
    return writeBookingsLocal(bookings);
  }
}

// Abstraction Layer: Get booking by code
async function getBookingByCode(code) {
  if (IS_SUPABASE_CONFIGURED) {
    try {
      const results = await supabaseFetch(`/bookings?select=*&code=eq.${code}`);
      return results && results[0] ? results[0] : null;
    } catch (err) {
      console.error('Supabase getBookingByCode failed, falling back to local file:', err);
      const bookings = readBookingsLocal();
      return bookings.find(b => b.code === code) || null;
    }
  } else {
    const bookings = readBookingsLocal();
    return bookings.find(b => b.code === code) || null;
  }
}

const activeOtps = new Map();

// Helper to send email OTP
async function sendOtpEmail(email, otp) {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER || 'bhimeswarbhimeswar@gmail.com';
  const smtpPass = process.env.SMTP_PASS || 'mfvkgopaihbmgjpq';
  const smtpFrom = process.env.SMTP_FROM || `"Bhim Kitchen Support" <bhimeswarbhimeswar@gmail.com>`;

  const consoleLogMessage = `\n======================================\n[OTP RECOVERY] Reset OTP code for ${email} is: ${otp}\n======================================\n`;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('SMTP Credentials are not fully configured. Falling back to local console output.');
    console.log(consoleLogMessage);
    return { sent: false, fallback: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: 'Bhim Kitchen Admin Password Reset OTP',
      text: `Your password reset One-Time Password (OTP) is: ${otp}\n\nThis code will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1a202c; border-bottom: 2px solid #9FE870; padding-bottom: 10px;">Bhim Kitchen Admin Portal</h2>
          <p>Hello Chef,</p>
          <p>We received a request to reset your admin portal access key. Use the following One-Time Password (OTP) to complete the reset:</p>
          <div style="background-color: #f7fafc; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #163300;">${otp}</span>
          </div>
          <p style="color: #718096; font-size: 14px;">This code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    });

    console.log(`Successfully sent recovery OTP email to ${email}`);
    return { sent: true };
  } catch (err) {
    console.error('Failed to send SMTP email:', err);
    console.log('Printing recovery OTP to terminal console instead:');
    console.log(consoleLogMessage);
    return { sent: false, error: err.message };
  }
}

// Helper to send booking confirmation email
async function sendBookingConfirmationEmail(booking, hostUrl) {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER || 'bhimeswarbhimeswar@gmail.com';
  const smtpPass = process.env.SMTP_PASS || 'mfvkgopaihbmgjpq';
  const smtpFrom = process.env.SMTP_FROM || `"Bhim Kitchen Support" <${getAdminEmail()}>`;

  const baseUrl = hostUrl || `http://localhost:${PORT}`;
  const cancelLink = `${baseUrl}/cancel.html?code=${booking.code}`;

  const consoleLogMessage = `
============================================================
[BOOKING CONFIRMATION] Booking code: ${booking.code}
Name: ${booking.name}
Email: ${booking.email}
Date: ${booking.date}
Time: ${booking.time}
Guests: ${booking.guests}
Table: ${booking.tableId}
Section: ${booking.section}
Cancel Link: ${cancelLink}
============================================================
`;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('SMTP Credentials are not fully configured. Falling back to local console output.');
    console.log(consoleLogMessage);
    return { sent: false, fallback: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    // Clean formatting of Table name
    const tableNumberMap = {
      1: "T-01", 2: "T-02", 3: "T-03", 4: "T-04", 5: "T-05", 6: "T-06",
      7: "T-07", 8: "T-08", 9: "VIP-1", 10: "VIP-2", 11: "VIP-3", 12: "VIP-4"
    };
    const tableNum = tableNumberMap[booking.tableId] || `Table #${booking.tableId}`;

    const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: booking.email,
      subject: `Bhim Kitchen - Table Reservation Confirmed [${booking.code}]`,
      text: `Hello ${booking.name},\n\nYour table reservation at Bhim Kitchen is confirmed!\n\nBooking Code: ${booking.code}\nDate: ${formattedDate}\nTime: ${booking.time}\nGuests: ${booking.guests} guests\nTable: ${tableNum} (${booking.section})\n\nIf you need to cancel this reservation, please click the link below:\n${cancelLink}\n\nThank you,\nBhim Kitchen Support`,
      html: `
        <div style="background-color: #090E0A; color: #E8F4EC; font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #1E2D20; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="text-align: center; border-bottom: 2px solid #9FE870; padding-bottom: 20px; margin-bottom: 25px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 2px; color: #FFFFFF;">BHIM<span style="color: #9FE870;">KITCHEN</span></span>
          </div>
          
          <h2 style="color: #FFFFFF; font-size: 22px; margin-top: 0; text-align: center;">Table Reservation Confirmed</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #C2D6C7; text-align: center;">
            Hello <strong>${booking.name}</strong>, Chef Bhim is excited to host you. Here are your booking details:
          </p>
          
          <div style="background-color: #121A13; border: 1px solid rgba(159, 232, 112, 0.15); border-radius: 8px; padding: 20px; margin: 25px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1A281E; font-weight: bold; color: #9FE870; width: 40%;">Booking Code</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1A281E; color: #FFFFFF; font-family: monospace; font-size: 16px;">${booking.code}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1A281E; font-weight: bold; color: #9FE870;">Date</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1A281E; color: #FFFFFF;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1A281E; font-weight: bold; color: #9FE870;">Time Slot</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1A281E; color: #FFFFFF;">${booking.time}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #1A281E; font-weight: bold; color: #9FE870;">Party Size</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #1A281E; color: #FFFFFF;">${booking.guests} Guests</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #9FE870;">Table & Section</td>
                <td style="padding: 10px 0; color: #FFFFFF;">${tableNum} (${booking.section})</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 14px; line-height: 1.5; color: #8FABA0; text-align: center; margin-top: 30px;">
            Plans changed? You can cancel your reservation instantly using the button below.
          </p>

          <div style="text-align: center; margin: 25px 0;">
            <a href="${cancelLink}" style="background-color: #E53E3E; color: #FFFFFF; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block; transition: background-color 0.2s; box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);">Cancel Reservation</a>
          </div>
          
          <div style="border-top: 1px solid #1E2D20; padding-top: 20px; margin-top: 30px; text-align: center; font-size: 12px; color: #698375;">
            This email was sent from Bhim Kitchen. For inquiries or special requests, please email us at ${getAdminEmail()}.
          </div>
        </div>
      `
    });

    console.log(`Successfully sent booking confirmation email to ${booking.email} for code ${booking.code}`);
    return { sent: true };
  } catch (err) {
    console.error('Failed to send booking confirmation email:', err);
    console.log('Printing booking confirmation details to console instead:');
    console.log(consoleLogMessage);
    return { sent: false, error: err.message };
  }
}

// API request handler
async function handleApiRequest(req, res, pathname, searchParams) {
  const method = req.method;

  if (pathname === '/api/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { password } = JSON.parse(body);
        if (password === getAdminPassword()) {
          const token = generateToken();
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
          });
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Incorrect password' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
      }
    });
    return;
  }

  if (pathname === '/api/logout' && method === 'POST') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': 'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  if (pathname === '/api/admin/settings' && method === 'GET') {
    if (!isAuthenticated(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ email: getAdminEmail() }));
    return;
  }

  if (pathname === '/api/admin/change-password' && method === 'POST') {
    if (!isAuthenticated(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { currentPassword, newPassword, newEmail } = JSON.parse(body);
        if (!currentPassword) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing current password' }));
          return;
        }

        if (currentPassword !== getAdminPassword()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Incorrect current password' }));
          return;
        }

        const success = saveAdminSettings(newPassword || undefined, newEmail || undefined);
        if (success) {
          const headers = { 'Content-Type': 'application/json' };
          if (newPassword) {
            headers['Set-Cookie'] = 'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }
          res.writeHead(200, headers);
          res.end(JSON.stringify({ success: true, loggedOut: !!newPassword }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to write settings to disk' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
      }
    });
    return;
  }

  if (pathname === '/api/admin/forgot-password' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { email } = JSON.parse(body);
        if (!email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email address is required' }));
          return;
        }

        if (email.toLowerCase().trim() !== getAdminEmail().toLowerCase().trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Provided email does not match the administrator address' }));
          return;
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        activeOtps.set(email.toLowerCase().trim(), {
          otp,
          expires: Date.now() + 10 * 60 * 1000 // 10 minutes
        });

        const result = await sendOtpEmail(email, otp);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, fallback: !!result.fallback }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
      }
    });
    return;
  }

  if (pathname === '/api/admin/verify-otp-reset' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { email, otp, newPassword } = JSON.parse(body);
        if (!email || !otp || !newPassword) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing email, OTP, or new access key' }));
          return;
        }

        const normalizedEmail = email.toLowerCase().trim();
        const otpData = activeOtps.get(normalizedEmail);

        if (!otpData) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'No active OTP request found for this email' }));
          return;
        }

        if (otpData.expires < Date.now()) {
          activeOtps.delete(normalizedEmail);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'OTP has expired. Please request a new one' }));
          return;
        }

        if (otpData.otp !== otp.trim()) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Incorrect OTP code' }));
          return;
        }

        const success = saveAdminSettings(newPassword, undefined);
        if (success) {
          activeOtps.delete(normalizedEmail);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to write new password to disk' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
      }
    });
    return;
  }

  if (pathname === '/api/tables' && method === 'GET') {
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    if (!date || !time) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing date or time parameter' }));
      return;
    }

    try {
      const activeBookings = await getActiveBookingsForSlot(date, time);
      
      const tables = DEFAULT_TABLES.map(t => {
        const isReserved = activeBookings.some(b => Number(b.tableId) === t.id);
        return {
          ...t,
          status: isReserved ? 'reserved' : 'available'
        };
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tables));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
    return;
  }

  if (pathname === '/api/bookings' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const bookingData = JSON.parse(body);
        const { name, email, date, time, guests, section, tableId, chefInstructions, preOrders } = bookingData;

        // Validation
        if (!name || !email || !date || !time || !guests || !section || !tableId) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing required booking fields' }));
          return;
        }

        // Double booking validation
        const activeBookings = await getActiveBookingsForSlot(date, time);
        const isTableTaken = activeBookings.some(b => Number(b.tableId) === Number(tableId));

        if (isTableTaken) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'This table has already been reserved for the selected date and time.' }));
          return;
        }

        // Generate Code & Save
        const code = 'BK-' + Math.floor(1000 + Math.random() * 9000);
        const newBooking = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
          code,
          name,
          email,
          date,
          time,
          guests: Number(guests),
          section,
          tableId: Number(tableId),
          chefInstructions: chefInstructions || '',
          preOrders: preOrders || [],
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };

        const success = await insertBooking(newBooking);

        if (success) {
          // Resolve current protocol and host dynamically for absolute email links
          const protocol = req.headers['x-forwarded-proto'] || 'http';
          const host = req.headers.host || `localhost:${PORT}`;
          const hostUrl = `${protocol}://${host}`;

          // Send confirmation email to the guest asynchronously with the dynamic hostUrl
          sendBookingConfirmationEmail(newBooking, hostUrl).catch(err => {
            console.error('Error sending confirmation email asynchronously:', err);
          });

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, booking: newBooking }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Database write failed' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
    return;
  }

  if (pathname === '/api/bookings' && method === 'GET') {
    if (!isAuthenticated(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
    try {
      const bookings = await getBookings();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(bookings));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
    return;
  }

  if (pathname === '/api/bookings/cancel' && method === 'POST') {
    if (!isAuthenticated(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { code, id } = JSON.parse(body);
        if (!code && !id) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing booking code or ID' }));
          return;
        }

        // Fetch booking to include details in return body
        let booking = null;
        if (IS_SUPABASE_CONFIGURED) {
          const query = id ? `id=eq.${id}` : `code=eq.${code}`;
          const results = await supabaseFetch(`/bookings?select=*&${query}`);
          booking = results && results[0];
        } else {
          const bookings = readBookingsLocal();
          booking = bookings.find(b => b.code === code || b.id === id);
        }

        if (!booking) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Booking not found' }));
          return;
        }

        const success = await cancelBookingInDb(id, code);

        if (success) {
          booking.status = 'cancelled';
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Booking cancelled successfully', booking }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to update booking status in database' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
    return;
  }

  if (pathname === '/api/bookings/public-details' && method === 'GET') {
    const code = searchParams.get('code');
    if (!code) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing booking code' }));
      return;
    }

    try {
      const booking = await getBookingByCode(code);
      if (!booking) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Booking not found' }));
        return;
      }

      // Return ONLY non-sensitive details to protect guest privacy
      const publicData = {
        name: booking.name,
        date: booking.date,
        time: booking.time,
        guests: booking.guests,
        tableId: booking.tableId,
        section: booking.section,
        status: booking.status
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(publicData));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
    return;
  }

  if (pathname === '/api/bookings/cancel-public' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { code } = JSON.parse(body);
        if (!code) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing booking code' }));
          return;
        }

        const booking = await getBookingByCode(code);
        if (!booking) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Booking not found' }));
          return;
        }

        if (booking.status === 'cancelled') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Booking has already been cancelled' }));
          return;
        }

        const success = await cancelBookingInDb(null, code);

        if (success) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Reservation cancelled successfully' }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to cancel reservation' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
    return;
  }

  // Not Found API route
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
}

const requestListener = (req, res) => {
  // Decode URL to handle spaces/special characters
  const decodedUrl = decodeURIComponent(req.url);
  
  // Parse URL for pathname and search parameters
  let pathname;
  let searchParams;
  try {
    const parsedUrl = new URL(decodedUrl, `http://${req.headers.host || 'localhost'}`);
    pathname = parsedUrl.pathname;
    searchParams = parsedUrl.searchParams;
  } catch (err) {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  // Handle Netlify Functions routing mapping
  if (pathname.startsWith('/.netlify/functions/api/')) {
    pathname = pathname.replace('/.netlify/functions/api/', '/api/');
  } else if (pathname === '/.netlify/functions/api') {
    pathname = '/api/';
  }

  // Route API requests
  if (pathname.startsWith('/api/')) {
    handleApiRequest(req, res, pathname, searchParams);
    return;
  }

  // Protect admin and login page routes
  if (pathname === '/admin.html') {
    if (!isAuthenticated(req)) {
      res.writeHead(302, { 'Location': '/login.html' });
      res.end();
      return;
    }
  } else if (pathname === '/login.html') {
    if (isAuthenticated(req)) {
      res.writeHead(302, { 'Location': '/admin.html' });
      res.end();
      return;
    }
  }

  // Route static files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  
  // Security check: prevent directory traversal
  const relative = path.relative(__dirname, filePath);
  const isSafe = relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
  if (pathname !== '/' && !isSafe) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
};

const server = http.createServer(requestListener);

// Export for serverless environments (Vercel) or start listener (Local/Render)
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop.');
  });
} else {
  module.exports = requestListener;
}
