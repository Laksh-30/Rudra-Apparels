// =========================================================
// 1. MOBILE MENU TOGGLE (Interactivity for Header)
// =========================================================

// Get the hamburger button element and the navigation menu element
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

// Add an event listener that runs a function when the button is clicked
menuToggle.addEventListener('click', function() {
    // This line adds or removes the 'active' class on the navigation menu.
    // The 'active' class in CSS is what makes the menu visible/invisible on mobile.
    mainNav.classList.toggle('active');
});


// =========================================================
// 2. PRODUCT CAROUSEL LOGIC (Dynamic Albums)
// =========================================================

/**
 * Initializes and starts the automatic slideshow for a single carousel element.
 * @param {HTMLElement} carouselElement The container holding the slides.
 */
function startCarousel(carouselElement) {
    // Finds all image slides within this specific carousel
    const slides = carouselElement.querySelectorAll('.slide img');
    let currentSlide = 0;
    
    // Check if there are any slides to prevent errors
    if (slides.length === 0) {
        return; 
    }

    // Function to handle the transition to the next image
    const showNextSlide = () => {
        // 1. Hide the current active slide by removing the 'active' class
        slides.forEach(img => img.classList.remove('active'));
        
        // 2. Calculate the index of the next slide (loops back to 0 when end is reached)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // 3. Show the new current slide by adding the 'active' class
        slides[currentSlide].classList.add('active');
    };
    
    // Set the first slide to be visible immediately on load
    slides[0].classList.add('active');
    
    // Start the automatic rotation timer (runs every 4000 milliseconds = 4 seconds)
    setInterval(showNextSlide, 4000); 
}

// Get all elements with the class 'carousel' (i.e., all album slideshows)
const carousels = document.querySelectorAll('.carousel');

// Loop through each carousel found and start its slideshow independently
carousels.forEach(carousel => {
    startCarousel(carousel);
});