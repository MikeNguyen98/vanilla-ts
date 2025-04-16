import { routes } from "../../routers/routerPage";
import styles from "./styles.css?inline";

class GeneralLayout extends HTMLElement {
  private shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadow.innerHTML = `
        <style>${styles}</style>
        <div class="layout general-layout">
          <header>
            <div>📦 CMS</div>
            <input type="text" placeholder="Search..." />
          </header>
          <div class="content">
            <aside>
              <nav>
              ${routes.map(
                (route) => `<a href="#${route.path}">${route.name}</a>`
              ).join("")}
              </nav>
            </aside>
            <main>
              <slot></slot>
            </main>
          </div>
        </div>
      `;
  }
}
customElements.define("general-layout", GeneralLayout);
