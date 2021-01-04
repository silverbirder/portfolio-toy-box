import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamMyselfAvatarComponent extends BaseComponent {
    render(){
        return html`
         ${super.preRender()}
        <img src="https://res.cloudinary.com/silverbirder/image/upload/ar_1:1,b_rgb:ffffff,bo_0px_solid_rgb:ffffff,c_fill,g_auto,o_100,r_max,w_180/v1609512845/github/silver-birder/IMG_3040.jpg">
        `
    }
}
