document.addEventListener('DOMContentLoaded', function() {
    // This script file can be used for any Products page-specific interactivity 
    // that the global script doesn't cover (e.g., product lightboxes, filters).

    // Since the header menu logic is in ../script.js, ensure you don't duplicate it here.
    // The main-header, menu-toggle, and main-nav IDs in your HTML are correctly set 
    // to be found by the global script.
    
    // For now, we will leave this simple.
    console.log("Products page specific scripts loaded.");
});

const carousel = document.getElementById("bestSellingCarousel");

let scrollAmount = 0;
let scrollStep = 1;
let autoScroll;

function startAutoScroll() {
    autoScroll = setInterval(() => {
        carousel.scrollLeft += scrollStep;
        scrollAmount += scrollStep;

        if (scrollAmount >= carousel.scrollWidth / 2) {
            carousel.scrollLeft = 0;
            scrollAmount = 0;
        }
    }, 20);
}

function stopAutoScroll() {
    clearInterval(autoScroll);
}

carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

startAutoScroll();
