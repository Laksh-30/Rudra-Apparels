document.addEventListener('DOMContentLoaded', function() {

    // Target all card carousels in the grid
    const carousels = document.querySelectorAll('.category-card-collection');
    
    /**
     * Initializes the image rotation for a single card.
     * @param {HTMLElement} card The container div for the category card.
     */
    function startCardRotation(card) {
        // Get all image elements within the card's carousel wrapper
        const images = card.querySelectorAll('.carousel-img');
        let currentIndex = 0;
        const intervalTime = 3000; // Time in milliseconds (3 seconds)

        if (images.length < 2) {
            // If there's only one or no image, no rotation needed.
            return;
        }

        const rotateImage = () => {
            // 1. Hide the current image
            images[currentIndex].classList.remove('active');

            // 2. Move to the next index (looping back to 0 if needed)
            currentIndex = (currentIndex + 1) % images.length;

            // 3. Show the new image
            images[currentIndex].classList.add('active');
        };

        // Start the rotation timer
        setInterval(rotateImage, intervalTime);
    }

    // Loop through all category cards and start the rotation
    carousels.forEach(card => {
        startCardRotation(card);
    });

});