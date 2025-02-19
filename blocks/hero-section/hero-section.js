export default function decorate(block) {
    const imageSlides = [...block.children].filter(child => child.querySelector('picture'));
    const textElements = [...block.children].filter(child => !child.querySelector('picture'));
    const shopNowButton = textElements.pop();

    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    
    const slidesWrapper = document.createElement('div');
    slidesWrapper.classList.add('slides-wrapper');

    imageSlides.forEach((slide, index) => {
        slide.classList.add('slide');
        if (index === 0) slide.classList.add('active');

        const textContainer = document.createElement('div');
        textContainer.classList.add('hero-text');

        const textStartIndex = index * 2;
        
        if (textElements[textStartIndex] && textElements[textStartIndex + 1]) {
            textContainer.appendChild(textElements[textStartIndex]);
            textContainer.appendChild(textElements[textStartIndex + 1]);
            textContainer.appendChild(shopNowButton);
        }

        slide.appendChild(textContainer);
        slidesWrapper.appendChild(slide);
    });

    const indicators = document.createElement('div');
    indicators.classList.add('carousel-indicators');
    
    for (let i = 0; i < imageSlides.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('indicator');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => showSlide(i);
        indicators.appendChild(dot);
    }

    carousel.appendChild(slidesWrapper);
    const carouselSection = document.createElement('div');
    carouselSection.classList.add('carousel-section');
    carouselSection.appendChild(carousel);
    carouselSection.appendChild(indicators);

    block.innerHTML = '';
    block.appendChild(carouselSection);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.indicator');

    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}
