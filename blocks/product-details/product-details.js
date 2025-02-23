function setupProductDisplay(mainImageContainer, thumbnailsContainer) {
    const productDisplay = document.createElement('div');
    productDisplay.classList.add('product-display');

    const mainImage = mainImageContainer.cloneNode(true);
    mainImage.classList.add('main-image');

    const thumbnailsWrapper = thumbnailsContainer.cloneNode(true);
    thumbnailsWrapper.classList.add('thumbnails-wrapper');
    
    [...thumbnailsWrapper.children].forEach(thumb => {
        thumb.classList.add('thumbnail');
    });

    productDisplay.appendChild(mainImage);
    productDisplay.appendChild(thumbnailsWrapper);
    return productDisplay;
}

function setupColorSection(colorSection) {
    colorSection.classList.add('color-selection');
    const colorHeader = colorSection.children[0];
    console.log(colorHeader)
    const colorOptions = colorSection.children[1];
    console.log(colorOptions)
    colorOptions.classList.add('color-options');

    const selectedColorText = colorHeader.querySelector('p');
    colorOptions.insertAdjacentElement('afterend', selectedColorText);

    const colorMap = {
        'Peach': '#fee1d2',
        'Khaki': '#f9efe5',
        'Rain': '#d4e3ec',
        'Mint': '#d8f0d8'
    };

    [...colorOptions.children].forEach(colorText => {
        const colorName = colorText.textContent;
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = colorMap[colorName];
        colorBox.setAttribute('data-color', colorName);
        
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
    const sizes = sizesText.split(' ');

    sizeOptions.innerHTML = '';

    sizes.forEach(size => {
        const sizeBox = document.createElement('div');
        sizeBox.classList.add('size-box');
        sizeBox.textContent = size;
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
}

function setupActionButtons(actionSection) {
    actionSection.classList.add('action-buttons');
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
