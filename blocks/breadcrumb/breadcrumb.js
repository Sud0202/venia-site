import { getMetadata } from '../../scripts/aem.js';

function createBreadcrumbHTML(breadcrumbData) {
    const paths = breadcrumbData.split('/');
    console.log(paths)
    return paths.map((path, index) => {
        if (index === paths.length - 1) {
            return `<span class="breadcrumb-item current">${path}</span>`;
        }
        return `<span class="breadcrumb-item"><a href="#">${path}</a></span>`;
    }).join('<span class="breadcrumb-separator">/</span>');
}

export function createBreadcrumb() {
    const breadcrumbData = getMetadata('breadcrumb');
    if (!breadcrumbData) return null;

    const breadcrumb = document.createElement('div');
    breadcrumb.classList.add('breadcrumb');
    breadcrumb.innerHTML = createBreadcrumbHTML(breadcrumbData);
    return breadcrumb;
}

// This is for when breadcrumb is used as a block
export default function decorate(block) {
    const breadcrumbData = getMetadata('breadcrumb');
    if (!breadcrumbData) {
        block.style.display = 'none';
        return;
    }
    
    block.classList.add('breadcrumb');
    block.innerHTML = createBreadcrumbHTML(breadcrumbData);
}

