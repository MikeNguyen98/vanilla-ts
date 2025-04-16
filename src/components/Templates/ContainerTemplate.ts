import tagIcon from "../../assets/tag.svg?raw";
import copyIcon from "../../assets/copy.svg?raw";

class ContainerTemplate extends HTMLElement {
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
    const title = this.getAttribute("title") || "Container";
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          font-family: sans-serif;
        }

        h2 {
          margin: 0;
        }

        button {
          all: unset;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .container {
          display: flex;
          gap: 1rem;
          flex-direction: column;
        }
          
        .action-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
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
      <div class="container">
        <h2>${title}</h2>
        <slot></slot>
        <div class="action-bar">
          <button id="toggle">
              <span class="icon-label">${tagIcon} Show Code</span>
          </button>
          <button id="copy">
              <span class="icon-label">${copyIcon} Copy</span>
          </button>
        </div>
      </div>

      <pre>
        <text-editor id="myEditor" readonly></text-editor>
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
      const codeScript = this.querySelector('script[type="code"]');
      if (editor && codeScript) editor.value = codeScript.textContent?.trim() || "";
    });
  }
}
customElements.define("container-template", ContainerTemplate);
