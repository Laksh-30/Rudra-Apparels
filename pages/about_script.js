document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // 1. TIMELINE SHRINK/EXPAND ON SCROLL LOGIC (NEW)
    // =========================================================
    
    const timelineWrapper = document.getElementById('timeline-wrapper');
    let lastScrollTop = 0; // Tracks the last scroll position
    
    // We only need this logic if the element exists (i.e., not on mobile where it's hidden)
    if (timelineWrapper) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            // Start shrinking/expanding after 100px of scroll
            const scrollThreshold = 100; 

            // Shrink Logic: Only shrink when scrolling DOWN and past the threshold
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                timelineWrapper.classList.add('timeline-scrolled');
            } 
            // Expand Logic: Expand when scrolling UP or if we are near the top
            else if (scrollTop < lastScrollTop || scrollTop <= scrollThreshold) {
                timelineWrapper.classList.remove('timeline-scrolled');
            }

            // Update the last scroll position for the next check
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    
    // =========================================================
    // 2. HORIZONTAL TIMELINE SCROLL-TRACKING & CLICK LOGIC (Existing Code)
    // =========================================================

    const timelinePoints = document.querySelectorAll('.timeline-point');
    const storySections = document.querySelectorAll('.story-block[data-section-year]');

    if (storySections.length === 0) {
        return; 
    }

    function updateTimelineOnScroll() {
        for (let i = storySections.length - 1; i >= 0; i--) {
            const section = storySections[i];
            const rect = section.getBoundingClientRect();
            // Adjusted trigger zone to accommodate the shrunken timeline height
            const triggerZone = window.innerHeight * 0.25; 

            if (rect.top <= triggerZone && rect.bottom >= triggerZone) {
                
                const activeYear = section.getAttribute('data-section-year');
                
                timelinePoints.forEach(point => point.classList.remove('active'));

                const activePoint = document.querySelector(`.timeline-point[data-year="${activeYear}"]`);
                if (activePoint) {
                    activePoint.classList.add('active');
                    activePoint.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
                return; 
            }
        }
    }

    updateTimelineOnScroll();
    window.addEventListener('scroll', updateTimelineOnScroll);
    
    // Click listeners to jump to the section
    timelinePoints.forEach(point => {
        point.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            const targetSection = document.querySelector(`.story-block[data-section-year="${year}"]`);
            
            if (targetSection) {
                // Now using the shrunken header/timeline height (approx 55px + padding)
                const stickyHeight = 110; // Combined height of shrunken header (~55px) and shrunken timeline (~55px)
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - stickyHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});