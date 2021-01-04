import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamMyselfBiographyComponent extends BaseComponent {
    render(){
        return html`
        ${super.preRender()}
        <h3>Biography</h3>
        <section>
          <ul>
            <li>Masashi Shibamoto</li>
            <li>Born on February 14, 1994</li>
          </ul>
          <pre>When I was a university student, I developed a WebApp for the first time, and I was so impressed by the output that I could see it.<br>Whenever I have an idea for a WebApp, I try to develop it quickly, cheaply, and easily.</pre>
        </section>
        `
    }
}
