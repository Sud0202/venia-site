export default function decorate(block) {
    const textContent = [...block.children];
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb';
    breadcrumb.innerHTML = textContent.map(child => child.textContent);
    block.innerHTML = breadcrumb.outerHTML;
}

