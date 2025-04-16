export const routes = [
  {
    path: "/button",
    component: "button-page",
    name: "Button",
    layout: "general-layout",
    import: () => import("../pages/docs/ButtonPage"),
  },
  {
    path: "/input",
    component: "input-page",
    name: "Input",
    layout: "general-layout",
    import: () => import("../pages/docs/InputPage"),
  },
  {
    path: "/checkbox",
    component: "checkbox-page",
    name: "Checkbox",
    layout: "general-layout",
    import: () => import("../pages/docs/CheckboxPage"),
  },
];
