// MENU DATA (With South Indian Specialties & Custom Add-ons in INR)
const menuData = [
  {
    id: "spec-1",
    title: "Curry Leaf Avocado Tartar",
    price: 450,
    desc: "Creamy mashed Hass avocados infused with tempered curry leaves, black mustard seeds, and dry red chilis, served with crisp appam shards.",
    category: "starters",
    tags: ["South Indian", "Vegan", "Signature"],
    img: "dish_1.png",
    addons: [
      { name: "Extra Appam Shards", price: 60 },
      { name: "Truffle Oil Drizzle", price: 80 }
    ]
  },
  {
    id: "spec-2",
    title: "Herb-Crusted Roast Entree",
    price: 850,
    desc: "Crusted with roasted chettinad spices, served alongside bright green pea-mint purée, asparagus spears, and finished with a dark tamarind reduction glaze.",
    category: "mains",
    tags: ["Chef's Special", "Gluten-Free"],
    img: "dish_2.png",
    addons: [
      { name: "Grated Gunpowder Paneer", price: 110 },
      { name: "Extra Reduction Sauce", price: 40 }
    ]
  },
  {
    id: "spec-3",
    title: "Matcha Payasam Lava Cake",
    price: 350,
    desc: "A decadent warm fusion dessert with a molten core of coconut-cardamom payasam and rich green matcha, served with pure vanilla bean ice cream.",
    category: "desserts",
    tags: ["South Indian", "Dessert", "Fusion"],
    img: "dish_3.png",
    addons: [
      { name: "Extra Scoop Vanilla Ice Cream", price: 60 },
      { name: "Salted Caramel Drizzle", price: 40 }
    ]
  },
  {
    id: "south-meal-1",
    title: "Grand Master Chef South Indian Meal (Thali)",
    price: 950,
    desc: "An opulent curated platter containing traditional Sona Masuri rice, Chef Bhim's special sambar, rasam, kootu, poriyal, house-crafted curd, papadum, pickle, and warm Mysore Pak, served on a fresh banana leaf liner.",
    category: "south-indian",
    tags: ["South Indian", "Feast", "Recommended"],
    img: "dish_2.png",
    addons: [
      { name: "Extra Ghee Rice", price: 150 },
      { name: "Malabar Parotta (2 pcs)", price: 80 }
    ]
  },
  {
    id: "south-1",
    title: "Signature Ghee Podi Dosa Roll",
    price: 320,
    desc: "Super thin crispy rice crepe layered with spiced red chili chutney, loaded with organic cow ghee and aromatic gunpowder podi, rolled and served with tomato-coconut chutney.",
    category: "south-indian",
    tags: ["South Indian", "Spicy", "Master Chef Favorite"],
    img: "dish_1.png",
    addons: [
      { name: "Extra Pure Ghee", price: 60 },
      { name: "Cheese Filling", price: 80 },
      { name: "Gunpowder Dip", price: 40 }
    ]
  },
  {
    id: "south-2",
    title: "Paneer Chettinad Skewers",
    price: 380,
    desc: "Marinated cubes of fresh cottage cheese cooked in a tandoor with fiery stone-ground Chettinad pepper spices, green bell peppers, and fresh curry leaf dip.",
    category: "starters",
    tags: ["South Indian", "Spicy", "Vegetarian"],
    img: "dish_2.png",
    addons: [
      { name: "Extra Curry Leaf Sauce", price: 30 },
      { name: "Double Paneer Portion", price: 120 }
    ]
  },
  {
    id: "south-3",
    title: "Truffle Gunpowder Idli Skewers",
    price: 290,
    desc: "Bite-sized steamed rice cakes tossed in high-grade Italian white truffle oil, sprinkled with spicy lentil gunpowder and micro greens.",
    category: "starters",
    tags: ["South Indian", "Vegan"],
    img: "dish_1.png",
    addons: [
      { name: "Organic Honey Glaze", price: 40 },
      { name: "Coconut Sambhar Bowl", price: 60 }
    ]
  },
  {
    id: "south-4",
    title: "Kottu Parotta Croquettes",
    price: 310,
    desc: "Shredded layered flatbread cooked with Master Chef Bhim's special vegetable salna, crumbed and fried to golden perfection with a mozzarella heart.",
    category: "starters",
    tags: ["Fusion", "Vegetarian"],
    img: "dish_2.png",
    addons: [
      { name: "Cheesy Salna Dip", price: 50 }
    ]
  },
  {
    id: "south-5",
    title: "Jackfruit Dum Biryani",
    price: 480,
    desc: "Fragrant basmati rice layered with raw baby jackfruit chunks marinated in green mint paste, ginger-garlic, and fresh ground spices, slow-cooked in a sealed clay pot.",
    category: "mains",
    tags: ["Gluten-Free", "Vegetarian"],
    img: "dish_2.png",
    addons: [
      { name: "Extra Spiced Salna", price: 40 },
      { name: "Raita Dip", price: 30 }
    ]
  },
  {
    id: "south-6",
    title: "Cardamom Mysore Pak Truffles",
    price: 280,
    desc: "Traditional chickpea flour fudge loaded with premium clarified butter, scented with green cardamom, and rolled into bite-sized cocoa-dusted truffles.",
    category: "desserts",
    tags: ["South Indian", "Sweet"],
    img: "dish_3.png",
    addons: [
      { name: "Crushed Pistachio Coating", price: 40 }
    ]
  },
  {
    id: "south-7",
    title: "Curry Leaf Botanical Mocktail",
    price: 190,
    desc: "A refreshing cooler made with muddled fresh curry leaves, lime, organic sugarcane syrup, mint, soda, and a dash of pink salt.",
    category: "beverages",
    tags: ["South Indian", "Organic", "Cold"],
    img: "dish_3.png",
    addons: [
      { name: "Chia Seed Infusion", price: 30 }
    ]
  },
  {
    id: "south-8",
    title: "Chef Bhim's Meter Filter Coffee",
    price: 120,
    desc: "Traditional chicory-blend coffee frothed with organic cow's milk from a high elevation to create the perfect velvet layer.",
    category: "beverages",
    tags: ["South Indian", "Hot", "Classic"],
    img: "dish_3.png",
    addons: [
      { name: "Double Shot Chicory", price: 40 },
      { name: "Almond Milk Substitute", price: 30 }
    ]
  }
];


