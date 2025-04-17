import "../../components/Radio/Radio";
import "../../components/Radio/RadioGroup";
import "../../components/Button/Button";
import "../../components/Templates/ContainerTemplate";
import radioComponentCode from "../../components/Radio/Radio.ts?raw";

class RadioPage extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1rem;
          font-family: sans-serif;
        }

        .radio-group {
          display: flex;
          gap: 1rem;
          flex-direction: row;
          flex-wrap: wrap;
          border: 1px solid rgba(5, 5, 5, 0.06);
          border-radius: 8px;
          padding: 1rem;
        }

        custom-radio[disabled] {
          opacity: 0.6;
          pointer-events: none;
        }
      </style>

      <container-template title="Radio Component">
        <div class="radio-group">
          <custom-radio name="group1" value="option1" checked>Option 1</custom-radio>
          <custom-radio name="group1" value="option2">Option 2</custom-radio>
          <custom-radio name="group1" value="option3" disabled>Option 3 (disabled)</custom-radio>
        </div>

        <div class="radio-group">
          <custom-radio-group
            name="fruit"
            options='[
              { "label": "Apple", "value": "apple" },
              { "label": "Banana", "value": "banana", "checked": true },
              { "label": "Cherry", "value": "cherry", "disabled": true }
            ]'
          ></custom-radio-group>
        </div>

        <script type="code">${radioComponentCode}</script>
      </container-template>
    `;
  }
}

customElements.define("radio-page", RadioPage);
