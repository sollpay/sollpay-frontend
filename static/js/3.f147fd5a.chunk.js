(this["webpackJsonpsollpay-frontend"]=this["webpackJsonpsollpay-frontend"]||[]).push([[3],{308:function(e,t,n){},309:function(e,t,n){},310:function(e,t,n){},311:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(42),c=n(20),r="https://explorer.solana.com/",l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"tx",t=arguments.length>1?arguments[1]:void 0,n=c.b.getState(),l="".concat(r).concat(e,"/").concat(t);switch(n){case"devnet":case"testnet":return"".concat(l,"?cluster=").concat(n);case"localnet":return"".concat(l,"?cluster=custom&customUrl=").concat(a.b);default:return l}}},312:function(e,t,n){},313:function(e,t,n){},314:function(e,t,n){"use strict";n.d(t,"a",(function(){return k}));var a=n(4),c=n.n(a),r=n(304),l=n(95),o=n(94),u=n(86),s=Object(r.a)("div")({name:"Wrapper",class:"wky1uxu"}),i=Object(r.a)(u.b)({name:"NavLinkMenu",class:"n19qpodg"}),m=Object(r.a)("span")({name:"NavLinkText",class:"n1ld56f4"}),d=function(){return c.a.createElement(s,null,c.a.createElement(i,{to:"/customer/plans"},c.a.createElement(m,null,"Plans")),c.a.createElement(i,{to:"/customer/subscriptions"},c.a.createElement(m,null,"Subscriptions")))};n(308);var b=Object(r.a)("div")({name:"Wrapper",class:"w1nvtjtn"}),f=Object(r.a)(u.b)({name:"NavLinkMenu",class:"n1y6xxn"}),p=Object(r.a)("span")({name:"NavLinkText",class:"nfei7r9"}),E=function(){return c.a.createElement(b,null,c.a.createElement(f,{to:"/user/subscriptions"},c.a.createElement(p,null,"Subscriptions")))};n(309);var v=Object(r.a)("div")({name:"Wrapper",class:"wswamp6"}),j=Object(r.a)("div")({name:"Container",class:"c1v5i9nx"}),O=Object(r.a)("div")({name:"Content",class:"c1y2mbv4"}),k=function(e){var t=e.type,n=e.children;return c.a.createElement(v,null,c.a.createElement(o.a,null),c.a.createElement(l.a,null,c.a.createElement(j,null,"customer"===t?c.a.createElement(d,null):"user"===t?c.a.createElement(E,null):null,c.a.createElement(O,null,n))))};n(310)},315:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(4),c=n.n(a),r=n(304),l=Object(r.a)("div")({name:"Wrapper",class:"w623rkf"}),o=function(e){return c.a.createElement(l,null)};n(312)},316:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(304),c=Object(a.a)("table")({name:"Table",class:"t1r7dye6"});n(313)},317:function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return r})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return o}));var a=n(304),c=Object(a.a)("div")({name:"Header",class:"hfl2njp"}),r=Object(a.a)("h3")({name:"Title",class:"tozsojs"}),l=Object(a.a)("p")({name:"Description",class:"d14a6x6i"}),o=Object(a.a)("a")({name:"ExplorerA",class:"e17uddy"});n(318)},318:function(e,t,n){},328:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var a=n(4),c=n.n(a),r=n(41),l=n(52),o=n(145),u=n(314),s=n(77),i=n(79),m=n(311),d=n(315),b=n(20),f=n(9),p=n(25),E=n(22),v="/src/pages/customer/plans/model.ts",j=Object(r.a)(),O=E.b.createStore([],{loc:{file:v,line:17,column:22},name:"$plans",sid:"f0m52x"}),k=p.d.pending;O.on(p.d.doneData,(function(e,t){return t})),Object(f.forward)({"\u0254":{from:j.open,to:p.d},config:{loc:{file:v,line:28,column:0},sid:"aj10zb"}}),Object(f.sample)({"\u0254":[{source:j.open,clock:b.f.done,target:p.d}],config:{loc:{file:v,line:33,column:0},sid:"axboep"}}),Object(f.sample)({"\u0254":[{source:j.open,clock:p.b.done,target:p.d}],config:{loc:{file:v,line:39,column:0},sid:"b0mfyv"}});var h=n(316),y=n(317),x=function(){Object(r.b)(j);var e=Object(r.c)(O),t=Object(r.c)(k),n=Object(r.c)(b.a);return c.a.createElement(u.a,{type:"customer"},c.a.createElement(y.c,null,c.a.createElement(y.d,null,"Plans"),c.a.createElement(s.a,{primary:!0,onClick:function(){Object(l.e)({modalType:o.a})}},"Create plan")),c.a.createElement(y.a,null,"These are subscription plans that users can subscribe to."),c.a.createElement(h.a,null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Address"),c.a.createElement("th",null,"Token"),c.a.createElement("th",null,"Price"),c.a.createElement("th",null,"Interval"))),c.a.createElement("tbody",null,e.map((function(e){return function(e){var t=n.find((function(t){return t.mintAddress===e.account.data.token.toBase58()}));return c.a.createElement("tr",{key:e.pubkey.toBase58()},c.a.createElement("td",null,c.a.createElement(y.b,{href:Object(m.a)("address",e.pubkey.toBase58()),target:"_blank",rel:"noopener noreferrer noindex"},Object(i.a)(e.pubkey.toBase58()))),c.a.createElement("td",null,c.a.createElement(y.b,{href:Object(m.a)("address",e.account.data.token.toBase58()),target:"_blank",rel:"noopener noreferrer noindex"},(null===t||void 0===t?void 0:t.tokenSymbol)||Object(i.a)(e.account.data.token.toBase58()))),c.a.createElement("td",null,e.account.data.maxAmount.toNumber()),c.a.createElement("td",null,e.account.data.subscriptionTimeframe.toNumber()))}(e)}))),t?c.a.createElement("tfoot",null,c.a.createElement("tr",null,c.a.createElement("td",{colSpan:4},c.a.createElement(d.a,null)))):null))}}}]);
//# sourceMappingURL=3.f147fd5a.chunk.js.map