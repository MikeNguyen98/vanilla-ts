import "../../components/Button/Button";
import "../../components/Input/Input"
import "../../components/TextEditor/TextEditor";
import inputComponentCode from "../../components/Input/Input.ts?raw";

class InputPage extends HTMLElement {
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

        .input-group {
          display: flex;
          gap: 1rem;
          flex-direction: column;
        }
      </style>
      <container-template title="Input Component">
        <div class="input-group">
          <custom-input value='Primary'></custom-input>
          <custom-input value='Secondary'></custom-input>
          <custom-input value='Neutral'></custom-input>
        </div>
        <script type="code">${inputComponentCode}</script>
      </container-template>
    `;
  }
}

customElements.define("input-page", InputPage);
