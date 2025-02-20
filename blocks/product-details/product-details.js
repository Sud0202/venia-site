function setupProductDisplay(mainImageContainer, thumbnailsContainer) {
    const productDisplay = document.createElement('div');
    productDisplay.classList.add('product-display');

    const mainImage = mainImageContainer.cloneNode(true);
    mainImage.classList.add('main-image');

    const thumbnailsWrapper = thumbnailsContainer.cloneNode(true);
    thumbnailsWrapper.classList.add('thumbnails-wrapper');
    
    [...thumbnailsWrapper.children].forEach((thumb, index) => {
        thumb.classList.add('thumbnail');
        if (index === 0) thumb.classList.add('active');
        
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.innerHTML = thumb.innerHTML;
        });
    });

    productDisplay.appendChild(mainImage);
    productDisplay.appendChild(thumbnailsWrapper);
    return productDisplay;
}

function setupColorSection(colorSection) {
    colorSection.classList.add('color-selection');
    const colorHeader = colorSection.children[0];
    const colorOptions = colorSection.children[1];
    colorOptions.classList.add('color-options');

    const selectedColorText = colorHeader.querySelector('p');
    colorHeader.removeChild(selectedColorText);
    colorOptions.insertAdjacentElement('afterend', selectedColorText);

    const colorMap = {
        'Peach': '#fee1d2',
        'Khaki': '#f9efe5',
        'Rain': '#d4e3ec',
        'Mint': '#d8f0d8'
    };

    [...colorOptions.children].forEach(colorText => {
        const colorName = colorText.textContent.trim();
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = colorMap[colorName];
        colorBox.setAttribute('data-color', colorName);
        
        colorBox.addEventListener('click', () => {
            document.querySelectorAll('.color-box').forEach(box => box.classList.remove('selected'));
            colorBox.classList.add('selected');
            selectedColorText.textContent = `Selected Fashion Color: ${colorName}`;
        });
        
        colorOptions.replaceChild(colorBox, colorText);
    });
}

function setupSizeSection(sizeSection) {
    sizeSection.classList.add('size-selection');
    const sizeHeader = sizeSection.children[0];
    const sizeOptions = sizeSection.children[1];
    sizeOptions.classList.add('size-options');

    const selectedSizeText = sizeHeader.querySelector('h2#selected-fashion-size-none');
    sizeHeader.removeChild(selectedSizeText);
    sizeOptions.insertAdjacentElement('afterend', selectedSizeText);

    const sizesText = sizeOptions.querySelector('p').textContent;
    const sizes = sizesText.split(' ').filter(Boolean);

    sizeOptions.innerHTML = '';

    sizes.forEach(size => {
        const sizeBox = document.createElement('div');
        sizeBox.classList.add('size-box');
        sizeBox.textContent = size;
        
        sizeBox.addEventListener('click', () => {
            document.querySelectorAll('.size-box').forEach(box => box.classList.remove('selected'));
            sizeBox.classList.add('selected');
            selectedSizeText.textContent = `Selected Fashion Size: ${size}`;
        });
        
        sizeOptions.appendChild(sizeBox);
    });
}

function setupQuantitySection(quantitySection) {
    quantitySection.classList.add('quantity-section');
    const quantityControls = quantitySection.children[1];
    quantityControls.classList.add('quantity-controls');

    const [minus, value, plus] = quantityControls.textContent.trim().split(' ');

    quantityControls.innerHTML = `
        <button class="rounded-btn minus">${minus}</button>
        <input type="text" value="${value}" class="squared-input">
        <button class="rounded-btn plus">${plus}</button>
    `;

    const quantityInput = quantityControls.querySelector('.squared-input');
    quantityControls.querySelector('.minus').addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) quantityInput.value = currentValue - 1;
    });
    quantityControls.querySelector('.plus').addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
}

function setupActionButtons(actionSection) {
    actionSection.classList.add('action-buttons');
    
    const addToCartButton = actionSection.children[0].querySelector('h2');
    addToCartButton.classList.add('add-to-cart-button');

    const favoritesButton = actionSection.children[1].querySelector('p');
    favoritesButton.classList.add('favorite-button');

    addToCartButton.addEventListener('click', () => {
        console.log('Add to cart clicked');
    });

    favoritesButton.addEventListener('click', () => {
        console.log('Add to favorites clicked');
    });
}

export default function decorate(block) {
    const [mainImageContainer, thumbnailsContainer, titleSection, colorSection, sizeSection, quantitySection, actionSection] = block.children;
    
    const productDisplay = setupProductDisplay(mainImageContainer, thumbnailsContainer);
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    titleSection.classList.add('title-price');
    setupColorSection(colorSection);
    setupSizeSection(sizeSection);
    setupQuantitySection(quantitySection);
    setupActionButtons(actionSection);

    productInfo.appendChild(titleSection);
    productInfo.appendChild(colorSection);
    productInfo.appendChild(sizeSection);
    productInfo.appendChild(quantitySection);
    productInfo.appendChild(actionSection);

    block.innerHTML = '';
    block.appendChild(productDisplay);
    block.appendChild(productInfo);
}
