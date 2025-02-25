function createHeroIndicators(imageSlides) {
    const indicators = document.createElement('div');
    indicators.classList.add('hero-carousel-indicators');
    
    for (let i = 0; i < imageSlides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('hero-indicator');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => showHeroSlide(i);
        indicators.appendChild(dot);
    }
    
    return indicators;
}

function createHeroTextContainer(textElements, shopNowButton, index) {
    const textContainer = document.createElement('div');
    textContainer.classList.add('hero-slide-text');
    
    const textStartIndex = index * 2;
    const heading = textElements[textStartIndex];
    const subtext = textElements[textStartIndex + 1];

    if (heading) {
        textContainer.appendChild(heading);
    }
    
    if (subtext) {
        textContainer.appendChild(subtext);
    }
    
    if (heading || subtext) {
        textContainer.appendChild(shopNowButton.cloneNode(true));
    }
    
    return textContainer;
}

function createHeroSlidesWrapper(imageSlides, textElements, shopNowButton) {
    const slidesWrapper = document.createElement('div');
    slidesWrapper.classList.add('hero-slides-wrapper');

    imageSlides.forEach((slide, index) => {
        slide.classList.add('hero-slide');
        if (index === 0) slide.classList.add('active');

        const textContainer = createHeroTextContainer(textElements, shopNowButton, index);
        slide.appendChild(textContainer);
        slidesWrapper.appendChild(slide);
    });

    return slidesWrapper;
}

function createHeroCarousel(slidesWrapper) {
    const carousel = document.createElement('div');
    carousel.classList.add('hero-carousel');
    carousel.appendChild(slidesWrapper);
    return carousel;
}

function showHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-indicator');

    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

export default function decorate(block) {
    const imageSlides = [...block.children].filter(child => child.querySelector('picture'));
    const textElements = [...block.children].filter(child => !child.querySelector('picture'));
    const shopNowButton = textElements.pop();

    const slidesWrapper = createHeroSlidesWrapper(imageSlides, textElements, shopNowButton);
    const carousel = createHeroCarousel(slidesWrapper);
    const indicators = createHeroIndicators(imageSlides);

    const carouselSection = document.createElement('div');
    carouselSection.classList.add('hero-carousel-section');
    carouselSection.appendChild(carousel);
    carouselSection.appendChild(indicators);

    block.innerHTML = '';
    block.appendChild(carouselSection);
}
