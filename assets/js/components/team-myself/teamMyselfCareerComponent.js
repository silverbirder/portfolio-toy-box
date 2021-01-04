import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamMyselfCareerComponent extends BaseComponent {
    render(){
        return html`
        ${super.preRender()}
        <h3>Career</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2015/04</td>
              <td>Passing IPA:Information-technology Promotion Agency, Japan</td>
            </tr>
            <tr>
              <td>2016/03</td>
              <td>Graduation Bachelor's Program in Intelligent Information Engineering, Doshisha University</td>
            </tr>
            <tr>
              <td>2017/09</td>
              <td>Passing Java SE 8, Oracle</td>
            </tr>
          </tbody>
        </table>
        `
    }
}
