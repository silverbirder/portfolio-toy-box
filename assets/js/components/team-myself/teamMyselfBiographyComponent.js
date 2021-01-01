import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module"

export default class TeamMyselfBiographyComponent extends LitElement {
    render(){
        return html`
        <h3>Biography</h3>
        <section>
          <ul>
            <li>Masashi Shibamoto</li>
            <li>Born on February 14, 1994</li>
          </ul>
          <p>
          When I was a university student, I developed a WebApp for the first time, and I was so impressed by the output that I could see it. Whenever I have an idea for a WebApp, I try to develop it quickly, cheaply, and easily.
          </p>
        </section>
        `
    }
}
