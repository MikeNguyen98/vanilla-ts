import tagIcon from "../../assets/tag.svg?raw";
import copyIcon from "../../assets/copy.svg?raw";
import "../../components/Button/Button";
import "../../components/TextEditor/TextEditor";
import buttonComponentCode from "../../components/Button/Button.ts?raw";

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
    const editor = this.shadow.querySelector("text-editor") as any;
    if (!editor) return;

    const text = editor.value;

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
          display: none;
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
        <text-editor id="myEditor"></text-editor>
      </pre>
    `;

    // Event bindings
    this.shadow
      .querySelector("#toggle")
      ?.addEventListener("click", () => this.toggleCode());
    this.shadow
      .querySelector("#copy")
      ?.addEventListener("click", () => this.copyCode());

    // Set code content after DOM is rendered
    requestAnimationFrame(() => {
      const editor = this.shadow.querySelector("#myEditor") as any;
      if (editor) editor.value = buttonComponentCode;
    });
  }
}

customElements.define("button-page", ButtonPage);
