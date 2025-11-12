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
    // 2. HEADER SHRINK/EXPAND ON SCROLL LOGIC
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
    // 3. PRODUCT CAROUSEL LOGIC 
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

    
    // =========================================================
    // 4. CONTACT FORM STATUS HANDLER (NEW CODE FOR MESSAGES)
    // =========================================================

    /**
     * Function to display a success or error message after form submission,
     * based on the URL query parameters set by the backend.
     */
    function handleContactFormStatus() {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        const messageContainer = document.getElementById('form-message-status');

        // Exit if the message container doesn't exist or no status is found
        if (!messageContainer || !status) {
            return; 
        }

        let messageHTML = '';
        let bgColor = '';
        let textColor = '';

        if (status === 'success') {
            messageHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We will be in touch shortly.';
            bgColor = '#e6ffe6'; // Light green background
            textColor = '#006400'; // Dark green text
        } else if (status === 'failure') {
            messageHTML = '<i class="fas fa-exclamation-triangle"></i> Error: Message failed to send. Please check your details or try contacting us via WhatsApp.';
            bgColor = '#ffe6e6'; // Light red background
            textColor = '#cc0000'; // Dark red text
        } else if (status === 'error') {
            // Used when fields are missing (redirected from server.js)
            messageHTML = '<i class="fas fa-times-circle"></i> Validation Error: Please fill in all required fields.';
            bgColor = '#ffeedd'; // Light orange background
            textColor = '#cc6600'; // Dark orange text
        }

        if (messageHTML) {
            // Apply inline styles and insert the message
            messageContainer.innerHTML = `
                <p style="padding: 15px; border-radius: 4px; border: 1px solid ${textColor}; background-color: ${bgColor}; color: ${textColor}; font-weight: 600;">
                    ${messageHTML}
                </p>
            `;
            
            // Clear the query parameters from the URL after a short delay
            setTimeout(() => {
                const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.replaceState({ path: newUrl }, '', newUrl);
            }, 5000); 
        }
    }

    // Execute the status checker when the page loads
    handleContactFormStatus();


}); // End of DOMContentLoaded