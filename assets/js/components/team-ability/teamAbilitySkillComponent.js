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
    async connectedCallback() {
        super.connectedCallback();
        const rows = await this.getGithub();
        this.shadowRoot.getElementById('chart').innerHTML= `
        <google-chart
          type='pie'
          options='{"title": "Github Contribution by Language"}'
          cols='${JSON.stringify([{"label":"Language", "type":"string"}, {"label":"Count", "type":"number"}])}'
          rows='${JSON.stringify(rows)}'>
        </google-chart>
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
        <section id="chart"></section>
        <section id="iot"></section>
        `
    }
    async getGithub() {
        const response = await (await fetch('https://api.github.com/users/Silver-birder/repos')).json();
        const jsonData = response.filter((r) => {
            return r.fork === false && r.language !== null;
        }).map((r) => {
           return {
               language: r.language,
               count: 1,
           }
        }).reduce((acc, cur) => {
            if (acc[cur.language] === undefined) {
                acc[cur.language] = 0;
            }
            acc[cur.language] += cur.count;
            return acc;
        }, {});
        const results = [];
        for (const key in jsonData) {
            results.push([key, jsonData[key]]);
        }
        return results;
    }
}

/*
UseCotlinについて触れたい。
ACM会員について触れたい。
IoTについて触れたい。
 */
