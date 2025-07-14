// artworkData is now generated inline in the HTML template

document.addEventListener('DOMContentLoaded', function() {
    const artworkItems = document.querySelectorAll('.artwork-item');
    const modal = document.getElementById('artwork-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalProcess = document.getElementById('modal-process');
    const processImages = document.getElementById('process-images');
    const seriesThumbnails = document.getElementById('series-thumbnails');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    
    let currentImageIndex = 0;
    let currentArtwork = null;

    artworkItems.forEach(item => {
        item.addEventListener('click', function() {
            const artworkId = this.dataset.artwork;
            const artwork = artworkData[artworkId];
            const imgSrc = this.querySelector('img').src;
            
            currentImageIndex = 0;
            currentArtwork = artwork;
            
            modalTitle.textContent = artwork.title;
            modalDescription.textContent = artwork.description;
            modalProcess.textContent = artwork.process;
            
            // Setup series thumbnails
            seriesThumbnails.innerHTML = '';
            if (artwork.seriesImages && artwork.seriesImages.length > 0) {
                artwork.seriesImages.forEach((imageSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = `series image ${index + 1}`;
                    img.className = 'thumbnail';
                    if (index === 0) img.classList.add('active');
                    
                    img.addEventListener('click', () => {
                        currentImageIndex = index;
                        updateMainImage(artwork.seriesImages[index]);
                        updateActiveThumbnail(index);
                    });
                    
                    seriesThumbnails.appendChild(img);
                });
                
                // Set initial main image
                modalImage.src = artwork.seriesImages[0];
            } else {
                modalImage.src = imgSrc;
            }
            
            // Setup process images
            processImages.innerHTML = '';
            if (artwork.processImages) {
                artwork.processImages.forEach(imageSrc => {
                    const img = document.createElement('img');
                    img.src = imageSrc;
                    img.alt = 'process step';
                    processImages.appendChild(img);
                });
            }
            
            updateNavigationButtons();
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        } else if (event.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (event.key === 'ArrowRight') {
            navigateImage(1);
        }
    });
    
    prevBtn.addEventListener('click', () => navigateImage(-1));
    nextBtn.addEventListener('click', () => navigateImage(1));
    
    function navigateImage(direction) {
        if (!currentArtwork || !currentArtwork.seriesImages) return;
        
        const newIndex = currentImageIndex + direction;
        if (newIndex >= 0 && newIndex < currentArtwork.seriesImages.length) {
            currentImageIndex = newIndex;
            updateMainImage(currentArtwork.seriesImages[currentImageIndex]);
            updateActiveThumbnail(currentImageIndex);
            updateNavigationButtons();
        }
    }
    
    function updateMainImage(imageSrc) {
        modalImage.src = imageSrc;
    }
    
    function updateActiveThumbnail(activeIndex) {
        const thumbnails = seriesThumbnails.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === activeIndex);
        });
    }
    
    function updateNavigationButtons() {
        if (!currentArtwork || !currentArtwork.seriesImages) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === currentArtwork.seriesImages.length - 1;
    }
});