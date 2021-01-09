import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamPageTopComponent extends BaseComponent {
    render(){
        return html`
         ${super.preRender()}
         <h1>👋Self Intro</h1>
         <team-myself-avatar></team-myself-avatar>
         <team-myself-biography></team-myself-biography>
         <team-myself-interest></team-myself-interest>
         <team-myself-career></team-myself-career>
         <h1>🔮My abilities</h1>
         <team-ability-skill></team-ability-skill>
         <team-ability-certification></team-ability-certification>
         <team-ability-accomplishment></team-ability-accomplishment>
      `
    }
}
