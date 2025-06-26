// --- 1. CONFIGURATION ---
// Add the paths to your images in the img folder here.
const imageUrls = [
    'img/centrale-pixel-ultrahdr.jpg',
    'img/rochetta-pixel-ultrahdr.jpg',
    'img/iceberg-hdr.avif',
    'img/iceberg-sdr.jpg',
    // e.g., 'img/my-awesome-photo.jpg',
];
// ------------------------

// --- DOM ELEMENTS ---
const slideshowWrapper = document.querySelector('.slideshow-wrapper');
const dotsContainer = document.querySelector('.dots-container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slideshowContainer = document.querySelector('.slideshow-container');

// --- STATE ---
let currentSlide = 0;
let slides = [];
let dots = [];
let touchstartX = 0;
let touchendX = 0;

/**
 * Moves the slideshow to the specified slide number.
 * @param {number} n - The index of the slide to show.
 */
function showSlide(n) {
    // Wrap around if n is out of bounds
    currentSlide = (n + slides.length) % slides.length;

    // Move the wrapper to show the correct slide
    slideshowWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update the active state on the dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

/**
 * Handles the swipe gesture to navigate slides.
 */
function handleSwipe() {
    const swipeThreshold = 50; // Minimum pixel distance for a swipe
    if (touchendX < touchstartX - swipeThreshold) {
        nextSlide();
    }
    if (touchendX > touchstartX + swipeThreshold) {
        prevSlide();
    }
}

/**
 * Initializes the slideshow, creates elements, and sets up event listeners.
 */
function initializeSlideshow() {
    if (imageUrls.length === 0) {
        slideshowContainer.innerHTML = '<p style="text-align:center; padding: 2rem;">Please add image URLs in js/script.js</p>';
        return;
    }

    // Create slide and dot elements for each image
    imageUrls.forEach((url, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Slide ${i + 1}`;
        slide.appendChild(img);
        slideshowWrapper.appendChild(slide);
        slides.push(slide);

        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });

    showSlide(0);

    // Setup event listeners for navigation
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    slideshowContainer.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX; }, { passive: true });
    slideshowContainer.addEventListener('touchend', e => { touchendX = e.changedTouches[0].screenX; handleSwipe(); });
}

// Start the slideshow once the page content is loaded
document.addEventListener('DOMContentLoaded', initializeSlideshow);