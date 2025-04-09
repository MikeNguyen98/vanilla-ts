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
                <a href="#/button">Button</a><br />
                <a href="#/input">Input</a>
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
