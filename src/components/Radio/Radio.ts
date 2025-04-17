class CustomRadio extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'value', 'checked', 'disabled'];
  }

  private input: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          font-family: sans-serif;
          cursor: pointer;
          user-select: none;
        }
        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }
      </style>
      <label>
        <input type="radio" id="radio" style="margin-right: 0.5rem;" />
        <slot></slot>
      </label>
    `;

    this.input = shadow.querySelector('input')!;
  }

  connectedCallback() {
    this.syncAttributes();
    this.input.addEventListener('change', this.handleChange);
    window.addEventListener('radio-changed', this.handleGlobalChange as EventListener);
  }

  disconnectedCallback() {
    this.input.removeEventListener('change', this.handleChange);
    window.removeEventListener('radio-changed', this.handleGlobalChange as EventListener);
  }

  attributeChangedCallback() {
    this.syncAttributes();
  }

  private syncAttributes() {
    this.input.name = this.getAttribute('name') || '';
    this.input.value = this.getAttribute('value') || '';
    this.input.disabled = this.hasAttribute('disabled');
    this.input.checked = this.hasAttribute('checked');
  }

  private handleChange = () => {
    if (this.input.checked) {
      this.setAttribute('checked', '');
      const event = new CustomEvent('radio-changed', {
        bubbles: true,
        composed: true,
        detail: {
          name: this.input.name,
          value: this.input.value,
          source: this,
        },
      });
      window.dispatchEvent(event);
    }
  };

  private handleGlobalChange = (e: CustomEvent) => {
    if (e.detail.name === this.input.name && e.detail.source !== this) {
      this.removeAttribute('checked');
      this.input.checked = false;
    }
  };
}

customElements.define('custom-radio', CustomRadio);
