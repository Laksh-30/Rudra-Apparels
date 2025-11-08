document.addEventListener('DOMContentLoaded', function() {

    // =========================================================
    // 1. MOBILE MENU TOGGLE (Interactivity for Header)
    // =========================================================
    
    // The existing mobile menu logic:
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // This adds or removes the 'active' class on the navigation menu.
            mainNav.classList.toggle('active');
        });
    }


    // =========================================================
    // 2. HEADER SHRINK/EXPAND ON SCROLL LOGIC (NEW CODE)
    // =========================================================
    
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0; // Tracks the last scroll position
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // Start shrinking/expanding after 100px of scroll
        const scrollThreshold = 100; 

        // Shrink Logic: Only shrink when scrolling DOWN and past the threshold
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            header.classList.add('header-scrolled');
        } 
        // Expand Logic: Expand when scrolling UP or if we are near the top
        else if (scrollTop < lastScrollTop || scrollTop <= scrollThreshold) {
            header.classList.remove('header-scrolled');
        }

        // Update the last scroll position for the next check
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });


    // =========================================================
    // 3. PRODUCT CAROUSEL LOGIC (Existing Code)
    // =========================================================
    
    /**
     * Initializes and starts the automatic slideshow for a single carousel element.
     * @param {HTMLElement} carouselElement The container holding the slides.
     */
    function startCarousel(carouselElement) {
        const slides = carouselElement.querySelectorAll('.slide img');
        let currentSlide = 0;
        
        if (slides.length === 0) {
            return; 
        }

        const showNextSlide = () => {
            // Hide the current active slide
            slides.forEach(img => img.classList.remove('active'));
            
            // Calculate the index of the next slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Show the new current slide
            slides[currentSlide].classList.add('active');
        };
        
        // Set the first slide to be visible immediately on load
        slides[0].classList.add('active');
        
        // Start the automatic rotation timer (runs every 4000 milliseconds = 4 seconds)
        setInterval(showNextSlide, 4000); 
    }

    // Get all carousels and start them
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        startCarousel(carousel);
    });

}); // End of DOMContentLoaded