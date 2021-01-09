import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamPageProjectComponent extends BaseComponent {
    render(){
        return html`
         ${super.preRender()}
         <h1>👋Project</h1>
      `
    }
}
