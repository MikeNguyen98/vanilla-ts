import styles from "./styles.css?inline";

class CustomButton extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "type"];
  }
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  attributeChangedCallback() {
    this.render();
    this.setupEvents();
  }

  setupEvents() {
    const button = this.shadow.querySelector("button");
    if (!button) return;

    button.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("button-click", { bubbles: true }));
    });
  }
  render() {
    const variant = this.getAttribute("variant") || "default";
    const type = this.getAttribute("type") || "button";
    const color = this.getAttribute("color") || "default";

    this.shadow.innerHTML = `
        <style>${styles}</style>
        <button type="${type}" class="btn ${variant}" style={ color: ${color === 'default' ? '#': color} }>
          <slot></slot>
        </button>
      `;
  }
}

customElements.define("custom-button", CustomButton);
