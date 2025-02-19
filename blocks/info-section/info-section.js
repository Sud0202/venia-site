export default function decorate(block) {
    const container = document.createElement('div');
    container.className = 'info-content-wrapper';

    const imageBox = document.createElement('div');
    imageBox.className = 'info-image-wrapper';
    
    const textBox = document.createElement('div');
    textBox.className = 'info-text-wrapper';

    const allPieces = [...block.children];

    const image = allPieces[0].querySelector('div');
    imageBox.innerHTML = image.innerHTML;

    for (let i = 1; i < allPieces.length; i++) {
        const text = allPieces[i].querySelector('div');
        const textPiece = document.createElement('div');
        textPiece.innerHTML = text.innerHTML;
        textBox.appendChild(textPiece);
    }

    const link = textBox.querySelector('a');
    if (link) {
        link.className = 'info-link';
    }

    container.appendChild(imageBox);
    container.appendChild(textBox);
    
    block.innerHTML = '';
    block.appendChild(container);
}
