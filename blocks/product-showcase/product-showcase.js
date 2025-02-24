export default async function decorate(block) {
    const productsWrapper = document.createElement('div');
    productsWrapper.classList.add('products-slider');

    try {
        const data = await fetchProductsData();
        data.data.forEach(product => {
            const productCard = createProductCard(product);
            productsWrapper.appendChild(productCard);
        });
        
        block.textContent = '';
        block.appendChild(productsWrapper);

        initializeSlickSlider(productsWrapper);
    } catch (error) {
        console.error('Error loading products');
    }
}

async function fetchProductsData() {
    const response = await fetch('http://localhost:3000/query-index.json');
    return response.json();
}

function createProductCard(product) {
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
    return productCard;
}

function initializeSlickSlider(productsWrapper) {
            $(productsWrapper).slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                dotsClass: 'custom-slick-dots',
                responsive: [
                    {
                        breakpoint: 900 ,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
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
                        breakpoint: 300,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
}
