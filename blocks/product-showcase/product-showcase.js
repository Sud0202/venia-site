import { loadCSS, loadScript } from '../../scripts/aem.js';

export default async function decorate(block) {
    
    // Create wrapper for products
    const productsWrapper = document.createElement('div');
    productsWrapper.classList.add('products-slider');
    
    try {
        // Load Slick CSS and JS
        await loadCSS('https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css');
        await loadCSS('https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css');
        await loadScript('https://code.jquery.com/jquery-3.6.0.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js');

        // Fetch products
        const response = await fetch('http://localhost:3000/products.json');
        const data = await response.json();
        
        // Create product cards
        data.data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">${product.price}</p>
                    <div class="product-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </div>
                </div>
            `;
            
            productsWrapper.appendChild(productCard);
        });
        
        // Clear and add products wrapper to block
        block.textContent = '';
        block.appendChild(productsWrapper);
        
        // Wait for jQuery to be available
        setTimeout(() => {
            // Initialize Slick
            if (typeof $ !== 'undefined') {
                $(productsWrapper).slick({
                    dots: true,
                    arrows: false,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    dotsClass: 'custom-slick-dots',
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        }, 1000);
        
    } catch (error) {
        console.error('Error loading products');
    }
}
