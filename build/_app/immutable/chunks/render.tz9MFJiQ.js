import{g as m,h as H,H as L,j as O,k as p,m as h,n as T,o as C,q as _,v as I,w as Y,x as j,y as k,z as M,A as S,B as V,C as $,p as q,D as w,E as z,a as B,b as W}from"./runtime.CkwxRJfy.js";import{b as F,r as A,h as y,i as G}from"./store.Bsq8KBLz.js";import{b as J}from"./template.2ssBT80h.js";let b=!0;function X(t){b=t}function Z(t,e){var n=e==null?"":typeof e=="object"?e+"":e;n!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=n,t.nodeValue=n==null?"":n+"")}function K(t,e){return D(t,e)}function x(t,e){m(),e.intro=e.intro??!1;const n=e.target,l=w,u=_;try{for(var r=H(n);r&&(r.nodeType!==8||r.data!==L);)r=O(r);if(!r)throw p;h(!0),T(r),C();const i=D(t,{...e,anchor:r});if(_===null||_.nodeType!==8||_.data!==I)throw Y(),p;return h(!1),i}catch(i){if(i===p)return e.recover===!1&&j(),m(),k(n),h(!1),K(t,e);throw i}finally{h(l),T(u)}}const d=new Map;function D(t,{target:e,anchor:n,props:l={},events:u,context:r,intro:i=!0}){m();var v=new Set,g=o=>{for(var a=0;a<o.length;a++){var s=o[a];if(!v.has(s)){v.add(s);var f=G(s);e.addEventListener(s,y,{passive:f});var R=d.get(s);R===void 0?(document.addEventListener(s,y,{passive:f}),d.set(s,1)):d.set(s,R+1)}}};g(M(F)),A.add(g);var c=void 0,N=S(()=>{var o=n??e.appendChild(V());return $(()=>{if(r){q({});var a=W;a.c=r}u&&(l.$$events=u),w&&J(o,null),b=i,c=t(o,l)||{},b=!0,w&&(z.nodes_end=_),r&&B()}),()=>{var f;for(var a of v){e.removeEventListener(a,y);var s=d.get(a);--s===0?(document.removeEventListener(a,y),d.delete(a)):d.set(a,s)}A.delete(g),E.delete(c),o!==n&&((f=o.parentNode)==null||f.removeChild(o))}});return E.set(c,N),c}let E=new WeakMap;function ee(t){const e=E.get(t);e&&e()}export{b as a,X as b,x as h,K as m,Z as s,ee as u};
