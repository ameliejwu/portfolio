// Gallery and Lightbox functionality
class GalleryLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxContent = document.getElementById('lightbox-content'); // Changed from lightboxImg
        this.currentImageSpan = document.getElementById('current-image');
        this.totalImagesSpan = document.getElementById('total-images');
        this.closeBtn = document.querySelector('.close');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.video-item)'));
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        // Set total images count
        this.totalImagesSpan.textContent = this.galleryItems.length;
        
        // Add click listeners to gallery items
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });
        
        // Add lightbox controls
        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        this.prevBtn.addEventListener('click', () => this.previousImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        // Close lightbox when clicking outside the content
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }
    
    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightboxContent();
        this.lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        this.lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    updateLightboxContent() {
        const currentItem = this.galleryItems[this.currentIndex];
        const img = currentItem.querySelector('img');
        
        // Clear previous content
        this.lightboxContent.innerHTML = '';

        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        imgElement.classList.add('lightbox-content');
        this.lightboxContent.appendChild(imgElement);
        
        this.currentImageSpan.textContent = this.currentIndex + 1;
        this.updateNavigationButtons();
    }
    
    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.updateLightboxContent();
    }
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
        this.updateLightboxContent();
    }
    
    updateNavigationButtons() {
        this.prevBtn.style.opacity = '1';
        this.nextBtn.style.opacity = '1';
    }
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GalleryLightbox();
});