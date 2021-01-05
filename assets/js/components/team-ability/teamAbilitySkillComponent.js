import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamAbilitySkillComponent extends BaseComponent {
    render(){
        return html`
        ${super.preRender()}
        <h3>Skill</h3>
        [TODO] Githubのコントリビュートしているプログラミング、Commit数を表示
        `
    }
}
