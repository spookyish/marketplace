// Items data
const items = [
    {
        title: "Lucy",
        price: 100,
        image: "item1.jpg",
        description: "Cute 4lb Tea Cup Yorkie.",
        count: 0
    },
    {
        title: "Antique Desk",
        price: 100,
        image: "item2.jpg",
        description: "An antique wooden desk with multiple drawers and brass fittings.",
        count: 0
    },
    {
        title: "Handcrafted Jewelry",
        price: 75,
        image: "item3.jpg",
        description: "Handmade jewelry set with semi-precious stones and sterling silver.",
        count: 0
    },
    {
        title: "Artisanal Pottery",
        price: 120,
        image: "item4.jpg",
        description: "Artisan-crafted pottery vase with a unique glaze finish.",
        count: 0
    },
    {
        title: "Rare Books Collection",
        price: 90,
        image: "item5.jpg",
        description: "A collection of rare books spanning various genres and periods.",
        count: 0
    },
    {
        title: "Designer Handbag",
        price: 60,
        image: "item6.jpg",
        description: "Designer handbag made from genuine leather with gold-plated hardware.",
        count: 0
    },
    {
        title: "Original Paintings",
        price: 80,
        image: "item7.jpg",
        description: "Original oil paintings by a local artist, framed and ready to hang.",
        count: 0
    },
    {
        title: "Custom Furniture Set",
        price: 110,
        image: "item8.jpg",
        description: "Custom-made furniture set including a sofa, coffee table, and side chairs.",
        count: 0
    },
    {
        title: "Vintage Vinyl Records",
        price: 70,
        image: "item9.jpg",
        description: "A collection of vintage vinyl records from various artists and genres.",
        count: 0
    },
    {
        title: "Collectible Figurines",
        price: 95,
        image: "item10.jpg",
        description: "Collectible figurines including characters from movies and comic books.",
        count: 0
    }
];

const itemList = document.getElementById('item-list');
const shoppingCart = document.getElementById('shopping-cart');
let totalAmount = 0;
let itemCount = 0;

// Function to create item elements and add to the DOM
function renderItems() {
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        const imgElement = document.createElement('img');
        imgElement.src = item.image;
        itemElement.appendChild(imgElement);

        const titleElement = document.createElement('div');
        titleElement.classList.add('item-title');
        titleElement.textContent = item.title;
        itemElement.appendChild(titleElement);

        const descElement = document.createElement('div');
        descElement.textContent = item.description;
        itemElement.appendChild(descElement);

        const priceElement = document.createElement('div');
        priceElement.classList.add('item-price');
        priceElement.textContent = `$${item.price}`;
        itemElement.appendChild(priceElement);

        // Create Contact Seller button
        const contactButton = document.createElement('button');
        contactButton.classList.add('offer-button');
        contactButton.textContent = 'Contact Seller For Details';
        contactButton.addEventListener('click', () => showContactForm());
        itemElement.appendChild(contactButton);

        // Create Add to Cart button
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('offer-button', 'add-to-cart'); // Add unique class 'add-to-cart'
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.addEventListener('click', () => addToCart(item));
        itemElement.appendChild(addToCartButton);

        itemList.appendChild(itemElement);
    });
}

// Function to show contact form
function showContactForm() {
    const form = document.getElementById('fs-frm');
    form.classList.add('show-form');
}

// Function to add item to cart
function addToCart(item) {
    item.count++;
    totalAmount += item.price;
    itemCount++;
    updateShoppingCart();
}

// Function to update shopping cart display
function updateShoppingCart() {
    shoppingCart.innerHTML = `Shopping Cart: <span id="item-count">${itemCount} items</span> - Total: $<span id="total-amount">${totalAmount.toFixed(2)}</span>`;
}

// Function to clear the shopping cart
function clearCart() {
    items.forEach(item => {
        item.count = 0;
    });
    totalAmount = 0;
    itemCount = 0;
    updateShoppingCart();
}

// Function to toggle contact form visibility
function toggleForm() {
    const form = document.getElementById('fs-frm');
    form.classList.remove('show-form');
}

// Function to show the cart view as a popup
function viewCart() {
    // Remove existing cart overlay if present
    const existingOverlay = document.querySelector('.cart-overlay');
    if (existingOverlay) {
        document.body.removeChild(existingOverlay);
    }

    const cartOverlay = document.createElement('div');
    cartOverlay.classList.add('cart-overlay');

    const cartPopup = document.createElement('div');
    cartPopup.classList.add('cart-popup');

    const cartItems = document.createElement('div');
    cartItems.classList.add('cart-items');

    items.forEach(item => {
        if (item.count > 0) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const itemName = document.createElement('span');
            itemName.classList.add('item-name');
            itemName.textContent = item.title;

            const itemPrice = document.createElement('span');
            itemPrice.classList.add('item-price');
            itemPrice.textContent = `$${(item.price * item.count).toFixed(2)}`;

            cartItem.appendChild(itemName);
            cartItem.appendChild(itemPrice);
            cartItems.appendChild(cartItem);
        }
    });

    const cartTotal = document.createElement('div');
    cartTotal.classList.add('cart-total');
    cartTotal.textContent = `Total: $${totalAmount.toFixed(2)}`;

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(cartOverlay);
    });

    const contactSellerButton = document.createElement('button');
    contactSellerButton.classList.add('offer-button');
    contactSellerButton.textContent = 'Contact Seller For Details';
    contactSellerButton.addEventListener('click', () => showContactForm());

    cartPopup.appendChild(cartItems);
    cartPopup.appendChild(cartTotal);
    cartPopup.appendChild(contactSellerButton);
    cartPopup.appendChild(closeButton);

    cartOverlay.appendChild(cartPopup);
    document.body.appendChild(cartOverlay);
}

// Initialize the item list
renderItems();
updateShoppingCart(); // Initial update of shopping cart display

// Event listener for View Cart button
const viewCartButton = document.getElementById('view-cart-button');
viewCartButton.addEventListener('click', () => {
    viewCart();
});

const pickupContainer = document.getElementById('pickup-container');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        pickupContainer.style.display = 'none';
    } else {
        pickupContainer.style.display = 'block';
    }
});