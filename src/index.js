import "./scss/app.scss";
import Application from "./js/Application";

window.addEventListener("DOMContentLoaded", () => {
  // This block will be executed once the page is loaded and ready
 // const app = new Application();
 const _loading = '<progress class="progress is-small is-primary" max="100" ></progress>'
 const app = new Application(_loading);
  // Used to access the app instance by the automated tests
  window.__JS_APP = app;
});
