export const routes = [
  {
    path: "/button",
    component: "button-page",
    layout: "general-layout",
    import: () => import("../pages/docs/ButtonPage"),
  },
];