// RESERVATION TABLES DATA
let tablesData = [
  { id: 1, number: "T-01", seats: "2 seats", section: "Main Dining Hall", status: "available" },
  { id: 2, number: "T-02", seats: "4 seats", section: "Main Dining Hall", status: "available" },
  { id: 3, number: "T-03", seats: "2 seats", section: "Main Dining Hall", status: "reserved" },
  { id: 4, number: "T-04", seats: "6 seats", section: "Main Dining Hall", status: "available" },
  { id: 5, number: "T-05", seats: "2 seats", section: "Garden Terrace", status: "available" },
  { id: 6, number: "T-06", seats: "4 seats", section: "Garden Terrace", status: "available" },
  { id: 7, number: "T-07", seats: "4 seats", section: "Garden Terrace", status: "reserved" },
  { id: 8, number: "T-08", seats: "6 seats", section: "Garden Terrace", status: "available" },
  { id: 9, number: "VIP-1", seats: "2 seats", section: "Chef's Counter VIP", status: "available" },
  { id: 10, number: "VIP-2", seats: "2 seats", section: "Chef's Counter VIP", status: "available" },
  { id: 11, number: "VIP-3", seats: "2 seats", section: "Chef's Counter VIP", status: "reserved" },
  { id: 12, number: "VIP-4", seats: "4 seats", section: "Chef's Counter VIP", status: "available" }
];

// STATE VARIABLES
let activeFilter = "all";
let searchKeyword = "";
let selectedTable = null;
let currentCustomizingDish = null;
let customizerQty = 1;
let selectedAddons = [];
let sessionCart = [];

// DOM ELEMENTS
const menuItemsContainer = document.getElementById("menu-items-container");
const menuSearch = document.getElementById("menu-search");
const menuTabs = document.querySelectorAll(".menu-tab");
const floorTablesGrid = document.getElementById("floor-tables-grid");
const bookingForm = document.getElementById("booking-form");

