(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{43:function(e,n,t){},55:function(e,n,t){"use strict";t.r(n);var c=t(0),s=t.n(c),r=t(31),a=t.n(r),i=(t(43),t(26)),o=t(2),l=t(23),u=t.n(l),j=t(30),d=t(9),m=function(){var e=(new Date).getHours().toString(),n=(new Date).getMinutes().toString();return 1===n.length&&(n="0".concat(n)),"".concat(e,":").concat(n)},b=t(1),O=function(e){var n=e.comment,t=n.userName,c=n.content,s=n.timeSent,r=n.privateMsg?"block":"none";return Object(b.jsx)("div",{className:"container-message",children:Object(b.jsxs)("div",{className:"message-orange",children:[Object(b.jsxs)("p",{className:"message-content",children:[Object(b.jsx)("b",{children:"".concat(t)}),":",c]}),Object(b.jsxs)("div",{className:"message-timestamp-left",children:[Object(b.jsxs)("span",{children:["SMS",s]}),Object(b.jsx)("span",{style:{color:"red",display:r},children:"Direct messgae!"})]})]})})},v=function(e){var n=e.comment,t=n.userName,c=n.content,s=n.timeSent,r=n.target,a=r?"block":"none";return Object(b.jsx)("div",{className:"container-message",children:Object(b.jsxs)("div",{className:"message-blue",children:[Object(b.jsxs)("p",{className:"message-content",children:[Object(b.jsx)("b",{children:"".concat(t)}),":",c]}),Object(b.jsxs)("div",{className:"message-timestamp-left",children:[Object(b.jsxs)("span",{children:["SMS",s]}),Object(b.jsxs)("span",{style:{color:"red",display:a},children:["Me to ",r]})]})]})})},h=t(32),x=t(33),p=function(e){var n=e.users,t=e.setPrivateMsg,s=Object(c.useState)("everyone"),r=Object(d.a)(s,2),a=r[0],i=r[1];return Object(b.jsxs)("div",{className:"online-tab",children:[Object(b.jsx)("div",{className:"status-bar-user",children:Object(b.jsxs)("p",{children:[Object(b.jsx)("span",{children:"\u2022"}),"Online"]})}),Object(b.jsxs)("div",{className:"online-user-list",children:[Object(b.jsx)("div",{role:"button",className:"aside__user online-circle",style:{backgroundColor:"everyone"===a?"#44db8b":"gainsboro"},onClick:function(){i("everyone"),t("")},children:Object(b.jsx)("span",{children:"Every One"})},"everyone"),n.map((function(e){return Object(b.jsxs)("div",{role:"button",className:"aside__user online-circle",style:{backgroundColor:a===e?"#44db8b":"gainsboro"},onClick:function(n){return function(e,n){i(n),t(n)}(n.target,e)},children:[Object(b.jsx)("span",{children:e}),Object(b.jsx)("span",{children:Object(b.jsx)(h.a,{icon:x.a,style:{color:"green"}})})]},e)}))]})]})},f=t(38),g=t(37),N=function(){var e=Object(c.useState)([]),n=Object(d.a)(e,2),t=n[0],s=n[1],r=Object(c.useState)([]),a=Object(d.a)(r,2),i=a[0],l=a[1],u=Object(o.e)().state.user,j=Object(c.useRef)();return Object(c.useEffect)((function(){j.current=Object(g.a)("".concat("/"),{path:"/api/chatstream",reconnectionDelayMax:1e4,auth:{token:"123"},query:{"my-key":"my-value",userName:u}}),j.current.on("connectionOpened",(function(e){var n=e.allComments,t=e.onlineUsers;s(n),l(t)})),j.current.on("onlineUsers",(function(e){var n=e.onlineUsers;l(n)})),j.current.on("commentPosted",(function(e){s((function(n){return[e].concat(Object(f.a)(n))}))})),j.current.on("connect_error",(function(){var e;null===(e=j.current)||void 0===e||e.disconnect()})),j.current.on("error",(function(e){var n=e.err;console.log("an error occured: ".concat(n))}))}),[]),{comments:t,users:i,socketRef:j,userName:u}},y=function(){var e=Object(c.useState)(),n=Object(d.a)(e,2),t=n[0],s=n[1],r=Object(c.useRef)(null),a=N(),i=a.comments,o=a.users,l=a.socketRef,h=a.userName;function x(){return f.apply(this,arguments)}function f(){return(f=Object(j.a)(u.a.mark((function e(){var n,c,s,a,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===(n=r.current)||void 0===n?void 0:n.value){e.next=2;break}return e.abrupt("return");case 2:i={timeSent:m(),content:null===(c=r.current)||void 0===c?void 0:c.value,userName:h},t?null===(a=l.current)||void 0===a||a.emit("privateComment",{newComment:i,userName:t}):null===(s=l.current)||void 0===s||s.emit("postComment",i),r.current.value="";case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(b.jsxs)("div",{id:"homePage",children:[Object(b.jsx)("div",{className:"welcome-banner",children:Object(b.jsx)("div",{className:"name-side",children:Object(b.jsxs)("p",{children:["Welcome,",h]})})}),Object(b.jsxs)("div",{className:"chat",children:[Object(b.jsx)(p,{users:o,setPrivateMsg:s}),Object(b.jsx)("div",{className:"wrapper",children:Object(b.jsxs)("div",{className:"main-container",children:[Object(b.jsx)("div",{className:"message-area",children:i?i.map((function(e){return e.userName===h?Object(b.jsx)(v,{comment:e},e.id):Object(b.jsx)(O,{comment:e},e.id)})):""}),Object(b.jsx)("div",{className:"enter-area",children:Object(b.jsxs)("form",{children:[Object(b.jsx)("input",{type:"text",placeholder:"Enter Message...",name:"message-ent",id:"message-ent",ref:r}),Object(b.jsx)("input",{className:"submitComment",type:"submit",name:"message-send",id:"message-send",value:"Send",onClick:function(){var e=Object(j.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),x();case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()})]})})]})})]})]})},k=function(){var e=Object(o.f)(),n=Object(c.useRef)(null);return Object(b.jsxs)("div",{id:"loginPage",children:[Object(b.jsxs)("div",{className:"background",children:[Object(b.jsx)("div",{className:"shape"}),Object(b.jsx)("div",{className:"shape"})]}),Object(b.jsxs)("form",{onSubmit:function(t){var c;(t.preventDefault(),function(){var e;return console.log("im on home page"),!!(null===(e=n.current)||void 0===e?void 0:e.value)}())&&e("/",{state:{user:null===(c=n.current)||void 0===c?void 0:c.value}})},children:[Object(b.jsx)("h3",{children:"Login Here"}),Object(b.jsxs)("label",{htmlFor:"username",children:["Username",Object(b.jsx)("input",{type:"text",placeholder:"username",id:"username",ref:n})]}),Object(b.jsx)("button",{type:"submit",children:"Log In"})]})]})};a.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(i.a,{children:Object(b.jsxs)(o.c,{children:[Object(b.jsx)(o.a,{path:"/login",element:Object(b.jsx)(k,{})}),Object(b.jsx)(o.a,{path:"/",element:Object(b.jsx)(y,{})})]})})}),document.getElementById("root"))}},[[55,1,2]]]);
//# sourceMappingURL=main.253709ae.chunk.js.map