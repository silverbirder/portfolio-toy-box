import { LitElement, html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"

export default class BaseComponent extends LitElement {
    preRender(){
        return html`<link href="../../../index.css" rel="stylesheet" type="text/css">`
    }
}