// Ticket Elements
const ticketGuestName = document.getElementById("ticket-guest-name");
const ticketDateTime = document.getElementById("ticket-date-time");
const ticketLocation = document.getElementById("ticket-location");
const ticketParty = document.getElementById("ticket-party");
const ticketChefNote = document.getElementById("ticket-chef-note");

// Modal Elements
const customizerModal = document.getElementById("customizer-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalDishImg = document.getElementById("modal-dish-img");
const modalDishTitle = document.getElementById("modal-dish-title");
const modalDishPrice = document.getElementById("modal-dish-price");
const modalDishDesc = document.getElementById("modal-dish-desc");
const addonListContainer = document.getElementById("addon-list-container");
const spiceSlider = document.getElementById("spice-level");
const modalChefNotes = document.getElementById("modal-chef-notes");
const qtyCount = document.getElementById("qty-count");
const qtyMinus = document.getElementById("qty-minus");
const qtyPlus = document.getElementById("qty-plus");
const btnAddToOrder = document.getElementById("btn-add-to-order");

// Toast Elements
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

// Testimonials Slider Elements
const testimonialTrack = document.getElementById("testimonial-track");
const btnPrevTestimonial = document.getElementById("carousel-prev");
const btnNextTestimonial = document.getElementById("carousel-next");
let testimonialIndex = 0;

/* --- SYSTEM INIT --- */
window.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  renderFloorPlan();
  initTicketListeners();
  initTestimonials();
  setupModalEvents();
  setupNavigationHighlighting();
  setupMobileNav();
});

/* --- MOBILE NAVIGATION PANEL --- */
function setupMobileNav() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      toggleBtn.classList.toggle("open");
      navMenu.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        toggleBtn.classList.remove("open");
        navMenu.classList.remove("open");
      });
    });
  }
}

/* --- TOAST SYSTEM --- */
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("active");
  setTimeout(() => {
    toast.classList.remove("active");
  }, 4500);
}

