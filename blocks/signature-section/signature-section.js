function separateContent(block) {
    const images = [...block.children].filter(child => child.querySelector('picture'));
    const textContent = [...block.children].filter(child => !child.querySelector('picture'));
    
    return {
        images,
        title: textContent[0] || null,
        subtitle: textContent[1] || null,
        description: textContent[2] || null,
        links: textContent.slice(3)
    };
}

function createTextWrapper(title, subtitle, description, links) {
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('signature-text');

    textWrapper.appendChild(title);
    textWrapper.appendChild(subtitle);
    textWrapper.appendChild(description);

    const linksContainer = document.createElement('div');
    linksContainer.classList.add('signature-links');
    linksContainer.appendChild(links[0]);
    textWrapper.appendChild(linksContainer);

    return textWrapper;
}

function createImageWrapper(images) {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('signature-image');
    imageWrapper.appendChild(images[0]);
    return imageWrapper;
}

function createContentWrapper(textWrapper, imageWrapper) {
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('signature-content-wrapper');
    
    contentWrapper.appendChild(textWrapper);
    contentWrapper.appendChild(imageWrapper);
    
    return contentWrapper;
}

function createSignatureWrapper(contentWrapper) {
    const signatureWrapper = document.createElement('div');
    signatureWrapper.classList.add('signature-section-wrapper');
    signatureWrapper.appendChild(contentWrapper);
    return signatureWrapper;
}

export default function decorate(block) {
    const { images, title, subtitle, description, links } = separateContent(block);
    
    const textWrapper = createTextWrapper(title, subtitle, description, links);
    const imageWrapper = createImageWrapper(images);
    const contentWrapper = createContentWrapper(textWrapper, imageWrapper);
    const signatureWrapper = createSignatureWrapper(contentWrapper);

    block.innerHTML = '';
    block.appendChild(signatureWrapper);
}
