(this.webpackJsonpkeysigs=this.webpackJsonpkeysigs||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),r=n(3),a=n.n(r),o=(n(9),n(4)),i=(n(10),n(0)),l=function(e){return e[Math.ceil(Math.random()*e.length)-1]},u="https://docs.google.com/document/d/1e8bCDXDnz1Y-qnNY2vTknYMVThinHRO2Ur9eF1V1DZk/edit?usp=sharing",b=["A","B","C","D","E","F","G","C#","F#","Ab","Bb","Cb","Db","Eb","Gb"].sort(),d=["A","B","C","D","E","F","G","A#","C#","D#","F#","G#","Ab","Bb","Eb"].map((function(e){return e.toLowerCase()})).sort(),j=["maj","min"],h=["treble","bass"],p=function(e){var t=l(j),n="maj"===t?b:d,c=l(n);return{clef:l(h),type:t,letter:c,letters:n,lastResult:e}};var f=function(){var e=Object(c.useState)(p({count:0})),t=Object(o.a)(e,2),n=t[0],s=n.clef,r=n.type,a=n.letter,l=n.letters,b=n.lastResult,d=t[1],j=a.split("").map((function(e,t){return t<1?e:e.replace("#","s").replace("b","f")})).join(""),h="".concat(s,"-").concat(j.toLowerCase(),"-").concat(r),f=function(e){var t=e.target.textContent===a,n=b.count+1,c=t?(b.streak||0)+1:0;d(p({count:n,streak:c,win:t}))};return Object(i.jsxs)("div",{className:"App",children:[Object(i.jsxs)("header",{className:"App-header",children:[void 0!==b.win&&Object(i.jsxs)("div",{className:"Result",style:{color:b.win?"green":"red"},children:[b.win?"GOT IT!":"BUMMER :("," ",b.streak>1&&Object(i.jsx)("span",{children:"(".concat(b.streak," POINT STREAK!)")})]}),Object(i.jsx)("div",{className:"App-logo ".concat(h)}),Object(i.jsx)("div",{className:"Answers",children:l.map((function(e){return Object(i.jsx)("button",{onClick:f,children:e},e)}))})]}),Object(i.jsx)("a",{href:u,style:{display:"hidden"},children:u})]})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),r(e),a(e)}))};a.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(f,{})}),document.getElementById("root")),m()},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.d22adb9e.chunk.js.map