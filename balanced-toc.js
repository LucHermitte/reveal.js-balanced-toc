!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).RevealBalancedTableOfContents=t()}(this,(function(){"use strict";return()=>{let e,t,n,o,l,i,a,r,s,d;function c(){"string"==typeof t.titleTagSelector&&(o=t.titleTagSelector.split(",").map((e=>e.trim()))),function(){let t=document.getElementsByClassName("slides")[0],o=document.createElement("section");o.className="toc";let c=document.createElement(n);c.innerText=l,o.appendChild(c);let m=function(){let t=document.createElement("table");t.className="toc";let n=e.getSlides();if(void 0===n)return console.log("undefined slides"),t;let o=0;s&&o++;let l=[];const i=e.getTotalSlides();for(;o<i;o++){const t=n[o],i=f(t),a=t&&"uncounted"===t.dataset.visibility?0:1;if(void 0!==i){let n;if(""===d)n=i;else{const o={title:i,pagenr:e.getIndices(t).h+a+1,chapternr:l.length+1};n=d;for(const e of Object.keys(o))n=n.replaceAll(`{${e}}`,o[e])}l.push(n)}}const c=l.length,m=~~(c/r)+c%r;o=0;for(let e=0;e<m;e++){let n=document.createElement("tr");for(let t=0;t<r&&o<c;t++,o++){let i=document.createElement("td");a&&(i.className="fragment",i.setAttribute("data-fragment-index",o));const r=e+t*m;i.innerText=l[r],n.appendChild(i)}t.appendChild(n)}return t}();o.appendChild(m);let u=t.children[i-1];void 0!==u?t.insertBefore(o,u):t.appendChild(o)}()}function f(e){return l=Array.from(e.childNodes).filter((e=>function(e){if(void 0===e.tagName)return!1;return o.indexOf(e.tagName.toLowerCase())>=0&&""!==e.textContent}(e))).sort(((e,t)=>{return o=t,(n=e).tagName<o.tagName?-1:n.tagName>o.tagName?1:0;var n,o})).map((e=>e.textContent))[0]}return{id:"toaster",init:function(f){e=f,t=e.getConfig().tableofcontents||{},n=t.titleTag||"h1",o=["h1","h2","h3","h4","h5","h6"],l=t.title||"Table of Contents",i=t.position||2,a=t.fadeInElements||!1,r=t.numberOfColumns||2,s=t.ignoreFirstSlide,void 0===s&&(s=!0),d=t.tocFormat||"",c()}}}}));