/* --- DYNAMIC MENU RENDER --- */
function renderMenu() {
  menuItemsContainer.innerHTML = "";
  
  // Filter menu items
  const filteredItems = menuData.filter(item => {
    // Check search query
    const matchesSearch = item.title.toLowerCase().includes(searchKeyword.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchKeyword.toLowerCase()));
    
    // Check category tab
    let matchesCategory = false;
    if (activeFilter === "all") {
      matchesCategory = true;
    } else if (activeFilter === "south-indian") {
      matchesCategory = item.category === "south-indian" || item.tags.includes("South Indian");
    } else {
      matchesCategory = item.category === activeFilter;
    }

    return matchesSearch && matchesCategory;
  });

  if (filteredItems.length === 0) {
    menuItemsContainer.innerHTML = `
      <div style="grid-column: span 2; text-align: center; padding: 40px; color: var(--color-text-gray);">
        <p>No dishes found matching your criteria. Try looking for 'Dosa', 'Curry' or 'Matcha'.</p>
      </div>
    `;
    return;
  }

  filteredItems.forEach(item => {
    const itemCard = document.createElement("div");
    itemCard.className = "menu-item";
    
    const tagSpans = item.tags.map(tag => `<span class="menu-item-tag">${tag}</span>`).join("");

    itemCard.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="menu-item-img">
      <div class="menu-item-content">
        <div>
          <div class="menu-item-header">
            <h4 class="menu-item-title">${item.title}</h4>
            <span class="menu-item-price">₹${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.desc}</p>
        </div>
        <div class="menu-item-footer">
          <div class="menu-item-tags">
            ${tagSpans}
          </div>
          <button class="btn-add-item" data-id="${item.id}">
            + Customize & Order
          </button>
        </div>
      </div>
    `;
    
    menuItemsContainer.appendChild(itemCard);
  });

  // Attach event listeners to newly generated buttons
  document.querySelectorAll(".btn-add-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const dishId = e.currentTarget.getAttribute("data-id");
      openCustomizerModal(dishId);
    });
  });
}

// Menu search listener
menuSearch.addEventListener("input", (e) => {
  searchKeyword = e.target.value;
  renderMenu();
});

// Menu tabs listener
menuTabs.forEach(tab => {
  tab.addEventListener("click", (e) => {
    menuTabs.forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");
    activeFilter = e.target.getAttribute("data-filter");
    renderMenu();
  });
});

// Specials section buttons click hooks
document.querySelectorAll(".btn-open-customizer").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = e.currentTarget.getAttribute("data-dish-id");
    openCustomizerModal(id);
  });
});


/* --- DISH CUSTOMIZER MODAL --- */
function openCustomizerModal(dishId) {
  const dish = menuData.find(item => item.id === dishId);
  if (!dish) return;

  currentCustomizingDish = dish;
  customizerQty = 1;
  selectedAddons = [];
  qtyCount.textContent = customizerQty;
  modalChefNotes.value = "";
  spiceSlider.value = 3;

  // Populate Modal Fields
  modalDishImg.src = dish.img;
  modalDishTitle.textContent = dish.title;
  modalDishDesc.textContent = dish.desc;
  updateModalPrice();

  // Populate Add-ons Checkboxes
  addonListContainer.innerHTML = "";
  if (dish.addons && dish.addons.length > 0) {
    dish.addons.forEach((addon, idx) => {
      const addonDiv = document.createElement("div");
      addonDiv.className = "addon-item";
      addonDiv.innerHTML = `
        <label class="addon-checkbox-label">
          <input type="checkbox" class="addon-checkbox" data-index="${idx}">
          <span>${addon.name}</span>
        </label>
        <span class="addon-price">+₹${addon.price}</span>
      `;
      addonListContainer.appendChild(addonDiv);
    });

    // Add listener to checkboxes to trigger price update
    document.querySelectorAll(".addon-checkbox").forEach(chk => {
      chk.addEventListener("change", () => {
        updateModalPrice();
      });
    });
  } else {
    addonListContainer.innerHTML = `<p style="font-size: 13px; color: var(--color-text-gray);">No premium add-ons available for this selection.</p>`;
  }

  customizerModal.classList.add("active");
}

function updateModalPrice() {
  if (!currentCustomizingDish) return;
  
  let basePrice = currentCustomizingDish.price;
  let addonsCost = 0;
  
  const activeCheckboxes = document.querySelectorAll(".addon-checkbox:checked");
  activeCheckboxes.forEach(chk => {
    const index = parseInt(chk.getAttribute("data-index"));
    addonsCost += currentCustomizingDish.addons[index].price;
  });
  
  const totalPrice = (basePrice + addonsCost) * customizerQty;
  modalDishPrice.textContent = `₹${totalPrice}`;
}

function setupModalEvents() {
  modalCloseBtn.addEventListener("click", () => {
    customizerModal.classList.remove("active");
  });

  // Click outside modal closes it
  customizerModal.addEventListener("click", (e) => {
    if (e.target === customizerModal) {
      customizerModal.classList.remove("active");
    }
  });

  // Quantity controls
  qtyMinus.addEventListener("click", () => {
    if (customizerQty > 1) {
      customizerQty--;
      qtyCount.textContent = customizerQty;
      updateModalPrice();
    }
  });

  qtyPlus.addEventListener("click", () => {
    customizerQty++;
    qtyCount.textContent = customizerQty;
    updateModalPrice();
  });

  // Form submit add to order
  btnAddToOrder.addEventListener("click", () => {
    if (!currentCustomizingDish) return;

    // Grab customized settings
    const activeCheckboxes = document.querySelectorAll(".addon-checkbox:checked");
    const addonsSelectedNames = Array.from(activeCheckboxes).map(chk => {
      const idx = parseInt(chk.getAttribute("data-index"));
      return currentCustomizingDish.addons[idx].name;
    });

    const spiceLevel = spiceSlider.value;
    const spiceNameMap = { 1: "Mild", 2: "Medium-Mild", 3: "Medium", 4: "Spicy", 5: "Fiery Chettinad" };
    const selectedSpice = spiceNameMap[spiceLevel];
    
    const chefInstructions = modalChefNotes.value.trim();

    // Push item to pre-order session cart
    const cartItem = {
      id: currentCustomizingDish.id,
      title: currentCustomizingDish.title,
      price: currentCustomizingDish.price,
      quantity: customizerQty,
      spice: selectedSpice,
      addons: addonsSelectedNames,
      chefInstructions: chefInstructions
    };
    sessionCart.push(cartItem);

    // Update digital ticket layout and notification
    let orderSummaryText = `${customizerQty}x "${currentCustomizingDish.title}" [${selectedSpice}]`;
    if (addonsSelectedNames.length > 0) {
      orderSummaryText += ` with (${addonsSelectedNames.join(", ")})`;
    }

    customizerModal.classList.remove("active");
    showToast(`Pre-order added: ${orderSummaryText}! Complete your reservation to place.`);
    updatePreordersPreview();
  });
}


/* --- FLOOR SEATING MAP & RESERVATIONS --- */
function renderFloorPlan() {
  floorTablesGrid.innerHTML = "";
  
  // Filter tables by chosen Section dropdown
  const chosenSection = document.getElementById("booking-section").value;
  const sectionTables = tablesData.filter(t => t.section === chosenSection);
  
  sectionTables.forEach(table => {
    const tableDiv = document.createElement("div");
    
    // Class based on table properties
    let statusClass = "available";
    if (table.status === "reserved") statusClass = "reserved";
    if (selectedTable && selectedTable.id === table.id) statusClass = "selected";
    
    tableDiv.className = `restaurant-table ${statusClass}`;
    tableDiv.setAttribute("data-table-id", table.id);
    
    tableDiv.innerHTML = `
      <span class="restaurant-table-number">${table.number}</span>
      <span class="restaurant-table-seats">${table.seats}</span>
    `;
    
    // Seat Selector Click Handler
    if (table.status === "available") {
      tableDiv.addEventListener("click", () => {
        // Toggle selected table
        if (selectedTable && selectedTable.id === table.id) {
          selectedTable = null;
        } else {
          selectedTable = table;
        }
        
        // Re-render seating layouts to update active classes
        renderFloorPlan();
        updateTicketPreview();
      });
    }
    
    floorTablesGrid.appendChild(tableDiv);
  });
}

// Re-render floor plan when lounge section is changed in dropdown
document.getElementById("booking-section").addEventListener("change", () => {
  // Clear selection if switching sections
  selectedTable = null;
  renderFloorPlan();
  updateTicketPreview();
});

// Update Seating Capacity options on guests selector
document.getElementById("booking-guests").addEventListener("change", (e) => {
  updateTicketPreview();
});

/* --- REALTIME RESERVATION TICKET PREVIEW --- */
function initTicketListeners() {
  const inputs = ["booking-name", "booking-date", "booking-time", "booking-chef-instructions"];
  inputs.forEach(id => {
    document.getElementById(id).addEventListener("input", updateTicketPreview);
  });
  
  // Pre-fill date picker to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateString = tomorrow.toISOString().split("T")[0];
  document.getElementById("booking-date").value = dateString;
  document.getElementById("booking-date").min = dateString;
  
  // Listeners for dynamic fetching from backend
  document.getElementById("booking-date").addEventListener("change", fetchTableAvailability);
  document.getElementById("booking-time").addEventListener("change", fetchTableAvailability);
  
  // Fetch initial table statuses
  fetchTableAvailability();
  updateTicketPreview();

  // Booking confirm submission
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!selectedTable) {
      showToast("Please select an available table on the floor map!");
      return;
    }
    
    const name = document.getElementById("booking-name").value.trim();
    const email = document.getElementById("booking-email").value.trim();
    const date = document.getElementById("booking-date").value;
    const time = document.getElementById("booking-time").value;
    const guests = document.getElementById("booking-guests").value;
    const section = document.getElementById("booking-section").value;
    const chefInstructions = document.getElementById("booking-chef-instructions").value.trim();

    const bookingData = {
      name,
      email,
      date,
      time,
      guests: Number(guests),
      section,
      tableId: Number(selectedTable.id),
      chefInstructions,
      preOrders: sessionCart
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showToast(`Success! Table ${selectedTable.number} Reserved. Code: ${result.booking.code}. Direct Chef instructions locked.`);
        
        // Reset states
        selectedTable = null;
        sessionCart = [];
        updatePreordersPreview();
        bookingForm.reset();
        
        // Reset date picker to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateString = tomorrow.toISOString().split("T")[0];
        document.getElementById("booking-date").value = dateString;
        document.getElementById("booking-date").min = dateString;
        document.getElementById("booking-time").value = "20:00";
        document.getElementById("booking-guests").value = "2";
        document.getElementById("booking-section").value = "Main Dining Hall";

        // Re-fetch availability and update preview
        await fetchTableAvailability();
        updateTicketPreview();
      } else {
        showToast(`Booking Error: ${result.error || 'Please try again.'}`);
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      showToast("Server connection error. Please try again.");
    }
  });
}

function updateTicketPreview() {
  const nameVal = document.getElementById("booking-name").value.trim();
  const dateVal = document.getElementById("booking-date").value;
  const timeVal = document.getElementById("booking-time").value;
  const guestVal = document.getElementById("booking-guests").value;
  const sectionVal = document.getElementById("booking-section").value;
  const chefNotesVal = document.getElementById("booking-chef-instructions").value.trim();

  // Update Live elements
  ticketGuestName.textContent = nameVal ? nameVal : "Guest Preview";
  
  if (dateVal && timeVal) {
    const formattedDate = new Date(dateVal).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });
    ticketDateTime.textContent = `${formattedDate} @ ${timeVal}`;
  } else {
    ticketDateTime.textContent = "Select date & time";
  }
  
  ticketParty.textContent = `${guestVal} Guest${guestVal > 1 ? "s" : ""}`;
  
  if (selectedTable) {
    ticketLocation.textContent = `${selectedTable.number} (${sectionVal})`;
    ticketLocation.style.color = "var(--color-primary)";
  } else {
    ticketLocation.textContent = "Table Not Selected";
    ticketLocation.style.color = "var(--color-text-gray)";
  }

  if (chefNotesVal) {
    ticketChefNote.textContent = `"${chefNotesVal}"`;
    ticketChefNote.style.display = "block";
  } else {
    ticketChefNote.style.display = "none";
  }
}


/* --- TESTIMONIAL CAROUSEL --- */
function initTestimonials() {
  const slides = document.querySelectorAll(".testimonial-slide");
  
  btnNextTestimonial.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % slides.length;
    updateTestimonialSlider();
  });

  btnPrevTestimonial.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + slides.length) % slides.length;
    updateTestimonialSlider();
  });
}

function updateTestimonialSlider() {
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
}


/* --- SCROLL EFFECT & NAVIGATION --- */
function setupNavigationHighlighting() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") && link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

/* --- BACKEND CORE INTEGRATIONS --- */
async function fetchTableAvailability() {
  const dateVal = document.getElementById("booking-date").value;
  const timeVal = document.getElementById("booking-time").value;
  if (!dateVal || !timeVal) return;

  try {
    const res = await fetch(`/api/tables?date=${dateVal}&time=${timeVal}`);
    if (res.ok) {
      tablesData = await res.json();
      renderFloorPlan();
    } else {
      console.error("Failed to fetch tables availability");
    }
  } catch (err) {
    console.error("Error fetching tables availability:", err);
  }
}

function updatePreordersPreview() {
  const ticketPreorders = document.getElementById("ticket-preorders");
  if (!ticketPreorders) return;

  if (sessionCart.length === 0) {
    ticketPreorders.textContent = "None selected yet";
    return;
  }

  let html = '<ul style="margin: 0; padding-left: 14px; text-align: left; font-size: 13px; color: var(--color-primary); list-style-type: square;">';
  sessionCart.forEach(item => {
    let addonsStr = item.addons.length > 0 ? ` (+${item.addons.join(", ")})` : "";
    let instStr = item.chefInstructions ? ` [Note: "${item.chefInstructions}"]` : "";
    html += `<li style="margin-bottom: 4px; line-height: 1.3;">
      <strong>${item.quantity}x</strong> ${item.title} (${item.spice})${addonsStr}${instStr}
    </li>`;
  });
  html += '</ul>';
  ticketPreorders.innerHTML = html;
}
