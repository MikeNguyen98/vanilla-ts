import "../../components/Checkbox/Checkbox";
import "../../components/Button/Button";
import "../../components/Templates/ContainerTemplate";
import checkboxComponentCode from "../../components/Checkbox/Checkbox.ts?raw";

class CheckboxPage extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupCheckAllButton();
    this.setupUncheckAllButton();
  }

  setupCheckAllButton() {
    const checkAllButton = this.shadow.querySelector("#checkAllButton");
    const checkboxes = this.shadow.querySelectorAll(
      ".checkbox-group:nth-of-type(2) custom-checkbox"
    );

    if (checkAllButton) {
      checkAllButton.addEventListener("click", () => {
        checkboxes.forEach((checkbox) => {
          const input = checkbox.shadowRoot?.querySelector(
            "input[type='checkbox']"
          );
          if (input instanceof HTMLInputElement && !input.disabled) {
            input.checked = true;
          }
        });
      });
    }
  }
  setupUncheckAllButton() {
    const uncheckAllButton = this.shadow.querySelector("#uncheckAllButton");
    const checkboxes = this.shadow.querySelectorAll(
      ".checkbox-group:nth-of-type(2) custom-checkbox"
    );

    if (uncheckAllButton) {
      uncheckAllButton.addEventListener("click", () => {
        checkboxes.forEach((checkbox) => {
          const input = checkbox.shadowRoot?.querySelector(
            "input[type='checkbox']"
          );
          if (input instanceof HTMLInputElement && !input.disabled) {
            input.checked = false;
          }
        });
      });
    }
  }

  render() {
    this.shadow.innerHTML = `
    <style>
        :host {
          display: block;
          padding: 1rem;
          font-family: sans-serif;
        }

        .checkbox-group {
          display: flex;
          gap: 1rem;
          flex-direction: row;
          border: 1px solid rgba(5,5,5,0.06);
          flex-wrap: wrap;
          border-radius: 8px;
          padding: 1rem;
        }
      </style>
      <container-template title="Checkbox Component">
        <div class="checkbox-group">
         <custom-checkbox >Checkbox</custom-checkbox>
         <custom-checkbox disabled>Checkbox disabled</custom-checkbox>
         <custom-checkbox defaultChecked disabled>Checkbox checked and disabled</custom-checkbox>
        </div>

        <custom-button id="checkAllButton" variant="solid" color="blue">Check All</custom-button>
        <custom-button id="uncheckAllButton" variant="solid" color="red">Uncheck All</custom-button>
        <div class="checkbox-group">
          <custom-checkbox id="checkbox1" >Checkbox</custom-checkbox>
          <custom-checkbox id="checkbox2" >Checkbox disabled</custom-checkbox>
          <custom-checkbox id="checkbox3" defaultChecked>Checkbox checked and disabled</custom-checkbox>
        </div>


        <script type="code">${checkboxComponentCode}</script>
        
      </container-template>
    `;
  }
}
customElements.define("checkbox-page", CheckboxPage);
