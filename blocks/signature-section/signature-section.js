export default function decorate(block) {
    const images = [...block.children].filter(child => child.querySelector('picture'));
    const textContent = [...block.children].filter(child => !child.querySelector('picture'));

    const title = textContent[0] || null;
    const subtitle = textContent[1] || null;
    const description = textContent[2] || null;
    const links = textContent.slice(3);

    const signatureWrapper = document.createElement('div');
    signatureWrapper.classList.add('signature-section-wrapper');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('signature-content-wrapper');

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('signature-text');

    if (title) {
        const titleElement = title.cloneNode(true);
        textWrapper.appendChild(titleElement);
    }

    if (subtitle) {
        const subtitleElement = subtitle.cloneNode(true);
        textWrapper.appendChild(subtitleElement);
    }

    if (description) {
        const descriptionElement = description.cloneNode(true);
        textWrapper.appendChild(descriptionElement);
    }

    const linksContainer = document.createElement('div');
    linksContainer.classList.add('signature-links');
    links.forEach(linkElement => {
        const linkClone = linkElement.cloneNode(true);
        linksContainer.appendChild(linkClone);
    });
    textWrapper.appendChild(linksContainer);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('signature-image');

    if (images.length > 0) {
        images.forEach(image => {
            const imageClone = image.cloneNode(true);
            imageWrapper.appendChild(imageClone);
        });
    }

    contentWrapper.appendChild(textWrapper);
    contentWrapper.appendChild(imageWrapper);

    signatureWrapper.appendChild(contentWrapper);

    block.innerHTML = '';
    block.appendChild(signatureWrapper);
}
