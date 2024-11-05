var Cn=Array.isArray,Nn=Array.from,bn=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,Qt=Object.getOwnPropertyDescriptors,qn=Object.prototype,Pn=Array.prototype,Wt=Object.getPrototypeOf;function Fn(t){return typeof t=="function"}const Ln=()=>{};function Mn(t){return t()}function dt(t){for(var n=0;n<t.length;n++)t[n]()}const m=2,Et=4,Y=8,rt=16,w=32,z=64,R=128,V=256,p=512,x=1024,b=2048,N=4096,j=8192,Xt=16384,yt=32768,Hn=65536,tn=1<<18,wt=1<<19,ct=Symbol("$state"),Yn=Symbol("");function Tt(t){return t===this.v}function nn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function mt(t){return!nn(t,this.v)}function rn(t){throw new Error("effect_in_teardown")}function en(){throw new Error("effect_in_unowned_derived")}function sn(t){throw new Error("effect_orphan")}function an(){throw new Error("effect_update_depth_exceeded")}function jn(){throw new Error("hydration_failed")}function Bn(t){throw new Error("lifecycle_legacy_only")}function Un(t){throw new Error("props_invalid_value")}function Vn(){throw new Error("state_descriptors_fixed")}function Gn(){throw new Error("state_prototype_fixed")}function ln(){throw new Error("state_unsafe_local_read")}function un(){throw new Error("state_unsafe_mutation")}function et(t){return{f:0,v:t,reactions:null,equals:Tt,version:0}}function Kn(t){return At(et(t))}function on(t,n=!1){var e;const r=et(t);return n||(r.equals=mt),i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function $n(t,n=!1){return At(on(t,n))}function At(t){return o!==null&&o.f&m&&(y===null?gn([t]):y.push(t)),t}function Zn(t,n){return st(t,zt(()=>it(t))),n}function st(t,n){return o!==null&&ot()&&o.f&(m|rt)&&(y===null||!y.includes(t))&&un(),fn(t,n)}function fn(t,n){return t.equals(n)||(t.v=n,t.version=Ut(),gt(t,x),ot()&&u!==null&&u.f&p&&!(u.f&w)&&(_!==null&&_.includes(t)?(E(u,x),J(u)):g===null?xn([t]):g.push(t))),n}function gt(t,n){var r=t.reactions;if(r!==null)for(var e=ot(),s=r.length,a=0;a<s;a++){var l=r[a],f=l.f;f&x||!e&&l===u||(E(l,n),f&(p|R)&&(f&m?gt(l,b):J(l)))}}const zn=1,Jn=2,Qn=4,Wn=8,Xn=16,tr=1,nr=2,rr=4,er=8,sr=16,ar=4,lr=1,ur=2,_n="[",cn="[!",vn="]",xt={},or=Symbol(),ir="http://www.w3.org/2000/svg";function It(t){console.warn("hydration_mismatch")}let k=!1;function fr(t){k=t}let d;function L(t){if(t===null)throw It(),xt;return d=t}function _r(){return L(O(d))}function cr(t){if(k){if(O(d)!==null)throw It(),xt;d=t}}function vr(t=1){if(k){for(var n=t,r=d;n--;)r=O(r);d=r}}function pr(){for(var t=0,n=d;;){if(n.nodeType===8){var r=n.data;if(r===vn){if(t===0)return n;t-=1}else(r===_n||r===cn)&&(t+=1)}var e=O(n);n.remove(),n=e}}var vt,St,kt;function hr(){if(vt===void 0){vt=window;var t=Element.prototype,n=Node.prototype;St=_t(n,"firstChild").get,kt=_t(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function Q(t=""){return document.createTextNode(t)}function W(t){return St.call(t)}function O(t){return kt.call(t)}function dr(t,n){if(!k)return W(t);var r=W(d);if(r===null)r=d.appendChild(Q());else if(n&&r.nodeType!==3){var e=Q();return r==null||r.before(e),L(e),e}return L(r),r}function Er(t,n){if(!k){var r=W(t);return r instanceof Comment&&r.data===""?O(r):r}return d}function yr(t,n=1,r=!1){let e=k?d:t;for(;n--;)e=O(e);if(!k)return e;var s=e.nodeType;if(r&&s!==3){var a=Q();return e==null||e.before(a),L(a),a}return L(e),e}function wr(t){t.textContent=""}function pn(t){var n=m|x;u===null?n|=R:u.f|=wt;const r={children:null,ctx:i,deps:null,equals:Tt,f:n,fn:t,reactions:null,v:null,version:0,parent:u};if(o!==null&&o.f&m){var e=o;(e.children??(e.children=[])).push(r)}return r}function Tr(t){const n=pn(t);return n.equals=mt,n}function Rt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&m?at(e):P(e)}}}function Ot(t){var n,r=u;Z(t.parent);try{Rt(t),n=Vt(t)}finally{Z(r)}return n}function Dt(t){var n=Ot(t),r=(S||t.f&R)&&t.deps!==null?b:p;E(t,r),t.equals(n)||(t.v=n,t.version=Ut())}function at(t){Rt(t),H(t,0),E(t,j),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Ct(t){u===null&&o===null&&sn(),o!==null&&o.f&R&&en(),ut&&rn()}function hn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function q(t,n,r,e=!0){var s=(t&z)!==0,a=u,l={ctx:i,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|x,first:null,fn:n,last:null,next:null,parent:s?null:a,prev:null,teardown:null,transitions:null,version:0};if(r){var f=D;try{pt(!0),B(l),l.f|=Xt}catch(c){throw P(l),c}finally{pt(f)}}else n!==null&&J(l);var T=r&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&wt)===0;if(!T&&!s&&e&&(a!==null&&hn(l,a),o!==null&&o.f&m)){var A=o;(A.children??(A.children=[])).push(l)}return l}function mr(){return o===null?!1:!S}function Ar(t){const n=q(Y,null,!1);return E(n,p),n.teardown=t,n}function gr(t){Ct();var n=u!==null&&(u.f&w)!==0&&i!==null&&!i.m;if(n){var r=i;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=Nt(t);return e}}function xr(t){return Ct(),lt(t)}function Ir(t){const n=q(z,t,!0);return()=>{P(n)}}function Nt(t){return q(Et,t,!1)}function Sr(t,n){var r=i,e={effect:null,ran:!1};r.l.r1.push(e),e.effect=lt(()=>{t(),!e.ran&&(e.ran=!0,st(r.l.r2,!0),zt(n))})}function kr(){var t=i;lt(()=>{if(it(t.l.r2)){for(var n of t.l.r1){var r=n.effect;r.f&p&&E(r,b),F(r)&&B(r),n.ran=!1}t.l.r2.v=!1}})}function lt(t){return q(Y,t,!0)}function Rr(t){return dn(t)}function dn(t,n=0){return q(Y|rt|n,t,!0)}function Or(t,n=!0){return q(Y|w,t,!0,n)}function bt(t){var n=t.teardown;if(n!==null){const r=ut,e=o;ht(!0),$(null);try{n.call(null)}finally{ht(r),$(e)}}}function qt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)at(n[r])}}function Pt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;P(r,n),r=e}}function En(t){for(var n=t.first;n!==null;){var r=n.next;n.f&w||P(n),n=r}}function P(t,n=!0){var r=!1;if((n||t.f&tn)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var a=e===s?null:O(e);e.remove(),e=a}r=!0}Pt(t,n&&!r),qt(t),H(t,0),E(t,j);var l=t.transitions;if(l!==null)for(const T of l)T.stop();bt(t);var f=t.parent;f!==null&&f.first!==null&&Ft(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.parent=t.fn=t.nodes_start=t.nodes_end=null}function Ft(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function Dr(t,n){var r=[];Lt(t,r,!0),yn(r,()=>{P(t),n&&n()})}function yn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Lt(t,n,r){if(!(t.f&N)){if(t.f^=N,t.transitions!==null)for(const l of t.transitions)(l.is_global||r)&&n.push(l);for(var e=t.first;e!==null;){var s=e.next,a=(e.f&yt)!==0||(e.f&w)!==0;Lt(e,n,a?r:!1),e=s}}}function Cr(t){Mt(t,!0)}function Mt(t,n){if(t.f&N){F(t)&&B(t),t.f^=N;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&yt)!==0||(r.f&w)!==0;Mt(r,s?n:!1),r=e}if(t.transitions!==null)for(const a of t.transitions)(a.is_global||n)&&a.in()}}const wn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let G=!1,K=!1,X=[],tt=[];function Ht(){G=!1;const t=X.slice();X=[],dt(t)}function Yt(){K=!1;const t=tt.slice();tt=[],dt(t)}function Nr(t){G||(G=!0,queueMicrotask(Ht)),X.push(t)}function br(t){K||(K=!0,wn(Yt)),tt.push(t)}function Tn(){G&&Ht(),K&&Yt()}function qr(){throw new Error("invalid_default_snippet")}function mn(t){throw new Error("lifecycle_outside_component")}const jt=0,An=1;let U=jt,M=!1,D=!1,ut=!1;function pt(t){D=t}function ht(t){ut=t}let I=[],C=0;let o=null;function $(t){o=t}let u=null;function Z(t){u=t}let y=null;function gn(t){y=t}let _=null,h=0,g=null;function xn(t){g=t}let Bt=0,S=!1,i=null;function Ut(){return++Bt}function ot(){return i!==null&&i.l===null}function F(t){var l,f;var n=t.f;if(n&x)return!0;if(n&b){var r=t.deps,e=(n&R)!==0;if(r!==null){var s;if(n&V){for(s=0;s<r.length;s++)((l=r[s]).reactions??(l.reactions=[])).push(t);t.f^=V}for(s=0;s<r.length;s++){var a=r[s];if(F(a)&&Dt(a),e&&u!==null&&!S&&!((f=a==null?void 0:a.reactions)!=null&&f.includes(t))&&(a.reactions??(a.reactions=[])).push(t),a.version>t.version)return!0}}e||E(t,p)}return!1}function In(t,n,r){throw t}function Vt(t){var ft;var n=_,r=h,e=g,s=o,a=S,l=y,f=i,T=t.f;_=null,h=0,g=null,o=T&(w|z)?null:t,S=!D&&(T&R)!==0,y=null,i=t.ctx;try{var A=(0,t.fn)(),c=t.deps;if(_!==null){var v;if(H(t,h),c!==null&&h>0)for(c.length=h+_.length,v=0;v<_.length;v++)c[h+v]=_[v];else t.deps=c=_;if(!S)for(v=h;v<c.length;v++)((ft=c[v]).reactions??(ft.reactions=[])).push(t)}else c!==null&&h<c.length&&(H(t,h),c.length=h);return A}finally{_=n,h=r,g=e,o=s,S=a,y=l,i=f}}function Sn(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&m&&(_===null||!_.includes(n))&&(E(n,b),n.f&(R|V)||(n.f^=V),H(n,0))}function H(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Sn(t,r[e])}function B(t){var n=t.f;if(!(n&j)){E(t,p);var r=u;u=t;try{n&rt?En(t):Pt(t),qt(t),bt(t);var e=Vt(t);t.teardown=typeof e=="function"?e:null,t.version=Bt}catch(s){In(s)}finally{u=r}}}function Gt(){C>1e3&&(C=0,an()),C++}function Kt(t){var n=t.length;if(n!==0){Gt();var r=D;D=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&p||(s.f^=p);var a=[];$t(s,a),kn(a)}}finally{D=r}}}function kn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];!(e.f&(j|N))&&F(e)&&(B(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Ft(e):e.fn=null))}}function Rn(){if(M=!1,C>1001)return;const t=I;I=[],Kt(t),M||(C=0)}function J(t){U===jt&&(M||(M=!0,queueMicrotask(Rn)));for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(z|w)){if(!(r&p))return;n.f^=p}}I.push(n)}function $t(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,a=(s&w)!==0,l=a&&(s&p)!==0;if(!l&&!(s&N))if(s&Y){a?r.f^=p:F(r)&&B(r);var f=r.first;if(f!==null){r=f;continue}}else s&Et&&e.push(r);var T=r.next;if(T===null){let v=r.parent;for(;v!==null;){if(t===v)break t;var A=v.next;if(A!==null){r=A;continue t}v=v.parent}}r=T}for(var c=0;c<e.length;c++)f=e[c],n.push(f),$t(f,n)}function Zt(t){var n=U,r=I;try{Gt();const s=[];U=An,I=s,M=!1,Kt(r);var e=t==null?void 0:t();return Tn(),(I.length>0||s.length>0)&&Zt(),C=0,e}finally{U=n,I=r}}async function Pr(){await Promise.resolve(),Zt()}function it(t){var f;var n=t.f,r=(n&m)!==0;if(r&&n&j){var e=Ot(t);return at(t),e}if(o!==null){y!==null&&y.includes(t)&&ln();var s=o.deps;_===null&&s!==null&&s[h]===t?h++:_===null?_=[t]:_.push(t),g!==null&&u!==null&&u.f&p&&!(u.f&w)&&g.includes(t)&&(E(u,x),J(u))}else if(r&&t.deps===null){var a=t,l=a.parent;l!==null&&!((f=l.deriveds)!=null&&f.includes(a))&&(l.deriveds??(l.deriveds=[])).push(a)}return r&&(a=t,F(a)&&Dt(a)),t.v}function zt(t){const n=o;try{return o=null,t()}finally{o=n}}const On=~(x|b|p);function E(t,n){t.f=t.f&On|n}function Fr(t){return Jt().get(t)}function Lr(t,n){return Jt().set(t,n),n}function Jt(t){return i===null&&mn(),i.c??(i.c=new Map(Dn(i)||void 0))}function Dn(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function Mr(t,n=1){var r=+it(t);return st(t,r+n),r}function Hr(t,n=!1,r){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},n||(i.l={s:null,u:null,r1:[],r2:et(!1)})}function Yr(t){const n=i;if(n!==null){t!==void 0&&(n.x=t);const l=n.e;if(l!==null){var r=u,e=o;n.e=null;try{for(var s=0;s<l.length;s++){var a=l[s];Z(a.effect),$(a.reaction),Nt(a.fn)}}finally{Z(r),$(e)}}i=n.p,n.m=!0}return t||{}}function jr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ct in t)nt(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ct in r&&nt(r)}}}function nt(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{nt(t[e],n)}catch{}const r=Wt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Qt(r);for(let s in e){const a=e[s].get;if(a)try{a.call(t)}catch{}}}}}export{et as $,Ir as A,Q as B,Or as C,k as D,u as E,dn as F,yt as G,_n as H,Ln as I,P as J,xr as K,Mn as L,dt as M,it as N,jr as O,pn as P,vr as Q,Cr as R,Dr as S,cn as T,pr as U,Nt as V,lt as W,Nr as X,ct as Y,qn as Z,Pn as _,Yr as a,Vn as a0,st as a1,_t as a2,or as a3,Gn as a4,Wt as a5,Un as a6,Hn as a7,rr as a8,mt as a9,Wn as aA,br as aB,Yn as aC,Qt as aD,Sr as aE,kr as aF,$n as aG,Zt as aH,Pr as aI,Lr as aJ,Zn as aK,rt as aL,Xt as aM,ar as aN,ot as aO,mr as aP,ir as aQ,nn as aR,Fr as aS,qr as aT,vt as aU,Mr as aa,w as ab,z as ac,Z as ad,tr as ae,nr as af,er as ag,Tr as ah,sr as ai,on as aj,Fn as ak,lr as al,ur as am,Kn as an,Ar as ao,bn as ap,$ as aq,o as ar,N as as,zn as at,fn as au,Jn as av,Xn as aw,Lt as ax,yn as ay,Qn as az,i as b,dr as c,zt as d,Bn as e,Er as f,hr as g,W as h,Cn as i,O as j,xt as k,mn as l,fr as m,L as n,_r as o,Hr as p,d as q,cr as r,yr as s,Rr as t,gr as u,vn as v,It as w,jn as x,wr as y,Nn as z};