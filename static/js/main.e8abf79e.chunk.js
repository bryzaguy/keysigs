(this.webpackJsonpkeysigs=this.webpackJsonpkeysigs||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),s=n(4),i=n.n(s),l=(n(10),n(5)),o=n(2),a=(n(11),n(0)),u=function(e){return Math.ceil(Math.random()*e)-1},h=function(e){return e[u(e.length)]},j=["A","B","C","D","E","F","G","C#","F#","Ab","Bb","Cb","Db","Eb","Gb"].sort(),d=["A","B","C","D","E","F","G","A#","C#","D#","F#","G#","Ab","Bb","Eb"].map((function(e){return e.toLowerCase()})).sort(),f=["treble","bass"],p=["Sorry","So close",":(","Ouch","Whoops","Oopsie","Dang","Answer","Bummer","Crap"],b=["Nice!","Cool!","Huzzah!","Pow!","Booyah!","Zing!","Cha-ching!","Dope!","Sick!"],g=["Major","Minor","Both"],m={maj:"Major",min:"Minor"},x=JSON.parse(localStorage.getItem("stats"))||{currentLevel:0,levelsCompleted:0},O=x.currentLevel,v=x.levelsCompleted,y=[],C=function(e){var t=[j,d][O]||j.concat(d),n=h(t.filter((function(e){return-1===y.indexOf(e)}))),r=j.indexOf(n)>-1?"maj":"min";return{clef:h(f),type:r,letter:n,letters:t,previous:e}},k=function(e){return fetch("https://api.giphy.com/v1/gifs/search?api_key=".concat("6RG4B2rBB6eP4QCDrxs7w0uZnflH6n9z","&q=").concat(e,"&limit=20&offset=").concat(u(1e3),"&rating=g&lang=en")).then((function(e){return e.json()})).then((function(e){return e.data.map((function(e){return[e.images.fixed_height.url,e.images.fixed_height.height,e.images.original.frames]}))}))},w={success:[],fail:[],ready:[]},S=!1,N=Promise.all([k("success"),k("fail"),k("ready")]);function B(e){var t=e.onClick;return Object(a.jsx)("button",{style:{fontSize:"1.5rem",padding:"1rem"},onClick:t,children:"Play!"})}function L(){var e=w,t=e.success,n=e.fail,r=e.ready;return Object(a.jsx)("div",{style:{height:0,width:0,position:"absolute",overflow:"hidden"},children:t.concat(n).concat(r).map((function(e){return Object(a.jsx)("img",{src:e},e)}))})}function A(e){var t=e.level,n=e.onClick,r=void 0===n?function(){}:n;return Object(a.jsx)("div",{className:"LevelStars",children:g.map((function(e,n){var c=t===n,s=n<v,i=s?"green":c?"darkgrey":"lightgrey",l=[s&&"wow",c&&"pulse"].filter((function(e){return e})).join(" "),o=n<=v,u={border:"1px solid #CCC",padding:"0.25rem 0.5rem",borderRadius:"3px",boxShadow:"2px 4px 6px rgba(0,0,0,".concat(c?"0.35":"0.15",")"),opacity:!o&&.25};return Object(a.jsxs)("span",{className:"LevelStar",style:u,onClick:function(){return o&&r(n)},children:[Object(a.jsxs)("span",{children:["Level ",n+1,":"]})," \xa0",Object(a.jsx)(D,{color:i,animation:l})]},n)}))})}function D(e){var t=e.color,n=e.animation;return Object(a.jsx)("svg",{className:"Star ".concat(n),xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",children:Object(a.jsx)("path",{style:{fill:t},d:"M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"})})}function M(e){var t=e.letter,n=e.children,r=t.split(""),c=Object(o.a)(r,2),s=c[0],i=c[1];return Object(a.jsxs)("span",{children:[n,s,Object(a.jsx)("span",{className:"KeyAugment",children:i||""})]})}function F(e){var t=e.letters,n=e.onClick;return Object(a.jsx)("div",{className:"Answers",children:t.map((function(e){return Object(a.jsx)("button",{onClick:n,children:Object(a.jsx)(M,{letter:e})},e)}))})}function R(e){var t=e.color,n=e.height,r=e.children;return Object(a.jsx)("div",{className:"Result",style:{backgroundColor:t||"lightgrey"},children:Object(a.jsx)("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",transition:"0.5s",overflow:"hidden",height:n||"3rem"},children:r})})}function T(e){var t=e.type,n=e.remainingCount;return Object(a.jsxs)("h2",{style:{fontWeight:300},children:[t," (",n," left)"]})}function z(e){var t=e.letter,n=e.clef,r=e.type,c=t.split(""),s=Object(o.a)(c,2),i=s[0]+(s[1]||"").replace("#","s").replace("b","f"),l="".concat(n,"-").concat(i.toLowerCase(),"-").concat(r);return Object(a.jsx)("div",{className:"App-logo ".concat(l)})}function I(){return Object(a.jsx)("a",{href:"https://docs.google.com/document/d/1e8bCDXDnz1Y-qnNY2vTknYMVThinHRO2Ur9eF1V1DZk/edit?usp=sharing",target:"_blank",rel:"noreferrer",style:{color:"white"},children:"Click here for prize!"})}function P(){return Object(a.jsxs)(r.Fragment,{children:[Object(a.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),Object(a.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&display=swap",rel:"stylesheet"}),Object(a.jsx)("style",{children:"* { font-family: Roboto }"})]})}N.then((function(e){var t=Object(o.a)(e,3),n=t[0],r=t[1],c=t[2];w={success:n,fail:r,ready:c}}));var E=function(){var e=Object(r.useState)(null),t=Object(o.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)({title:"Loading..."}),i=Object(o.a)(s,2),u=i[0],f=i[1];S||N.then((function(){setTimeout((function(){S=!0,f({title:"Ready?",splash:h(w.ready)})}),500)}));var x=n||{},k=x.clef,D=x.type,E=x.letter,G=x.letters,J=void 0===G?[]:G,_=x.previous,H=void 0===_?{}:_,W=J.length-y.length,Y=u.splash||[],Z=Object(o.a)(Y,2),q=Z[0],K=Z[1],V="maj"===D?j:d;return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(P,{}),Object(a.jsxs)("header",{className:"App-header",children:[Object(a.jsxs)(R,{color:u.color,height:K&&"calc(".concat(K,"px + 3.5rem)"),children:[u.title,q&&Object(a.jsx)("img",{src:q,style:{maxWidth:"100%",marginTop:"0.5rem"}})]}),Object(a.jsx)(A,{level:O,onClick:function(e){O=e,c(null),f({title:"Ready?",splash:h(w.ready)})}}),E&&Object(a.jsxs)(r.Fragment,{children:[Object(a.jsx)(T,{type:m[D],remainingCount:W}),Object(a.jsx)(z,{letter:E,clef:k,type:D}),!u.splash&&Object(a.jsx)(F,{letters:V,onClick:function(e){var t=e.target.textContent===E,n=H.count+1,r=t?(H.streak||0)+1:0,s=t?0:(H.losses||0)+1;if(t&&y.push(E),y.length===J.length)y=[],v=Math.min(v+1,3),O=Math.min(O+1,g.length-1),localStorage.setItem("stats",JSON.stringify({currentLevel:O,levelsCompleted:v})),f({title:3===v?Object(a.jsx)(I,{}):h(b),splash:h(w.success),color:"green"}),c(null);else if(t){var i="green";f(r>1?{title:Object(a.jsxs)("span",{style:{fontSize:"smaller"},children:[r," POINT STREAK!"]}),color:i}:{title:h(b),color:i}),c(C({count:n,streak:r,losses:s,win:t,lastLetter:E}))}else{var o={title:Object(a.jsxs)(M,{letter:E,children:[h(p),"..."]}),color:"red"},u=h(w.fail);f(Object(l.a)({splash:u},o));var j=parseInt(u[2]),d=Math.max(j*(1e3/15)+1e3,5e3);setTimeout((function(){f(o),c(C({count:n,streak:r,losses:s,win:t,lastLetter:E}))}),d)}}})]}),null==n&&Object(a.jsx)(B,{onClick:function(){f({title:"GO!"}),c(C({count:0}))}})]}),S&&Object(a.jsx)(L,{})]})},G=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,14)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),r(e),c(e),s(e),i(e)}))};i.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(E,{})}),document.getElementById("root")),G()}},[[13,1,2]]]);
//# sourceMappingURL=main.e8abf79e.chunk.js.map