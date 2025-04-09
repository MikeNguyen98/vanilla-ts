// pages/not-found.ts
export default class NotFoundPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h2>404 - Page Not Found</h2>`;
  }
}
customElements.define("not-found-page", NotFoundPage);
