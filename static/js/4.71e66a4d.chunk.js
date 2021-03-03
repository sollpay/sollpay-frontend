(this["webpackJsonpsollpay-frontend"]=this["webpackJsonpsollpay-frontend"]||[]).push([[4],{308:function(e,t,n){},309:function(e,t,n){},310:function(e,t,n){},311:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(42),c=n(20),r="https://explorer.solana.com/",l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"tx",t=arguments.length>1?arguments[1]:void 0,n=c.b.getState(),l="".concat(r).concat(e,"/").concat(t);switch(n){case"devnet":case"testnet":return"".concat(l,"?cluster=").concat(n);case"localnet":return"".concat(l,"?cluster=custom&customUrl=").concat(a.b);default:return l}}},312:function(e,t,n){},313:function(e,t,n){},314:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var a=n(4),c=n.n(a),r=n(304),l=n(95),u=n(94),o=n(86),s=Object(r.a)("div")({name:"Wrapper",class:"wky1uxu"}),i=Object(r.a)(o.b)({name:"NavLinkMenu",class:"n19qpodg"}),m=Object(r.a)("span")({name:"NavLinkText",class:"n1ld56f4"}),d=function(){return c.a.createElement(s,null,c.a.createElement(i,{to:"/customer/plans"},c.a.createElement(m,null,"Plans")),c.a.createElement(i,{to:"/customer/subscriptions"},c.a.createElement(m,null,"Subscriptions")))};n(308);var b=Object(r.a)("div")({name:"Wrapper",class:"w1nvtjtn"}),f=Object(r.a)(o.b)({name:"NavLinkMenu",class:"n1y6xxn"}),p=Object(r.a)("span")({name:"NavLinkText",class:"nfei7r9"}),E=function(){return c.a.createElement(b,null,c.a.createElement(f,{to:"/user/subscriptions"},c.a.createElement(p,null,"Subscriptions")))};n(309);var v=Object(r.a)("div")({name:"Wrapper",class:"wswamp6"}),j=Object(r.a)("div")({name:"Container",class:"c1v5i9nx"}),O=Object(r.a)("div")({name:"Content",class:"c1y2mbv4"}),h=function(e){var t=e.type,n=e.children;return c.a.createElement(v,null,c.a.createElement(u.a,null),c.a.createElement(l.a,null,c.a.createElement(j,null,"customer"===t?c.a.createElement(d,null):"user"===t?c.a.createElement(E,null):null,c.a.createElement(O,null,n))))};n(310)},315:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n(4),c=n.n(a),r=n(304),l=Object(r.a)("div")({name:"Wrapper",class:"w623rkf"}),u=function(e){return c.a.createElement(l,null)};n(312)},316:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(304),c=Object(a.a)("table")({name:"Table",class:"t1r7dye6"});n(313)},317:function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return r})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return u}));var a=n(304),c=Object(a.a)("div")({name:"Header",class:"hfl2njp"}),r=Object(a.a)("h3")({name:"Title",class:"tozsojs"}),l=Object(a.a)("p")({name:"Description",class:"d14a6x6i"}),u=Object(a.a)("a")({name:"ExplorerA",class:"e17uddy"});n(318)},318:function(e,t,n){},329:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var a=n(4),c=n.n(a),r=n(41),l=n(111),u=n.n(l),o=n(314),s=n(79),i=n(311),m=n(315),d=n(316),b=n(77),f=n(317),p=n(9),E=n(25),v=n(22),j=n(20),O="/src/pages/customer/subscriptions/model.ts",h=Object(r.a)(),y=v.b.createStore([],{loc:{file:O,line:12,column:30},name:"$subscriptions",sid:"vwu6rd"}),k=E.e.pending;y.on(E.e.doneData,(function(e,t){return t})),Object(p.forward)({"\u0254":{from:h.open,to:E.e},config:{loc:{file:O,line:23,column:0},sid:"vnd50m"}}),Object(p.sample)({"\u0254":[{source:h.open,clock:j.f.done,target:E.e}],config:{loc:{file:O,line:28,column:0},sid:"vq43zf"}});var x=function(){Object(r.b)(h);var e=Object(r.c)(y),t=Object(r.c)(k);return c.a.createElement(o.a,{type:"customer"},c.a.createElement(f.c,null,c.a.createElement(f.d,null,"Subscriptions")),c.a.createElement(f.a,null,"These are subscriptions that users can subscribed to."),c.a.createElement(d.a,null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Address"),c.a.createElement("th",null,"Subscription Plan"),c.a.createElement("th",null,"Cycle start"),c.a.createElement("th",null,"Price"),c.a.createElement("th",null,"Interval"),c.a.createElement("th",null,"Claim"))),c.a.createElement("tbody",null,e.map((function(e){return function(e){var t=u.a.unix(e.account.data.cycleStart.toNumber()),n=u()().isAfter(t.add(e.account.data.subscriptionTimeframe.toNumber(),"day"));return c.a.createElement("tr",{key:e.pubkey.toBase58()},c.a.createElement("td",null,c.a.createElement(f.b,{href:Object(i.a)("address",e.pubkey.toBase58()),target:"_blank",rel:"noopener noreferrer noindex"},Object(s.a)(e.pubkey.toBase58()))),c.a.createElement("td",null,c.a.createElement(f.b,{href:Object(i.a)("address",e.account.data.subscriptionPlanAccount.toBase58()),target:"_blank",rel:"noopener noreferrer noindex"},Object(s.a)(e.account.data.subscriptionPlanAccount.toBase58()))),c.a.createElement("td",{title:u()(t).format("LLL")},u()().to(t)),c.a.createElement("td",null,e.account.data.maxAmount.toNumber()),c.a.createElement("td",null,e.account.data.subscriptionTimeframe.toNumber()),c.a.createElement("td",null,c.a.createElement(b.a,{primary:!0,disabled:!n},"Claim")))}(e)}))),t?c.a.createElement("tfoot",null,c.a.createElement("tr",null,c.a.createElement("td",{colSpan:6},c.a.createElement(m.a,null)))):null))}}}]);
//# sourceMappingURL=4.71e66a4d.chunk.js.map