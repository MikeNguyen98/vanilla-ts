import "../../components/Button/Button";
import "../../components/Templates/ContainerTemplate";
import buttonComponentCode from "../../components/Button/Button.ts?raw";

class ButtonPage extends HTMLElement {
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

        .button-group {
          display: flex;
          gap: 1rem;
          border: 1px solid rgba(5,5,5,0.06);
          flex-wrap: wrap;
          border-radius: 8px;
          padding: 1rem;
        }
      </style>

      <container-template title="Button Component">
        <div class="button-group">
          <custom-button variant="solid" color="blue">Primary Button</custom-button>
          <custom-button >Default Button</custom-button>
          <custom-button variant="solid" color="red">Dashed Button</custom-button>
          <custom-button variant="dash">Dashed Button</custom-button>
          <custom-button variant="text">Text Button</custom-button>
          <custom-button variant="link">Link Button</custom-button>
        </div>
        <script type="code">${buttonComponentCode}</script>
      </container-template>
    `;
  }
}

customElements.define("button-page", ButtonPage);
