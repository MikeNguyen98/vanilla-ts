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
  {
    path: "/radio",
    component: "radio-page",
    name: "Radio",
    layout: "general-layout",
    import: () => import("../pages/docs/RadioPage"),
  },
];
