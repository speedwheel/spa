import{F as R,R as u,C as T,S as d,D as c,o as k,G as q,T as F,U as N,n as Y,m as E,q as x,V as C,W as D,d as L,X as O,Y as b}from"./runtime.CkwxRJfy.js";function v(f,a,n,i=null,r=!1){c&&k();var s=f,e=null,l=null,t=null,y=r?q:0;R(()=>{if(t===(t=!!a()))return;let h=!1;if(c){const A=s.data===F;t===A&&(s=N(),Y(s),E(!1),h=!0)}t?(e?u(e):e=T(()=>n(s)),l&&d(l,()=>{l=null})):(l?u(l):i&&(l=T(()=>i(s))),e&&d(e,()=>{e=null})),h&&E(!0)},y),c&&(s=x)}function S(f,a){return f===a||(f==null?void 0:f[b])===a}function B(f={},a,n,i){return C(()=>{var r,s;return D(()=>{r=s,s=(i==null?void 0:i())||[],L(()=>{f!==n(...s)&&(a(f,...s),r&&S(n(...r),f)&&a(null,...r))})}),()=>{O(()=>{s&&S(n(...s),f)&&a(null,...s)})}}),f}export{B as b,v as i};
