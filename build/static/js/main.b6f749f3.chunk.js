(this["webpackJsonpmon-app"]=this["webpackJsonpmon-app"]||[]).push([[0],{59:function(e,t,c){},79:function(e,t,c){},85:function(e,t,c){},86:function(e,t,c){},87:function(e,t,c){},88:function(e,t,c){},89:function(e,t,c){},90:function(e,t,c){},91:function(e,t,c){},96:function(e,t,c){"use strict";c.r(t);var s=c(1),n=c.n(s),a=c(16),i=c.n(a),r=c(28),o=c.n(r),l=c(42),d=c(3),j=(c(59),c(99)),u=c(4),b=c(43),p=c.n(b),m=c(0),h=n.a.forwardRef((function(e,t){return Object(m.jsx)("div",{ref:t,className:"loading",children:"loading"})})),O=(c(79),c.p+"static/media/cloud.29c06565.svg"),f=c.p+"static/media/sun.13a39187.svg",g=c.p+"static/media/world_bg.253775d8.png",x=c.p+"static/media/world_fg.ae38b1a1.png",v=c.p+"static/media/character_left.970570b4.svg",N=c.p+"static/media/character.5ef74c5f.svg",k=c.p+"static/media/character_wBasket.6b3e471e.svg",w=c.p+"static/media/character_wBasket_smiling.74f644a3.svg",S=function(e){var t=e.options,c=t.direction,s=void 0===c?"r":c,n=t.isSmiling,a=void 0!==n&&n,i=t.hasBasket,r=void 0!==i&&i,o=t.isWalking,l=void 0!==o&&o,d={character_l:v,character_r:N,character_r_basket:k,character_r_basket_smiling:w}["character_".concat(s).concat(r?"_basket":"").concat(a?"_smiling":"")];return Object(m.jsx)("div",{className:"character-wrapper ".concat(s," ").concat(l?"walking":""),children:Object(m.jsx)("img",{className:"character",src:d,alt:""})})},_=n.a.forwardRef((function(e,t){var c=Object(j.a)().t,n=Object(s.useState)(!1),a=Object(d.a)(n,2),i=a[0],r=a[1],o=Object(s.useState)(!1),l=Object(d.a)(o,2),u=l[0],b=l[1];return Object(m.jsx)("div",{ref:t,className:"page home",onClick:function(){r(!0),setTimeout((function(){b(!0)}),1350),setTimeout((function(){b(!1),e.history.push("/baskets")}),3350)},children:Object(m.jsxs)("main",{className:"wrapper ".concat(i?"animated":""),children:[Object(m.jsx)("div",{className:"cloud-wrapper",children:Object(m.jsx)("img",{className:"cloud",src:O,alt:""})}),Object(m.jsx)("div",{className:"sun-wrapper",children:Object(m.jsx)("img",{className:"sun",src:f,alt:""})}),Object(m.jsxs)("div",{role:"img",className:"composed-img world",children:[Object(m.jsx)("img",{className:"bg",src:g,alt:""}),Object(m.jsx)(S,{options:{direction:"l",isWalking:u}}),Object(m.jsx)("img",{className:"fg",src:x,alt:""})]}),Object(m.jsx)("div",{className:"text",children:c("clickOnWorld")})]})})})),C=c(24),y=(c(85),c(86),function(e){var t=Object(s.useState)(!1),c=Object(d.a)(t,2),n=c[0],a=c[1];return Object(s.useEffect)((function(){a(!0);var e=function(){a(!1)};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[]),Object(m.jsx)("div",{className:"tooltip ".concat(n?"showing":""),children:Object(m.jsx)("p",{className:"text",children:e.text})})});c(87);var B=function(e){var t,c,n,a=Object(s.useRef)(null);return t=a,c=e.activated,n=e.triggerThis,Object(s.useEffect)((function(){function e(e){c&&t.current&&!t.current.contains(e.target)&&n()}return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[t,c,n]),Object(m.jsx)("div",{ref:a,children:e.children})},H=function(e){var t=Object(s.useState)(e.selected||!1),c=Object(d.a)(t,2),n=c[0],a=c[1],i=e.index||0;return Object(m.jsx)("li",{className:"selectable-item ".concat(n?"selected":""," ").concat(e.className),style:{"--index":i+1},children:Object(m.jsxs)(B,{activated:n,triggerThis:function(){a(!1)},children:[Object(m.jsx)("button",{className:"btn-toggle",onClick:function(){return a(!n)},children:Object(m.jsxs)("div",{className:"composed-img",role:"img",children:[e.imgs.bg&&Object(m.jsx)("img",{className:"bg",src:e.imgs.bg,alt:""}),Object(m.jsx)("img",{className:"icon",src:e.imgs.icon,alt:""}),e.imgs.fg&&Object(m.jsx)("img",{className:"fg",src:e.imgs.fg,alt:""})]})}),e.children(a)]})})},E=(c(88),function(){return Object(m.jsx)("svg",{className:"road",width:"4000",height:"150",children:Object(m.jsx)("rect",{width:"100%",height:"100%"})})}),F=(c(89),c.p+"static/media/grass.3d5741bc.svg"),L=(c.p,c.p+"static/media/tree_1_big.3c6c143c.svg"),R=function(e){for(var t=e.index,c=void 0===t?1:t,s=[],n=1;n<=4;n++)s.push(Object(m.jsx)("img",{className:"grass",src:F,alt:""},"grass_".concat(n)));return Object(m.jsxs)("div",{className:"decor",style:{"--index":c-1},children:[Object(m.jsx)("img",{className:"tree",src:L,alt:""}),Object(m.jsx)("div",{className:"grasses",children:s})]})},T=c.p+"static/media/basket.a06d3750.svg",A=c.p+"static/media/basketShadow.3fcbaf51.svg",V=n.a.forwardRef((function(e,t){var c=Object(j.a)().t,n=e.chosenBasket?e.chosenBasket.id:null,a={small:Object(C.a)({},e.baskets[0]),medium:Object(C.a)({},e.baskets[1]),big:Object(C.a)({},e.baskets[2])};Object(s.useEffect)((function(){}),[]);var i=[];return Object.values(a).forEach((function(t,s){i.push(Object(m.jsx)(H,{index:s,selected:t.id===n,imgs:{bg:A,icon:T},children:function(s){return Object(m.jsxs)("div",{className:"banner",children:[Object(m.jsxs)("div",{className:"header",children:[Object(m.jsx)("h2",{className:"basket-title",children:t.name}),Object(m.jsxs)("span",{className:"price",children:["chf ",t.price]})]}),Object(m.jsx)("div",{className:"basket-content",children:Object(m.jsx)("p",{className:"text",dangerouslySetInnerHTML:{__html:t.parsed_short_description}})}),Object(m.jsx)("button",{className:"basket-btn-add button primary",onClick:function(){return function(t){e.setChosenBasket(t),e.history.push("/options")}(t)},children:c("choose")})]})}},t.id))})),Object(m.jsx)("div",{ref:t,className:"page baskets",children:Object(m.jsxs)("main",{className:"wrapper",children:[!n&&Object(m.jsx)(y,{text:c("tooltip.chooseBasket")}),Object(m.jsx)("ul",{className:"baskets",children:i}),Object(m.jsx)(S,{options:{}}),Object(m.jsx)(E,{}),Object(m.jsx)(R,{})]})})})),M=c(52),W=(c(90),c(91),c.p+"static/media/cart.97c98eaf.svg"),z=c.p+"static/media/cartShadow.11a396d4.svg",I=c.p+"static/media/product_carots.3ed16064.svg",J=function(e){var t=Object(j.a)().t,c=Object(s.useState)(!1),n=Object(d.a)(c,2),a=n[0],i=n[1],r=e.chosenOptions.map((function(c){return Object(m.jsx)(H,{className:"option",imgs:{bg:z,icon:I},children:function(s){return Object(m.jsxs)("div",{className:"banner",children:[Object(m.jsxs)("div",{className:"header",children:[Object(m.jsx)("span",{className:"cart-item-title",children:c.name}),Object(m.jsxs)("span",{className:"price",children:["chf",c.price]})]}),Object(m.jsx)("button",{className:"button primary remove-from-cart",onClick:function(){return function(t){var c=e.chosenOptions.filter((function(e){return e.id!=t}));e.setChosenOptions(c)}(c.id)},children:t("remove")})]})}},"cart_option_".concat(c.id))}));return Object(m.jsxs)("div",{className:"cart ".concat(a?"opened":""),children:[Object(m.jsx)("button",{className:"button secondary cart",onClick:function(){return i(!0)},children:Object(m.jsx)("img",{className:"cart-icon",src:W,alt:""})}),Object(m.jsx)(B,{activated:a,triggerThis:function(){return i(!1)},children:Object(m.jsxs)("div",{className:"content",children:[Object(m.jsxs)("div",{className:"first-line",children:[Object(m.jsx)("ul",{className:"list-basket",children:Object(m.jsx)(H,{imgs:{bg:z,icon:W},children:function(c){return Object(m.jsxs)("div",{className:"banner",children:[Object(m.jsxs)("div",{className:"header",children:[Object(m.jsx)("h2",{className:"cart-item-title",children:e.chosenBasket.name}),Object(m.jsxs)("span",{className:"price",children:["chf ",e.chosenBasket.price]})]}),Object(m.jsx)("a",{className:"button primary modify-basket",href:"/baskets",children:t("modify")})]})}},"cart_basket")}),Object(m.jsx)("span",{className:"price",children:"chf 42.00"})]}),r.length>0&&Object(m.jsx)("ul",{className:"list-options",children:r})]})})]})},P=c.p+"static/media/box_bg_carots.e23074f4.svg",q=c.p+"static/media/box_fg_carots.7837a3f7.svg",D=n.a.forwardRef((function(e,t){var c=Object(j.a)().t,n=[{id:3,name:"4 \u0153ufs",position:4,visible:!1,variation:!0,options:["Avec (Suppl\xe9ment CHF 4.00)","Sans"],isVariable:!1,processed_options:[{fullname:"Avec (Suppl\xe9ment CHF 4.00)",name:"Avec",price:" 4.00"}]},{id:6,name:"Pan levain",position:5,visible:!1,variation:!0,options:["Baguette 250g (Suppl\xe9ment CHF 2.00)","Mi-blanc 500g (Suppl\xe9ment CHF 3.00)","Sans"],isVariable:!0,processed_options:[{fullname:"Baguette 250g (Suppl\xe9ment CHF 2.00)",name:"Baguette 250g",price:" 2.00"},{fullname:"Mi-blanc 500g (Suppl\xe9ment CHF 3.00)",name:"Mi-blanc 500g",price:" 3.00"}]},{id:5,name:"400g p\xe2tes bl\xe9 dur en vrac",position:6,visible:!1,variation:!0,options:["Avec (Suppl\xe9ment CHF 3.00)","Sans"],isVariable:!1,processed_options:[{fullname:"Avec (Suppl\xe9ment CHF 3.00)",name:"Avec",price:" 3.00"}]},{id:4,name:"Tsanpinyon",position:7,visible:!1,variation:!0,options:["250g (Suppl\xe9ment CHF 2.50)","500g (Suppl\xe9ment CHF 4.50)","Sans"],isVariable:!0,processed_options:[{fullname:"250g (Suppl\xe9ment CHF 2.50)",name:"250g",price:" 2.50"},{fullname:"500g (Suppl\xe9ment CHF 4.50)",name:"500g",price:" 4.50"}]},{id:9,name:"Tsanpinyon",position:7,visible:!1,variation:!0,options:["250g (Suppl\xe9ment CHF 2.50)","500g (Suppl\xe9ment CHF 4.50)","Sans"],isVariable:!0,processed_options:[{fullname:"250g (Suppl\xe9ment CHF 2.50)",name:"250g",price:" 2.50"},{fullname:"500g (Suppl\xe9ment CHF 4.50)",name:"500g",price:" 4.50"}]}],a=Math.ceil(n.length/4),i=Object(s.useState)(1),r=Object(d.a)(i,2),o=r[0],l=r[1],u=Object(s.useState)(!1),b=Object(d.a)(u,2),p=b[0],h=b[1];Object(s.useEffect)((function(){}),[]);var O=function(e){h(!0),"next"==e?l(o+1):"previous"==e&&l(o-1),setTimeout((function(){h(!1)}),2e3)},f=function(t,c,s){e.setChosenOptions([].concat(Object(M.a)(e.chosenOptions),[{id:t.id,name:t.name,option:c,price:s}]))},g=function(e){var t=e.setSelected,s=e.product,n=s.name,a=s.processed_options[0],i=a.fullname,r=a.price;return Object(m.jsxs)("div",{className:"banner",children:[Object(m.jsxs)("div",{className:"header",children:[Object(m.jsx)("h2",{className:"option-title",children:n}),Object(m.jsxs)("span",{className:"price",children:["chf",r]})]}),Object(m.jsx)("button",{className:"option-btn-add button primary",onClick:function(){return t(!1),void f(s,i,r)},children:c("add")})]})},x=function(e){var t=e.setSelected,n=e.product,a=n.name,i=Object(s.useState)(null),r=Object(d.a)(i,2),o=r[0],l=r[1];return Object(m.jsxs)("div",{className:"banner",children:[Object(m.jsx)("div",{className:"header",children:Object(m.jsx)("h2",{className:"option-title",children:a})}),Object(m.jsx)("ul",{className:"option-variations",children:n.processed_options.map((function(e){return Object(m.jsxs)("li",{className:"option-variation",children:[Object(m.jsxs)("label",{className:"button toggle ".concat(o&&o.fullname==e.fullname&&"selected"),onClick:function(){return l(e)},children:[Object(m.jsx)("input",{type:"radio",id:e.name,name:a,value:e.fullname}),e.name]}),Object(m.jsxs)("span",{className:"price",children:["chf",e.price]})]},e.fullname)}))}),Object(m.jsx)("button",{className:"option-btn-add button primary",onClick:function(){return t(!1),void f(n,o.fullname,o.price)},disabled:!o,children:c("add")})]})},v=[];Object.values(n).forEach((function(t,c){var s=e.chosenOptions.filter((function(e){return e.id===t.id})).length;v.push(Object(m.jsx)(H,{index:c,imgs:{bg:P,icon:s?"":I,fg:q},children:function(e){return t.isVariable?Object(m.jsx)(x,{setSelected:e,product:t}):Object(m.jsx)(g,{setSelected:e,product:t})}},"option_".concat(t.id)))}));for(var N=[],k=1;k<=a;k++)N.push(Object(m.jsx)(R,{index:k},"decor_".concat(k)));return Object(m.jsxs)("div",{ref:t,className:"page options",style:{"--current-page":o-1},children:[Object(m.jsxs)("main",{className:"wrapper",children:[Object(m.jsx)(y,{text:c("tooltip.addSomething")}),Object(m.jsx)("ul",{className:"products",children:v}),Object(m.jsx)(S,{options:{hasBasket:!0,isWalking:p}}),Object(m.jsx)(E,{}),Object(m.jsxs)("nav",{className:"navbar",children:[o>1&&Object(m.jsx)("button",{className:"button secondary previous",onClick:function(){return O("previous")},children:c("pagination.previous")}),o<a&&Object(m.jsx)("button",{className:"button secondary next",onClick:function(){return O("next")},children:c("pagination.next")}),o>=a&&Object(m.jsx)("button",{className:"button primary checkout",children:c("pagination.checkout")})]}),Object(m.jsx)(J,{chosenBasket:e.chosenBasket,chosenOptions:e.chosenOptions,setChosenOptions:e.setChosenOptions})]}),Object(m.jsx)("div",{className:"decorative-elems",children:N})]})})),G=function(){var e=Object(j.a)().t;return Object(m.jsx)("div",{children:Object(m.jsx)("b",{children:e("Hello")})})},K=function(e){return Object(m.jsxs)("form",{children:[Object(m.jsxs)("label",{children:[Object(m.jsx)("input",{type:"radio",value:"de",name:"language",checked:"de"===e.selectedLang,onChange:e.changeLanguage})," de"]}),Object(m.jsxs)("label",{children:[Object(m.jsx)("input",{type:"radio",value:"fr",name:"language",checked:"fr"===e.selectedLang,onChange:e.changeLanguage})," fr"]})]})},Q=c(100),U=c(98);var X=function(){var e=Object(s.useState)(0),t=Object(d.a)(e,2),c=t[0],n=t[1],a=Object(s.useState)(0),i=Object(d.a)(a,2),r=i[0],b=i[1],O=.95;Object(s.useEffect)((function(){var e=function(){n(window.innerHeight),b(window.innerWidth)};return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]);var f=Object(u.f)(),g=Object(u.g)(),x=Object(s.useRef)(null),v=Object(s.useRef)(null),N=Object(s.useRef)(null),k=Object(s.useRef)(null),w={"/":v,"/baskets":N,"/options":k,"/loading":x},S=Object(j.a)(null,{useSuspense:!1}),C=S.i18n,y=S.ready,B=Object(s.useState)("fr"),H=Object(d.a)(B,2),E=H[0],F=H[1],L=Object(s.useState)(null),R=Object(d.a)(L,2),T=R[0],A=R[1],M=Object(s.useState)([]),W=Object(d.a)(M,2),z=W[0],I=W[1],J=Object(s.useState)(!1),P=Object(d.a)(J,2),q=(P[0],P[1]),X=Object(s.useState)(!1),Y=Object(d.a)(X,2),Z=(Y[0],Y[1]),$=Object(s.useState)(null),ee=Object(d.a)($,2),te=ee[0],ce=ee[1],se=function(){var e=Object(l.a)(o.a.mark((function e(t,c){var s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z(!1),q(!0),e.prev=2,e.next=5,p()("https://proxy.bouteka.ch/"+t);case 5:s=e.sent,c(s.data),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(2),Z(e.t0),console.log("Fetch error",e.t0);case 13:q(!1);case 14:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,c){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){y&&se("products?lang="+E,ce)}),[y,E]),Object(s.useEffect)((function(){}),[T]),Object(s.useEffect)((function(){}),[z]),Object(m.jsx)("div",{className:"App",style:{"--max-width":"375px","--wrapper-width":"95%","--window-height":c+"px","--window-width":r+"px","--window-width-95":r*O>375?"375px":r*O+"px","--transition-betw-pages-dur":"600ms"},children:Object(m.jsx)(Q.a,{children:Object(m.jsx)(U.a,{nodeRef:w[g.pathname],timeout:600,classNames:"fade",children:y?Object(m.jsxs)(u.c,{location:g,children:[Object(m.jsxs)(u.a,{path:"/lang",children:[Object(m.jsx)(G,{}),Object(m.jsx)(K,{changeLanguage:function(e){F(e.target.value),C.changeLanguage(e.target.value)},selectedLang:E})]}),Object(m.jsx)(u.a,{path:"/options",children:Object(m.jsx)(D,{ref:k,history:f,chosenBasket:T,chosenOptions:z,setChosenOptions:I})}),Object(m.jsx)(u.a,{path:"/baskets",children:te?Object(m.jsx)(V,{ref:N,history:f,baskets:te,chosenBasket:T,setChosenBasket:A}):Object(m.jsx)(h,{ref:x})}),Object(m.jsx)(u.a,{path:"/",children:Object(m.jsx)(_,{ref:v,history:f})})]}):Object(m.jsx)(h,{ref:x})},g.key)})})},Y=c(31),Z=c(19),$=c(49),ee=c(51);Y.a.use($.a).use(ee.a).use(Z.e).init({lng:"fr",backend:{loadPath:"/assets/i18n/{{ns}}/{{lng}}.json"},fallbackLng:"fr",debug:!0,ns:["translations"],defaultNS:"translations",interpolation:{escapeValue:!1,formatSeparator:","},react:{wait:!0}});Y.a;var te=c(27);i.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(te.a,{children:Object(m.jsx)(X,{})})}),document.getElementById("root"))}},[[96,1,2]]]);
//# sourceMappingURL=main.b6f749f3.chunk.js.map