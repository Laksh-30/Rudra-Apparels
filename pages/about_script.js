document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // 1. HORIZONTAL TIMELINE SCROLL-TRACKING LOGIC
    // =========================================================

    const timelinePoints = document.querySelectorAll('.timeline-point');
    // Get all story blocks that have a data-section-year attribute
    const storySections = document.querySelectorAll('.story-block[data-section-year]');

    if (storySections.length === 0) {
        // Exit if no sections are found to track
        return; 
    }

    /**
     * Finds which story section is currently visible in the viewport 
     * and updates the corresponding timeline point.
     */
    function updateTimelineOnScroll() {
        // Iterate backward to prioritize sections closer to the top of the viewport
        for (let i = storySections.length - 1; i >= 0; i--) {
            const section = storySections[i];
            
            // Get the section's position relative to the viewport
            const rect = section.getBoundingClientRect();
            
            // Define the trigger zone: the section is visible and its top is above 20% of the viewport height.
            // Using 20% (e.g., 200px from top) prevents the highlight from changing too early.
            const triggerZone = window.innerHeight * 0.2; 

            if (rect.top <= triggerZone && rect.bottom >= triggerZone) {
                
                // --- Found the active section ---
                const activeYear = section.getAttribute('data-section-year');
                
                // 1. Remove 'active' class from ALL points
                timelinePoints.forEach(point => point.classList.remove('active'));

                // 2. Find and add 'active' class to the matching point
                const activePoint = document.querySelector(`.timeline-point[data-year="${activeYear}"]`);
                if (activePoint) {
                    activePoint.classList.add('active');
                    
                    // Optional: Scroll the timeline horizontally if it were wider than the screen
                    activePoint.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
                
                // Stop the loop once the currently visible section is found
                return; 
            }
        }
    }

    // Run the update function immediately on load and then on every scroll event
    updateTimelineOnScroll();
    window.addEventListener('scroll', updateTimelineOnScroll);
    
    // Optional: Add click listeners to timeline points to jump to the section
    timelinePoints.forEach(point => {
        point.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            const targetSection = document.querySelector(`.story-block[data-section-year="${year}"]`);
            
            if (targetSection) {
                // Scroll the window to the target section, adjusted for the fixed header height (~80px)
                const headerHeight = 90; 
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});