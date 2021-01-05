import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamAbilityAccomplishmentComponent extends BaseComponent {
    render(){
        return html`
        ${super.preRender()}
        <h3>Accomplishment</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Summary</th>
              <th>Detail</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2019/02</td>
              <td>💪 GCP hands-on Commendation</td>
              <td><a href="https://event.shoeisha.jp/devsumi/20190214/session/2015/">Developers Summit 2019</a></td>
              <td><a href="https://res.cloudinary.com/silverbirder/image/upload/v1551278903/Accomplish%C2%ADments/developers_summit_2019_gcp_handson.jpg">See certificate</a></td>
            </tr>
            <tr>
              <td>2019/06</td>
              <td>🗣 First time on the stage</td>
              <td><a href="https://event.shoeisha.jp/devboost/20190615/timetable#tt1810">Developers Boost KANSAI - gateway to success for U30 engineers in Kansai</a></td>
              <td><a href="https://www.slideshare.net/monotaro-itd-pr/ss-150331504">Slide</a></td>
            </tr>
            <tr>
              <td>2019/09</td>
              <td>📚 Published first Book</td>
              <td><a href="https://techbookfest.org/event/tbf07/circle/5117648689954816">Tech Book Fest 7</a><br>『Introduction to Web Components for the First Time』</td>
              <td><a href="https://silverbirder.booth.pm/items/1572900">Sold here</a></td>
            </tr>
            <tr>
              <td>2019/11</td>
              <td>🤝 Participated in the 3rd Zeniketto Circle</td>
              <td><a href="https://zeniket.jimdofree.com/">Zeniketto</a></td>
              <td></td>
            </tr>
            <tr>
              <td>2019/12</td>
              <td>📸 Got first interview</td>
              <td><a href="https://employment.en-japan.com/engineerhub/entry/2019/12/19/103000">Engineer Hub</a></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        `
    }
}
