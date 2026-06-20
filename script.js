// Get all gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
let currentIndex = 0;
let visibleItems = [];

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.classList.add('hidden');
            }
        });

        // Update visible items array
        updateVisibleItems();
    });
});

// Update visible items array
function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
}

// Initialize visible items
updateVisibleItems();

// Open lightbox
function openLightbox(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h3').textContent;

    // Find index in visible items
    currentIndex = visibleItems.indexOf(galleryItem);

    lightboxImg.src = img.src;
    lightboxTitle.textContent = title;
    lightbox.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate images
function navigateImage(direction) {
    currentIndex += direction;

    // Handle wrap-around
    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    const currentItem = visibleItems[currentIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('h3').textContent;

    // Add fade effect
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxTitle.textContent = title;
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
    if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
        navigateImage(-1);
    }
    if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
        navigateImage(1);
    }
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Add smooth transition to lightbox image
lightboxImg.style.transition = 'opacity 0.2s ease';

// Add click event to gallery items for direct image click
galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('view-btn')) {
            const viewBtn = item.querySelector('.view-btn');
            openLightbox(viewBtn);
        }
    });
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
