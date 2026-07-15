// MENU DATA (With South Indian Specialties & Custom Add-ons in INR)
const menuData = [
  {
    id: "south-1",
    title: "Chettinad Pepper Chicken",
    price: 320,
    desc: "Tender chicken marinated in freshly ground Chettinad spices, roasted black pepper, curry leaves, and aromatic herbs, served with flaky Malabar parotta.",
    category: "mains",
    tags: ["South Indian", "Chef's Special", "Spicy"],
    img: "chettinad_chicken.png",
    addons: [
      { name: "Extra Malabar Parotta (1 pc)", price: 40 },
      { name: "Extra Curry Leaf Gravy", price: 60 }
    ]
  },
  {
    id: "south-2",
    title: "Ghee Podi Idli Bites",
    price: 180,
    desc: "Soft mini idlis tossed in homemade gunpowder, pure A2 ghee, roasted curry leaves, and crispy cashews, served with coconut and tomato chutneys.",
    category: "starters",
    tags: ["South Indian", "Vegetarian", "Popular"],
    img: "podi_idli.png",
    addons: [
      { name: "Extra Gunpowder Podi", price: 30 },
      { name: "Extra A2 Ghee Drizzle", price: 40 }
    ]
  },
  {
    id: "south-3",
    title: "Andhra Gongura Mutton",
    price: 420,
    desc: "Slow-cooked tender mutton simmered with tangy gongura leaves, roasted spices, garlic, and green chilies for a bold Andhra-style flavor.",
    category: "mains",
    tags: ["South Indian", "Signature", "Spicy"],
    img: "gongura_mutton.png",
    addons: [
      { name: "Steamed Rice Portion", price: 80 },
      { name: "Gongura Pickle Cup", price: 40 }
    ]
  },
  {
    id: "south-4",
    title: "Kerala Coconut Fish Curry",
    price: 360,
    desc: "Fresh fish cooked in creamy coconut milk with kokum, curry leaves, mustard seeds, and traditional Kerala spices, served with steamed rice.",
    category: "mains",
    tags: ["South Indian", "Seafood", "Chef's Choice"],
    img: "coconut_fish_curry.png",
    addons: [
      { name: "Extra Steamed Rice", price: 60 },
      { name: "Kerala Appam (2 pcs)", price: 80 }
    ]
  },
  {
    id: "south-5",
    title: "Mysore Masala Dosa Supreme",
    price: 220,
    desc: "Golden crispy dosa layered with spicy Mysore chutney, stuffed with buttery potato masala, and served with three house-made chutneys and sambar.",
    category: "mains",
    tags: ["South Indian", "Vegetarian", "Best Seller"],
    img: "masala_dosa.png",
    addons: [
      { name: "Extra Potato Masala Filling", price: 50 },
      { name: "Cheese Topping", price: 60 }
    ]
  },
  {
    id: "south-6",
    title: "Hyderabadi Dum Chicken Biryani",
    price: 390,
    desc: "Fragrant basmati rice layered with succulent chicken, saffron, mint, caramelized onions, and slow-cooked in the traditional dum style.",
    category: "mains",
    tags: ["South Indian", "Biryani", "Recommended"],
    img: "dum_biryani.png",
    addons: [
      { name: "Extra Salna", price: 30 },
      { name: "Mirchi Ka Salan Bowl", price: 50 }
    ]
  },
  {
    id: "south-7",
    title: "Kanchipuram Temple Pongal",
    price: 170,
    desc: "Traditional temple-style pongal infused with black pepper, cumin, ghee, roasted cashews, and ginger, served with coconut chutney and sambar.",
    category: "mains",
    tags: ["South Indian", "Comfort Food", "Vegetarian"],
    img: "temple_pongal.png",
    addons: [
      { name: "Extra Roasted Cashews", price: 50 },
      { name: "Ghee Medu Vada (1 pc)", price: 40 }
    ]
  },
  {
    id: "south-8",
    title: "Malabar Prawn Curry",
    price: 430,
    desc: "Juicy prawns simmered in rich coconut gravy with roasted fennel, curry leaves, tamarind, and Kerala spices.",
    category: "mains",
    tags: ["South Indian", "Seafood", "Premium"],
    img: "prawn_curry.png",
    addons: [
      { name: "Malabar Parotta (2 pcs)", price: 80 },
      { name: "Steamed Basmati Rice", price: 80 }
    ]
  },
  {
    id: "south-9",
    title: "Paneer Chettinad Curry",
    price: 280,
    desc: "Soft paneer cubes cooked in a rich Chettinad masala with roasted spices, tomatoes, onions, and fresh curry leaves.",
    category: "mains",
    tags: ["South Indian", "Vegetarian", "Chef's Special"],
    img: "paneer_chettinad.png",
    addons: [
      { name: "Tandoori Roti (2 pcs)", price: 60 },
      { name: "Butter Naan (1 pc)", price: 50 }
    ]
  },
  {
    id: "south-10",
    title: "Elaneer Payasam Delight",
    price: 160,
    desc: "Refreshing tender coconut payasam prepared with fresh coconut milk, jaggery, cardamom, and roasted nuts.",
    category: "desserts",
    tags: ["South Indian", "Dessert", "Signature"],
    img: "elaneer_payasam.png",
    addons: [
      { name: "Extra Roasted Cashew/Raisin Mix", price: 30 }
    ]
  },
  {
    id: "korean-1",
    title: "Korean Fried Chicken",
    price: 360,
    desc: "Double-fried crispy chicken glazed in a sweet, spicy gochujang sauce, topped with toasted sesame seeds and fresh spring onions.",
    category: "starters",
    tags: ["Korean", "Best Seller", "Spicy"],
    img: "korean_fried_chicken.png",
    addons: [
      { name: "Extra Sweet Gochujang Glaze", price: 40 },
      { name: "Pickled Radish (Moo)", price: 30 }
    ]
  },
  {
    id: "korean-2",
    title: "Bibimbap Bowl",
    price: 340,
    desc: "Steamed rice topped with sautéed vegetables, marinated mushrooms, fried egg, kimchi, and spicy gochujang sauce.",
    category: "mains",
    tags: ["Korean", "Healthy", "Popular"],
    img: "bibimbap_bowl.png",
    addons: [
      { name: "Extra Fried Egg", price: 30 },
      { name: "Extra Kimchi Portion", price: 40 }
    ]
  },
  {
    id: "korean-3",
    title: "Kimchi Fried Rice",
    price: 280,
    desc: "Wok-tossed rice with aged kimchi, vegetables, sesame oil, and a perfectly fried egg finished with roasted sesame seeds.",
    category: "mains",
    tags: ["Korean", "Comfort Food", "Vegetarian"],
    img: "kimchi_rice.png",
    addons: [
      { name: "Extra Fried Egg", price: 30 },
      { name: "Double Kimchi Flavor", price: 40 }
    ]
  },
  {
    id: "korean-4",
    title: "Bulgogi Beef Rice Bowl",
    price: 450,
    desc: "Thinly sliced beef marinated in soy, garlic, pear, and sesame, grilled to perfection and served over steamed jasmine rice.",
    category: "mains",
    tags: ["Korean", "Premium", "Chef's Special"],
    img: "bulgogi_beef.png",
    addons: [
      { name: "Extra Jasmine Rice", price: 60 },
      { name: "Marinated Beef Portion Double", price: 180 }
    ]
  },
  {
    id: "korean-5",
    title: "Tteokbokki Supreme",
    price: 300,
    desc: "Soft Korean rice cakes simmered in a rich spicy gochujang sauce with fish cakes, spring onions, and melted mozzarella.",
    category: "starters",
    tags: ["Korean", "Street Food", "Spicy"],
    img: "tteokbokki.png",
    addons: [
      { name: "Extra Melted Mozzarella", price: 60 },
      { name: "Hard Boiled Egg", price: 20 }
    ]
  },
  {
    id: "korean-6",
    title: "Korean Garlic Soy Wings",
    price: 340,
    desc: "Golden crispy chicken wings coated in a savory garlic-soy glaze and garnished with roasted sesame seeds.",
    category: "starters",
    tags: ["Korean", "Signature", "Popular"],
    img: "soy_wings.png",
    addons: [
      { name: "Garlic Soy Dipping Sauce", price: 30 },
      { name: "Pickled Cucumber Salad", price: 40 }
    ]
  },
  {
    id: "korean-7",
    title: "Japchae Glass Noodles",
    price: 290,
    desc: "Sweet potato glass noodles stir-fried with colorful vegetables, mushrooms, sesame oil, and soy sauce.",
    category: "mains",
    tags: ["Korean", "Vegetarian", "Healthy"],
    img: "glass_noodles.png",
    addons: [
      { name: "Extra Stir-fried Mushrooms", price: 50 },
      { name: "Sesame Oil Drizzle", price: 20 }
    ]
  },
  {
    id: "korean-8",
    title: "Kimchi Udon Stir Fry",
    price: 320,
    desc: "Thick udon noodles tossed with kimchi, vegetables, garlic, sesame oil, and spicy Korean seasonings.",
    category: "mains",
    tags: ["Korean", "Fusion", "Chef's Choice"],
    img: "glass_noodles.png",
    addons: [
      { name: "Extra Udon Noodles Portion", price: 80 },
      { name: "Spicy Gochugaru Flakes", price: 20 }
    ]
  },
  {
    id: "korean-9",
    title: "Bingsu Mango Snow",
    price: 240,
    desc: "Traditional Korean shaved ice topped with fresh Alphonso mango, condensed milk, vanilla ice cream, and crunchy almond flakes.",
    category: "desserts",
    tags: ["Korean", "Dessert", "Refreshing"],
    img: "elaneer_payasam.png",
    addons: [
      { name: "Extra Alphonso Mango Topping", price: 60 },
      { name: "Extra Condensed Milk Scoop", price: 30 }
    ]
  },
  {
    id: "korean-10",
    title: "Honey Butter Hotteok",
    price: 220,
    desc: "Warm Korean pancakes filled with brown sugar, cinnamon, roasted walnuts, and finished with whipped honey butter.",
    category: "desserts",
    tags: ["Korean", "Dessert", "Signature"],
    img: "elaneer_payasam.png",
    addons: [
      { name: "Extra Whipped Honey Butter", price: 40 },
      { name: "Extra Roasted Walnuts Cup", price: 50 }
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
    } else if (activeFilter === "korean") {
      matchesCategory = item.category === "korean" || item.tags.includes("Korean");
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
