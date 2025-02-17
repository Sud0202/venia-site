export default function decorate(block) {
    const slides = Array.from(block.children).filter(child => child.querySelector('picture'));
    const textContent = Array.from(block.children).filter(child => !child.querySelector('picture'));

    // Group text content into sets (title + description)
    const textSets = [];
    const shopNowButton = textContent[textContent.length - 1]; // Last element is always the shop now button
    
    // Group text content in pairs (excluding the shop now button)
    for (let i = 0; i < textContent.length - 1; i += 2) {
        if (textContent[i] && textContent[i + 1]) {
            textSets.push({
                title: textContent[i],
                description: textContent[i + 1]
            });
        }
    }

    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    const slidesWrapper = document.createElement('div');
    slidesWrapper.classList.add('slides-wrapper');

    // Create slides with corresponding text
    slides.forEach((slide, index) => {
        slide.classList.add('slide');
        if (index === 0) slide.classList.add('active');
        
        // Create text container for this slide
        const textContainer = document.createElement('div');
        textContainer.classList.add('hero-text');
        
        // Add corresponding text content if available
        if (textSets[index]) {
            textContainer.appendChild(textSets[index].title.cloneNode(true));
            textContainer.appendChild(textSets[index].description.cloneNode(true));
            // Add shop now button to each slide
            textContainer.appendChild(shopNowButton.cloneNode(true));
        }
        
        slide.appendChild(textContainer);
        slidesWrapper.appendChild(slide);
    });

    carousel.appendChild(slidesWrapper);
    block.innerHTML = '';
    block.appendChild(carousel);

    // Create carousel section and indicators
    const carouselSection = document.createElement('div');
    carouselSection.classList.add('carousel-section');
    
    block.removeChild(carousel);
    carouselSection.appendChild(carousel);
    
    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    
    slides.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
        indicators.appendChild(indicator);
    });
    
    carouselSection.appendChild(indicators);
    block.appendChild(carouselSection);

    let currentIndex = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
}
