import './Radio'; // or .ts depending on your setup

class CustomRadioGroup extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadow.addEventListener("change", this.handleChange.bind(this));
  }

  get name() {
    return this.getAttribute("name") || "radio";
  }

  get options(): Array<{ label: string; value: string; checked?: boolean; disabled?: boolean }> {
    const raw = this.getAttribute("options");
    try {
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Invalid JSON in options attribute", e);
      return [];
    }
  }

  handleChange(e: Event) {
    const target = e.composedPath().find((el) => el instanceof HTMLElement && el.tagName === "CUSTOM-RADIO") as HTMLElement;
    const value = target?.getAttribute("value");
    if (value) {
      this.dispatchEvent(new CustomEvent("change", { detail: { value } }));
    }
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      </style>
      ${this.options
        .map((opt) => `
          <custom-radio 
            name="${this.name}" 
            value="${opt.value}" 
            ${opt.checked ? "checked" : ""} 
            ${opt.disabled ? "disabled" : ""}
          >
            ${opt.label}
          </custom-radio>
        `)
        .join("")}
    `;
  }
}

customElements.define("custom-radio-group", CustomRadioGroup);
