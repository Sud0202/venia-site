export default function decorate(block) {
    // 1. Make our main container
    const container = document.createElement('div');
    container.className = 'info-content-wrapper';

    // 2. Make container for the image
    const imageBox = document.createElement('div');
    imageBox.className = 'info-image-wrapper';
    
    // 3. Make container for all the text
    const textBox = document.createElement('div');
    textBox.className = 'info-text-wrapper';

    // 4. Get all the content pieces from the block
    const allPieces = [...block.children];

    // 5. Put the image in its container
    const image = allPieces[0].querySelector('div');
    imageBox.innerHTML = image.innerHTML;

    // 6. Put all text pieces in the text container
    for (let i = 1; i < allPieces.length; i++) {
        const text = allPieces[i].querySelector('div');
        const textPiece = document.createElement('div');
        textPiece.innerHTML = text.innerHTML;
        textBox.appendChild(textPiece);
    }

    // 7. Make the "Shop" link look nice
    const link = textBox.querySelector('a');
    if (link) {
        link.className = 'info-link';
    }

    // 8. Put everything together
    container.appendChild(imageBox);
    container.appendChild(textBox);
    
    // 9. Clear the old content and add our new organized content
    block.innerHTML = '';
    block.appendChild(container);
}
