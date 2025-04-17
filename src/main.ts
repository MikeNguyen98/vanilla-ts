import "./routers/router"; // registers <app-router>

import styles from "./styles/layout.css?inline";

// Create a <style> tag and append it to the <head>
const styleTag = document.createElement("style");
styleTag.textContent = styles;
document.head.appendChild(styleTag);


document.body.innerHTML = `<app-router></app-router>`;
