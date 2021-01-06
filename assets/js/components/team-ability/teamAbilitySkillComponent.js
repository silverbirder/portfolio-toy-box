import { html, css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import "https://unpkg.com/@google-web-components/google-chart?module"
import BaseComponent from "../baseComponent.js";

export default class TeamAbilitySkillComponent extends BaseComponent {
    static get styles() {
        return css`
      figure {
        margin: 1em auto;
        text-align: center;
      }
      figure figcaption {
        font-size: 95%;
        opacity: .7;
        margin: 0 auto 1.5em;
        text-align: center;
      }
      figure figcaption a {
        text-decoration: underline;
      }
    `;
    }

    render(){
        return html`
        ${super.preRender()}
        <h3>Skill</h3>
        <figure>
          <img src="https://grass-graph.moshimo.works/images/Silver-birder.png" alt="github my contribution">
          <figcaption>
            <a href="http://github.com/Silver-birder">github my contribution</a>
          </figcaption>
        </figure>
        <google-chart
          type='pie'
          options='{"title": "Distribution of days in 2001Q1"}'
          cols='[{"label":"Month", "type":"string"}, {"label":"Days", "type":"number"}]'
          rows='[["Jan", 31],["Feb", 28],["Mar", 31]]'>
        </google-chart>
        `
    }
}

/*
fetch("https://api.github.com/users/Silver-birder/repos?page=1").then((a) => {
a.json().then((b) => {
b.map((c) => {
console.log(c.name);
console.log(c.language);
console.log(c.size);
console.log(c.fork);
})
})
})
githubのrepositoryの言語とsizeを手に入れれる。グラフィカルにしたい。
 */

/*
UseCotlinについて触れたい。
ACM会員について触れたい。
IoTについて触れたい。
 */
