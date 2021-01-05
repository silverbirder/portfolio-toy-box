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
              <td>2016/03</td>
              <td>👨‍🎓 Graduation Bachelor's Program in Intelligent Information Engineering, Doshisha University</td>
            </tr>
            <tr>
              <td>2016/04</td>
              <td>🏢 Joined an SIer company in Osaka, Japan.</td>
            </tr>
            <tr>
              <td>2018/07</td>
              <td>🏢 Left an SIer company in Osaka, Japan.</td>
            </tr>
            <tr>
              <td>2018/08</td>
              <td>🏢 Joined an Web company in Hyogo, Japan.</td>
            </tr>
            <tr>
          </tbody>
        </table>
        `
    }
}
