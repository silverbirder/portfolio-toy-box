import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamMyselfInterestComponent extends BaseComponent {
    render(){
        return html`
        ${super.preRender()}
        <h3>Interest</h3>
        <ul>
          <li>Micro Frontends</li>
          <li>Workflow Engine</li>
          <li>Google Cloud Platform</li>
        </ul>
        `
    }
}
