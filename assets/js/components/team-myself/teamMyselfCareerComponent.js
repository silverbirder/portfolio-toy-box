import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module"

export default class TeamMyselfCareerComponent extends LitElement {
    render(){
        return html`
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
