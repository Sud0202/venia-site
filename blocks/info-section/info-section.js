function createImageBox(firstPiece) {
    const imageBox = document.createElement('div');
    imageBox.className = 'info-image-wrapper';
    
    const image = firstPiece.querySelector('div');
    imageBox.innerHTML = image.innerHTML;
    
    return imageBox;
}

function createTextBox(pieces) {
    const textBox = document.createElement('div');
    textBox.className = 'info-text-wrapper';

    for (let i = 1; i < pieces.length; i++) {
        const text = pieces[i].querySelector('div');
        const textPiece = document.createElement('div');
        textPiece.innerHTML = text.innerHTML;
        textBox.appendChild(textPiece);
    }

    const link = textBox.querySelector('a');
    if (link) {
        link.className = 'info-link';
    }

    return textBox;
}

function createContentWrapper(imageBox, textBox) {
    const container = document.createElement('div');
    container.className = 'info-content-wrapper';
    
    container.appendChild(imageBox);
    container.appendChild(textBox);
    
    return container;
}

export default function decorate(block) {
    const allPieces = [...block.children];
    
    const imageBox = createImageBox(allPieces[0]);
    const textBox = createTextBox(allPieces);
    const container = createContentWrapper(imageBox, textBox);
    
    block.innerHTML = '';
    block.appendChild(container);
}
