import styles from "./styles.css?inline";

class CustomInput extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  private shadow: ShadowRoot;

  constructor() {
    super();
    // Attach shadow DOM
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Initial render
    this.render();
    // Listen for changes on the internal input element
    const input = this.shadowRoot!.querySelector("input");
    if (input) {
      input.addEventListener("input", this.handleInput.bind(this));
    }
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    // When the 'value' attribute changes, re-render and update input value if needed.
    if (name === "value" && oldValue !== newValue) {
      this.render();
    }
  }

  // Event handler for internal input changes
  private handleInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    // Update the attribute, which in turn will trigger attributeChangedCallback if needed.
    this.setAttribute("value", newValue);
    // Dispatch a change event (bubbled so parent elements can listen)
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: newValue },
        bubbles: true,
        composed: true,
      })
    );
  }

  // Render the component using innerHTML
  render() {
    const value = this.getAttribute("value") || "";
    this.shadow.innerHTML = `
        <style>
          ${styles}
        </style>
        <input type="text" value="${value}" />
      `;
  }

  get value(): string {
    const input = this.shadowRoot!.querySelector("input");
    return input ? input.value : "";
  }

  set value(newValue: string) {
    this.setAttribute("value", newValue);
  }
}

// Define the custom element
customElements.define("custom-input", CustomInput);
