const http = require('http');
const fs = require('fs');
const path = require('path');

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

// API request handler
async function handleApiRequest(req, res, pathname, searchParams) {
  const method = req.method;

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

  // Route API requests
  if (pathname.startsWith('/api/')) {
    handleApiRequest(req, res, pathname, searchParams);
    return;
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
