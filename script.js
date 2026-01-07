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

    
    // // =========================================================
    // 4. ASYNCHRONOUS CONTACT FORM HANDLER (NEW CODE)
    // =========================================================
    
    const form = document.getElementById('contactForm');
    // NOTE: This targets the ID you added in the HTML: id="form-status-message"
    const statusMessageDiv = document.getElementById('form-status-message'); 

    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Stop the default page reload

            // 1. Show the "Submitting..." spinner
            statusMessageDiv.innerHTML = `
                <div class="loading-spinner">
                    Submitting...
                </div>
            `;

            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            try {
                // Send data to your Node.js server
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formObject)
                });
                
                // Server should respond with JSON: { status: 'success' } or { status: 'failure' }
                const result = await response.json(); 

                // 2. Handle Success or Failure
                if (result.status === 'success') {
                    statusMessageDiv.innerHTML = `
                        <p class="success-message">
                            ✅ Your message has been submitted. We will connect with you shortly.
                        </p>
                    `;
                    form.reset(); // Clear the form fields
                } else {
                    statusMessageDiv.innerHTML = `
                        <p class="error-message">
                            ❌ Submission failed. Please try again later or chat with us on WhatsApp.
                        </p>
                    `;
                }

            } catch (error) {
                console.error('Error submitting form:', error);
                statusMessageDiv.innerHTML = `
                    <p class="error-message">
                        ❌ A connection error occurred. Please try again later.
                    </p>
                `;
            }
        });
    }

}); // End of DOMContentLoaded (KEEP THIS)


// ===== SMOOTH PAGE TRANSITION =====
document.querySelectorAll('a[href]').forEach(link => {
    const url = link.getAttribute('href');

    // Ignore external links, anchors, new tabs
    if (
        !url ||
        url.startsWith('#') ||
        url.startsWith('http') ||
        link.target === '_blank'
    ) return;

    link.addEventListener('click', e => {
        e.preventDefault();

        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = url;
        }, 300); // must match CSS transition
    });
});

// Ensure fade-in on page load
window.addEventListener('pageshow', () => {
    document.body.classList.remove('fade-out');
});

// Page fade-in on load
window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});

// Page fade-out before navigation
document.querySelectorAll("a[href]").forEach(link => {
    const url = link.getAttribute("href");

    // Only internal links
    if (url && !url.startsWith("#") && !url.startsWith("http")) {
        link.addEventListener("click", e => {
            e.preventDefault();
            document.body.classList.remove("page-loaded");

            setTimeout(() => {
                window.location.href = url;
            }, 250);
        });
    }
});

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("nav-open");
});


document.querySelectorAll('[data-slider]').forEach(slider => {
    const images = slider.querySelectorAll('img');
    let index = 0;

    setInterval(() => {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
    }, 3500); // change speed if needed
});
