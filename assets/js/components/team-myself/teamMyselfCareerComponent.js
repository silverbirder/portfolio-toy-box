import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamMyselfCareerComponent extends BaseComponent {
    render(){
        return html`
        ${super.preRender()}
        <table>
          <thead>
            <tr>
              <th>header1</th>
              <th>header2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>you1</td>
              <td>you2</td>
            </tr>
          </tbody>
        </table>
        `
    }
}
