import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  

  const allLis = block.querySelectorAll('li');
  allLis.forEach(li => {
    if (li.textContent.trim().toLowerCase() === 'input') {
      const inputElement = document.createElement('input');
      inputElement.type = 'email';
      inputElement.placeholder = 'Subscribe';
      inputElement.className = 'footer-subscribe-input';
      
      const containerLi = document.createElement('li');
      containerLi.className = 'footer-input-container';
      containerLi.appendChild(inputElement);
      
      li.replaceWith(containerLi);
    }
  });
}
