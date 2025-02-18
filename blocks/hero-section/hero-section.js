export default function decorate(block) {
    // Get all slides and text content
    const imageSlides = [...block.children].filter(child => child.querySelector('picture'));
    const textElements = [...block.children].filter(child => !child.querySelector('picture'));
    const shopNowButton = textElements.pop();

    // Create carousel structure
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    
    const slidesWrapper = document.createElement('div');
    slidesWrapper.classList.add('slides-wrapper');

    // Build slides
    imageSlides.forEach((slide, index) => {
        slide.classList.add('slide');
        if (index === 0) slide.classList.add('active');

        // Create text container
        const textContainer = document.createElement('div');
        textContainer.classList.add('hero-text');

        // Calculate start index for this slide's text content
        const textStartIndex = index * 2;
        
        // Add title and description if they exist for this slide
        if (textElements[textStartIndex] && textElements[textStartIndex + 1]) {
            textContainer.appendChild(textElements[textStartIndex].cloneNode(true));
            textContainer.appendChild(textElements[textStartIndex + 1].cloneNode(true));
            textContainer.appendChild(shopNowButton.cloneNode(true));
        }

        slide.appendChild(textContainer);
        slidesWrapper.appendChild(slide);
    });

    // Create indicators
    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    
    imageSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('indicator');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showSlide(index));
        indicators.appendChild(dot);
    });

    // Assemble final structure
    carousel.appendChild(slidesWrapper);
    const carouselSection = document.createElement('div');
    carouselSection.classList.add('carousel-section');
    carouselSection.appendChild(carousel);
    carouselSection.appendChild(indicators);

    // Replace content
    block.innerHTML = '';
    block.appendChild(carouselSection);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.indicator');

    // Update slides
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    // Update indicators
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}
