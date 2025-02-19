export default function decorate(block) {

    const container = createContainer();

    const gallerySection = createGallerySection(block);
    
    const productInfo = createProductInfo(block);
    
    assembleAndRender(container, gallerySection, productInfo, block);
}

function createContainer() {
    const container = document.createElement('div');
    container.className = 'product-details-wrapper';
    return container;
}

function createGallerySection(block) {
    const gallerySection = document.createElement('div');
    gallerySection.className = 'gallery-section';

    const { thumbnailsContainer, mainImageContainer } = createImageContainers(block);
    
    gallerySection.appendChild(thumbnailsContainer);
    gallerySection.appendChild(mainImageContainer);
    
    return gallerySection;
}

function createImageContainers(block) {
    const thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.className = 'thumbnails-container';

    const mainImageContainer = document.createElement('div');
    mainImageContainer.className = 'main-image-container';

    const mainImage = block.children[0].querySelector('picture');
    mainImageContainer.appendChild(mainImage);

    const additionalImages = [...block.children[1].children];
    additionalImages.forEach((imgDiv) => {
        const thumbnailWrapper = document.createElement('div');
        thumbnailWrapper.className = 'thumbnail';
        thumbnailWrapper.appendChild(imgDiv.querySelector('picture'));
        thumbnailsContainer.appendChild(thumbnailWrapper);
    });

    return { thumbnailsContainer, mainImageContainer };
}

function createProductInfo(block) {
    const productInfo = block.children[2];
    productInfo.className = 'product-info';

    const titlePriceDiv = createTitlePriceSection(productInfo);
    const optionsSection = createOptionsSection();

    productInfo.textContent = '';
    productInfo.appendChild(titlePriceDiv);
    productInfo.appendChild(optionsSection);

    return productInfo;
}

function createTitlePriceSection(productInfo) {
    const titlePriceDiv = document.createElement('div');
    const title = productInfo.querySelector('h2');
    const price = productInfo.querySelector('p');
    titlePriceDiv.appendChild(title);
    titlePriceDiv.appendChild(price);
    return titlePriceDiv;
}

function createOptionsSection() {
    const optionsSection = document.createElement('div');
    optionsSection.className = 'product-options';

    optionsSection.appendChild(createColorSection());
    optionsSection.appendChild(createSizeSection());
    optionsSection.appendChild(createQuantitySection());
    optionsSection.appendChild(createCartSection());

    return optionsSection;
}

function createColorSection() {
    const section = document.createElement('div');
    section.className = 'option-section';
    section.innerHTML = `
        <h3>Fashion Color</h3>
        <div class="color-options">
            <button class="color-btn peach selected"></button>
            <button class="color-btn cream"></button>
            <button class="color-btn blue"></button>
            <button class="color-btn mint"></button>
        </div>
    `;
    return section;
}

function createSizeSection() {
    const section = document.createElement('div');
    section.className = 'option-section';
    section.innerHTML = `
        <h3>Fashion Size</h3>
        <div class="size-options">
            <button class="size-btn selected">XS</button>
            <button class="size-btn">M</button>
            <button class="size-btn">S</button>
            <button class="size-btn">L</button>
        </div>
    `;
    return section;
}

function createQuantitySection() {
    const section = document.createElement('div');
    section.className = 'option-section';
    section.innerHTML = `
        <h3>Quantity</h3>
        <div class="quantity-selector">
            <button class="quantity-btn minus">−</button>
            <input type="text" value="1" readonly>
            <button class="quantity-btn plus">+</button>
        </div>
    `;
    return section;
}

function createCartSection() {
    const section = document.createElement('div');
    section.className = 'option-section';
    section.innerHTML = `
        <div class="cart-button-pdp-container">
            <div class="cart-button-pdp">
                <button class="add-to-cart">Add to Cart</button>
            </div>
            <div class="favorite-button-pdp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <p>Add to Favorite</p>
            </div>
        </div>
    `;
    return section;
}

function assembleAndRender(container, gallerySection, productInfo, block) {
    container.appendChild(gallerySection);
    container.appendChild(productInfo);
    block.textContent = '';
    block.appendChild(container);
}
