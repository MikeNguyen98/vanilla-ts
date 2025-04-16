class CustomCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "defaultChecked", "disabled"];
  }

  private shadow: ShadowRoot;
  private hasInitialized = false;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    const input = this.shadow.querySelector("input");
    if (!input) return;

    // Apply defaultChecked only once
    if (!this.hasAttribute("checked") && this.hasAttribute("defaultChecked")) {
      input.checked = true;
    }

    this.applyAttributes();
    input.addEventListener("change", this.handleChange.bind(this));

    this.hasInitialized = true;
  }

  attributeChangedCallback() {
    if (!this.hasInitialized) return;
    this.applyAttributes();
  }

  private applyAttributes() {
    const input = this.shadow.querySelector("input");
    if (!input) return;

    input.disabled = this.hasAttribute("disabled");

    if (this.hasAttribute("checked")) {
      input.checked = true;
    } else if (!this.hasAttribute("defaultChecked")) {
      input.checked = false;
    }
  }

  private handleChange() {
    const input = this.shadow.querySelector("input");
    if (!input) return;

    const isChecked = input.checked;

    if (!this.hasAttribute("checked")) {
      // Uncontrolled: reflect user input
      if (isChecked) this.setAttribute("checked", "");
      else this.removeAttribute("checked");
    }

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: isChecked },
        bubbles: true,
      })
    );
  }

  private render() {
    const value = this.getAttribute("value") || "";
    this.shadow.innerHTML = `
      <style>
        input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      </style>
      <input type="checkbox" value="${value}" /><slot></slot>
    `;
  }

  // Programmatic API using querySelector
  get checked() {
    return this.shadow.querySelector("input")?.checked ?? false;
  }

  set checked(val: boolean) {
    if (val) this.setAttribute("checked", "");
    else this.removeAttribute("checked");
  }

  get disabled() {
    return this.shadow.querySelector("input")?.disabled ?? false;
  }

  set disabled(val: boolean) {
    if (val) this.setAttribute("disabled", "");
    else this.removeAttribute("disabled");
  }
}

customElements.define("custom-checkbox", CustomCheckbox);
