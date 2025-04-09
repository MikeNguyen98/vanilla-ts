import { routes } from "./routerPage";

class AppRouter extends HTMLElement {
  private outlet: HTMLElement;

  constructor() {
    super();
    this.outlet = document.createElement("div");
  }

  connectedCallback() {
    this.appendChild(this.outlet);
    window.addEventListener("hashchange", () => this.route());
    this.route();
  }

  async route() {
    const path = location.hash.replace("#", "") || "/button";
    const route = routes.find((r) => r.path === path);

    this.outlet.innerHTML = "";

    if (!route) {
      const NotFound = (await import("../pages/not-found")).default;
      this.outlet.appendChild(new NotFound());
      return;
    }

    await route.import(); // Ensure the page component is defined
    const PageComponent = document.createElement(route.component);

    // Load and wrap with layout
    const LayoutTag = route.layout;
    await import(`../components/Layout/layout`);
    const layout = document.createElement(LayoutTag);
    layout.appendChild(PageComponent);

    this.outlet.appendChild(layout);
  }
}

customElements.define("app-router", AppRouter);
