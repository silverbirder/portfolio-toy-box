import { html } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module"
import BaseComponent from "../baseComponent.js";

export default class TeamMyselfLinkComponent extends BaseComponent {
    render(){
        return html`
        ${super.preRender()}
        <section>
          <a href="https://twitter.com/Silver_birder/"><img src="https://img.shields.io/twitter/follow/silver_birder?style=social"></a>
          <a href="https://www.facebook.com/silverbirder/"><img src="https://img.shields.io/badge/facebook-social-green?logo=facebook"></a>
          <a href="https://www.google.com/maps/contrib/101722346324226588907/reviews/@34.6907839,135.4537926,13z/"><img src="https://img.shields.io/badge/googleMaps-social-green?logo=google-maps"></a>
          <a href="https://www.instagram.com/silverbirder/"><img src="https://img.shields.io/badge/instagram-social-green?logo=instagram"></a>
        </section>
        <section>
          <a href="https://medium.com/@silverbirder"><img src="https://img.shields.io/badge/medium-blog-blue?logo=medium"></a>
          <a href="https://note.com/silverbirder"><img src="https://img.shields.io/badge/note-blog-blue?logo=note"></a>
          <a href="https://qiita.com/silverbirder"><img src="https://img.shields.io/badge/qiita-blog-blue?logo=qiita"></a>
          <a href="https://scrapbox.io/silverbirder-memo"><img src="https://img.shields.io/badge/scrapbox-blog-blue?logo=scrapbox"></a>
          <a href="https://silverbirder180.hatenablog.com/"><img src="https://img.shields.io/badge/hatenabookmark-blog-blue?logo=hatena-bookmark"></a
          <a href="https://zenn.dev/silverbirder"><img src="https://img.shields.io/badge/zenn-blog-blue?logo=zenn"></a>        
        </section>
        <section>
          <a href="https://github.com/Silver-birder"><img src="https://img.shields.io/badge/github-tech-red?logo=github"></a>
          <a href="https://silverbirder.booth.pm/"><img src="https://img.shields.io/badge/booth-tech-red?logo=pixiv"></a>
          <a href="https://speakerdeck.com/silverbirder"><img src="https://img.shields.io/badge/speakerDeck-tech-red?logo=speaker-deck"></a>
          <a href="https://trello.com/b/RNbUvPFw/my-task"><img src="https://img.shields.io/badge/trello-tech-red?logo=trello"></a>        
        </section>
        <section>
          <a href="https://calendar.google.com/calendar/embed?src=silverbirder%40gmail.com&ctz=Asia%2FTokyo"><img src="https://img.shields.io/badge/googleCalendar-contact-yellow?logo=google-calendar"></a>
          <a href="mailto:silverbirder@gmail.com"><img src="https://img.shields.io/badge/gmail-contact-yellow?logo=gmail"></a>
        </section>
        `
    }
}
