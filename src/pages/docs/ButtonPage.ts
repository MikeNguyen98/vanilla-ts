import tagIcon from "../../assets/tag.svg?raw";
import copyIcon from "../../assets/copy.svg?raw"; // Add your copy icon SVG here
import "../../components/Button/Button";

class ButtonPage extends HTMLElement {
  private shadow: ShadowRoot;
  private isVisible = false;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  toggleCode() {
    this.isVisible = !this.isVisible;
    const code = this.shadow.querySelector("pre");
    const toggle = this.shadow.querySelector("#toggle");

    if (code) code.style.display = this.isVisible ? "block" : "none";
    if (toggle)
      toggle.innerHTML = `
        <span class="icon-label">
          ${tagIcon} ${this.isVisible ? "Hide" : "Show"} Code
        </span>
      `;
  }

  copyCode() {
    const code = this.shadow.querySelector("pre");
    if (!code) return;

    const text = Array.from(code.querySelectorAll("code"))
      .map((el) => el.textContent)
      .join("\n");

    navigator.clipboard.writeText(text).then(() => {
      const copyBtn = this.shadow.querySelector("#copy");
      if (copyBtn) {
        copyBtn.innerHTML = `<span class="icon-label">${copyIcon} Copied!</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = `<span class="icon-label">${copyIcon} Copy</span>`;
        }, 1000);
      }
    });
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          font-family: sans-serif;
        }

        h2 {
          margin-top: 0;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .action-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        button {
          all: unset;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .icon-label {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        svg {
          width: 16px;
          height: 16px;
          color: #666;
        }

        pre {
          background: #f4f4f4;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          overflow-x: auto;
          display: none;
        }

        code {
          display: block;
          margin-bottom: 0.5rem;
        }
      </style>

      <h2>Button Component</h2>

      <div class="button-group">
        <custom-button variant="primary">Primary</custom-button>
        <custom-button variant="secondary">Secondary</custom-button>
        <custom-button variant="success">Success</custom-button>
      </div>

      <div class="action-bar">
        <button id="toggle">
          <span class="icon-label">${tagIcon} Show Code</span>
        </button>
        <button id="copy">
          <span class="icon-label">${copyIcon} Copy</span>
        </button>
      </div>

      <pre>
        <code>&lt;custom-button variant="primary"&gt;Primary&lt;/custom-button&gt;</code>
        <code>&lt;custom-button variant="secondary"&gt;Secondary&lt;/custom-button&gt;</code>
        <code>&lt;custom-button variant="success"&gt;Success&lt;/custom-button&gt;</code>
      </pre>
    `;

    this.shadow
      .querySelector("#toggle")
      ?.addEventListener("click", () => this.toggleCode());
    this.shadow
      .querySelector("#copy")
      ?.addEventListener("click", () => this.copyCode());
  }
}

customElements.define("button-page", ButtonPage);
