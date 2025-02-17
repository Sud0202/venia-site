export default function decorate(block) {
    // Separate children into text content and images
    const images = Array.from(block.children).filter(child => child.querySelector('picture'));
    const textContent = Array.from(block.children).filter(child => !child.querySelector('picture'));

    // Assuming text content consists of the title, subtitle, description, and links
    const title = textContent[0] || null;
    const subtitle = textContent[1] || null;
    const description = textContent[2] || null;
    const links = textContent.slice(3);  // Remaining text content are links (e.g., "Shop Heels", "Shop All Shoes")

    // Create the wrapper div for the signature section
    const signatureWrapper = document.createElement('div');
    signatureWrapper.classList.add('signature-section-wrapper');

    // Create the flex container for text and image
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('signature-content-wrapper');
    contentWrapper.style.display = 'flex';
    contentWrapper.style.justifyContent = 'space-between';
    contentWrapper.style.alignItems = 'center';

    // Create the left side (text content)
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('signature-text');

    // Add the title if it exists
    if (title) {
        const titleElement = title.cloneNode(true);
        textWrapper.appendChild(titleElement);
    }

    // Add the subtitle if it exists
    if (subtitle) {
        const subtitleElement = subtitle.cloneNode(true);
        textWrapper.appendChild(subtitleElement);
    }

    // Add the description if it exists
    if (description) {
        const descriptionElement = description.cloneNode(true);
        textWrapper.appendChild(descriptionElement);
    }

    // Add the links below the text content
    const linksContainer = document.createElement('div');
    linksContainer.classList.add('signature-links');
    links.forEach(linkElement => {
        const linkClone = linkElement.cloneNode(true);
        linksContainer.appendChild(linkClone);
    });
    textWrapper.appendChild(linksContainer);

    // Create the right side (image content)
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('signature-image');

    if (images.length > 0) {
        images.forEach(image => {
            const imageClone = image.cloneNode(true);
            imageWrapper.appendChild(imageClone);
        });
    }

    // Append the text and image to the content wrapper
    contentWrapper.appendChild(textWrapper);
    contentWrapper.appendChild(imageWrapper);

    // Append the content wrapper to the signature wrapper
    signatureWrapper.appendChild(contentWrapper);

    // Clear the block content and add the new signature section wrapper
    block.innerHTML = '';
    block.appendChild(signatureWrapper);
}
