export default function decorate(block) {
  const slides = Array.from(block.children).filter(child => child.querySelector('picture'));
  const textContent = Array.from(block.children).filter(child => !child.querySelector('picture'));

  const carousel = document.createElement('div');
  carousel.classList.add('carousel');

  const slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('slides-wrapper');

  slides.forEach((slide, index) => {
      slide.classList.add('slide');
      if (index === 0) slide.classList.add('active');
      slidesWrapper.appendChild(slide);
  });

  carousel.appendChild(slidesWrapper);
  block.innerHTML = ''; 
  block.appendChild(carousel);

  const textContainer = document.createElement('div');
  textContainer.classList.add('hero-text');
  textContent.forEach(textBlock => textContainer.appendChild(textBlock));
  carousel.appendChild(textContainer);

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
