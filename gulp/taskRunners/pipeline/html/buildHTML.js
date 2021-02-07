const {BASE_URL} = require('../../variables.js');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const concatHeadAndMain = (contentDOM, layoutDOM) => {
    const contentHeadElement = contentDOM.window.document.querySelector('head');
    const layoutHeadElement = layoutDOM.window.document.querySelector('head');
    layoutHeadElement.innerHTML += contentHeadElement.innerHTML;
    const contentMainElement = contentDOM.window.document.querySelector('main');
    const layoutMainElement = layoutDOM.window.document.querySelector('main');
    layoutMainElement.innerHTML = contentMainElement.innerHTML;
};

const addAnchorToHeader = (layoutDOM) => {
    const headerElementList = layoutDOM.window.document.querySelectorAll('h1,h2,h3,h4,h5,h6');
    Array.prototype.forEach.call(headerElementList, (element) => {
        const normalizedValue = element.innerHTML
            .toLowerCase()
            .replace(/[^a-z0-9+]+/gi, '_')
            .replace(/^_/, '');
        const startHeaderNumber = parseInt(element.tagName.slice(1));
        const anchorIcon = '#'.repeat(startHeaderNumber);
        const anchorTag = `<a class="anchor" aria-label="Anchor" data-anchor-icon="${anchorIcon}" href="#${normalizedValue}"></a>`;
        element.innerHTML = `${anchorTag}${element.innerHTML}`;
        element.setAttribute('id', normalizedValue);
    });
};

const replaceUrl = (layoutDOM, canonicalUrl) => {
    const urlElementList = layoutDOM.window.document.querySelectorAll('[src],[href],[data-share-endpoint]');
    Array.prototype.forEach.call(urlElementList, (element) => {
        const href = element.getAttribute('href');
        const src = element.getAttribute('src');
        const endpoint = element.getAttribute('data-share-endpoint');
        if (href && href.match(/(BASE_URL|CANONICAL_URL)/)) {
            element.setAttribute('href', href
                .replace(/BASE_URL/, BASE_URL)
                .replace(/CANONICAL_URL/, canonicalUrl)
            );
        }
        if (src && src.match(/(BASE_URL|CANONICAL_URL)/)) {
            element.setAttribute('src', src
                .replace(/BASE_URL/, BASE_URL)
                .replace(/CANONICAL_URL/, canonicalUrl)
            );
        }
        if (endpoint && endpoint.match(/(BASE_URL|CANONICAL_URL)/)) {
            element.setAttribute('data-share-endpoint', endpoint
                .replace(/BASE_URL/, BASE_URL)
                .replace(/CANONICAL_URL/, canonicalUrl)
            );
        }
    });
};

const addLdJson = (layoutDOM, canonicalUrl) => {
    const headElement = layoutDOM.window.document.querySelector('head');
    const scriptElement = layoutDOM.window.document.createElement('script');
    scriptElement.setAttribute('type', 'application/ld+json');
    scriptElement.innerHTML = JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Webpage",
        "url": canonicalUrl,
        "name": "Silverbirder's portfolio",
        "headline": "Show my portfolio",
        "description": "My contents is self intro, blog, projects, and books.",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": BASE_URL
        },
        "publisher": {
            "@type": "Person",
            "name": "silverbirder",
            "logo": {
                "url": "https://res.cloudinary.com/silverbirder/image/upload/c_scale,w_520/v1611128736/silver-birder.github.io/assets/logo.png",
                "width": 520,
                "height": 520,
                "@type": "ImageObject"
            }
        }
    });
    headElement.appendChild(scriptElement);
};

const buildHTML = (content, layout, canonicalUrl) => {
    const contentDOM = new JSDOM(content);
    const layoutDOM = new JSDOM(layout);
    concatHeadAndMain(contentDOM, layoutDOM);
    addAnchorToHeader(layoutDOM);
    replaceUrl(layoutDOM, canonicalUrl);
    addLdJson(layoutDOM, canonicalUrl);
    return layoutDOM.serialize();
};

exports.buildHTML = buildHTML;
