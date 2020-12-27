import MyElement from './assets/js/components/myElement.js'

customElements.define("my-element", MyElement)

// window["markdown"].ready.then(async (markdown) => {
//     const md = await (await fetch('./assets/md/sample.md')).text();
//     document.querySelector('body').innerHTML = markdown.parse(md);
// })