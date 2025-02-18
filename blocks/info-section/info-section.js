export default function decorate(block) {
    // Add a class to the content wrapper for styling
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('info-content-wrapper');
    
    // Get all sections from the original structure
    const sections = Array.from(block.children);
    
    // Create text wrapper
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('info-text-wrapper');
    
    // Process each section based on its content
    sections.forEach((section, index) => {
        const innerDiv = section.querySelector('div');
        
        if (index === 0) {
            // Handle image section
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('info-image-wrapper');
            imageWrapper.innerHTML = innerDiv.innerHTML;
            contentWrapper.appendChild(imageWrapper);
        } else {
            // Handle text content sections
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = innerDiv.innerHTML;
            
            // Convert button if it's the last section
            if (index === sections.length - 1) {
                const buttonLink = contentDiv.querySelector('a');
                if (buttonLink) {
                    buttonLink.classList.remove('button');
                    buttonLink.classList.add('info-link');
                }
            }
            
            textWrapper.appendChild(contentDiv);
        }
    });
    
    // Add text wrapper to content wrapper
    contentWrapper.appendChild(textWrapper);
    
    // Clear and update the block content
    block.innerHTML = '';
    block.appendChild(contentWrapper);
}
