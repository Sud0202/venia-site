export default function decorate(block) {
    const images = [...block.children].filter(child => child.querySelector('picture'));
    const textContent = [...block.children].filter(child => !child.querySelector('picture'));
    console.log(textContent);
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

    textWrapper.appendChild(title);
    textWrapper.appendChild(subtitle);
    textWrapper.appendChild(description);

    const linksContainer = document.createElement('div');
    linksContainer.classList.add('signature-links');
    linksContainer.appendChild(links[0]);
    textWrapper.appendChild(linksContainer);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('signature-image');
    imageWrapper.appendChild(images[0]);
    contentWrapper.appendChild(textWrapper);
    contentWrapper.appendChild(imageWrapper);

    signatureWrapper.appendChild(contentWrapper);

    block.innerHTML = '';
    block.appendChild(signatureWrapper);
}
