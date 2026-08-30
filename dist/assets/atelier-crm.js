var e=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=t((()=>{window.AtelierCRMTranslations={locale:`pt-BR`,t:e=>e}})),r=e((()=>{}));function i(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,ee,te,x,ne,re,ie,ae,oe,se,ce,le,ue,de=e((()=>{a={},o=()=>{},s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>b(e)===`[object Map]`,p=e=>b(e)===`[object Set]`,m=e=>typeof e==`function`,h=e=>typeof e==`string`,g=e=>typeof e==`symbol`,_=e=>typeof e==`object`&&!!e,v=e=>(_(e)||m(e))&&m(e.then)&&m(e.catch),y=Object.prototype.toString,b=e=>y.call(e),ee=e=>b(e).slice(8,-1),te=e=>b(e)===`[object Object]`,x=e=>h(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,ne=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},re=/-\w/g,ne(e=>e.replace(re,e=>e.slice(1).toUpperCase())),ie=/\B([A-Z])/g,ne(e=>e.replace(ie,`-$1`).toLowerCase()),ae=ne(e=>e.charAt(0).toUpperCase()+e.slice(1)),ne(e=>e?`on${ae(e)}`:``),oe=(e,t)=>!Object.is(e,t),se=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},le=()=>ce||(ce=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{}),ue=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,ue+``}));function fe(e){return new st(e)}function pe(){return T}function me(e,t=!1){T&&T.cleanups.push(e)}function he(e,t=!1){if(e.flags|=8,t){e.next=ft,ft=e;return}e.next=dt,dt=e}function ge(){ut++}function _e(){if(--ut>0)return;if(ft){let e=ft;for(ft=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;dt;){let t=dt;for(dt=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||(e=t)}t=n}}if(e)throw e}function ve(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function ye(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Se(r),Ce(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function be(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(xe(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function xe(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===ht)||(e.globalVersion=ht,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!be(e))))return;e.flags|=2;let t=e.dep,n=E,r=pt;E=e,pt=!0;try{ve(e);let n=e.fn(e._value);(t.version===0||oe(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{E=n,pt=r,ye(e),e.flags&=-3}}function Se(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Se(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Ce(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}function we(){mt.push(pt),pt=!1}function Te(){let e=mt.pop();pt=e===void 0||e}function Ee(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=E;E=void 0;try{t()}finally{E=e}}}function De(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)De(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}function S(e,t,n){if(pt&&E){let t=vt.get(e);t||vt.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new _t),r.map=t,r.key=n),r.track()}}function Oe(e,t,n,r,i,a){let o=vt.get(e);if(!o){ht++;return}let s=e=>{e&&e.trigger()};if(ge(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&x(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===xt||!g(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(xt)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(yt)),f(e)&&s(o.get(bt)));break;case`delete`:i||(s(o.get(yt)),f(e)&&s(o.get(bt)));break;case`set`:f(e)&&s(o.get(yt));break}}_e()}function ke(e,t){let n=vt.get(e);return n&&n.get(t)}function Ae(e){let t=C(e);return t===e?t:(S(t,`iterate`,xt),Ye(e)?t:t.map(zt))}function je(e){return S(e=C(e),`iterate`,xt),e}function Me(e,t){return Je(e)?Bt(qe(e)?zt(t):t):zt(t)}function Ne(e,t,n){let r=je(e),i=r[t]();return r!==e&&!Ye(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}function Pe(e,t,n,r,i,a){let o=je(e),s=o!==e&&!Ye(e),c=o[t];if(c!==Ct[t]){let t=c.apply(e,a);return s?zt(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,Me(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function Fe(e,t,n,r){let i=je(e),a=i!==e&&!Ye(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=Me(e,t)),n.call(this,t,Me(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?Me(e,c):c}function Ie(e,t,n){let r=C(e);S(r,`iterate`,xt);let i=r[t](...n);return(i===-1||i===!1)&&Xe(n[0])?(n[0]=C(n[0]),r[t](...n)):i}function Le(e,t,n=[]){we(),ge();let r=C(e)[t].apply(e,n);return _e(),Te(),r}function Re(e){g(e)||(e=String(e));let t=C(this);return S(t,`has`,e),t.hasOwnProperty(e)}function ze(e,t,n){return function(...r){let i=this.__v_raw,a=C(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?jt:t?Bt:zt;return!t&&S(a,`iterate`,l?bt:yt),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function Be(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function Ve(e,t){let n={get(n){let r=this.__v_raw,i=C(r),a=C(n);e||(oe(n,a)&&S(i,`get`,n),S(i,`get`,a));let{has:o}=Mt(i),s=t?jt:e?Bt:zt;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&S(C(t),`iterate`,yt),t.size},has(t){let n=this.__v_raw,r=C(n),i=C(t);return e||(oe(t,i)&&S(r,`has`,t),S(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=C(a),s=t?jt:e?Bt:zt;return!e&&S(o,`iterate`,yt),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:Be(`add`),set:Be(`set`),delete:Be(`delete`),clear:Be(`clear`)}:{add(e){let n=C(this),r=Mt(n),i=C(e),a=!t&&!Ye(e)&&!Je(e)?i:e;return r.has.call(n,a)||oe(e,a)&&r.has.call(n,e)||oe(i,a)&&r.has.call(n,i)||(n.add(a),Oe(n,`add`,a,a)),this},set(e,n){!t&&!Ye(n)&&!Je(n)&&(n=C(n));let r=C(this),{has:i,get:a}=Mt(r),o=i.call(r,e);o||(e=C(e),o=i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?oe(n,s)&&Oe(r,`set`,e,n,s):Oe(r,`add`,e,n),this},delete(e){let t=C(this),{has:n,get:r}=Mt(t),i=n.call(t,e);i||(e=C(e),i=n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Oe(t,`delete`,e,void 0,a),o},clear(){let e=C(this),t=e.size!==0,n=e.clear();return t&&Oe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=ze(r,e,t)}),n}function He(e,t){let n=Ve(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}function Ue(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function We(e){return Je(e)?e:Ke(e,!1,kt,Nt,Ft)}function Ge(e){return Ke(e,!0,At,Pt,Lt)}function Ke(e,t,n,r,i){if(!_(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=Ue(ee(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function qe(e){return Je(e)?qe(e.__v_raw):!!(e&&e.__v_isReactive)}function Je(e){return!!(e&&e.__v_isReadonly)}function Ye(e){return!!(e&&e.__v_isShallow)}function Xe(e){return e?!!e.__v_raw:!1}function C(e){let t=e&&e.__v_raw;return t?C(t):e}function Ze(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&se(e,`__v_skip`,!0),e}function w(e){return e?e.__v_isRef===!0:!1}function Qe(e){return $e(e,!1)}function $e(e,t){return w(e)?e:new Vt(e,t)}function et(e){return w(e)?e.value:e}function tt(e){let t=d(e)?Array(e.length):{};for(let n in e)t[n]=nt(e,n);return t}function nt(e,t,n){return new Ht(e,t,n)}function rt(e,t,n=!1){let r,i;return m(e)?r=e:(r=e.get,i=e.set),new Ut(r,i,n)}function it(e,t=!1,n=Kt){if(n){let t=Gt.get(n);t||Gt.set(n,t=[]),t.push(e)}}function at(e,t,n=a){let{immediate:r,deep:i,once:s,scheduler:l,augmentJob:u,call:f}=n,p=e=>i?e:Ye(e)||i===!1||i===0?ot(e,1):ot(e),h,g,_,v,y=!1,b=!1;if(w(e)?(g=()=>e.value,y=Ye(e)):qe(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>qe(e)||Ye(e)),g=()=>e.map(e=>{if(w(e))return e.value;if(qe(e))return p(e);if(m(e))return f?f(e,2):e()})):g=m(e)?t?f?()=>f(e,2):e:()=>{if(_){we();try{_()}finally{Te()}}let t=Kt;Kt=h;try{return f?f(e,3,[v]):e(v)}finally{Kt=t}}:o,t&&i){let e=g,t=i===!0?1/0:i;g=()=>ot(e(),t)}let ee=pe(),te=()=>{h.stop(),ee&&ee.active&&c(ee.effects,h)};if(s&&t){let e=t;t=(...t)=>{let n=e(...t);return te(),n}}let x=b?Array(e.length).fill(Wt):Wt,ne=e=>{if(!(!(h.flags&1)||!h.dirty&&!e))if(t){let n=h.run();if(e||i||y||(b?n.some((e,t)=>oe(e,x[t])):oe(n,x))){_&&_();let e=Kt;Kt=h;try{let e=[n,x===Wt?void 0:b&&x[0]===Wt?[]:x,v];x=n,f?f(t,3,e):t(...e)}finally{Kt=e}}}else h.run()};return u&&u(ne),h=new lt(g),h.scheduler=l?()=>l(ne,!1):ne,v=e=>it(e,!1,h),_=h.onStop=()=>{let e=Gt.get(h);if(e){if(f)f(e,4);else for(let t of e)t();Gt.delete(h)}},t?r?ne(!0):x=h.run():l?l(ne.bind(null,!0),!0):h.run(),te.pause=h.pause.bind(h),te.resume=h.resume.bind(h),te.stop=te,te}function ot(e,t=1/0,n){if(t<=0||!_(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,w(e))ot(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)ot(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{ot(e,t,n)});else if(te(e)){for(let r in e)ot(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&ot(e[r],t,n)}return e}var T,st,E,ct,lt,ut,dt,ft,pt,mt,ht,gt,_t,vt,yt,bt,xt,St,Ct,wt,Tt,Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt,Ft,It,Lt,Rt,zt,Bt,Vt,Ht,Ut,Wt,Gt,Kt,qt=e((()=>{de(),st=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&T&&(T.active?(this.parent=T,this.index=(T.scopes||(T.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}let n=this.effects.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}}run(e){if(this._active){let t=T;try{return T=this,e()}finally{T=t}}}on(){++this._on===1&&(this.prevScope=T,T=this)}off(){if(this._on>0&&--this._on===0){if(T===this)T=this.prevScope;else{let e=T;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){let e=this.scopes.slice();for(t=0,n=e.length;t<n;t++)e[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}},ct=new WeakSet,lt=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,T&&(T.active?T.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ct.has(this)&&(ct.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||he(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ee(this),ve(this);let e=E,t=pt;E=this,pt=!0;try{return this.fn()}finally{ye(this),E=e,pt=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Se(e);this.deps=this.depsTail=void 0,Ee(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ct.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){be(this)&&this.run()}get dirty(){return be(this)}},ut=0,pt=!0,mt=[],ht=0,gt=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},_t=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!E||!pt||E===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==E)t=this.activeLink=new gt(E,this),E.deps?(t.prevDep=E.depsTail,E.depsTail.nextDep=t,E.depsTail=t):E.deps=E.depsTail=t,De(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=E.depsTail,t.nextDep=void 0,E.depsTail.nextDep=t,E.depsTail=t,E.deps===t&&(E.deps=e)}return t}trigger(e){this.version++,ht++,this.notify(e)}notify(e){ge();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{_e()}}},vt=new WeakMap,yt=Symbol(``),bt=Symbol(``),xt=Symbol(``),St={__proto__:null,[Symbol.iterator](){return Ne(this,Symbol.iterator,e=>Me(this,e))},concat(...e){return Ae(this).concat(...e.map(e=>d(e)?Ae(e):e))},entries(){return Ne(this,`entries`,e=>(e[1]=Me(this,e[1]),e))},every(e,t){return Pe(this,`every`,e,t,void 0,arguments)},filter(e,t){return Pe(this,`filter`,e,t,e=>e.map(e=>Me(this,e)),arguments)},find(e,t){return Pe(this,`find`,e,t,e=>Me(this,e),arguments)},findIndex(e,t){return Pe(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return Pe(this,`findLast`,e,t,e=>Me(this,e),arguments)},findLastIndex(e,t){return Pe(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return Pe(this,`forEach`,e,t,void 0,arguments)},includes(...e){return Ie(this,`includes`,e)},indexOf(...e){return Ie(this,`indexOf`,e)},join(e){return Ae(this).join(e)},lastIndexOf(...e){return Ie(this,`lastIndexOf`,e)},map(e,t){return Pe(this,`map`,e,t,void 0,arguments)},pop(){return Le(this,`pop`)},push(...e){return Le(this,`push`,e)},reduce(e,...t){return Fe(this,`reduce`,e,t)},reduceRight(e,...t){return Fe(this,`reduceRight`,e,t)},shift(){return Le(this,`shift`)},some(e,t){return Pe(this,`some`,e,t,void 0,arguments)},splice(...e){return Le(this,`splice`,e)},toReversed(){return Ae(this).toReversed()},toSorted(e){return Ae(this).toSorted(e)},toSpliced(...e){return Ae(this).toSpliced(...e)},unshift(...e){return Le(this,`unshift`,e)},values(){return Ne(this,`values`,e=>Me(this,e))}},Ct=Array.prototype,wt=i(`__proto__,__v_isRef,__isVue`),Tt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(g)),Et=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Rt:Lt:i?It:Ft).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=St[t]))return e;if(t===`hasOwnProperty`)return Re}let o=Reflect.get(e,t,w(e)?e:n);if((g(t)?Tt.has(t):wt(t))||(r||S(e,`get`,t),i))return o;if(w(o)){let e=a&&x(t)?o:o.value;return r&&_(e)?Ge(e):e}return _(o)?r?Ge(o):We(o):o}},Dt=class extends Et{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&x(t);if(!this._isShallow){let e=Je(i);if(!Ye(n)&&!Je(n)&&(i=C(i),n=C(n)),!a&&w(i)&&!w(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,w(e)?e:r);return e===C(r)&&s&&(o?oe(n,i)&&Oe(e,`set`,t,n,i):Oe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Oe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!g(t)||!Tt.has(t))&&S(e,`has`,t),n}ownKeys(e){return S(e,`iterate`,d(e)?`length`:yt),Reflect.ownKeys(e)}},Ot=class extends Et{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},kt=new Dt,At=new Ot,jt=e=>e,Mt=e=>Reflect.getPrototypeOf(e),Nt={get:He(!1,!1)},Pt={get:He(!0,!1)},Ft=new WeakMap,It=new WeakMap,Lt=new WeakMap,Rt=new WeakMap,zt=e=>_(e)?We(e):e,Bt=e=>_(e)?Ge(e):e,Vt=class{constructor(e,t){this.dep=new _t,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:C(e),this._value=t?e:zt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||Ye(e)||Je(e);e=n?e:C(e),oe(e,t)&&(this._rawValue=e,this._value=n?e:zt(e),this.dep.trigger())}},Ht=class{constructor(e,t,n){this._object=e,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0,this._key=g(t)?t:String(t),this._raw=C(e);let r=!0,i=e;if(!d(e)||g(this._key)||!x(this._key))do r=!Xe(i)||Ye(i);while(r&&(i=i.__v_raw));this._shallow=r}get value(){let e=this._object[this._key];return this._shallow&&(e=et(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&w(this._raw[this._key])){let t=this._object[this._key];if(w(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return ke(this._raw,this._key)}},Ut=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new _t(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ht-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&E!==this)return he(this,!0),!0}get value(){let e=this.dep.track();return xe(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}},Wt={},Gt=new WeakMap,Kt=void 0}));function Jt(e,t,n,r){try{return r?e(...r):e()}catch(e){Xt(e,t,n)}}function Yt(e,t,n,r){if(m(e)){let i=Jt(e,t,n,r);return i&&v(i)&&i.catch(e=>{Xt(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(Yt(e[a],t,n,r));return i}}function Xt(e,t,n,r=!0){let i=t?t.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=t&&t.appContext.config||a;if(t){let r=t.parent,i=t.proxy,a=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){let t=r.ec;if(t){for(let n=0;n<t.length;n++)if(t[n](e,i,a)===!1)return}r=r.parent}if(o){we(),Jt(o,null,10,[e,i,a]),Te();return}}Zt(e,n,i,r,s)}function Zt(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}function Qt(e){let t=_n||gn;return e?t.then(this?e.bind(this):e):t}function $t(e){let t=fn+1,n=D.length;for(;t<n;){let r=t+n>>>1,i=D[r],a=vn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function en(e){if(!(e.flags&1)){let t=vn(e),n=D[D.length-1];!n||!(e.flags&2)&&t>=vn(n)?D.push(e):D.splice($t(t),0,e),e.flags|=1,tn()}}function tn(){_n||(_n=gn.then(an))}function nn(e){d(e)?pn.push(...e):mn&&e.id===-1?mn.splice(hn+1,0,e):e.flags&1||(pn.push(e),e.flags|=1),tn()}function rn(e){if(pn.length){let e=[...new Set(pn)].sort((e,t)=>vn(e)-vn(t));if(pn.length=0,mn){mn.push(...e);return}for(mn=e,hn=0;hn<mn.length;hn++){let e=mn[hn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}mn=null,hn=0}}function an(e){try{for(fn=0;fn<D.length;fn++){let e=D[fn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Jt(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;fn<D.length;fn++){let e=D[fn];e&&(e.flags&=-2)}fn=-1,D.length=0,rn(e),_n=null,(D.length||pn.length)&&an(e)}}function on(e,t,n=!1){let r=En();if(r||Cn){let i=Cn?Cn._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&m(t)?t.call(r&&r.proxy):t}}function sn(){return!!(En()||Cn)}function cn(e,t,n){return ln(e,t,n)}function ln(e,t,n=a){let{immediate:r,deep:i,flush:c,once:l}=n,u=s({},n),d=t&&r||!t&&c!==`post`,f;if(kn){if(c===`sync`){let e=xn();f=e.__watcherHandles||(e.__watcherHandles=[])}else if(!d){let e=()=>{};return e.stop=o,e.resume=o,e.pause=o,e}}let p=Tn;u.call=(e,t,n)=>Yt(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{wn(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():en(e)}),u.augmentJob=e=>{t&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=at(e,t,u);return kn&&(f?f.push(h):d&&h()),h}function un(e,t,n=Tn,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...r)=>{we();let i=On(n),a=Yt(t,n,e,r);return i(),Te(),a});return r?i.unshift(a):i.push(a),a}}function dn(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):nn(e)}var D,fn,pn,mn,hn,gn,_n,vn,yn,bn,xn,Sn,Cn,wn,Tn,En,Dn,On,kn,An,jn=e((()=>{qt(),de(),D=[],fn=-1,pn=[],mn=null,hn=0,gn=Promise.resolve(),_n=null,vn=e=>e.id==null?e.flags&2?-1:1/0:e.id,yn=null,bn=Symbol.for(`v-scx`),xn=()=>on(bn),le().requestIdleCallback,le().cancelIdleCallback,Sn=e=>(t,n=Tn)=>{(!kn||e===`sp`)&&un(e,(...e)=>t(...e),n)},Sn(`bm`),Sn(`m`),Sn(`bu`),Sn(`u`),Sn(`bum`),Sn(`um`),Sn(`sp`),Sn(`rtg`),Sn(`rtc`),Cn=null,wn=dn,Tn=null,En=()=>Tn||yn;{let e=le(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};Dn=t(`__VUE_INSTANCE_SETTERS__`,e=>Tn=e),t(`__VUE_SSR_SETTERS__`,e=>kn=e)}On=e=>{let t=Tn;return Dn(e),e.scope.on(),()=>{e.scope.off(),Dn(t)}},kn=!1,An=(e,t)=>rt(e,t,kn)})),Mn=e((()=>{jn(),typeof window<`u`&&window.trustedTypes})),Nn=e((()=>{Mn()}));function Pn(e){return e&&typeof e==`object`&&Object.prototype.toString.call(e)===`[object Object]`&&typeof e.toJSON!=`function`}function Fn(e,{autoBom:t=!1}={}){return t&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([`﻿`,e],{type:e.type}):e}function In(e,t,n){let r=new XMLHttpRequest;r.open(`GET`,e),r.responseType=`blob`,r.onload=function(){ir(r.response,t,n)},r.onerror=function(){console.error(`could not download file`)},r.send()}function Ln(e){let t=new XMLHttpRequest;t.open(`HEAD`,e,!1);try{t.send()}catch{}return t.status>=200&&t.status<=299}function Rn(e){try{e.dispatchEvent(new MouseEvent(`click`))}catch{let t=new MouseEvent(`click`,{bubbles:!0,cancelable:!0,view:window,detail:0,screenX:80,screenY:20,clientX:80,clientY:20,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null});e.dispatchEvent(t)}}function zn(e,t=`download`,n){let r=document.createElement(`a`);r.download=t,r.rel=`noopener`,typeof e==`string`?(r.href=e,r.origin===location.origin?Rn(r):Ln(r.href)?In(e,t,n):(r.target=`_blank`,Rn(r))):(r.href=URL.createObjectURL(e),setTimeout(function(){URL.revokeObjectURL(r.href)},4e4),setTimeout(function(){Rn(r)},0))}function Bn(e,t=`download`,n){if(typeof e==`string`)if(Ln(e))In(e,t,n);else{let t=document.createElement(`a`);t.href=e,t.target=`_blank`,setTimeout(function(){Rn(t)})}else navigator.msSaveOrOpenBlob(Fn(e,n),t)}function Vn(e,t,n,r){if(r=r||open(``,`_blank`),r&&(r.document.title=r.document.body.innerText=`downloading...`),typeof e==`string`)return In(e,t,n);let i=e.type===`application/octet-stream`,a=/constructor/i.test(String(tr.HTMLElement))||`safari`in tr,o=/CriOS\/[\d]+/.test(navigator.userAgent);if((o||i&&a||rr)&&typeof FileReader<`u`){let t=new FileReader;t.onloadend=function(){let e=t.result;if(typeof e!=`string`)throw r=null,Error(`Wrong reader.result type`);e=o?e:e.replace(/^data:[^;]*;/,`data:attachment/file;`),r?r.location.href=e:location.assign(e),r=null},t.readAsDataURL(e)}else{let t=URL.createObjectURL(e);r?r.location.assign(t):location.href=t,r=null,setTimeout(function(){URL.revokeObjectURL(t)},4e4)}}function Hn(){let e=fe(!0),t=e.run(()=>Qe({})),n=[],r=[],i=Ze({install(e){$n(i),i._a=e,e.provide(er,i),e.config.globalProperties.$pinia=i,r.forEach(e=>n.push(e)),r=[]},use(e){return this._a?n.push(e):r.push(e),this},_p:n,_a:null,_e:e,_s:new Map,state:t});return i}function Un(e,t,n,r=or){e.add(t);let i=()=>{e.delete(t)&&r()};return!n&&pe()&&me(i),i}function Wn(e,...t){e.forEach(e=>{e(...t)})}function Gn(e,t){e instanceof Map&&t instanceof Map?t.forEach((t,n)=>e.set(n,t)):e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(let n in t){if(!Object.hasOwn(t,n))continue;let r=t[n],i=e[n];Pn(i)&&Pn(r)&&Object.hasOwn(e,n)&&!w(r)&&!qe(r)?e[n]=Gn(i,r):e[n]=r}return e}function Kn(e){return!e||typeof e!=`object`||!Object.hasOwn(e,ur)}function qn(e){return!!(w(e)&&e.effect)}function Jn(e,t,n,r){let{state:i,actions:a,getters:o}=t,s=n.state.value[e],c;function l(){s||(n.state.value[e]=i?i():{});let t=tt(n.state.value[e]);return dr(t,a,Object.keys(o||{}).reduce((t,r)=>(t[r]=Ze(An(()=>{$n(n);let t=n._s.get(e);return o[r].call(t,t)})),t),{}))}return c=Yn(e,l,t,n,r,!0),c}function Yn(e,t,n={},r,i,a){let o,s=dr({actions:{}},n),c={deep:!0},l,u,d=new Set,f=new Set,p=r.state.value[e];!a&&!p&&(r.state.value[e]={});let m;function h(t){let n;l=u=!1,typeof t==`function`?(t(r.state.value[e]),n={type:`patch function`,storeId:e,events:void 0}):(Gn(r.state.value[e],t),n={type:`patch object`,payload:t,storeId:e,events:void 0});let i=m=Symbol();Qt().then(()=>{m===i&&(l=!0)}),u=!0,Wn(d,n,r.state.value[e])}let g=a?function(){let{state:e}=n,t=e?e():{};this.$patch(e=>{dr(e,t)})}:or;function _(){o.stop(),d.clear(),f.clear(),r._s.delete(e)}let v=(t,n=``)=>{if(cr in t)return t[lr]=n,t;let i=function(){$n(r);let n=Array.from(arguments),a=new Set,o=new Set;function s(e){a.add(e)}function c(e){o.add(e)}Wn(f,{args:n,name:i[lr],store:y,after:s,onError:c});let l;try{l=t.apply(this&&this.$id===e?this:y,n)}catch(e){throw Wn(o,e),e}return l instanceof Promise?l.then(e=>(Wn(a,e),e)).catch(e=>(Wn(o,e),Promise.reject(e))):(Wn(a,l),l)};return i[cr]=!0,i[lr]=n,i},y=We({_p:r,$id:e,$onAction:Un.bind(null,f),$patch:h,$reset:g,$subscribe(t,n={}){if(d.has(t))return or;let i=Un(d,t,n.detached,()=>a()),a=o.run(()=>cn(()=>r.state.value[e],r=>{(n.flush===`sync`?u:l)&&t({storeId:e,type:`direct`,events:void 0},r)},dr({},c,n)));return i},$dispose:_});r._s.set(e,y);let b=(r._a&&r._a.runWithContext||sr)(()=>r._e.run(()=>(o=fe()).run(()=>t({action:v}))));for(let t in b){let n=b[t];w(n)&&!qn(n)||qe(n)?a||(p&&Kn(n)&&(w(n)?n.value=p[t]:Gn(n,p[t])),r.state.value[e][t]=n):typeof n==`function`&&(b[t]=v(n,t),s.actions[t]=n)}return dr(y,b),dr(C(y),b),Object.defineProperty(y,"$state",{get:()=>r.state.value[e],set:e=>{h(t=>{dr(t,e)})}}),r._p.forEach(e=>{let t=o.run(()=>e({store:y,app:r._a,pinia:r,options:s}));dr(y,t)}),p&&a&&n.hydrate&&n.hydrate(y.$state,p),l=!0,u=!0,y}function Xn(e,t,n){let r,i=typeof t==`function`;r=i?n:t;function a(n,a){let o=sn();return n=n||(o?on(er,null):null),n&&$n(n),n=Qn,n._s.has(e)||(i?Yn(e,t,r,n):Jn(e,r,n)),n._s.get(e)}return a.$id=e,a}var Zn,Qn,$n,er,tr,nr,rr,ir,ar,or,sr,cr,lr,ur,dr,fr=e((()=>{Nn(),Zn=typeof window<`u`,$n=e=>Qn=e,er=Symbol(),tr=typeof window==`object`&&window.window===window?window:typeof self==`object`&&self.self===self?self:typeof global==`object`&&global.global===global?global:typeof globalThis==`object`?globalThis:{HTMLElement:null},nr=typeof navigator==`object`?navigator:{userAgent:``},rr=/Macintosh/.test(nr.userAgent)&&/AppleWebKit/.test(nr.userAgent)&&!/Safari/.test(nr.userAgent),ir=Zn?typeof HTMLAnchorElement<`u`&&`download`in HTMLAnchorElement.prototype&&!rr?zn:`msSaveOrOpenBlob`in nr?Bn:Vn:()=>{},{assign:ar}=Object,or=()=>{},sr=e=>e(),cr=Symbol(),lr=Symbol(),ur=Symbol(),{assign:dr}=Object}));function O(e){return(e||0).toLocaleString(`pt-BR`,{style:`currency`,currency:`BRL`})}function k(e){return e?new Date(e).toLocaleDateString(`pt-BR`):`-`}function A(e,t){let n=document.getElementById(`toast`),r=document.getElementById(`toastMsg`);if(!n||!r)return;let i={sucesso:`fa-check-circle`,erro:`fa-times-circle`,aviso:`fa-exclamation-triangle`,info:`fa-info-circle`},a=n.querySelector(`i`);a&&t&&i[t]&&(a.className=`fas `+i[t]),r.textContent=e,n.className=`toast`+(t&&i[t]?` `+t:``),n.classList.add(`mostrar`),clearTimeout(window._toastTimeout),window._toastTimeout=setTimeout(()=>{n.classList.add(`saindo`),setTimeout(()=>{n.classList.remove(`mostrar`,`saindo`)},250)},2800)}function j(e=`Aguarde...`){document.getElementById(`loadingTexto`).textContent=e,document.getElementById(`loadingOverlay`).classList.add(`ativo`)}function M(){document.getElementById(`loadingOverlay`).classList.remove(`ativo`)}function N(e){let t=document.getElementById(`modalCaixa`),n=document.getElementById(`modalOverlay`);t.innerHTML=e,n.classList.add(`aberto`);let r=t.querySelector(`h3`);r&&!r.id&&(r.id=`modalTitulo_`+Date.now()),r&&t.setAttribute(`aria-labelledby`,r.id),document.body.style.overflow=`hidden`}function P(){let e=document.getElementById(`modalOverlay`),t=document.getElementById(`modalCaixa`);e.classList.remove(`aberto`),t.removeAttribute(`aria-labelledby`),document.body.style.overflow=``,setTimeout(()=>{e.classList.contains(`aberto`)||(t.innerHTML=``)},300)}function F(e){return{disponível:`disponivel`,vendida:`vendida`,reservada:`reservada`,"em exposição":`exposicao`,"em exposicao":`exposicao`}[e]||`disponivel`}function pr(e){return{disponível:`Disponível`,vendida:`Vendida`,reservada:`Reservada`,"em exposição":`Em Exposição`,"em exposicao":`Em Exposição`}[e]||`Disponível`}function I(e,t){let n=`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect width="400" height="400" fill="${e}"/>
    <text x="50%" y="50%" font-size="130" text-anchor="middle" dominant-baseline="central">${t}</text>
  </svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(n)}`}function mr(e){let t=new Date,n=[];for(let e=5;e>=0;e--){let r=new Date(t.getFullYear(),t.getMonth()-e,1);n.push({ano:r.getFullYear(),mes:r.getMonth(),rotulo:r.toLocaleDateString(`pt-BR`,{month:`short`}),total:0})}return e.forEach(e=>{let t=new Date(e.dataCadastro||e.criadoEm),r=n.find(e=>e.ano===t.getFullYear()&&e.mes===t.getMonth());r&&r.total++}),n}function hr(e){let t=452/e.length,n=Math.max(1,...e.map(e=>e.total)),r=``;return e.forEach((e,i)=>{let a=e.total/n*132,o=i*t+(t-36)/2,s=152-a;r+=`
      <rect class="barra-grafico" x="${o}" y="${s}" width="36" height="${Math.max(a,2)}" rx="4"></rect>
      <text class="grafico-valor" x="${o+36/2}" y="${s-6}" text-anchor="middle">${e.total}</text>
      <text class="grafico-label" x="${o+36/2}" y="172" text-anchor="middle">${e.rotulo}</text>
    `}),`
    <svg class="grafico-svg" viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gráfico de obras criadas por mês">
      <line x1="0" y1="152" x2="480" y2="152" stroke="var(--border)" stroke-width="1"></line>
      ${r}
    </svg>
  `}function gr(e){if(!e.length)return[];let t={};e.forEach(e=>{e.tecnica&&(t[e.tecnica]=(t[e.tecnica]||0)+1)});let n=e.length;return Object.entries(t).map(([e,t])=>({tecnica:e,quantidade:t,porcentagem:t/n*100})).sort((e,t)=>t.quantidade-e.quantidade).slice(0,5)}function _r(e){if(!e.length)return 0;let t=new Date,n=t.getMonth(),r=t.getFullYear(),i=n===0?11:n-1,a=n===0?r-1:r,o=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===n&&t.getFullYear()===r}).length,s=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===i&&t.getFullYear()===a}).length;return s===0?o>0?100:0:(o-s)/s*100}function vr({titulo:e,subtitulo:t,icone:n,colecao:r,dataStore:i,colunas:a,renderLinha:o,textoBotao:s}){let c=i.listar(r);return`
    <div class="view-cabecalho">
      <div>
        <h2>${e}</h2>
        <p class="subtitulo">${t}</p>
      </div>
      <button class="btn-primario" data-abrir-modal="${r}">✚ ${s}</button>
    </div>
    ${c.length?`
    <div class="tabela-wrapper">
      <table>
        <caption class="sr-only">${e}</caption>
        <thead>
          <tr>${a.map(e=>`<th>${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${c.map(o).join(``)}
        </tbody>
      </table>
    </div>
  `:`
    <div class="tabela-wrapper">
      <div class="estado-vazio">
        <div class="icone-vazio">${n}</div>
        <p>Nenhum registro em "${e}" ainda.</p>
      </div>
    </div>
  `}
  `}function L(e){return e?e.charAt(0).toUpperCase()+e.slice(1):`-`}function yr(e){return{pendente:`pendente`,paga:`paga`,cancelada:`cancelada`,negociacao:`negociacao`,"em negociação":`negociacao`,"em negociações":`negociacao`}[e]||`pendente`}function br(e){return{pendente:`Pendente`,paga:`Paga`,cancelada:`Cancelada`,negociacao:`Negociação`,"em negociação":`Em Negociação`,"em negociações":`Em Negociação`}[e]||e}function xr(e){if(typeof QRCode<`u`){let t=document.createElement(`div`),n=new QRCode(t,{text:e,width:200,height:200,correctLevel:QRCode.CorrectLevel.H}),r=t.querySelector(`canvas`),i=r?r.toDataURL():``;return n.clear(),t.remove(),i}let t=document.createElement(`canvas`);t.width=200,t.height=200;let n=t.getContext(`2d`);return n.fillStyle=`white`,n.fillRect(0,0,200,200),n.fillStyle=`black`,n.font=`14px sans-serif`,n.textAlign=`center`,n.fillText(`QR`,200/2,200/2-10),n.fillText(e.length>20?e.slice(0,20)+`...`:e,200/2,120),t.toDataURL()}function Sr(e,t){return{obras:[{tipo:`text`,nome:`titulo`,rotulo:`Título *`,obrigatorio:!0},{tipo:`select`,nome:`tecnica`,rotulo:`Técnica *`,opcoes:[`óleo`,`aquarela`,`escultura`,`outra`],obrigatorio:!0},{tipo:`number`,nome:`ano`,rotulo:`Ano`},{tipo:`dimensoes`,nome:`dimensoes`,rotulo:`Dimensões (cm)`},{tipo:`textarea`,nome:`descricao`,rotulo:`Descrição`},{tipo:`number`,nome:`preco`,rotulo:`Preço (R$) *`,obrigatorio:!0},{tipo:`select`,nome:`status`,rotulo:`Status`,opcoes:[`disponível`,`reservada`,`vendida`,`em exposição`]},{tipo:`text`,nome:`serie`,rotulo:`Série`},{tipo:`file`,nome:`imagem`,rotulo:`Imagem`}],clientes:[{tipo:`text`,nome:`nome`,rotulo:`Nome *`,obrigatorio:!0},{tipo:`email`,nome:`email`,rotulo:`E-mail`},{tipo:`tel`,nome:`telefone`,rotulo:`Telefone`},{tipo:`text`,nome:`endereco`,rotulo:`Endereço`},{tipo:`textarea`,nome:`notas`,rotulo:`Notas`}],vendas:[{tipo:`select`,nome:`obraId`,rotulo:`Obra *`,opcoes:(t.listar(`obras`)||[]).filter(e=>e.status!==`vendida`).map(e=>({valor:e.id,rotulo:e.titulo})),obrigatorio:!0},{tipo:`select`,nome:`clienteId`,rotulo:`Cliente *`,opcoes:(t.listar(`clientes`)||[]).map(e=>({valor:e.id,rotulo:e.nome})),obrigatorio:!0},{tipo:`number`,nome:`valorTotal`,rotulo:`Valor Total *`,obrigatorio:!0},{tipo:`select`,nome:`formaPagamento`,rotulo:`Forma de Pagamento`,opcoes:[`à vista`,`cartão`,`boleto`,`pix`,`transferência`,`parcelado`]},{tipo:`select`,nome:`status`,rotulo:`Status`,opcoes:[`pendente`,`paga`,`cancelada`,`em negociação`]}],certificados:[{tipo:`select`,nome:`obraId`,rotulo:`Obra *`,opcoes:(t.listar(`obras`)||[]).map(e=>({valor:e.id,rotulo:e.titulo})),obrigatorio:!0},{tipo:`select`,nome:`edicaoTipo`,rotulo:`Tipo de Edição`,opcoes:[`unica`,`edicao_limitada`,`prova_de_artista`,`reproducao`]},{tipo:`text`,nome:`local`,rotulo:`Local de Criação`}]}[e]||[]}function Cr(e){let t=e.obrigatorio?` required`:``;if(e.tipo===`select`){let n=(e.opcoes||[]).map(e=>`<option value="${typeof e==`object`?e.valor:e}">${typeof e==`object`?e.rotulo:e}</option>`).join(``);return`<div class="campo-form"><label>${e.rotulo}</label><select id="campo_${e.nome}" aria-label="${e.rotulo}"${t}>${n}</select></div>`}return e.tipo===`textarea`?`<div class="campo-form"><label>${e.rotulo}</label><textarea id="campo_${e.nome}" aria-label="${e.rotulo}"${t}></textarea></div>`:e.tipo===`dimensoes`?`<div class="campo-form"><label>${e.rotulo}</label><div class="form-linha">
      <input type="number" id="campoAltura" placeholder="Altura" aria-label="Altura">
      <input type="number" id="campoLargura" placeholder="Largura" aria-label="Largura">
      <input type="number" id="campoProfundidade" placeholder="Profundidade" aria-label="Profundidade">
    </div></div>`:e.tipo===`file`?`<div class="campo-form"><label>${e.rotulo}</label><input type="file" id="campo_${e.nome}" accept="image/*" aria-label="${e.rotulo}"${t}></div>`:`<div class="campo-form"><label>${e.rotulo}</label><input type="${e.tipo}" id="campo_${e.nome}" aria-label="${e.rotulo}"${t}></div>`}function wr(e,t,n){let r=Sr(e,t);N(`
    <h3>Novo ${e.charAt(0).toUpperCase()+e.slice(1)}</h3>
    <form id="formGenerico">
      ${r.map(Cr).join(``)}
      <div class="modal-acoes">
        <button type="button" class="btn-secundario" id="btnCancelarGenerico">Cancelar</button>
        <button type="submit" class="btn-primario">Salvar</button>
      </div>
    </form>
  `),document.getElementById(`btnCancelarGenerico`).addEventListener(`click`,P),document.getElementById(`formGenerico`).addEventListener(`submit`,i=>{i.preventDefault();let a={};r.forEach(e=>{e.tipo===`dimensoes`?(a.altura=Number(document.getElementById(`campoAltura`)?.value)||0,a.largura=Number(document.getElementById(`campoLargura`)?.value)||0,a.profundidade=Number(document.getElementById(`campoProfundidade`)?.value)||0):e.tipo===`file`||(a[e.nome]=document.getElementById(`campo_`+e.nome)?.value||``)}),t.adicionar(e,a),A(`${e.charAt(0).toUpperCase()+e.slice(1)} cadastrado com sucesso!`,`sucesso`),P(),n.navegar(e)})}function Tr(e,t=250){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}function Er(e,t,n){if(!e)return;let r=window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,i=Number(t);if(r||isNaN(i)){e.textContent=n?n(i):String(t);return}let a=performance.now(),o=t=>{let r=Math.min((t-a)/800,1),s=1-(1-r)**3,c=i*s;e.textContent=n?n(c):Math.round(c).toLocaleString(`pt-BR`),r<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}function Dr(){let e=typeof window<`u`?window.Chart:null;if(!e)return;let t=getComputedStyle(document.documentElement).getPropertyValue(`--font-principal`).trim()||`'Inter', sans-serif`;e.defaults.font.family=t,e.defaults.font.size=11,e.defaults.color=`rgba(120,120,140,0.8)`,e.defaults.borderColor=`rgba(128,128,128,0.1)`,e.defaults.animation.duration=700,e.defaults.animation.easing=`easeOutQuart`,e.defaults.plugins.tooltip.backgroundColor=`rgba(17,17,27,0.92)`,e.defaults.plugins.tooltip.padding=12,e.defaults.plugins.tooltip.cornerRadius=10,e.defaults.plugins.tooltip.titleFont={family:t,size:12,weight:`600`},e.defaults.plugins.tooltip.bodyFont={family:t,size:12},e.defaults.plugins.tooltip.boxPadding=4,e.defaults.plugins.tooltip.usePointStyle=!0,e.defaults.scales.linear.grid={drawBorder:!1},e.defaults.scales.category.grid={drawBorder:!1}}function R(e,t={}){let{textoConfirmar:n=`Excluir`,titulo:r=`Confirmar`,perigoso:i=!0}=t;return new Promise(t=>{N(`
      <h3>${r}</h3>
      <p style="margin:14px 0;font-size:0.9rem;line-height:1.5;color:var(--text);">${e}</p>
      <div class="modal-acoes">
        <button type="button" class="btn-secundario" id="btnConfirmarCancelar">Cancelar</button>
        <button type="button" class="${i?`btn-danger`:`btn-primario`}" id="btnConfirmarAcao">${n}</button>
      </div>
    `);let a=e=>{document.removeEventListener(`keydown`,o),P(),t(e)},o=e=>{e.key===`Escape`&&a(!1)};document.getElementById(`btnConfirmarCancelar`).addEventListener(`click`,()=>a(!1)),document.getElementById(`btnConfirmarAcao`).addEventListener(`click`,()=>a(!0)),document.addEventListener(`keydown`,o),document.getElementById(`btnConfirmarCancelar`).focus()})}function z(e,t){let n=document.getElementById(`toast`),r=document.getElementById(`toastMsg`);if(!n||!r)return;let i=()=>{n.classList.add(`saindo`),setTimeout(()=>{n.classList.remove(`mostrar`,`saindo`)},250)};clearTimeout(window._toastTimeout),r.innerHTML=`${e} <button class="btn-toast-desfazer" id="btnDesfazerExclusao">Desfazer</button>`,n.className=`toast aviso`,n.classList.add(`mostrar`);let a=setTimeout(i,6e3);window._toastTimeout=a;let o=document.getElementById(`btnDesfazerExclusao`);o&&o.addEventListener(`click`,()=>{clearTimeout(a),window._toastTimeout=null,t(),r.innerHTML=`Item restaurado!`,window._toastTimeout=setTimeout(i,2800)})}function Or(){return Si||(Si=new Promise((e,t)=>{let n=indexedDB.open(yi,bi);n.onupgradeneeded=()=>{let e=n.result;e.objectStoreNames.contains(xi)||e.createObjectStore(xi,{keyPath:`id`})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)}),Si)}function kr(e){let[t,n]=e.split(`,`),r=t&&t.match(/:(.*?);/)?.[1]||`image/jpeg`,i=atob(n),a=new Uint8Array(i.length);for(let e=0;e<i.length;e++)a[e]=i.charCodeAt(e);return new Blob([a],{type:r})}function Ar(e,t,n){return new Promise(r=>{let i=new Image;i.onload=()=>{let e=document.createElement(`canvas`),a=i.width,o=i.height;a>t&&(o=o*t/a,a=t),e.width=a,e.height=o;let s=e.getContext(`2d`);s.imageSmoothingEnabled=!0,s.imageSmoothingQuality=`high`,s.drawImage(i,0,0,a,o),r(e.toDataURL(`image/jpeg`,n))},i.onerror=()=>r(e),i.src=e})}async function jr(e){let t=crypto.randomUUID(),[n,r,i]=await Promise.all([Ar(e,200,.7),Ar(e,600,.75),e]),a=await Or();return await new Promise((e,o)=>{let s=a.transaction(xi,`readwrite`);s.objectStore(xi).put({id:t,thumb:n,medium:r,full:i,criadoEm:new Date().toISOString()}),s.oncomplete=()=>e(),s.onerror=()=>o(s.error)}),Ci.forEach((e,n)=>{n.startsWith(`idb:${t}`)&&(URL.revokeObjectURL(e),Ci.delete(n))}),{id:`idb:${t}`,thumb:`idb:${t}:thumb`,medium:`idb:${t}:medium`,full:`idb:${t}:full`}}async function Mr(e){if(!e||!e.startsWith(`idb:`))return e||``;let t=Ci.get(e);if(t)return t;let n=e.replace(`idb:`,``).split(`:`),r=n[0],i=n[1]||`medium`,a=(await Or()).transaction(xi,`readonly`),o=await new Promise((e,t)=>{let n=a.objectStore(xi).get(r);n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error)});if(!o)return``;let s=o[i]||o.medium||o.full||o.thumb||``;if(!s)return``;let c=kr(s),l=URL.createObjectURL(c);return Ci.set(e,l),l}function Nr(e){let t=Ci.get(e);t&&(URL.revokeObjectURL(t),Ci.delete(e))}function Pr(){Ci.forEach(e=>URL.revokeObjectURL(e)),Ci.clear()}async function Fr(e){let t=e.replace(`idb:`,``).replace(/:(thumb|medium|full)$/,``),n=await Or();await new Promise((e,r)=>{let i=n.transaction(xi,`readwrite`);i.objectStore(xi).delete(t),i.oncomplete=()=>e(),i.onerror=()=>r(i.error)}),Nr(e)}async function Ir(e,t){let n=0;for(let t of e){let e=new Set;if(t.imagem&&!t.imagem.startsWith(`idb:`)&&e.add(t.imagem),t.imagemDestacada&&!t.imagemDestacada.startsWith(`idb:`)&&e.add(t.imagemDestacada),t.imagens&&t.imagens.forEach(t=>{t&&!t.startsWith(`idb:`)&&e.add(t)}),e.size===0)continue;let r=new Map;for(let t of e)if(t.startsWith(`data:`)){let e=await jr(t);r.set(t,e.medium)}r.size!==0&&(t.imagem&&r.has(t.imagem)&&(t.imagem=r.get(t.imagem)),t.imagemDestacada&&r.has(t.imagemDestacada)&&(t.imagemDestacada=r.get(t.imagemDestacada)),t.imagens&&(t.imagens=t.imagens.map(e=>r.get(e)||e)),n+=r.size)}if(t)for(let e of t){if(!e.imagens||e.imagens.length===0)continue;let t=e.imagens.filter(e=>e&&!e.startsWith(`idb:`)&&e.startsWith(`data:`));if(t.length!==0)for(let r of t){let t=await jr(r),i=e.imagens.indexOf(r);i>=0&&(e.imagens[i]=t.medium),n++}}return n}function Lr(e){if(wi.has(e))return wi.get(e);let t=new Promise((t,n)=>{if(typeof document>`u`){t();return}let r=document.createElement(`script`);r.src=e,r.onload=()=>t(),r.onerror=()=>n(Error(`Falha ao carregar: ${e}`)),document.head.appendChild(r)});return wi.set(e,t),t}function Rr(){return Lr(`https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js`)}function zr(){return Lr(`https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js`)}function Br(){try{return JSON.parse(sessionStorage.getItem(Ti)||`{}`)}catch{return{}}}function Vr(e){let t={};Ei.forEach(n=>{let r=e[n];typeof r==`string`&&r&&(t[n]=r)});try{Object.keys(t).length?sessionStorage.setItem(Ti,JSON.stringify(t)):sessionStorage.removeItem(Ti)}catch{}}function Hr(e){let t=structuredClone(e);return t.config&&Ei.forEach(e=>{delete t.config[e]}),t}async function Ur(e){let t=new TextEncoder().encode(e+Di),n=await crypto.subtle.digest(`SHA-256`,t);return Array.from(new Uint8Array(n)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}async function Wr(e){return Ur(e)}async function Gr(e,t){return!e||!t?!1:await Ur(e)===t}function Kr(e){return/^[a-f0-9]{64}$/.test(e)}function qr(e){let t=e.schemaVersion||1,n=!1;for(let r of Oi)r.version>t&&(r.up(e),e.schemaVersion=r.version,n=!0);return n}function Jr(){let e=document.querySelector(`meta[name="theme-color"]`);if(!e)return;let t=getComputedStyle(document.body).getPropertyValue(`--sidebar-bg`).trim();t&&e.setAttribute(`content`,t)}function Yr(e,t=0){return $i||($i=new Qi),$i.open(e,t),$i}function Xr(){let e=document.createElement(`div`);e.className=`spotlight-overlay`,e.innerHTML=`<div class="spotlight-box"><input class="spotlight-input" placeholder="Buscar obras, clientes, vendas..." autofocus><div class="spotlight-results"></div><div class="spotlight-footer"><span>⬆⬇ Navegar</span><span>⏎ Abrir</span><span>ESC Fechar</span></div></div>`,document.body.appendChild(e);let t=e.querySelector(`.spotlight-input`),n=e.querySelector(`.spotlight-results`),r=-1;function i(e){if(e)try{let t=JSON.parse(localStorage.getItem(`atelier_spotlight_hist`)||`[]`);t=[e,...t.filter(t=>t!==e)].slice(0,5),localStorage.setItem(`atelier_spotlight_hist`,JSON.stringify(t))}catch(e){console.warn(e)}}function a(){n.querySelectorAll(`.spotlight-item`).forEach((e,t)=>{e.classList.toggle(`destaque`,t===r),t===r&&e.scrollIntoView({block:`nearest`})})}function o(n){if(!n)return;let r=n.dataset.rota,a=n.dataset.payload;e.remove(),r===`catalogo`&&a?(i(t.value),X?.navegar(`catalogo`)):r&&(i(t.value),X?.navegar(r))}function s(e,t){return`<div class="sp-secao"><span>${t}</span> ${e}</div>`}let c=Tr(e=>{if(r=-1,!e){try{let e=JSON.parse(localStorage.getItem(`atelier_spotlight_hist`)||`[]`);if(e.length>0){n.innerHTML=s(`Recentes`,`🕐`)+e.map(e=>`<div class="spotlight-item sp-historico" data-termo="${e}"><span class="si-icone">🕐</span><span>${e}</span><span class="si-info">busca recente</span></div>`).join(``),n.querySelectorAll(`.sp-historico`).forEach(e=>e.addEventListener(`click`,()=>{t.value=e.dataset.termo,c(e.dataset.termo)}));return}}catch(e){console.warn(e)}n.innerHTML=`<div class="spotlight-item" style="color:var(--text-muted);justify-content:center;">Digite para buscar em todo o sistema...</div>`;return}let i=e.toLowerCase(),a=(Y?.listar(`obras`)||[]).filter(e=>(e.titulo||``).toLowerCase().includes(i)||(e.descricao||``).toLowerCase().includes(i)||(e.tecnica||``).toLowerCase().includes(i)||(e.serie||``).toLowerCase().includes(i)).slice(0,5),l=(Y?.listar(`clientes`)||[]).filter(e=>(e.nome||``).toLowerCase().includes(i)||(e.email||``).toLowerCase().includes(i)).slice(0,5),u=(Y?.listar(`vendas`)||[]).filter(e=>(e.numeroRecibo||``).toLowerCase().includes(i)||(e.clienteNome||``).toLowerCase().includes(i)).slice(0,5),d=(Y?.listar(`contatosProfissionais`)||[]).filter(e=>(e.nome||``).toLowerCase().includes(i)||(e.instituicao||``).toLowerCase().includes(i)).slice(0,5),f=(Y?.listar(`encomendas`)||[]).filter(e=>(e.cliente||``).toLowerCase().includes(i)||(e.descricao||``).toLowerCase().includes(i)).slice(0,5),p=(Y?.listar(`eventos`)||[]).filter(e=>(e.nome||``).toLowerCase().includes(i)).slice(0,5),m=``;a.length&&(m+=s(`Obras`,`<i class="fas fa-images"></i>`)+a.map(e=>`<div class="spotlight-item" data-rota="catalogo" data-payload="${B(e.id)}"><span class="si-icone" style="background-image:url('${di(e.imagem||``)}');background-size:cover;width:28px;height:28px;border-radius:4px;"></span><span>${B(e.titulo)}</span><span class="si-info">${B(e.tecnica||``)} · ${O(e.preco)}</span></div>`).join(``)),l.length&&(m+=s(`Clientes`,`<i class="fas fa-user"></i>`)+l.map(e=>`<div class="spotlight-item" data-rota="clientes"><span class="si-icone"><i class="fas fa-user"></i></span><span>${B(e.nome)}</span><span class="si-info">${B(e.email||``)}</span></div>`).join(``)),u.length&&(m+=s(`Vendas`,`<i class="fas fa-dollar-sign"></i>`)+u.map(e=>`<div class="spotlight-item" data-rota="vendas"><span class="si-icone"><i class="fas fa-dollar-sign"></i></span><span>Recibo ${B(e.numeroRecibo||``)}</span><span class="si-info">${O(e.valorTotal||e.valor)}</span></div>`).join(``)),d.length&&(m+=s(`Contatos`,`🤝`)+d.map(e=>`<div class="spotlight-item" data-rota="rede"><span class="si-icone">🤝</span><span>${B(e.nome)}</span><span class="si-info">${B(e.instituicao||``)}</span></div>`).join(``)),f.length&&(m+=s(`Encomendas`,`<i class="fas fa-box"></i>`)+f.map(e=>`<div class="spotlight-item" data-rota="encomendas"><span class="si-icone"><i class="fas fa-box"></i></span><span>${B(e.cliente||e.clienteNome||``)}</span><span class="si-info">${B(e.descricao?e.descricao.slice(0,40):``)}</span></div>`).join(``)),p.length&&(m+=s(`Eventos`,`🎪`)+p.map(e=>`<div class="spotlight-item" data-rota="exposicoes"><span class="si-icone">🎪</span><span>${B(e.nome)}</span><span class="si-info">${B(e.tipo||``)}</span></div>`).join(``)),n.innerHTML=m||`<div class="spotlight-item" style="color:var(--text-muted);justify-content:center;">Nenhum resultado encontrado.</div>`,n.querySelectorAll(`.spotlight-item`).forEach(e=>{e.addEventListener(`click`,()=>o(e))})},150);t.addEventListener(`input`,()=>c(t.value)),t.addEventListener(`keydown`,e=>{let t=n.querySelectorAll(`.spotlight-item:not(.sp-secao)`);e.key===`ArrowDown`?(e.preventDefault(),r=Math.min(t.length-1,r+1),a()):e.key===`ArrowUp`?(e.preventDefault(),r=Math.max(-1,r-1),a()):e.key===`Enter`&&r>=0&&t[r]?o(t[r]):e.key===`Enter`&&t.length===1&&o(t[0])}),e.addEventListener(`click`,t=>{t.target===e&&e.remove()}),setTimeout(()=>t.focus(),50)}function Zr(){let e=document.createElement(`canvas`);e.className=`confetti-canvas`,document.body.appendChild(e);let t=e.getContext(`2d`);e.width=window.innerWidth,e.height=window.innerHeight;let n=Array.from({length:80},()=>({x:e.width/2+(Math.random()-.5)*200,y:e.height/2,vx:(Math.random()-.5)*8,vy:-Math.random()*10-4,size:Math.random()*6+3,color:[`#ff0`,`#f0f`,`#0ff`,`#f00`,`#0f0`,`#00f`,`#ffa500`,`#ff69b4`][Math.floor(Math.random()*8)],rotation:Math.random()*360,rotSpeed:(Math.random()-.5)*10,gravity:.2+Math.random()*.1})),r=0,i=()=>{r++,t.clearRect(0,0,e.width,e.height),n.forEach(e=>{e.x+=e.vx,e.y+=e.vy,e.vy+=e.gravity,e.rotation+=e.rotSpeed,t.save(),t.translate(e.x,e.y),t.rotate(e.rotation*Math.PI/180),t.fillStyle=e.color,t.fillRect(-e.size/2,-e.size/4,e.size,e.size/2),t.restore()}),r<90?requestAnimationFrame(i):e.remove()};i()}function Qr(){new MutationObserver(()=>{document.querySelector(`.toast`)?.textContent?.includes(`Venda registrada`)&&Zr()}).observe(document.getElementById(`toast`),{childList:!0,subtree:!0,characterData:!0})}function $r(){if(Y?.dados?.config?.tourCompleted)return;let e=0;function t(){let r=pa[e],i=document.querySelector(r.alvo);if(!i){e++,e<pa.length?t():n();return}document.querySelectorAll(`.tour-highlight`).forEach(e=>e.classList.remove(`tour-highlight`)),document.querySelectorAll(`.tour-tooltip`).forEach(e=>e.remove()),i.classList.add(`tour-highlight`);let a=i.getBoundingClientRect(),o=document.createElement(`div`);o.className=`tour-tooltip`;let s,c;r.pos===`right`?(c=a.right+12,s=a.top):(r.pos,c=a.left,s=a.bottom+12),c+320>window.innerWidth&&(c=window.innerWidth-340),s<10&&(s=10),o.style.left=c+`px`,o.style.top=s+`px`;let l=e===pa.length-1;o.innerHTML=`<div class="tt-titulo">${r.titulo}</div><div class="tt-desc">${r.desc}</div><div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">${e+1} de ${pa.length}</div><div class="tt-acoes"><button class="tt-btn-skip" id="tourSkip">Pular</button>${e>0?`<button class="tt-btn-prev" id="tourPrev">← Anterior</button>`:``}<button class="tt-btn-next" id="tourNext">${l?`<i class="fas fa-check"></i> Finalizar`:`Próximo →`}</button></div>`,document.body.appendChild(o),document.getElementById(`tourNext`)?.addEventListener(`click`,()=>{l?n():(e++,t())}),document.getElementById(`tourPrev`)?.addEventListener(`click`,()=>{e--,t()}),document.getElementById(`tourSkip`)?.addEventListener(`click`,n)}function n(){document.querySelectorAll(`.tour-highlight`).forEach(e=>e.classList.remove(`tour-highlight`)),document.querySelectorAll(`.tour-tooltip`).forEach(e=>e.remove()),Y&&(Y.dados.config.tourCompleted=!0,Y.salvar())}setTimeout(t,600)}function ei(){if(!Y?.dados?.config?.autoLock||!Y?.dados?.config?.pin)return;let e=()=>{ha||(clearTimeout(ma),ma=setTimeout(()=>ti(),600*1e3))};[`click`,`keydown`,`mousemove`,`touchstart`].forEach(t=>document.addEventListener(t,e)),e()}function ti(){if(ha)return;ha=!0;let e=Y.dados.config.pin;if(!e)return;let t=0;function n(){let n=``,r=()=>{N(`<h3><i class="fas fa-lock"></i> Tela Bloqueada</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px;">Digite seu PIN de 4 dígitos para continuar</p><div class="pin-display">${`•`.repeat(n.length).padEnd(4,`_`)}</div>${t>0?`<p style="color:#ef4444;font-size:0.8rem;">PIN incorreto. Tente novamente.</p>`:``}<div class="pin-pad">${[1,2,3,4,5,6,7,8,9,``,0,`⌫`].map(e=>e===``?`<button disabled></button>`:`<button data-val="${e}">${e}</button>`).join(``)}</div><div class="modal-acoes"><button class="btn-secundario" id="btnSairPin">Sair</button></div>`),document.querySelectorAll(`.pin-pad button[data-val]`).forEach(i=>{i.addEventListener(`click`,async()=>{if(i.dataset.val===`⌫`){n=n.slice(0,-1),r();return}n.length>=4||(n+=i.dataset.val,n.length===4?await Gr(n,e)?(ha=!1,P(),A(`Bem-vindo de volta!`,`sucesso`),ei()):(t++,n=``,r()):r())})}),document.getElementById(`btnSairPin`)?.addEventListener(`click`,()=>{P()}),document.getElementById(`btnCancelarModal`)?.addEventListener(`click`,P)};r()}n()}function ni(){let e={};try{e=JSON.parse(localStorage.getItem(`atelier_atalhos`)||`{}`)}catch(e){console.warn(e)}let t=[];for(let[n,r]of Object.entries(ga)){let i=e[n]||n,a=i.startsWith(`ctrl+`),o=a?i.slice(5):i;t.push({key:o,ctrl:a,desc:r.desc,acao:r.acao,chave:n})}return t}function ri(){_a=ni()}function ii(){document.addEventListener(`keydown`,e=>{if([`INPUT`,`TEXTAREA`,`SELECT`].includes(e.target.tagName)&&e.key!==`Escape`)return;let t=e.ctrlKey||e.metaKey;for(let n of _a)if(n.key===e.key&&(!n.ctrl||t)){e.preventDefault(),n.acao();return}e.key===`Escape`&&(document.querySelector(`.spotlight-overlay`)&&document.querySelector(`.spotlight-overlay`).remove(),P())})}function ai(){N(`<h3>⌨️ Atalhos de Teclado</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:16px;">Use estes atalhos para navegar rapidamente pelo sistema.</p>${Object.entries({Navegação:[`d`,`g`,`p`,`a`,`f`,`r`,`j`],Criação:[`n`,`v`,`c`],Dados:[`b`,`s`],Ajuda:[`/`,`?`,`k`,`Escape`]}).map(([e,t])=>`<div class="sc-categoria"><h4>${e}</h4><div class="shortcuts-grid">${_a.filter(e=>t.includes(e.key)).map(e=>{let t=e.ctrl?`<span class="sc-key">${navigator.platform?.includes(`Mac`)?`⌘`:`Ctrl`}</span><span class="sc-key">${e.key.toUpperCase()}</span>`:`<span class="sc-key">${e.key}</span>`;return`<div class="sc-item"><span>${e.desc}</span><span>${t}</span></div>`}).join(``)}</div></div>`).join(``)}<div class="modal-acoes" style="margin-top:16px;"><button class="btn-secundario" id="btnPersonalizarAtalhos"><i class="fas fa-pen"></i> Personalizar</button><button class="btn-secundario" id="btnCancelarModal">Fechar</button></div>`),document.getElementById(`btnCancelarModal`)?.addEventListener(`click`,P),document.getElementById(`btnPersonalizarAtalhos`)?.addEventListener(`click`,()=>{P(),setTimeout(oi,300)})}function oi(){N(`<h3>⌨️ Personalizar Atalhos</h3><p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Clique no botão ao lado do atalho e pressione a nova combinação de teclas. Ctrl+Letra ou apenas uma tecla.</p><div class="sc-edit-lista">${_a.filter(e=>e.chave).map(e=>{let t=(e.ctrl?`Ctrl+`:``)+e.key;return`<div class="sc-edit-item"><span class="sc-edit-desc">${e.desc}</span><input class="sc-edit-input" data-chave="${e.chave}" value="${t}" readonly><button class="btn-pequeno sc-edit-btn" data-chave="${e.chave}"><i class="fas fa-sync"></i></button></div>`}).join(``)}</div><div class="modal-acoes" style="margin-top:16px;"><button class="btn-secundario" id="btnResetarAtalhos"><i class="fas fa-undo"></i> Restaurar Padrões</button><button class="btn-primario" id="btnSalvarAtalhos"><i class="fas fa-save"></i> Salvar</button></div>`);let e=null;document.querySelectorAll(`.sc-edit-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.chave;if(e===n){e=null,t.innerHTML=`<i class="fas fa-sync"></i>`;return}e=n,t.innerHTML=`...`;let r=document.querySelector(`.sc-edit-input[data-chave="${n}"]`);r&&(r.value=`Pressione uma tecla...`,r.focus())})}),document.addEventListener(`keydown`,function(t){if(!e)return;t.preventDefault();let n=document.querySelector(`.sc-edit-input[data-chave="${e}"]`),r=document.querySelector(`.sc-edit-btn[data-chave="${e}"]`);n&&(n.value=t.ctrlKey||t.metaKey?`Ctrl+`+t.key.toLowerCase():t.key,n.dataset.novo=n.value),r&&(r.innerHTML=`<i class="fas fa-check" style="color:#22c55e"></i>`),e=null}),document.getElementById(`btnResetarAtalhos`)?.addEventListener(`click`,()=>{localStorage.removeItem(`atelier_atalhos`),ri(),A(`Atalhos restaurados!`,`sucesso`),P()}),document.getElementById(`btnSalvarAtalhos`)?.addEventListener(`click`,()=>{let e={};document.querySelectorAll(`.sc-edit-input`).forEach(t=>{let n=t.dataset.novo;n&&n!==t.value&&t.dataset.chave&&(e[t.dataset.chave]=n)}),localStorage.setItem(`atelier_atalhos`,JSON.stringify(e)),ri(),A(`Atalhos personalizados salvos!`,`sucesso`),P()})}function si(){let e=document.getElementById(`fabMain`),t=document.getElementById(`fabSpeedial`),n=document.getElementById(`fabBackdrop`);if(!e)return;function r(){e.classList.remove(`ativo`),t.classList.remove(`visivel`),n.classList.remove(`visivel`)}function i(){let r=e.classList.toggle(`ativo`);t.classList.toggle(`visivel`,r),n.classList.toggle(`visivel`,r)}e.addEventListener(`click`,i),n.addEventListener(`click`,r);let a={obra:()=>{X?.navegar(`catalogo`),setTimeout(()=>Z.emitir(`abrir-nova-obra`),200)},venda:()=>{X?.navegar(`vendas`),setTimeout(()=>Z.emitir(`abrir-nova-venda`),200)},cliente:()=>{X?.navegar(`clientes`),setTimeout(()=>Z.emitir(`abrir-novo-cliente`),200)},encomenda:()=>{X?.navegar(`encomendas`)},contato:()=>{X?.navegar(`rede`)},evento:()=>{X?.navegar(`exposicoes`)}};document.querySelectorAll(`[data-fab]`).forEach(e=>{e.addEventListener(`click`,()=>{r();let t=e.dataset.fab;a[t]&&a[t]()})}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&t?.classList.contains(`visivel`)&&r()})}function ci(){let e=document.getElementById(`btnNotificacoes`),t=document.getElementById(`notifPanel`),n=document.getElementById(`notifLista`),r=document.getElementById(`notifBadge`);if(!e||!t)return;function i(){try{return JSON.parse(localStorage.getItem(`atelier-notif-lidas`)||`[]`)}catch{return[]}}function a(e){localStorage.setItem(`atelier-notif-lidas`,JSON.stringify(e))}function o(){let e=i(),t=Q.obterRecentes(20).filter(t=>!e.includes(t.id)).length;t>0?(r.textContent=t>99?`99+`:String(t),r.style.display=`flex`):r.style.display=`none`}function s(){let e=i(),t=Q.obterRecentes(20);if(t.length===0){n.innerHTML=`<div class="notif-vazio"><i class="fas fa-bell"></i> Nenhuma notificação ainda.</div>`;return}n.innerHTML=t.map(t=>`
      <div class="notif-item ${e.includes(t.id)?``:`ni-nao-lida`}" data-id="${t.id}">
        <span class="ni-icone">${Q.obterIcone(t.tipo)}</span>
        <div class="ni-conteudo">
          <div class="ni-titulo">${B(t.titulo)}</div>
          <div class="ni-detalhes">${B(t.detalhes||``)}</div>
          <div class="ni-tempo">${Q.formatarTempo(new Date(t.timestamp))}</div>
        </div>
        <button class="ni-marcar" data-id="${t.id}" title="Marcar como lida">✓</button>
      </div>
    `).join(``),n.querySelectorAll(`.ni-marcar`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id,r=i();r.includes(n)||(r.push(n),a(r)),s(),o()})})}e.addEventListener(`click`,e=>{e.stopPropagation(),t.classList.toggle(`visivel`),t.classList.contains(`visivel`)&&s()}),document.addEventListener(`click`,n=>{!t.contains(n.target)&&n.target!==e&&!e.contains(n.target)&&t.classList.remove(`visivel`)}),document.getElementById(`notifMarcarLidas`)?.addEventListener(`click`,()=>{a(Q.obterRecentes(20).map(e=>e.id)),s(),o()}),document.getElementById(`notifLimpar`)?.addEventListener(`click`,()=>{Q.limpar(),a([]),s(),o()}),Z?.on(`nova-atividade`,()=>{o()}),o()}function li(){let e=document.getElementById(`globalDropOverlay`);e||(e=document.createElement(`div`),e.id=`globalDropOverlay`,e.className=`global-drop-overlay`,e.innerHTML=`<div class="gdo-content"><div class="gdo-icon"><i class="fas fa-camera"></i></div><div class="gdo-text">Solte para adicionar imagens</div><div class="gdo-hint">JPG · PNG — Múltiplos arquivos</div></div>`,document.body.appendChild(e));let t=0;document.addEventListener(`dragenter`,n=>{n.dataTransfer.types?.includes(`Files`)&&(clearTimeout(t),e.classList.add(`gdo-visivel`))}),document.addEventListener(`dragover`,e=>{e.dataTransfer.types?.includes(`Files`)&&e.preventDefault()}),document.addEventListener(`dragleave`,n=>{n.relatedTarget&&e.contains(n.relatedTarget)||(clearTimeout(t),t=setTimeout(()=>e.classList.remove(`gdo-visivel`),100))}),document.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`gdo-visivel`);let n=t.dataTransfer.files;if(!n||n.length===0)return;let r=Array.from(n).filter(e=>e.type.startsWith(`image/`));if(r.length===0){A(`<i class="fas fa-exclamation-triangle"></i> Apenas imagens (JPG/PNG) são suportadas.`,`erro`);return}r.length===1?(X?.navegar(`catalogo`),setTimeout(()=>Z.emitir(`abrir-nova-obra`),300)):(X?.navegar(`catalogo`),setTimeout(()=>{Sa&&typeof Sa.abrirImportacaoLote==`function`&&Sa.abrirImportacaoLote()},400))})}function ui(e){let t=e.listar(`obras`),n=e.listar(`vendas`);e.listar(`clientes`);let r=t.filter(e=>e.status===`vendida`),i=t.filter(e=>e.status!==`vendida`),a=i.reduce((e,t)=>e+(Number(t.preco)||0),0),o=n.reduce((e,t)=>e+(Number(t.valor)||0),0),s=hr(mr(t)),c=gr(t),l=n.length>0?o/n.length:0,u=_r(t),d=t.filter(e=>e.favorita).length,f=[...t].sort((e,t)=>new Date(t.dataCadastro||t.criadoEm)-new Date(e.dataCadastro||e.criadoEm)).slice(0,5),p=f.length?f.map(e=>`
    <li class="item-obra-recente">
      <div class="thumb-obra">${e.imagem?`<img src="${di(e.imagem)}" alt="${B(e.titulo)}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`:e.emoji||`<i class="fas fa-images"></i>`}</div>
      <div class="info-obra-recente">
        <div class="nome">${B(e.titulo)}</div>
        <div class="meta">${B(e.tecnica||``)} · ${k(e.dataCadastro||e.criadoEm)}</div>
      </div>
      <span class="tag-status ${F(e.status)}">${pr(e.status)}</span>
    </li>
  `).join(``):`<div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-images"></i></div><p>Nenhuma obra cadastrada ainda. Clique em "Nova Obra" para começar.</p></div>`;return`
    <div class="view-cabecalho">
      <div>
        <h2>Dashboard</h2>
        <p class="subtitulo">Visão geral do seu ateliê · ${new Date().toLocaleDateString(`pt-BR`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})}</p>
      </div>
      <div class="dashboard-acoes">
        <button class="btn-secundario" id="btnAtualizarDashboard" title="Atualizar dados"><i class="fas fa-sync"></i></button>
      </div>
    </div>
    <div class="grid-cards stagger-in">
      <div class="card card-destaque"><div class="rotulo-card">Total de Obras</div><div class="valor-card">${t.length}</div><div class="card-tendencia ${u>=0?`positiva`:`negativa`}">${u>=0?`↑`:`↓`} ${Math.abs(u).toFixed(1)}% este mês</div></div>
      <div class="card"><div class="rotulo-card">Obras Vendidas</div><div class="valor-card">${r.length}</div><div class="card-sub">${t.length>0?(r.length/t.length*100).toFixed(1):0}% do total</div></div>
      <div class="card"><div class="rotulo-card">Em Estoque</div><div class="valor-card">${i.length}</div><div class="card-sub">${t.length>0?(i.length/t.length*100).toFixed(1):0}% disponível</div></div>
      <div class="card card-valor"><div class="rotulo-card">Valor do Acervo</div><div class="valor-card">${O(a)}</div><div class="card-sub">Ticket médio: ${O(l)}</div></div>
      <div class="card"><div class="rotulo-card">Total Vendido</div><div class="valor-card">${O(o)}</div><div class="card-sub">${n.length} venda${n.length===1?``:`s`}</div></div>
      <div class="card"><div class="rotulo-card">Favoritas</div><div class="valor-card">${d}</div><div class="card-sub"><i class="fas fa-star"></i> Obras marcadas</div></div>
    </div>
    <div class="grid-painel">
      <div class="painel"><h3><i class="fas fa-chart-bar"></i> Produtividade Mensal</h3><div class="grafico-container">${s}</div><div class="grafico-legenda"><span class="leg-item"><i class="fas fa-chart-bar"></i> Obras criadas por mês</span></div></div>
      <div class="painel"><h3><i class="fas fa-palette"></i> Técnicas Mais Usadas</h3><div class="tecnicas-container">${c.length>0?c.map((e,t)=>`<div class="barra-tecnica"><div class="tecnica-nome">${L(e.tecnica)}</div><div class="tecnica-barra-wrapper"><div class="tecnica-barra" style="width: ${e.porcentagem}%"></div></div><div class="tecnica-valor">${e.quantidade} (${e.porcentagem.toFixed(0)}%)</div></div>`).join(``):`<div class="estado-vazio"><p>Sem dados suficientes</p></div>`}</div></div>
    </div>
    <div class="grid-painel">
      <div class="painel"><h3>🕐 Obras mais recentes</h3><ul class="lista-obras-recentes stagger-in">${p}</ul></div>
      <div class="painel"><h3><i class="fas fa-clipboard"></i> Atividades Recentes</h3><div class="activity-feed">${Q.obterRecentes(5).length>0?Q.obterRecentes(5).map(e=>`<div class="activity-item"><div class="activity-icone">${Q.obterIcone(e.tipo)}</div><div class="activity-detalhes"><div class="activity-titulo">${B(e.titulo)} <span class="activity-badge ${B(e.badge)}">${B(e.badge)}</span></div><div class="activity-tempo">${Q.formatarTempo(new Date(e.timestamp))}</div></div></div>`).join(``):`<div class="estado-vazio"><p>Nenhuma atividade registrada ainda.</p></div>`}</div></div>
    </div>
    <div class="painel"><h3>⚡ Atalhos rápidos</h3><div class="atalhos-rapidos"><button class="btn-primario" id="btnAtalhoNovaObra">✚ Nova Obra</button><button class="btn-secundario" id="btnAtalhoVenda">✚ Nova Venda</button><button class="btn-secundario" id="btnAtalhoRecibo">🧾 Gerar Recibo</button><button class="btn-secundario" id="btnAtalhoClientes"><i class="fas fa-user"></i> Gerenciar Clientes</button></div></div>
  `}function B(e){if(!e)return``;let t=document.createElement(`div`);return t.textContent=e,t.innerHTML.replace(/"/g,`&quot;`).replace(/'/g,`&#x27;`)}function di(e){if(!e)return``;let t=String(e).trim();try{let e=new URL(t,window.location.origin);return[`http:`,`https:`,`mailto:`].includes(e.protocol)||/^data:image\/(png|jpe?g|webp|gif|svg\+xml);/i.test(t)?t:``}catch{return``}}function fi(e){if(!e)return``;let t=/<\/?(p|br|strong|em|b|i|u|ul|ol|li|span|div)(\s[^>]*)?>/gi,n={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#x27;`},r=0,i=[];for(let a;(a=t.exec(e))!==null;){let o=e.slice(r,a.index);o&&i.push(o.replace(/[&<>"']/g,e=>n[e]));let s=a[0],c=a[1],l=a[2];s[1]===`/`||!l||!l.trim()?i.push(s):i.push(`<${c}>`),r=t.lastIndex}let a=e.slice(r);return a&&i.push(a.replace(/[&<>"']/g,e=>n[e])),i.join(``)}function pi(){if(!(`IntersectionObserver`in window))return;let e=new IntersectionObserver(t=>{t.forEach(t=>{if(t.isIntersecting){let n=t.target;n.src=n.dataset.src||n.src,n.classList.add(`carregado`),e.unobserve(n)}})},{rootMargin:`200px`});document.querySelectorAll(`.lazy-img:not(.carregado)`).forEach(t=>e.observe(t))}function mi(e){(e||document).querySelectorAll(`img[data-img-idb]`).forEach(async e=>{let t=e.dataset.imgIdb;if(!(!t||e.dataset.idbResolvido)){e.dataset.idbResolvido=`1`;try{let n=await imageStore.carregar(t);n&&(e.src=n,e.classList.remove(`idb-placeholder`),e.classList.add(`carregado`))}catch(e){console.warn(`Erro ao carregar imagem IDB:`,e)}}})}function hi(e,t){let n=new Blob([e],{type:`text/html;charset=utf-8`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),setTimeout(()=>URL.revokeObjectURL(r),5e3)}function gi(e){return`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Portal do Cliente</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#f8f6f2;--card:#fff;--text:#1a1a2e;--text-sec:#4a4a5a;--text-mu:#9a9aae;--border:#e2ddd4;--radius:14px;--accent:#8b5cf6}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.5}
.container{max-width:720px;margin:0 auto;padding:20px 16px}.card{background:var(--card);border-radius:var(--radius);padding:20px;margin-bottom:16px;border:1px solid var(--border)}
.card h2{font-size:1rem;margin-bottom:12px}.card h2 i{color:var(--accent);margin-right:6px}
.ph{text-align:center;padding:32px 0 24px}.ph h1{font-size:1.6rem}.ph .artista{color:var(--text-mu);font-size:0.9rem}
.sb{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:0.85rem;font-weight:600}
.sg{display:flex;gap:4px;margin:16px 0}.si{flex:1;text-align:center}
.sd{width:28px;height:28px;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;border:2px solid var(--border);background:var(--card);color:var(--text-mu)}
.sd.active{border-color:var(--accent);background:var(--accent);color:#fff}.sd.done{border-color:#16a34a;background:#16a34a;color:#fff}
.sl{font-size:0.65rem;color:var(--text-mu);line-height:1.2}.sl.active{color:var(--text);font-weight:600}
.pt{height:4px;background:var(--border);border-radius:2px;margin:0 14px 12px}.pf{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--accent),#16a34a);transition:width 0.6s ease}
.ig{display:grid;grid-template-columns:1fr 1fr;gap:12px}.il{font-size:0.7rem;color:var(--text-mu);text-transform:uppercase;letter-spacing:0.5px}.iv{font-size:0.95rem;font-weight:600;margin-top:2px}
.gg{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px}
.gi{aspect-ratio:1;border-radius:8px;overflow:hidden;cursor:pointer;position:relative}
.gi img{width:100%;height:100%;object-fit:cover}.gl{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.6));color:#fff;font-size:0.6rem;padding:4px 6px;text-align:center}
.tl{position:relative;padding-left:28px}.tl::before{content:'';position:absolute;left:10px;top:6px;bottom:6px;width:2px;background:var(--border)}
.ti{position:relative;margin-bottom:18px}.td{position:absolute;left:-22px;top:4px;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.5rem}
.ts{font-weight:600;font-size:0.85rem}.tm{font-size:0.82rem;color:var(--text-sec)}.tda{font-size:0.7rem;color:var(--text-mu)}
.cc{text-align:center}.cr{margin:4px 0;font-size:0.85rem}.cr i{width:20px;color:var(--accent)}
.pf2{text-align:center;padding:20px;font-size:0.75rem;color:var(--text-mu)}
@media(prefers-color-scheme:dark){:root{--bg:#121212;--card:#1e1e2e;--text:#e8e6e3;--text-sec:#b0aeaa;--text-mu:#7a7875;--border:#2e2c3a;--accent:#a78bfa}}
</style>
</head>
<body><div class="container" id="app"></div>
<script id="portalData" type="application/json">${JSON.stringify({artista:e.artista,contatoEmail:e.contatoEmail,contatoTel:e.contatoTel,encomenda:e.encomenda}).replace(/<\/script>/g,`<\\/script>`)}<\/script>
<script>
var STAGES=[
{key:'criado',label:'Pedido Recebido',icon:'fa-clipboard'},
{key:'em_andamento',label:'Em Andamento',icon:'fa-paint-brush'},
{key:'aprovacao',label:'Aprova\u00e7\u00e3o',icon:'fa-check'},
{key:'finalizado',label:'Finalizado',icon:'fa-star'},
{key:'entregue',label:'Entregue',icon:'fa-box'}];
var SS={criado:{cor:'#3b82f6',bg:'#eff6ff'},em_andamento:{cor:'#f59e0b',bg:'#fffbeb'},aprovacao:{cor:'#8b5cf6',bg:'#f5f3ff'},finalizado:{cor:'#16a34a',bg:'#f0fdf4'},entregue:{cor:'#065f46',bg:'#ecfdf5'},cancelado:{cor:'#dc2626',bg:'#fef2f2'}};
function render(){
var data=JSON.parse(document.getElementById('portalData').textContent);
var e=data.encomenda;
var app=document.getElementById('app');
if(!e){app.innerHTML='<div class="ph"><h1><i class="fas fa-palette" style="color:var(--accent)"></i> '+s(data.artista)+'</h1><p class="artista">Portal do Cliente</p></div><div class="card" style="text-align:center;padding:40px;color:var(--text-mu)"><p><i class="fas fa-search"></i> Encomenda n\u00e3o encontrada.</p></div>';return}
var h='<div class="ph"><h1><i class="fas fa-palette" style="color:var(--accent)"></i> '+s(data.artista)+'</h1><p class="artista"><i class="fas fa-paint-brush"></i> Acompanhamento de Encomenda</p></div>';
h+=rc(e);h+='<div class="card cc"><h2><i class="fas fa-envelope"></i> Contato</h2>';
if(data.contatoEmail)h+='<div class="cr"><i class="fas fa-envelope"></i> '+s(data.contatoEmail)+'</div>';
if(data.contatoTel)h+='<div class="cr"><i class="fas fa-phone"></i> '+s(data.contatoTel)+'</div>';
h+='</div><div class="pf2"><p>D\u00favidas? Entre em contato direto com o artista.</p></div>';app.innerHTML=h;
}
function rc(e){
var st=SS[e.status]||{cor:'#6b7280',bg:'#f9fafb'};
var si=STAGES.findIndex(function(x){return x.key===e.status});
var pct=si>=0?si/(STAGES.length-1)*100:0;
var dp=e.prazo?Math.ceil((new Date(e.prazo)-new Date())/86400000):null;
var imgs=e.imagens||[];
var h='<div class="card" style="text-align:center;padding:28px 20px"><div style="font-size:2.4rem;color:var(--accent);margin-bottom:8px"><i class="fas fa-paint-brush"></i></div><h2>Ol\u00e1, '+s(e.clienteNome||'Cliente')+'!</h2><p style="color:var(--text-sec);font-size:0.9rem">Aqui est\u00e1 o progresso da sua encomenda.</p></div>';
h+='<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"><h2 style="margin:0"><i class="fas fa-box"></i> '+s(e.descricao||'Encomenda')+'</h2><span class="sb" style="background:'+st.bg+';color:'+st.cor+'"><i class="fas '+(STAGES[si]?STAGES[si].icon:'fa-clipboard')+'"></i> '+(STAGES[si]?STAGES[si].label:e.status)+'</span></div></div>';
h+='<div class="card"><h2><i class="fas fa-chart-line"></i> Progresso</h2><div class="pt"><div class="pf" style="width:'+pct+'%"></div></div><div class="sg">';
STAGES.forEach(function(s,i){var c=i<si||(i===si&&e.status==='entregue')?'done':i===si?'active':'';h+='<div class="si"><div class="sd '+c+'"><i class="fas '+s.icon+'"></i></div><div class="sl '+(c?'active':'')+'">'+s.label+'</div></div>'});
h+='</div></div>';
h+='<div class="card"><h2><i class="fas fa-info-circle"></i> Detalhes</h2><div class="ig"><div class="il">Valor</div><div class="iv">'+fm(e.valor||0)+'</div><div class="il">Previs\u00e3o</div><div class="iv">'+(e.prazo?fd(e.prazo):'\u2014')+'</div></div>';
if(dp!==null&&dp>0)h+='<div style="display:flex;gap:12px;justify-content:center;margin-top:12px"><div style="text-align:center"><div style="font-size:1.6rem;font-weight:700">'+dp+'</div><div style="font-size:0.65rem;color:var(--text-mu)">Dias</div></div></div>';
else if(dp!==null&&dp<=0)h+='<div style="color:#dc2626;text-align:center;padding:8px;margin-top:8px;background:#fef2f2;border-radius:8px"><i class="fas fa-clock"></i> Prazo encerrado</div>';
h+='</div>';
if(imgs.length){h+='<div class="card"><h2><i class="fas fa-camera"></i> Fotos</h2><div class="gg">';
imgs.forEach(function(img,i){h+='<div class="gi"><img src="'+img+'" alt="Foto" loading="lazy"><div class="gl"><i class="fas fa-camera"></i> Foto '+(i+1)+'</div></div>'});
h+='</div></div>'}
h+='<div class="card"><h2><i class="fas fa-history"></i> Atualiza\u00e7\u00f5es</h2><div class="tl">';
var atu=e.atualizacoes||[];
if(atu.length){atu.forEach(function(a){var s2=SS[a.status]||{cor:'#6b7280',bg:'#f9fafb'};var sg2=STAGES.find(function(x){return x.key===a.status});h+='<div class="ti"><div class="td" style="background:'+s2.cor+';color:#fff"><i class="fas '+(sg2?sg2.icon:'fa-circle')+'"></i></div><div class="ts">'+(sg2?sg2.label:a.status)+'</div>'+(a.mensagem?'<div class="tm">'+s(a.mensagem)+'</div>':'')+'<div class="tda">'+fd(a.data)+'</div></div>'})}
else{h+='<div style="text-align:center;padding:12px;color:var(--text-mu)"><i class="fas fa-hourglass"></i> Nenhuma atualiza\u00e7\u00e3o ainda.</div>'}
h+='</div></div>';return h
}
function s(str){if(!str)return '';var d=document.createElement('div');d.textContent=str;return d.innerHTML}
function fd(d){if(!d)return '\u2014';try{return new Date(d).toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'})}catch{return d}}
function fm(v){try{return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0)}catch{return 'R$ 0,00'}}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',render)}else{render()}
<\/script>
</body></html>`}function _i(e,t){let n=J.length>1?J[J.length-2]:null;n&&(J.indexOf(t),J.indexOf(n)),e.classList.remove(`view-enter-forward`,`view-enter-back`,`view-enter-fade`,`view-transition`),e.offsetWidth;let r=`view-enter-fade`;if(J.length>1){let e=J.map((e,n)=>e===t?n:-1).filter(e=>e>=0);J.length-1;let n=J.length-2;e.length>0&&e[e.length-1]<n?r=`view-enter-back`:e.length>0&&(r=`view-enter-forward`)}if(e.classList.add(r,`view-transition`),!J.includes(t))J.push(t);else{let e=J.indexOf(t);J.splice(e,1),J.push(t)}J.length>20&&J.shift(),requestAnimationFrame(()=>{e.querySelectorAll(`.stagger-in > *`).forEach((e,t)=>{e.style.animationDelay=`${t*30}ms`,e.style.animationDuration=`0.4s`})})}function vi(){let e=Math.floor((new Date-new Date(new Date().getFullYear(),0,0))/864e5);return ya[e%ya.length]}var V,yi,bi,xi,Si,Ci,wi,Ti,Ei,Di,Oi,ki,Ai,ji,Mi,Ni,Pi,Fi,H,Ii,Li,Ri,zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki,qi,Ji,Yi,U,Xi,Zi,Qi,$i,ea,ta,na,ra,ia,aa,oa,W,sa,G,ca,K,la,ua,q,da,fa,pa,ma,ha,ga,_a,va,J,ya,Y,ba,X,Z,Q,xa,Sa,Ca,wa,Ta,Ea,Da,Oa,ka,Aa,ja,Ma,Na,$,Pa,Fa,Ia,La,Ra,za,Ba,Va=e((()=>{fr(),V={dashboard:`<i class="fas fa-chart-bar"></i>`,catalogo:`<i class="fas fa-images"></i>`,clientes:`<i class="fas fa-users"></i>`,vendas:`<i class="fas fa-shopping-cart"></i>`,certificados:`<i class="fas fa-certificate"></i>`,referencias:`<i class="fas fa-bookmark"></i>`,encomendas:`<i class="fas fa-truck"></i>`,exposicoes:`<i class="fas fa-calendar-alt"></i>`,galeria:`<i class="fas fa-cube"></i>`,precificador:`<i class="fas fa-gem"></i>`,atelier:`<i class="fas fa-tools"></i>`,diario:`<i class="fas fa-book"></i>`,rede:`<i class="fas fa-share-alt"></i>`,financeiro:`<i class="fas fa-chart-line"></i>`,configuracoes:`<i class="fas fa-cog"></i>`,exportar:`<i class="fas fa-file-export"></i>`,portal:`<i class="fas fa-external-link-alt"></i>`,novo:`<i class="fas fa-plus"></i>`,salvar:`<i class="fas fa-save"></i>`,editar:`<i class="fas fa-edit"></i>`,excluir:`<i class="fas fa-trash"></i>`,buscar:`<i class="fas fa-search"></i>`,filtro:`<i class="fas fa-filter"></i>`,voltar:`<i class="fas fa-arrow-left"></i>`,avancar:`<i class="fas fa-arrow-right"></i>`,fechar:`<i class="fas fa-times"></i>`,download:`<i class="fas fa-download"></i>`,upload:`<i class="fas fa-upload"></i>`,compartilhar:`<i class="fas fa-share"></i>`,imprimir:`<i class="fas fa-print"></i>`,pdf:`<i class="fas fa-file-pdf"></i>`,imagem:`<i class="fas fa-image"></i>`,link:`<i class="fas fa-link"></i>`,aviso:`<i class="fas fa-exclamation-triangle"></i>`,sucesso:`<i class="fas fa-check-circle"></i>`,erro:`<i class="fas fa-times-circle"></i>`,info:`<i class="fas fa-info-circle"></i>`,dinheiro:`<i class="fas fa-dollar-sign"></i>`,obra:`<i class="fas fa-palette"></i>`,tag:`<i class="fas fa-tag"></i>`,data:`<i class="fas fa-calendar"></i>`,usuario:`<i class="fas fa-user"></i>`,email:`<i class="fas fa-envelope"></i>`,telefone:`<i class="fas fa-phone"></i>`,local:`<i class="fas fa-map-marker-alt"></i>`,notificacao:`<i class="fas fa-bell"></i>`,config:`<i class="fas fa-cog"></i>`,backup:`<i class="fas fa-database"></i>`,marca:`<i class="fas fa-tag"></i>`,categoria:`<i class="fas fa-folder"></i>`,estoque:`<i class="fas fa-boxes"></i>`,compras:`<i class="fas fa-shopping-bag"></i>`,lista:`<i class="fas fa-list"></i>`,grafico:`<i class="fas fa-chart-pie"></i>`,mapa:`<i class="fas fa-map"></i>`,estrela:`<i class="fas fa-star"></i>`,coracao:`<i class="fas fa-heart"></i>`},yi=`AtelierCRM_Images`,bi=1,xi=`images`,Si=null,Ci=new Map,window.imageStore={salvar:jr,carregar:Mr,remover:Fr,liberar:Nr,liberarTodas:Pr,migrar:Ir},wi=new Map,Ti=`atelier_crm_credenciais_sessao`,Ei=[`pin`,`syncGoogleToken`,`syncWebDAVPass`,`syncWebDAVUser`,`syncWebDAVUrl`,`syncSupabaseAccessToken`],Di=`atelier-crm-pin-v1`,Oi=[{version:2,up:e=>{[`materiais`,`fornecedores`,`consumos`,`contatosProfissionais`,`interacoes`,`eventos`].forEach(t=>{e[t]||(e[t]=[])}),e.config&&!e.config.precificador&&(e.config.precificador={valorHora:60,multiplicadorExperiencia:1.5,metaMensal:1e4,metaAnual:12e4,metaInicio:new Date().toISOString().slice(0,7)}),e.entradasDiario||(e.entradasDiario=[]),e.etapasProcesso||(e.etapasProcesso=[]),e.config&&e.config.idioma===void 0&&(e.config.idioma=`pt-BR`),e.config&&e.config.altoContraste===void 0&&(e.config.altoContraste=!1),e.config&&e.config.tamanhoFonte===void 0&&(e.config.tamanhoFonte=`medio`),e.config&&!e.config.precificadorRegras&&(e.config.precificadorRegras=[]),e.config&&!e.config.moedaPadrao&&(e.config.moedaPadrao=`BRL`),e.config&&!e.config.taxasCambio&&(e.config.taxasCambio={USD:5,EUR:5.5,GBP:6.3}),e.config&&e.config.pin===void 0&&(e.config.pin=``),e.config&&e.config.autoLock===void 0&&(e.config.autoLock=!1),e.config&&e.config.tourCompleted===void 0&&(e.config.tourCompleted=!1),e.portais||(e.portais=[])}},{version:3,up:e=>{e.portais&&e.portais.length>0&&!e.portais[0].encomendaId&&e.portais.forEach(e=>{e.encomendaId=``}),e.encomendas&&e.encomendas.length>0&&!e.encomendas[0].atualizacoes&&e.encomendas.forEach(e=>{e.atualizacoes=e.atualizacoes||[],e.valor=e.valor||0,e.imagens=e.imagens||[],e.criadoEm=e.criadoEm||new Date().toISOString()})}},{version:4,up:e=>{e.obras&&e.obras.length>0&&!e.obras[0].imagens&&e.obras.forEach(e=>{e.imagens=[],e.imagem&&!e.imagem.includes(`svg+xml`)&&(e.imagens.push(e.imagem),e.imagemDestacada=e.imagem)})}},{version:5,up:e=>{}}],ki=Math.max(...Oi.map(e=>e.version)),Ai=class{constructor(){this.chave=`atelier_crm_dados`,this.dados=this.carregar();let e=qr(this.dados);if(this.dados.config&&this.dados.config.pin&&!Kr(this.dados.config.pin)){let e=this.dados.config.pin;Wr(e).then(e=>{this.dados.config.pin=e,this.salvar()})}e&&this.salvar(),setTimeout(()=>{typeof window<`u`&&window.imageStore&&this.dados.obras?.length&&window.imageStore.migrar(this.dados.obras,this.dados.encomendas).then(e=>{e>0&&this.salvar()}).catch(()=>{})},2e3)}estruturaPadrao(){return{schemaVersion:ki,obras:[],clientes:[],vendas:[],certificados:[],referencias:[],encomendas:[],exposicoes:[],transacoes:[],materiais:[],fornecedores:[],consumos:[],contatosProfissionais:[],interacoes:[],eventos:[],entradasDiario:[],etapasProcesso:[],portais:[],config:{artista:{nome:`Meu Ateliê`,email:``,telefone:``,assinatura:``},tema:`classico`,contadorRecibos:{},contadorPropostas:{},contadorCertificados:{},textoGarantia:`Este documento certifica a autenticidade da obra descrita acima, de autoria exclusiva do artista identificado neste recibo. A obra é entregue em perfeito estado de conservação, livre de quaisquer ônus. Reprodução, cópias ou uso comercial da imagem sem autorização expressa do artista são vedados.`,precificador:{valorHora:60,multiplicadorExperiencia:1.5,metaMensal:1e4,metaAnual:12e4,metaInicio:new Date().toISOString().slice(0,7)},idioma:`pt-BR`,altoContraste:!1,tamanhoFonte:`medio`,pin:``,autoLock:!1,tourCompleted:!1}}}carregar(){let e=localStorage.getItem(this.chave);if(e)try{return JSON.parse(e)}catch(e){console.error(`Erro ao ler dados salvos, recriando estrutura.`,e)}let t=this.estruturaPadrao();return this.dados=t,this.popularExemplos(),this.salvar(),this.dados}salvar(){try{localStorage.setItem(this.chave,JSON.stringify(Hr(this.dados)))}catch(e){e.name===`QuotaExceededError`||e.code===22?A(`Armazenamento local cheio. Exporte um backup e limpe dados antigos para continuar salvando.`,`erro`):A(`Erro ao salvar dados: `+e.message,`erro`)}}listar(e){return this.dados[e]||[]}adicionar(e,t){return t.id=crypto.randomUUID?crypto.randomUUID():`id_`+Date.now()+`_`+Math.floor(Math.random()*1e3),t.criadoEm=t.criadoEm||new Date().toISOString(),this.dados[e].push(t),this.salvar(),t}atualizar(e,t,n){let r=this.dados[e].find(e=>e.id===t);return r&&(Object.assign(r,n),this.salvar()),r}remover(e,t){this.dados[e]=this.dados[e].filter(e=>e.id!==t),this.salvar()}buscarPorId(e,t){return this.dados[e].find(e=>e.id===t)}popularExemplos(){let e=new Date,t=t=>{let n=new Date(e);return n.setMonth(n.getMonth()-t),n.toISOString()};this.dados.obras=[{id:`obra_ex_1`,titulo:`Marinha ao Entardecer`,tecnica:`óleo`,dimensoes:{altura:60,largura:80,profundidade:0},ano:2024,descricao:`Estudo de luz sobre o mar ao entardecer, com pinceladas soltas capturando o movimento das ondas e o reflexo dourado do sol.`,preco:3200,status:`disponível`,imagem:I(`#d97757`,`🌅`),dataCadastro:t(1),criadoEm:t(1),serie:`Paisagens Marinhas`,custoMateriais:420,horasTrabalho:28,historicoPrecos:[{preco:2800,data:`2025-06-01`,motivo:`Ajuste inicial`},{preco:3200,data:`2025-09-15`,motivo:`Reajuste por demanda`}],imagens:[I(`#d97757`,`🌅`),I(`#e8a060`,`🌊`)],imagemDestacada:I(`#d97757`,`🌅`)},{id:`obra_ex_2`,titulo:`Autorretrato em Ocre`,tecnica:`óleo`,dimensoes:{altura:50,largura:40,profundidade:0},ano:2023,descricao:`Autorretrato em tons terrosos, explorando contrastes de luz e sombra sobre o rosto.`,preco:2100,status:`vendida`,imagem:I(`#8b5e3c`,`🧑‍<i class="fas fa-palette"></i>`),dataCadastro:t(5),criadoEm:t(5),serie:``,custoMateriais:180,horasTrabalho:16,historicoPrecos:[{preco:1500,data:`2024-10-01`,motivo:`Preço inicial`},{preco:1800,data:`2025-02-10`,motivo:`Ajuste`},{preco:2100,data:`2025-06-20`,motivo:`Valorização`}],imagens:[I(`#8b5e3c`,`🧑‍<i class="fas fa-palette"></i>`)],imagemDestacada:I(`#8b5e3c`,`🧑‍<i class="fas fa-palette"></i>`)},{id:`obra_ex_3`,titulo:`Jardim das Aquarelas`,tecnica:`aquarela`,dimensoes:{altura:30,largura:40,profundidade:0},ano:2024,descricao:`Composição floral em técnica úmida sobre úmido, valorizando a transparência da aquarela.`,preco:850,status:`reservada`,imagem:I(`#e8a0bf`,`🌸`),dataCadastro:t(2),criadoEm:t(2),serie:`Jardins`,custoMateriais:90,horasTrabalho:8,imagens:[I(`#e8a0bf`,`🌸`)],imagemDestacada:I(`#e8a0bf`,`🌸`)},{id:`obra_ex_4`,titulo:`Ipê Amarelo`,tecnica:`aquarela`,dimensoes:{altura:25,largura:35,profundidade:0},ano:2025,descricao:`Estudo rápido de um ipê florido, feito em plein air durante o início da primavera.`,preco:620,status:`em exposição`,imagem:I(`#f2c14e`,`🌼`),dataCadastro:t(0),criadoEm:t(0),serie:`Jardins`,custoMateriais:70,horasTrabalho:6,imagens:[I(`#f2c14e`,`🌼`)],imagemDestacada:I(`#f2c14e`,`🌼`)},{id:`obra_ex_5`,titulo:`Forma em Repouso`,tecnica:`escultura`,dimensoes:{altura:45,largura:22,profundidade:20},ano:2023,descricao:`Escultura em bronze fundido, explorando curvas orgânicas e o equilíbrio entre volume e vazio.`,preco:5400,status:`disponível`,imagem:I(`#7a7a7a`,`🗿`),dataCadastro:t(4),criadoEm:t(4),serie:``,custoMateriais:1200,horasTrabalho:60,historicoPrecos:[{preco:4800,data:`2024-08-01`,motivo:`Preço inicial`},{preco:5400,data:`2025-03-10`,motivo:`Reajuste anual`}],imagens:[I(`#7a7a7a`,`🗿`)],imagemDestacada:I(`#7a7a7a`,`🗿`)}],this.dados.clientes=[{id:`cli_ex_1`,nome:`Fernanda Alcântara`,email:`fernanda@exemplo.com`,telefone:`(21) 99999-0001`,endereco:`Rua das Palmeiras, 120 - Rio Bonito/RJ`,notas:`Colecionadora frequente, prefere obras em aquarela com temas florais.`,tags:[`colecionadora`,`aquarela`],aquisicoes:1,criadoEm:t(3)},{id:`cli_ex_2`,nome:`Ricardo Bittencourt`,email:`ricardo.bit@exemplo.com`,telefone:`(21) 98888-0002`,endereco:`Av. Atlântica, 500 - Rio de Janeiro/RJ`,notas:`Interessado em esculturas para decoração de escritório.`,tags:[`interessado`,`escultura`],aquisicoes:0,criadoEm:t(1)}],this.dados.vendas=[{id:`venda_ex_1`,numeroRecibo:`REC-`+e.getFullYear()+`-001`,obraId:`obra_ex_3`,clienteId:`cli_ex_1`,precoFinal:850,valorTotal:850,data:t(2),dataVenda:t(2),formaPagamento:`à vista`,status:`paga`,criadoEm:t(2)}],this.dados.config.contadorRecibos[e.getFullYear()]=1,this.dados.encomendas=[{id:`enc_ex_1`,clienteNome:`Fernanda Alcântara`,clienteEmail:`fernanda@exemplo.com`,clienteTelefone:`(21) 99999-0001`,descricao:`Retrato em aquarela 40x60cm — jardim particular`,prazo:new Date(e.getFullYear(),e.getMonth()+2,15).toISOString(),status:`em_andamento`,valor:1200,atualizacoes:[{data:new Date(e.getFullYear(),e.getMonth(),10).toISOString(),status:`criado`,mensagem:`Pedido recebido, aguardando referências fotográficas.`},{data:new Date(e.getFullYear(),e.getMonth(),18).toISOString(),status:`em_andamento`,mensagem:`Esboço inicial aprovado. Iniciando camadas de cor.`}],imagens:[],criadoEm:t(0)},{id:`enc_ex_2`,clienteNome:`Ricardo Bittencourt`,clienteEmail:`ricardo.bit@exemplo.com`,clienteTelefone:`(21) 98888-0002`,descricao:`Escultura em bronze 35cm — figura abstrata`,prazo:new Date(e.getFullYear(),e.getMonth()+4,1).toISOString(),status:`criado`,valor:3500,atualizacoes:[{data:new Date(e.getFullYear(),e.getMonth(),5).toISOString(),status:`criado`,mensagem:`Pedido registrado. Orçamento aprovado.`}],imagens:[],criadoEm:t(0)}],this.dados.portais=[],this.dados.certificados=[{id:`cert_ex_1`,numeroSerie:`ART-`+e.getFullYear()+`-001`,obraId:`obra_ex_3`,tituloObra:`Jardim das Aquarelas`,tecnica:`aquarela`,dimensoesTexto:`30 x 40 cm`,ano:2024,edicaoTipo:`unica`,edicaoAtual:null,edicaoTotal:null,local:`Rio Bonito/RJ`,dataEmissao:t(2),imagem:I(`#e8a0bf`,`🌸`),criadoEm:t(2)}],this.dados.config.contadorCertificados[e.getFullYear()]=1,this.dados.referencias=[{id:`ref_ex_1`,tipo:`imagem`,imagem:I(`#ffcda3`,`🌅`),titulo:`Paleta de pôr do sol`,nota:``,url:``,tags:[`cor`,`laranja`,`quente`],categoria:`cor`,obraVinculada:`obra_ex_1`,criadoEm:t(2)},{id:`ref_ex_2`,tipo:`nota`,imagem:``,titulo:`Ideia para série floral`,nota:`Explorar aquarela úmida sobre úmido com flores tropicais...`,url:``,tags:[`aquarela`,`jardim`,`ideia`],categoria:`época`,obraVinculada:`obra_ex_3`,criadoEm:t(3)},{id:`ref_ex_3`,tipo:`link`,imagem:``,titulo:`Referência de luz - pintura impressionista`,nota:``,url:`https://upload.wikimedia.org/wikipedia/commons/6/62/Claude_Monet%2C_Impression%2C_soleil_levant.jpg`,tags:[`artista`,`luz`,`impressionismo`],categoria:`artista`,obraVinculada:``,criadoEm:t(4)}];let n=new Date,r=e=>{let t=new Date(n);return t.setDate(t.getDate()-e),t.toISOString()},i=e=>{let t=new Date(n);return t.setDate(t.getDate()-e),t.toISOString().slice(0,10)};this.dados.entradasDiario=[{id:`dia_ex_7`,data:r(7),humor:4,oQueTrabalhou:`<p>Finalizei a camada de velatura...</p>`,obrasTrabalhadas:[`obra_ex_1`],fotos:[],horasTrabalhadas:4.5,bloqueios:``,avancos:`Velatura do céu concluída com sucesso`,descobertas:`Misturar um toque de alizarim crimson no azul ultramar dá um violeta sutil incrível para as nuvens`,criadoEm:r(7)},{id:`dia_ex_6`,data:r(6),humor:3,oQueTrabalhou:`<p>Dia de organização do ateliê...</p>`,obrasTrabalhadas:[`obra_ex_4`],fotos:[],horasTrabalhadas:3,bloqueios:`Dificuldade em capturar a luz...`,avancos:`A organização trouxe clareza mental.`,descobertas:`Usar máscara líquida nos brancos...`,criadoEm:r(6)},{id:`dia_ex_5`,data:r(5),humor:5,oQueTrabalhou:`<p>Dia intenso na "Forma em Repouso"...</p>`,obrasTrabalhadas:[`obra_ex_5`],fotos:[],horasTrabalhadas:7,bloqueios:``,avancos:`Pátina verde alcançou o tom ideal!`,descobertas:`Aplicar a pátina com pincel de cerdas macias...`,criadoEm:r(5)},{id:`dia_ex_4`,data:r(4),humor:2,oQueTrabalhou:`<p>Dia frustrante. A tela grande...</p>`,obrasTrabalhadas:[],fotos:[],horasTrabalhadas:2,bloqueios:`Chassis empenado por causa da chuva.`,avancos:``,descobertas:`Preciso comprar um desumidificador...`,criadoEm:r(4)},{id:`dia_ex_3`,data:r(3),humor:4,oQueTrabalhou:`<p>Voltei para a aquarela "Jardim das Aquarelas"...</p>`,obrasTrabalhadas:[`obra_ex_3`],fotos:[],horasTrabalhadas:5,bloqueios:``,avancos:`Cliente visitou o ateliê...`,descobertas:`Misturar violeta de cobalto com siena natural...`,criadoEm:r(3)},{id:`dia_ex_2`,data:r(2),humor:1,oQueTrabalhou:`<p>Dia administrativo...</p>`,obrasTrabalhadas:[],fotos:[],horasTrabalhadas:1.5,bloqueios:`Bloqueio criativo total.`,avancos:`Pelo menos a papelada está em dia.`,descobertas:`Dias administrativos são necessários...`,criadoEm:r(2)},{id:`dia_ex_1`,data:r(1),humor:5,oQueTrabalhou:`<p>Dia mais produtivo da semana...</p>`,obrasTrabalhadas:[`obra_ex_4`],fotos:[],horasTrabalhadas:8,bloqueios:``,avancos:`Ipê Amarelo finalizado!`,descobertas:`Usar um palito de dentes para respingar...`,criadoEm:r(1)}],this.dados.etapasProcesso=[{id:`proc_ex_1`,obraId:`obra_ex_4`,etapas:[{id:`etp_1`,titulo:`Sketch inicial`,data:i(14),descricao:`Desenho a lápis...`,notasTecnicas:`Lápis 2B, papel Canson 180g`,foto:``,videoLink:``},{id:`etp_2`,titulo:`Estudo de cor`,data:i(12),descricao:`Paleta restrita...`,notasTecnicas:`Aquarela Windsor & Newton`,foto:``,videoLink:``},{id:`etp_3`,titulo:`Primeira camada (fundos)`,data:i(10),descricao:`Lavagem úmida...`,notasTecnicas:`Pincel chato nº 14`,foto:``,videoLink:``},{id:`etp_4`,titulo:`Camadas intermediárias`,data:i(7),descricao:`Construção das formas...`,notasTecnicas:`Pincel redondo nº 6`,foto:``,videoLink:``},{id:`etp_5`,titulo:`Detalhamento`,data:i(4),descricao:`Detalhes finos...`,notasTecnicas:`Pincel liner nº 1`,foto:``,videoLink:``},{id:`etp_6`,titulo:`Finalização`,data:i(1),descricao:`Assinatura e ajustes finais...`,notasTecnicas:`Caneta nanquim`,foto:``,videoLink:``}],criadoEm:r(14)},{id:`proc_ex_2`,obraId:`obra_ex_1`,etapas:[{id:`etp_2_1`,titulo:`Sketch inicial`,data:i(45),descricao:`Composição em carvão...`,notasTecnicas:`Carvão vegetal`,foto:``,videoLink:``},{id:`etp_2_2`,titulo:`Imprimatura`,data:i(42),descricao:`Camada fina de acrílico...`,notasTecnicas:`Acrílico transparente`,foto:``,videoLink:``},{id:`etp_2_3`,titulo:`Primeira camada a óleo`,data:i(38),descricao:`Manchas grossas...`,notasTecnicas:`Óleo Windsor & Newton`,foto:``,videoLink:``},{id:`etp_2_4`,titulo:`Velaturas`,data:i(25),descricao:`Camadas finas...`,notasTecnicas:`Meio de velatura em gel`,foto:``,videoLink:``},{id:`etp_2_5`,titulo:`Detalhamento das ondas`,data:i(15),descricao:`Estudo das espumas...`,notasTecnicas:`Pincel redondo nº 4`,foto:``,videoLink:``}],criadoEm:r(45)}],this.dados.transacoes=[{id:`trans_ex_1`,tipo:`entrada`,descricao:`Venda - Jardim das Aquarelas`,valor:850,data:t(2),criadoEm:t(2)},{id:`trans_ex_2`,tipo:`saida`,descricao:`Compra de materiais`,valor:220,data:t(1),criadoEm:t(1)}],this.dados.materiais=[{id:`mat_1`,nome:`Tinta Óleo Azul Ultramar`,categoria:`tintas`,subcategoria:`óleo`,marca:`Windsor & Newton`,quantidade:500,unidade:`ml`,quantidadeMinima:100,local:`Prateleira A3`,dataAquisicao:`2025-01-15`,validade:`2027-01-15`,precoUnitario:45,foto:``,notas:`Tom indispensável para céus e águas`},{id:`mat_2`,nome:`Tela de Algodão 50×70`,categoria:`superficies`,subcategoria:`tela`,marca:`Atlantis`,quantidade:8,unidade:`un`,quantidadeMinima:3,local:`Cavalete 2`,dataAquisicao:`2025-03-10`,validade:``,precoUnitario:38,foto:``,notas:`Tela tripla priming`},{id:`mat_3`,nome:`Pincel Chato Nº 12`,categoria:`ferramentas`,subcategoria:`pincel`,marca:`Tigre`,quantidade:5,unidade:`un`,quantidadeMinima:2,local:`Porta-pincéis`,dataAquisicao:`2025-02-20`,validade:``,precoUnitario:22,foto:``,notas:`Cerdas sintéticas`},{id:`mat_4`,nome:`Papel Aquarela 300g A3`,categoria:`superficies`,subcategoria:`papel`,marca:`Canson`,quantidade:15,unidade:`un`,quantidadeMinima:5,local:`Gaveta B1`,dataAquisicao:`2025-04-05`,validade:``,precoUnitario:12,foto:``,notas:`Granulação média`},{id:`mat_5`,nome:`Tinta Acrílica Dourada`,categoria:`tintas`,subcategoria:`acrílico`,marca:`Acrilex`,quantidade:200,unidade:`ml`,quantidadeMinima:50,local:`Prateleira A1`,dataAquisicao:`2025-05-01`,validade:`2026-05-01`,precoUnitario:18,foto:``,notas:`Acabamento metálico`},{id:`mat_6`,nome:`Moldura Clássica 30×40`,categoria:`molduras`,subcategoria:`clássica`,marca:`Molduraz`,quantidade:2,unidade:`un`,quantidadeMinima:4,local:`Depósito`,dataAquisicao:`2025-06-10`,validade:``,precoUnitario:65,foto:``,notas:`<i class="fas fa-exclamation-triangle"></i> ABAIXO DO MÍNIMO — repor urgente!`}],this.dados.fornecedores=[{id:`forn_1`,nome:`Casa do Artista`,contato:`(11) 99999-0001`,email:`vendas@casaartista.com.br`,especialidade:`Tintas e pincéis`,avaliacao:4,notas:`Bom prazo de entrega.`,historicoCompras:[{data:`2025-01-15`,valor:320,itens:`Tintas diversas`}]},{id:`forn_2`,nome:`Telas & Molduras Ltda`,contato:`(21) 98888-0002`,email:`pedidos@telasmolduras.com`,especialidade:`Telas, papéis e molduras`,avaliacao:5,notas:`Qualidade excepcional.`,historicoCompras:[{data:`2025-02-20`,valor:450,itens:`Telas 50×70`}]}],this.dados.consumos=[{id:`cons_1`,materialId:`mat_1`,obraId:`obra_ex_1`,quantidade:120,data:`2025-06-10`,notas:`Camada de fundo do céu`},{id:`cons_2`,materialId:`mat_1`,obraId:`obra_ex_1`,quantidade:80,data:`2025-06-12`,notas:`Reflexos do mar`},{id:`cons_3`,materialId:`mat_2`,obraId:`obra_ex_1`,quantidade:1,data:`2025-06-05`,notas:`Suporte da obra`}],this.dados.contatosProfissionais=[{id:`cont_ex_1`,nome:`Ana Luísa Martins`,categoria:`galerista`,instituicao:`Galeria Martins & Associados`,cargo:`Diretora`,contato:`(11) 99999-1001`,email:`ana@martinsgaleria.com.br`,nivelRelacionamento:4,ultimoContato:`2025-08-10`,estagio:`em_conversa`},{id:`cont_ex_2`,nome:`Dr. Ricardo Tavares`,categoria:`curador`,instituicao:`Museu de Arte Moderna - SP`,cargo:`Curador-Chefe`,contato:`(11) 98888-2002`,email:`rtavares@mam.org.br`,nivelRelacionamento:2,ultimoContato:`2025-09-05`,estagio:`primeira_aproximacao`},{id:`cont_ex_3`,nome:`Carla Bergman`,categoria:`critico`,instituicao:`Arte & Crítica Magazine`,cargo:`Editora de Arte`,contato:`(21) 97777-3003`,email:`carla@artecriticamag.com.br`,nivelRelacionamento:1,ultimoContato:`2025-09-20`,estagio:`novo_contato`},{id:`cont_ex_4`,nome:`Felipe Nogueira`,categoria:`artista`,instituicao:`Coletivo Atelier Aberto`,cargo:`Artista Plástico`,contato:`(31) 96666-4004`,email:`felipe@coletivoatelier.com.br`,nivelRelacionamento:5,ultimoContato:`2025-09-28`,estagio:`colaboracao_consolidada`},{id:`cont_ex_5`,nome:`Marta Silveira`,categoria:`colecionador`,cargo:`Colecionadora`,contato:`(21) 95555-5005`,email:`marta.silveira@email.com`,nivelRelacionamento:3,ultimoContato:`2025-09-15`,estagio:`parceria_ativa`,vip:!0}],this.dados.interacoes=[{id:`int_ex_1`,contatoId:`cont_ex_1`,data:`2025-08-10`,tipo:`reuniao`,resumo:`Primeira reunião presencial...`,sentimento:`positivo`,followUp:!0,followUpNotas:`Enviar fotos`,anexos:[]},{id:`int_ex_2`,contatoId:`cont_ex_1`,data:`2025-09-01`,tipo:`email`,resumo:`Envio de portfólio...`,sentimento:`positivo`,followUp:!1,followUpNotas:``,anexos:[]},{id:`int_ex_3`,contatoId:`cont_ex_4`,data:`2025-09-28`,tipo:`visita`,resumo:`Visita ao ateliê do Felipe...`,sentimento:`positivo`,followUp:!0,followUpNotas:`Definir cronograma`,anexos:[]}],this.dados.eventos=[{id:`evt_ex_1`,nome:`SP-Arte 2026`,tipo:`feira`,dataInscricao:`2025-10-01`,dataEvento:`2026-04-15`,dataFim:`2026-04-19`,status:`inscrito`,resultado:``,investimento:3500,retorno:0,documentacao:[`Portfolio.pdf`,`Release`],obrasEnviadas:[`obra_ex_1`,`obra_ex_5`],notas:`Maior feira de arte da América Latina.`},{id:`evt_ex_2`,nome:`Edital Funarte Artes Visuais 2026`,tipo:`edital`,dataInscricao:`2025-11-15`,dataEvento:`2026-06-01`,dataFim:`2026-12-31`,status:`pesquisando`,investimento:0,retorno:0,documentacao:[],obrasEnviadas:[],notas:`Edital federal para circulação de exposição.`}]}exportarBackup(){j(`Exportando backup...`);let e=JSON.stringify(Hr(this.dados),null,2),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`),i=new Date().toISOString().replace(/[:.]/g,`-`);r.href=n,r.download=`atelier-crm-backup-${i}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n),M(),this.salvarHistoricoExport(`completo`,this.dados)}exportarColecao(e){if(!this.dados[e])return console.error(`Coleção não encontrada:`,e),!1;let t={[e]:this.dados[e],exportadoEm:new Date().toISOString(),versao:`1.0`},n=JSON.stringify(t,null,2),r=new Blob([n],{type:`application/json`}),i=URL.createObjectURL(r),a=document.createElement(`a`),o=new Date().toISOString().replace(/[:.]/g,`-`);return a.href=i,a.download=`atelier-crm-${e}-${o}.json`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),this.salvarHistoricoExport(e,t),!0}salvarHistoricoExport(e,t){let n=JSON.parse(localStorage.getItem(`atelier-export-history`)||`[]`);n.unshift({tipo:e,data:new Date().toISOString(),tamanho:JSON.stringify(t).length}),n.length>10&&n.pop(),localStorage.setItem(`atelier-export-history`,JSON.stringify(n))}obterHistoricoExport(){return JSON.parse(localStorage.getItem(`atelier-export-history`)||`[]`)}importarBackup(e){try{let t=JSON.parse(e);if(!t||typeof t!=`object`||Array.isArray(t))throw Error(`Formato inválido: esperado objeto`);let n=[`obras`,`clientes`,`vendas`,`certificados`,`referencias`,`encomendas`,`portais`,`exposicoes`,`transacoes`,`materiais`,`fornecedores`,`consumos`,`contatosProfissionais`,`interacoes`,`eventos`,`entradasDiario`,`etapasProcesso`],r=n.some(e=>e in t)||`config`in t;Object.entries({pedidos:`encomendas`,consumicoes:`consumos`,contatos:`contatosProfissionais`,diario:`entradasDiario`,processos:`etapasProcesso`}).forEach(([e,n])=>{t[e]&&!t[n]&&(t[n]=t[e])});let i=n.filter(e=>e in t&&!Array.isArray(t[e]));if(i.length)throw Error(`Coleções inválidas: ${i.join(`, `)}`);if(t.config&&(typeof t.config!=`object`||Array.isArray(t.config)))throw Error(`Configuração inválida`);if(r){let e=this.estruturaPadrao();this.dados={...e,...t,schemaVersion:ki}}else Object.keys(t).forEach(e=>{e!==`exportadoEm`&&e!==`versao`&&e!==`schemaVersion`&&(this.dados[e]=t[e])});return qr(this.dados),this.salvar(),{sucesso:!0,tipo:r?`completo`:`parcial`}}catch(e){return{sucesso:!1,erro:e.message}}}previewImport(e){try{let t=JSON.parse(e),n={valido:!0,tipo:`completo`,colecoes:[]},r=[`obras`,`clientes`,`vendas`,`certificados`,`referencias`,`encomendas`,`portais`,`exposicoes`,`transacoes`,`materiais`,`fornecedores`,`consumos`,`contatosProfissionais`,`interacoes`,`eventos`,`entradasDiario`,`etapasProcesso`,`config`];return r.some(e=>e in t)?n.colecoes=r.filter(e=>e in t).map(e=>({nome:e,quantidade:Array.isArray(t[e])?t[e].length:Object.keys(t[e]).length})):(n.tipo=`parcial`,n.colecoes=Object.keys(t).filter(e=>e!==`exportadoEm`&&e!==`versao`).map(e=>({nome:e,quantidade:Array.isArray(t[e])?t[e].length:Object.keys(t[e]).length}))),n}catch(e){return{valido:!1,erro:e.message}}}},ji=class{constructor(){this._eventos={}}on(e,t){return this._eventos[e]||(this._eventos[e]=[]),this._eventos[e].push(t),()=>this.off(e,t)}off(e,t){this._eventos[e]&&(this._eventos[e]=this._eventos[e].filter(e=>e!==t))}emitir(e,...t){(this._eventos[e]||[]).forEach(e=>e(...t))}},Mi=class{constructor(){this.atividades=this.carregarAtividades()}carregarAtividades(){try{let e=localStorage.getItem(`atelier-activities`);return e?JSON.parse(e):[]}catch(e){return console.warn(`Falha ao carregar atividades do localStorage`,e),[]}}salvarAtividades(){localStorage.setItem(`atelier-activities`,JSON.stringify(this.atividades.slice(0,50)))}registrar(e,t,n,r=`atualizacao`){let i={id:Date.now().toString()+Math.random().toString(36).substr(2,9),tipo:e,titulo:t,detalhes:n,timestamp:new Date,badge:r};this.atividades.unshift(i),this.salvarAtividades(),Z.emitir(`nova-atividade`,i)}obterRecentes(e=10){return this.atividades.slice(0,e)}limpar(){this.atividades=[],this.salvarAtividades()}formatarTempo(e){let t=new Date().getTime()-e.getTime(),n=Math.floor(t/6e4),r=Math.floor(t/36e5),i=Math.floor(t/864e5);return n<1?`Agora mesmo`:n<60?`${n} min atrás`:r<24?`${r}h atrás`:i<7?`${i}d atrás`:e.toLocaleDateString(`pt-BR`)}obterIcone(e){return{criacao:`✨`,atualizacao:`<i class="fas fa-pen"></i>`,exclusao:`<i class="fas fa-trash"></i>`,venda:`<i class="fas fa-dollar-sign"></i>`,favorita:`<i class="fas fa-star"></i>`,export:`<i class="fas fa-file"></i>`,import:`📥`,status:`<i class="fas fa-pencil-alt"></i>`}[e]||`<i class="fas fa-thumbtack"></i>`}},Ni=class{constructor(e){this.dataStore=e,this.temaAtual=this.dataStore.dados.config.tema||`classico`}inicializar(){this.aplicarTema(this.temaAtual);let e=document.getElementById(`seletorTema`);e&&(e.value=this.temaAtual,e.addEventListener(`change`,e=>this.aplicarTema(e.target.value))),this.dataStore.dados.config.altoContraste&&document.body.setAttribute(`data-high-contrast`,`true`),document.body.setAttribute(`data-font-size`,this.dataStore.dados.config.tamanhoFonte||`medio`);let t=this.dataStore.dados.config.idioma||`pt-BR`;window.AtelierCRMTranslations&&(window.AtelierCRMTranslations.locale=t),Jr()}aplicarTema(e){document.body.setAttribute(`data-tema`,e),this.temaAtual=e,this.dataStore.dados.config.tema=e,this.dataStore.salvar(),Jr()}},Pi=[{titulo:``,rotas:[`dashboard`]},{titulo:`Gestão`,rotas:[`catalogo`,`clientes`,`vendas`,`certificados`,`encomendas`]},{titulo:`Criativo`,rotas:[`diario`,`galeriaVirtual`,`referencias`,`exposicoes`]},{titulo:`Negócios`,rotas:[`precificador`,`financeiro`,`rede`,`atelier`]},{titulo:`Sistema`,rotas:[`configuracoes`,`exportar`]}],Fi=class{constructor(e){this.dataStore=e,this.viewAtual=`dashboard`,this.container=document.getElementById(`viewPrincipal`),this.rotas={dashboard:{rotulo:`Dashboard`,icone:V.dashboard,render:()=>xa.render(),aposRender:()=>xa.aposRenderizar()},portal:{rotulo:`Portal`,icone:V.portal,render:()=>Na.render(),aposRender:()=>Na.aposRenderizar(),oculta:!0},catalogo:{rotulo:`Catálogo`,icone:V.catalogo,render:()=>Sa.render(),aposRender:()=>Sa.aposRenderizar()},clientes:{rotulo:`Clientes`,icone:V.clientes,render:()=>wa.render(),aposRender:()=>wa.aposRenderizar()},vendas:{rotulo:`Vendas`,icone:V.vendas,render:()=>Ta.render(),aposRender:()=>Ta.aposRenderizar()},certificados:{rotulo:`Certificados`,icone:V.certificados,render:()=>Ea.render(),aposRender:()=>Ea.aposRenderizar()},referencias:{rotulo:`Referências`,icone:V.referencias,render:()=>Da.render(),aposRender:()=>Da.aposRenderizar()},encomendas:{rotulo:`Encomendas`,icone:V.encomendas,render:()=>Pa.render(),aposRender:()=>Pa.aposRenderizar()},exposicoes:{rotulo:`Exposições`,icone:V.exposicoes,render:()=>Fa.render(),aposRender:()=>Fa.aposRenderizar()},galeriaVirtual:{rotulo:`Galeria Virtual`,icone:V.galeria,render:()=>Oa.render(),aposRender:()=>Oa.aposRenderizar()},precificador:{rotulo:`Precificador`,icone:V.precificador,render:()=>ka.render(),aposRender:()=>ka.aposRenderizar()},atelier:{rotulo:`Atelier`,icone:V.atelier,render:()=>Aa.render(),aposRender:()=>Aa.aposRenderizar()},diario:{rotulo:`Diário`,icone:V.diario,render:()=>ja.render(),aposRender:()=>ja.aposRenderizar()},rede:{rotulo:`Rede`,icone:V.rede,render:()=>Ma.render(),aposRender:()=>Ma.aposRenderizar()},financeiro:{rotulo:`Financeiro`,icone:V.financeiro,render:()=>Ia.render(),aposRender:()=>Ia.aposRenderizar()},configuracoes:{rotulo:`Configurações`,icone:V.configuracoes,render:()=>La.render(),aposRender:()=>La.aposRenderizar()},exportar:{rotulo:`Exportar/Importar`,icone:V.exportar,render:()=>Ra.render(),aposRender:()=>Ra.aposRenderizar()}}}montarSidebar(){let e=document.getElementById(`navLista`);e.innerHTML=``;let t=document.getElementById(`sidebar`)?.classList.contains(`colapsada`);Pi.forEach(n=>{let r=n.rotas.filter(e=>!this.rotas[e]?.oculta);if(r.length!==0){if(n.titulo&&!t){let t=document.createElement(`li`);t.className=`nav-separador`,t.textContent=n.titulo,e.appendChild(t)}r.forEach(t=>{let n=this.rotas[t],r=document.createElement(`li`);r.className=`nav-item`+(t===this.viewAtual?` ativo`:``),r.dataset.rota=t,r.innerHTML=`<span class="icone">${n.icone}</span><span class="rotulo">${n.rotulo}</span>`,r.addEventListener(`click`,()=>this.navegar(t)),e.appendChild(r)})}})}navegar(e){if(!this.rotas[e])return;this.viewAtual=e,document.querySelectorAll(`.nav-item`).forEach(t=>{t.classList.toggle(`ativo`,t.dataset.rota===e)}),this.container.style.opacity=`0`,this.container.style.transform=`translateY(4px)`,this.container.innerHTML=this.rotas[e].render(),typeof this.rotas[e].aposRender==`function`&&this.rotas[e].aposRender(),requestAnimationFrame(()=>{this.container.style.opacity=`1`,this.container.style.transform=`translateY(0)`});let t=document.getElementById(`breadcrumbAtual`);t&&(t.textContent=this.rotas[e].rotulo),window.innerWidth<=860&&document.getElementById(`sidebar`).classList.add(`colapsada`),this.container.scrollTop=0}inicializar(){this.montarSidebar(),this.navegar(`dashboard`)}},H=class e{constructor(t,n){if(new.target===e)throw Error(`BaseView não pode ser instanciada diretamente`);this.dataStore=t,this.router=n,this._bindCache={},this._eventoCleanups=[]}_escutarEvento(e,t){let n=Z.on(e,t);this._eventoCleanups.push(n)}removerListeners(){Object.values(this._bindCache).forEach(({el:e,handler:t,type:n})=>{try{e.removeEventListener(n,t)}catch(e){console.warn(e)}}),this._bindCache={},this._eventoCleanups.forEach(e=>{try{e()}catch(e){console.warn(e)}}),this._eventoCleanups=[]}rerenderizar(e=!1){let t=document.getElementById(`viewPrincipal`);if(!t)return;let n=e?document.activeElement.id:null;if(this.removerListeners(),t.innerHTML=this.render(),this.aposRenderizar(),n){let e=document.getElementById(n);if(e){e.focus();let t=e.value;e.value=``,e.value=t}}}destruir(){this.removerListeners()}render(){return``}aposRenderizar(){this.removerListeners()}},Ii=class extends H{constructor(e,t){super(e,t),this.charts={},this.widgetOrdem=this.carregarOrdemWidgets(),this.widgetsDisponiveis=[{id:`producao`,rotulo:`Produção Mensal`,icone:`<i class="fas fa-chart-line"></i>`,visivel:!0},{id:`tecnicas`,rotulo:`Técnicas`,icone:`<i class="fas fa-palette"></i>`,visivel:!0},{id:`receita`,rotulo:`Receita`,icone:`<i class="fas fa-dollar-sign"></i>`,visivel:!0},{id:`previsao`,rotulo:`Previsão de Faturamento`,icone:`🔮`,visivel:!0},{id:`notificacoes`,rotulo:`Notificações Inteligentes`,icone:`<i class="fas fa-bell"></i>`,visivel:!0},{id:`metas`,rotulo:`Metas Financeiras`,icone:`<i class="fas fa-bullseye"></i>`,visivel:!0},{id:`recentes`,rotulo:`Obras Recentes`,icone:`<i class="fas fa-images"></i>`,visivel:!0},{id:`atividades`,rotulo:`Atividades`,icone:`<i class="fas fa-clipboard"></i>`,visivel:!0},{id:`dica`,rotulo:`Dica do Dia`,icone:`<i class="fas fa-lightbulb"></i>`,visivel:!0}]}carregarOrdemWidgets(){try{let e=localStorage.getItem(`atelier_dashboard_widgets`);return e?JSON.parse(e):null}catch{return null}}salvarOrdemWidgets(){localStorage.setItem(`atelier_dashboard_widgets`,JSON.stringify(this.widgetOrdem))}obterWidgetsOrdenados(){let e=this.widgetsDisponiveis.filter(e=>e.visivel).map(e=>e.id);if(!this.widgetOrdem||this.widgetOrdem.length===0)return e;let t=this.widgetOrdem.filter(t=>e.includes(t)),n=e.filter(e=>!this.widgetOrdem.includes(e));return[...t,...n]}render(){let e=W().items,t=K().items,n=G().items;this.dataStore.listar(`materiais`),this.dataStore.listar(`eventos`);let r=e.filter(e=>e.status===`vendida`),i=e.filter(e=>e.status!==`vendida`).reduce((e,t)=>e+(Number(t.preco)||0),0),a=t.reduce((e,t)=>e+(Number(t.valorTotal||t.valor)||0),0),o=t.length>0?a/t.length:0,s=_r(e),c=e.filter(e=>e.favorita).length,l=new Date,u=l.getMonth(),d=l.getFullYear(),f=u===0?11:u-1,p=u===0?d-1:d,m=t.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===u&&t.getFullYear()===d}),h=t.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===f&&t.getFullYear()===p}),g=m.reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0),_=h.reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0),v=_>0?(g-_)/_*100:0,y=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===u&&t.getFullYear()===d}).length,b=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===f&&t.getFullYear()===p}).length,ee=b>0?(y-b)/b*100:0,te=[{rotulo:`Total de Obras`,valor:e.length,tendencia:s,icone:`<i class="fas fa-images"></i>`,cor:`#2563eb`,sparkline:this.gerarSparkline(e,`criacao`),variacao:e.length>0?ee:null},{rotulo:`Obras Vendidas`,valor:r.length,sub:`${e.length>0?(r.length/e.length*100).toFixed(1):0}% do total`,icone:`<i class="fas fa-check"></i>`,cor:`#16a34a`,sparkline:``},{rotulo:`Valor do Acervo`,valor:O(i),valorNum:i,sub:`Ticket médio: ${O(o)}`,icone:`<i class="fas fa-dollar-sign"></i>`,cor:`#d97706`,sparkline:``},{rotulo:`Total Vendido`,valor:O(a),valorNum:a,sub:`${g>0?O(g)+` este mês`:t.length+` venda(s)`}`,icone:`<i class="fas fa-chart-bar"></i>`,cor:`#7c3aed`,sparkline:this.gerarSparkline(t,`receita`),variacao:v},{rotulo:`Clientes`,valor:n.length,sub:`${this.contarClientesAtivos(n)} ativos`,icone:`👥`,cor:`#0891b2`,sparkline:``},{rotulo:`Favoritas`,valor:c,sub:`<i class="fas fa-star"></i> obras marcadas`,icone:`<i class="fas fa-star"></i>`,cor:`#dc2626`,sparkline:``}],x=this.obterWidgetsOrdenados();return this.widgetOrdem,`
      <div class="view-cabecalho">
        <div>
          <h2>Dashboard</h2>
          <p class="subtitulo">Visão geral do seu ateliê · ${l.toLocaleDateString(`pt-BR`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`})}</p>
        </div>
        <div class="dashboard-acoes">
          <button class="btn-gradient" id="btnDownloadDashboard" title="Baixar dashboard como imagem"><i class="fas fa-camera"></i> Exportar</button>
           <button class="btn-secundario" id="btnConfigWidgets" title="Configurar widgets" aria-label="Configurar widgets">⚙️</button>
           <button class="btn-secundario" id="btnAtualizarDashboard" title="Atualizar dados" aria-label="Atualizar dados"><i class="fas fa-sync"></i></button>
        </div>
      </div>

      <div class="kpi-grid stagger-in">
        ${te.map(e=>`
          <div class="kpi-card" style="--kpi-cor: ${e.cor}">
            <div class="kpi-icone">${e.icone}</div>
            <div class="kpi-conteudo">
              <div class="kpi-rotulo">${e.rotulo}</div>
              <div class="kpi-valor" data-contador="${e.valorNum??(typeof e.valor==`number`?e.valor:``)}" data-contador-tipo="${typeof e.valor==`number`?`num`:e.valorNum==null?``:`moeda`}">${e.valor}</div>
              ${e.sub?`<div class="kpi-sub">${e.sub}</div>`:``}
              ${e.variacao!==null&&e.variacao!==void 0?`<div class="kpi-variacao ${e.variacao>=0?`positiva`:`negativa`}">${e.variacao>=0?`↑`:`↓`} ${Math.abs(e.variacao).toFixed(1)}% vs mês anterior</div>`:``}
            </div>
            ${e.sparkline?`<div class="kpi-sparkline">${e.sparkline}</div>`:``}
          </div>
        `).join(``)}
      </div>

      <div class="widgets-toolbar">
        <span class="widgets-toolbar-dica"><i class="fas fa-lightbulb"></i> Arraste os widgets para reordenar. Clique em ⚙️ para mostrar/ocultar.</span>
      </div>

      <div class="widgets-grid" id="widgetsGrid">
        ${x.map(e=>{let t=this.widgetsDisponiveis.find(t=>t.id===e);return t?`
            <div class="widget-card glass-premium" data-widget="${e}" draggable="true">
              <div class="widget-header">
                <span class="widget-drag-handle">⠿</span>
                <h3 class="widget-titulo">${t.icone} ${t.rotulo}</h3>
              </div>
              <div class="widget-body" id="widgetBody_${e}">
                ${this.renderizarWidget(e)}
              </div>
            </div>
          `:``}).join(``)}
      </div>

      <div class="painel atalhos-rodape">
        <h3>⚡ Atalhos rápidos</h3>
        <div class="atalhos-rapidos">
          <button class="btn-gradient" id="btnAtalhoNovaObra">✚ Nova Obra</button>
          <button class="btn-ghost" id="btnAtalhoVenda">✚ Nova Venda</button>
          <button class="btn-ghost" id="btnAtalhoRecibo">🧾 Gerar Recibo</button>
          <button class="btn-ghost" id="btnAtalhoClientes"><i class="fas fa-user"></i> Gerenciar Clientes</button>
        </div>
      </div>

      ${this.renderModalConfig()}
    `}renderizarWidget(e){switch(e){case`producao`:return this.renderWidgetProducao();case`tecnicas`:return this.renderWidgetTecnicas();case`receita`:return this.renderWidgetReceita();case`previsao`:return this.renderWidgetPrevisao();case`notificacoes`:return this.renderWidgetNotificacoes();case`metas`:return this.renderWidgetMetas();case`recentes`:return this.renderWidgetRecentes();case`atividades`:return this.renderWidgetAtividades();case`dica`:return this.renderWidgetDica();default:return`<p>Widget não encontrado.</p>`}}renderModalConfig(){return`
      <div class="widget-config-overlay" id="widgetConfigOverlay" style="display:none">
        <div class="widget-config-modal">
          <h3>⚙️ Configurar Widgets</h3>
          <p class="texto-ajuda">Marque/desmarque os widgets para mostrar no dashboard. Arraste para reordenar.</p>
          <div class="widget-config-lista" id="widgetConfigLista">
            ${this.widgetsDisponiveis.map(e=>`
              <label class="widget-config-item">
                <input type="checkbox" data-wconfig="${e.id}" ${e.visivel?`checked`:``}>
                <span>${e.icone} ${e.rotulo}</span>
              </label>
            `).join(``)}
          </div>
          <div class="modal-acoes">
            <button class="btn-secundario" id="btnFecharConfigWidgets">Fechar</button>
            <button class="btn-primario" id="btnSalvarConfigWidgets">Salvar</button>
          </div>
        </div>
      </div>
    `}gerarSparkline(e,t){if(!e||e.length===0)return``;let n=[],r=new Date;for(let i=5;i>=0;i--){let a=new Date(r.getFullYear(),r.getMonth()-i,1),o=e.filter(e=>{let n=new Date(e.dataCadastro||e.criadoEm||e.data||e.dataVenda);return t===`receita`?n.getMonth()===a.getMonth()&&n.getFullYear()===a.getFullYear()&&n<=r:n.getMonth()===a.getMonth()&&n.getFullYear()===a.getFullYear()}).length;if(t===`receita`){let t=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm||e.data||e.dataVenda);return t.getMonth()===a.getMonth()&&t.getFullYear()===a.getFullYear()&&t<=r}).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0);n.push(t)}else n.push(o)}if(n.every(e=>e===0))return``;let i=Math.max(...n,1);return`<svg width="80" height="30" viewBox="0 0 80 30"><polyline fill="none" stroke="var(--kpi-cor)" stroke-width="2" points="${n.map((e,t)=>`${t/(n.length-1)*80},${30-e/i*30}`).join(` `)}"/></svg>`}contarClientesAtivos(e){let t=new Date;return t.setMonth(t.getMonth()-3),e.filter(e=>e.criadoEm&&new Date(e.criadoEm)>=t).length}renderWidgetProducao(){return`<canvas id="chartProducao" height="180"></canvas>`}renderWidgetTecnicas(){return`<canvas id="chartTecnicas" height="180"></canvas>`}renderWidgetReceita(){return`<canvas id="chartReceita" height="180"></canvas>`}renderWidgetPrevisao(){let e=K().items,t=this.calcularPrevisao(e);return`
      <div class="previsao-container">
        <div class="previsao-valor-atual">
          <span class="previsao-rotulo">Faturamento nos últimos 6 meses</span>
          <span class="previsao-numero">${O(t.total6M)}</span>
        </div>
        <div class="previsao-barra-container">
          <div class="previsao-barra-item">
            <span>Média mensal</span>
            <span class="previsao-numero-peq">${O(t.mediaMensal)}</span>
          </div>
          <div class="previsao-barra-item">
            <span>Projeção próximos 6 meses</span>
            <span class="previsao-numero-peq ${t.tendencia>0?`positiva`:`negativa`}">${O(Math.abs(t.projecao6M))} ${t.tendencia>0?`<i class="fas fa-chart-line"></i>`:`📉`}</span>
          </div>
        </div>
        <div class="previsao-detalhe">
          <span class="texto-ajuda">Baseado em regressão linear simples sobre os últimos meses</span>
          ${t.tendencia>0?`<span class="tag-status disponivel">Tendência positiva <i class="fas fa-chart-line"></i></span>`:`<span class="tag-status vendida">Tendência negativa 📉</span>`}
        </div>
        <canvas id="chartPrevisao" height="120"></canvas>
      </div>
    `}calcularPrevisao(e){let t=[],n=new Date;for(let r=5;r>=0;r--){let i=new Date(n.getFullYear(),n.getMonth()-r,1),a=e.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0);t.push({mes:i,total:a})}let r=t.reduce((e,t)=>e+t.total,0),i=r/t.length,a=t.length,o=(a-1)/2,s=r/a,c=0,l=0;t.forEach((e,t)=>{c+=(t-o)*(e.total-s),l+=(t-o)*(t-o)});let u=l===0?0:c/l,d=s-u*o,f=0;for(let e=0;e<6;e++)f+=Math.max(0,u*(a+e)+d);return{total6M:r,mediaMensal:i,inclinacao:u,intercept:d,projecao6M:f,tendencia:u,meses:t}}renderWidgetNotificacoes(){let e=this.dataStore.listar(`materiais`),t=G().items,n=this.dataStore.listar(`eventos`),r=W().items,i=new Date,a=[];return e.forEach(e=>{e.quantidade<=e.quantidadeMinima&&a.push({tipo:`estoque`,gravidade:e.quantidade<=(e.quantidadeMinima||0)/2?`alta`:`media`,icone:`<i class="fas fa-exclamation-triangle"></i>`,mensagem:`"${e.nome}" está com estoque crítico (${e.quantidade} ${e.unidade||`un`})`,acao:`Ir para Atelier`,rota:`atelier`})}),t.forEach(e=>{if(e.ultimoContato||e.criadoEm){let t=e.ultimoContato||e.criadoEm,n=Math.floor((i-new Date(t))/864e5);n>60&&a.push({tipo:`cliente`,gravidade:n>180?`alta`:`media`,icone:`<i class="fas fa-user"></i>`,mensagem:`"${e.nome}" sem contato há ${n} dias`,acao:`Ver cliente`,rota:`clientes`})}}),n.forEach(e=>{if(e.dataEvento){let t=Math.floor((new Date(e.dataEvento)-i)/864e5);t>0&&t<=60&&a.push({tipo:`evento`,gravidade:t<=15?`alta`:`media`,icone:`<i class="fas fa-calendar-alt"></i>`,mensagem:`"${e.nome}" em ${t} dias (${e.status})`,acao:`Ver eventos`,rota:`exposicoes`})}}),r.forEach(e=>{if(e.historicoPrecos&&e.historicoPrecos.length>1){let t=e.historicoPrecos[e.historicoPrecos.length-1],n=e.historicoPrecos[e.historicoPrecos.length-2];t.preco<n.preco&&a.push({tipo:`preco`,gravidade:`media`,icone:`<i class="fas fa-tag"></i>`,mensagem:`"${e.titulo}" teve redução de preço (${O(n.preco)} → ${O(t.preco)})`,acao:`Ver obra`,rota:`catalogo`})}}),a.length===0?`<div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-check"></i></div><p>Tudo em ordem! Nenhuma notificação pendente.</p></div>`:`
      <div class="notificacoes-lista">
        ${a.sort((e,t)=>e.gravidade===`alta`?-1:1).slice(0,8).map(e=>`
          <div class="notificacao-item notificacao-${e.gravidade}">
            <span class="notificacao-icone">${e.icone}</span>
            <span class="notificacao-msg">${e.mensagem}</span>
            <button class="btn-miniatura notificacao-acao" data-rota="${e.rota}">${e.acao}</button>
          </div>
        `).join(``)}
        ${a.length>8?`<p class="texto-ajuda">+${a.length-8} notificações</p>`:``}
      </div>
    `}renderWidgetMetas(){let e=q().precificador||{},t=e.metaMensal||1e4,n=e.metaAnual||12e4,r=K().items,i=new Date,a=r.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0),o=r.filter(e=>new Date(e.dataVenda||e.data||e.criadoEm).getFullYear()===i.getFullYear()).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0),s=Math.min(100,a/t*100),c=Math.min(100,o/n*100),l=new Date(i.getFullYear(),i.getMonth()+1,0).getDate()-i.getDate()+1,u=l>0?Math.max(0,(t-a)/l):0;return`
      <div class="metas-container">
        <div class="meta-card">
          <div class="meta-header">
            <span>Meta Mensal</span>
            <span>${O(a)} / ${O(t)}</span>
          </div>
          <div class="meta-barra"><div class="meta-barra-preenchimento" style="width:${s}%"></div></div>
          <div class="meta-footer">
            <span>${s.toFixed(1)}% concluído</span>
            <span class="${s>=100?`positiva`:``}">${s>=100?`<i class="fas fa-check"></i> Meta atingida!`:`Faltam ${O(t-a)}`}</span>
          </div>
          ${s<100?`<div class="meta-diaria"><i class="fas fa-bullseye"></i> Meta diária necessária: ${O(u)}/dia (${l} dias restantes)</div>`:``}
        </div>
        <div class="meta-card">
          <div class="meta-header">
            <span>Meta Anual</span>
            <span>${O(o)} / ${O(n)}</span>
          </div>
          <div class="meta-barra"><div class="meta-barra-preenchimento anual" style="width:${c}%"></div></div>
          <div class="meta-footer">
            <span>${c.toFixed(1)}% concluído</span>
            <span class="${c>=100?`positiva`:``}">${c>=100?`<i class="fas fa-check"></i> Parabéns!`:`Faltam ${O(n-o)}`}</span>
          </div>
        </div>
      </div>
    `}renderWidgetRecentes(){let e=[...W().items].sort((e,t)=>new Date(t.dataCadastro||t.criadoEm)-new Date(e.dataCadastro||e.criadoEm)).slice(0,5);return e.length===0?`<div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-images"></i></div><p>Nenhuma obra cadastrada ainda.</p></div>`:`
      <ul class="lista-obras-recentes stagger-in">
        ${e.map(e=>{let t=e.imagemDestacada||e.imagens&&e.imagens[0]||e.imagem||``;return`
            <li class="item-obra-recente">
              <div class="thumb-obra">${t?`<img src="${t}" alt="${e.titulo}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`:`<i class="fas fa-images"></i>`}</div>
              <div class="info-obra-recente">
                <div class="nome">${e.titulo}</div>
                <div class="meta">${e.tecnica||``} · ${k(e.dataCadastro||e.criadoEm)}</div>
              </div>
              <span class="tag-status ${F(e.status)}">${pr(e.status)}</span>
            </li>
          `}).join(``)}
      </ul>
    `}renderWidgetAtividades(){let e=Q.obterRecentes(8);return e.length===0?`<div class="estado-vazio"><p>Nenhuma atividade registrada ainda.</p></div>`:`
      <div class="activity-feed">
        ${e.map(e=>`
          <div class="activity-item">
            <div class="activity-icone">${Q.obterIcone(e.tipo)}</div>
            <div class="activity-detalhes">
              <div class="activity-titulo">${e.titulo} <span class="activity-badge ${e.badge}">${e.badge}</span></div>
              <div class="activity-tempo">${Q.formatarTempo(new Date(e.timestamp))}</div>
            </div>
          </div>
        `).join(``)}
      </div>
    `}renderWidgetDica(){return`<div class="dica-card"><div class="dica-icone"><i class="fas fa-lightbulb"></i></div><div class="dica-texto"><p>${vi()||`Reserve 15 minutos ao final do dia para registrar seu progresso no Diário Criativo.`}</p><span class="texto-ajuda">Dica do dia · Atualiza automaticamente</span></div></div>`}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`);document.getElementById(`btnAtualizarDashboard`)?.addEventListener(`click`,()=>this.rerenderizar()),document.getElementById(`btnDownloadDashboard`)?.addEventListener(`click`,()=>{if(typeof html2canvas>`u`){A(`Biblioteca de captura indisponível.`,`erro`);return}A(`Gerando imagem do dashboard...`,`info`);let e=document.getElementById(`viewPrincipal`).querySelector(`.kpi-grid`)?.parentElement||document.getElementById(`viewPrincipal`);html2canvas(e,{backgroundColor:getComputedStyle(document.body).getPropertyValue(`--bg`).trim()||`#ffffff`,scale:2,useCORS:!0,logging:!1}).then(e=>{let t=document.createElement(`a`);t.download=`dashboard-${new Date().toISOString().slice(0,10)}.png`,t.href=e.toDataURL(`image/png`),t.click(),A(`Dashboard exportado!`,`sucesso`)}).catch(()=>A(`Erro ao gerar imagem.`,`erro`))}),document.getElementById(`btnAtalhoNovaObra`)?.addEventListener(`click`,()=>{this.router.navegar(`catalogo`),setTimeout(()=>Z.emitir(`abrir-nova-obra`),200)}),document.getElementById(`btnAtalhoVenda`)?.addEventListener(`click`,()=>{this.router.navegar(`vendas`),setTimeout(()=>Z.emitir(`abrir-nova-venda`),200)}),document.getElementById(`btnAtalhoRecibo`)?.addEventListener(`click`,()=>Z.emitir(`abrir-recibo-rapido`)),document.getElementById(`btnAtalhoClientes`)?.addEventListener(`click`,()=>this.router.navegar(`clientes`)),e.addEventListener(`click`,e=>{let t=e.target.closest(`.notificacao-acao`);if(t&&t.dataset.rota){this.router.navegar(t.dataset.rota);return}}),this.initDragDrop(),this.initConfigModal(),e.querySelectorAll(`.kpi-valor[data-contador]`).forEach(e=>{let t=Number(e.dataset.contador),n=e.dataset.contadorTipo===`moeda`;isNaN(t)||Er(e,t,n?e=>O(e):void 0)}),typeof Chart>`u`?(document.querySelectorAll(`[id^="chart"]`).forEach(e=>{e.tagName===`CANVAS`&&(e.parentElement.innerHTML=`<div class="skeleton skeleton-quadro" style="height:200px;margin:8px 0"></div>`)}),zr().then(()=>this.initCharts()).catch(()=>{})):this.initCharts()}initCharts(){if(typeof Chart>`u`){document.querySelectorAll(`[id^="chart"]`).forEach(e=>{e.tagName===`CANVAS`&&(e.parentElement.innerHTML=`<p class="texto-ajuda">Gráfico indisponível (Chart.js não carregou).</p>`)});return}Dr(),Object.values(this.charts).forEach(e=>{try{e.destroy()}catch(e){console.warn(e)}}),this.charts={};let e=W().items,t=K().items,n=new Date,r=[`#2563eb`,`#16a34a`,`#d97706`,`#7c3aed`,`#dc2626`,`#0891b2`,`#ca8a04`,`#be185d`],i=document.getElementById(`chartProducao`);if(i){let t=[];for(let r=5;r>=0;r--){let i=new Date(n.getFullYear(),n.getMonth()-r,1),a=e.filter(e=>{let t=new Date(e.dataCadastro||e.criadoEm);return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).length;t.push({rotulo:i.toLocaleDateString(`pt-BR`,{month:`short`}),total:a})}this.charts.producao=new Chart(i.getContext(`2d`),{type:`bar`,data:{labels:t.map(e=>e.rotulo),datasets:[{label:`Obras criadas`,data:t.map(e=>e.total),backgroundColor:r,borderRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{stepSize:1}}}}})}let a=document.getElementById(`chartTecnicas`);if(a){let t={};e.forEach(e=>{e.tecnica&&(t[e.tecnica]=(t[e.tecnica]||0)+1)});let n=Object.keys(t),i=Object.values(t);this.charts.tecnicas=new Chart(a.getContext(`2d`),{type:`doughnut`,data:{labels:n,datasets:[{data:i,backgroundColor:r,borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`right`,labels:{boxWidth:12,padding:8}}}}})}let o=document.getElementById(`chartReceita`);if(o){let e=[];for(let r=5;r>=0;r--){let i=new Date(n.getFullYear(),n.getMonth()-r,1),a=t.filter(e=>{let t=new Date(e.dataVenda||e.data||e.criadoEm);return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).reduce((e,t)=>e+Number(t.valorTotal||t.valor||0),0);e.push({rotulo:i.toLocaleDateString(`pt-BR`,{month:`short`}),total:a})}this.charts.receita=new Chart(o.getContext(`2d`),{type:`line`,data:{labels:e.map(e=>e.rotulo),datasets:[{label:`Receita`,data:e.map(e=>e.total),borderColor:`#16a34a`,backgroundColor:`rgba(22,163,74,0.1)`,fill:!0,tension:.4,pointRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{callback:e=>`R$`+e.toLocaleString(`pt-BR`)}}}}})}let s=document.getElementById(`chartPrevisao`);if(s){let e=this.calcularPrevisao(t),n=e.meses.map(e=>e.mes.toLocaleDateString(`pt-BR`,{month:`short`})),r=e.meses.map(e=>e.total),i=[];for(let t=0;t<6;t++)i.push(Math.max(0,e.inclinacao*(e.meses.length+t)+e.intercept));let a=[...n,...Array.from({length:6},(e,t)=>`+${t+1}m`)];this.charts.previsao=new Chart(s.getContext(`2d`),{type:`line`,data:{labels:a,datasets:[{label:`Realizado`,data:[...r,...[,,,,,,].fill(null)],borderColor:`#2563eb`,backgroundColor:`rgba(37,99,235,0.1)`,fill:!0,tension:.4,pointRadius:4},{label:`Projetado`,data:[...Array(n.length).fill(null),...i],borderColor:`#d97706`,borderDash:[5,5],tension:.4,pointRadius:3,pointStyle:`circle`}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{boxWidth:12,padding:8}}},scales:{y:{beginAtZero:!0,ticks:{callback:e=>`R$`+Math.round(e).toLocaleString(`pt-BR`)}}}}})}}initDragDrop(){let e=document.getElementById(`widgetsGrid`);if(!e)return;let t=null;e.addEventListener(`dragstart`,e=>{let n=e.target.closest(`.widget-card`);n&&(t=n,n.classList.add(`dragging`),e.dataTransfer.effectAllowed=`move`)}),e.addEventListener(`dragend`,e=>{let n=e.target.closest(`.widget-card`);n&&n.classList.remove(`dragging`),t=null}),e.addEventListener(`dragover`,n=>{n.preventDefault();let r=n.target.closest(`.widget-card`);if(!r||r===t)return;let i=r.getBoundingClientRect(),a=i.top+i.height/2;n.clientY<a?e.insertBefore(t,r):e.insertBefore(t,r.nextSibling)}),e.addEventListener(`drop`,t=>{t.preventDefault();let n=Array.from(e.querySelectorAll(`.widget-card`)).map(e=>e.dataset.widget);this.widgetOrdem=n,this.salvarOrdemWidgets()})}initConfigModal(){let e=document.getElementById(`btnConfigWidgets`),t=document.getElementById(`widgetConfigOverlay`);!e||!t||(e.addEventListener(`click`,()=>{t.style.display=`flex`}),document.getElementById(`btnFecharConfigWidgets`)?.addEventListener(`click`,()=>{t.style.display=`none`}),document.getElementById(`btnSalvarConfigWidgets`)?.addEventListener(`click`,()=>{t.querySelectorAll(`input[type="checkbox"]`).forEach(e=>{let t=this.widgetsDisponiveis.find(t=>t.id===e.dataset.wconfig);t&&(t.visivel=e.checked)}),this.salvarOrdemWidgets(),t.style.display=`none`,this.rerenderizar()}),t.addEventListener(`click`,e=>{e.target===t&&(t.style.display=`none`)}))}destruir(){Object.values(this.charts).forEach(e=>{try{e.destroy()}catch(e){console.warn(e)}}),this.charts={},super.destruir()}},Li=class extends H{constructor(e,t){super(e,t),this.modo=`grid`,this.filtros={busca:``,tecnica:``,status:``,ano:``,precoMin:``,precoMax:``,ordenar:`recentes`},this.filtroRapido=``,this.filtrosSalvos=[],this.selecionados=new Set,this.imagensFormAtual=[],this.imagensRefAtual=[],this.imagemDestacadaAtual=null,this.imagemDestacadaRef=``,this.modoComparacao=!1,this.idsComparacao=[],this._skeletonAtivo=!1,this._escutarEvento(`abrir-nova-obra`,()=>this.abrirFormulario())}obrasFiltradas(){let e=this.filtros,t=W().items;if(e.busca){let n=e.busca.toLowerCase();t=t.filter(e=>(e.titulo||``).toLowerCase().includes(n)||(e.descricao||``).toLowerCase().includes(n)||(e.serie||``).toLowerCase().includes(n))}return e.tecnica&&(t=t.filter(t=>t.tecnica===e.tecnica)),e.status&&(t=t.filter(t=>F(t.status)===F(e.status))),e.ano&&(t=t.filter(t=>String(t.ano)===String(e.ano))),e.precoMin!==``&&(t=t.filter(t=>Number(t.preco||0)>=Number(e.precoMin))),e.precoMax!==``&&(t=t.filter(t=>Number(t.preco||0)<=Number(e.precoMax))),this.filtroRapido===`favoritas`&&(t=t.filter(e=>e.favorita)),[...t].sort((e,t)=>new Date(t.dataCadastro||t.criadoEm||0)-new Date(e.dataCadastro||e.criadoEm||0))}anosDisponiveis(){return[...new Set(W().items.map(e=>e.ano).filter(Boolean))].sort((e,t)=>t-e)}render(){let e=this.obrasFiltradas(),t=this.anosDisponiveis(),n=this._skeletonAtivo&&this.modo===`grid`?this.renderSkeletonGrid():e.length?this.modo===`grid`?this.renderGrid(e):this.renderLista(e):this.renderEstadoVazio(),r=Object.entries(this.filtros).filter(([e,t])=>t!==``&&e!==`ordenar`).length+ +!!this.filtroRapido;return`
      <div class="view-cabecalho">
        <div>
          <h2>Catálogo de Obras</h2>
          <p class="subtitulo">${e.length} obra${e.length===1?``:`s`} encontrada${e.length===1?``:`s`}${r>0?`<span class="filtros-ativo-badge">· ${r} filtro${r>1?`s`:``} ativo${r>1?`s`:``}</span>`:``}</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAll" aria-label="Selecionar todas as obras" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAll">Selecionar todos</label>
          </div>
          <button class="btn-secundario" id="btnComparar" title="Comparar obras selecionadas" ${this.selecionados.size<2?`disabled`:``}><i class="fas fa-chart-bar"></i> Comparar</button>
          <button class="btn-secundario" id="btnImportacaoLote" title="Importar múltiplas obras"><i class="fas fa-camera"></i> Importar</button>
          <div class="toggle-visualizacao">
            <button id="btnModoGrid" class="${this.modo===`grid`?`ativo`:``}" title="Visualização em grid">☰ Grid</button>
            <button id="btnModoLista" class="${this.modo===`lista`?`ativo`:``}" title="Visualização em lista">☰ Lista</button>
          </div>
        </div>
      </div>

      ${this.selecionados.size>0?this.renderBarraBulk():``}

      ${this.renderFiltros(t)}

      <div class="catalogo-acoes-rapidas">
        <button class="btn-ghost" id="btnNovaObraRapida"><i class="fas fa-plus"></i> Nova Obra</button>
        <button class="btn-ghost" id="btnSlideshowTodas">▶ Slideshow Geral</button>
        <button class="btn-ghost" id="btnExportarTodas">📥 Exportar Tudo</button>
      </div>

      ${n}

      <button class="fab-nova-obra" id="fabNovaObra" title="Nova Obra" aria-label="Nova Obra"><i class="fas fa-plus"></i></button>
    `}renderEstadoVazio(){return`
      <div class="tabela-wrapper">
        <div class="estado-vazio">
          <div class="icone-vazio"><i class="fas fa-images"></i></div>
          <p>Nenhuma obra encontrada com os filtros atuais.</p>
          <p class="texto-ajuda">Tente limpar os filtros ou cadastrar uma nova obra.</p>
        </div>
      </div>
    `}renderBarraBulk(){return`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} obra${this.selecionados.size===1?``:`s`} selecionada${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkMarcarFavorita"><i class="fas fa-star"></i> Favoritar</button>
          <button class="btn-secundario" id="bulkDesmarcarFavorita">☆ Desfavoritar</button>
          <button class="btn-secundario" id="bulkMudarStatus"><i class="fas fa-pencil-alt"></i> Mudar Status</button>
          <button class="btn-secundario" id="bulkExportar"><i class="fas fa-chart-bar"></i> Exportar</button>
          <button class="btn-secundario" id="bulkExportarPDF"><i class="fas fa-file"></i> Catálogo PDF</button>
          <button class="btn-secundario btn-danger" id="bulkExcluir">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelar">✕ Cancelar</button>
        </div>
      </div>
    `}renderFiltros(e){return`
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="filtroBusca" placeholder="Título, descrição, série..." value="${this.filtros.busca}" data-tooltip="Busca inteligente: título, descrição, série">
        </div>
        <div class="campo-filtro">
          <label>Técnica</label>
          <select id="filtroTecnica">
            <option value="">Todas</option>
            <option value="óleo" ${this.filtros.tecnica===`óleo`?`selected`:``}>Óleo</option>
            <option value="aquarela" ${this.filtros.tecnica===`aquarela`?`selected`:``}>Aquarela</option>
            <option value="escultura" ${this.filtros.tecnica===`escultura`?`selected`:``}>Escultura</option>
            <option value="outra" ${this.filtros.tecnica===`outra`?`selected`:``}>Outra</option>
          </select>
        </div>
        <div class="campo-filtro">
          <label>Status</label>
          <select id="filtroStatus">
            <option value="">Todos</option>
            <option value="disponível" ${this.filtros.status===`disponível`?`selected`:``}>Disponível</option>
            <option value="reservada" ${this.filtros.status===`reservada`?`selected`:``}>Reservada</option>
            <option value="vendida" ${this.filtros.status===`vendida`?`selected`:``}>Vendida</option>
            <option value="em exposição" ${this.filtros.status===`em exposição`?`selected`:``}>Em Exposição</option>
          </select>
        </div>
        <div class="campo-filtro">
          <label>Ano</label>
          <select id="filtroAno">
            <option value="">Todos</option>
            ${e.map(e=>`<option value="${e}" ${String(this.filtros.ano)===String(e)?`selected`:``}>${e}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Faixa de preço (R$)</label>
          <div class="faixa-preco">
            <input type="number" id="filtroPrecoMin" placeholder="Mín." aria-label="Preço mínimo" value="${this.filtros.precoMin}">
            <span>—</span>
            <input type="number" id="filtroPrecoMax" placeholder="Máx." aria-label="Preço máximo" value="${this.filtros.precoMax}">
          </div>
        </div>
        <div class="campo-filtro">
          <label>Ordenar por</label>
          <select id="filtroOrdenar">
            <option value="recentes" ${this.filtros.ordenar===`recentes`?`selected`:``}>Mais recentes</option>
            <option value="antigas" ${this.filtros.ordenar===`antigas`?`selected`:``}>Mais antigas</option>
            <option value="preco-asc" ${this.filtros.ordenar===`preco-asc`?`selected`:``}>Preço: menor → maior</option>
            <option value="preco-desc" ${this.filtros.ordenar===`preco-desc`?`selected`:``}>Preço: maior → menor</option>
            <option value="titulo" ${this.filtros.ordenar===`titulo`?`selected`:``}>Título A-Z</option>
            <option value="ano-desc" ${this.filtros.ordenar===`ano-desc`?`selected`:``}>Ano: mais recente</option>
          </select>
        </div>
        <button class="btn-secundario" id="btnLimparFiltros">Limpar filtros</button>
        <button class="btn-secundario" id="btnSalvarFiltro" title="Salvar filtro atual"><i class="fas fa-save"></i> Salvar</button>
      </div>

      <div class="filtros-rapidos">
        <span class="rotulo-filtros">Filtros rápidos:</span>
        <button class="chip-filtro ${this.filtroRapido===`disponiveis`?`ativo`:``}" data-filtro="disponiveis">🟢 Disponíveis</button>
        <button class="chip-filtro ${this.filtroRapido===`vendidas`?`ativo`:``}" data-filtro="vendidas">🟡 Vendidas</button>
        <button class="chip-filtro ${this.filtroRapido===`recentes`?`ativo`:``}" data-filtro="recentes"><i class="fas fa-calendar-alt"></i> Este mês</button>
        <button class="chip-filtro ${this.filtroRapido===`favoritas`?`ativo`:``}" data-filtro="favoritas"><i class="fas fa-star"></i> Favoritas</button>
      </div>

      ${this.filtrosSalvos.length>0?`
      <div class="filtros-salvos">
        <span class="rotulo-filtros">Filtros salvos:</span>
        ${this.filtrosSalvos.map((e,t)=>`
          <button class="chip-filtro-salvo" data-indice="${t}" title="${e.descricao}">${e.nome}</button>
        `).join(``)}
      </div>
      `:``}
    `}renderSkeletonGrid(){return`<div class="sk-grid">${Array.from({length:8},(e,t)=>`
      <div class="sk-card-obra">
        <div class="sk-shimmer sk-imagem" style="animation-delay:${t*.05}s"></div>
        <div class="sk-shimmer sk-linha" style="width:70%;animation-delay:${t*.05}s"></div>
        <div class="sk-shimmer sk-linha" style="width:50%;animation-delay:${t*.05}s"></div>
      </div>
    `).join(``)}</div>`}_rerenderizarComSkeleton(){if(this.modo!==`grid`){this.rerenderizar(!0);return}this._skeletonAtivo=!0,this.rerenderizar(!0),setTimeout(()=>{this._skeletonAtivo=!1,this.rerenderizar(!0)},150)}renderGrid(e){return`
      <div class="grid-obras stagger-in">
        ${e.map(e=>`
          <div class="card-obra ${e.favorita?`favorita`:``} ${this.selecionados.has(e.id)?`selecionada`:``}">
            <div class="checkbox-bulk">
              <input type="checkbox" class="checkbox-item" data-id="${e.id}" aria-label="Selecionar ${e.titulo||`obra`}" ${this.selecionados.has(e.id)?`checked`:``}>
            </div>
            ${e.favorita?`<div class="badge-favorita"><i class="fas fa-star"></i></div>`:``}
            <div class="imagem-card-wrapper" data-abrir-ficha="${e.id}">
              <img class="imagem-obra lazy-img idb-placeholder" src="${this.obterImagem(e)}" alt="${e.titulo}" loading="lazy"${this.imgDataIdb(e)}>
              ${e.imagens&&e.imagens.length>1?`<span class="badge-multiplas-imagens">+${e.imagens.length}</span>`:``}
              <button class="btn-slideshow-card" data-slideshow="${e.id}" title="Ver galeria" aria-label="Ver galeria ${e.titulo}">▶</button>
            </div>
            <div class="corpo-card-obra" data-abrir-ficha="${e.id}">
              <div class="titulo-obra">${e.titulo}</div>
              <div class="meta-obra">${L(e.tecnica)} · ${this.formatarDimensoes(e.dimensoes)}</div>
              <div class="rodape-card-obra">
                <span class="preco-obra">${O(e.preco)}</span>
                <span class="tag-status ${F(e.status)}">${pr(e.status)}</span>
              </div>
            </div>
            <div class="acoes-card-obra">
              <button data-favoritar-obra="${e.id}" title="${e.favorita?`Remover favorita`:`Marcar favorita`}" aria-label="${e.favorita?`Remover favorita`:`Marcar favorita`} ${e.titulo}">${e.favorita?`★`:`☆`}</button>
              <button data-comparar-obra="${e.id}" title="Adicionar à comparação" aria-label="Adicionar ${e.titulo} à comparação"><i class="fas fa-chart-bar"></i></button>
              <button data-editar-obra="${e.id}">✎ Editar</button>
              <button class="btn-excluir-obra" data-excluir-obra="${e.id}">🗑 Excluir</button>
            </div>
          </div>
        `).join(``)}
      </div>
    `}renderLista(e){return`
      <div class="lista-obras-wrapper stagger-in">
        ${e.map(e=>`
          <div class="linha-obra-lista ${e.favorita?`favorita`:``} ${this.selecionados.has(e.id)?`selecionada`:``}">
            <div class="checkbox-bulk-lista">
              <input type="checkbox" class="checkbox-item" data-id="${e.id}" aria-label="Selecionar ${e.titulo||`obra`}" ${this.selecionados.has(e.id)?`checked`:``}>
            </div>
            ${e.favorita?`<span class="icone-favorita-lista"><i class="fas fa-star"></i></span>`:``}
            <img class="thumb-lista lazy-img idb-placeholder" data-abrir-ficha="${e.id}" src="${this.obterImagem(e)}" alt="${e.titulo}" loading="lazy"${this.imgDataIdb(e)}>
            <div class="info-lista" data-abrir-ficha="${e.id}">
              <div class="titulo-obra">${e.titulo}</div>
              <div class="meta-obra">${L(e.tecnica)} · ${this.formatarDimensoes(e.dimensoes)} · ${e.ano||`-`}</div>
            </div>
            <span class="tag-status ${F(e.status)}">${pr(e.status)}</span>
            <span class="preco-lista">${O(e.preco)}</span>
            <div class="acoes-lista">
              <button data-favoritar-obra="${e.id}" title="${e.favorita?`Remover favorita`:`Marcar favorita`}" aria-label="${e.favorita?`Remover favorita`:`Marcar favorita`} ${e.titulo}">${e.favorita?`★`:`☆`}</button>
              <button data-comparar-obra="${e.id}" title="Adicionar à comparação" aria-label="Adicionar ${e.titulo} à comparação"><i class="fas fa-chart-bar"></i></button>
              <button data-editar-obra="${e.id}" aria-label="Editar obra">✎</button>
              <button data-excluir-obra="${e.id}" aria-label="Excluir ${e.titulo}">🗑</button>
            </div>
          </div>
        `).join(``)}
      </div>
    `}obterImagem(e){let t=e.imagemDestacada||e.imagens&&e.imagens[0]||e.imagem||``;return t?t.startsWith(`idb:`)?va:t:I(`#cccccc`,`<i class="fas fa-images"></i>`)}imgDataIdb(e){let t=e.imagemDestacada||e.imagens&&e.imagens[0]||e.imagem||``;return t.startsWith(`idb:`)?` data-img-idb="${t}"`:``}formatarDimensoes(e){if(!e||!e.altura&&!e.largura&&!e.profundidade)return`-`;let t=[e.altura,e.largura,e.profundidade].filter(e=>e&&Number(e)>0);return t.length?`${t.join(` x `)} cm`:`-`}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`),t=document.getElementById(`btnModoGrid`),n=document.getElementById(`btnModoLista`);t&&t.addEventListener(`click`,()=>{this.modo=`grid`,this._rerenderizarComSkeleton()}),n&&n.addEventListener(`click`,()=>{this.modo=`lista`,this.rerenderizar()});let r=document.getElementById(`filtroBusca`);r&&r.addEventListener(`input`,Tr(e=>{this.filtros.busca=e.target.value,this._rerenderizarComSkeleton()},250)),[`filtroTecnica`,`filtroStatus`,`filtroAno`,`filtroPrecoMin`,`filtroPrecoMax`].forEach(e=>{let t=document.getElementById(e);if(!t)return;let n={filtroTecnica:`tecnica`,filtroStatus:`status`,filtroAno:`ano`,filtroPrecoMin:`precoMin`,filtroPrecoMax:`precoMax`}[e];t.addEventListener(`change`,e=>{this.filtros[n]=e.target.value,this._rerenderizarComSkeleton()})});let i=document.getElementById(`filtroOrdenar`);i&&i.addEventListener(`change`,e=>{this.filtros.ordenar=e.target.value,this._rerenderizarComSkeleton()});let a=document.getElementById(`btnLimparFiltros`);a&&a.addEventListener(`click`,()=>{this.filtros={busca:``,tecnica:``,status:``,ano:``,precoMin:``,precoMax:``,ordenar:`recentes`},this.filtroRapido=``,this._rerenderizarComSkeleton()}),e.addEventListener(`keydown`,e=>{if((e.ctrlKey||e.metaKey)&&e.key===`a`){e.preventDefault(),this.obrasFiltradas().forEach(e=>this.selecionados.add(e.id)),this.rerenderizar();return}e.key===`Escape`&&this.selecionados.size>0&&(this.selecionados.clear(),this.rerenderizar())});let o=-1;e.addEventListener(`click`,e=>{let t=e.target.closest(`.checkbox-item`);if(t&&e.shiftKey){e.preventDefault();let n=this.obrasFiltradas(),r=n.findIndex(e=>e.id===t.dataset.id);if(o>=0&&r>=0){let[e,t]=o<=r?[o,r]:[r,o];for(let r=e;r<=t;r++)this.selecionados.add(n[r].id);this.rerenderizar()}o=r}else t&&(o=this.obrasFiltradas().findIndex(e=>e.id===t.dataset.id))});let s=document.getElementById(`btnComparar`);s&&s.addEventListener(`click`,()=>this.abrirComparacao(Array.from(this.selecionados)));let c=document.getElementById(`selectAll`);c&&c.addEventListener(`change`,e=>{let t=this.obrasFiltradas();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkMarcarFavorita`)?.addEventListener(`click`,()=>this.bulkAcao(`favoritar`)),document.getElementById(`bulkDesmarcarFavorita`)?.addEventListener(`click`,()=>this.bulkAcao(`desfavoritar`)),document.getElementById(`bulkMudarStatus`)?.addEventListener(`click`,()=>this.bulkAcao(`mudarStatus`)),document.getElementById(`bulkExportar`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkExportarPDF`)?.addEventListener(`click`,()=>this.bulkAcao(`exportarPDF`)),document.getElementById(`bulkExcluir`)?.addEventListener(`click`,()=>this.bulkAcao(`excluir`)),document.getElementById(`bulkCancelar`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()}),document.getElementById(`btnImportacaoLote`)?.addEventListener(`click`,()=>this.abrirImportacaoLote()),document.getElementById(`btnNovaObraRapida`)?.addEventListener(`click`,()=>this.abrirFormulario()),document.getElementById(`btnSlideshowTodas`)?.addEventListener(`click`,()=>{let e=this.obrasFiltradas();if(e.length===0){A(`Nenhuma obra para exibir.`,`aviso`);return}Yr(e.map(e=>({src:this.obterImagem(e),legenda:`${e.titulo} · ${O(e.preco)}`})),0)}),document.getElementById(`btnExportarTodas`)?.addEventListener(`click`,()=>{let e=this.obrasFiltradas().map(e=>e.id);if(e.length===0){A(`Nenhuma obra para exportar.`,`aviso`);return}this.exportarObrasJSON(e)});let l=document.getElementById(`fabNovaObra`);l&&l.addEventListener(`click`,()=>this.abrirFormulario());let u=e=>{let t=e.target.closest(`.imagem-card-wrapper img, .thumb-lista`),n=e.target.closest(`[data-abrir-ficha]`),r=e.target.closest(`[data-editar-obra]`),i=e.target.closest(`[data-excluir-obra]`),a=e.target.closest(`[data-comparar-obra]`),o=e.target.closest(`[data-slideshow]`),s=e.target.closest(`[data-filtro]`),c=e.target.closest(`[data-indice]`);if(r){this.abrirFormulario(r.dataset.editarObra);return}if(i){this.excluirObra(i.dataset.excluirObra);return}if(a){this.adicionarComparacao(a.dataset.compararObra);return}if(o){e.stopPropagation(),this.abrirSlideshow(o.dataset.slideshow);return}if(t){e.stopPropagation();let n=t.closest(`[data-abrir-ficha]`)?.dataset?.abrirFicha;n&&this.abrirSlideshow(n);return}if(s){let e=s.dataset.filtro;this.filtroRapido=this.filtroRapido===e?``:e,this.aplicarFiltroRapido(),this._rerenderizarComSkeleton();return}if(c){this.carregarFiltroSalvo(parseInt(c.dataset.indice));return}if(n){this.abrirFichaTecnica(n.dataset.abrirFicha);return}};e.addEventListener(`click`,u),this._bindCache.delegCatalogo={el:e,handler:u,type:`click`};let d=document.getElementById(`btnSalvarFiltro`);d&&d.addEventListener(`click`,()=>this.salvarFiltroAtual()),mi(e)}aplicarFiltroRapido(){let e=new Date;switch(this.filtroRapido){case`disponiveis`:this.filtros.status=`disponível`;break;case`vendidas`:this.filtros.status=`vendida`,this.filtroRapido=`vendidas`;break;case`recentes`:this.filtros.status=``,this.filtros.ano=String(e.getFullYear());break;case`favoritas`:break;default:break}}salvarFiltroAtual(){let e=prompt(`Nome para este filtro:`);e&&(this.filtrosSalvos.push({nome:e,descricao:Object.entries(this.filtros).map(([e,t])=>t?`${e}:${t}`:``).filter(Boolean).join(`, `),filtros:{...this.filtros}}),this.rerenderizar())}carregarFiltroSalvo(e){let t=this.filtrosSalvos[e];t&&(this.filtros={...t.filtros},this.rerenderizar())}rerenderizar(e=!1){let t=document.getElementById(`viewPrincipal`),n=e?document.activeElement.id:null;if(t.innerHTML=this.render(),this.aposRenderizar(),n){let e=document.getElementById(n);if(e){e.focus();let t=e.value;e.value=``,e.value=t}}}async bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`favoritar`:t.forEach(e=>{let t=W().porId(e);t&&(t.favorita=!0,W().atualizar(e,t))}),A(`${t.length} obra${t.length===1?``:`s`} favoritada${t.length===1?``:`s`}`,`sucesso`);break;case`desfavoritar`:t.forEach(e=>{let t=W().porId(e);t&&(t.favorita=!1,W().atualizar(e,t))}),A(`${t.length} obra${t.length===1?``:`s`} desfavoritada${t.length===1?``:`s`}`,`sucesso`);break;case`mudarStatus`:N(`
          <h3>Mudar Status em Lote</h3>
          <div class="campo-form">
            <label>Novo Status</label>
            <select id="novoStatusBulk">
              <option value="disponível">Disponível</option>
              <option value="reservada">Reservada</option>
              <option value="vendida">Vendida</option>
              <option value="em exposição">Em Exposição</option>
            </select>
          </div>
          <div class="modal-acoes">
            <button class="btn-primario" id="btnConfirmarStatus">Confirmar</button>
            <button class="btn-secundario" id="btnCancelarStatus">Cancelar</button>
          </div>
        `),document.getElementById(`btnConfirmarStatus`).addEventListener(`click`,()=>{let e=document.getElementById(`novoStatusBulk`).value;t.forEach(t=>{let n=W().porId(t);n&&(n.status=e,W().atualizar(t,n))}),A(`${t.length} obra${t.length===1?``:`s`} atualizada${t.length===1?``:`s`}`,`sucesso`),this.selecionados.clear(),P(),this.rerenderizar()}),document.getElementById(`btnCancelarStatus`).addEventListener(`click`,()=>P());return;case`exportar`:this.exportarObrasJSON(t);break;case`exportarPDF`:this.exportarCatalogoPDF(t);break;case`excluir`:{if(!await R(`Tem certeza que deseja excluir ${t.length} obra${t.length===1?``:`s`}? Esta ação não pode ser desfeita.`))return;let e=[];t.forEach(t=>{let n=W().porId(t);n&&e.push(n),W().remover(t)}),z(`${t.length} obra${t.length===1?``:`s`} excluída${t.length===1?``:`s`}`,()=>{e.forEach(e=>{W().items.unshift(e)}),W()._persistir()});break}}this.selecionados.clear(),this.rerenderizar()}}exportarObrasJSON(e){let t={obras:e.map(e=>W().porId(e)).filter(Boolean),exportadoEm:new Date().toISOString(),versao:`1.0`},n=new Blob([JSON.stringify(t,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`),a=new Date().toISOString().replace(/[:.]/g,`-`);i.href=r,i.download=`atelier-crm-obras-${a}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r),A(`${e.length} obra${e.length===1?``:`s`} exportada${e.length===1?``:`s`}`,`sucesso`)}exportarCatalogoPDF(e){if(!window.jspdf){A(`Biblioteca de PDF indisponível.`,`erro`);return}let t=e.map(e=>W().porId(e)).filter(Boolean);if(t.length===0)return;j(`Gerando catálogo PDF...`);let{jsPDF:n}=window.jspdf,r=new n({unit:`mm`,format:`a4`}),i=r.internal.pageSize.getWidth(),a=r.internal.pageSize.getHeight(),o=q().artista&&q().artista.nome||`Ateliê do Artista`;t.forEach((e,n)=>{n>0&&r.addPage(),r.setFont(`helvetica`,`bold`),r.setFontSize(20),r.setTextColor(30,30,30),r.text(o,i/2,22,{align:`center`}),r.setDrawColor(200),r.setLineWidth(.4),r.line(25,28,i-25,28),r.setFont(`helvetica`,`normal`),r.setFontSize(10),r.setTextColor(130),r.text(`Catálogo de Obras · Página ${n+1} de ${t.length}`,i/2,35,{align:`center`});let s=46,c=this.obterImagem(e);if(/^data:image\/(png|jpe?g)/i.test(c||``))try{let e=/png/i.test(c)?`PNG`:`JPEG`;r.addImage(c,e,(i-100)/2,s,100,100,void 0,`FAST`),s+=112}catch(e){console.warn(`Erro ao inserir imagem no PDF:`,e)}r.setFont(`helvetica`,`bold`),r.setFontSize(16),r.setTextColor(20),r.text(e.titulo||`Sem título`,i/2,s,{align:`center`}),s+=9,e.serie&&(r.setFont(`helvetica`,`italic`),r.setFontSize(10),r.setTextColor(120),r.text(`Série: ${e.serie}`,i/2,s,{align:`center`}),s+=8),r.setFont(`helvetica`,`normal`),r.setFontSize(11),r.setTextColor(60),[`Técnica: ${L(e.tecnica)}`,`Dimensões: ${this.formatarDimensoes(e.dimensoes)}`,`Ano: ${e.ano||`-`}`,`Status: ${pr(e.status)}`,`Preço: ${O(e.preco)}`].forEach(e=>{r.text(e,i/2,s,{align:`center`}),s+=6.5}),e.descricao&&(s+=4,r.setFont(`helvetica`,`italic`),r.setFontSize(10),r.setTextColor(90),r.text(r.splitTextToSize(e.descricao,i-60),i/2,s,{align:`center`})),r.setDrawColor(210),r.line(25,a-20,i-25,a-20),r.setFont(`helvetica`,`normal`),r.setFontSize(8),r.setTextColor(150),r.text(`Catálogo gerado em ${new Date().toLocaleDateString(`pt-BR`)} · Atelier CRM`,i/2,a-14,{align:`center`})});let s=`catalogo-${t.length}-obras-${new Date().toISOString().slice(0,10)}.pdf`;r.save(s),M(),A(`Catálogo PDF exportado com ${t.length} obra${t.length===1?``:`s`}!`,`sucesso`)}async abrirFormulario(e=null){let t=e?W().porId(e):null;if(this.imagensFormAtual=[],this.imagensRefAtual=[],this.imagemDestacadaAtual=null,this.imagemDestacadaRef=``,t){let e=t.imagens?.length?t.imagens:t.imagem?[t.imagem]:[];for(let t of e)if(t&&t.startsWith(`idb:`))try{let e=await imageStore.carregar(t);this.imagensFormAtual.push(e||`data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23e0e0e0" width="200" height="200"/%3E%3Ctext x="100" y="105" text-anchor="middle" fill="%23999" font-size="14" font-family="sans-serif"%3E...%3C/text%3E%3C/svg%3E`),this.imagensRefAtual.push(t)}catch{this.imagensFormAtual.push(va),this.imagensRefAtual.push(``)}else this.imagensFormAtual.push(t||``),this.imagensRefAtual.push(``);let n=t.imagemDestacada||t.imagens&&t.imagens[0]||t.imagem||``;if(n.startsWith(`idb:`)){try{this.imagemDestacadaAtual=await imageStore.carregar(n)}catch{this.imagemDestacadaAtual=va}this.imagemDestacadaRef=n}else this.imagemDestacadaAtual=n||this.imagensFormAtual[0]||null,this.imagemDestacadaRef=``}let n=t&&t.dimensoes||{};N(`
      <h3>${t?`Editar Obra`:`Nova Obra`}</h3>
      <form id="formObra" class="form-obra-premium">
        <div class="campo-form">
          <label>Título *</label>
          <input type="text" id="campoTitulo" value="${t?t.titulo:``}" required>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Técnica *</label>
            <select id="campoTecnica" required>
              <option value="">Selecione...</option>
              <option value="óleo" ${t&&t.tecnica===`óleo`?`selected`:``}>Óleo</option>
              <option value="aquarela" ${t&&t.tecnica===`aquarela`?`selected`:``}>Aquarela</option>
              <option value="escultura" ${t&&t.tecnica===`escultura`?`selected`:``}>Escultura</option>
              <option value="outra" ${t&&t.tecnica===`outra`?`selected`:``}>Outra</option>
            </select>
          </div>
          <div class="campo-form">
            <label>Ano</label>
            <input type="number" id="campoAno" value="${t?t.ano||``:new Date().getFullYear()}">
          </div>
        </div>
        <div class="campo-form">
          <label>Dimensões (cm)</label>
          <div class="form-linha">
            <input type="number" id="campoAltura" placeholder="Altura" aria-label="Altura em cm" value="${n.altura||``}">
            <input type="number" id="campoLargura" placeholder="Largura" aria-label="Largura em cm" value="${n.largura||``}">
            <input type="number" id="campoProfundidade" placeholder="Profundidade" aria-label="Profundidade em cm" value="${n.profundidade||``}">
          </div>
        </div>
        <div class="campo-form">
          <label>Série (opcional)</label>
          <input type="text" id="campoSerie" value="${t&&t.serie||``}">
        </div>
        <div class="campo-form">
          <label>Descrição</label>
          <textarea id="campoDescricao">${t&&t.descricao||``}</textarea>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Preço (R$) *</label>
            <input type="number" id="campoPreco" value="${t?t.preco:``}" required>
          </div>
          <div class="campo-form">
            <label>Status</label>
            <select id="campoStatus">
              <option value="disponível" ${!t||F(t.status)===`disponivel`?`selected`:``}>Disponível</option>
              <option value="reservada" ${t&&F(t.status)===`reservada`?`selected`:``}>Reservada</option>
              <option value="vendida" ${t&&F(t.status)===`vendida`?`selected`:``}>Vendida</option>
              <option value="em exposição" ${t&&F(t.status)===`exposicao`?`selected`:``}>Em Exposição</option>
            </select>
          </div>
        </div>

        <div class="campo-form">
          <label>Imagens da Obra</label>
          <div class="dropzone-imagens" id="dropzoneImagens">
            <div class="dropzone-placeholder">
              <span class="dropzone-icone">📷</span>
              <p>Arraste imagens para cá ou clique para selecionar</p>
              <p class="texto-ajuda">JPG, PNG · Múltiplos arquivos · Máx 5 imagens</p>
            </div>
            <input type="file" id="campoImagens" accept="image/*" multiple style="display:none" aria-label="Selecionar imagens da obra">
          </div>
          <div class="preview-galeria" id="previewGaleria">
            ${this.imagensFormAtual.length===0?`<p class="texto-ajuda">Nenhuma imagem selecionada ainda.</p>`:``}
          </div>
        </div>

        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarObra">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Obra</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarObra`).addEventListener(`click`,P),this.iniciarDropzone(),this.renderizarPreviewGaleria(),document.getElementById(`formObra`).addEventListener(`submit`,async e=>{e.preventDefault();let n=document.getElementById(`campoTitulo`).value.trim(),r=document.getElementById(`campoTecnica`).value,i=document.getElementById(`campoPreco`).value;if(!n||!r||i===``){A(`Preencha os campos obrigatórios: título, técnica e preço.`,`aviso`);return}let a=[...this.imagensRefAtual],o=this.imagemDestacadaRef||a[0]||``;for(let e=0;e<this.imagensFormAtual.length;e++){let t=this.imagensFormAtual[e];if(!a[e]&&t&&t.startsWith(`data:`))try{a[e]=(await imageStore.salvar(t)).medium}catch{a[e]=t}}let s={titulo:n,tecnica:r,dimensoes:{altura:Number(document.getElementById(`campoAltura`).value)||0,largura:Number(document.getElementById(`campoLargura`).value)||0,profundidade:Number(document.getElementById(`campoProfundidade`).value)||0},ano:Number(document.getElementById(`campoAno`).value)||null,descricao:document.getElementById(`campoDescricao`).value.trim(),preco:Number(i),status:document.getElementById(`campoStatus`).value,imagem:o||I(`#cccccc`,`<i class="fas fa-images"></i>`),imagens:a.filter(Boolean),imagemDestacada:o,serie:document.getElementById(`campoSerie`).value.trim()};t?(W().atualizar(t.id,s),A(`Obra atualizada com sucesso!`,`sucesso`)):(s.dataCadastro=new Date().toISOString(),W().adicionar(s),A(`Obra cadastrada com sucesso!`,`sucesso`)),P(),this.router.navegar(`catalogo`)})}iniciarDropzone(){let e=document.getElementById(`dropzoneImagens`),t=document.getElementById(`campoImagens`);e&&(e.addEventListener(`click`,()=>t.click()),e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`dragging`)}),e.addEventListener(`dragleave`,()=>{e.classList.remove(`dragging`)}),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`dragging`),this.processarArquivos(t.dataTransfer.files)}),t.addEventListener(`change`,e=>{this.processarArquivos(e.target.files),e.target.value=``}))}processarArquivos(e){if(this.imagensFormAtual.length+e.length>5){A(`Máximo de 5 imagens por obra.`,`aviso`);return}Array.from(e).forEach(e=>{if(!e.type.startsWith(`image/`))return;let t=new FileReader;t.onload=async e=>{let t=e.target.result;this.comprimirImagem(t,1200,.8,async e=>{try{let t=await imageStore.salvar(e),n=await imageStore.carregar(t.thumb);this.imagensFormAtual.push(n),this.imagensRefAtual.push(t.medium),this.imagemDestacadaAtual||(this.imagemDestacadaAtual=n,this.imagemDestacadaRef=t.medium)}catch{this.imagensFormAtual.push(e),this.imagensRefAtual.push(``),this.imagemDestacadaAtual||(this.imagemDestacadaAtual=e)}this.renderizarPreviewGaleria()})},t.readAsDataURL(e)})}comprimirImagem(e,t,n,r){let i=new Image;i.onload=()=>{let e=document.createElement(`canvas`),{width:a,height:o}=i;a>t&&(o=o*t/a,a=t),e.width=a,e.height=o;let s=e.getContext(`2d`);s.imageSmoothingEnabled=!0,s.imageSmoothingQuality=`high`,s.drawImage(i,0,0,a,o),r(e.toDataURL(`image/jpeg`,n))},i.onerror=()=>r(e),i.src=e}renderizarPreviewGaleria(){let e=document.getElementById(`previewGaleria`);if(!e)return;if(this.imagensFormAtual.length===0){e.innerHTML=`<p class="texto-ajuda">Nenhuma imagem selecionada ainda.</p>`;return}let t=-1;e.innerHTML=`
      <div class="grade-miniaturas drop-reorder">
        ${this.imagensFormAtual.map((e,t)=>`
          <div class="miniatura-imagem ${e===this.imagemDestacadaAtual?`destacada`:``}" draggable="true" data-idx="${t}">
            <img src="${e}" alt="Imagem ${t+1}">
            <div class="miniaturas-acoes">
              <button type="button" class="btn-miniatura ${e===this.imagemDestacadaAtual?`ativo`:``}" data-destacar="${t}" title="Marcar como destacada" aria-label="Marcar imagem ${t+1} como destacada"><i class="fas fa-star"></i></button>
              <button type="button" class="btn-miniatura" data-editar-img="${t}" title="Editar imagem" aria-label="Editar imagem">✎</button>
              <button type="button" class="btn-miniatura" data-remover-img="${t}" title="Remover imagem" aria-label="Remover imagem">✕</button>
            </div>
            <span class="mi-ordem">${t+1}</span>
          </div>
        `).join(``)}
      </div>
      <p class="texto-ajuda"><i class="fas fa-star"></i> = imagem destacada (capa). Arraste as imagens para reordenar.</p>
    `,e.querySelectorAll(`.miniatura-imagem[draggable]`).forEach(n=>{n.addEventListener(`dragstart`,e=>{t=parseInt(n.dataset.idx),n.classList.add(`d-r-arrastando`),e.dataTransfer.effectAllowed=`move`}),n.addEventListener(`dragend`,()=>{n.classList.remove(`d-r-arrastando`),e.querySelectorAll(`.miniatura-imagem`).forEach(e=>e.classList.remove(`d-r-alvo`))}),n.addEventListener(`dragover`,e=>{e.preventDefault(),e.dataTransfer.dropEffect=`move`}),n.addEventListener(`dragenter`,e=>{e.preventDefault(),n.classList.add(`d-r-alvo`)}),n.addEventListener(`dragleave`,()=>n.classList.remove(`d-r-alvo`)),n.addEventListener(`drop`,e=>{e.preventDefault(),n.classList.remove(`d-r-alvo`);let r=parseInt(n.dataset.idx);if(t>=0&&r>=0&&t!==r){let[e]=this.imagensFormAtual.splice(t,1);this.imagensFormAtual.splice(r,0,e);let[n]=this.imagensRefAtual.splice(t,1);this.imagensRefAtual.splice(r,0,n),this.renderizarPreviewGaleria()}})}),e.querySelectorAll(`[data-destacar]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=parseInt(e.dataset.destacar);this.imagemDestacadaAtual=this.imagensFormAtual[n],this.imagemDestacadaRef=this.imagensRefAtual[n]||``,this.renderizarPreviewGaleria()})}),e.querySelectorAll(`[data-remover-img]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=parseInt(e.dataset.removerImg);this.imagensFormAtual.splice(n,1),this.imagensRefAtual.splice(n,1),(this.imagemDestacadaAtual===this.imagensFormAtual[n]||!this.imagensFormAtual.includes(this.imagemDestacadaAtual))&&(this.imagemDestacadaAtual=this.imagensFormAtual[0]||null,this.imagemDestacadaRef=this.imagensRefAtual[0]||``),this.renderizarPreviewGaleria()})}),e.querySelectorAll(`[data-editar-img]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=parseInt(e.dataset.editarImg);this.abrirEditorImagem(n)})})}abrirImportacaoLote(){N(`
      <h3><i class="fas fa-camera"></i> Importar Múltiplas Obras</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Arraste imagens ou clique para selecionar. Cada imagem se tornará uma nova obra.</p>
      <div class="dropzone-imagens batch-dropzone" id="batchDropzone">
        <div class="dropzone-placeholder">
          <span class="dropzone-icone">📷</span>
          <p>Arraste imagens para cá</p>
          <p class="texto-ajuda">JPG, PNG · Múltiplos arquivos · Sem limite</p>
        </div>
        <input type="file" id="batchFileInput" accept="image/*" multiple style="display:none" aria-label="Selecionar arquivos de imagem para importação em lote">
      </div>
      <div id="batchPreviewContainer"></div>
      <div class="batch-campos-comuns" id="batchCamposComuns" style="display:none;">
        <h4 style="font-size:0.85rem;margin-bottom:8px;">Campos comuns (aplicados a todas)</h4>
        <div class="form-linha">
          <div class="campo-form"><label>Técnica</label><select id="batchTecnica"><option value="">—</option><option value="óleo">Óleo</option><option value="aquarela">Aquarela</option><option value="escultura">Escultura</option><option value="outra">Outra</option></select></div>
          <div class="campo-form"><label>Status</label><select id="batchStatus"><option value="disponível">Disponível</option><option value="reservada">Reservada</option><option value="vendida">Vendida</option><option value="em exposição">Em Exposição</option></select></div>
          <div class="campo-form"><label>Ano</label><input type="number" id="batchAno" value="${new Date().getFullYear()}"></div>
        </div>
        <div class="campo-form"><label>Série (opcional)</label><input type="text" id="batchSerie" placeholder="Ex: Série Jardins"></div>
      </div>
      <div class="modal-acoes" id="batchAcoes" style="display:none;">
        <button class="btn-secundario" id="batchCancelar">Cancelar</button>
        <button class="btn-primario" id="batchCriar">Importar Obras</button>
      </div>
    `),this.iniciarBatchDrop()}iniciarBatchDrop(){let e=document.getElementById(`batchDropzone`),t=document.getElementById(`batchFileInput`),n=[];if(!e)return;e.addEventListener(`click`,()=>t.click()),e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`dragging`)}),e.addEventListener(`dragleave`,()=>e.classList.remove(`dragging`)),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`dragging`),r(t.dataTransfer.files)}),t.addEventListener(`change`,()=>{t.files.length&&r(t.files)});let r=e=>{let t=Array.from(e).filter(e=>e.type.startsWith(`image/`));if(t.length===0){A(`Nenhuma imagem encontrada.`,`aviso`);return}let r=0;t.forEach(e=>{let o=new FileReader;o.onload=e=>{i(e.target.result,1200,.8,e=>{n.push(e),r++,r===t.length&&a(n)})},o.readAsDataURL(e)})},i=(e,t,n,r)=>{let i=new Image;i.onload=()=>{let e=document.createElement(`canvas`),{width:a,height:o}=i;a>t&&(o=o*t/a,a=t),e.width=a,e.height=o;let s=e.getContext(`2d`);s.imageSmoothingEnabled=!0,s.imageSmoothingQuality=`high`,s.drawImage(i,0,0,a,o),r(e.toDataURL(`image/jpeg`,n))},i.onerror=()=>r(e),i.src=e},a=e=>{let t=document.getElementById(`batchPreviewContainer`),n=document.getElementById(`batchCamposComuns`),r=document.getElementById(`batchAcoes`);t&&(t.innerHTML=`
          <div class="batch-preview-grid">
            ${e.map((e,t)=>`
              <div class="batch-item" data-idx="${t}">
                <img src="${e}" alt="Obra ${t+1}">
                <button class="batch-remover" data-idx="${t}" title="Remover" aria-label="Remover obra ${t+1}">✕</button>
                <span class="batch-label">Obra ${t+1}</span>
              </div>
            `).join(``)}
          </div>
          <p class="texto-ajuda">${e.length} imagem(ns) preparada(s) para importação.</p>
        `,t.querySelectorAll(`.batch-remover`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.idx);e.splice(n,1),a(e)})})),n&&(n.style.display=e.length>0?`block`:`none`),r&&(r.style.display=e.length>0?`flex`:`none`),document.getElementById(`batchCancelar`)?.addEventListener(`click`,P),document.getElementById(`batchCriar`)?.addEventListener(`click`,async()=>{let t=document.getElementById(`batchTecnica`)?.value||``,n=document.getElementById(`batchStatus`)?.value||`disponível`,r=parseInt(document.getElementById(`batchAno`)?.value)||new Date().getFullYear(),i=document.getElementById(`batchSerie`)?.value.trim()||``,a=await Promise.all(e.map(async e=>{let a=e;if(e.startsWith(`data:`))try{a=(await imageStore.salvar(e)).medium}catch{}return{titulo:`Obra ${Date.now()}`,tecnica:t,ano:r,status:n,serie:i,imagem:a,imagens:[a],imagemDestacada:a,preco:0,dataCadastro:new Date().toISOString()}}));a.forEach(e=>W().adicionar(e)),P(),A(`${a.length} obra(s) importada(s) com sucesso!`,`sucesso`),this.router.navegar(`catalogo`)})}}abrirEditorImagem(e){let t=this.imagensFormAtual[e],n=document.createElement(`canvas`),r=n.getContext(`2d`),i=new Image,a=0,o=0,s=!1;i.onload=()=>{n.width=i.width,n.height=i.height,r.drawImage(i,0,0),i.width,i.height,c()},i.src=t;let c=()=>{N(`
        <h3>✎ Editor de Imagem</h3>
        <div class="editor-imagem-container">
          <div class="editor-imagem-tela">
            <img src="${l()}" id="previewEditor" style="max-width:100%;max-height:400px;">
            ${s?`<div class="crop-overlay"></div>`:``}
          </div>
          <div class="editor-imagem-controles">
            <div class="editor-controle-grupo">
              <label>Girar</label>
              <button class="btn-miniatura" id="btnRotacionarEsq">↺ Esquerda</button>
              <button class="btn-miniatura" id="btnRotacionarDir">↻ Direita</button>
            </div>
            <div class="editor-controle-grupo">
              <label>Brilho: ${o>0?`+`:``}${o}</label>
              <input type="range" id="sliderBrilho" min="-100" max="100" value="${o}" style="width:100%" aria-label="Ajustar brilho">
            </div>
            <div class="editor-controle-grupo">
              <label>Cortar</label>
              <button class="btn-miniatura" id="btnAtivarCrop">${s?`✕ Cancelar Crop`:`✂ Ativar Crop`}</button>
              <p class="texto-ajuda">Clique e arraste na imagem para selecionar a área</p>
            </div>
          </div>
        </div>
        <div class="modal-acoes">
          <button class="btn-secundario" id="btnCancelarEditor">Cancelar</button>
          <button class="btn-primario" id="btnAplicarEditor">Aplicar</button>
        </div>
      `),document.getElementById(`btnRotacionarEsq`).addEventListener(`click`,()=>{a-=90,c()}),document.getElementById(`btnRotacionarDir`).addEventListener(`click`,()=>{a+=90,c()}),document.getElementById(`sliderBrilho`).addEventListener(`input`,e=>{o=parseInt(e.target.value),c()}),document.getElementById(`btnAtivarCrop`).addEventListener(`click`,()=>{s=!s,c()}),document.getElementById(`btnCancelarEditor`).addEventListener(`click`,P),document.getElementById(`btnAplicarEditor`).addEventListener(`click`,()=>{this.imagensFormAtual[e]=l(),this.renderizarPreviewGaleria(),P(),A(`Imagem editada com sucesso!`,`sucesso`)})},l=()=>{let e=document.createElement(`canvas`),t=e.getContext(`2d`),n=a*Math.PI/180,r=Math.abs(Math.cos(n)),s=Math.abs(Math.sin(n)),c=i.width,l=i.height;if(a%180!=0){let a=l*r+c*s,o=l*s+c*r;e.width=Math.ceil(a),e.height=Math.ceil(o),t.translate(e.width/2,e.height/2),t.rotate(n),t.drawImage(i,-c/2,-l/2)}else e.width=c,e.height=l,t.drawImage(i,0,0);if(o!==0){let n=t.getImageData(0,0,e.width,e.height),r=n.data,i=1+o/100;for(let e=0;e<r.length;e+=4)r[e]=Math.min(255,r[e]*i),r[e+1]=Math.min(255,r[e+1]*i),r[e+2]=Math.min(255,r[e+2]*i);t.putImageData(n,0,0)}return e.toDataURL(`image/jpeg`,.9)}}abrirFichaTecnica(e){let t=W().porId(e);if(!t)return;let n=t.imagens&&t.imagens.length>0?t.imagens:[t.imagem],r=n.length>1,i=this.obterImagem(t),a=(t.imagemDestacada||t.imagens&&t.imagens[0]||t.imagem||``).startsWith(`idb:`)?` data-img-idb="${t.imagemDestacada||t.imagens&&t.imagens[0]||t.imagem}"`:``;if(N(`
      <div class="ficha-tecnica-obra ficha-premium">
        <div class="ficha-galeria">
          <div class="ficha-imagem-principal">
            <img id="fichaImgPrincipal" class="idb-placeholder" src="${i}" alt="${t.titulo}"${a}>
            ${r?`
            <button class="ficha-nav-btn ficha-nav-prev" id="fichaNavPrev" aria-label="Imagem anterior">◀</button>
            <button class="ficha-nav-btn ficha-nav-next" id="fichaNavNext" aria-label="Próxima imagem">▶</button>
            <button class="ficha-slideshow-btn" id="fichaSlideshow">▶ Iniciar Slideshow</button>
            `:``}
          </div>
          ${r?`
          <div class="ficha-miniaturas" id="fichaMiniaturas">
            ${n.map((e,t)=>`
              <img src="${e.startsWith(`idb:`)?va:e}" class="ficha-thumb ${t===0?`ativo`:``}"${e.startsWith(`idb:`)?` data-img-idb="${e}"`:``} data-ficha-indice="${t}" alt="Imagem ${t+1}">
            `).join(``)}
          </div>
          `:``}
        </div>
        <div class="ficha-info">
          <div class="titulo-ficha">${t.titulo}</div>
          <div class="serie-ficha">${t.serie?`Série: `+t.serie:`&nbsp;`}</div>
          <table class="tabela-ficha">
            <caption class="sr-only">Ficha técnica da obra</caption>
            <tr><td>Técnica</td><td>${L(t.tecnica)}</td></tr>
            <tr><td>Dimensões</td><td>${this.formatarDimensoes(t.dimensoes)}</td></tr>
            <tr><td>Ano</td><td>${t.ano||`-`}</td></tr>
            <tr><td>Status</td><td><span class="tag-status ${F(t.status)}">${pr(t.status)}</span></td></tr>
            <tr><td>Preço</td><td>${O(t.preco)}</td></tr>
            <tr><td>Cadastrada em</td><td>${k(t.dataCadastro||t.criadoEm)}</td></tr>
          </table>
          ${t.descricao?`<div class="descricao-ficha">${t.descricao}</div>`:``}
          <div class="ficha-qrcode" id="fichaQRCode"></div>
          <div class="acoes-ficha">
            <button class="btn-secundario" id="btnEditarFicha">✎ Editar</button>
            <button class="btn-primario" id="btnExportarPdfFicha"><i class="fas fa-file"></i> Exportar PDF</button>
            <button class="btn-secundario" id="btnCompartilharObra"><i class="fas fa-link"></i> Compartilhar</button>
          </div>
        </div>
      </div>
    `),document.getElementById(`btnEditarFicha`).addEventListener(`click`,()=>{P(),this.abrirFormulario(t.id)}),document.getElementById(`btnExportarPdfFicha`).addEventListener(`click`,()=>this.exportarPDF(t)),document.getElementById(`btnCompartilharObra`)?.addEventListener(`click`,()=>this.compartilharObra(t)),r){let e=0,r=document.getElementById(`fichaImgPrincipal`),i=document.querySelectorAll(`.ficha-thumb`),a=async t=>{e=t;let a=n[t];if(r.src=a.startsWith(`idb:`)?va:a,a.startsWith(`idb:`))try{r.src=await imageStore.carregar(a)}catch{}i.forEach((e,n)=>e.classList.toggle(`ativo`,n===t))};document.getElementById(`fichaNavPrev`).addEventListener(`click`,()=>{a((e-1+n.length)%n.length)}),document.getElementById(`fichaNavNext`).addEventListener(`click`,()=>{a((e+1)%n.length)}),document.getElementById(`fichaSlideshow`).addEventListener(`click`,()=>{this.abrirSlideshow(t.id)}),i.forEach(e=>{e.addEventListener(`click`,()=>a(parseInt(e.dataset.fichaIndice)))})}mi(document.getElementById(`modalOverlay`)),this.gerarQRCodeObra(t)}compartilharObra(e){let t=`${e.titulo} - ${L(e.tecnica)} - ${this.formatarDimensoes(e.dimensoes)} - ${O(e.preco)}`;navigator.share?navigator.share({title:e.titulo,text:t}).catch(()=>{}):navigator.clipboard.writeText(t).then(()=>A(`Informação copiadas para a área de transferência!`,`info`)).catch(()=>{})}gerarQRCodeObra(e){let t=document.getElementById(`fichaQRCode`);if(t){if(typeof QRCode>`u`){t.innerHTML=`<p class="texto-ajuda">QR Code indisponível.</p>`;return}try{let n=JSON.stringify({titulo:e.titulo,tecnica:e.tecnica,ano:e.ano,preco:e.preco,dimensoes:this.formatarDimensoes(e.dimensoes)});t.innerHTML=``;let r=document.createElement(`div`);t.appendChild(r),new QRCode(r,{text:n,width:120,height:120,colorDark:`#1a1a1a`,colorLight:`#ffffff`,correctLevel:QRCode.CorrectLevel.H})}catch{t.innerHTML=`<p class="texto-ajuda">Erro ao gerar QR Code.</p>`}}}async abrirSlideshow(e){let t=W().porId(e);if(!t)return;let n=t.imagens&&t.imagens.length>0?t.imagens:[t.imagem];!n||n.length===0||Yr((await Promise.all(n.map(async e=>{if(e.startsWith(`idb:`))try{return await imageStore.carregar(e)}catch{}return e}))).map((e,r)=>({src:e,title:t.titulo||`Sem título`,subtitle:[t.tecnica,t.ano].filter(Boolean).join(` · `)+(n.length>1?` — Imagem ${r+1}/${n.length}`:``),caption:t.descricao||``,price:t.preco?O(t.preco):``,id:t.id})),0)}abrirComparacao(e){if(e.length<2){A(`Selecione pelo menos 2 obras para comparar.`,`aviso`);return}let t=e.map(e=>W().porId(e)).filter(Boolean);if(t.length<2)return;let n=t.map(e=>{let t=this.obterImagem(e),n=this.imgDataIdb(e);return`
      <div class="comparacao-coluna">
        <div class="comparacao-imagem">
          <img src="${t}" alt="${e.titulo}" class="idb-placeholder"${n}>
        </div>
        <h3 class="comparacao-titulo">${e.titulo}</h3>
        ${e.serie?`<p class="comparacao-serie">${e.serie}</p>`:``}
        <table class="comparacao-tabela">
          <caption class="sr-only">Informações da obra</caption>
          <tr><td>Técnica</td><td>${L(e.tecnica)}</td></tr>
          <tr><td>Dimensões</td><td>${this.formatarDimensoes(e.dimensoes)}</td></tr>
          <tr><td>Ano</td><td>${e.ano||`-`}</td></tr>
          <tr><td>Status</td><td><span class="tag-status ${F(e.status)}">${pr(e.status)}</span></td></tr>
          <tr><td>Preço</td><td>${O(e.preco)}</td></tr>
          <tr><td>Série</td><td>${e.serie||`-`}</td></tr>
        </table>
      </div>
    `}).join(``);N(`
      <h3><i class="fas fa-chart-bar"></i> Comparação de Obras</h3>
      <div class="comparacao-container" style="grid-template-columns: repeat(${Math.min(t.length,4)}, 1fr)">
        ${n}
      </div>
      <div class="modal-acoes">
        <button class="btn-secundario" id="btnFecharComparacao">Fechar</button>
        <button class="btn-primario" id="btnExportarComparacao"><i class="fas fa-file"></i> Exportar Comparação</button>
      </div>
    `),document.getElementById(`btnFecharComparacao`).addEventListener(`click`,P),document.getElementById(`btnExportarComparacao`).addEventListener(`click`,()=>{this.exportarComparacaoPDF(t)}),mi(document.getElementById(`modalOverlay`))}adicionarComparacao(e){this.idsComparacao.includes(e)?(this.idsComparacao=this.idsComparacao.filter(t=>t!==e),this.idsComparacao.length===0&&(this.modoComparacao=!1)):(this.idsComparacao.push(e),this.modoComparacao=!0,this.selecionados.add(e)),this.rerenderizar(),this.idsComparacao.length>=2&&(this.abrirComparacao([...this.idsComparacao]),this.idsComparacao=[])}exportarComparacaoPDF(e){if(!window.jspdf){A(`Biblioteca de PDF indisponível.`,`erro`);return}j(`Gerando comparação em PDF...`);let{jsPDF:t}=window.jspdf,n=new t({unit:`mm`,format:`a4`,orientation:e.length>2?`landscape`:`portrait`});n.setFont(`helvetica`,`bold`),n.setFontSize(18),n.text(`Comparação de Obras`,n.internal.pageSize.getWidth()/2,20,{align:`center`});let r=35,i=(n.internal.pageSize.getWidth()-30)/e.length;e.forEach((e,t)=>{let a=15+t*i;n.setDrawColor(200),n.rect(a,r-5,i-4,80);let o=this.obterImagem(e);if(/^data:image\/(png|jpe?g)/i.test(o||``))try{n.addImage(o,/png/i.test(o)?`PNG`:`JPEG`,a+2,r,i-8,35,void 0,`FAST`)}catch(e){console.warn(e)}r+=40,n.setFont(`helvetica`,`bold`),n.setFontSize(10),n.text(e.titulo||`Sem título`,a+(i-4)/2,r,{align:`center`,maxWidth:i-8}),r+=6,n.setFont(`helvetica`,`normal`),n.setFontSize(8),[[`Técnica`,L(e.tecnica)],[`Dimensões`,this.formatarDimensoes(e.dimensoes)],[`Ano`,String(e.ano||`-`)],[`Status`,pr(e.status)],[`Preço`,O(e.preco)]].forEach(([e,t])=>{n.setFont(`helvetica`,`bold`),n.text(e+`:`,a+2,r),n.setFont(`helvetica`,`normal`);let i=n.getTextWidth(e+`: `);n.text(t,a+2+i,r),r+=5}),r=35}),n.save(`comparacao-obras-${new Date().toISOString().slice(0,10)}.pdf`),M(),A(`Comparação exportada em PDF!`,`sucesso`)}async excluirObra(e){let t=W().porId(e);t&&await R(`Excluir a obra "${t.titulo}"? Essa ação não pode ser desfeita.`)&&(W().remover(e),z(`Obra excluída.`,()=>{W().items.unshift(t),W()._persistir()}),this.rerenderizar())}exportarPDF(e){if(!window.jspdf){A(`Biblioteca de PDF indisponível (verifique sua conexão com a internet).`,`erro`);return}j(`Gerando ficha técnica em PDF...`);let{jsPDF:t}=window.jspdf,n=new t({unit:`mm`,format:`a4`}),r=n.internal.pageSize.getWidth(),i=n.internal.pageSize.getHeight(),a=q().artista&&q().artista.nome||`Ateliê do Artista`;n.setFont(`helvetica`,`bold`),n.setFontSize(20),n.setTextColor(30,30,30),n.text(a,r/2,22,{align:`center`}),n.setDrawColor(200),n.setLineWidth(.4),n.line(25,28,r-25,28),n.setFont(`helvetica`,`normal`),n.setFontSize(10),n.setTextColor(130),n.text(`Ficha Técnica de Obra`,r/2,35,{align:`center`});let o=46,s=this.obterImagem(e);if(/^data:image\/(png|jpe?g)/i.test(s||``))try{let e=/png/i.test(s)?`PNG`:`JPEG`;n.addImage(s,e,(r-110)/2,o,110,110,void 0,`FAST`),o+=122}catch(e){console.warn(`Não foi possível inserir a imagem no PDF:`,e)}else n.setDrawColor(210),n.rect((r-90)/2,o,90,90),n.setFontSize(9),n.setTextColor(180),n.text(`Imagem não disponível`,r/2,o+45,{align:`center`}),o+=102;n.setFont(`helvetica`,`bold`),n.setFontSize(16),n.setTextColor(20),n.text(e.titulo||`Sem título`,r/2,o,{align:`center`}),o+=9,e.serie&&(n.setFont(`helvetica`,`italic`),n.setFontSize(10),n.setTextColor(120),n.text(`Série: ${e.serie}`,r/2,o,{align:`center`}),o+=8),n.setFont(`helvetica`,`normal`),n.setFontSize(11),n.setTextColor(60),[`Técnica: ${L(e.tecnica)}`,`Dimensões: ${this.formatarDimensoes(e.dimensoes)}`,`Ano: ${e.ano||`-`}`,`Status: ${pr(e.status)}`,`Preço: ${O(e.preco)}`].forEach(e=>{n.text(e,r/2,o,{align:`center`}),o+=6.5}),e.descricao&&(o+=4,n.setFont(`helvetica`,`italic`),n.setFontSize(10),n.setTextColor(90),n.text(n.splitTextToSize(e.descricao,r-60),r/2,o,{align:`center`})),n.setDrawColor(210),n.line(25,i-20,r-25,i-20),n.setFont(`helvetica`,`normal`),n.setFontSize(8),n.setTextColor(150),n.text(`Ficha gerada em ${new Date().toLocaleDateString(`pt-BR`)} · Atelier CRM`,r/2,i-14,{align:`center`});let c=`ficha-${(e.titulo||`obra`).toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^a-z0-9]+/g,`-`)}.pdf`;n.save(c),M(),A(`PDF exportado com sucesso!`,`sucesso`)}},Ri=class extends H{constructor(e,t){super(e,t),this.busca=``,this.modo=`lista`,this.selecionados=new Set,this._escutarEvento(`abrir-novo-cliente`,()=>this.abrirFormulario())}clientesFiltrados(){let e=G().items;if(this.busca){let t=this.busca.toLowerCase();e=e.filter(e=>(e.nome||``).toLowerCase().includes(t)||(e.email||``).toLowerCase().includes(t)||(e.tags||[]).some(e=>e.toLowerCase().includes(t)))}return[...e].sort((e,t)=>(e.nome||``).localeCompare(t.nome||``))}comprasDoCliente(e){return K().items.filter(t=>t.clienteId===e).sort((e,t)=>new Date(t.data)-new Date(e.data))}render(){let e=this.clientesFiltrados(),t=e.length?this.modo===`lista`?this.renderTabela(e):this.renderCards(e):`<div class="tabela-wrapper"><div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-user"></i></div><p>Nenhum cliente encontrado.</p></div></div>`,n=e.reduce((e,t)=>e+(t.aquisicoes||0),0);return`
      <div class="view-cabecalho">
        <div>
          <h2>Clientes</h2>
          <p class="subtitulo">${e.length} cliente${e.length===1?``:`s`} · ${n} aquisição${n===1?``:`ões`} no total</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllCli" aria-label="Selecionar todos os clientes" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAllCli">Todos</label>
          </div>
          <div class="toggle-visualizacao">
            <button id="btnListaCli" class="${this.modo===`lista`?`ativo`:``}" title="Tabela">☰ Lista</button>
            <button id="btnGridCli" class="${this.modo===`grid`?`ativo`:``}" title="Cards">▦ Cards</button>
          </div>
          <button class="btn-gradient" id="btnNovoCliente">✚ Novo Cliente</button>
        </div>
      </div>
      ${this.selecionados.size>0?this.renderBarraBulk():``}
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaClientes" placeholder="Nome, e-mail ou tag..." value="${this.busca}">
        </div>
      </div>
      ${t}
    `}renderBarraBulk(){return`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} cliente${this.selecionados.size===1?``:`s`} selecionado${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportCli"><i class="fas fa-file"></i> Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirCli">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarCli">✕ Cancelar</button>
        </div>
      </div>
    `}renderTabela(e){return`
      <div class="tabela-wrapper">
        <table>
          <caption class="sr-only">Lista de clientes</caption>
          <thead><tr><th style="width:36px;"></th><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Aquisições</th><th>Tags</th><th></th></tr></thead>
          <tbody>${e.map(e=>`
      <tr class="${this.selecionados.has(e.id)?`linha-selecionada`:``}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-cli" data-id="${e.id}" aria-label="Selecionar ${e.nome}" ${this.selecionados.has(e.id)?`checked`:``}>
        </td>
        <td data-abrir-ficha-cliente="${e.id}" style="cursor:pointer;"><strong>${e.nome}</strong></td>
        <td data-abrir-ficha-cliente="${e.id}" style="cursor:pointer;">${e.email||`-`}</td>
        <td>${e.telefone||`-`}</td>
        <td>${e.aquisicoes||0}</td>
        <td>${(e.tags||[]).map(e=>`<span class="badge-tag">${e}</span>`).join(``)||`-`}</td>
        <td class="acoes-linha-tabela" onclick="event.stopPropagation()">
          <button class="btn-icone-tabela" data-editar-cliente="${e.id}" title="Editar" aria-label="Editar ${e.nome}"><i class="fas fa-pen"></i></button>
          <button class="btn-icone-tabela" data-excluir-cliente="${e.id}" title="Excluir" aria-label="Excluir ${e.nome}"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join(``)}</tbody>
        </table>
      </div>
    `}renderCards(e){return`
      <div class="grid-clientes stagger-in">
        ${e.map(e=>`
          <div class="card-cliente ${this.selecionados.has(e.id)?`selecionada`:``}">
            <div class="checkbox-bulk">
              <input type="checkbox" class="checkbox-item-cli" data-id="${e.id}" aria-label="Selecionar ${e.nome}" ${this.selecionados.has(e.id)?`checked`:``}>
            </div>
            <div class="cc-avatar">${(e.nome||`?`).charAt(0).toUpperCase()}</div>
            <div class="cc-info" data-abrir-ficha-cliente="${e.id}">
              <div class="cc-nome">${e.nome}</div>
              <div class="cc-meta">${e.email||`sem email`}</div>
            </div>
            <div class="cc-footer">
              <span class="cc-aquisicoes">${e.aquisicoes||0} compra${(e.aquisicoes||0)===1?``:`s`}</span>
              <div class="cc-tags">${(e.tags||[]).slice(0,2).map(e=>`<span class="badge-tag">${e}</span>`).join(``)}</div>
            </div>
            <div class="cc-acoes">
              <button data-editar-cliente="${e.id}" title="Editar" aria-label="Editar ${e.nome}"><i class="fas fa-pen"></i></button>
              <button data-excluir-cliente="${e.id}" title="Excluir" aria-label="Excluir ${e.nome}"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `).join(``)}
      </div>
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`);document.getElementById(`btnListaCli`)?.addEventListener(`click`,()=>{this.modo=`lista`,this.rerenderizar()}),document.getElementById(`btnGridCli`)?.addEventListener(`click`,()=>{this.modo=`grid`,this.rerenderizar()}),document.getElementById(`btnNovoCliente`)?.addEventListener(`click`,()=>this.abrirFormulario());let t=document.getElementById(`buscaClientes`);t&&t.addEventListener(`input`,Tr(e=>{this.busca=e.target.value,this.rerenderizar(!0)},250));let n=document.getElementById(`selectAllCli`);n&&n.addEventListener(`change`,e=>{let t=this.clientesFiltrados();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item-cli`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkExportCli`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkExcluirCli`)?.addEventListener(`click`,()=>this.bulkAcao(`excluir`)),document.getElementById(`bulkCancelarCli`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()});let r=e=>{let t=e.target.closest(`[data-editar-cliente]`),n=e.target.closest(`[data-excluir-cliente]`),r=e.target.closest(`[data-abrir-ficha-cliente]`);if(t){this.abrirFormulario(t.dataset.editarCliente);return}if(n){this.excluirCliente(n.dataset.excluirCliente);return}if(r){this.abrirFicha(r.dataset.abrirFichaCliente);return}};e.addEventListener(`click`,r),this._bindCache.delegClientes={el:e,handler:r,type:`click`}}rerenderizar(e=!1){let t=document.getElementById(`viewPrincipal`),n=e?document.activeElement.id:null;if(this.removerListeners(),t.innerHTML=this.render(),this.aposRenderizar(),n){let e=document.getElementById(n);if(e){e.focus();let t=e.value;e.value=``,e.value=t}}}bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`exportar`:{let e=t.map(e=>G().porId(e)).filter(Boolean),n=[[`nome`,`email`,`telefone`,`aquisicoes`,`tags`].join(`,`),...e.map(e=>[e.nome,e.email||``,e.telefone||``,e.aquisicoes||0,(e.tags||[]).join(`;`)].map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`))].join(`
`),r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8`}),i=document.createElement(`a`);i.href=URL.createObjectURL(r),i.download=`clientes-${new Date().toISOString().slice(0,10)}.csv`,i.click(),URL.revokeObjectURL(i.href),A(`${e.length} cliente(s) exportado(s)`,`sucesso`);break}case`excluir`:t.forEach(e=>{G().porId(e)&&!K().items.some(t=>t.clienteId===e)&&G().remover(e)}),A(`${t.length} cliente(s) excluído(s) (com vendas preservados)`,`sucesso`);break}this.selecionados.clear(),this.rerenderizar()}}abrirFormulario(e=null){let t=e?G().porId(e):null;N(`
      <h3>${t?`Editar Cliente`:`Novo Cliente`}</h3>
      <form id="formCliente">
        <div class="campo-form">
          <label>Nome completo *</label>
          <input type="text" id="campoNomeCliente" value="${t?t.nome:``}" required>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>E-mail</label>
            <input type="email" id="campoEmailCliente" value="${t&&t.email||``}">
          </div>
          <div class="campo-form">
            <label>Telefone</label>
            <input type="text" id="campoTelefoneCliente" value="${t&&t.telefone||``}" placeholder="(00) 00000-0000">
          </div>
        </div>
        <div class="campo-form">
          <label>Endereço</label>
          <input type="text" id="campoEnderecoCliente" value="${t&&t.endereco||``}">
        </div>
        <div class="campo-form">
          <label>Tags (separadas por vírgula)</label>
          <input type="text" id="campoTagsCliente" value="${t?(t.tags||[]).join(`, `):``}" placeholder="Ex: colecionador, aquarela">
        </div>
        <div class="campo-form">
          <label>Notas</label>
          <textarea id="campoNotasCliente">${t&&t.notas||``}</textarea>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarCliente">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Cliente</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarCliente`).addEventListener(`click`,P),document.getElementById(`formCliente`).addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`campoNomeCliente`).value.trim();if(!n){A(`O nome do cliente é obrigatório.`,`aviso`);return}let r=document.getElementById(`campoTagsCliente`).value.split(`,`).map(e=>e.trim()).filter(Boolean),i={nome:n,email:document.getElementById(`campoEmailCliente`).value.trim(),telefone:document.getElementById(`campoTelefoneCliente`).value.trim(),endereco:document.getElementById(`campoEnderecoCliente`).value.trim(),notas:document.getElementById(`campoNotasCliente`).value.trim(),tags:r};t?(G().atualizar(t.id,i),A(`Cliente atualizado com sucesso!`,`sucesso`)):(i.aquisicoes=0,G().adicionar(i),A(`Cliente cadastrado com sucesso!`,`sucesso`)),P(),this.router.navegar(`clientes`)})}async excluirCliente(e){let t=G().porId(e);if(t){if(K().items.some(t=>t.clienteId===e)){A(`Este cliente possui vendas registradas e não pode ser excluído.`,`aviso`);return}await R(`Excluir o cliente "${t.nome}"?`)&&(G().remover(e),z(`Cliente excluído.`,()=>{G().items.unshift(t),G()._persistir()}),this.rerenderizar())}}abrirFicha(e){let t=G().porId(e);if(!t)return;let n=this.comprasDoCliente(e),r=W().items,i=n.length?n.map(e=>{let t=r.find(t=>t.id===e.obraId);return`
        <li class="timeline-item">
          <div class="timeline-data">${k(e.data)}</div>
          <div class="timeline-conteudo">
            <strong>${t?t.titulo:`Obra removida`}</strong>
            ${O(e.precoFinal)} · <span class="tag-status ${yr(e.status)}">${br(e.status)}</span>
          </div>
        </li>
      `}).join(``):`<p style="font-size:0.85rem;color:var(--text-muted);">Nenhuma compra registrada ainda.</p>`;N(`
      <h3>${t.nome}</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">${t.email||`sem e-mail`} · ${t.telefone||`sem telefone`}</p>
      <div style="margin-bottom:10px;">${(t.tags||[]).map(e=>`<span class="badge-tag">${e}</span>`).join(``)||``}</div>
      ${t.endereco?`<p style="font-size:0.82rem;margin-top:8px;"><strong>Endereço:</strong> ${t.endereco}</p>`:``}
      ${t.notas?`<p style="font-size:0.82rem;margin-top:6px;"><strong>Notas:</strong> ${t.notas}</p>`:``}
      <h3 style="margin-top:20px;font-size:0.95rem;">Histórico de compras</h3>
      <ul class="timeline-cliente">${i}</ul>
      <div class="modal-acoes">
        <button class="btn-secundario" id="btnFecharFichaCliente">Fechar</button>
        <button class="btn-primario" id="btnEditarFichaCliente"><i class="fas fa-pen"></i> Editar</button>
      </div>
    `),document.getElementById(`btnFecharFichaCliente`).addEventListener(`click`,P),document.getElementById(`btnEditarFichaCliente`).addEventListener(`click`,()=>{P(),this.abrirFormulario(t.id)})}},zi=class extends H{constructor(e,t,n){super(e,t),this.pdfGenerator=n,this.filtros={cliente:``,status:``,dataInicio:``,dataFim:``},this.selecionados=new Set,this._escutarEvento(`abrir-nova-venda`,()=>this.abrirFormulario()),this._escutarEvento(`abrir-recibo-rapido`,()=>this.abrirEscolhaRapida())}vendasFiltradas(){let e=this.filtros,t=K().items;return e.cliente&&(t=t.filter(t=>t.clienteId===e.cliente)),e.status&&(t=t.filter(t=>yr(t.status)===yr(e.status))),e.dataInicio&&(t=t.filter(t=>new Date(t.data)>=new Date(e.dataInicio))),e.dataFim&&(t=t.filter(t=>new Date(t.data)<=new Date(e.dataFim))),[...t].sort((e,t)=>new Date(t.data)-new Date(e.data))}render(){let e=this.vendasFiltradas(),t=W().items,n=G().items,r=[`negociação`,`aprovada`,`paga`,`entregue`],i=e.map(e=>{let i=t.find(t=>t.id===e.obraId),a=n.find(t=>t.id===e.clienteId);return`
        <tr class="${this.selecionados.has(e.id)?`linha-selecionada`:``}">
          <td onclick="event.stopPropagation()">
            <input type="checkbox" class="checkbox-item-vend" aria-label="Selecionar venda" data-id="${e.id}" ${this.selecionados.has(e.id)?`checked`:``}>
          </td>
          <td>${i?i.titulo:e.obraTitulo?e.obraTitulo:`<span style="color:var(--text-muted)">Obra removida</span>`}</td>
          <td>${a?a.nome:e.clienteNome?e.clienteNome:`-`}</td>
          <td>${O(e.precoFinal)}</td>
          <td>${k(e.data)}</td>
          <td>${L(e.formaPagamento)}</td>
          <td>
            <select class="select-status-venda" data-status-venda="${e.id}">
              ${r.map(t=>`<option value="${t}" ${yr(e.status)===yr(t)?`selected`:``}>${br(t)}</option>`).join(``)}
            </select>
          </td>
          <td class="acoes-linha-tabela">
            <button class="btn-icone-tabela" data-gerar-recibo="${e.id}"><i class="fas fa-file"></i> Recibo</button>
            <button class="btn-icone-tabela" data-gerar-proposta="${e.id}"><i class="fas fa-pencil-alt"></i> Proposta</button>
            <button class="btn-icone-tabela" data-cancelar-venda="${e.id}" title="Cancelar venda" aria-label="Cancelar venda">✕</button>
          </td>
        </tr>
      `}).join(``),a=e.length?`
      <div class="tabela-wrapper">
        <table>
          <caption class="sr-only">Lista de vendas</caption>
          <thead><tr><th style="width:36px;"></th><th>Obra</th><th>Cliente</th><th>Valor</th><th>Data</th><th>Pagamento</th><th>Status</th><th></th></tr></thead>
          <tbody>${i}</tbody>
        </table>
      </div>
    `:`
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-dollar-sign"></i></div><p>Nenhuma venda encontrada com os filtros atuais.</p></div>
      </div>
    `,o=e.reduce((e,t)=>e+Number(t.precoFinal||0),0),s={};e.forEach(e=>{let t=br(e.status);s[t]=(s[t]||0)+1});let c=Object.entries(s).map(([e,t])=>`<span class="chip-filtro" style="font-size:0.72rem;padding:2px 8px;cursor:default;">${e}: ${t}</span>`).join(` `);return`
      <div class="view-cabecalho">
        <div>
          <h2>Vendas</h2>
          <p class="subtitulo">${e.length} venda${e.length===1?``:`s`} · ${O(o)} em negócios</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllVend" aria-label="Selecionar todos" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAllVend">Todos</label>
          </div>
          <button class="btn-gradient" id="btnNovaVenda">✚ Nova Venda</button>
        </div>
      </div>
      ${e.length>0?`<div class="vendas-summary">${c}</div>`:``}
      ${this.selecionados.size>0?`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} venda${this.selecionados.size===1?``:`s`} selecionada${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportVend"><i class="fas fa-file"></i> Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkCancelarVend">✕ Cancelar</button>
        </div>
      </div>`:``}
      <div class="catalogo-filtros">
        <div class="campo-filtro">
          <label>Cliente</label>
          <select id="filtroVendaCliente" aria-label="Cliente">
            <option value="">Todos</option>
            ${n.map(e=>`<option value="${e.id}" ${this.filtros.cliente===e.id?`selected`:``}>${e.nome}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Status</label>
          <select id="filtroVendaStatus" aria-label="Status">
            <option value="">Todos</option>
            ${r.map(e=>`<option value="${e}" ${this.filtros.status===e?`selected`:``}>${br(e)}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro"><label>De</label><input type="date" id="filtroVendaDataInicio" aria-label="De" value="${this.filtros.dataInicio}"></div>
        <div class="campo-filtro"><label>Até</label><input type="date" id="filtroVendaDataFim" aria-label="Até" value="${this.filtros.dataFim}"></div>
        <button class="btn-secundario" id="btnLimparFiltrosVenda">Limpar filtros</button>
      </div>

      ${a}
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`),t=document.getElementById(`btnNovaVenda`);t&&t.addEventListener(`click`,()=>this.abrirFormulario());let n={filtroVendaCliente:`cliente`,filtroVendaStatus:`status`,filtroVendaDataInicio:`dataInicio`,filtroVendaDataFim:`dataFim`};Object.keys(n).forEach(e=>{let t=document.getElementById(e);t&&t.addEventListener(`change`,t=>{this.filtros[n[e]]=t.target.value,this.rerenderizar()})});let r=document.getElementById(`btnLimparFiltrosVenda`);r&&r.addEventListener(`click`,()=>{this.filtros={cliente:``,status:``,dataInicio:``,dataFim:``},this.rerenderizar()});let i=document.getElementById(`selectAllVend`);i&&i.addEventListener(`change`,e=>{let t=this.vendasFiltradas();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item-vend`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkExportVend`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkCancelarVend`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()});let a=e=>{let t=e.target.closest(`[data-gerar-recibo]`),n=e.target.closest(`[data-gerar-proposta]`),r=e.target.closest(`[data-cancelar-venda]`);if(t){this.pdfGenerator.abrirModalAssinatura(K().porId(t.dataset.gerarRecibo),`recibo`);return}if(n){this.pdfGenerator.abrirModalAssinatura(K().porId(n.dataset.gerarProposta),`proposta`);return}if(r){this.cancelarVenda(r.dataset.cancelarVenda);return}};e.addEventListener(`click`,a),this._bindCache.delegVendasClick={el:e,handler:a,type:`click`};let o=e=>{let t=e.target.closest(`[data-status-venda]`);t&&this.atualizarStatus(t.dataset.statusVenda,e.target.value)};e.addEventListener(`change`,o),this._bindCache.delegVendasChange={el:e,handler:o,type:`change`}}atualizarStatus(e,t){K().atualizar(e,{status:t}),A(`Status da venda atualizado.`,`sucesso`)}bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`exportar`:{let e=t.map(e=>K().porId(e)).filter(Boolean),n=W().items,r=G().items,i=[[`obra`,`cliente`,`valor`,`data`,`pagamento`,`status`].join(`,`),...e.map(e=>{let t=n.find(t=>t.id===e.obraId),i=r.find(t=>t.id===e.clienteId);return[t?.titulo||``,i?.nome||``,e.precoFinal||0,e.data||``,e.formaPagamento||``,e.status||``].map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`)})].join(`
`),a=new Blob([`﻿`+i],{type:`text/csv;charset=utf-8`}),o=document.createElement(`a`);o.href=URL.createObjectURL(a),o.download=`vendas-${new Date().toISOString().slice(0,10)}.csv`,o.click(),URL.revokeObjectURL(o.href),A(`${e.length} venda(s) exportada(s)`,`sucesso`);break}}this.selecionados.clear(),this.rerenderizar()}}abrirFormulario(){let e=W().items.filter(e=>F(e.status)!==`vendida`),t=G().items;if(!e.length){A(`Não há obras disponíveis para venda no momento.`,`aviso`);return}N(`
      <h3>Nova Venda</h3>
      <form id="formVenda">
        <div class="campo-form">
          <label>Obra *</label>
          <select id="campoObraVenda" required aria-label="Obra">
            <option value="">Selecione a obra...</option>
            ${e.map(e=>`<option value="${e.id}" data-preco="${e.preco}">${e.titulo} (${O(e.preco)})</option>`).join(``)}
          </select>
        </div>
        <div class="campo-form">
          <label>Cliente *</label>
          <select id="campoClienteVenda" required aria-label="Cliente">
            <option value="">Selecione...</option>
            ${t.map(e=>`<option value="${e.id}">${e.nome}</option>`).join(``)}
            <option value="__novo__">+ Cadastrar novo cliente</option>
          </select>
        </div>
        <div id="blocoNovoClienteVenda" style="display:none;">
          <div class="form-linha">
            <div class="campo-form"><label>Nome do novo cliente *</label><input type="text" id="campoNovoClienteNome" aria-label="Nome do novo cliente"></div>
            <div class="campo-form"><label>Telefone</label><input type="text" id="campoNovoClienteTelefone" aria-label="Telefone"></div>
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Preço final (R$) *</label>
            <input type="number" id="campoPrecoVenda" required aria-label="Preço final">
          </div>
          <div class="campo-form">
            <label>Data</label>
            <input type="date" id="campoDataVenda" aria-label="Data" value="${new Date().toISOString().slice(0,10)}">
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Forma de pagamento</label>
            <select id="campoFormaPagamento" aria-label="Forma de pagamento">
              <option value="à vista">à vista</option>
              <option value="parcelado">Parcelado</option>
              <option value="transferência">Transferência</option>
              <option value="dinheiro">Dinheiro</option>
            </select>
          </div>
          <div class="campo-form">
            <label>Status</label>
            <select id="campoStatusVenda" aria-label="Status">
              <option value="negociação">Negociação</option>
              <option value="aprovada">Aprovada</option>
              <option value="paga">Paga</option>
              <option value="entregue">Entregue</option>
            </select>
          </div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarVenda">Cancelar</button>
          <button type="submit" class="btn-primario">Confirmar Venda</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarVenda`).addEventListener(`click`,P),document.getElementById(`campoObraVenda`).addEventListener(`change`,e=>{let t=e.target.selectedOptions[0];t&&t.dataset.preco&&(document.getElementById(`campoPrecoVenda`).value=t.dataset.preco)}),document.getElementById(`campoClienteVenda`).addEventListener(`change`,e=>{document.getElementById(`blocoNovoClienteVenda`).style.display=e.target.value===`__novo__`?`block`:`none`}),document.getElementById(`formVenda`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`campoObraVenda`).value,n=document.getElementById(`campoClienteVenda`).value,r=document.getElementById(`campoPrecoVenda`).value;if(!t||!n||r===``){A(`Selecione a obra, o cliente e informe o preço final.`,`aviso`);return}if(n===`__novo__`){let e=document.getElementById(`campoNovoClienteNome`).value.trim();if(!e){A(`Informe o nome do novo cliente.`,`aviso`);return}n=G().adicionar({nome:e,telefone:document.getElementById(`campoNovoClienteTelefone`).value.trim(),email:``,endereco:``,notas:``,tags:[],aquisicoes:0}).id}let i={obraId:t,clienteId:n,precoFinal:Number(r),data:document.getElementById(`campoDataVenda`).value||new Date().toISOString().slice(0,10),formaPagamento:document.getElementById(`campoFormaPagamento`).value,status:document.getElementById(`campoStatusVenda`).value};K().adicionar(i),W().atualizar(t,{status:`vendida`});let a=G().porId(n);a&&G().atualizar(n,{aquisicoes:(a.aquisicoes||0)+1}),P(),A(`Venda registrada com sucesso!`,`sucesso`),this.router.navegar(`vendas`)})}async cancelarVenda(e){let t=K().porId(e);if(!t||!await R(`Cancelar esta venda? A obra voltará a ficar disponível no catálogo.`,{textoConfirmar:`Cancelar Venda`,perigoso:!0}))return;let n=W().porId(t.obraId)?.status;W().atualizar(t.obraId,{status:`disponível`});let r=G().porId(t.clienteId);r&&G().atualizar(t.clienteId,{aquisicoes:Math.max(0,(r.aquisicoes||0)-1)}),K().remover(e),z(`Venda cancelada.`,()=>{K().items.unshift(t),K()._persistir(),n&&W().atualizar(t.obraId,{status:n}),r&&G().atualizar(t.clienteId,{aquisicoes:Math.max(0,(r.aquisicoes||0)+1)})}),this.rerenderizar()}abrirEscolhaRapida(){let e=K().items;if(!e.length){A(`Nenhuma venda registrada ainda. Registre uma venda primeiro.`,`aviso`);return}let t=W().items,n=G().items;N(`
      <h3>Selecione a venda</h3>
      <ul class="lista-escolha-venda">${e.map(e=>{let r=t.find(t=>t.id===e.obraId),i=n.find(t=>t.id===e.clienteId);return`
        <li class="item-escolha-venda">
          <span>${r?r.titulo:e.obraTitulo?e.obraTitulo:`-`} — ${i?i.nome:e.clienteNome?e.clienteNome:`-`} (${O(e.precoFinal)})</span>
          <button class="btn-secundario" data-escolher-venda="${e.id}">Gerar Recibo</button>
        </li>
      `}).join(``)}</ul>
      <div class="modal-acoes"><button class="btn-secundario" id="btnFecharEscolhaVenda">Fechar</button></div>
    `),document.getElementById(`btnFecharEscolhaVenda`).addEventListener(`click`,P),document.querySelectorAll(`[data-escolher-venda]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=K().porId(e.dataset.escolherVenda);P(),this.pdfGenerator.abrirModalAssinatura(t,`recibo`)})})}},Bi=class{constructor(e){this.dataStore=e}gerarNumero(e){let t=new Date().getFullYear(),n=this.dataStore.dados.config,r=e===`proposta`?`contadorPropostas`:`contadorRecibos`;return n[r]||(n[r]={}),n[r][t]=(n[r][t]||0)+1,this.dataStore.salvar(),`${e===`proposta`?`ORC`:`REC`}-${t}-${String(n[r][t]).padStart(3,`0`)}`}obterCoresTema(){let e=getComputedStyle(document.body);return{bg:e.getPropertyValue(`--bg`).trim()||`#ffffff`,text:e.getPropertyValue(`--text`).trim()||`#1a1a1a`,textMuted:e.getPropertyValue(`--text-muted`).trim()||`#6b7280`,accent:e.getPropertyValue(`--accent`).trim()||`#2563eb`,card:e.getPropertyValue(`--card`).trim()||`#f8fafc`,border:e.getPropertyValue(`--border`).trim()||`#e5e7eb`,fonte:(e.getPropertyValue(`--font-principal`).trim()||`Arial, sans-serif`).replace(/'/g,``)}}abrirModalAssinatura(e,t){if(!e){A(`Venda não encontrada.`,`aviso`);return}let n=this.dataStore.buscarPorId(`obras`,e.obraId),r=this.dataStore.buscarPorId(`clientes`,e.clienteId);if(!n||!r){A(`Não foi possível localizar a obra ou o cliente desta venda.`,`aviso`);return}let i=t===`proposta`?`numeroProposta`:`numeroRecibo`;e[i]||(e[i]=this.gerarNumero(t),this.dataStore.atualizar(`vendas`,e.id,{[i]:e[i]})),N(`
      <h3>Gerar ${t===`proposta`?`Proposta de Orçamento`:`Recibo de Venda`}</h3>
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:14px;">
        ${n.titulo} — ${r.nome} — ${O(e.precoFinal)} · Nº ${e[i]}
      </p>
      <div class="campo-form">
        <label>Assinatura do artista</label>
        <canvas id="canvasAssinatura" class="area-assinatura" width="500" height="160"></canvas>
        <div class="legenda-assinatura">
          <span class="texto-ajuda">Desenhe com o mouse ou o dedo (touch)</span>
          <button type="button" class="btn-secundario" id="btnLimparAssinatura" style="padding:5px 10px;font-size:0.75rem;">Limpar</button>
        </div>
      </div>
      <div class="modal-acoes">
        <button type="button" class="btn-secundario" id="btnCancelarPdf">Cancelar</button>
        <button type="button" class="btn-primario" id="btnGerarPdfFinal">⬇️ Gerar PDF</button>
      </div>
    `);let a=document.getElementById(`canvasAssinatura`),o=a.getContext(`2d`);o.lineWidth=2,o.lineCap=`round`,o.strokeStyle=`#1a1a1a`;let s=!1,c=e=>{let t=a.getBoundingClientRect(),n=e.touches?e.touches[0]:e;return{x:(n.clientX-t.left)*(a.width/t.width),y:(n.clientY-t.top)*(a.height/t.height)}},l=e=>{s=!0;let t=c(e);o.beginPath(),o.moveTo(t.x,t.y),e.preventDefault()},u=e=>{if(!s)return;let t=c(e);o.lineTo(t.x,t.y),o.stroke(),e.preventDefault()},d=()=>{s=!1};a.addEventListener(`mousedown`,l),a.addEventListener(`mousemove`,u),window.addEventListener(`mouseup`,d),a.addEventListener(`touchstart`,l,{passive:!1}),a.addEventListener(`touchmove`,u,{passive:!1}),a.addEventListener(`touchend`,d),document.getElementById(`btnLimparAssinatura`).addEventListener(`click`,()=>o.clearRect(0,0,a.width,a.height)),document.getElementById(`btnCancelarPdf`).addEventListener(`click`,P),document.getElementById(`btnGerarPdfFinal`).addEventListener(`click`,()=>{this.gerarPdf(e,n,r,t,a.toDataURL(`image/png`))})}async gerarPdf(e,t,n,r,i){if(!window.jspdf||!window.html2canvas){A(`Bibliotecas de PDF indisponíveis (verifique sua conexão com a internet).`,`erro`);return}A(`Gerando PDF, aguarde...`,`info`);let a=this.obterCoresTema(),o=this.dataStore.dados.config.artista||{},s=o.nome||`Ateliê do Artista`,c=e[r===`proposta`?`numeroProposta`:`numeroRecibo`],l=r===`proposta`?`PROPOSTA DE ORÇAMENTO`:`RECIBO DE VENDA`,u=this.dataStore.dados.config.textoGarantia||``,d=t.dimensoes||{},f=[d.altura,d.largura,d.profundidade].filter(e=>e&&Number(e)>0),p=f.length?`${f.join(` x `)} cm`:`-`,m=/^data:image\/(png|jpe?g)/i.test(t.imagem||``)?`<img src="${t.imagem}" style="width:150px;height:150px;object-fit:cover;border-radius:6px;border:1px solid ${a.border};">`:``,h=document.createElement(`div`);h.style.cssText=`position:fixed;left:-9999px;top:0;width:750px;background:${a.bg};color:${a.text};font-family:${a.fonte};padding:48px;box-sizing:border-box;`,h.innerHTML=`
      <div style="text-align:center;border-bottom:2px solid ${a.border};padding-bottom:18px;margin-bottom:24px;">
        <div style="font-size:26px;font-weight:700;">${s}</div>
        <div style="font-size:12px;color:${a.textMuted};margin-top:4px;">${o.email||``}${o.telefone?` · `+o.telefone:``}</div>
      </div>
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:20px;font-weight:700;color:${a.accent};letter-spacing:1px;">${l}</div>
        <div style="font-size:12px;color:${a.textMuted};margin-top:6px;">Nº ${c} · ${k(e.data)}</div>
      </div>
      <div style="display:flex;gap:24px;margin-bottom:24px;">
        <div style="flex:1;background:${a.card};border:1px solid ${a.border};border-radius:10px;padding:16px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${a.textMuted};margin-bottom:8px;">Comprador</div>
          <div style="font-size:14px;font-weight:700;">${n.nome}</div>
          <div style="font-size:12px;color:${a.textMuted};margin-top:4px;">${n.email||``}</div>
          <div style="font-size:12px;color:${a.textMuted};">${n.telefone||``}</div>
          ${n.endereco?`<div style="font-size:12px;color:${a.textMuted};margin-top:4px;">${n.endereco}</div>`:``}
        </div>
        <div style="flex:1;background:${a.card};border:1px solid ${a.border};border-radius:10px;padding:16px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${a.textMuted};margin-bottom:8px;">Pagamento</div>
          <div style="font-size:20px;font-weight:700;color:${a.accent};">${O(e.precoFinal)}</div>
          <div style="font-size:12px;color:${a.textMuted};margin-top:4px;">Forma: ${L(e.formaPagamento)}</div>
          <div style="font-size:12px;color:${a.textMuted};">Status: ${br(e.status)}</div>
        </div>
      </div>
      <div style="display:flex;gap:20px;align-items:flex-start;background:${a.card};border:1px solid ${a.border};border-radius:10px;padding:16px;margin-bottom:24px;">
        ${m}
        <div>
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:${a.textMuted};margin-bottom:6px;">Obra</div>
          <div style="font-size:16px;font-weight:700;">${t.titulo}</div>
          <div style="font-size:12px;color:${a.textMuted};margin-top:4px;">${L(t.tecnica)} · ${p} · ${t.ano||`-`}</div>
        </div>
      </div>
      ${u?`<div style="font-size:11px;color:${a.textMuted};line-height:1.6;border-top:1px solid ${a.border};padding-top:14px;margin-bottom:28px;">${u}</div>`:``}
      <div style="display:flex;justify-content:center;margin-bottom:8px;">
        <div style="text-align:center;">
          ${i?`<img src="${i}" style="height:70px;">`:``}
          <div style="border-top:1px solid ${a.text};padding-top:6px;margin-top:2px;font-size:12px;min-width:220px;">${s}</div>
          <div style="font-size:10px;color:${a.textMuted};">Assinatura do artista</div>
        </div>
      </div>
      <div style="text-align:center;font-size:9px;color:${a.textMuted};margin-top:20px;border-top:1px solid ${a.border};padding-top:10px;">
        Documento gerado em ${new Date().toLocaleDateString(`pt-BR`)} · Atelier CRM
      </div>
    `,document.body.appendChild(h);try{let e=await window.html2canvas(h,{scale:2,backgroundColor:a.bg,useCORS:!0}),t=e.toDataURL(`image/png`),{jsPDF:n}=window.jspdf,i=new n({unit:`px`,format:[e.width,e.height]});i.addImage(t,`PNG`,0,0,e.width,e.height),i.save(`${r===`proposta`?`proposta`:`recibo`}-${c.toLowerCase()}.pdf`),A(`PDF gerado com sucesso!`,`sucesso`),P()}catch(e){console.error(`Erro ao gerar PDF:`,e),A(`Não foi possível gerar o PDF. Tente novamente.`,`erro`)}finally{document.body.removeChild(h)}}},Vi=class extends H{constructor(e,t){super(e,t)}certificadosOrdenados(){return[...this.dataStore.listar(`certificados`)].sort((e,t)=>new Date(t.dataEmissao||t.criadoEm)-new Date(e.dataEmissao||e.criadoEm))}render(){let e=this.certificadosOrdenados(),t=e.map(e=>`
      <tr>
        <td><strong>${e.tituloObra||`-`}</strong></td>
        <td>${e.numeroSerie}</td>
        <td>${e.edicaoTipo===`limitada`?`${e.edicaoAtual}/${e.edicaoTotal}`:`Única`}</td>
        <td>${k(e.dataEmissao||e.criadoEm)}</td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-baixar-certificado="${e.id}"><i class="fas fa-file"></i> PDF</button>
          <button class="btn-icone-tabela" data-excluir-certificado="${e.id}" aria-label="Excluir certificado"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join(``),n=e.length?`
      <div class="tabela-wrapper">
        <table><caption class="sr-only">Lista de certificados</caption>
          <thead><tr><th>Obra</th><th>Nº de Série</th><th>Edição</th><th>Emitido em</th><th></th></tr></thead>
          <tbody>${t}</tbody>
        </table>
      </div>
    `:`
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">📜</div><p>Nenhum certificado emitido ainda.</p></div>
      </div>
    `;return`
      <div class="view-cabecalho">
        <div>
          <h2>Certificados de Autenticidade</h2>
          <p class="subtitulo">${e.length} certificado${e.length===1?``:`s`} emitido${e.length===1?``:`s`}</p>
        </div>
        <button class="btn-gradient" id="btnNovoCertificado">🔏 Novo Certificado</button>
      </div>
      ${n}
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`),t=document.getElementById(`btnNovoCertificado`);t&&t.addEventListener(`click`,()=>this.abrirFormulario());let n=e=>{let t=e.target.closest(`[data-baixar-certificado]`),n=e.target.closest(`[data-excluir-certificado]`);if(t){this.baixarNovamente(t.dataset.baixarCertificado);return}if(n){this.excluirCertificado(n.dataset.excluirCertificado);return}};e.addEventListener(`click`,n),this._bindCache.delegCertificados={el:e,handler:n,type:`click`}}async excluirCertificado(e){if(!await R(`Excluir este certificado do histórico? O PDF já baixado não será afetado.`))return;let t=this.dataStore.buscarPorId(`certificados`,e);this.dataStore.remover(`certificados`,e);let{dataStore:n}=this;z(`Certificado excluído do histórico.`,()=>{n.dados.certificados.push(t),n.salvar()}),this.rerenderizar()}gerarNumeroSerie(){let e=new Date().getFullYear(),t=q();return t.contadorCertificados||(t.contadorCertificados={}),t.contadorCertificados[e]=(t.contadorCertificados[e]||0)+1,t.salvar(),`ART-${e}-${String(t.contadorCertificados[e]).padStart(3,`0`)}`}abrirFormulario(){let e=W().items,t=q().artista?.assinatura||``;N(`
      <h3>Novo Certificado de Autenticidade</h3>
      <form id="formCertificado">
        <div class="campo-form">
          <label>Origem dos dados</label>
          <select id="campoOrigemCertificado" aria-label="Origem dos dados">
            <option value="">— Preencher manualmente —</option>
            ${e.map(e=>`<option value="${e.id}">${e.titulo}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-form">
          <label>Título da obra *</label>
          <input type="text" id="campoTituloCert" required aria-label="Título da obra">
        </div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Técnica *</label>
            <select id="campoTecnicaCert" required aria-label="Técnica">
              <option value="">Selecione...</option>
              <option value="óleo">Óleo</option>
              <option value="aquarela">Aquarela</option>
              <option value="escultura">Escultura</option>
              <option value="outra">Outra</option>
            </select>
          </div>
          <div class="campo-form"><label>Ano</label><input type="number" id="campoAnoCert" aria-label="Ano" value="${new Date().getFullYear()}"></div>
        </div>
        <div class="campo-form"><label>Dimensões (ex: 60 x 80 cm)</label><input type="text" id="campoDimensoesCert" aria-label="Dimensões"></div>
        <div class="form-linha">
          <div class="campo-form">
            <label>Edição</label>
            <select id="campoEdicaoTipo" aria-label="Edição">
              <option value="unica">Única</option>
              <option value="limitada">Limitada</option>
            </select>
          </div>
          <div class="campo-form" id="blocoEdicaoLimitada" style="display:none;">
            <label>Nº / Total</label>
            <div class="form-linha">
              <input type="number" id="campoEdicaoAtual" aria-label="Número da edição atual" placeholder="Ex: 2" min="1">
              <input type="number" id="campoEdicaoTotal" aria-label="Total de edições" placeholder="Ex: 10" min="1">
            </div>
          </div>
        </div>
        <div class="form-linha">
          <div class="campo-form"><label>Local</label><input type="text" id="campoLocalCert" aria-label="Local" placeholder="Ex: Rio Bonito/RJ"></div>
          <div class="campo-form"><label>Data</label><input type="date" id="campoDataCert" aria-label="Data" value="${new Date().toISOString().slice(0,10)}"></div>
        </div>
        <div class="campo-form">
          <label>Assinatura do artista</label>
          <canvas id="canvasAssinaturaCert" class="area-assinatura" width="500" height="150" aria-label="Assinatura do artista"></canvas>
          <div class="legenda-assinatura">
            <label style="display:flex;align-items:center;gap:6px;font-size:0.78rem;font-weight:400;color:var(--text-muted);">
              <input type="checkbox" id="campoSalvarAssinatura" ${t?`checked`:``}> Usar/salvar como assinatura padrão
            </label>
            <button type="button" class="btn-secundario" id="btnLimparAssinaturaCert" style="padding:5px 10px;font-size:0.75rem;">Limpar</button>
          </div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarCertificado">Cancelar</button>
          <button type="submit" class="btn-primario">Gerar Certificado (PDF)</button>
        </div>
      </form>
    `);let n=``;document.getElementById(`campoOrigemCertificado`).addEventListener(`change`,t=>{let r=e.find(e=>e.id===t.target.value);if(!r){n=``;return}document.getElementById(`campoTituloCert`).value=r.titulo,document.getElementById(`campoTecnicaCert`).value=r.tecnica,document.getElementById(`campoAnoCert`).value=r.ano||``;let i=r.dimensoes||{},a=[i.altura,i.largura,i.profundidade].filter(e=>e&&Number(e)>0);document.getElementById(`campoDimensoesCert`).value=a.length?`${a.join(` x `)} cm`:``,n=r.imagem||``}),document.getElementById(`campoEdicaoTipo`).addEventListener(`change`,e=>{document.getElementById(`blocoEdicaoLimitada`).style.display=e.target.value===`limitada`?`block`:`none`});let r=document.getElementById(`canvasAssinaturaCert`),i=r.getContext(`2d`);if(i.lineWidth=2,i.lineCap=`round`,i.strokeStyle=`#1a1a1a`,t){let e=new Image;e.onload=()=>i.drawImage(e,0,0,r.width,r.height),e.src=t}let a=!1,o=e=>{let t=r.getBoundingClientRect(),n=e.touches?e.touches[0]:e;return{x:(n.clientX-t.left)*(r.width/t.width),y:(n.clientY-t.top)*(r.height/t.height)}},s=e=>{a=!0;let t=o(e);i.beginPath(),i.moveTo(t.x,t.y),e.preventDefault()},c=e=>{if(!a)return;let t=o(e);i.lineTo(t.x,t.y),i.stroke(),e.preventDefault()},l=()=>{a=!1};r.addEventListener(`mousedown`,s),r.addEventListener(`mousemove`,c),window.addEventListener(`mouseup`,l),r.addEventListener(`touchstart`,s,{passive:!1}),r.addEventListener(`touchmove`,c,{passive:!1}),r.addEventListener(`touchend`,l),document.getElementById(`btnLimparAssinaturaCert`).addEventListener(`click`,()=>i.clearRect(0,0,r.width,r.height)),document.getElementById(`btnCancelarCertificado`).addEventListener(`click`,P),document.getElementById(`formCertificado`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`campoTituloCert`).value.trim(),i=document.getElementById(`campoTecnicaCert`).value;if(!t||!i){A(`Preencha ao menos o título e a técnica da obra.`,`aviso`);return}let a=document.getElementById(`campoEdicaoTipo`).value,o={numeroSerie:this.gerarNumeroSerie(),obraId:document.getElementById(`campoOrigemCertificado`).value||null,tituloObra:t,tecnica:i,dimensoesTexto:document.getElementById(`campoDimensoesCert`).value.trim(),ano:Number(document.getElementById(`campoAnoCert`).value)||null,edicaoTipo:a,edicaoAtual:a===`limitada`?Number(document.getElementById(`campoEdicaoAtual`).value)||1:null,edicaoTotal:a===`limitada`?Number(document.getElementById(`campoEdicaoTotal`).value)||1:null,local:document.getElementById(`campoLocalCert`).value.trim(),dataEmissao:document.getElementById(`campoDataCert`).value||new Date().toISOString().slice(0,10),imagem:n},s=r.toDataURL(`image/png`);document.getElementById(`campoSalvarAssinatura`).checked&&(q().artista=q().artista||{},q().artista.assinatura=s,q().salvar());let c=this.dataStore.adicionar(`certificados`,o);P(),A(`Gerando certificado em PDF...`,`info`),await this.gerarPdfCertificado(c,s),this.router.navegar(`certificados`)})}async baixarNovamente(e){let t=this.dataStore.buscarPorId(`certificados`,e);if(!t)return;let n=q().artista?.assinatura||``;A(`Gerando PDF...`,`info`),await this.gerarPdfCertificado(t,n)}async gerarPdfCertificado(e,t){if(!window.jspdf){A(`Biblioteca de PDF indisponível (verifique sua conexão com a internet).`,`erro`);return}let{jsPDF:n}=window.jspdf,r=new n({unit:`mm`,format:`a4`}),i=r.internal.pageSize.getWidth(),a=r.internal.pageSize.getHeight(),o=(q().artista||{}).nome||`Ateliê do Artista`;r.setDrawColor(190),r.setLineWidth(.9),r.rect(10,10,i-20,a-20),r.setLineWidth(.25),r.rect(14,14,i-28,a-28),r.setFont(`times`,`bold`),r.setFontSize(23),r.setTextColor(30,30,30),r.text(`CERTIFICADO DE AUTENTICIDADE`,i/2,34,{align:`center`}),r.setFont(`helvetica`,`normal`),r.setFontSize(10),r.setTextColor(130),r.text(o,i/2,41,{align:`center`});let s=54;if(/^data:image\/(png|jpe?g)/i.test(e.imagem||``))try{let t=/png/i.test(e.imagem)?`PNG`:`JPEG`;r.addImage(e.imagem,t,(i-78)/2,s,78,78,void 0,`FAST`),s+=88}catch(e){console.warn(`Não foi possível inserir a imagem no certificado:`,e)}else s+=4;r.setFont(`times`,`bold`),r.setFontSize(15),r.setTextColor(20),r.text(e.tituloObra||`Obra sem título`,i/2,s,{align:`center`}),s+=7,r.setFont(`helvetica`,`normal`),r.setFontSize(10),r.setTextColor(80),r.text(`${L(e.tecnica)} · ${e.dimensoesTexto||`-`} · ${e.ano||`-`}`,i/2,s,{align:`center`}),s+=12,r.setFont(`helvetica`,`italic`),r.setFontSize(10.5),r.setTextColor(55);let c=`Certifico que a obra acima é original, de minha autoria, executada em ${e.tecnica}. Não existem reproduções autorizadas além da edição declarada.`,l=r.splitTextToSize(c,i-64);r.text(l,i/2,s,{align:`center`}),s+=l.length*5.5+8,r.setFont(`helvetica`,`bold`),r.setFontSize(10.5),r.setTextColor(30),r.text(e.edicaoTipo===`limitada`?`Edição: ${e.edicaoAtual} de ${e.edicaoTotal}`:`Edição: Única`,i/2,s,{align:`center`}),s+=6,r.setFont(`helvetica`,`normal`),r.setFontSize(9),r.setTextColor(110),r.text(`Número de série: ${e.numeroSerie}`,i/2,s,{align:`center`}),s+=16;let u=s,d=i/2-42,f=i/2+42;if(t)try{r.addImage(t,`PNG`,d-27,u,54,22)}catch{}r.setDrawColor(140),r.line(d-27,u+25,d+27,u+25),r.setFont(`helvetica`,`normal`),r.setFontSize(8.5),r.setTextColor(90),r.text(o,d,u+30,{align:`center`}),r.setFontSize(7.5),r.setTextColor(140),r.text(`Assinatura do artista`,d,u+34,{align:`center`}),r.setFontSize(8.5),r.setTextColor(90),r.text(`${e.local||``}${e.local?`, `:``}${k(e.dataEmissao)}`,d,u+41,{align:`center`});let p=await xr(`Obra: ${e.tituloObra} | Artista: ${o} | Autenticada em: ${k(e.dataEmissao)}`);if(p)try{r.addImage(p,`PNG`,f-14,u,28,28),r.setFontSize(7.5),r.setTextColor(140),r.text(`Validação digital`,f,u+34,{align:`center`})}catch{}r.setDrawColor(210),r.line(25,a-20,i-25,a-20),r.setFontSize(8),r.setTextColor(150),r.text(`Emitido em ${new Date().toLocaleDateString(`pt-BR`)} · Atelier CRM`,i/2,a-14,{align:`center`}),r.save(`certificado-${e.numeroSerie.toLowerCase()}.pdf`),A(`Certificado gerado com sucesso!`,`sucesso`)}},Hi=class extends H{constructor(e,t){super(e,t),this.filtros={tag:``,categoria:``,obra:``},this.indiceArrastado=null,this.itensApresentacao=[],this.indiceApresentacao=0}referenciasFiltradas(){let e=this.dataStore.listar(`referencias`),t=this.filtros;return t.tag&&(e=e.filter(e=>(e.tags||[]).includes(t.tag))),t.categoria&&(e=e.filter(e=>e.categoria===t.categoria)),t.obra&&(e=e.filter(e=>e.obraVinculada===t.obra)),e}tagsDisponiveis(){let e=this.dataStore.listar(`referencias`).flatMap(e=>e.tags||[]);return[...new Set(e)].sort()}categoriasDisponiveis(){let e=this.dataStore.listar(`referencias`).map(e=>e.categoria).filter(Boolean);return[...new Set(e)].sort()}render(){let e=this.referenciasFiltradas(),t=this.tagsDisponiveis(),n=this.categoriasDisponiveis(),r=W().items,i=e.length?`
      <div class="grid-referencias" id="gridReferencias">
        ${e.map((e,t)=>this.renderCard(e,t,r)).join(``)}
      </div>
    `:`
      <div class="tabela-wrapper">
        <div class="estado-vazio"><div class="icone-vazio">📒</div><p>Nenhuma referência encontrada. Adicione imagens, links ou notas para montar seu board.</p></div>
      </div>
    `;return`
      <div class="view-cabecalho">
        <div>
          <h2>Board de Referências</h2>
          <p class="subtitulo">${e.length} item${e.length===1?``:`ns`}  ·  arraste os cards para reorganizar</p>
        </div>
        <div class="barra-acoes-referencias">
          <button class="btn-secundario" id="btnApresentarReferencias">📺 Apresentar</button>
          <button class="btn-primario" id="btnNovaReferencia"><i class="fas fa-plus"></i> Nova Referência</button>
        </div>
      </div>

      <div class="catalogo-filtros">
        <div class="campo-filtro">
          <label>Tag</label>
          <select id="filtroRefTag">
            <option value="">Todas</option>
            ${t.map(e=>`<option value="${e}" ${this.filtros.tag===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Categoria</label>
          <select id="filtroRefCategoria">
            <option value="">Todas</option>
            ${n.map(e=>`<option value="${e}" ${this.filtros.categoria===e?`selected`:``}>${e}</option>`).join(``)}
          </select>
        </div>
        <div class="campo-filtro">
          <label>Obra vinculada</label>
          <select id="filtroRefObra">
            <option value="">Todas</option>
            ${r.map(e=>`<option value="${e.id}" ${this.filtros.obra===e.id?`selected`:``}>${e.titulo}</option>`).join(``)}
          </select>
        </div>
        <button class="btn-secundario" id="btnLimparFiltrosRef">Limpar filtros</button>
      </div>

      ${i}
    `}renderCard(e,t,n){let r=e.obraVinculada?n.find(t=>t.id===e.obraVinculada):null,i=(e.tags||[]).map(e=>`<span class="badge-tag">${e}</span>`).join(``),a;return a=e.tipo===`imagem`?`
        <img class="imagem-referencia" data-apresentar="${t}" src="${e.imagem}" alt="${e.titulo||`Referência`}">
        <div class="corpo-referencia">
          <div class="icone-tipo-referencia"><i class="fas fa-images"></i> Imagem</div>
          ${e.titulo?`<div class="titulo-referencia">${e.titulo}</div>`:``}
        </div>
      `:e.tipo===`link`?`
        <img class="imagem-referencia" data-apresentar="${t}" src="${e.url}" alt="${e.titulo||`Link de referência`}" onerror="this.style.display='none'">
        <div class="corpo-referencia">
          <div class="icone-tipo-referencia"><i class="fas fa-link"></i> Link externo</div>
          ${e.titulo?`<div class="titulo-referencia">${e.titulo}</div>`:``}
          <a class="link-referencia" href="${e.url}" target="_blank" rel="noopener">${e.url}</a>
        </div>
      `:`
        <div class="corpo-referencia" data-apresentar="${t}" style="cursor:pointer;">
          <div class="icone-tipo-referencia"><i class="fas fa-pencil-alt"></i> Nota</div>
          ${e.titulo?`<div class="titulo-referencia">${e.titulo}</div>`:``}
          <div class="nota-referencia">${e.nota||``}</div>
        </div>
      `,`
      <div class="card-referencia" draggable="true" data-indice="${t}" data-id="${e.id}">
        ${a}
        <div class="corpo-referencia" style="padding-top:0;">
          ${i?`<div class="tags-referencia">${i}</div>`:``}
          ${r?`<span class="badge-obra-vinculada">Usado em: ${r.titulo}</span>`:``}
        </div>
        <div class="acoes-referencia">
          <button class="btn-icone-tabela" data-excluir-referencia="${e.id}" style="flex:1;"><i class="fas fa-trash"></i> Excluir</button>
        </div>
      </div>
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`),t=document.getElementById(`btnNovaReferencia`);t&&t.addEventListener(`click`,()=>this.abrirFormulario());let n=document.getElementById(`btnApresentarReferencias`);n&&n.addEventListener(`click`,()=>this.abrirApresentacao(0));let r={filtroRefTag:`tag`,filtroRefCategoria:`categoria`,filtroRefObra:`obra`};Object.keys(r).forEach(e=>{let t=document.getElementById(e);t&&t.addEventListener(`change`,t=>{this.filtros[r[e]]=t.target.value,this.rerenderizar()})});let i=document.getElementById(`btnLimparFiltrosRef`);i&&i.addEventListener(`click`,()=>{this.filtros={tag:``,categoria:``,obra:``},this.rerenderizar()});let a=e=>{let t=e.target.closest(`[data-excluir-referencia]`),n=e.target.closest(`[data-apresentar]`);if(t){this.excluirReferencia(t.dataset.excluirReferencia);return}if(n){this.abrirApresentacao(Number(n.dataset.apresentar));return}};e.addEventListener(`click`,a),this._bindCache.delegReferencias={el:e,handler:a,type:`click`},this.ligarDragAndDrop()}ligarDragAndDrop(){let e=document.getElementById(`gridReferencias`);e&&e.querySelectorAll(`.card-referencia`).forEach(e=>{e.addEventListener(`dragstart`,()=>{this.indiceArrastado=Number(e.dataset.indice),e.classList.add(`arrastando`)}),e.addEventListener(`dragend`,()=>e.classList.remove(`arrastando`)),e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`zona-drop`)}),e.addEventListener(`dragleave`,()=>e.classList.remove(`zona-drop`)),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`zona-drop`);let n=Number(e.dataset.indice);if(this.indiceArrastado===null||this.indiceArrastado===n)return;let r=this.referenciasFiltradas(),[i]=r.splice(this.indiceArrastado,1);r.splice(n,0,i);let a=r.map(e=>e.id),o=this.dataStore.listar(`referencias`).filter(e=>!a.includes(e.id));this.dataStore.dados.referencias=[...r,...o],this.dataStore.salvar(),this.indiceArrastado=null,this.rerenderizar()})})}abrirFormulario(){let e=W().items;N(`
      <h3>Nova Referência</h3>
      <div class="grupo-botoes-toggle" id="grupoTipoReferencia">
        <button type="button" class="ativo" data-tipo-ref="imagem"><i class="fas fa-images"></i> Imagem</button>
        <button type="button" data-tipo-ref="link"><i class="fas fa-link"></i> Link</button>
        <button type="button" data-tipo-ref="nota"><i class="fas fa-pencil-alt"></i> Nota</button>
      </div>
      <form id="formReferencia">
        <div class="campo-form"><label>Título (opcional)</label><input type="text" id="campoTituloRef" aria-label="Título"></div>

        <div class="campo-form" data-bloco-tipo="imagem">
          <label>Imagem</label>
          <input type="file" id="campoArquivoRef" accept="image/*" aria-label="Imagem">
          <img id="previewImagemRef" class="preview-imagem-form" style="display:none;">
        </div>

        <div class="campo-form" data-bloco-tipo="link" style="display:none;">
          <label>URL da imagem/página</label>
          <input type="url" id="campoUrlRef" aria-label="URL da imagem" placeholder="https://...">
          <p class="texto-ajuda">Se a URL apontar para uma imagem, o preview aparecerá automaticamente no board.</p>
        </div>

        <div class="campo-form" data-bloco-tipo="nota" style="display:none;">
          <label>Nota</label>
          <textarea id="campoNotaRef" aria-label="Nota" placeholder="Escreva sua ideia, inspiração ou observação..."></textarea>
        </div>

        <div class="form-linha">
          <div class="campo-form">
            <label>Categoria</label>
            <input type="text" id="campoCategoriaRef" aria-label="Categoria" list="listaCategoriasRef" placeholder="cor, época, artista, emoção...">
            <datalist id="listaCategoriasRef">
              <option value="cor"><option value="época"><option value="artista"><option value="emoção"><option value="composição">
            </datalist>
          </div>
          <div class="campo-form">
            <label>Obra vinculada</label>
            <select id="campoObraVinculadaRef" aria-label="Obra vinculada">
              <option value="">Nenhuma</option>
              ${e.map(e=>`<option value="${e.id}">${e.titulo}</option>`).join(``)}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Tags (separadas por vírgula)</label><input type="text" id="campoTagsRef" aria-label="Tags" placeholder="Ex: quente, retrato, luz suave"></div>

        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarReferencia">Cancelar</button>
          <button type="submit" class="btn-primario">Adicionar ao Board</button>
        </div>
      </form>
    `);let t=`imagem`,n=``;document.querySelectorAll(`[data-tipo-ref]`).forEach(e=>{e.addEventListener(`click`,()=>{t=e.dataset.tipoRef,document.querySelectorAll(`[data-tipo-ref]`).forEach(t=>t.classList.toggle(`ativo`,t===e)),document.querySelectorAll(`[data-bloco-tipo]`).forEach(e=>{e.style.display=e.dataset.blocoTipo===t?`block`:`none`})})}),document.getElementById(`campoArquivoRef`).addEventListener(`change`,e=>{let t=e.target.files[0];if(!t)return;let r=new FileReader;r.onload=e=>{n=e.target.result;let t=document.getElementById(`previewImagemRef`);t.src=n,t.style.display=`block`},r.readAsDataURL(t)}),document.getElementById(`btnCancelarReferencia`).addEventListener(`click`,P),document.getElementById(`formReferencia`).addEventListener(`submit`,e=>{if(e.preventDefault(),t===`imagem`&&!n){A(`Selecione uma imagem para continuar.`,`aviso`);return}let r=document.getElementById(`campoUrlRef`).value.trim();if(t===`link`&&!r){A(`Informe a URL do link de referência.`,`aviso`);return}let i=document.getElementById(`campoNotaRef`).value.trim();if(t===`nota`&&!i){A(`Escreva o conteúdo da nota.`,`aviso`);return}let a=document.getElementById(`campoTagsRef`).value.split(`,`).map(e=>e.trim()).filter(Boolean),o={tipo:t,titulo:document.getElementById(`campoTituloRef`).value.trim(),imagem:t===`imagem`?n:``,url:t===`link`?r:``,nota:t===`nota`?i:``,categoria:document.getElementById(`campoCategoriaRef`).value.trim(),obraVinculada:document.getElementById(`campoObraVinculadaRef`).value||``,tags:a};this.dataStore.adicionar(`referencias`,o),P(),A(`Referência adicionada ao board!`,`sucesso`),this.rerenderizar()})}async excluirReferencia(e){if(!await R(`Remover este item do board de referências?`))return;let t=this.dataStore.buscarPorId(`referencias`,e);this.dataStore.remover(`referencias`,e);let{dataStore:n}=this;z(`Referência removida.`,()=>{n.dados.referencias.push(t),n.salvar()}),this.rerenderizar()}abrirApresentacao(e){if(this.itensApresentacao=this.referenciasFiltradas(),!this.itensApresentacao.length){A(`Não há itens para apresentar.`,`aviso`);return}this.indiceApresentacao=e||0;let t=document.createElement(`div`);t.className=`overlay-apresentacao`,t.id=`overlayApresentacaoRef`,document.body.appendChild(t);let n=document.createElement(`button`);n.className=`btn-fechar-apresentacao`,n.textContent=`✕`,n.setAttribute(`aria-label`,`Fechar apresentação`),n.addEventListener(`click`,()=>this.fecharApresentacao()),document.body.appendChild(n),t.dataset.temBotaoFechar=`true`,this._botaoFecharApresentacao=n,this._teclaApresentacao=e=>{e.key===`Escape`&&this.fecharApresentacao(),e.key===`ArrowRight`&&this.navegarApresentacao(1),e.key===`ArrowLeft`&&this.navegarApresentacao(-1)},window.addEventListener(`keydown`,this._teclaApresentacao),this.renderizarSlideApresentacao()}renderizarSlideApresentacao(){let e=document.getElementById(`overlayApresentacaoRef`);if(!e)return;let t=this.itensApresentacao[this.indiceApresentacao],n;n=t.tipo===`imagem`?`<img class="midia-apresentacao" src="${t.imagem}" alt="${t.titulo||``}">`:t.tipo===`link`?`<img class="midia-apresentacao" src="${t.url}" alt="${t.titulo||``}" onerror="this.outerHTML='<div class=\\'nota-apresentacao\\'>Link: ${t.url}</div>'">`:`<div class="nota-apresentacao">${t.nota||``}</div>`,e.innerHTML=`
      ${n}
      <div class="legenda-apresentacao">
        ${t.titulo?`<strong>${t.titulo}</strong>  ·  `:``}${this.indiceApresentacao+1} / ${this.itensApresentacao.length}
      </div>
      <div class="controles-apresentacao">
        <button id="btnApresentacaoAnterior">◀ Anterior</button>
        <button id="btnApresentacaoProxima">Próxima ▶</button>
      </div>
    `,document.getElementById(`btnApresentacaoAnterior`).addEventListener(`click`,()=>this.navegarApresentacao(-1)),document.getElementById(`btnApresentacaoProxima`).addEventListener(`click`,()=>this.navegarApresentacao(1))}navegarApresentacao(e){let t=this.itensApresentacao.length;this.indiceApresentacao=(this.indiceApresentacao+e+t)%t,this.renderizarSlideApresentacao()}fecharApresentacao(){let e=document.getElementById(`overlayApresentacaoRef`);e&&document.body.removeChild(e),this._botaoFecharApresentacao&&(document.body.removeChild(this._botaoFecharApresentacao),this._botaoFecharApresentacao=null),this._teclaApresentacao&&(window.removeEventListener(`keydown`,this._teclaApresentacao),this._teclaApresentacao=null)}},Ui=class{constructor(e,t){this.dataStore=e,this.router=t,this.obrasVisiveis=[],this.indiceAtual=0,this.tourAtivo=!1,this.tourInterval=null,this.tourDuracao=4,this.zoomNivel=1,this.zoomMin=1,this.zoomMax=4,this._boundKeyDown=null,this._boundResize=null}carregarObras(){let e=W().items;this.obrasVisiveis=e.filter(e=>e.imagem&&(e.status===`disponivel`||e.status===`em exposicao`||e.status===`disponível`||e.status===`em exposição`)),this.obrasVisiveis.length===0&&(this.obrasVisiveis=e.filter(e=>e.imagem).slice(0,20)),this.obrasVisiveis.length>20&&(this.obrasVisiveis=this.obrasVisiveis.slice(0,20)),this.indiceAtual>=this.obrasVisiveis.length&&(this.indiceAtual=0)}render(){if(this.carregarObras(),!(this.obrasVisiveis.length>0))return`
        <div class="galeria-virtual" style="display:flex;align-items:center;justify-content:center;background:var(--bg);min-height:400px;">
          <div style="text-align:center;color:var(--text-muted);">
            <div style="font-size:3rem;margin-bottom:12px;">🏛️</div>
            <h3 style="margin:0 0 8px;color:var(--text);">Galeria Virtual</h3>
            <p style="margin:0;font-size:0.9rem;">Adicione obras com imagem no Catálogo para vê-las aqui.</p>
            <button class="btn-primario" style="margin-top:16px;" data-acao="irCatalogo">Ir para Catálogo</button>
          </div>
        </div>`;let e=this.obrasVisiveis[this.indiceAtual],t=e.imagem||``,n=e.titulo||`Sem título`,r=e.tecnica||``,i=e.ano||``,a=e.preco?O(e.preco):``;e.descricao;let o=[r,i].filter(Boolean).join(` · `),s=this.obrasVisiveis.map((e,t)=>`
      <div class="gv-thumb ${t===this.indiceAtual?`ativo`:``}" data-indice="${t}" title="${e.titulo||``}">
        <img src="${e.imagem||``}" alt="${e.titulo||``}" loading="lazy">
      </div>
    `).join(``);return`
      <div class="galeria-virtual gv-2d" id="galeriaContainer">
        <div class="barra-topo">
          <h2>🏛️ Galeria Virtual</h2>
          <div class="acoes-barra">
            <button class="btn-bar" id="btnCompartilhar" title="Compartilhar galeria"><i class="fas fa-link"></i> Compartilhar</button>
            <button class="btn-bar ${this.tourAtivo?`ativo`:``}" id="btnTourToggle" title="Iniciar tour guiado">🎧 Tour</button>
          </div>
        </div>
        <div class="gv-slide-container" id="gvSlideContainer">
          <div class="gv-slide" id="gvSlide">
            <div class="gv-moldura" id="gvMoldura">
              <img class="gv-imagem" id="gvImagem" src="${t}" alt="${n}" draggable="false">
              <div class="gv-legenda">
                <div class="gv-titulo">${n}</div>
                ${o?`<div class="gv-meta">${o}</div>`:``}
                ${a?`<div class="gv-preco">${a}</div>`:``}
              </div>
            </div>
          </div>
          <button class="gv-nav gv-nav-prev" id="gvPrev" title="Anterior (←)" aria-label="Obra anterior">◀</button>
          <button class="gv-nav gv-nav-next" id="gvNext" title="Próxima (→)" aria-label="Próxima obra">▶</button>
          <div class="gv-zoom-controles" id="gvZoomControles">
            <button class="gv-zoom-btn" id="gvZoomOut" title="Diminuir zoom" aria-label="Diminuir zoom">−</button>
            <span class="gv-zoom-indicador" id="gvZoomIndicador">${Math.round(this.zoomNivel*100)}%</span>
            <button class="gv-zoom-btn" id="gvZoomIn" title="Aumentar zoom" aria-label="Aumentar zoom">+</button>
            <button class="gv-zoom-btn" id="gvZoomReset" title="Resetar zoom" aria-label="Resetar zoom">⟲</button>
          </div>
          <div class="gv-hint">Scroll para zoom · Duplo clique para ampliar · ← → para navegar</div>
        </div>
        <div class="gv-thumbstrip" id="gvThumbstrip">
          ${s}
        </div>
        <div class="hud-navegacao" id="hudNavegacao">
          <span class="nav-indicador" id="navIndicador">${this.indiceAtual+1} / ${this.obrasVisiveis.length} obras</span>
        </div>
        <div class="hud-tour ${this.tourAtivo?`visivel`:``}" id="hudTour">
          <button class="tour-btn" id="tourPrev" aria-label="Obra anterior">◀</button>
          <button class="tour-btn ${this.tourAtivo?`ativo`:``}" id="tourPlayPause" aria-label="Reproduzir ou pausar tour">${this.tourAtivo?`⏸`:`▶`}</button>
          <button class="tour-btn" id="tourNext" aria-label="Próxima obra">▶</button>
          <span class="tour-progresso" id="tourProgresso">${this.indiceAtual+1} / ${this.obrasVisiveis.length}</span>
        </div>
      </div>`}async aposRenderizar(){this.pararTour(),this._limparEventos(),this.obrasVisiveis.length!==0&&(this._bindEventos(),this._atualizarImagem())}_bindEventos(){let e=document.getElementById(`gvPrev`),t=document.getElementById(`gvNext`),n=document.getElementById(`gvSlideContainer`);document.getElementById(`gvSlide`),document.getElementById(`gvMoldura`),document.getElementById(`gvImagem`);let r=document.getElementById(`gvZoomIn`),i=document.getElementById(`gvZoomOut`),a=document.getElementById(`gvZoomReset`);e?.addEventListener(`click`,()=>this.anterior()),t?.addEventListener(`click`,()=>this.proximo()),r?.addEventListener(`click`,()=>this._aplicarZoom(this.zoomNivel*1.3)),i?.addEventListener(`click`,()=>this._aplicarZoom(this.zoomNivel/1.3)),a?.addEventListener(`click`,()=>this._aplicarZoom(1)),document.querySelectorAll(`.gv-thumb`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.indice);!isNaN(t)&&t>=0&&t<this.obrasVisiveis.length&&(this.indiceAtual=t,this._aplicarZoom(1),this._atualizarImagem())})}),this._boundKeyDown=e=>{[`INPUT`,`TEXTAREA`,`SELECT`].includes(e.target.tagName)||(e.key===`ArrowLeft`?this.anterior():e.key===`ArrowRight`?this.proximo():e.key===`+`||e.key===`=`?this._aplicarZoom(this.zoomNivel*1.3):e.key===`-`?this._aplicarZoom(this.zoomNivel/1.3):e.key===`0`&&this._aplicarZoom(1))},window.addEventListener(`keydown`,this._boundKeyDown),n?.addEventListener(`wheel`,e=>{e.preventDefault(),e.deltaY<0?this._aplicarZoom(this.zoomNivel*1.15):this._aplicarZoom(this.zoomNivel/1.15)},{passive:!1}),n?.addEventListener(`dblclick`,e=>{e.preventDefault(),this.zoomNivel>1?this._aplicarZoom(1):this._aplicarZoom(2.5)}),n?.addEventListener(`click`,e=>{e.target.closest(`.gv-nav`)||e.target.closest(`.gv-zoom-controles`)||this.zoomNivel>1||this.abrirZoom(this.indiceAtual)}),document.getElementById(`btnTourToggle`)?.addEventListener(`click`,()=>this.toggleTour()),document.getElementById(`tourPlayPause`)?.addEventListener(`click`,()=>this.toggleTour()),document.getElementById(`tourPrev`)?.addEventListener(`click`,()=>this.tourAnterior()),document.getElementById(`tourNext`)?.addEventListener(`click`,()=>this.tourProximo()),document.getElementById(`btnCompartilhar`)?.addEventListener(`click`,()=>this.compartilhar()),this._boundResize=()=>this._atualizarImagem(),window.addEventListener(`resize`,this._boundResize)}_limparEventos(){this._boundKeyDown&&(window.removeEventListener(`keydown`,this._boundKeyDown),this._boundKeyDown=null),this._boundResize&&(window.removeEventListener(`resize`,this._boundResize),this._boundResize=null)}_atualizarImagem(){if(this.obrasVisiveis.length===0)return;let e=this.obrasVisiveis[this.indiceAtual],t=document.getElementById(`gvImagem`),n=document.querySelector(`.gv-titulo`),r=document.querySelector(`.gv-meta`),i=document.querySelector(`.gv-preco`),a=document.getElementById(`navIndicador`),o=document.getElementById(`tourProgresso`);if(t&&(t.style.opacity=`0`,setTimeout(()=>{t.src=e.imagem||``,t.alt=e.titulo||`Sem título`,t.style.opacity=`1`},150)),n&&(n.textContent=e.titulo||`Sem título`),r){let t=[e.tecnica,e.ano].filter(Boolean).join(` · `);r.textContent=t,r.style.display=t?``:`none`}if(i){let t=e.preco?O(e.preco):``;i.textContent=t,i.style.display=t?``:`none`}a&&(a.textContent=`${this.indiceAtual+1} / ${this.obrasVisiveis.length} obras`),o&&(o.textContent=`${this.indiceAtual+1} / ${this.obrasVisiveis.length}`),document.querySelectorAll(`.gv-thumb`).forEach(e=>{e.classList.toggle(`ativo`,parseInt(e.dataset.indice)===this.indiceAtual)});let s=document.querySelector(`.gv-thumb.ativo`);s&&s.scrollIntoView({behavior:`smooth`,inline:`center`,block:`nearest`})}_aplicarZoom(e){this.zoomNivel=Math.max(this.zoomMin,Math.min(this.zoomMax,e));let t=document.getElementById(`gvSlide`),n=document.getElementById(`gvZoomIndicador`);t&&(t.style.transform=`scale(${this.zoomNivel})`,t.style.cursor=this.zoomNivel>1?`zoom-out`:`zoom-in`),n&&(n.textContent=`${Math.round(this.zoomNivel*100)}%`)}anterior(){this.obrasVisiveis.length!==0&&(this.indiceAtual=(this.indiceAtual-1+this.obrasVisiveis.length)%this.obrasVisiveis.length,this._aplicarZoom(1),this._atualizarImagem(),this.tourAtivo&&this._reiniciarTimerTour())}proximo(){this.obrasVisiveis.length!==0&&(this.indiceAtual=(this.indiceAtual+1)%this.obrasVisiveis.length,this._aplicarZoom(1),this._atualizarImagem(),this.tourAtivo&&this._reiniciarTimerTour())}toggleTour(){this.tourAtivo?this.pararTour():this.iniciarTour()}iniciarTour(){this.obrasVisiveis.length!==0&&(this.tourAtivo=!0,this._mostrarHudTour(!0),this._atualizarBotaoTour(),this._iniciarTimerTour())}pararTour(){this.tourAtivo=!1,this._pararTimerTour(),this._mostrarHudTour(!1),this._atualizarBotaoTour()}_iniciarTimerTour(){this._pararTimerTour(),this.tourInterval=setInterval(()=>{this.tourAtivo&&this.proximo()},this.tourDuracao*1e3)}_pararTimerTour(){this.tourInterval&&(clearInterval(this.tourInterval),this.tourInterval=null)}_reiniciarTimerTour(){this.tourAtivo&&(this._pararTimerTour(),this._iniciarTimerTour())}tourAnterior(){this.obrasVisiveis.length!==0&&(this.indiceAtual=(this.indiceAtual-1+this.obrasVisiveis.length)%this.obrasVisiveis.length,this._aplicarZoom(1),this._atualizarImagem(),this.tourAtivo&&this._reiniciarTimerTour())}tourProximo(){if(this.obrasVisiveis.length!==0){if(this.indiceAtual=(this.indiceAtual+1)%this.obrasVisiveis.length,this.indiceAtual===0&&this.tourAtivo){this.pararTour();return}this._aplicarZoom(1),this._atualizarImagem(),this.tourAtivo&&this._reiniciarTimerTour()}}_mostrarHudTour(e){let t=document.getElementById(`hudTour`);t&&t.classList&&t.classList.toggle(`visivel`,e)}_atualizarBotaoTour(){let e=document.getElementById(`btnTourToggle`);e&&e.classList&&(e.classList.toggle(`ativo`,this.tourAtivo),e.textContent=this.tourAtivo?`⏹ Tour`:`🎧 Tour`);let t=document.getElementById(`tourPlayPause`);t&&t.classList&&(t.classList.toggle(`ativo`,this.tourAtivo),t.textContent=this.tourAtivo?`⏸`:`▶`)}abrirZoom(e){e<0||e>=this.obrasVisiveis.length||Yr(this.obrasVisiveis.map(e=>({src:e.imagem||``,title:e.titulo||`Sem título`,subtitle:[e.tecnica,e.ano].filter(Boolean).join(` · `),caption:e.descricao||``,price:e.preco?O(e.preco):``,id:e.id})),e)}fecharZoom(){$i&&$i.close()}compartilhar(){let e=window.location.origin+window.location.pathname+`#galeria=virtual&tour=obras-disponiveis`,t=`Olá! <i class="fas fa-palette"></i> Convido você para um tour virtual pela minha galeria de obras:\n${e}\n\nAprecie a exposição!`;navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(()=>this._mostrarToastCompartilhar(e)).catch(()=>this._fallbackCompartilhar(e,t)):this._fallbackCompartilhar(e,t)}_fallbackCompartilhar(e,t){let n=document.createElement(`textarea`);n.value=t,n.style.position=`fixed`,n.style.left=`-9999px`,document.body.appendChild(n),n.select();try{document.execCommand(`copy`),this._mostrarToastCompartilhar(e)}catch{prompt(`Copie o link abaixo:`,e)}document.body.removeChild(n)}_mostrarToastCompartilhar(e){let t=document.querySelector(`.toast-compartilhar`);t&&t.remove();let n=document.createElement(`div`);n.className=`toast-compartilhar`,n.innerHTML=`
      <span><i class="fas fa-check"></i> Link copiado!</span>
      <span style="font-size:0.75rem;color:rgba(255,255,255,0.5);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e}</span>
      <button class="btn-toast" id="btnAbrirLinkCompartilhado">Abrir</button>`,document.body.appendChild(n),document.getElementById(`btnAbrirLinkCompartilhado`)?.addEventListener(`click`,()=>{n.remove(),this.router&&this.router.navegar(`galeriaVirtual`)}),setTimeout(()=>{n.parentNode&&n.remove()},5e3)}destruir(){this.pararTour(),this.fecharZoom(),this._limparEventos()}},Wi=[{status:`rascunho`,rotulo:`Rascunho`,cor:`#6b7280`},{status:`enviado`,rotulo:`Enviado`,cor:`#3b82f6`},{status:`aprovado`,rotulo:`Aprovado`,cor:`#16a34a`},{status:`recusado`,rotulo:`Recusado`,cor:`#dc2626`}],Gi=class extends H{constructor(e,t){super(e,t),this.calc={nome:``,clienteId:``,tecnica:``,materiais:0,horas:0,valorHora:60,largura:0,altura:0,profundidade:0,complexidade:3,multiplicador:1.5,arredondamento:0,comissaoGaleria:0},this.fatoresComplexidade=[0,.7,.85,1,1.2,1.5],this.modoOrcamentos=localStorage.getItem(`atelier-crm-view-mode-orcamentos`)||`kanban`,this.tabAtiva=localStorage.getItem(`atelier-crm-tab-precificador`)||`calcular`,this.kioskAtivo=!1}get config(){return q().precificador||{}}get cfgRoot(){return q()}get moeda(){return this.cfgRoot.moedaPadrao||`BRL`}get taxas(){return this.cfgRoot.taxasCambio||{}}get regras(){return this.cfgRoot.precificadorRegras||[]}get orcamentos(){return this.cfgRoot.precificadorOrcamentos||[]}salvarConfig(e){let t=this.cfgRoot;t.precificador={...t.precificador||{},...e},q().salvar()}fmt(e,t){let n=t||this.moeda,r={BRL:`pt-BR`,USD:`en-US`,EUR:`de-DE`,GBP:`en-GB`}[n]||`pt-BR`;try{return(Number(e)||0).toLocaleString(r,{style:`currency`,currency:n,maximumFractionDigits:2})}catch{return(Number(e)||0).toLocaleString(`pt-BR`,{style:`currency`,currency:`BRL`})}}converter(e,t,n){let r=Number(e)||0;if(t===n)return r;let i=this.taxas,a=t===`BRL`?r:i[t]?r*i[t]:r;return n===`BRL`?a:i[n]?a/i[n]:a}render(){let e=W().items||[],t=K().items||[],n=G().items||[],r=e.length>0;this.calc.valorHora=Number(this.calc.valorHora)||this.config.valorHora||60,this.calc.multiplicador=Number(this.calc.multiplicador)||this.config.multiplicadorExperiencia||1.5,this.calc.arredondamento=Number(this.calc.arredondamento)||this.config.arredondamento||0,this.calc.comissaoGaleria=Number(this.calc.comissaoGaleria)||0;let i=n.map(e=>`<option value="${e.id}" ${this.calc.clienteId===e.id?`selected`:``}>${e.nome}${e.email?` — `+e.email:``}</option>`).join(``),a=[``,`óleo`,`acrílica`,`aquarela`,`guache`,`têmpera`,`desenho`,`gravura`,`escultura`,`cerâmica`,`têxtil`,`outra`].map(e=>`<option value="${e}" ${this.calc.tecnica===e?`selected`:``}>${e?L(e):`Técnica livre`}</option>`).join(``),o={calcular:`Calcular`,orcamentos:`Orcamentos`,regras:`Regras`,inteligencia:`Inteligencia`},s=this.tabAtiva in o?this.tabAtiva:`calcular`,c=e=>e===s?``:` style="display:none"`,l=(e,t,n)=>`
      <button class="prec-tab${e===s?` ativo`:``}" data-tab="${e}" aria-selected="${e===s}">
        ${t}${n?` <span class="badge">${n}</span>`:``}
      </button>`;return`
      <div class="precificador" id="precificadorContainer">
        <div class="precificador-toolbar">
          <div class="moeda-selector">
            <label>Moeda:</label>
            <select id="selMoedaPadrao">
              ${[`BRL`,`USD`,`EUR`,`GBP`].map(e=>`<option value="${e}" ${this.moeda===e?`selected`:``}>${e}</option>`).join(``)}
            </select>
            <button class="btn-miniatura" id="btnEditarTaxas" title="Editar taxas de câmbio" aria-label="Editar taxas de câmbio">💱</button>
          </div>
          <button class="btn-secundario" id="btnAbrirRegras"><i class="fas fa-clipboard"></i> Regras de Precificação</button>
          <button class="btn-secundario" id="btnAbrirTecnicas"><i class="fas fa-swatchbook"></i> Custos por Técnica</button>
          <button class="btn-secundario" id="btnApresentarKiosk" title="Modo apresentação das propostas"><i class="fas fa-tv"></i> Apresentar</button>
          <button class="btn-primario" id="btnExportarRelatorio"><i class="fas fa-phone"></i> Relatório PDF</button>
        </div>

        <div class="prec-tabs" id="precTabs" role="tablist">
          ${l(`calcular`,`🧮 Calcular`)}
          ${l(`orcamentos`,`🗂️ Orçamentos`,this.orcamentos.length)}
          ${l(`regras`,`📋 Regras`,this.regras.length)}
          ${l(`inteligencia`,`🤖 Inteligência`)}
        </div>

        <div class="prec-painel" id="precPainel${o.calcular}"${c(`calcular`)}>
          <div class="card">
            <h3>🧮 Calculadora de Preço <span class="badge">Orçamento</span></h3>
            <div class="calc-grid">
            <div class="campo-calc" style="grid-column:1/-1">
              <label>🖼️ Obra / peça <span class="texto-ajuda">(nome do orçamento)</span></label>
              <input type="text" id="calcNome" placeholder="Ex.: Pintura acrílica sobre tela — Série Horizonte" value="${this.calc.nome||``}">
            </div>
            <div class="campo-calc">
              <label><i class="fas fa-user"></i> Cliente</label>
              <select id="calcCliente" aria-label="Cliente"><option value="">— Cliente avulso —</option>${i}</select>
            </div>
            <div class="campo-calc">
              <label>🎨 Técnica</label>
              <select id="calcTecnica" aria-label="Técnica">${a}</select>
            </div>
            <div class="campo-calc">
              <label><i class="fas fa-dollar-sign"></i> Custo materiais (${this.moeda})</label>
              <input type="number" id="calcMateriais" aria-label="Custo materiais" value="${this.calc.materiais}" min="0" step="0.1">
            </div>
            <div class="campo-calc">
              <label>⏱ Horas trabalhadas</label>
              <input type="number" id="calcHoras" aria-label="Horas trabalhadas" value="${this.calc.horas}" min="0" step="0.5">
            </div>
            <div class="campo-calc">
              <label>🙵 Valor hora (${this.moeda})</label>
              <input type="number" id="calcValorHora" aria-label="Valor hora" value="${this.calc.valorHora}" min="0" step="1">
            </div>
            <div class="campo-calc">
              <label>📐 Dimensões (cm)</label>
              <div class="calc-dims">
                <input type="number" id="calcLargura" aria-label="Largura" value="${this.calc.largura}" min="0" placeholder="Larg.">
                <span>×</span>
                <input type="number" id="calcAltura" aria-label="Altura" value="${this.calc.altura}" min="0" placeholder="Alt.">
                <span>×</span>
                <input type="number" id="calcProfundidade" aria-label="Profundidade" value="${this.calc.profundidade}" min="0" placeholder="Prof.">
              </div>
            </div>
            <div class="campo-calc">
              <label><i class="fas fa-star"></i> Complexidade</label>
              <div class="estrelas-input" id="estrelasInput">
                ${[1,2,3,4,5].map(e=>`<span class="estrela ${e<=this.calc.complexidade?`preenchida`:``}" data-val="${e}">★</span>`).join(``)}
              </div>
            </div>
            <div class="campo-calc">
              <label>⚡ Multiplicador <span class="texto-ajuda">(experiência/marca)</span></label>
              <input type="number" id="calcMultiplicador" aria-label="Multiplicador" value="${this.calc.multiplicador}" min="1" step="0.1">
            </div>
            <div class="campo-calc">
              <label>🏛️ Comissão de galeria (%)</label>
              <input type="number" id="calcComissao" aria-label="Comissão de galeria" value="${this.calc.comissaoGaleria}" min="0" max="90" step="1" title="Percentual repassado à galeria. Mostra preço ateliê vs. preço galeria.">
            </div>
            <div class="campo-calc">
              <label>🔢 Arredondamento</label>
              <select id="calcArredondamento" aria-label="Arredondamento">
                <option value="0" ${this.calc.arredondamento===0?`selected`:``}>Sem arredondamento</option>
                <option value="50" ${this.calc.arredondamento===50?`selected`:``}>Múltiplos de 50</option>
                <option value="100" ${this.calc.arredondamento===100?`selected`:``}>Múltiplos de 100</option>
                <option value="250" ${this.calc.arredondamento===250?`selected`:``}>Múltiplos de 250</option>
                <option value="500" ${this.calc.arredondamento===500?`selected`:``}>Múltiplos de 500</option>
              </select>
            </div>
          </div>

          <div class="resultado-preco" id="resultadoPreco">
            <div class="rotulo-sugerido">Preço Sugerido</div>
            <div class="valor-sugerido" id="valorSugerido">${this.fmt(this.calcularPreco(this.calc))}</div>
            <div class="detalhe-calculo" id="detalheCalculo">${this.detalharCalculo(this.calcularPreco(this.calc))}</div>
            <div id="conversoesMultiMoeda" class="conversoes-multi"></div>
          </div>

          <div class="breakdown-grid" id="breakdownGrid">${this.renderBreakdown(this.calcularBreakdown(this.calc))}</div>
          <div id="regraAuto">${this.renderRegraAuto()}</div>

          <div class="orcamento-acoes">
            <select id="selTemplateProposta" class="orc-status-select" aria-label="Template da proposta PDF" title="Template da proposta PDF">
              <option value="classico" ${(this.config.templateProposta||`classico`)===`classico`?`selected`:``}>📜 Clássico serifado</option>
              <option value="moderno" ${this.config.templateProposta===`moderno`?`selected`:``}>🎨 Moderno</option>
              <option value="minimalista" ${this.config.templateProposta===`minimalista`?`selected`:``}>◽ Minimalista</option>
            </select>
            <button class="btn-secundario" id="btnCopiarPreco"><i class="fas fa-copy"></i> Copiar</button>
            <button class="btn-primario" id="btnSalvarOrcamento"><i class="fas fa-save"></i> Salvar Orçamento</button>
            <button class="btn-secundario" id="btnPropostaPDF"><i class="fas fa-file-pdf"></i> Proposta PDF</button>
            <button class="btn-secundario" id="btnCriarEncomenda"><i class="fas fa-box-open"></i> Criar Encomenda</button>
          </div>
        </div>
        </div>

        <div class="prec-painel" id="precPainelOrcamentos"${c(`orcamentos`)}>
          ${this.renderOrcamentos()}
        </div>

        <div class="prec-painel" id="precPainelRegras"${c(`regras`)}>
          <div class="card card-full">
            <h3>📋 Regras de Precificação</h3>
            <p class="texto-ajuda" style="margin-top:-4px;margin-bottom:10px;">Regras automáticas: técnica + dimensão → preço sugerido. Use "qualquer" para técnica. Atalho: <kbd>Ctrl</kbd>+<kbd>Enter</kbd> salva orçamento, <kbd>Enter</kbd> recalcula.</p>
            ${this.renderRegrasPanel()}
          </div>
        </div>

        <div class="prec-painel" id="precPainelInteligencia"${c(`inteligencia`)}>
          <div class="card">
            <h3>🤖 Inteligência de Mercado</h3>
            <div id="sugestaoInteligente">${this.renderSugestaoInteligente()}</div>
            <div id="faixaNegociacao">${this.renderFaixaNegociacao()}</div>
          </div>

          ${r?this.renderBreakEven(e):``}
          ${r?this.renderMLCard(e,t):``}
          ${r?this.renderProjecao(e):``}

          <div class="card card-full">
            <h3><i class="fas fa-chart-bar"></i> Análise do Portfólio</h3>
            ${r?this.renderAnalise(e,t):`<p style="color:var(--text-muted);font-size:0.85rem;">Adicione obras no Catálogo para ver análises.</p>`}
          </div>

          <div class="card card-full">
            <h3><i class="fas fa-bullseye"></i> Metas Financeiras</h3>
            ${this.renderMetas(e,t)}
          </div>
        </div>

        <div class="kiosk-overlay" id="kioskOverlay" style="display:none" role="dialog" aria-modal="true" aria-label="Apresentação da proposta">
          <button class="kiosk-fechar" id="btnKioskFechar" title="Fechar (Esc)">✕</button>
          <div class="kiosk-conteudo">
            <div class="kiosk-header">${this.config.nomeArtista||`Atelier`} <span class="kiosk-sep">·</span> Proposta</div>
            <div class="kiosk-nome">${this.calc.nome||`Orçamento sem nome`}</div>
            <div class="kiosk-valor" id="kioskValor">${this.fmt(this.calcularPreco(this.calc))}</div>
            <div class="kiosk-moeda">${this.moeda}${this.calc.tecnica?` · `+L(this.calc.tecnica):``}</div>
            <div id="kioskBreakdown">${this.renderKioskBreakdown()}</div>
            <div class="kiosk-acoes">
              <button class="btn-primario" id="btnKioskSalvar"><i class="fas fa-save"></i> Salvar Orçamento</button>
              <button class="btn-secundario" id="btnKioskPDF"><i class="fas fa-file-pdf"></i> Proposta PDF</button>
            </div>
          </div>
        </div>
      </div>

      ${this.renderModalTaxas()}
      ${this.renderModalTecnicas()}
    `}renderRegrasPanel(){let e=this.regras;return`
      <div class="regras-lista" id="regrasLista">
        ${e.length===0?`<p style="color:var(--text-muted);text-align:center;">Nenhuma regra cadastrada.</p>`:``}
        ${e.map((e,t)=>`
          <div class="regra-item" data-regra-idx="${t}">
            <div class="regra-info">
              <strong>${e.nome}</strong>
              <span class="texto-ajuda">${e.tecnica||`qualquer`} · ${e.larguraMin}–${e.larguraMax}×${e.alturaMin}–${e.alturaMax}cm · ×${e.multiplicador} · base ${this.fmt(e.precoBase)}</span>
            </div>
            <div class="regra-acoes">
              <button class="btn-miniatura btn-aplicar-regra" data-idx="${t}">▶ Aplicar</button>
              <button class="btn-miniatura btn-remover-regra" data-idx="${t}" style="color:#dc2626;" aria-label="Remover regra">✕</button>
            </div>
          </div>
        `).join(``)}
      </div>
      <hr style="margin:12px 0;border-color:var(--border);">
      <h4 style="margin:0 0 8px;font-size:0.85rem;">Nova Regra</h4>
      <div class="regra-form">
        <input type="text" id="regraNome" placeholder="Nome da regra" class="regra-input" aria-label="Nome da regra">
        <select id="regraTecnica" class="regra-input" aria-label="Técnica">
          <option value="">Qualquer técnica</option>
          <option value="óleo">Óleo</option>
          <option value="aquarela">Aquarela</option>
          <option value="escultura">Escultura</option>
          <option value="acrílica">Acrílica</option>
          <option value="outra">Outra</option>
        </select>
        <div style="display:flex;gap:6px;grid-column:1/-1;">
          <input type="number" id="regraLargMin" placeholder="Larg. min (cm)" class="regra-input" style="flex:1" aria-label="Largura mínima">
          <input type="number" id="regraLargMax" placeholder="Larg. max (cm)" class="regra-input" style="flex:1" aria-label="Largura máxima">
          <input type="number" id="regraAltMin" placeholder="Alt. min (cm)" class="regra-input" style="flex:1" aria-label="Altura mínima">
          <input type="number" id="regraAltMax" placeholder="Alt. max (cm)" class="regra-input" style="flex:1" aria-label="Altura máxima">
        </div>
        <div style="display:flex;gap:6px;grid-column:1/-1;">
          <input type="number" id="regraMult" placeholder="Multiplicador (ex: 2.0)" class="regra-input" value="1.5" style="flex:1" aria-label="Multiplicador">
          <input type="number" id="regraBase" placeholder="Preço base" class="regra-input" value="0" style="flex:1" aria-label="Preço base">
          <input type="number" id="regraComplexidade" placeholder="Complexidade (1-5)" class="regra-input" value="3" min="1" max="5" style="flex:1" aria-label="Complexidade">
        </div>
        <button class="btn-primario" id="btnAdicionarRegra" style="grid-column:1/-1;">+ Adicionar Regra</button>
      </div>
      <div style="margin-top:12px;">
        <button class="btn-secundario" id="btnAplicarRegrasTodas">▶ Aplicar todas as regras em obras sem preço</button>
      </div>
    `}mudarAba(e){let t={calcular:`Calcular`,orcamentos:`Orcamentos`,regras:`Regras`,inteligencia:`Inteligencia`};t[e]&&(this.tabAtiva=e,localStorage.setItem(`atelier-crm-tab-precificador`,e),document.querySelectorAll(`#precTabs .prec-tab`).forEach(t=>{let n=t.dataset.tab===e;t.classList.toggle(`ativo`,n),t.setAttribute(`aria-selected`,String(n))}),Object.entries(t).forEach(([t,n])=>{let r=document.getElementById(`precPainel`+n);r&&(r.style.display=t===e?``:`none`)}))}renderOrcamentos(){let e=this.orcamentos,t=e.length===0?`<div class="estado-vazio"><div class="icone-vazio">🧾</div><p>Nenhum orçamento salvo ainda. Preencha a calculadora e clique em <strong>Salvar Orçamento</strong>.</p></div>`:this.modoOrcamentos===`lista`?this.renderOrcamentosLista(e):this.renderOrcamentosKanban(e);return`
      <div class="card card-full" id="orcamentosContainer">
        <div class="orc-toolbar">
          <h3>🗂️ Orçamentos Salvos <span class="badge">${e.length}</span></h3>
          <div class="toggle-visualizacao">
            <button id="btnKanbanOrc" class="${this.modoOrcamentos===`kanban`?`ativo`:``}" aria-label="Visualizar como kanban"><i class="fas fa-columns"></i> Kanban</button>
            <button id="btnListaOrc" class="${this.modoOrcamentos===`lista`?`ativo`:``}" aria-label="Visualizar como lista"><i class="fas fa-list"></i> Lista</button>
          </div>
        </div>
        ${e.length>0?this.renderPipelineCard():``}
        ${t}
      </div>
    `}_calcularPipeline(){let e=this.orcamentos;if(e.length===0)return null;let t=e.filter(e=>{let t=e.status||`rascunho`;return[`enviado`,`aprovado`,`recusado`].includes(t)||e.aceiteData||e.convertidoEm||e.aprovadoEm||e.enviadoEm}),n=e.filter(e=>(e.status||`rascunho`)===`aprovado`||e.aceiteData||e.convertidoEm||e.aprovadoEm),r=n.filter(e=>e.convertidoEm||e.vendaId),i=n.filter(e=>!e.convertidoEm&&!e.vendaId),a=t.length>0?n.length/t.length*100:0,o=0,s=0;n.forEach(e=>{let t=this._tsData(e.enviadoEm||e.data||e.criadoEm),n=this._tsData(e.aceiteData||e.aprovadoEm||e.convertidoEm);t===null||n===null||n<t||(o+=(n-t)/864e5,s++)});let c=i.reduce((e,t)=>e+(Number(t.preco)||0),0);return{total:e.length,enviados:t.length,aprovados:n.length,convertidos:r.length,emAberto:i.length,taxaConversao:a,tempoMedio:s>0?o/s:null,receitaPotencial:c}}_tsData(e){if(!e)return null;let t=String(e),n=(/^\d{4}-\d{2}-\d{2}$/.test(t)?new Date(t+`T12:00:00`):new Date(t)).getTime();return Number.isFinite(n)?n:null}renderPipelineCard(){let e=this._calcularPipeline();if(!e)return``;let t=e.tempoMedio===null?`—`:`${e.tempoMedio.toFixed(1)} dia${e.tempoMedio===1?``:`s`}`;return`
      <div class="pipeline-grid">
        <div class="pipeline-card pc-conversao">
          <div class="pc-valor">${e.taxaConversao.toFixed(0)}%</div>
          <div class="pc-rotulo">Taxa de conversão <span class="pc-sub-inline">enviados → aprovados</span></div>
          <div class="pc-sub">${e.aprovados} de ${e.enviados} aprovados</div>
        </div>
        <div class="pipeline-card pc-tempo">
          <div class="pc-valor">${t}</div>
          <div class="pc-rotulo">Tempo médio até aprovação</div>
          <div class="pc-sub">${e.convertidos} já convertido${e.convertidos===1?``:`s`} em venda</div>
        </div>
        <div class="pipeline-card pc-receita">
          <div class="pc-valor">${this.fmt(e.receitaPotencial)}</div>
          <div class="pc-rotulo">Receita potencial em aberto</div>
          <div class="pc-sub">${e.emAberto} aprovado${e.emAberto===1?``:`s`} não convertido${e.emAberto===1?``:`s`}</div>
        </div>
      </div>
    `}renderOrcamentosKanban(e){return`<div class="kanban-board">${Wi.map(t=>{let n=e.filter(e=>(e.status||`rascunho`)===t.status);return`
        <div class="kanban-coluna" data-status="${t.status}" style="border-top: 3px solid ${t.cor};">
          <div class="kanban-coluna-header" style="color:${t.cor};">
            <span class="kanban-coluna-titulo">${t.rotulo}</span>
            <span class="kanban-coluna-contagem">${n.length}</span>
          </div>
          <div class="kanban-coluna-corpo">
            ${n.map(e=>this._kanbanCardHtml(e)).join(``)}
            ${n.length===0?`<div style="font-size:0.72rem;color:var(--text-muted);text-align:center;padding:14px 0;">Arraste orçamentos aqui</div>`:``}
          </div>
        </div>
      `}).join(``)}</div>`}_kanbanCardHtml(e){let t=[e.largura,e.altura,e.profundidade].filter(Boolean).join(`×`),n=Wi.filter(t=>t.status!==(e.status||`rascunho`)),r=e.convertidoEm?`<span class="orc-convertido" title="Convertido em venda em ${k(e.convertidoEm)}">✓ Vendido</span>`:``;return`
      <div class="kanban-card" draggable="true" data-id="${e.id}" data-status="${e.status||`rascunho`}">
        <div class="kanban-card-corpo">
          ${e.numero?`<div class="orc-kb-numero"><span>${e.numero}</span>${r}</div>`:``}
          <div class="kanban-card-nome"><strong>${e.nome||`Orçamento sem nome`}</strong></div>
          <div class="kanban-card-desc">${e.clienteNome||`Cliente avulso`}${e.tecnica?` · `+L(e.tecnica):``}</div>
          <div class="kanban-card-meta">
            <span style="font-weight:700;">${this.fmt(e.preco,e.moeda||this.moeda)}</span>
            ${t?`<span class="orc-kb-dims">${t}cm</span>`:``}
          </div>
        </div>
        <div class="kanban-card-acoes">
          <button class="btn-miniatura btn-orc-carregar" data-id="${e.id}" title="Carregar na calculadora" aria-label="Carregar na calculadora">✎</button>
          <button class="btn-miniatura btn-orc-pdf" data-id="${e.id}" title="Exportar proposta PDF" aria-label="Exportar proposta PDF">📄</button>
          <button class="btn-miniatura btn-orc-encomenda" data-id="${e.id}" title="Criar encomenda" aria-label="Criar encomenda">📦</button>
          ${e.status===`aprovado`&&!e.convertidoEm?`<button class="btn-miniatura btn-orc-venda" data-id="${e.id}" title="Aprovar e registrar venda" aria-label="Registrar venda">💰</button>`:``}
          <button class="kanban-mobile-menu-btn" data-id="${e.id}" title="Mover etapa / excluir" aria-label="Mais ações"><i class="fas fa-ellipsis-v"></i></button>
          <div class="kanban-mobile-dropdown" data-id="${e.id}">
            ${n.map(t=>`<button class="kanban-mover-btn" data-id="${e.id}" data-status="${t.status}"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${t.cor};margin-right:6px;"></span>${t.rotulo}</button>`).join(``)}
            <button class="kanban-mover-btn btn-orc-excluir" data-id="${e.id}" style="color:#dc2626;">✕ Excluir</button>
          </div>
        </div>
      </div>
    `}renderOrcamentosLista(e){let t={rascunho:`Rascunho`,enviado:`Enviado`,aprovado:`Aprovado`,recusado:`Recusado`};return`
      <div class="orcamentos-lista">
        ${e.map(e=>{let n=[e.largura,e.altura,e.profundidade].filter(Boolean).join(`×`);return`
          <div class="orcamento-item" data-id="${e.id}">
            <div class="orc-ident">
              <div class="orc-nome">${e.nome||`Orçamento sem nome`} <span class="orc-status st-${e.status||`rascunho`}">${t[e.status]||`Rascunho`}</span>${e.convertidoEm?` <span class="orc-convertido">✓ Vendido</span>`:``}</div>
              <div class="orc-meta">${e.numero?e.numero+` · `:``}${e.clienteNome||`Cliente avulso`}${e.tecnica?` · `+L(e.tecnica):``}${n?` · `+n+`cm`:``} · ${k(e.data||e.criadoEm)}${e.validadeData?` · válido até `+k(e.validadeData):``}</div>
            </div>
            <div class="orc-preco">${this.fmt(e.preco,e.moeda||this.moeda)}</div>
            <div class="orc-acoes">
              <select class="orc-status-select" data-acao="status" aria-label="Alterar status do orçamento">
                ${Object.keys(t).map(n=>`<option value="${n}" ${(e.status||`rascunho`)===n?`selected`:``}>${t[n]}</option>`).join(``)}
              </select>
              <button class="btn-miniatura btn-orc-carregar" data-id="${e.id}" title="Carregar na calculadora" aria-label="Carregar na calculadora">✎ Carregar</button>
              <button class="btn-miniatura btn-orc-pdf" data-id="${e.id}" title="Exportar proposta PDF" aria-label="Exportar proposta PDF">📄</button>
              <button class="btn-miniatura btn-orc-encomenda" data-id="${e.id}" title="Criar encomenda" aria-label="Criar encomenda">📦</button>
              ${e.status===`aprovado`&&!e.convertidoEm?`<button class="btn-miniatura btn-orc-venda" data-id="${e.id}" title="Aprovar e registrar venda" aria-label="Registrar venda">💰 Venda</button>`:``}
              <button class="btn-miniatura btn-orc-excluir" data-id="${e.id}" style="color:#dc2626;" title="Excluir orçamento" aria-label="Excluir orçamento">✕</button>
            </div>
          </div>`}).join(``)}
      </div>
    `}calcularBreakdown(e){let t=Number(e.materiais)||0,n=Number(e.horas)||0,r=Number(e.valorHora)||60,i=Math.max(1,Math.min(5,Number(e.complexidade)||3)),a=Number(e.multiplicador)||this.config.multiplicadorExperiencia||1.5,o=this.fatoresComplexidade[i]||1,s=n*r,c=t+s,l=Number(e.largura)||0,u=Number(e.altura)||0,d=Number(e.profundidade)||0,f=l*u,p=f>0?1+f/1e4:1,m=c*a*o*p,h=Number(e.arredondamento)||0,g=h>0?Math.max(h,Math.round(m/h)*h):Math.round(m),_=g-c,v=g>0?_/g*100:0,y=c>0?g/c:0,b=Math.max(0,Math.min(90,Number(e.comissaoGaleria)||0));return{materiais:t,horas:n,valorHora:r,maoObra:s,custoTotal:c,fator:o,mult:a,bonus:p,arred:h,precoBruto:m,preco:g,lucro:_,margem:v,markup:y,largura:l,altura:u,profundidade:d,area:f,comissaoPct:b,precoGaleria:b>=100?g:g/(1-b/100)}}calcularPreco(e){return this.calcularBreakdown(e).preco}detalharCalculo(e){let t=this.calcularBreakdown(this.calc);return`${`${this.fmt(t.materiais)} + (${t.horas}h × ${this.fmt(t.valorHora)}) = ${this.fmt(t.custoTotal)}`} × ${t.mult} × ${t.fator}${t.bonus===1?``:` × ${t.bonus.toFixed(2)} (área)`} = ${this.fmt(e)}`}renderBreakdown(e){let t=e.margem>=50?`bd-ok`:e.margem>=25?`bd-medio`:`bd-baixo`;return`
      <div class="bd-item"><span class="bd-label">Custo materiais</span><span class="bd-valor">${this.fmt(e.materiais)}</span></div>
      <div class="bd-item"><span class="bd-label">Mão de obra (${e.horas}h × ${this.fmt(e.valorHora)})</span><span class="bd-valor">${this.fmt(e.maoObra)}</span></div>
      <div class="bd-item bd-total"><span class="bd-label">Custo total</span><span class="bd-valor">${this.fmt(e.custoTotal)}</span></div>
      <div class="bd-item"><span class="bd-label">Multiplicador</span><span class="bd-valor">× ${e.mult}</span></div>
      <div class="bd-item"><span class="bd-label">Complexidade</span><span class="bd-valor">× ${e.fator}</span></div>
      ${e.bonus===1?``:`<div class="bd-item"><span class="bd-label">Bônus área (${(e.area/1e4).toFixed(2)} m²)</span><span class="bd-valor">× ${e.bonus.toFixed(2)}</span></div>`}
      <div class="bd-item"><span class="bd-label">Lucro estimado</span><span class="bd-valor">${this.fmt(e.lucro)}</span></div>
      <div class="bd-item"><span class="bd-label">Markup</span><span class="bd-valor">${e.markup.toFixed(2)}×</span></div>
      <div class="bd-item"><span class="bd-label">Margem</span><span class="bd-valor ${t}">${e.margem.toFixed(1)}%</span></div>
      <div class="bd-item bd-comissao"><span class="bd-label">Comissão de galeria</span><span class="bd-valor">${e.comissaoPct}%</span></div>
      <div class="bd-item bd-total"><span class="bd-label">Preço ateliê (seu)</span><span class="bd-valor">${this.fmt(e.preco)}</span></div>
      ${e.comissaoPct>0?`<div class="bd-item bd-galeria"><span class="bd-label">Preço galeria (p/ repassar ${e.comissaoPct}%)</span><span class="bd-valor">${this.fmt(e.precoGaleria)}</span></div>`:``}
    `}renderRegraAuto(){let e=this.calc,t=Number(e.largura)||0,n=Number(e.altura)||0,r=t*n;if(!r)return``;let i=this.regras.find(r=>!(r.tecnica&&e.tecnica&&r.tecnica!==e.tecnica||t&&(t<r.larguraMin||t>r.larguraMax)||n&&(n<r.alturaMin||n>r.alturaMax)));if(!i)return``;let a=Math.round((i.precoBase||0)*i.multiplicador*this.fatoresComplexidade[i.complexidade||3]*(1+r/1e4)),o=this.calcularPreco(this.calc);return`
      <div class="regra-auto">
        <span class="ra-icone">⚡</span>
        <div class="ra-texto">
          <strong>Regra automática aplicável: ${i.nome}</strong>
          <span class="texto-ajuda">Preço pela regra: ${this.fmt(a)}${o>0?` · Sugerido: ${this.fmt(o)}`:``}</span>
        </div>
      </div>
    `}renderSugestaoInteligente(){let e=this.calc,t=(Number(e.largura)||0)*(Number(e.altura)||0);if(!t)return``;let n=(W().items||[]).filter(e=>Number(e.preco)>0);if(n.length===0)return``;let r=n.filter(n=>{let r=n.dimensoes;if(!r||!r.largura||!r.altura)return!1;let i=r.largura*r.altura;return i>t*.5&&i<t*1.5&&(!e.tecnica||!n.tecnica||n.tecnica===e.tecnica)});if(r.length<2&&e.tecnica&&(r=n.filter(t=>t.tecnica===e.tecnica)),r.length<2)return`
        <div class="sugestao-card sugestao-fraca">
          <div class="sugestao-header">
            <span class="sugestao-titulo">🤖 Sugestão Inteligente</span>
            <span class="sugestao-confianca">Confiança <strong>baixa</strong></span>
          </div>
          <div class="sugestao-veredicto sv-baixo">Dados insuficientes: cadastre mais obras${e.tecnica?` de ${e.tecnica}`:``} no catálogo para comparar seu preço com o mercado.</div>
        </div>
      `;let i=r.map(e=>Number(e.preco)).sort((e,t)=>e-t),a=i[0],o=i[i.length-1],s=i.reduce((e,t)=>e+t,0)/i.length,c=this.calcularPreco(this.calc);if(c<=0)return``;let l=s>0?(c-s)/s*100:0,u=s>0?(o-a)/s:1,d=Math.round(Math.max(10,Math.min(98,100-Math.abs(l)*1.5-u*40-Math.max(0,5-r.length)*7))),f,p=`✓`,m;return Math.abs(l)<8?(f=`sv-ok`,m=`Alinhado ao mercado da ${e.tecnica?`técnica ${e.tecnica}`:`sua área`}. Preço competitivo — pode negociar com segurança na faixa abaixo.`):l>0?(f=`sv-alto`,p=`↑`,m=`Seu preço está ${Math.abs(l).toFixed(0)}% acima da média do mercado${e.tecnica?` da ${e.tecnica}`:``} (${this.fmt(Math.round(s))}). Justifique com curadoria, histórico ou série exclusiva — ou considere ajustar.`):(f=`sv-baixo`,p=`↓`,m=`Seu preço está ${Math.abs(l).toFixed(0)}% abaixo da média do mercado${e.tecnica?` da ${e.tecnica}`:``} (${this.fmt(Math.round(s))}). Há espaço para valorizar sua obra.`),`
      <div class="sugestao-card">
        <div class="sugestao-header">
          <span class="sugestao-titulo">🤖 Sugestão Inteligente</span>
          <span class="sugestao-confianca">Confiança <strong>${d}%</strong></span>
        </div>
        <div class="confianca-bar"><div class="confianca-fill" style="width:${d}%"></div></div>
        <div class="sugestao-veredicto ${f}">
          <span class="sv-icone">${p}</span>
          <span>${m}</span>
        </div>
        <div class="sugestao-niveis">
          <div class="sn-item"><div class="sn-valor">${this.fmt(c)}</div><div class="sn-rotulo">Sugerido (seu)</div></div>
          <div class="sn-item"><div class="sn-valor">${this.fmt(Math.round(s))}</div><div class="sn-rotulo">Média do mercado</div></div>
          <div class="sn-item"><div class="sn-valor">${this.fmt(a)} – ${this.fmt(o)}</div><div class="sn-rotulo">Faixa observada (${r.length} obras)</div></div>
        </div>
        <div class="sugestao-pct">Diferença: <strong>${Math.abs(l).toFixed(0)}% ${dirTexto}</strong> do mercado${e.tecnica?` da ${e.tecnica}`:``}.</div>
      </div>
    `}renderFaixaNegociacao(){let e=this.calcularPreco(this.calc);if(e<=0)return``;let t=this.config,n=this._nf(t.negociacaoMin,-10),r=this._nf(t.negociacaoMeta,0),i=this._nf(t.negociacaoIdeal,15),a=Math.round(e*(1+n/100)),o=Math.round(e*(1+r/100)),s=Math.round(e*(1+i/100));return`
      <div class="negoc-wrapper">
        <div class="negoc-titulo">⚖️ Faixa de Negociação</div>
        <div class="negoc-grid">
          <div class="negoc-card negoc-min"><div class="negoc-rotulo">Mínimo aceitável</div><div class="negoc-valor">${this.fmt(a)}</div><div class="negoc-pct">${n>=0?`+`:``}${n}% do ateliê</div></div>
          <div class="negoc-card negoc-meta"><div class="negoc-rotulo">Meta</div><div class="negoc-valor">${this.fmt(o)}</div><div class="negoc-pct">${r>=0?`+`:``}${r}% do ateliê</div></div>
          <div class="negoc-card negoc-ideal"><div class="negoc-rotulo">Ideal</div><div class="negoc-valor">${this.fmt(s)}</div><div class="negoc-pct">+${i}% do ateliê</div></div>
        </div>
        <div class="negoc-config">
          <label>Mín. %<input type="number" id="negocMinInput" value="${n}" step="1" aria-label="Percentual mínimo"></label>
          <label>Meta %<input type="number" id="negocMetaInput" value="${r}" step="1" aria-label="Percentual meta"></label>
          <label>Ideal %<input type="number" id="negocIdealInput" value="${i}" step="1" aria-label="Percentual ideal"></label>
          <button class="btn-secundario" id="btnSalvarNegociacao">Salvar faixa</button>
        </div>
      </div>
    `}_nf(e,t){let n=Number(e);return Number.isFinite(n)?n:t}renderBreakEven(e){let t=e.filter(e=>(e.custoMateriais>0||e.horasTrabalho>0)&&e.preco>0);return t.length===0?``:`
      <div class="card card-full">
        <h3><i class="fas fa-chart-bar"></i> Análise de Break-Even</h3>
        <div class="be-tabela-wrapper">
          <table class="be-tabela">
            <caption class="sr-only">Análise de Break-Even</caption>
            <thead><tr>
              <th>Obra</th><th>Custo Total</th><th>Preço</th><th>Margem</th><th>Markup</th><th>Lucro</th>
            </tr></thead>
            <tbody>${t.map(e=>{let t=(Number(e.custoMateriais)||0)+(Number(e.horasTrabalho)||0)*(this.config.valorHora||60),n=Number(e.preco)||0,r=n>0?(n-t)/n*100:0,i=t>0?n/t:0;return`<tr class="${r>=50?`be-alta`:r>=25?`be-media`:`be-baixa`}">
        <td>${e.titulo||`Sem título`}</td>
        <td>${this.fmt(t)}</td>
        <td>${this.fmt(n)}</td>
        <td class="be-num">${r.toFixed(1)}%</td>
        <td class="be-num">${i.toFixed(2)}×</td>
        <td>${this.fmt(n-t)}</td>
      </tr>`}).join(``)}</tbody>
          </table>
        </div>
        <div class="be-legend">
          <span class="be-tag be-alta">≥ 50% margem</span>
          <span class="be-tag be-media">25–50%</span>
          <span class="be-tag be-baixa">< 25%</span>
        </div>
      </div>
    `}renderMLCard(e,t){let n=e.filter(e=>e.historicoPrecos&&e.historicoPrecos.length>0&&e.dimensoes&&e.dimensoes.largura);if(n.length<2)return``;let r=0,i=0,a=0,o=[];n.forEach(e=>{let t={materiais:Number(e.custoMateriais)||0,horas:Number(e.horasTrabalho)||0,valorHora:this.config.valorHora||60,largura:e.dimensoes.largura,altura:e.dimensoes.altura,complexidade:3},n=this.calcularPreco(t),s=Number(e.preco)||0;if(s>0){let t=Math.abs(n-s);a+=t;let c=t/s*100;c<=20?r++:i++,o.push({titulo:e.titulo,real:s,sugerido:n,pctErro:c})}});let s=r+i;if(s===0)return``;let c=r/s*100,l=a/s,u=o.sort((e,t)=>t.pctErro-e.pctErro).slice(0,5);return`
      <div class="card card-full">
        <h3>🤖 Precisão (ML) — Sugestão vs. Realidade</h3>
        <div class="ml-precisao-grid">
          <div class="ml-precisao-card ${c>=70?`ml-bom`:c>=40?`ml-medio`:`ml-ruim`}">
            <div class="ml-numero">${c.toFixed(0)}%</div>
            <div class="ml-rotulo">Hit Rate</div>
            <div class="ml-sub">${r}/${s} dentro de 20% do real</div>
          </div>
          <div class="ml-precisao-card">
            <div class="ml-numero">${this.fmt(l)}</div>
            <div class="ml-rotulo">Erro Médio Absoluto</div>
          </div>
          <div class="ml-precisao-card">
            <div class="ml-numero">${i}</div>
            <div class="ml-rotulo">Fora da Margem</div>
          </div>
        </div>
        ${u.length>0?`
        <h4 style="margin:12px 0 6px;font-size:0.8rem;color:var(--text-muted);">Maiores discrepâncias</h4>
        <table class="be-tabela">
          <caption class="sr-only">Maiores discrepâncias entre preço sugerido e real</caption>
          <thead><tr><th>Obra</th><th>Sugerido</th><th>Real</th><th>Erro</th></tr></thead>
          <tbody>${u.map(e=>`<tr class="${e.pctErro>20?`be-baixa`:`be-alta`}">
            <td>${e.titulo||`—`}</td>
            <td>${this.fmt(e.sugerido)}</td>
            <td>${this.fmt(e.real)}</td>
            <td>${e.pctErro.toFixed(0)}%</td>
          </tr>`).join(``)}</tbody>
        </table>`:``}
      </div>
    `}renderProjecao(e){let t=e.filter(e=>e.historicoPrecos&&e.historicoPrecos.length>=2);if(t.length===0)return``;let n=t.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`}</option>`).join(``),r=t[0],i=this.projetarPreco(r);return`
      <div class="card card-full">
        <h3>🔮 Projeção de Valorização</h3>
        <div style="margin-bottom:12px;">
          <select id="selProjecaoObra" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;">${n}</select>
        </div>
        ${this.renderProjecaoDetalhe(r,i)}
      </div>
    `}projetarPreco(e){let t=(e.historicoPrecos||[]).map(e=>({preco:Number(e.preco),data:new Date(e.data).getTime()}));t.push({preco:Number(e.preco)||0,data:Date.now()});let n=t.filter(e=>e.preco>0);if(n.length<2)return null;let r=n.length,i=(r-1)/2,a=0;n.forEach(e=>a+=e.preco),a/=r;let o=0,s=0;n.forEach((e,t)=>{o+=(t-i)*(e.preco-a),s+=(t-i)*(t-i)});let c=s===0?0:o/s,l=a-c*i,u=[1,3,5],d=n[n.length-1].preco;return{ultimo:d,inclinacao:c,intercept:l,projecoes:u.map(e=>{let n=Math.round(e*12/Math.max(1,Math.round((t[t.length-1].data-t[0].data)/(864e5*30)))),i=r+n,a=Math.max(0,c*(i-1)+l),o=d>0?((a/d)**(1/e)-1)*100:0;return{anos:e,projetado:Math.round(a),aprecAnual:o}}),r2:this.calcularR2(n,c,l)}}calcularR2(e,t,n){let r=e.length,i=0;e.forEach(e=>i+=e.preco),i/=r;let a=0,o=0;return e.forEach((e,r)=>{let s=t*r+n;a+=(e.preco-s)**2,o+=(e.preco-i)**2}),o>0?1-a/o:0}renderProjecaoDetalhe(e,t){return t?`
      <div class="projecao-grid">
        ${t.projecoes.map(e=>`
          <div class="projecao-card">
            <div class="proj-numero">${this.fmt(e.projetado)}</div>
            <div class="proj-rotulo">Em ${e.anos} ano${e.anos>1?`s`:``}</div>
            <div class="proj-apreciacao ${e.aprecAnual>0?`proj-positiva`:`proj-negativa`}">
              ${e.aprecAnual>0?`<i class="fas fa-chart-line"></i>`:`📉`} ${e.aprecAnual.toFixed(1)}% a.a.
            </div>
          </div>
        `).join(``)}
      </div>
      <div class="proj-detalhes">
        <span>Preço atual: <strong>${this.fmt(t.ultimo)}</strong></span>
        <span>R²: <strong>${t.r2.toFixed(3)}</strong> ${t.r2>.7?`(boa correlação)`:t.r2>.3?`(correlação moderada)`:`(baixa correlação)`}</span>
        <span>Baseado em regressão linear sobre histórico de preços</span>
      </div>
    `:`<p style="color:var(--text-muted);">Dados insuficientes para projeção (mín. 2 pontos).</p>`}renderModalTaxas(){let e=this.taxas;return`
      <div class="widget-config-overlay" id="taxasOverlay" style="display:none">
        <div class="widget-config-modal" style="max-width:400px;">
          <h3>💱 Taxas de Câmbio</h3>
          <p class="texto-ajuda">Valor de 1 ${this.moeda} em cada moeda. Deixe 1 para a moeda padrão.</p>
          <div class="taxas-form">
            ${[`USD`,`EUR`,`GBP`].map(t=>`
              <div class="taxa-item">
                <label>${t}</label>
                <input type="number" id="taxa${t}" value="${e[t]||1}" step="0.01" min="0.01" aria-label="Taxa de câmbio ${t}">
              </div>
            `).join(``)}
          </div>
          <div class="modal-acoes">
            <button class="btn-secundario" id="btnFecharTaxas">Fechar</button>
            <button class="btn-primario" id="btnSalvarTaxas">Salvar</button>
          </div>
        </div>
      </div>
    `}renderModalTecnicas(){let e=this.cfgRoot.tecnicasCusto||{};return`
      <div class="widget-config-overlay" id="tecnicasOverlay" style="display:none">
        <div class="widget-config-modal" style="max-width:560px;">
          <h3><i class="fas fa-swatchbook"></i> Custos por Técnica</h3>
          <p class="texto-ajuda">Valor/hora e multiplicador padrão são auto-selecionados ao escolher a técnica na calculadora. Deixe vazio para usar o padrão geral.</p>
          <div class="be-tabela-wrapper" style="max-height:50vh;overflow-y:auto;">
            <table class="be-tabela">
              <thead><tr><th>Técnica</th><th>Valor/hora</th><th>Multiplicador</th></tr></thead>
              <tbody>
                ${[`óleo`,`acrílica`,`aquarela`,`guache`,`têmpera`,`desenho`,`gravura`,`escultura`,`cerâmica`,`têxtil`,`outra`].map(t=>`
                  <tr>
                    <td>${L(t)}</td>
                    <td><input type="number" id="tcHora_${t}" value="${e[t]&&Number.isFinite(Number(e[t].valorHora))?e[t].valorHora:``}" class="tc-input" step="1" min="0" aria-label="Valor hora ${t}"></td>
                    <td><input type="number" id="tcMult_${t}" value="${e[t]&&Number.isFinite(Number(e[t].multiplicador))?e[t].multiplicador:``}" class="tc-input" step="0.1" min="0" aria-label="Multiplicador ${t}"></td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
          <div class="modal-acoes" style="margin-top:12px;">
            <button class="btn-secundario" id="btnFecharTecnicas">Fechar</button>
            <button class="btn-primario" id="btnSalvarTecnicas">Salvar</button>
          </div>
        </div>
      </div>
    `}renderHistoricoPrecos(e){let t=e.filter(e=>e.historicoPrecos&&e.historicoPrecos.length>0);if(t.length===0)return``;let n=t[0],r=n.historicoPrecos,i=r.map(e=>Number(e.preco)).concat([Number(n.preco)||0]).filter(e=>e>0);if(i.length<2)return``;let a=Math.max(...i)*1.15,o=Math.min(...i)*.85,s=a-o||1,c=i.map((e,t)=>({x:40+t/(i.length-1||1)*320,y:120-(e-o)/s*100,valor:e,label:t<r.length?r[t].data?.slice(0,7)||``:`Atual`})),l=c.map((e,t)=>`${t===0?`M`:`L`}${e.x.toFixed(1)},${e.y.toFixed(1)}`).join(` `),u=`M${c[0].x},120 ${l.slice(1)} L${c[c.length-1].x},120 Z`,d=(K().items||[]).filter(e=>String(e.obraId)===n.id||e.obraTitulo===n.titulo);return`
      <div class="card">
        <h3><i class="fas fa-clipboard"></i> Histórico de Preços</h3>
        <div style="margin-bottom:12px;">
          <select id="selHistoricoObra" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
            ${t.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`}</option>`).join(``)}
          </select>
          <span style="font-size:0.75rem;color:var(--text-muted);margin-left:8px;">${n.titulo} — ${r.length} reajustes</span>
        </div>
        <svg viewBox="0 0 400 140" class="svg-chart" style="height:140px;">
          <defs><linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--accent)"/><stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
          ${[.25,.5,.75].map(e=>`<line class="chart-grid" x1="40" y1="${120-100*e}" x2="360" y2="${120-100*e}"/>`).join(``)}
          ${[0,.25,.5,.75,1].map(e=>`<text class="chart-label" x="32" y="${120-100*e+3}" text-anchor="end">${this.fmt(o+s*e)}</text>`).join(``)}
          <path class="chart-area" d="${u}"/>
          <path class="chart-line" d="${l}"/>
          ${c.map((e,t)=>`<circle class="chart-dot ${t<r.length&&d.some(e=>e.dataVenda&&new Date(e.dataVenda)>=new Date(r[t].data||0)-864e5&&new Date(e.dataVenda)<=new Date(r[t].data||Date.now())+864e5)?`vendido`:``}" cx="${e.x}" cy="${e.y}"/>`).join(``)}
          ${c.map(e=>`<text class="chart-valor" x="${e.x}" y="${e.y-8}">${this.fmt(e.valor)}</text>`).join(``)}
          ${c.map(e=>`<text class="chart-label" x="${e.x}" y="134">${e.label}</text>`).join(``)}
        </svg>
        <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;display:flex;gap:12px;justify-content:center;">
          <span>━ <span style="color:var(--accent)">Evolução</span></span>
          <span>● <span style="color:#10b981">Vendido</span></span>
        </div>
      </div>
    `}renderAnalise(e,t){let n=e.filter(e=>Number(e.preco)>0).map(e=>Number(e.preco)),r=n.length?Math.round(n.reduce((e,t)=>e+t,0)/n.length):0,i=n.length?Math.max(...n):0,a=n.length?Math.min(...n):0,o=n.reduce((e,t)=>e+t,0),s={};e.forEach(e=>{if(!e.preco)return;let t=e.tecnica||`Outra`;s[t]||(s[t]={soma:0,count:0}),s[t].soma+=Number(e.preco),s[t].count++});let c=Object.entries(s).map(([e,t])=>({tec:e,media:Math.round(t.soma/t.count),count:t.count})).sort((e,t)=>t.media-e.media),l=Math.max(...n,1)/8||1,u=Array(8).fill(0),d=[];for(let e=0;e<8;e++)d.push(`${this.fmt(e*l)}–${this.fmt((e+1)*l)}`);n.forEach(e=>{let t=Math.min(Math.floor(e/l),7);u[t]++});let f=Math.max(...u,1),p=u.map((e,t)=>`<div class="barra" style="height:${e/f*100}%"><span class="barra-count">${e}</span><span class="barra-label">${d[t]}</span></div>`).join(``),m=e.filter(t=>{if(!t.preco||!t.dimensoes||!t.dimensoes.largura||!t.dimensoes.altura)return!1;let n=t.dimensoes.largura*t.dimensoes.altura,r=e.filter(e=>{if(e.id===t.id||!e.preco)return!1;let r=e.dimensoes;if(!r||!r.largura||!r.altura)return!1;let i=r.largura*r.altura;return i>n*.5&&i<n*1.5});if(r.length<2)return!1;let i=r.reduce((e,t)=>e+Number(t.preco),0)/r.length;return Number(t.preco)<i*.7}),h=t.filter(e=>e.dataVenda&&e.obraId).map(t=>{let n=e.find(e=>e.id===t.obraId);if(!n||!n.criadoEm)return null;let r=new Date(n.criadoEm).getTime(),i=new Date(t.dataVenda).getTime();return i>r?Math.round((i-r)/864e5):null}).filter(e=>e!==null),g=h.length?Math.round(h.reduce((e,t)=>e+t,0)/h.length):null;return`
      <div class="analise-grid" style="margin-bottom:16px;">
        <div class="analise-card"><div class="analise-valor">${this.fmt(r)}</div><div class="analise-rotulo"><i class="fas fa-dollar-sign"></i> Preço médio</div></div>
        <div class="analise-card"><div class="analise-valor">${this.fmt(o)}</div><div class="analise-rotulo"><i class="fas fa-box"></i> Valor total do portfólio</div></div>
        <div class="analise-card"><div class="analise-valor">${n.length}</div><div class="analise-rotulo">🗃️ Obras precificadas</div></div>
        <div class="analise-card"><div class="analise-valor">${this.fmt(a)} — ${this.fmt(i)}</div><div class="analise-rotulo">📐 Faixa de preços</div></div>
        <div class="analise-card"><div class="analise-valor">${g===null?`—`:g+` dias`}</div><div class="analise-rotulo">⏱ Tempo médio p/ vender</div></div>
        <div class="analise-card"><div class="analise-valor">${m.length}</div><div class="analise-rotulo">⚡ Possivelmente subprecificadas</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        <div>
          <h4 style="margin:0 0 8px;font-size:0.85rem;color:var(--text-muted);">Distribuição de Preços</h4>
          <div class="histograma">${p}</div>
        </div>
        <div>
          <h4 style="margin:0 0 8px;font-size:0.85rem;color:var(--text-muted);">Média de Preço por Técnica</h4>
          <table class="tabela-media">
            <caption class="sr-only">Média de preço por técnica</caption>
            <tr><th>Técnica</th><th>Média</th><th>Obras</th></tr>
            ${c.map(e=>`<tr><td>${e.tec}</td><td>${this.fmt(e.media)}</td><td>${e.count}</td></tr>`).join(``)}
          </table>
        </div>
      </div>
      ${m.length>0?`
      <div style="margin-top:16px;">
        <h4 style="margin:0 0 8px;font-size:0.85rem;color:#92400e;">⚡ Obras que podem estar subprecificadas</h4>
        <ul class="sub-list">
          ${m.map(t=>{let n=t.dimensoes.largura*t.dimensoes.altura,r=e.filter(e=>{if(e.id===t.id||!e.preco)return!1;let r=e.dimensoes;if(!r||!r.largura||!r.altura)return!1;let i=r.largura*r.altura;return i>n*.5&&i<n*1.5}),i=r.reduce((e,t)=>e+Number(t.preco),0)/r.length,a=Math.round(i-Number(t.preco));return`<li class="sub-alert"><span class="sub-nome">${t.titulo||`Sem título`}</span><span class="sub-valores">Atual: ${this.fmt(t.preco)} | Sugerido: ${this.fmt(i)}</span><span class="sub-diff">+${this.fmt(a)}</span></li>`}).join(``)}
        </ul>
      </div>`:``}
    `}renderMetas(e,t){let n=this.config,r=Number(n.metaMensal)||1e4,i=Number(n.metaAnual)||12e4,a=new Date,o=a.getMonth(),s=a.getFullYear(),c=t.filter(e=>{if(!e.dataVenda||!e.valorTotal)return!1;let t=new Date(e.dataVenda);return t.getMonth()===o&&t.getFullYear()===s}).reduce((e,t)=>e+Number(t.valorTotal),0),l=t.filter(e=>!e.dataVenda||!e.valorTotal?!1:new Date(e.dataVenda).getFullYear()===s).reduce((e,t)=>e+Number(t.valorTotal),0),u=Math.min(100,r>0?Math.round(c/r*100):0),d=Math.min(100,i>0?Math.round(l/i*100):0),f=a.getDate(),p=new Date(s,o+1,0).getDate()-f,m=f>0?c/f:0,h=m>0?Math.ceil((r-c)/m):null,g=m>0?`Com o ritmo atual (${this.fmt(Math.round(m))}/dia), você ${h!==null&&h<=p?`atingirá a meta mensal em <strong>${h} dias</strong>.`:`<strong>não</strong> atingirá a meta mensal a tempo.`}`:``,_=Math.max(0,r-c),v=e.filter(e=>Number(e.preco)>0),y=v.length>0?v.reduce((e,t)=>e+Number(t.preco),0)/v.length:0,b=y>0?Math.ceil(_/y):0,ee=_>0&&y>0?`Você precisa vender <strong>${b} obra${b>1?`s`:``}</strong> de ~${this.fmt(Math.round(y))} para atingir a meta mensal.`:`Meta mensal já atingida! 🎉`,te=this.circuloProgresso(u,`${u}%`,`do mês`),x=this.circuloProgresso(d,`${d}%`,`do ano`);return`
      <div class="metas-grid">
        <div class="card meta-card">
          <div class="meta-rotulo">Meta Mensal</div>
          <div class="meta-valor">${this.fmt(r)}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;">
            <span style="font-size:0.85rem;color:var(--text-muted);">Faturamento: ${this.fmt(c)}</span>
          </div>
          ${te}
          <div class="meta-edit">
            <input type="number" id="metaMensalInput" value="${r}" min="0" step="100" aria-label="Meta mensal">
            <button class="btn-secundario" id="btnSalvarMetaMensal">Salvar</button>
          </div>
          ${g?`<div class="meta-projecao"><i class="fas fa-chart-line"></i> ${g}</div>`:``}
          ${ee?`<div class="meta-sugestao"><i class="fas fa-lightbulb"></i> ${ee}</div>`:``}
        </div>
        <div class="card meta-card">
          <div class="meta-rotulo">Meta Anual</div>
          <div class="meta-valor">${this.fmt(i)}</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin:8px 0;">
            <span style="font-size:0.85rem;color:var(--text-muted);">Faturamento: ${this.fmt(l)}</span>
          </div>
          ${x}
          <div class="meta-edit">
            <input type="number" id="metaAnualInput" value="${i}" min="0" step="1000" aria-label="Meta anual">
            <button class="btn-secundario" id="btnSalvarMetaAnual">Salvar</button>
          </div>
          <div class="meta-projecao">📆 ${p} dias restantes no mês</div>
        </div>
      </div>
    `}circuloProgresso(e,t,n){let r=2*Math.PI*56;return`
      <div class="circulo-progresso">
        <svg viewBox="0 0 140 140">
          <circle class="bg-circle" cx="70" cy="70" r="56"/>
          <circle class="progress-circle" cx="70" cy="70" r="56" stroke-dasharray="${r}" stroke-dashoffset="${r-e/100*r}"/>
        </svg>
        <div class="centro-texto">
          <div class="pct">${t}</div>
          <div class="pct-label">${n}</div>
        </div>
      </div>
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`selMoedaPadrao`);if(e){let t=()=>{this.cfgRoot.moedaPadrao=e.value,q().salvar(),this.rerenderizar()};e.addEventListener(`change`,t),this._bindCache.selMoedaPadrao={el:e,handler:t,type:`change`}}document.getElementById(`btnEditarTaxas`)?.addEventListener(`click`,()=>{document.getElementById(`taxasOverlay`).style.display=`flex`}),document.getElementById(`btnFecharTaxas`)?.addEventListener(`click`,()=>{document.getElementById(`taxasOverlay`).style.display=`none`}),document.getElementById(`btnSalvarTaxas`)?.addEventListener(`click`,()=>{let e=this.cfgRoot.taxasCambio||{};[`USD`,`EUR`,`GBP`].forEach(t=>{let n=document.getElementById(`taxa`+t);n&&(e[t]=Number(n.value)||1)}),this.cfgRoot.taxasCambio=e,q().salvar(),document.getElementById(`taxasOverlay`).style.display=`none`,A(`Taxas de câmbio salvas!`,`sucesso`),this.rerenderizar()}),document.getElementById(`btnAbrirTecnicas`)?.addEventListener(`click`,()=>{document.getElementById(`tecnicasOverlay`).style.display=`flex`}),document.getElementById(`btnFecharTecnicas`)?.addEventListener(`click`,()=>{document.getElementById(`tecnicasOverlay`).style.display=`none`}),document.getElementById(`btnSalvarTecnicas`)?.addEventListener(`click`,()=>{let e=this.cfgRoot.tecnicasCusto||{};[`óleo`,`acrílica`,`aquarela`,`guache`,`têmpera`,`desenho`,`gravura`,`escultura`,`cerâmica`,`têxtil`,`outra`].forEach(t=>{e[t]||(e[t]={});let n=Number(document.getElementById(`tcHora_`+t)?.value),r=Number(document.getElementById(`tcMult_`+t)?.value);Number.isFinite(n)&&n>=0&&n>0?e[t].valorHora=n:delete e[t].valorHora,Number.isFinite(r)&&r>=0&&r>0?e[t].multiplicador=r:delete e[t].multiplicador}),this.cfgRoot.tecnicasCusto=e,q().salvar(),document.getElementById(`tecnicasOverlay`).style.display=`none`,A(`Custos por técnica salvos!`,`sucesso`),this.aplicarCustosTecnica(),this.rerenderizar()});let t=document.getElementById(`precificadorContainer`);if(t){let e=e=>{e.target.closest(`#btnSalvarNegociacao`)&&(this.salvarConfig({negociacaoMin:Number(document.getElementById(`negocMinInput`)?.value)||0,negociacaoMeta:Number(document.getElementById(`negocMetaInput`)?.value)||0,negociacaoIdeal:Number(document.getElementById(`negocIdealInput`)?.value)||0}),A(`Faixa de negociação salva!`,`sucesso`),this.rerenderizar())};t.addEventListener(`click`,e),this._bindCache.negociacaoSave={el:t,handler:e,type:`click`}}document.getElementById(`btnAbrirRegras`)?.addEventListener(`click`,()=>this.mudarAba(`regras`)),document.getElementById(`btnAdicionarRegra`)?.addEventListener(`click`,()=>this.adicionarRegra()),document.getElementById(`btnAplicarRegrasTodas`)?.addEventListener(`click`,()=>this.aplicarRegrasEmTodas());let n=document.getElementById(`regrasLista`);n&&n.addEventListener(`click`,e=>{let t=e.target.closest(`.btn-aplicar-regra`),n=e.target.closest(`.btn-remover-regra`);if(t){let e=Number(t.dataset.idx);this.aplicarRegra(e)}if(n){let e=Number(n.dataset.idx);this.removerRegra(e)}});let r=(e,t)=>{let n=document.getElementById(e);if(!n)return;let r=()=>{this.calc[t]=Number(n.value)||0,t===`valorHora`&&this.salvarConfig({valorHora:Number(n.value)||60}),this.atualizarResultado()};n.addEventListener(`input`,r),this._bindCache[e]={el:n,handler:r,type:`input`}};r(`calcMateriais`,`materiais`),r(`calcHoras`,`horas`),r(`calcValorHora`,`valorHora`),r(`calcLargura`,`largura`),r(`calcAltura`,`altura`),r(`calcProfundidade`,`profundidade`),r(`calcMultiplicador`,`multiplicador`),r(`calcComissao`,`comissaoGaleria`),((e,t)=>{let n=document.getElementById(e);if(!n)return;let r=()=>{this.calc[t]=n.value,this.atualizarResultado()};n.addEventListener(`input`,r),this._bindCache[e]={el:n,handler:r,type:`input`}})(`calcNome`,`nome`);let i=(e,t)=>{let n=document.getElementById(e);if(!n)return;let r=()=>{this.calc[t]=n.value,t===`arredondamento`&&(this.calc.arredondamento=Number(n.value)||0,this.salvarConfig({arredondamento:this.calc.arredondamento})),this.atualizarResultado()};n.addEventListener(`change`,r),this._bindCache[e]={el:n,handler:r,type:`change`}};i(`calcCliente`,`clienteId`),i(`calcArredondamento`,`arredondamento`);let a=document.getElementById(`calcTecnica`);if(a){let e=()=>{this.calc.tecnica=a.value,this.aplicarCustosTecnica(),this.atualizarResultado()};a.addEventListener(`change`,e),this._bindCache.calcTecnica={el:a,handler:e,type:`change`}}let o=document.getElementById(`estrelasInput`);if(o){let e=e=>{let t=e.target.closest(`.estrela`);t&&(this.calc.complexidade=Number(t.dataset.val),o.querySelectorAll(`.estrela`).forEach(e=>e.classList.toggle(`preenchida`,Number(e.dataset.val)<=this.calc.complexidade)),this.atualizarResultado())};o.addEventListener(`click`,e),this._bindCache.estrelasInput={el:o,handler:e,type:`click`}}document.getElementById(`btnSalvarOrcamento`)?.addEventListener(`click`,()=>this.salvarOrcamento()),document.getElementById(`btnCopiarPreco`)?.addEventListener(`click`,()=>this.copiarPreco()),document.getElementById(`btnPropostaPDF`)?.addEventListener(`click`,()=>this.exportarPropostaPDF(null)),document.getElementById(`btnCriarEncomenda`)?.addEventListener(`click`,()=>this.criarEncomenda(null));let s=document.getElementById(`selTemplateProposta`);if(s){let e=()=>this.salvarConfig({templateProposta:s.value});s.addEventListener(`change`,e),this._bindCache.selTemplateProposta={el:s,handler:e,type:`change`}}document.getElementById(`btnKanbanOrc`)?.addEventListener(`click`,()=>{localStorage.setItem(`atelier-crm-view-mode-orcamentos`,`kanban`),this.rerenderizar()}),document.getElementById(`btnListaOrc`)?.addEventListener(`click`,()=>{localStorage.setItem(`atelier-crm-view-mode-orcamentos`,`lista`),this.rerenderizar()});let c=document.getElementById(`orcamentosContainer`);if(c){let e=e=>{e.target.closest(`.kanban-mobile-menu-btn`)||c.querySelectorAll(`.kanban-mobile-dropdown.visivel`).forEach(e=>e.classList.remove(`visivel`));let t=e.target.closest(`[data-id]`),n=t?t.dataset.id:null;if(e.target.closest(`.btn-orc-carregar`)){n&&this.carregarOrcamento(n);return}if(e.target.closest(`.btn-orc-pdf`)){n&&this.exportarPropostaPDF(n);return}if(e.target.closest(`.btn-orc-encomenda`)){n&&this.criarEncomenda(n);return}if(e.target.closest(`.btn-orc-venda`)){n&&this.registrarVenda(n);return}if(e.target.closest(`.btn-orc-excluir`)){n&&this.excluirOrcamento(n);return}if(e.target.closest(`.kanban-mobile-menu-btn`)){let t=e.target.closest(`.kanban-card`);if(t){let e=t.querySelector(`.kanban-mobile-dropdown`);e&&e.classList.toggle(`visivel`)}return}if(e.target.closest(`.kanban-mover-btn`)){let t=e.target.closest(`.kanban-mover-btn`);t.dataset.status&&n&&this._moverOrcamentoParaStatus(n,t.dataset.status);return}},t=e=>{let t=e.target.closest(`.orc-status-select`);if(!t)return;let n=t.closest(`.orcamento-item`)?.dataset.id;n&&this.definirStatusOrcamento(n,t.value)};c.addEventListener(`click`,e),c.addEventListener(`change`,t),this._bindCache.orcamentosContainer={el:c,handler:e,type:`click`},this._bindCache.orcamentosContainerChange={el:c,handler:t,type:`change`};let n=c.querySelector(`.kanban-board`);if(n){let e=e=>{let t=e.target.closest(`.kanban-card`);t&&(t.classList.add(`arrastando`),e.dataTransfer.setData(`text/plain`,t.dataset.id))},t=e=>{let t=e.target.closest(`.kanban-card`);t&&t.classList.remove(`arrastando`)},r=e=>{e.preventDefault();let t=e.target.closest(`.kanban-coluna`);t&&t.classList.add(`kanban-coluna--drag-over`)},i=e=>{let t=e.target.closest(`.kanban-coluna`);t&&t.classList.remove(`kanban-coluna--drag-over`)},a=e=>{e.preventDefault();let t=e.target.closest(`.kanban-coluna`);if(!t)return;t.classList.remove(`kanban-coluna--drag-over`);let n=e.dataTransfer.getData(`text/plain`);n&&this._moverOrcamentoParaStatus(n,t.dataset.status)},o=(e,t)=>{n.addEventListener(e,t),this._bindCache[`kb`+e]={el:n,handler:t,type:e}};o(`dragstart`,e),o(`dragend`,t),o(`dragover`,r),o(`dragleave`,i),o(`drop`,a)}}document.getElementById(`selHistoricoObra`)?.addEventListener(`change`,()=>this.rerenderizar()),document.getElementById(`selProjecaoObra`)?.addEventListener(`change`,()=>this.rerenderizar()),document.getElementById(`btnSalvarMetaMensal`)?.addEventListener(`click`,()=>{let e=Number(document.getElementById(`metaMensalInput`)?.value)||0;this.salvarConfig({metaMensal:e}),A(`Meta mensal salva!`,`sucesso`),this.rerenderizar()}),document.getElementById(`btnSalvarMetaAnual`)?.addEventListener(`click`,()=>{let e=Number(document.getElementById(`metaAnualInput`)?.value)||0;this.salvarConfig({metaAnual:e}),A(`Meta anual salva!`,`sucesso`),this.rerenderizar()}),document.getElementById(`btnExportarRelatorio`)?.addEventListener(`click`,()=>this.exportarRelatorioPDF()),document.getElementById(`precTabs`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.prec-tab`);t&&this.mudarAba(t.dataset.tab)}),document.getElementById(`btnApresentarKiosk`)?.addEventListener(`click`,()=>this.abrirKiosk()),document.getElementById(`btnKioskFechar`)?.addEventListener(`click`,()=>this.fecharKiosk()),document.getElementById(`btnKioskSalvar`)?.addEventListener(`click`,()=>this.salvarOrcamento()),document.getElementById(`btnKioskPDF`)?.addEventListener(`click`,()=>this.exportarPropostaPDF(null));let l=document.getElementById(`precificadorContainer`);if(l){let e=e=>{if(e.key!==`Enter`)return;let t=(e.target.tagName||``).toLowerCase();t===`textarea`||t===`select`||(e.preventDefault(),e.ctrlKey||e.metaKey?this.salvarOrcamento():this.atualizarResultado())};l.addEventListener(`keydown`,e),this._bindCache.precKeydown={el:l,handler:e,type:`keydown`}}let u=e=>{this.kioskAtivo&&e.key===`Escape`&&(e.preventDefault(),this.fecharKiosk())};document.addEventListener(`keydown`,u),this._bindCache.precKeydownDoc={el:document,handler:u,type:`keydown`},this.atualizarResultado()}abrirKiosk(){this.kioskAtivo=!0;let e=document.getElementById(`kioskOverlay`);if(e){e.style.display=`flex`;let t=document.getElementById(`kioskValor`),n=this.calcularPreco(this.calc);t&&Er(t,n,e=>this.fmt(e));let r=document.getElementById(`kioskBreakdown`);r&&(r.innerHTML=this.renderKioskBreakdown())}}fecharKiosk(){this.kioskAtivo=!1;let e=document.getElementById(`kioskOverlay`);e&&(e.style.display=`none`)}renderKioskBreakdown(){let e=this.calcularBreakdown(this.calc),t=[e.largura,e.altura,e.profundidade].filter(Boolean).join(`×`),n=e.custoTotal*e.mult*(e.fator-1),r=e.custoTotal*(e.mult-1),i=e.bonus===1?0:e.custoTotal*e.mult*e.fator*(e.bonus-1);return`
      <div class="kiosk-bd">
        <div class="kiosk-bd-linha"><span>Materiais</span><strong>${this.fmt(e.materiais)}</strong></div>
        <div class="kiosk-bd-linha"><span>Mão de obra (${e.horas}h × ${this.fmt(e.valorHora)}/h)</span><strong>${this.fmt(e.maoObra)}</strong></div>
        <div class="kiosk-bd-linha kiosk-bd-sub"><span>Custo total</span><strong>${this.fmt(e.custoTotal)}</strong></div>
        ${t?`<div class="kiosk-bd-linha"><span>Dimensões (${t}cm, ×${e.bonus.toFixed(2)})</span><strong>${this.fmt(i)}</strong></div>`:``}
        <div class="kiosk-bd-linha"><span>Complexidade ×${e.fator}</span><strong>${this.fmt(n)}</strong></div>
        <div class="kiosk-bd-linha"><span>Experiência ×${e.mult}</span><strong>${this.fmt(r)}</strong></div>
        <div class="kiosk-bd-linha"><span>Lucro estimado</span><strong>${this.fmt(e.lucro)}</strong></div>
        ${e.comissaoPct>0?`<div class="kiosk-bd-linha"><span>Preço galeria (${e.comissaoPct}% comissão)</span><strong>${this.fmt(e.precoGaleria)}</strong></div>`:``}
        <div class="kiosk-bd-linha kiosk-bd-total"><span>Preço final</span><strong>${this.fmt(this.calcularPreco(this.calc))}</strong></div>
      </div>
    `}aplicarCustosTecnica(){let e=(this.cfgRoot.tecnicasCusto||{})[this.calc.tecnica];this.calc.tecnica&&e?(Number.isFinite(Number(e.valorHora))&&Number(e.valorHora)>0&&(this.calc.valorHora=Number(e.valorHora)),Number.isFinite(Number(e.multiplicador))&&Number(e.multiplicador)>0&&(this.calc.multiplicador=Number(e.multiplicador))):(this.calc.valorHora=this.config.valorHora||60,this.calc.multiplicador=this.config.multiplicadorExperiencia||1.5);let t=document.getElementById(`calcValorHora`);t&&(t.value=this.calc.valorHora);let n=document.getElementById(`calcMultiplicador`);n&&(n.value=this.calc.multiplicador)}atualizarResultado(){let e=this.calcularPreco(this.calc),t=document.getElementById(`valorSugerido`),n=document.getElementById(`detalheCalculo`),r=document.getElementById(`sugestaoInteligente`),i=document.getElementById(`faixaNegociacao`),a=document.getElementById(`conversoesMultiMoeda`),o=document.getElementById(`breakdownGrid`),s=document.getElementById(`regraAuto`);t&&Er(t,e,e=>this.fmt(e)),n&&(n.textContent=this.detalharCalculo(e)),o&&(o.innerHTML=this.renderBreakdown(this.calcularBreakdown(this.calc))),s&&(s.innerHTML=this.renderRegraAuto()),r&&(r.innerHTML=this.renderSugestaoInteligente()),i&&(i.innerHTML=this.renderFaixaNegociacao()),a&&(a.innerHTML=[`USD`,`EUR`,`GBP`].filter(e=>e!==this.moeda).map(t=>`<span class="conv-moeda">${t}: ${this.fmt(this.converter(e,this.moeda,t),t)}</span>`).join(``))}_dadosOrcamentoAtual(){let e=this.calc.clienteId?G().items.find(e=>e.id===this.calc.clienteId):null;return{id:`orc_`+Date.now(),nome:this.calc.nome?.trim()||`Orçamento sem nome`,clienteId:this.calc.clienteId||``,clienteNome:e?e.nome:``,clienteEmail:e?e.email:``,clienteTelefone:e?e.telefone:``,tecnica:this.calc.tecnica||``,materiais:Number(this.calc.materiais)||0,horas:Number(this.calc.horas)||0,valorHora:Number(this.calc.valorHora)||60,largura:Number(this.calc.largura)||0,altura:Number(this.calc.altura)||0,profundidade:Number(this.calc.profundidade)||0,complexidade:Number(this.calc.complexidade)||3,multiplicador:Number(this.calc.multiplicador)||this.config.multiplicadorExperiencia||1.5,arredondamento:Number(this.calc.arredondamento)||0,comissaoGaleria:Number(this.calc.comissaoGaleria)||0,preco:this.calcularPreco(this.calc),moeda:this.moeda,numero:``,validade:30,validadeData:``,status:`rascunho`,data:new Date().toISOString(),criadoEm:new Date().toISOString()}}_gerarNumeroProposta(){let e=this.cfgRoot,t=new Date().getFullYear();return(!e.contadorPropostas||typeof e.contadorPropostas!=`object`)&&(e.contadorPropostas={}),e.contadorPropostas[t]=(Number(e.contadorPropostas[t])||0)+1,q().salvar(),`PRO-${t}-${String(e.contadorPropostas[t]).padStart(4,`0`)}`}_persistirOrcamento(e){e.numero||(e.numero=this._gerarNumeroProposta(),e.validadeData=new Date(Date.now()+30*864e5).toISOString().slice(0,10)),this._garantirAceiteToken(e);let t=this.cfgRoot.precificadorOrcamentos||[],n=t.findIndex(t=>t.id===e.id);return n>=0?t[n]=e:t.unshift(e),this.cfgRoot.precificadorOrcamentos=t,q().salvar(),e}_garantirAceiteToken(e){return e.aceiteToken?e.aceiteToken:(e.aceiteToken=`aceite_`+Math.random().toString(36).slice(2,10)+Date.now().toString(36),q().salvar(),e.aceiteToken)}salvarOrcamento(){if(this.calcularPreco(this.calc)<=0){A(`Preencha pelo menos materiais, horas ou dimensões.`,`aviso`);return}let e=this._persistirOrcamento(this._dadosOrcamentoAtual());A(`Orçamento salvo: ${this.fmt(e.preco)}!`,`sucesso`),Q.registrar(`criacao`,`Orçamento criado`,e.nome,`criacao`),this.rerenderizar()}copiarPreco(){let e=this.calcularPreco(this.calc);if(e<=0){A(`Calcule um preço primeiro.`,`aviso`);return}let t=this.calc.nome?`${this.calc.nome}: `:``;navigator.clipboard.writeText(`${t}${this.fmt(e)}`).then(()=>A(`Preço ${this.fmt(e)} copiado!`,`sucesso`)).catch(()=>A(`Erro ao copiar.`,`erro`))}carregarOrcamento(e){let t=this.orcamentos.find(t=>t.id===e);if(!t){A(`Orçamento não encontrado.`,`aviso`);return}this.calc={nome:t.nome||``,clienteId:t.clienteId||``,tecnica:t.tecnica||``,materiais:t.materiais||0,horas:t.horas||0,valorHora:t.valorHora||this.config.valorHora||60,largura:t.largura||0,altura:t.altura||0,profundidade:t.profundidade||0,complexidade:t.complexidade||3,multiplicador:t.multiplicador||this.config.multiplicadorExperiencia||1.5,arredondamento:t.arredondamento||0,comissaoGaleria:Number(t.comissaoGaleria)||0},A(`Orçamento carregado na calculadora.`,`info`),this.rerenderizar();let n=document.getElementById(`precificadorContainer`);n&&n.scrollIntoView({behavior:`smooth`,block:`start`})}definirStatusOrcamento(e,t){let n=this.cfgRoot.precificadorOrcamentos||[],r=n.find(t=>t.id===e);if(!r)return;r.status=t,this._registrarTimestampStatus(r,t),this.cfgRoot.precificadorOrcamentos=n,q().salvar();let i={rascunho:`Rascunho`,enviado:`Enviado`,aprovado:`Aprovado`,recusado:`Recusado`},a=document.querySelector(`.orcamento-item[data-id="${e}"]`);if(a){let e=a.querySelector(`.orc-status`);e&&(e.textContent=i[t]||t,e.className=`orc-status st-`+(t||`rascunho`))}else this.rerenderizar();A(`Orçamento marcado como "${i[t]||t}".`,`sucesso`)}_moverOrcamentoParaStatus(e,t){let n=this.cfgRoot.precificadorOrcamentos||[],r=n.find(t=>t.id===e);!r||(r.status||`rascunho`)===t||(r.status=t,this._registrarTimestampStatus(r,t),this.cfgRoot.precificadorOrcamentos=n,q().salvar(),A(`Orçamento movido para "${Wi.find(e=>e.status===t)?.rotulo||t}".`,`sucesso`),this.rerenderizar())}_registrarTimestampStatus(e,t){let n=new Date().toISOString();t===`enviado`&&!e.enviadoEm&&(e.enviadoEm=n),t===`aprovado`&&!e.aprovadoEm&&(e.aprovadoEm=n),t===`recusado`&&!e.recusadoEm&&(e.recusadoEm=n)}async registrarVenda(e){let t=this.orcamentos.find(t=>t.id===e);if(!t){A(`Orçamento não encontrado.`,`aviso`);return}if((t.status||`rascunho`)!==`aprovado`){A(`Aprove o orçamento antes de registrar a venda.`,`aviso`);return}if(t.convertidoEm){A(`Este orçamento já foi convertido em venda.`,`aviso`);return}if(!await R(`Registrar a venda de "${t.nome}" por ${this.fmt(t.preco,t.moeda)}?`,{textoConfirmar:`Registrar Venda`,titulo:`Converter em Venda`}))return;let n={obraId:``,obraTitulo:t.nome||`Obra sem título`,clienteId:t.clienteId||``,clienteNome:t.clienteNome||`Cliente avulso`,precoFinal:t.preco||0,valorTotal:t.preco||0,data:new Date().toISOString().slice(0,10),dataVenda:new Date().toISOString().slice(0,10),formaPagamento:`a combinar`,status:`aprovada`,orcamentoId:t.id,numeroProposta:t.numero||``},r=this.dataStore.adicionar(`vendas`,n);if(t.clienteId){let e=G().items.find(e=>e.id===t.clienteId);e&&G().atualizar(t.clienteId,{aquisicoes:(Number(e.aquisicoes)||0)+1})}t.convertidoEm=new Date().toISOString(),t.vendaId=r?r.id:``,this.cfgRoot.precificadorOrcamentos=this.orcamentos,q().salvar(),A(`Venda registrada: ${this.fmt(t.preco,t.moeda)}!`,`sucesso`),Q.registrar(`venda`,`Venda registrada a partir do orçamento`,t.nome,`venda`),this.router&&typeof this.router.navegar==`function`&&setTimeout(()=>this.router.navegar(`vendas`),400)}async excluirOrcamento(e){await R(`Excluir este orçamento?`,{textoConfirmar:`Excluir`,perigoso:!0})&&(this.cfgRoot.precificadorOrcamentos=(this.cfgRoot.precificadorOrcamentos||[]).filter(t=>t.id!==e),q().salvar(),A(`Orçamento excluído.`,`sucesso`),this.rerenderizar())}criarEncomenda(e){let t=e?this.orcamentos.find(t=>t.id===e):null;if(!t){if(this.calcularPreco(this.calc)<=0){A(`Calcule um preço primeiro.`,`aviso`);return}t=this._dadosOrcamentoAtual()}let n=t.nome+(t.tecnica?` — ${t.tecnica}`:``)+(t.largura?` — ${[t.largura,t.altura,t.profundidade].filter(Boolean).join(`×`)}cm`:``),r={clienteNome:t.clienteNome||`Cliente avulso`,clienteEmail:t.clienteEmail||``,clienteTelefone:t.clienteTelefone||``,descricao:n,prazo:``,status:`recebido`,valor:t.preco||0,atualizacoes:[{data:new Date().toISOString(),status:`recebido`,mensagem:`Encomenda criada a partir do orçamento "${t.nome}".`}],imagens:[]};this.dataStore.adicionar(`encomendas`,r),A(`Encomenda criada (${this.fmt(t.preco,t.moeda)})!`,`sucesso`),Q.registrar(`criacao`,`Encomenda criada do orçamento`,t.nome,`criacao`),this.router&&typeof this.router.navegar==`function`&&setTimeout(()=>this.router.navegar(`encomendas`),400)}exportarPropostaPDF(e){if(window.jspdf===void 0&&typeof jspdf>`u`){A(`jsPDF não carregado. Tente novamente.`,`erro`);return}let t=e?this.orcamentos.find(t=>t.id===e):null;if(!t){if(this.calcularPreco(this.calc)<=0){A(`Calcule um preço primeiro.`,`aviso`);return}t=this._persistirOrcamento(this._dadosOrcamentoAtual()),A(`Orçamento salvo automaticamente para gerar o QR de aceite.`,`info`),this.rerenderizar()}let n=this.config.templateProposta||`classico`;j(`Gerando proposta PDF...`);let{jsPDF:r}=window.jspdf,i=new r({orientation:`portrait`,unit:`mm`,format:`a4`}),a=this._prepararProposta(t),o=this._gerarQRProposta(t);n===`moderno`?this._propostaModerno(i,a,o):n===`minimalista`?this._propostaMinimalista(i,a,o):this._propostaClassico(i,a,o),i.save(`proposta-${(t.nome||`obra`).toLowerCase().replace(/[^a-z0-9]+/g,`-`)||`obra`}.pdf`),M(),A(`Proposta PDF exportada!`,`sucesso`)}_prepararProposta(e){let t=q().artista?.nome||`Artista`,n=q().artista?.email?` | ${q().artista.email}`:``,r=[e.largura,e.altura,e.profundidade].filter(Boolean).join(` × `);return{orc:e,artista:t,contato:n,numero:e.numero||String(e.id||``).replace(`orc_`,``),data:new Date().toLocaleDateString(`pt-BR`),nome:e.nome||`Obra sem título`,tecnica:e.tecnica?L(e.tecnica):``,dims:r,complexidade:e.complexidade?`★`.repeat(Math.max(1,Math.min(5,Number(e.complexidade)||1))):``,cliente:e.clienteNome||`Cliente avulso`,clienteEmail:e.clienteEmail||``,materiais:e.materiais||0,horas:e.horas||0,valorHora:e.valorHora||60,maoObra:(e.horas||0)*(e.valorHora||60),custoTotal:(e.materiais||0)+(e.horas||0)*(e.valorHora||60),multiplicador:e.multiplicador||1.5,preco:e.preco||0,comissaoPct:Math.max(0,Math.min(90,Number(e.comissaoGaleria)||0)),precoGaleria:(e.preco||0)/(1-Math.max(0,Math.min(90,Number(e.comissaoGaleria)||0))/100),moeda:e.moeda||this.moeda,validadeData:e.validadeData?k(e.validadeData):``}}_gerarQRProposta(e){let t=e.aceiteToken||this._garantirAceiteToken(e),n=``;try{window.location.origin&&window.location.origin!==`null`&&!window.location.origin.startsWith(`file`)&&(n=window.location.origin+window.location.pathname)}catch{}return xr(n+`#portal?token=`+t)}_propostaClassico(e,t,n){e.setFont(`times`,`bold`),e.setFontSize(20),e.setTextColor(40),e.text(`PROPOSTA DE OBRA`,22,24),e.setFont(`times`,`italic`),e.setFontSize(10),e.setTextColor(90),e.text(`${t.artista}${t.contato}`,22,31),e.setTextColor(140),e.setDrawColor(120),e.setLineWidth(.4),e.line(22,35,188,35),e.setLineWidth(.15),e.line(22,36.2,188,36.2),e.setFont(`times`,`normal`),e.setFontSize(9),e.setTextColor(100),e.text(`Proposta Nº ${t.numero}`,188,44,{align:`right`}),e.text(`Emissão: ${t.data}`,188,48,{align:`right`});let r=58,i=t=>{e.setFont(`times`,`bold`),e.setFontSize(12),e.setTextColor(60),e.text(t.toUpperCase(),22,r),r+=5.5},a=(t,n)=>{e.setFont(`times`,`normal`),e.setFontSize(11),e.setTextColor(40),e.text(t,22,r),e.setFont(`times`,`italic`),e.setTextColor(80),n&&e.text(String(n),72,r),r+=6};i(`Obra`),a(`Título:`,t.nome);let o=[t.tecnica,t.dims?t.dims+` cm`:``,t.complexidade].filter(Boolean).join(`   ·   `);o&&a(`Detalhes:`,o),a(`Cliente:`,t.cliente+(t.clienteEmail?` — `+t.clienteEmail:``)),r+=3,e.setDrawColor(180),e.setLineWidth(.15),e.line(22,r,188,r),r+=8,i(`Composição do valor`),a(`Materiais:`,this.fmt(t.materiais,t.moeda)),a(`Mão de obra:`,`${t.horas}h × ${this.fmt(t.valorHora,t.moeda)} = ${this.fmt(t.maoObra,t.moeda)}`),a(`Custo total:`,this.fmt(t.custoTotal,t.moeda)),a(`Multiplicador:`,`× ${t.multiplicador}`),t.comissaoPct>0&&a(`Comissão de galeria:`,`${t.comissaoPct}%`),r+=3,e.setDrawColor(180),e.line(22,r,188,r),r+=10,e.setFont(`times`,`bold`),e.setFontSize(18),e.setTextColor(30),e.text(`Valor da proposta: ${this.fmt(t.preco,t.moeda)}`,22,r),r+=7,t.comissaoPct>0&&(e.setFont(`times`,`italic`),e.setFontSize(10),e.setTextColor(90),e.text(`Preço via galeria (com ${t.comissaoPct}% de comissão): ${this.fmt(t.precoGaleria,t.moeda)}`,22,r),r+=7),e.setFont(`times`,`italic`),e.setFontSize(9.5),e.setTextColor(90),e.text(`Validade da proposta: 30 dias${t.validadeData?` (até `+t.validadeData+`)`:``}.`,22,r),r+=5,e.text(`Aceite por meio do QR code abaixo ou assinatura manual.`,22,r),r+=4,n&&(e.addImage(n,`PNG`,146,r,42,42),e.setDrawColor(140),e.setLineWidth(.2),e.rect(144,r-2,46,46),e.setFont(`times`,`italic`),e.setFontSize(8),e.setTextColor(110),e.text(`Escaneie para aceitar a proposta digitalmente.`,22,r+48)),e.setDrawColor(150),e.setLineWidth(.2),e.line(22,262,92,262),e.line(118,262,188,262),e.setFont(`times`,`italic`),e.setFontSize(9),e.setTextColor(110),e.text(`Cliente`,22,267),e.text(`Artista`,118,267),e.setFontSize(8),e.setTextColor(150),e.text(`${t.artista} · ${t.data}`,118,272,{align:`right`})}_propostaModerno(e,t,n){let r=[146,100,45],i=[60,45,30];e.setFillColor(r[0],r[1],r[2]),e.rect(0,0,210,7,`F`),e.setTextColor(255),e.setFont(`helvetica`,`bold`),e.setFontSize(16),e.text(`PROPOSTA DE OBRA`,20,5),e.setFont(`helvetica`,`normal`),e.setFontSize(8),e.text(`${t.numero} · ${t.data}`,190,5,{align:`right`});let a=26;e.setTextColor(i[0],i[1],i[2]),e.setFont(`helvetica`,`bold`),e.setFontSize(22),e.text(t.nome,20,a),a+=7,e.setFont(`helvetica`,`normal`),e.setFontSize(10),e.setTextColor(120);let o=[t.tecnica,t.dims?t.dims+` cm`:``,t.complexidade].filter(Boolean).join(`  ·  `);o&&(e.text(o,20,a),a+=6),e.text(`Cliente: ${t.cliente}${t.clienteEmail?` · `+t.clienteEmail:``}`,20,a),a+=6,e.text(`${t.artista}${t.contato}`,20,a),a+=8,e.setDrawColor(r[0],r[1],r[2]),e.setLineWidth(.5),e.line(20,a,190,a),a+=9;let s=t=>{e.setFillColor(r[0],r[1],r[2]),e.roundedRect(20,a-4,6,6,1,1,`F`),e.setTextColor(i[0],i[1],i[2]),e.setFont(`helvetica`,`bold`),e.setFontSize(12),e.text(t.toUpperCase(),30,a),a+=7},c=(t,n)=>{e.setFont(`helvetica`,`normal`),e.setFontSize(10),e.setTextColor(95),e.text(t,30,a),e.setTextColor(i[0],i[1],i[2]),e.text(String(n),110,a),a+=6};s(`Composição do valor`),c(`Materiais`,this.fmt(t.materiais,t.moeda)),c(`Mão de obra`,`${t.horas}h × ${this.fmt(t.valorHora,t.moeda)}`),c(`Custo total`,this.fmt(t.custoTotal,t.moeda)),c(`Multiplicador`,`× ${t.multiplicador}`),t.comissaoPct>0&&c(`Comissão de galeria`,`${t.comissaoPct}%`),a+=3,e.setDrawColor(215),e.setLineWidth(.2),e.line(20,a,190,a),a+=9,e.setFillColor(250,243,233),e.setDrawColor(r[0],r[1],r[2]),e.setLineWidth(.6),e.roundedRect(20,a-6,170,20,2,2,`FD`),e.setFont(`helvetica`,`normal`),e.setFontSize(9),e.setTextColor(120),e.text(`VALOR DA PROPOSTA`,28,a),e.setFont(`helvetica`,`bold`),e.setFontSize(16),e.setTextColor(r[0],r[1],r[2]),e.text(this.fmt(t.preco,t.moeda),28,a+7),t.comissaoPct>0&&(e.setFont(`helvetica`,`normal`),e.setFontSize(8),e.setTextColor(120),e.text(`via galeria (+${t.comissaoPct}%): ${this.fmt(t.precoGaleria,t.moeda)}`,28,a+13)),e.setFont(`helvetica`,`normal`),e.setFontSize(9),e.setTextColor(120),e.text(`Validade: 30 dias${t.validadeData?` (até `+t.validadeData+`)`:``}`,182,a+7,{align:`right`}),a+=27,n&&(e.addImage(n,`PNG`,20,a,38,38),e.setDrawColor(215),e.setLineWidth(.3),e.rect(20,a,38,38),e.setFont(`helvetica`,`normal`),e.setFontSize(9),e.setTextColor(120),e.text(`Aceite digital`,65,a+6),e.setFontSize(8),e.text(`Escaneie o QR code para aprovar`,65,a+11),e.text(`esta proposta automaticamente.`,65,a+15),e.setFontSize(9),e.setTextColor(130),e.text(`Ou assine:`,65,a+24),e.setDrawColor(150),e.line(65,a+27,190,a+27),e.setFontSize(8),e.text(`Cliente`,65,a+31))}_propostaMinimalista(e,t,n){let r=30;e.setFont(`helvetica`,`normal`),e.setFontSize(9),e.setTextColor(150),e.text(t.numero,30,r),e.text(t.data,180,r,{align:`right`}),r+=7,e.setTextColor(20),e.setFont(`helvetica`,`bold`),e.setFontSize(24),e.text(t.nome,30,r),r+=9,e.setFont(`helvetica`,`normal`),e.setFontSize(10),e.setTextColor(130);let i=[t.tecnica,t.dims?t.dims+` cm`:``,t.complexidade].filter(Boolean).join(`   ·   `);i&&(e.text(i,30,r),r+=6),e.text(`Cliente: ${t.cliente}${t.clienteEmail?` · `+t.clienteEmail:``}`,30,r),r+=6,e.text(t.artista+(t.contato?t.contato.replace(` | `,` · `):``),30,r),r+=14,e.setDrawColor(220),e.setLineWidth(.2),e.line(30,r,180,r),r+=13;let a=(t,n)=>{e.setFont(`helvetica`,`normal`),e.setFontSize(9),e.setTextColor(150),e.text(t.toUpperCase(),30,r),e.setTextColor(60),e.text(String(n),180,r,{align:`right`}),r+=6.5};a(`Materiais`,this.fmt(t.materiais,t.moeda)),a(`Mão de obra`,`${t.horas}h × ${this.fmt(t.valorHora,t.moeda)}`),a(`Custo total`,this.fmt(t.custoTotal,t.moeda)),a(`Multiplicador`,`× ${t.multiplicador}`),t.comissaoPct>0&&a(`Comissão de galeria`,`${t.comissaoPct}%`),r+=8,e.setDrawColor(220),e.line(30,r,180,r),r+=15,e.setFont(`helvetica`,`bold`),e.setFontSize(30),e.setTextColor(20),e.text(this.fmt(t.preco,t.moeda),30,r),r+=8,e.setFont(`helvetica`,`normal`),e.setFontSize(9),e.setTextColor(140),t.comissaoPct>0&&(e.text(`via galeria (+${t.comissaoPct}%): ${this.fmt(t.precoGaleria,t.moeda)}`,30,r),r+=5),e.text(`Validade: 30 dias${t.validadeData?` (até `+t.validadeData+`)`:``}`,30,r),r+=18,n&&(e.addImage(n,`PNG`,30,r,34,34),e.setDrawColor(220),e.setLineWidth(.2),e.line(70,r+4,180,r+4),e.setFontSize(8),e.setTextColor(140),e.text(`Cliente`,70,r+9),e.line(70,r+20,180,r+20),e.setTextColor(160),e.text(`Artista`,70,r+25),e.setTextColor(140),e.text(`Escaneie o QR para aprovar digitalmente.`,30,r+40))}adicionarRegra(){let e=document.getElementById(`regraNome`)?.value?.trim();if(!e){A(`Informe um nome para a regra.`,`aviso`);return}let t=this.cfgRoot.precificadorRegras||[];t.push({id:`regra_`+Date.now(),nome:e,tecnica:document.getElementById(`regraTecnica`)?.value||``,larguraMin:Number(document.getElementById(`regraLargMin`)?.value)||0,larguraMax:Number(document.getElementById(`regraLargMax`)?.value)||9999,alturaMin:Number(document.getElementById(`regraAltMin`)?.value)||0,alturaMax:Number(document.getElementById(`regraAltMax`)?.value)||9999,complexidade:Number(document.getElementById(`regraComplexidade`)?.value)||3,multiplicador:Number(document.getElementById(`regraMult`)?.value)||1.5,precoBase:Number(document.getElementById(`regraBase`)?.value)||0}),this.cfgRoot.precificadorRegras=t,q().salvar(),A(`Regra adicionada!`,`sucesso`),this.rerenderizar()}removerRegra(e){let t=this.cfgRoot.precificadorRegras||[];t.splice(e,1),this.cfgRoot.precificadorRegras=t,q().salvar(),this.rerenderizar()}aplicarRegra(e){let t=(this.cfgRoot.precificadorRegras||[])[e];if(!t)return;let n=W().items||[],r=0;n.forEach(e=>{let n=e.dimensoes;if(!n||t.tecnica&&e.tecnica!==t.tecnica||n.largura<t.larguraMin||n.largura>t.larguraMax||n.altura<t.alturaMin||n.altura>t.alturaMax)return;let i=1+n.largura*n.altura/1e4,a=Math.round((t.precoBase||0)*t.multiplicador*this.fatoresComplexidade[t.complexidade]*i);if(a>0){let n=e.historicoPrecos||[];e.preco&&Number(e.preco)>0&&n.push({preco:Number(e.preco),data:new Date().toISOString().slice(0,10),motivo:`Reajuste por regra: `+t.nome}),W().atualizar(e.id,{preco:a,historicoPrecos:n}),r++}}),A(`Regra "${t.nome}" aplicada em ${r} obra${r>1?`s`:``}.`,`sucesso`),this.rerenderizar()}aplicarRegrasEmTodas(){let e=this.cfgRoot.precificadorRegras||[];if(e.length===0){A(`Nenhuma regra cadastrada.`,`aviso`);return}let t=(W().items||[]).filter(e=>!e.preco||Number(e.preco)===0),n=0;t.forEach(t=>{let r=t.dimensoes;if(!r||!r.largura)return;let i=e.find(e=>!(e.tecnica&&t.tecnica!==e.tecnica||r.largura<e.larguraMin||r.largura>e.larguraMax||r.altura<e.alturaMin||r.altura>e.alturaMax));if(!i)return;let a=1+r.largura*r.altura/1e4,o=Math.round((i.precoBase||0)*i.multiplicador*this.fatoresComplexidade[i.complexidade||3]*a);o>0&&(W().atualizar(t.id,{preco:o}),n++)}),A(`Regras aplicadas em ${n} obra${n>1?`s`:``} sem preço.`,`sucesso`),this.rerenderizar()}exportarRelatorioPDF(){if(window.jspdf===void 0&&typeof jspdf>`u`){A(`jsPDF não carregado. Tente novamente.`,`erro`);return}j(`Gerando relatório de precificação...`);let{jsPDF:e}=window.jspdf,t=new e({orientation:`portrait`,unit:`mm`,format:`a4`}),n=W().items||[],r=K().items||[],i=this.config,a=q().artista?.nome||`Artista`,o=20;t.setFont(`helvetica`,`bold`),t.setFontSize(16),t.text(`Relatório de Precificação`,20,o),o+=8,t.setFont(`helvetica`,`normal`),t.setFontSize(9),t.text(`Artista: ${a} | Moeda: ${this.moeda} | Gerado em: ${new Date().toLocaleDateString(`pt-BR`)}`,20,o),o+=6,t.setDrawColor(200),t.line(20,o,190,o),o+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Preços Sugeridos`,20,o),o+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8);let s=n.filter(e=>e.dimensoes&&e.dimensoes.largura&&e.dimensoes.altura);s.length>0?s.slice(0,20).forEach(e=>{let n={materiais:Number(e.custoMateriais)||0,horas:Number(e.horasTrabalho)||0,valorHora:i.valorHora||60,largura:e.dimensoes.largura,altura:e.dimensoes.altura,complexidade:3},r=this.calcularPreco(n);o>270&&(t.addPage(),o=20),t.text(`${e.titulo||`Sem título`} — Atual: ${this.fmt(e.preco)} | Sugerido: ${this.fmt(r)} | ${e.tecnica||``} | ${e.dimensoes.largura}×${e.dimensoes.altura}cm`,20,o),o+=5}):(t.text(`Nenhuma obra com dimensões para calcular preço sugerido.`,20,o),o+=5),o+=6,t.setDrawColor(200),t.line(20,o,190,o),o+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Análise de Break-Even`,20,o),o+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8);let c=n.filter(e=>(e.custoMateriais>0||e.horasTrabalho>0)&&e.preco>0);c.length>0?c.slice(0,15).forEach(e=>{let n=(Number(e.custoMateriais)||0)+(Number(e.horasTrabalho)||0)*(i.valorHora||60),r=Number(e.preco)||0,a=r>0?(r-n)/r*100:0;o>270&&(t.addPage(),o=20),t.text(`${e.titulo||`Sem título`} — Custo: ${this.fmt(n)} | Preço: ${this.fmt(r)} | Margem: ${a.toFixed(1)}%`,a,o),o+=5}):(t.text(`Nenhuma obra com dados de custo.`,20,o),o+=5),o+=6,t.setDrawColor(200),t.line(20,o,190,o),o+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Metas Financeiras`,20,o),o+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(9);let l=new Date,u=l.getMonth(),d=l.getFullYear(),f=r.filter(e=>e.dataVenda&&e.valorTotal&&new Date(e.dataVenda).getMonth()===u&&new Date(e.dataVenda).getFullYear()===d).reduce((e,t)=>e+Number(t.valorTotal),0),p=r.filter(e=>e.dataVenda&&e.valorTotal&&new Date(e.dataVenda).getFullYear()===d).reduce((e,t)=>e+Number(t.valorTotal),0);t.text(`Meta Mensal: ${this.fmt(i.metaMensal||1e4)} | Faturamento: ${this.fmt(f)}`,20,o),o+=5,t.text(`Meta Anual: ${this.fmt(i.metaAnual||12e4)} | Faturamento: ${this.fmt(p)}`,20,o),o+=5,t.text(`Progresso mensal: ${i.metaMensal>0?Math.round(f/i.metaMensal*100):0}%`,20,o),o+=5,o+=6,t.setDrawColor(200),t.line(20,o,190,o),o+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Análise do Portfólio`,20,o),o+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(9);let m=n.filter(e=>Number(e.preco)>0).map(e=>Number(e.preco)),h=m.length?Math.round(m.reduce((e,t)=>e+t,0)/m.length):0,g=m.reduce((e,t)=>e+t,0);t.text(`Obras precificadas: ${m.length}`,20,o),o+=5,t.text(`Preço médio: ${this.fmt(h)}`,20,o),o+=5,t.text(`Valor total do portfólio: ${this.fmt(g)}`,20,o),o+=5,m.length>0&&(t.text(`Menor preço: ${this.fmt(Math.min(...m))} | Maior preço: ${this.fmt(Math.max(...m))}`,20,o),o+=5);let _=this._calcularPipeline();_&&(o>240&&(t.addPage(),o=20),o+=6,t.setDrawColor(200),t.line(20,o,190,o),o+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Pipeline de Orçamentos`,20,o),o+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(9),t.text(`Taxa de conversão (enviados → aprovados): ${_.taxaConversao.toFixed(1)}% (${_.aprovados} de ${_.enviados})`,20,o),o+=5,t.text(`Tempo médio até aprovação: ${_.tempoMedio===null?`—`:_.tempoMedio.toFixed(1)+` dias`}`,20,o),o+=5,t.text(`Receita potencial em aberto: ${this.fmt(_.receitaPotencial)} (${_.emAberto} aprovado${_.emAberto===1?``:`s`} não convertido${_.emAberto===1?``:`s`})`,20,o),o+=5,t.text(`Aprovados convertidos em venda: ${_.convertidos} de ${_.aprovados}`,20,o),o+=5);let v=this.orcamentos;if(v.length>0){o>240&&(t.addPage(),o=20),o+=6,t.setDrawColor(200),t.line(20,o,190,o),o+=8,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Orçamentos Salvos`,20,o),o+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8);let e={rascunho:`Rascunho`,enviado:`Enviado`,aprovado:`Aprovado`,recusado:`Recusado`};v.slice(0,25).forEach(n=>{o>270&&(t.addPage(),o=20),t.text(`${n.nome||`Sem nome`} — ${e[n.status]||n.status} — ${this.fmt(n.preco,n.moeda||this.moeda)} — ${n.clienteNome||`Cliente avulso`}`,20,o),o+=5})}t.save(`relatorio-precificacao.pdf`),M(),A(`Relatório PDF exportado com sucesso!`,`sucesso`)}},Ki=class extends H{constructor(e,t){super(e,t),this.tabAtiva=`estoque`,this.filtroCategoria=``,this.catIcones={tintas:`🎨`,superficies:`📐`,ferramentas:`🔧`,molduras:`🖼️`},this.catLabels={tintas:`Tintas`,superficies:`Superfícies`,ferramentas:`Ferramentas`,molduras:`Molduras`}}get materiais(){return this.dataStore.listar(`materiais`)||[]}get fornecedores(){return this.dataStore.listar(`fornecedores`)||[]}get consumos(){return this.dataStore.listar(`consumos`)||[]}get obras(){return W().items}render(){let e=[`estoque`,`consumo`,`compras`,`fornecedores`,`custo`],t={estoque:`📦 Estoque`,consumo:`📋 Consumo`,compras:`🛒 Compras`,fornecedores:`🏪 Fornecedores`,custo:`💰 Custo p/ Obra`};return`
      <div>
        <div class="atelier-tabs">
          ${e.map(e=>`<button class="tab-btn ${e===this.tabAtiva?`ativo`:``}" data-tab="${e}">${t[e]}</button>`).join(``)}
        </div>
        <div id="atelierContent">${{estoque:()=>this.renderEstoque(),consumo:()=>this.renderConsumo(),compras:()=>this.renderCompras(),fornecedores:()=>this.renderFornecedores(),custo:()=>this.renderCustoObra()}[this.tabAtiva]()}</div>
      </div>
    `}renderEstoque(){let e=this.materiais,t=Object.keys(this.catLabels),n=this.filtroCategoria?e.filter(e=>e.categoria===this.filtroCategoria):e;return`
      <div class="mat-filtros">
        <select id="filtroCatEstoque">
          <option value="">📚 Todas as categorias</option>
          ${t.map(e=>`<option value="${e}" ${this.filtroCategoria===e?`selected`:``}>${this.catIcones[e]} ${this.catLabels[e]}</option>`).join(``)}
        </select>
        <button class="btn-primario" id="btnNovoMaterial" style="font-size:0.8rem;padding:6px 14px;">➕ Novo Material</button>
        <span style="font-size:0.8rem;color:var(--text-muted);margin-left:auto;">${n.length} item(ns)</span>
      </div>
      <div class="mat-grid">
        ${n.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum material encontrado.</p>`:``}
        ${n.map(e=>this.renderCardMaterial(e)).join(``)}
      </div>
    `}renderCardMaterial(e){let t=Number(e.quantidade)||0,n=Number(e.quantidadeMinima)||0,r=t<=0||n>0&&t<=n?`baixo`:n>0&&t<=n*2?`medio`:`ok`,i=r===`baixo`?`⚠️ Repor`:r===`medio`?`⚠️ Atenção`:`✅ OK`,a=e.categoria||`outros`;return`
      <div class="mat-card">
        <div class="mat-faixa-alerta ${r}"></div>
        <div class="mat-header">
          <div>
            <div class="mat-nome">${this.catIcones[a]||`📦`} ${e.nome||``}</div>
            <span class="mat-cat ${a}">${this.catLabels[a]||a} ${e.subcategoria?`· `+e.subcategoria:``}</span>
          </div>
          <div style="text-align:right;">
            <div class="mat-qtd ${r===`baixo`?`alerta`:`ok`}">${t}</div>
            <div class="mat-qtd-label">${e.unidade||`un`}</div>
            <span class="mat-badge ${r}">${i}</span>
          </div>
        </div>
        <div class="mat-detalhes">
          ${e.marca?`<span>🏷️ ${e.marca}</span>`:``}
          ${e.local?`<span>📍 ${e.local}</span>`:``}
          ${e.precoUnitario?`<span>💰 R$ ${Number(e.precoUnitario).toFixed(2)}/${e.unidade||`un`}</span>`:``}
          ${e.dataAquisicao?`<span>📅 ${e.dataAquisicao}</span>`:``}
          ${e.validade?`<span>⏳ Val: ${e.validade}</span>`:``}
        </div>
        ${e.notas?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>`:``}
        <div class="mat-acoes">
          <button data-acao="editarMaterial" data-id="${e.id}">✏️ Editar</button>
          <button data-acao="consumirMaterial" data-id="${e.id}">📉 Consumir</button>
           <button data-acao="excluirMaterial" data-id="${e.id}" style="color:#dc2626;" aria-label="Excluir material">🗑️</button>
        </div>
      </div>
    `}renderConsumo(){let e=this.consumos,t=this.materiais,n=this.obras,r=e.map(e=>{let r=t.find(t=>t.id===e.materialId),i=n.find(t=>t.id===e.obraId),a=r&&r.precoUnitario?Number(e.quantidade)*Number(r.precoUnitario):null;return{...e,matNome:r?r.nome:`(removido)`,obraTitulo:i?i.titulo:`(removida)`,custo:a}}).reverse();return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <button class="btn-primario" id="btnNovoConsumo" style="font-size:0.8rem;padding:6px 14px;">➕ Registrar Consumo</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${e.length} registro(s)</span>
      </div>
      ${r.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum consumo registrado.</p>`:`
      <table class="cons-table">
        <caption class="sr-only">Lista de consumos</caption>
        <tr><th>Material</th><th>Obra</th><th>Qtd</th><th>Custo</th><th>Data</th><th>Notas</th><th></th></tr>
        ${r.map(e=>`
          <tr>
            <td class="cons-obra">${e.matNome}</td>
            <td>${e.obraTitulo}</td>
            <td>${e.quantidade}</td>
            <td>${e.custo===null?`—`:O(e.custo)}</td>
            <td>${e.data||`—`}</td>
            <td style="font-size:0.75rem;color:var(--text-muted);max-width:150px;overflow:hidden;text-overflow:ellipsis;">${e.notas||``}</td>
            <td><button data-acao="excluirConsumo" data-id="${e.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);color:#dc2626;cursor:pointer;" aria-label="Excluir consumo">🗑️</button></td>
          </tr>
        `).join(``)}
      </table>`}
    `}renderCompras(){let e=this.materiais,t=e.filter(e=>{let t=Number(e.quantidade)||0,n=Number(e.quantidadeMinima)||0;return n>0&&t<=n}),n=e.filter(e=>e.comprado===!1),r=e.filter(e=>e.comprado===!0),i=n.reduce((e,t)=>e+(Number(t.precoUnitario)||0)*Math.max(1,Math.ceil(((Number(t.quantidadeMinima)||0)*2-(Number(t.quantidade)||0))/1)),0);return`
      <div class="compras-resumo">
        <div class="cr-item"><div class="cr-valor">${t.length}</div><div class="cr-label">⚠️ Abaixo do mínimo</div></div>
        <div class="cr-item"><div class="cr-valor">${n.length}</div><div class="cr-label">🛒 Para comprar</div></div>
        <div class="cr-item"><div class="cr-valor">${r.length}</div><div class="cr-label">✅ Comprados</div></div>
        <div class="cr-item"><div class="cr-valor">${O(Math.round(i))}</div><div class="cr-label">💰 Custo estimado</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <button class="btn-primario" id="btnGerarLista" style="font-size:0.8rem;padding:6px 14px;">⚡ Gerar lista automática</button>
        <button class="btn-secundario" id="btnAddItemLista" style="font-size:0.8rem;padding:6px 14px;">➕ Adicionar item manual</button>
        <button class="btn-secundario" id="btnExportarListaTXT" style="font-size:0.8rem;padding:6px 14px;">📞 Exportar TXT</button>
      </div>
      ${n.length===0&&r.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum item na lista. Clique em "Gerar lista automática".</p>`:``}
      <ul class="lista-compras">
        ${n.map(e=>this.renderItemCompra(e,!1)).join(``)}
        ${r.map(e=>this.renderItemCompra(e,!0)).join(``)}
      </ul>
    `}renderItemCompra(e,t){let n=Math.max(1,Math.ceil((Number(e.quantidadeMinima)||0)*2-(Number(e.quantidade)||0)));return`
      <li class="${t?`comprado`:``}">
        <div class="lc-info">
          <div class="lc-nome">${this.catIcones[e.categoria]||`📦`} ${e.nome}</div>
          <div class="lc-cat">${this.catLabels[e.categoria]||e.categoria} ${e.marca?`· `+e.marca:``}</div>
        </div>
        <div class="lc-qtd">${t?`✔️`:`Qtd: ${n} ${e.unidade||`un`}`}</div>
        ${e.precoUnitario?`<div class="lc-preco">${O(Math.round((Number(e.precoUnitario)||0)*n))}</div>`:``}
        <div class="lc-acoes">
          ${t?`<button data-acao="desmarcarComprado" data-id="${e.id}" aria-label="Desmarcar comprado">↩️</button>`:`<button data-acao="marcarComprado" data-id="${e.id}" aria-label="Marcar comprado">✔</button>`}
          <button data-acao="removerLista" data-id="${e.id}" style="color:#dc2626;" aria-label="Remover da lista">🗑️</button>
        </div>
      </li>
    `}renderFornecedores(){let e=this.fornecedores;return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <button class="btn-primario" id="btnNovoFornecedor" style="font-size:0.8rem;padding:6px 14px;">➕ Novo Fornecedor</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${e.length} fornecedor(es)</span>
      </div>
      <div class="forn-grid">
        ${e.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum fornecedor cadastrado.</p>`:``}
        ${e.map(e=>{let t=e.historicoCompras||[],n=t.reduce((e,t)=>e+Number(t.valor||0),0);return`
            <div class="forn-card">
              <div class="forn-nome">🏪 ${e.nome}</div>
              <div class="forn-contato">${e.contato||``}${e.email?` · `+e.email:``}</div>
              <div class="forn-esp">📒 ${e.especialidade||`Sem especialidade`}</div>
              ${e.avaliacao?`<div class="forn-estrelas">${`★`.repeat(Math.min(5,Number(e.avaliacao)))}${`☆`.repeat(Math.max(0,5-Number(e.avaliacao)))}</div>`:``}
              ${e.notas?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>`:``}
              ${t.length>0?`
                <div class="forn-hist">
                  <div style="font-size:0.75rem;font-weight:600;color:var(--text-muted);margin-bottom:4px;">Histórico (Total: ${O(n)})</div>
                  ${t.map(e=>`<div class="hist-item"><span>${e.data||``} — ${e.itens||``}</span><span>${O(Number(e.valor)||0)}</span></div>`).join(``)}
                </div>
              `:``}
              <div class="forn-acoes">
                <button data-acao="editarFornecedor" data-id="${e.id}">✏️ Editar</button>
                <button data-acao="excluirFornecedor" data-id="${e.id}" style="color:#dc2626;" aria-label="Excluir fornecedor">🗑️</button>
              </div>
            </div>
          `}).join(``)}
      </div>
    `}renderCustoObra(){let e=this.obras;return this.consumos,this.materiais,`
      <div style="margin-bottom:12px;">
        <select id="selCustoObra" style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.9rem;background:var(--bg);color:var(--text);width:100%;max-width:400px;">
          <option value="">— Selecione uma obra —</option>
          ${e.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`} ${e.preco?`— `+O(e.preco):``}</option>`).join(``)}
        </select>
      </div>
      <div id="custoObraDetalhe">
        <p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o detalhamento de custos.</p>
      </div>
    `}renderCustoDetalhe(e){let t=W().items.find(t=>t.id===e);if(!t)return`<p style="color:var(--text-muted);">Obra não encontrada.</p>`;let n=this.consumos.filter(t=>t.obraId===e),r=this.materiais,i=0,a=n.map(e=>{let t=r.find(t=>t.id===e.materialId),n=t&&t.precoUnitario?Number(e.quantidade)*Number(t.precoUnitario):0;return i+=n,{...e,matNome:t?t.nome:`(removido)`,custo:n}}),o=Number(t.preco)||0,s=o>0?(o-i)/o*100:0,c=s>=60?`lucro-alta`:s>=30?`lucro-media`:`lucro-baixa`;return`
      <div class="custo-obra-header">
        <div class="custo-obra-card">
          <div class="co-valor">${O(Math.round(i))}</div>
          <div class="co-label">💰 Custo de produção</div>
        </div>
        <div class="custo-obra-card">
          <div class="co-valor">${o>0?O(o):`—`}</div>
          <div class="co-label">🏷️ Preço de venda</div>
        </div>
        <div class="custo-obra-card">
          <div class="co-valor ${c}">${s>0?s.toFixed(1)+`%`:`—`}</div>
          ${s>0?`<div class="co-label">📊 Margem de lucro ${s>=60?`✔`:s>=30?`⚠️`:`🔽`}</div>`:`<div class="co-label">Sem venda definida</div>`}
        </div>
      </div>
      ${a.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum material registrado como consumido nesta obra.</p>`:`
      <table class="cons-table">
        <caption class="sr-only">Detalhamento de custos</caption>
        <tr><th>Material</th><th>Qtd</th><th>Valor unit.</th><th>Custo</th><th>Data</th><th>Notas</th></tr>
        ${a.map(e=>`<tr><td class="cons-obra">${e.matNome}</td><td>${e.quantidade}</td><td>${r.find(t=>t.id===e.materialId)?.precoUnitario?`R$ `+Number(r.find(t=>t.id===e.materialId).precoUnitario).toFixed(2):`—`}</td><td>${O(Math.round(e.custo))}</td><td>${e.data||`—`}</td><td style="font-size:0.75rem;color:var(--text-muted);">${e.notas||``}</td></tr>`).join(``)}
        <tr style="font-weight:600;"><td>TOTAL</td><td></td><td></td><td>${O(Math.round(i))}</td><td></td><td></td></tr>
      </table>`}
      <div style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);">
        💡 Dica: Registre materiais usados na aba <strong>Consumo</strong> para ver o custo real de cada obra.
      </div>
    `}aposRenderizar(){this.removerListeners(),document.querySelectorAll(`.tab-btn[data-tab]`).forEach(e=>{let t=()=>{this.tabAtiva=e.dataset.tab,this.rerenderizar()};e.addEventListener(`click`,t),this._bindCache[`tab_`+e.dataset.tab]={el:e,handler:t,type:`click`}});let e=document.getElementById(`filtroCatEstoque`);if(e){let t=()=>{this.filtroCategoria=e.value,this.rerenderizar()};e.addEventListener(`change`,t),this._bindCache.filtroCatEstoque={el:e,handler:t,type:`change`}}document.getElementById(`btnNovoMaterial`)?.addEventListener(`click`,()=>this.abrirFormMaterial()),document.getElementById(`btnNovoConsumo`)?.addEventListener(`click`,()=>this.abrirFormConsumo()),document.getElementById(`btnNovoFornecedor`)?.addEventListener(`click`,()=>this.abrirFormFornecedor()),document.getElementById(`btnGerarLista`)?.addEventListener(`click`,()=>this.gerarListaCompras()),document.getElementById(`btnAddItemLista`)?.addEventListener(`click`,()=>this.abrirFormMaterial(!0)),document.getElementById(`btnExportarListaTXT`)?.addEventListener(`click`,()=>this.exportarListaTXT());let t=document.getElementById(`selCustoObra`);if(t){let e=()=>{let e=document.getElementById(`custoObraDetalhe`);e&&(e.innerHTML=t.value?this.renderCustoDetalhe(t.value):`<p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o detalhamento de custos.</p>`)};t.addEventListener(`change`,e),this._bindCache.selCustoObra={el:t,handler:e,type:`change`}}let n=document.getElementById(`atelierContent`)||document.getElementById(`viewPrincipal`);if(n){let e=e=>{let t=e.target.closest(`[data-acao]`);if(!t)return;let n=t.dataset.acao,r=t.dataset.id;n===`editarMaterial`?this.abrirFormMaterial(!1,r):n===`excluirMaterial`?this.excluirMaterial(r):n===`consumirMaterial`?this.consumirRapido(r):n===`excluirConsumo`?this.excluirConsumo(r):n===`editarFornecedor`?this.abrirFormFornecedor(r):n===`excluirFornecedor`?this.excluirFornecedor(r):n===`marcarComprado`?this.marcarComprado(r,!0):n===`desmarcarComprado`?this.marcarComprado(r,!1):n===`removerLista`&&this.removerDaLista(r)};n.addEventListener(`click`,e),this._bindCache.delegatedAtelier={el:n,handler:e,type:`click`}}}abrirFormMaterial(e=!1,t=null){let n=t?this.dataStore.buscarPorId(`materiais`,t):null,r=e||n&&n.comprado!==void 0,i=Object.keys(this.catLabels).map(e=>`<option value="${e}" ${n&&n.categoria===e?`selected`:``}>${this.catIcones[e]} ${this.catLabels[e]}</option>`).join(``);N(`
      <h3>${n?`✏️ Editar`:r?`➕ Adicionar à Lista`:`➕ Novo Material`}</h3>
      <form id="formModal" style="display:grid;gap:10px;">
        <div class="modal-form-grid">
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fMatNome" value="${n&&n.nome||``}" required aria-label="Nome" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Categoria</label><select id="fMatCat" aria-label="Categoria" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">${i}</select></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Subcategoria</label><input type="text" id="fMatSub" value="${n&&n.subcategoria||``}" aria-label="Subcategoria" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Marca</label><input type="text" id="fMatMarca" value="${n&&n.marca||``}" aria-label="Marca" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Quantidade atual</label><input type="number" id="fMatQtd" value="${n&&n.quantidade||0}" min="0" aria-label="Quantidade" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Unidade</label><input type="text" id="fMatUn" value="${n&&n.unidade||`un`}" aria-label="Unidade" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Qtd. mínima (alerta)</label><input type="number" id="fMatMin" value="${n&&n.quantidadeMinima||0}" min="0" aria-label="Quantidade mínima" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Preço unit. (R$)</label><input type="number" id="fMatPreco" value="${n&&n.precoUnitario||0}" min="0" step="0.01" aria-label="Preço unitário" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Local</label><input type="text" id="fMatLocal" value="${n&&n.local||``}" aria-label="Local" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Data aquisição</label><input type="date" id="fMatData" value="${n&&n.dataAquisicao||``}" aria-label="Data de aquisição" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fMatNotas" aria-label="Notas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;min-height:50px;">${n&&n.notas||``}</textarea></div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,e=>{e.preventDefault();let i={nome:document.getElementById(`fMatNome`).value.trim(),categoria:document.getElementById(`fMatCat`).value,subcategoria:document.getElementById(`fMatSub`).value.trim(),marca:document.getElementById(`fMatMarca`).value.trim(),quantidade:Number(document.getElementById(`fMatQtd`).value)||0,unidade:document.getElementById(`fMatUn`).value.trim()||`un`,quantidadeMinima:Number(document.getElementById(`fMatMin`).value)||0,precoUnitario:Number(document.getElementById(`fMatPreco`).value)||0,local:document.getElementById(`fMatLocal`).value.trim(),dataAquisicao:document.getElementById(`fMatData`).value,notas:document.getElementById(`fMatNotas`).value.trim()};if(!i.nome){A(`O nome é obrigatório.`,`aviso`);return}r&&(i.comprado=!1),n?(this.dataStore.atualizar(`materiais`,t,i),A(`Material atualizado!`,`sucesso`)):(this.dataStore.adicionar(`materiais`,i),A(`Material adicionado!`,`sucesso`)),P(),this.rerenderizar()})}async excluirMaterial(e){if(!await R(`Excluir este material?`))return;let t=this.dataStore.buscarPorId(`materiais`,e);this.dataStore.remover(`materiais`,e);let{dataStore:n}=this;z(`Material excluído.`,()=>{n.dados.materiais.push(t),n.salvar()}),this.rerenderizar()}consumirRapido(e){let t=this.dataStore.buscarPorId(`materiais`,e);if(!t)return;let n=this.obras.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`}</option>`).join(``);N(`
      <h3>📉 Consumir: ${t.nome}</h3>
      <form id="formModal">
        <div class="campo-form"><label>Obra</label><select id="fConsObra" aria-label="Obra">${n}</select></div>
        <div class="campo-form"><label>Quantidade (${t.unidade||`un`} — atual: ${t.quantidade})</label><input type="number" id="fConsQtd" value="1" min="0.1" step="0.1" aria-label="Quantidade"></div>
        <div class="campo-form"><label>Data</label><input type="date" id="fConsData" value="${new Date().toISOString().slice(0,10)}" aria-label="Data"></div>
        <div class="campo-form"><label>Notas</label><textarea id="fConsNotas" aria-label="Notas" placeholder="Ex.: Camada de fundo"></textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Consumir</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,n=>{n.preventDefault();let r=Number(document.getElementById(`fConsQtd`).value)||0;if(r<=0){A(`Quantidade inválida.`,`aviso`);return}let i=Math.max(0,(Number(t.quantidade)||0)-r);this.dataStore.atualizar(`materiais`,e,{quantidade:i}),this.dataStore.adicionar(`consumos`,{materialId:e,obraId:document.getElementById(`fConsObra`).value,quantidade:r,data:document.getElementById(`fConsData`).value,notas:document.getElementById(`fConsNotas`).value.trim()}),P(),A(`${r} ${t.unidade||`un`} consumido(s) de "${t.nome}". Novo estoque: ${i}.`,`info`),this.rerenderizar()})}abrirFormConsumo(){let e=this.materiais,t=this.obras;N(`
      <h3>📋 Registrar Consumo</h3>
      <form id="formModal">
        <div class="campo-form"><label>Material</label><select id="fConsMat" aria-label="Material">${e.map(e=>`<option value="${e.id}">${this.catIcones[e.categoria]||`📦`} ${e.nome} (${e.quantidade} ${e.unidade||`un`})</option>`).join(``)}</select></div>
        <div class="campo-form"><label>Obra</label><select id="fConsObraFull" aria-label="Obra">${t.map(e=>`<option value="${e.id}">${e.titulo||`Sem título`}</option>`).join(``)}</select></div>
        <div class="campo-form"><label>Quantidade</label><input type="number" id="fConsQtdFull" value="1" min="0.1" step="0.1" aria-label="Quantidade"></div>
        <div class="campo-form"><label>Data</label><input type="date" id="fConsDataFull" value="${new Date().toISOString().slice(0,10)}" aria-label="Data"></div>
        <div class="campo-form"><label>Notas</label><textarea id="fConsNotasFull" aria-label="Notas" placeholder="Ex.: Camada de fundo"></textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Registrar</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`fConsMat`).value,n=Number(document.getElementById(`fConsQtdFull`).value)||0;if(n<=0){A(`Quantidade inválida.`,`aviso`);return}let r=this.dataStore.buscarPorId(`materiais`,t);if(r){let e=Math.max(0,(Number(r.quantidade)||0)-n);this.dataStore.atualizar(`materiais`,t,{quantidade:e})}this.dataStore.adicionar(`consumos`,{materialId:t,obraId:document.getElementById(`fConsObraFull`).value,quantidade:n,data:document.getElementById(`fConsDataFull`).value,notas:document.getElementById(`fConsNotasFull`).value.trim()}),P(),A(`Consumo registrado e estoque atualizado!`,`sucesso`),this.rerenderizar()})}async excluirConsumo(e){if(!await R(`Excluir este registro de consumo?`))return;let t=this.dataStore.buscarPorId(`consumos`,e);this.dataStore.remover(`consumos`,e);let{dataStore:n}=this;z(`Registro excluído.`,()=>{n.dados.consumos.push(t),n.salvar()}),this.rerenderizar()}abrirFormFornecedor(e=null){let t=e?this.dataStore.buscarPorId(`fornecedores`,e):null;N(`
      <h3>${t?`✏️ Editar Fornecedor`:`➕ Novo Fornecedor`}</h3>
      <form id="formModal" style="display:grid;gap:10px;">
        <div class="modal-form-grid">
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fFornNome" value="${t&&t.nome||``}" required aria-label="Nome do fornecedor" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Contato</label><input type="text" id="fFornContato" value="${t&&t.contato||``}" aria-label="Contato" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">E-mail</label><input type="email" id="fFornEmail" value="${t&&t.email||``}" aria-label="E-mail do fornecedor" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Especialidade</label><input type="text" id="fFornEsp" value="${t&&t.especialidade||``}" aria-label="Especialidade" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div><label style="font-size:0.8rem;color:var(--text-muted);">Avaliação (1-5)</label><input type="number" id="fFornAval" value="${t&&t.avaliacao||0}" min="0" max="5" aria-label="Avaliação" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
          <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fFornNotas" aria-label="Notas do fornecedor" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;min-height:50px;">${t&&t.notas||``}</textarea></div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,n=>{n.preventDefault();let r=document.getElementById(`fFornNome`).value.trim();if(!r){A(`O nome é obrigatório.`,`aviso`);return}let i={nome:r,contato:document.getElementById(`fFornContato`).value.trim(),email:document.getElementById(`fFornEmail`).value.trim(),especialidade:document.getElementById(`fFornEsp`).value.trim(),avaliacao:Math.min(5,Math.max(0,Number(document.getElementById(`fFornAval`).value)||0)),notas:document.getElementById(`fFornNotas`).value.trim(),historicoCompras:t&&t.historicoCompras||[]};t?(this.dataStore.atualizar(`fornecedores`,e,i),A(`Fornecedor atualizado!`,`sucesso`)):(this.dataStore.adicionar(`fornecedores`,i),A(`Fornecedor adicionado!`,`sucesso`)),P(),this.rerenderizar()})}async excluirFornecedor(e){if(!await R(`Excluir este fornecedor?`))return;let t=this.dataStore.buscarPorId(`fornecedores`,e);this.dataStore.remover(`fornecedores`,e);let{dataStore:n}=this;z(`Fornecedor excluído.`,()=>{n.dados.fornecedores.push(t),n.salvar()}),this.rerenderizar()}gerarListaCompras(){let e=this.materiais,t=0;e.forEach(e=>{let n=Number(e.quantidade)||0,r=Number(e.quantidadeMinima)||0;r>0&&n<=r&&e.comprado===void 0&&(this.dataStore.atualizar(`materiais`,e.id,{comprado:!1}),t++)}),A(`${t} item(ns) adicionado(s) à lista de compras!`,`sucesso`),this.rerenderizar()}marcarComprado(e,t){this.dataStore.atualizar(`materiais`,e,{comprado:t}),A(t?`Marcado como comprado!`:`Reaberto na lista.`,`info`),this.rerenderizar()}removerDaLista(e){this.dataStore.atualizar(`materiais`,e,{comprado:void 0}),A(`Item removido da lista.`,`info`),this.rerenderizar()}exportarListaTXT(){let e=this.materiais.filter(e=>e.comprado===!1);if(e.length===0){A(`Lista vazia.`,`aviso`);return}let t=`=== LISTA DE COMPRAS — ATELIER ===
`;t+=`Gerada em: ${new Date().toLocaleDateString(`pt-BR`)}\n\n`;let n=0;e.forEach(e=>{let r=Math.max(1,Math.ceil((Number(e.quantidadeMinima)||0)*2-(Number(e.quantidade)||0))),i=(Number(e.precoUnitario)||0)*r;n+=i,t+=`□ ${e.nome}\n`,t+=`   Qtd: ${r} ${e.unidade||`un`} | Cat: ${this.catLabels[e.categoria]||e.categoria}${e.marca?` | Marca: `+e.marca:``}\n`,t+=`   Est.: ${O(Math.round(i))}\n\n`}),t+=`=== CUSTO TOTAL ESTIMADO: ${O(Math.round(n))} ===\n`;let r=new Blob([t],{type:`text/plain;charset=utf-8`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`lista-compras-${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),A(`Lista exportada em TXT!`,`sucesso`)}},qi=class extends H{constructor(e,t){super(e,t),this.tabAtiva=`contatos`,this.filtroCategoria=``,this.filtroEstagio=``,this.catLabels={galerista:`Galerista`,curador:`Curador`,critico:`Critico`,artista:`Artista`,colecionador:`Colecionador`,fornecedor:`Fornecedor`},this.catIcones={galerista:`🏛️`,curador:`📓`,critico:`✍️`,artista:`🎨`,colecionador:`👤`,fornecedor:`🏪`},this.estagios={novo_contato:`🆕 Novo Contato`,primeira_aproximacao:`🤝 Primeira Aproximacao`,em_conversa:`💬 Em Conversa`,parceria_ativa:`🤲 Parceria Ativa`,colaboracao_consolidada:`🌟 Colaboracao Consolidada`},this.estagiosOrdem=Object.keys(this.estagios),this.tiposInteracao={email:`📧 E-mail`,ligacao:`📞 Ligacao`,reuniao:`🤝 Reuniao`,visita:`🏠 Visita`,evento:`🎪 Evento`},this._d3Initiated=!1}get contatos(){return this.dataStore.listar(`contatosProfissionais`)||[]}get interacoes(){return this.dataStore.listar(`interacoes`)||[]}get eventos(){return this.dataStore.listar(`eventos`)||[]}get clientes(){return G().items}render(){let e=[`contatos`,`pipeline`,`interacoes`,`eventos`,`mapa`],t={contatos:`📋 Contatos`,pipeline:`🔞 Pipeline`,interacoes:`📹 Interacoes`,eventos:`🎪 Eventos`,mapa:`🔺️ Mapa de Influencia`};return`<div><div class="rede-tabs">${e.map(e=>`<button class="tab-btn ${e===this.tabAtiva?`ativo`:``}" data-tab="${e}">${t[e]}</button>`).join(``)}</div><div id="redeContent">${{contatos:()=>this.renderContatos(),pipeline:()=>this.renderPipeline(),interacoes:()=>this.renderInteracoes(),eventos:()=>this.renderEventos(),mapa:()=>this.renderMapa()}[this.tabAtiva]()}</div></div>`}renderContatos(){let e=Object.keys(this.catLabels),t=this.contatos;this.filtroCategoria&&(t=t.filter(e=>e.categoria===this.filtroCategoria)),this.filtroEstagio&&(t=t.filter(e=>e.estagio===this.filtroEstagio));let n=new Date;return`
      <div class="rede-filtros">
        <select id="filtroCatRede"><option value="">📊 Todos os contatos</option>${e.map(e=>`<option value="${e}" ${this.filtroCategoria===e?`selected`:``}>${this.catIcones[e]} ${this.catLabels[e]}</option>`).join(``)}</select>
        <select id="filtroEstagioRede"><option value="">🔞 Todos os estagios</option>${this.estagiosOrdem.map(e=>`<option value="${e}" ${this.filtroEstagio===e?`selected`:``}>${this.estagios[e]}</option>`).join(``)}</select>
        <button class="btn-primario" id="btnNovoContato" style="font-size:0.8rem;padding:6px 14px;">✨ Novo Contato</button>
        <span style="font-size:0.8rem;color:var(--text-muted);margin-left:auto;">${t.length} contato(s)</span>
      </div>
      <div class="cont-grid">${t.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum contato encontrado.</p>`:``}${t.map(e=>this.renderCardContato(e,n)).join(``)}</div>`}renderCardContato(e,t){let n=e.categoria||`outros`,r=e.ultimoContato?Math.floor((t-new Date(e.ultimoContato))/864e5):null,i=r!==null&&r>30?r>90?`urgente`:`follow-up`:null,a=r!==null&&r>30?`⚠️ ${r} dias sem contato`:``;return`
      <div class="cont-card" style="border-left-color:var(--accent)">
        ${e.vip?`<span class="cont-vip">👑 VIP</span>`:``}
        <div class="cont-nome">${this.catIcones[n]||`📋`} ${e.nome||``}</div>
        <span class="cont-cat-tag ${n}">${this.catLabels[n]||n}</span>
        ${e.nivelRelacionamento?`<span class="cont-estrelas" style="margin-left:6px;">${`★`.repeat(Math.min(5,Number(e.nivelRelacionamento)))}${`☆`.repeat(Math.max(0,5-Number(e.nivelRelacionamento)))}</span>`:``}
        <div class="cont-inst">${e.instituicao||``}${e.cargo?` · `+e.cargo:``}</div>
        <div class="cont-contato">${e.contato||``}${e.email?` · `+e.email:``}${e.redes?`<br>🖐 `+e.redes:``}</div>
        ${e.comoConheceu?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">🤝 ${e.comoConheceu}</div>`:``}
        ${e.notas?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>`:``}
        ${e.estagio?`<div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">${this.estagios[e.estagio]||e.estagio}</div>`:``}
        ${i?`<div class="cont-alerta ${i}">${a}</div>`:``}
        ${e.proximoPasso?`<div class="cont-passos">🎯 ${e.proximoPasso}</div>`:``}
        <div class="cont-acoes"><button data-acao="editarContato" data-id="${e.id}">✏️ Editar</button><button data-acao="interagirContato" data-id="${e.id}">💬 Interagir</button><button data-acao="excluirContato" data-id="${e.id}" style="color:#dc2626;" aria-label="Excluir contato">🗑️</button></div>
      </div>`}renderPipeline(){let e=this.contatos,t=new Date,n={};return this.estagiosOrdem.forEach(t=>{n[t]=e.filter(e=>e.estagio===t)}),`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span style="font-size:0.9rem;color:var(--text-muted);">Arraste os cards entre os estagios (use os botoes ◀ ▶)</span><span style="font-size:0.8rem;color:var(--text-muted);">${e.length} contato(s)</span></div>
      <div class="pipeline">${this.estagiosOrdem.map(e=>`
        <div class="coluna-pipe" data-estagio="${e}">
          <div class="pipe-titulo"><span>${this.estagios[e]}</span><span>${n[e]?.length||0}</span></div>
          ${(n[e]||[]).map(e=>{let n=e.ultimoContato?Math.floor((t-new Date(e.ultimoContato))/864e5):null;return`<div class="pipe-card" data-id="${e.id}">
              <div class="pipe-nome">${this.catIcones[e.categoria]||`📋`} ${e.nome}</div>
              <div class="pipe-cat">${this.catLabels[e.categoria]||e.categoria}</div>
              ${n===null?``:`<div class="pipe-dias">${n>30?`⚠️ `+n+` dias`:`✅ `+n+` dias`}</div>`}
              <div style="display:flex;gap:4px;margin-top:6px;">
                <button data-acao="pipeMovEsq" data-id="${e.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);cursor:pointer;" aria-label="Mover para esquerda">◀</button>
                <button data-acao="pipeMovDir" data-id="${e.id}" style="font-size:0.7rem;padding:2px 6px;border:1px solid var(--border);background:var(--bg);cursor:pointer;" aria-label="Mover para direita">▶</button>
              </div>
            </div>`}).join(``)}
        </div>`).join(``)}</div>`}moverPipeline(e,t){let n=this.dataStore.buscarPorId(`contatosProfissionais`,e);if(!n)return;let r=this.estagiosOrdem.indexOf(n.estagio||`novo_contato`),i=Math.max(0,Math.min(this.estagiosOrdem.length-1,r+t));i!==r&&(this.dataStore.atualizar(`contatosProfissionais`,e,{estagio:this.estagiosOrdem[i]}),this.rerenderizar())}renderInteracoes(){let e=this.contatos;this.interacoes;let t=this._selContatoInteracao||``;return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <select class="sel-interacao-contato" id="selInteracaoContato">
          <option value="">— Todos os contatos —</option>
          ${e.map(e=>`<option value="${e.id}" ${t===e.id?`selected`:``}>${this.catIcones[e.categoria]||`📋`} ${e.nome}</option>`).join(``)}
        </select>
        <button class="btn-primario" id="btnNovaInteracao" style="font-size:0.8rem;padding:6px 14px;">✨ Nova Interacao</button>
      </div>
      ${t?this.renderTimelineContato(t):`<p style="color:var(--text-muted);font-size:0.85rem;">Selecione um contato para ver o historico de interacoes.</p>`}`}renderTimelineContato(e){let t=this.dataStore.buscarPorId(`contatosProfissionais`,e),n=this.interacoes.filter(t=>t.contatoId===e).sort((e,t)=>new Date(t.data||0)-new Date(e.data||0));return t?`
      <div style="margin-bottom:12px;font-size:0.9rem;font-weight:600;color:var(--text);">${this.catIcones[t.categoria]||`📋`} ${t.nome} — ${n.length} interacao(oes)</div>
      ${n.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhuma interacao registrada.</p>`:`
      <div class="timeline">${n.map(e=>`
        <div class="tl-item">
          <div class="tl-tipo">${this.tiposInteracao[e.tipo]||e.tipo} · ${e.data||``}</div>
          <div class="tl-resumo">${e.resumo||``}</div>
          ${e.sentimento?`<span class="tl-sentimento ${e.sentimento}">${e.sentimento===`positivo`?`😊`:e.sentimento===`neutro`?`😐`:`😟`} ${e.sentimento}</span>`:``}
          ${e.followUp?`<span style="font-size:0.7rem;color:#92400e;margin-left:6px;">🔝 Follow-up: ${e.followUpNotas||`pendente`}</span>`:``}
          <div class="tl-data">${e.anexos&&e.anexos.length>0?`📎 `+e.anexos.length+` anexo(s)`:``}</div>
        </div>`).join(``)}</div>`}`:`<p style="color:var(--text-muted);">Contato nao encontrado.</p>`}renderEventos(){let e=this.eventos,t={pesquisando:`🔍 Pesquisando`,inscrito:`📝 Inscrito`,selecionado:`✅ Selecionado`,participando:`🎯 Participando`,finalizado:`🏁 Finalizado`},n={bienal:`Bienal`,feira:`Feira`,mostra:`Mostra`,edital:`Edital`,premio:`Premio`};return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <button class="btn-primario" id="btnNovoEvento" style="font-size:0.8rem;padding:6px 14px;">✨ Novo Evento</button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${e.length} evento(s)</span>
      </div>
      <div class="evt-grid">${e.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum evento cadastrado.</p>`:``}${e.map(e=>{let r=(e.obrasEnviadas||[]).map(e=>{let t=W().items.find(t=>t.id===e);return t?t.titulo:null}).filter(Boolean);return`<div class="evt-card">
          <span class="evt-tipo-tag ${e.tipo||`mostra`}">${n[e.tipo]||e.tipo}</span>
          <div class="evt-nome" style="margin-top:4px;">${e.nome}</div>
          <div class="evt-status ${e.status||`pesquisando`}">${t[e.status]||e.status}</div>
          <div class="evt-info">${e.dataEvento?`📅 `+e.dataEvento:``}${e.dataInscricao?` · Inscricao: `+e.dataInscricao:``}${e.investimento?`<br>💰 R$ `+Number(e.investimento).toFixed(2):``}${e.retorno&&Number(e.retorno)>0?` · Retorno: R$ `+Number(e.retorno).toFixed(2):``}</div>
          ${e.notas?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📝 ${e.notas}</div>`:``}
          ${r.length>0?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">🖼️ Obras: ${r.join(`, `)}</div>`:``}
          ${e.documentacao&&e.documentacao.length>0?`<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">📞 Docs: ${e.documentacao.join(`, `)}</div>`:``}
          ${e.resultado?`<div style="font-size:0.8rem;color:var(--text);margin-top:6px;">🏆 ${e.resultado}</div>`:``}
          <div class="evt-acoes"><button data-acao="editarEvento" data-id="${e.id}">✏️ Editar</button><button data-acao="excluirEvento" data-id="${e.id}" style="color:#dc2626;" aria-label="Excluir evento">🗑️</button></div>
        </div>`}).join(``)}</div>`}renderMapa(){return this.contatos.length===0?`<p style="color:var(--text-muted);font-size:0.85rem;">Adicione contatos para ver o mapa.</p>`:`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:0.85rem;color:var(--text-muted);">Tamanho = nivel de relacionamento · Cores por categoria · Arraste nos</span>
        <button class="btn-primario" id="btnExportarRedePDF" style="font-size:0.8rem;padding:6px 14px;">📞 Exportar Relatorio PDF</button>
      </div>
      <div class="mapa-container" id="d3MapaContainer">
        <svg id="d3MapaSVG"></svg>
      </div>
      <div id="d3MapaHubs" style="margin-top:12px;font-size:0.85rem;color:var(--text-muted);"></div>`}aposRenderizar(){this.removerListeners(),document.querySelectorAll(`.tab-btn[data-tab]`).forEach(e=>{let t=()=>{this.tabAtiva=e.dataset.tab,this.rerenderizar()};e.addEventListener(`click`,t),this._bindCache[`tab_`+e.dataset.tab]={el:e,handler:t,type:`click`}});let e=document.getElementById(`filtroCatRede`);if(e){let t=()=>{this.filtroCategoria=e.value,this.rerenderizar()};e.addEventListener(`change`,t),this._bindCache.filtroCatRede={el:e,handler:t,type:`change`}}let t=document.getElementById(`filtroEstagioRede`);if(t){let e=()=>{this.filtroEstagio=t.value,this.rerenderizar()};t.addEventListener(`change`,e),this._bindCache.filtroEstagioRede={el:t,handler:e,type:`change`}}document.getElementById(`btnNovoContato`)?.addEventListener(`click`,()=>this.abrirFormContato()),document.getElementById(`btnNovaInteracao`)?.addEventListener(`click`,()=>this.abrirFormInteracao()),document.getElementById(`btnNovoEvento`)?.addEventListener(`click`,()=>this.abrirFormEvento());let n=document.getElementById(`selInteracaoContato`);if(n){let e=()=>{this._selContatoInteracao=n.value,this.rerenderizar()};n.addEventListener(`change`,e),this._bindCache.selInteracaoContato={el:n,handler:e,type:`change`}}document.getElementById(`btnExportarRedePDF`)?.addEventListener(`click`,()=>this.exportarRelatorioPDF());let r=document.getElementById(`redeContent`)||document.getElementById(`viewPrincipal`);if(r){let e=e=>{let t=e.target.closest(`[data-acao]`);if(!t)return;let n=t.dataset.acao,r=t.dataset.id;n===`editarContato`?this.abrirFormContato(r):n===`excluirContato`?this.excluirContato(r):n===`interagirContato`?(this._selContatoInteracao=r,this.tabAtiva=`interacoes`,this.rerenderizar(),setTimeout(()=>this.abrirFormInteracao(r),100)):n===`pipeMovEsq`?this.moverPipeline(r,-1):n===`pipeMovDir`?this.moverPipeline(r,1):n===`editarEvento`?this.abrirFormEvento(r):n===`excluirEvento`&&this.excluirEvento(r)};r.addEventListener(`click`,e),this._bindCache.delegatedRede={el:r,handler:e,type:`click`}}if(this.tabAtiva===`mapa`&&this.contatos.length>0){let e=document.getElementById(`d3MapaContainer`);typeof d3>`u`?(e&&(e.innerHTML=`<div class="skeleton skeleton-quadro" style="height:400px"></div>`),Rr().then(()=>{e&&(e.innerHTML=`<svg id="d3MapaSVG"></svg>`),this.iniciarMapaD3()}).catch(()=>{})):setTimeout(()=>this.iniciarMapaD3(),50)}this.verificarLembretes()}iniciarMapaD3(){if(typeof d3>`u`)return;let e=document.getElementById(`d3MapaContainer`),t=document.getElementById(`d3MapaSVG`),n=document.getElementById(`d3MapaHubs`);if(!e||!t)return;let r=this.contatos,i={galerista:`#3b82f6`,curador:`#10b981`,critico:`#f59e0b`,artista:`#6366f1`,colecionador:`#ec4899`,fornecedor:`#0ea5e9`},a=r.map(e=>({...e,r:10+(e.nivelRelacionamento||1)/5*25})),o=[];for(let e=0;e<a.length;e++)for(let t=e+1;t<a.length;t++){let n=a[e],r=a[t];n.instituicao&&r.instituicao&&n.instituicao===r.instituicao?o.push({source:e,target:t,strength:.3}):n.comoConheceu&&r.comoConheceu&&(n.comoConheceu.toLowerCase().includes((r.nome||``).toLowerCase().slice(0,5))||r.comoConheceu.toLowerCase().includes((n.nome||``).toLowerCase().slice(0,5)))&&o.push({source:e,target:t,strength:.2})}let s=e.clientWidth||700,c=e.clientHeight||400,l=d3.select(t).attr(`viewBox`,`0 0 ${s} ${c}`).style(`width`,`100%`).style(`height`,`100%`);l.selectAll(`*`).remove();let u=l.append(`g`),d=d3.zoom().scaleExtent([.3,3]).on(`zoom`,e=>{u.attr(`transform`,e.transform)});l.call(d);let f=d3.forceSimulation(a).force(`link`,d3.forceLink(o).id((e,t)=>t).distance(100)).force(`charge`,d3.forceManyBody().strength(-300)).force(`center`,d3.forceCenter(s/2,c/2)).force(`collide`,d3.forceCollide().radius(e=>e.r+10)),p=u.append(`g`).selectAll(`line`).data(o).join(`line`).attr(`stroke`,`var(--border)`).attr(`stroke-width`,1.5).attr(`stroke-dasharray`,`4,4`),m=u.append(`g`).selectAll(`g`).data(a).join(`g`).call(d3.drag().on(`start`,(e,t)=>{e.active||f.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y}).on(`drag`,(e,t)=>{t.fx=e.x,t.fy=e.y}).on(`end`,(e,t)=>{e.active||f.alphaTarget(0),t.fx=null,t.fy=null}));m.append(`circle`).attr(`r`,e=>e.r).attr(`fill`,e=>i[e.categoria]||`#6b7280`).attr(`opacity`,.8).attr(`stroke`,`#fff`).attr(`stroke-width`,2).style(`cursor`,`pointer`),m.append(`text`).text(e=>(e.nome||`?`).slice(0,2)).attr(`text-anchor`,`middle`).attr(`dy`,`0.35em`).attr(`fill`,`#fff`).attr(`font-size`,e=>e.r>20?9:6).attr(`font-weight`,`600`).style(`pointer-events`,`none`),m.append(`text`).text(e=>(e.nome||``).length>18?(e.nome||``).slice(0,16)+`...`:e.nome||``).attr(`text-anchor`,`middle`).attr(`dy`,e=>e.r+14).attr(`fill`,`var(--text-muted)`).attr(`font-size`,9).style(`pointer-events`,`none`),m.on(`click`,(e,t)=>{t.id&&(this._selContatoInteracao=t.id,this.tabAtiva=`interacoes`,this.rerenderizar())}),m.append(`title`).text(e=>`${e.nome||`Sem nome`}\n${this.catLabels[e.categoria]||e.categoria||``}${e.instituicao?`
`+e.instituicao:``}${e.nivelRelacionamento?`
Relacionamento: `+`★`.repeat(e.nivelRelacionamento):``}`),f.on(`tick`,()=>{p.attr(`x1`,e=>e.source.x).attr(`y1`,e=>e.source.y).attr(`x2`,e=>e.target.x).attr(`y2`,e=>e.target.y),m.attr(`transform`,e=>`translate(${e.x},${e.y})`)}),setTimeout(()=>{let e={};o.forEach(t=>{let n=typeof t.source==`object`?t.source.id||t.source.nome:null,r=typeof t.target==`object`?t.target.id||t.target.nome:null;n&&(e[n]=(e[n]||0)+1),r&&(e[r]=(e[r]||0)+1)});let t=a.filter(t=>e[t.id||t.nome]>0).sort((t,n)=>(e[n.id||n.nome]||0)-(e[t.id||t.nome]||0)).slice(0,3).map(e=>`<strong>${e.nome}</strong>`).join(`, `);n&&(n.innerHTML=t?`💡 Contatos que mais conectam (hubs): ${t}`:`💡 Nenhum hub identificado.`)},2e3)}abrirFormContato(e=null){let t=e?this.dataStore.buscarPorId(`contatosProfissionais`,e):null,n=Object.keys(this.catLabels).map(e=>`<option value="${e}" ${t&&t.categoria===e?`selected`:``}>${this.catIcones[e]} ${this.catLabels[e]}</option>`).join(``),r=this.estagiosOrdem.map(e=>`<option value="${e}" ${t&&t.estagio===e?`selected`:``}>${this.estagios[e]}</option>`).join(``);N(`<h3>${t?`✏️ Editar`:`✨ Novo`} Contato Profissional</h3>
      <form id="formModal" style="display:grid;gap:10px;"><div class="modal-form-grid">
        <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Nome *</label><input type="text" id="fContNome" value="${t&&t.nome||``}" required aria-label="Nome" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);box-sizing:border-box;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Categoria</label><select id="fContCat" aria-label="Categoria" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;">${n}</select></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Estagio</label><select id="fContEstagio" aria-label="Estágio" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;">${r}</select></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Instituicao</label><input type="text" id="fContInst" value="${t&&t.instituicao||``}" aria-label="Instituição" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Cargo</label><input type="text" id="fContCargo" value="${t&&t.cargo||``}" aria-label="Cargo" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Contato</label><input type="text" id="fContTel" value="${t&&t.contato||``}" aria-label="Contato" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">E-mail</label><input type="email" id="fContEmail" value="${t&&t.email||``}" aria-label="E-mail" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Redes sociais</label><input type="text" id="fContRedes" value="${t&&t.redes||``}" aria-label="Redes sociais" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Relacionamento (1-5)</label><input type="number" id="fContNivel" value="${t&&t.nivelRelacionamento||0}" min="1" max="5" aria-label="Relacionamento" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Como conheceu</label><input type="text" id="fContConheceu" value="${t&&t.comoConheceu||``}" aria-label="Como conheceu" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Ultimo contato</label><input type="date" id="fContUltimo" value="${t&&t.ultimoContato||``}" aria-label="Último contato" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.8rem;color:var(--text-muted);">Proximo passo</label><input type="text" id="fContPasso" value="${t&&t.proximoPasso||``}" aria-label="Próximo passo" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="campo-full"><label><input type="checkbox" id="fContVip" ${t&&t.vip?`checked`:``} aria-label="Contato VIP"> 👑 Contato VIP (colecionador)</label></div>
        <div class="campo-full"><label style="font-size:0.8rem;color:var(--text-muted);">Notas</label><textarea id="fContNotas" aria-label="Notas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${t&&t.notas||``}</textarea></div>
      </div><div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,n=>{n.preventDefault();let r=document.getElementById(`fContNome`).value.trim();if(!r){A(`Nome obrigatorio.`,`aviso`);return}let i={nome:r,categoria:document.getElementById(`fContCat`).value,estagio:document.getElementById(`fContEstagio`).value,instituicao:document.getElementById(`fContInst`).value.trim(),cargo:document.getElementById(`fContCargo`).value.trim(),contato:document.getElementById(`fContTel`).value.trim(),email:document.getElementById(`fContEmail`).value.trim(),redes:document.getElementById(`fContRedes`).value.trim(),nivelRelacionamento:Number(document.getElementById(`fContNivel`).value)||0,comoConheceu:document.getElementById(`fContConheceu`).value.trim(),ultimoContato:document.getElementById(`fContUltimo`).value,proximoPasso:document.getElementById(`fContPasso`).value.trim(),vip:document.getElementById(`fContVip`).checked,notas:document.getElementById(`fContNotas`).value.trim()};t?(this.dataStore.atualizar(`contatosProfissionais`,e,i),A(`Contato atualizado!`,`sucesso`)):(this.dataStore.adicionar(`contatosProfissionais`,i),A(`Contato adicionado!`,`sucesso`)),P(),this.rerenderizar()})}async excluirContato(e){if(!await R(`Excluir este contato?`))return;let t=this.dataStore.buscarPorId(`contatosProfissionais`,e);this.dataStore.remover(`contatosProfissionais`,e);let n=this.dataStore;z(`Contato excluido.`,()=>{n.dados.contatosProfissionais.push(t),n.salvar()}),this.rerenderizar()}abrirFormInteracao(e=null){let t=this.contatos,n=e||this._selContatoInteracao||``,r=Object.entries(this.tiposInteracao).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``);N(`<h3>✨ Nova Interacao</h3>
      <form id="formModal"><div class="campo-form"><label>Contato</label><select id="fIntContato" aria-label="Contato">${t.map(e=>`<option value="${e.id}" ${e.id===n?`selected`:``}>${this.catIcones[e.categoria]||`📋`} ${e.nome}</option>`).join(``)}</select></div>
      <div class="campo-form"><label>Tipo</label><select id="fIntTipo" aria-label="Tipo">${r}</select></div>
      <div class="campo-form"><label>Data</label><input type="date" id="fIntData" aria-label="Data" value="${new Date().toISOString().slice(0,10)}"></div>
      <div class="campo-form"><label>Resumo</label><textarea id="fIntResumo" aria-label="Resumo" placeholder="Descreva a interacao..."></textarea></div>
      <div class="campo-form"><label>Sentimento</label><select id="fIntSentimento" aria-label="Sentimento"><option value="positivo">😊 Positivo</option><option value="neutro">😐 Neutro</option><option value="negativo">😟 Negativo</option></select></div>
      <div class="campo-form"><label><input type="checkbox" id="fIntFollowUp" aria-label="Necessita follow-up"> 🔝 Necessita follow-up</label></div>
      <div class="campo-form" id="divFollowUpNotas" style="display:none;"><label>Notas do follow-up</label><textarea id="fIntFollowNotas" aria-label="Notas do follow-up" placeholder="O que fazer?"></textarea></div>
      <div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`),document.getElementById(`fIntFollowUp`)?.addEventListener(`change`,()=>{document.getElementById(`divFollowUpNotas`).style.display=document.getElementById(`fIntFollowUp`).checked?`block`:`none`}),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,e=>{e.preventDefault(),this.dataStore.adicionar(`interacoes`,{contatoId:document.getElementById(`fIntContato`).value,tipo:document.getElementById(`fIntTipo`).value,data:document.getElementById(`fIntData`).value,resumo:document.getElementById(`fIntResumo`).value.trim(),sentimento:document.getElementById(`fIntSentimento`).value,followUp:document.getElementById(`fIntFollowUp`).checked,followUpNotas:document.getElementById(`fIntFollowNotas`).value.trim(),anexos:[]}),this.dataStore.atualizar(`contatosProfissionais`,document.getElementById(`fIntContato`).value,{ultimoContato:document.getElementById(`fIntData`).value}),P(),A(`Interacao registrada!`,`sucesso`),this.rerenderizar(),this.solicitarNotificacao(`Interacao registrada`,`Nao se esqueca do follow-up!`)})}abrirFormEvento(e=null){let t=e?this.dataStore.buscarPorId(`eventos`,e):null,n=[`pesquisando`,`inscrito`,`selecionado`,`participando`,`finalizado`].map(e=>`<option value="${e}" ${t&&t.status===e?`selected`:``}>${e}</option>`).join(``),r=[`bienal`,`feira`,`mostra`,`edital`,`premio`].map(e=>`<option value="${e}" ${t&&t.tipo===e?`selected`:``}>${e}</option>`).join(``),i=(this.obras||W().items).map(e=>`<option value="${e.id}">${e.titulo||`Sem titulo`}</option>`).join(``);N(`<h3>${t?`✏️ Editar`:`✨ Novo`} Evento</h3>
      <form id="formModal"><div class="modal-form-grid">
        <div class="campo-full"><input type="text" id="fEvtNome" value="${t&&t.nome||``}" required aria-label="Nome do evento" placeholder="Nome do evento" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><select id="fEvtTipo" aria-label="Tipo do evento">${r}</select></div>
        <div><select id="fEvtStatus" aria-label="Status do evento">${n}</select></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Inscricao</label><input type="date" id="fEvtDataIns" value="${t&&t.dataInscricao||``}" aria-label="Data de inscrição" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Evento</label><input type="date" id="fEvtDataEvt" value="${t&&t.dataEvento||``}" aria-label="Data do evento" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Investimento (R$)</label><input type="number" id="fEvtInvest" value="${t&&t.investimento||0}" aria-label="Investimento" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Retorno (R$)</label><input type="number" id="fEvtRetorno" value="${t&&t.retorno||0}" aria-label="Retorno" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Resultado</label><input type="text" id="fEvtResultado" value="${t&&t.resultado||``}" aria-label="Resultado" placeholder="Ex.: Premiado, selecionado..." style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Documentacao</label><input type="text" id="fEvtDocs" value="${t&&t.documentacao?t.documentacao.join(`, `):``}" aria-label="Documentação" placeholder="docs separados por virgula" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;"></div>
        <div><label style="font-size:0.75rem;color:var(--text-muted);">Obras enviadas</label><select multiple id="fEvtObras" aria-label="Obras enviadas" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;min-height:60px;">${i}</select></div>
        <div class="campo-full"><textarea id="fEvtNotas" aria-label="Notas" placeholder="Notas..." style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${t&&t.notas||``}</textarea></div>
      </div><div class="modal-acoes"><button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button><button type="submit" class="btn-primario">Salvar</button></div></form>`),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,n=>{n.preventDefault();let r=document.getElementById(`fEvtObras`),i=r?Array.from(r.selectedOptions).map(e=>e.value):[],a=document.getElementById(`fEvtDocs`).value.split(`,`).map(e=>e.trim()).filter(Boolean),o={nome:document.getElementById(`fEvtNome`).value.trim(),tipo:document.getElementById(`fEvtTipo`).value,status:document.getElementById(`fEvtStatus`).value,dataInscricao:document.getElementById(`fEvtDataIns`).value,dataEvento:document.getElementById(`fEvtDataEvt`).value,investimento:Number(document.getElementById(`fEvtInvest`).value)||0,retorno:Number(document.getElementById(`fEvtRetorno`).value)||0,resultado:document.getElementById(`fEvtResultado`).value.trim(),documentacao:a,obrasEnviadas:i,notas:document.getElementById(`fEvtNotas`).value.trim()};if(!o.nome){A(`Nome obrigatorio.`,`aviso`);return}t?(this.dataStore.atualizar(`eventos`,e,o),A(`Evento atualizado!`,`sucesso`)):(this.dataStore.adicionar(`eventos`,o),A(`Evento adicionado!`,`sucesso`)),P(),this.rerenderizar()})}async excluirEvento(e){if(!await R(`Excluir este evento?`))return;let t=this.dataStore.buscarPorId(`eventos`,e);this.dataStore.remover(`eventos`,e);let n=this.dataStore;z(`Evento excluido.`,()=>{n.dados.eventos.push(t),n.salvar()}),this.rerenderizar()}verificarLembretes(){let e=new Date,t=this.contatos,n=[];t.forEach(t=>{if(!t.ultimoContato)return;let r=Math.floor((e-new Date(t.ultimoContato))/864e5);r>60&&n.push({nome:t.nome,dias:r,passo:t.proximoPasso||`revisar relacionamento`})}),n.length>0&&`Notification`in window&&Notification.permission===`granted`&&n.slice(0,3).forEach(e=>{try{new Notification(`🔝 Rede Profissional`,{body:`Voce nao contata ${e.nome} ha ${e.dias} dias. Sugestao: ${e.passo}`})}catch(e){console.warn(e)}})}solicitarNotificacao(e,t){if(!(!(`Notification`in window)||Notification.permission===`denied`))if(Notification.permission===`granted`)try{new Notification(e,{body:t})}catch(e){console.warn(e)}else Notification.requestPermission()}exportarRelatorioPDF(){if(window.jspdf===void 0&&typeof jspdf>`u`||!window.jspdf?.jsPDF){A(`jsPDF nao carregado.`,`erro`);return}j(`Gerando relatorio de networking...`);let{jsPDF:e}=window.jspdf,t=new e({orientation:`portrait`,unit:`mm`,format:`a4`}),n=this.contatos,r=this.eventos,i=20;t.setFont(`helvetica`,`bold`),t.setFontSize(14),t.text(`Relatorio de Networking`,20,i),i+=7,t.setFont(`helvetica`,`normal`),t.setFontSize(9),t.text(`Gerado em: ${new Date().toLocaleDateString(`pt-BR`)}`,20,i),i+=5,t.setDrawColor(200),t.line(20,i,190,i),i+=7,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Contatos (`+n.length+`)`,20,i),i+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8),n.forEach(e=>{i>270&&(t.addPage(),i=20),t.text(`${e.nome||``} — ${e.instituicao||``} (${e.categoria||``}) ${e.nivelRelacionamento?`★`.repeat(e.nivelRelacionamento):``}`,20,i),i+=4,e.proximoPasso&&(t.text(`  → Proximo passo: ${e.proximoPasso}`,24,i),i+=4)}),i+=5,t.setDrawColor(200),t.line(20,i,190,i),i+=7,t.setFont(`helvetica`,`bold`),t.setFontSize(11),t.text(`Eventos (`+r.length+`)`,20,i),i+=6,t.setFont(`helvetica`,`normal`),t.setFontSize(8),r.forEach(e=>{i>270&&(t.addPage(),i=20),t.text(`${e.nome||``} — ${e.tipo||``} (${e.status||``}) ${e.dataEvento?`· `+e.dataEvento:``}`,20,i),i+=4}),t.save(`relatorio-networking.pdf`),M(),A(`Relatorio exportado em PDF!`,`sucesso`)}},Ji=class extends H{constructor(e,t){super(e,t),this.tabAtiva=`entradas`,this.calData=new Date,this.calVisao=`mensal`,this._filtroObraProc=``,this._entradaEditando=null,this._fotosTemporarias=[],this._selHumor=0,this.humorEmojis={1:`😫`,2:`😕`,3:`😐`,4:`🙂`,5:`🤩`},this.humorLabels={1:`Terrível`,2:`Difícil`,3:`Neutro`,4:`Bom`,5:`Excelente`},this.tipoAtividade={pintura:`#3b82f6`,escultura:`#8b5cf6`,admin:`#f59e0b`,descanso:`#10b981`},this.etapasPadrao=[`Sketch inicial`,`Estudo de cor`,`Primeira camada`,`Camadas intermediárias`,`Detalhamento`,`Finalização`,`Verniz`],this.citacoes=[{texto:`A arte é a mentira que nos permite conhecer a verdade.`,autor:`Pablo Picasso`},{texto:`Não há nada mais artístico do que amar as pessoas.`,autor:`Vincent van Gogh`},{texto:`A criatividade é a inteligência se divertindo.`,autor:`Albert Einstein`},{texto:`A pintura é poesia silenciosa.`,autor:`Plutarco`},{texto:`A arte lava da alma a poeira do cotidiano.`,autor:`Pablo Picasso`},{texto:`Eu sonho minha pintura e pinto meu sonho.`,autor:`Vincent van Gogh`},{texto:`A cor é o teclado, os olhos são os martelos, a alma é o piano com muitas cordas.`,autor:`Wassily Kandinsky`},{texto:`O artista não é nada sem o dom, mas o dom não é nada sem o trabalho.`,autor:`Émile Zola`},{texto:`A arte não reproduz o visível, ela torna visível.`,autor:`Paul Klee`},{texto:`Comece onde você está. Use o que você tem. Faça o que você pode.`,autor:`Arthur Ashe`},{texto:`A perfeição não é quando não há mais nada a acrescentar, mas quando não há mais nada a retirar.`,autor:`Antoine de Saint-Exupéry`},{texto:`A arte é a expressão dos mais profundos pensamentos pelo caminho mais simples.`,autor:`Albert Einstein`},{texto:`Toda criança é artista. O problema é como permanecer artista depois de crescer.`,autor:`Pablo Picasso`},{texto:`A criatividade é contaminante. Passe adiante.`,autor:`Albert Einstein`},{texto:`A simplicidade é o último grau da sofisticação.`,autor:`Leonardo da Vinci`},{texto:`A arte deve confortar os perturbados e perturbar os confortáveis.`,autor:`Banksy`},{texto:`O propósito da arte é lavar a poeira da vida cotidiana de nossas almas.`,autor:`Pablo Picasso`},{texto:`A inspiração existe, mas precisa te encontrar trabalhando.`,autor:`Pablo Picasso`},{texto:`Grandes coisas são feitas por uma série de pequenas coisas reunidas.`,autor:`Vincent van Gogh`},{texto:`A arte não é um artesanato, é a transmissão de uma emoção que o artista experimentou.`,autor:`Leonardo da Vinci`},{texto:`Pinte como se você nunca tivesse medo de errar.`,autor:`Bob Ross`},{texto:`Não há erro na arte, apenas oportunidades.`,autor:`Bob Ross`},{texto:`A arte é a assinatura da civilização.`,autor:`Beverly Sills`},{texto:`O mundo real é apenas um, mas a arte pode criar muitos mundos.`,autor:`Frida Kahlo`},{texto:`Pinto autorretratos porque estou sempre disponível.`,autor:`Frida Kahlo`},{texto:`A arte é a mais bela das mentiras.`,autor:`Claude Debussy`},{texto:`Nuances, nuances, sempre nuances!`,autor:`Eugène Delacroix`},{texto:`O olhar do pintor só se completa no olhar do espectador.`,autor:`Marcel Duchamp`},{texto:`A forma segue a intuição.`,autor:`Joan Miró`},{texto:`Não pinte o que vê, pinte o que sente.`,autor:`Henri Matisse`},{texto:`A cor é um poder que influencia diretamente a alma.`,autor:`Wassily Kandinsky`},{texto:`A arte não é o que você vê, mas o que você faz os outros verem.`,autor:`Edgar Degas`},{texto:`Primeiro aprenda as regras como um profissional, depois quebre-as como um artista.`,autor:`Pablo Picasso`},{texto:`A luz não está na tela, está no olho de quem vê.`,autor:`Claude Monet`},{texto:`O importante é a emoção, não a técnica.`,autor:`Vincent van Gogh`},{texto:`Eu procuro nas cores uma vibração que não precise de explicação.`,autor:`Paul Cézanne`},{texto:`O desenho é a honestidade da arte.`,autor:`Jean-Auguste-Dominique Ingres`},{texto:`A arte é feita para incomodar. A ciência para tranquilizar.`,autor:`Georges Braque`},{texto:`A única tradição verdadeira é a da inovação.`,autor:`Piet Mondrian`},{texto:`Menos é mais.`,autor:`Ludwig Mies van der Rohe`},{texto:`A arte é o prazer de um espírito que penetra na natureza.`,autor:`Auguste Renoir`},{texto:`O segredo da arte é o amor.`,autor:`Camille Pissarro`},{texto:`Sem emoção, não há arte.`,autor:`Wassily Kandinsky`},{texto:`A arte é uma mentira que nos faz perceber a verdade.`,autor:`Pablo Picasso`},{texto:`O importante é fazer da arte um ato de amor.`,autor:`Frida Kahlo`},{texto:`Pinte a luz, não a coisa.`,autor:`Claude Monet`},{texto:`A arte é a mais intensa forma de individualismo que o mundo conhece.`,autor:`Oscar Wilde`},{texto:`O talento é a capacidade de fazer um esforço que vale a pena.`,autor:`Francisco de Goya`},{texto:`As cores são as ação da luz, ação e paixões.`,autor:`Johann Wolfgang von Goethe`},{texto:`O olho é a janela da alma e o pincel é a sua voz.`,autor:`Leonardo da Vinci`}],this.promptsDiarios=[`Experimente uma paleta restrita de apenas 3 cores hoje.`,`Desenhe algo que você ama usando apenas a mão não-dominante.`,`Pinte o mesmo objeto em 3 humores diferentes.`,`Crie uma textura usando materiais não convencionais (café, areia, tecido).`,`Faça um estudo de luz com apenas preto e branco.`,`Pegue uma obra inacabada e finalize em 30 minutos.`,`Crie um gradiente de 10 tons entre duas cores complementares.`,`Desenhe de memória um lugar que você visitou há muito tempo.`,`Use uma espátula em vez de pincel o dia todo.`,`Pinte ao ar livre por pelo menos 1 hora.`,`Escolha uma cor que você evita e crie algo só com ela.`,`Faça 10 miniaturas de composição antes de começar a obra do dia.`,`Releia um esboço antigo e dê uma nova versão.`,`Misture técnica: use aquarela com toques de óleo.`,`Observe uma sombra por 5 minutos e pinte apenas ela.`,`Crie uma paleta inspirada em uma fotografia que você ama.`,`Trabalhe apenas com tons pastéis hoje.`,`Desafio monocromático: pinte usando um único pigmento.`,`Faça um autorretrato emocional (como você se sente agora).`,`Use uma paleta de cores que você nunca usou antes.`,`Pinte uma memória de infância em 20 minutos.`,`Copie um mestre para aprender sua técnica de pincelada.`,`Crie uma série de 3 obras que contem uma história.`,`Pinte com os olhos fechados e veja o que surge.`,`Use um pincel diferente do habitual para cada etapa.`,`Adicione douramento ou folha de ouro a uma obra existente.`,`Crie um estudo de mãos hoje.`,`Faça uma pintura gestual em menos de 10 minutos.`,`Transforme um erro em destaque criativo intencional.`,`Pinte o mesmo tema em dois estilos completamente diferentes.`],this.desafiosSemanais=[`Série relâmpago: 7 pinturas em 7 dias sobre o mesmo tema.`,`Semana do preto e branco: apenas tons neutros por 7 dias.`,`Desafio da transparência: explore camadas e sobreposição.`,`Semana do retrato: estude rostos de 7 pessoas diferentes.`,`Desafio do movimento: capture algo em movimento a cada dia.`,`Semana macro: pinte detalhes ampliados de objetos pequenos.`,`Desafio da cor complementar: cada dia um par de complementares.`,`Semana de arte colaborativa: convide outro artista para trocar telas.`]}get entradas(){return this.dataStore.listar(`entradasDiario`)||[]}get processos(){return this.dataStore.listar(`etapasProcesso`)||[]}get obras(){return W().items}get encomendas(){return this.dataStore.listar(`encomendas`)||[]}render(){let e=[`entradas`,`cronograma`,`processo`,`estatisticas`,`inspiracao`],t={entradas:`<i class="fas fa-clipboard"></i> Entradas`,cronograma:`<i class="fas fa-calendar-alt"></i> Cronograma`,processo:`<i class="fas fa-pencil-alt"></i> Processo`,estatisticas:`<i class="fas fa-chart-bar"></i> Estatísticas`,inspiracao:`<i class="fas fa-lightbulb"></i> Inspiração`};return`
      <div class="diario-header">
        <div>
          <h2><i class="fas fa-clipboard"></i> Diário Criativo</h2>
          <div class="diario-sub">Registro íntimo do seu processo artístico  ·  ${new Date().toLocaleDateString(`pt-BR`)}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-primario" id="btnNovaEntrada" style="font-size:0.8rem;padding:6px 14px;"><i class="fas fa-plus"></i> Nova Entrada</button>
        </div>
      </div>
      <div class="diario-tabs">
        ${e.map(e=>`<button class="tab-btn ${e===this.tabAtiva?`ativo`:``}" data-tab="${e}">${t[e]}</button>`).join(``)}
      </div>
      <div id="diarioContent">${{entradas:()=>this.renderEntradas(),cronograma:()=>this.renderCronograma(),processo:()=>this.renderProcesso(),estatisticas:()=>this.renderEstatisticas(),inspiracao:()=>this.renderInspiracao()}[this.tabAtiva]()}</div>
    `}renderEntradas(){let e=[...this.entradas].sort((e,t)=>new Date(t.data||t.criadoEm)-new Date(e.data||e.criadoEm));return`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
        <span style="font-size:0.85rem;color:var(--text-muted);">${e.length} registro(s)  ·  última semana: ${e.filter(e=>{let t=new Date;return t.setDate(t.getDate()-7),new Date(e.data)>=t}).length} entrada(s)</span>
      </div>
      ${e.length===0?`<div class="diario-card" style="text-align:center;padding:30px;color:var(--text-muted);"><p style="font-size:1.2rem;margin-bottom:6px;"><i class="fas fa-pencil-alt"></i></p><p>Nenhuma entrada no diário ainda.<br>Clique em "Nova Entrada" para começar seu registro criativo.</p></div>`:``}
      <div class="diario-entry-grid">
        ${e.map(e=>this.renderCardEntrada(e)).join(``)}
      </div>
    `}renderCardEntrada(e){let t=e.humor||3,n=this.humorEmojis[t]||`😐`,r=this.humorLabels[t]||``,i=e.data?new Date(e.data).toLocaleDateString(`pt-BR`,{weekday:`short`,day:`numeric`,month:`short`}):``,a=(e.obrasTrabalhadas||[]).map(e=>{let t=W().items.find(t=>t.id===e);return t?t.titulo:null}).filter(Boolean),o=e.fotos||[];return`
      <div class="diario-card">
        <div class="dc-data">${i}</div>
        <div class="dc-humor" title="${r}">${n} <span style="font-size:0.7rem;color:var(--text-muted);font-weight:400;">${r}</span></div>
        <div class="dc-horas"><strong>⏰ ${e.horasTrabalhadas||0}h</strong> trabalhadas</div>
        <div class="dc-texto">${e.oQueTrabalhou||``}</div>
        ${a.length>0?`<div class="dc-obras">${a.map(e=>`<span><i class="fas fa-images"></i> ${e}</span>`).join(``)}</div>`:``}
        ${e.bloqueios?`<div class="dc-bloqueios"><i class="fas fa-exclamation-triangle"></i> ${e.bloqueios}</div>`:``}
        ${e.avancos?`<div class="dc-avancos"><i class="fas fa-check"></i> ${e.avancos}</div>`:``}
        ${e.descobertas?`<div class="dc-descobertas"><i class="fas fa-lightbulb"></i> ${e.descobertas}</div>`:``}
        ${o.length>0?`<div class="dc-fotos">${o.map(e=>`<img src="${e}" onclick="window.open('${e}')">`).join(``)}</div>`:``}
        <div class="diario-acoes">
          <button data-acao="editarEntrada" data-id="${e.id}"><i class="fas fa-pen"></i> Editar</button>
          <button data-acao="excluirEntrada" data-id="${e.id}" style="color:#dc2626;" aria-label="Excluir entrada"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `}renderCronograma(){let e=this.calData.getFullYear(),t=this.calData.getMonth(),n=new Date,r=new Date(e,t,1),i=new Date(e,t+1,0).getDate(),a=r.getDay(),o=[],s=new Date(e,t,0).getDate();for(let e=a-1;e>=0;e--)o.push({dia:s-e,outro:!0});let c=[];for(let r=1;r<=i;r++){let i=`${e}-${String(t+1).padStart(2,`0`)}-${String(r).padStart(2,`0`)}`,a=new Date(e,t,r).toDateString()===n.toDateString(),o=this.entradas.filter(n=>{if(!n.data)return!1;let i=new Date(n.data);return i.getFullYear()===e&&i.getMonth()===t&&i.getDate()===r}),s=this.encomendas.filter(n=>{if(!n.prazo)return!1;let i=new Date(n.prazo);return i.getFullYear()===e&&i.getMonth()===t&&i.getDate()===r}),l=[];o.forEach(e=>{let t=(e.oQueTrabalhou||``).toLowerCase();t.includes(`escultura`)||t.includes(`argila`)||t.includes(`bronze`)?l.push(`escultura`):t.includes(`admin`)||t.includes(`organiz`)||t.includes(`email`)||t.includes(`papel`)||t.includes(`nota`)?l.push(`admin`):e.horasTrabalhadas===0||e.bloqueios&&e.bloqueios.includes(`descanso`)?l.push(`descanso`):l.push(`pintura`)});let u=o.reduce((e,t)=>e+(t.horasTrabalhadas||0),0),d=u>0?`${u}h`:``;c.push({dia:r,dataStr:i,ehHoje:a,atividades:o,prazos:s,cores:l,metaText:d})}let l=o.length+c.length,u=[],d=l%7==0?0:7-l%7;for(let e=1;e<=d;e++)u.push({dia:e,outro:!0});return`
      <div class="cal-toolbar">
        <div class="cal-nav">
          <button id="calMesAnt" aria-label="Mês anterior">◀</button>
          <span>${this.calData.toLocaleDateString(`pt-BR`,{month:`long`,year:`numeric`})}</span>
          <button id="calMesProx" aria-label="Próximo mês">▶</button>
          <button id="calHoje" style="margin-left:4px;font-size:0.75rem;padding:4px 10px;">Hoje</button>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <span style="font-size:0.78rem;color:var(--text-muted);">Total: ${this.entradas.reduce((e,t)=>e+(t.horasTrabalhadas||0),0).toFixed(1)}h</span>
        </div>
      </div>
      <div class="cal-grid">
        ${[`Dom`,`Seg`,`Ter`,`Qua`,`Qui`,`Sex`,`Sáb`].map(e=>`<div class="cal-header-cell">${e}</div>`).join(``)}
        ${[...o,...c,...u].map(e=>{let t=[`cal-cell`];return e.outro&&t.push(`outro-mes`),e.ehHoje&&t.push(`hoje`),e.atividades&&e.atividades.length>0&&t.push(`tem-atividade`),e.prazos&&e.prazos.length>0&&t.push(`tem-prazo`),`
            <div class="${t.join(` `)}" ${e.dataStr?`data-data="${e.dataStr}"`:``}>
              <div class="cal-num">${e.dia}</div>
              ${e.cores?`<div class="cal-atividades">${e.cores.map(e=>`<span class="cal-dot ${e}" title="${e}"></span>`).join(``)}${e.prazos?e.prazos.map(()=>`<span class="cal-dot prazo" title="Prazo"></span>`).join(``):``}</div>`:``}
              ${e.prazos&&e.prazos.length>0?`<div style="font-size:0.55rem;color:#ef4444;font-weight:600;margin-top:1px;"><i class="fas fa-exclamation-triangle"></i> ${e.prazos.length}</div>`:``}
              ${e.metaText?`<div class="cal-meta-text">${e.metaText}</div>`:``}
            </div>
          `}).join(``)}
      </div>
      <div class="cal-legenda">
        <span><span class="leg-dot" style="background:#3b82f6;"></span> Pintura</span>
        <span><span class="leg-dot" style="background:#8b5cf6;"></span> Escultura</span>
        <span><span class="leg-dot" style="background:#f59e0b;"></span> Administrativo</span>
        <span><span class="leg-dot" style="background:#10b981;"></span> Descanso</span>
        <span><span class="leg-dot" style="background:#ef4444;animation:pulse-dot 1.5s infinite;"></span> Prazo</span>
      </div>
    `}renderProcesso(){let e=this.obras,t=this.processos,n=this._filtroObraProc,r=n?t.find(e=>e.obraId===n):null,i=r&&r.etapas||[];return`
      <div class="proc-worksel">
        <select id="selObraProcesso">${`<option value="">→ Selecione uma obra —</option>
      ${e.map(e=>`<option value="${e.id}" ${e.id===n?`selected`:``}>${e.titulo||`Sem título`}</option>`).join(``)}`}</select>
        <button class="btn-primario" id="btnNovaEtapa" style="font-size:0.75rem;padding:5px 12px;margin-left:8px;" ${n?``:`disabled`}><i class="fas fa-plus"></i> Nova Etapa</button>
        ${n?`<button class="btn-secundario" id="btnExportarProcessoPDF" style="font-size:0.75rem;padding:5px 12px;margin-left:4px;">📤 Exportar Making Of PDF</button>`:``}
      </div>
      ${n?``:`<p style="color:var(--text-muted);font-size:0.85rem;">Selecione uma obra para ver o processo criativo documentado.</p>`}
      ${n?(()=>{let e=this.etapasPadrao.filter(e=>i.some(t=>t.titulo===e)).length,t=this.etapasPadrao.length,n=t>0?Math.round(e/t*100):0;return`
        <div class="proc-progresso">
          <div class="proc-progresso-header">
            <span><i class="fas fa-chart-line"></i> Progresso do processo criativo</span>
            <span class="proc-progresso-pct">${e} de ${t} etapas — ${n}%</span>
          </div>
          <div class="proc-barra">
            <div class="proc-barra-trilha">
              <div class="proc-barra-preenchimento" style="width:${n}%"></div>
            </div>
            <div class="proc-dots-container">${this.etapasPadrao.map((e,n)=>{let r=i.find(t=>t.titulo===e),a=!!r,o=r&&r.data?new Date(r.data).toLocaleDateString(`pt-BR`):``;return`
            <div class="proc-dot-wrapper" style="left:${t>1?n/(t-1)*100:50}%">
              <div class="proc-dot ${a?`proc-dot--preenchido`:`proc-dot--vazio`} ${a?``:`proc-dot--clicavel`}" data-titulo="${B(e)}" tabindex="0" role="button" aria-label="${a?e+` — `+o:`Adicionar `+e}">
                ${a?`<i class="fas fa-check" style="font-size:0.55rem;color:#fff;"></i>`:``}
                <span class="proc-tooltip">${B(e)}${o?`<br><span style="font-size:0.65rem;opacity:0.8;">`+o+`</span>`:`<br><span style="font-size:0.65rem;opacity:0.8;">Clique para adicionar</span>`}</span>
              </div>
            </div>`}).join(``)}</div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.68rem;color:var(--text-muted);margin-top:18px;padding:0 2px;">
            <span>${this.etapasPadrao[0]||``}</span>
            <span>${this.etapasPadrao[this.etapasPadrao.length-1]||``}</span>
          </div>
          <div style="margin-top:6px;font-size:0.78rem;color:var(--text-muted);">${i.length} etapa(s) documentada(s) · ${i.filter(e=>!this.etapasPadrao.includes(e.titulo)).length} personalizada(s)</div>
        </div>`})():``}
      ${n&&i.length===0?`<div style="text-align:center;padding:30px;color:var(--text-muted);"><p style="font-size:1.2rem;">📉</p><p>Nenhuma etapa documentada para esta obra ainda.<br>Clique em "Nova Etapa" para iniciar a linha do tempo do processo criativo.</p></div>`:``}
      ${n&&i.length>0?`
        <div class="proc-timeline">
          ${i.sort((e,t)=>new Date(e.data||0)-new Date(t.data||0)).map((e,t)=>`
            <div class="proc-step">
              <div class="ps-titulo">${t+1}. ${e.titulo||`Etapa`}</div>
              <div class="ps-data"><i class="fas fa-calendar-alt"></i> ${e.data?new Date(e.data).toLocaleDateString(`pt-BR`):`—`}</div>
              <div class="ps-desc">${e.descricao||``}</div>
              ${e.notasTecnicas?`<div class="ps-notas"><i class="fas fa-pencil-alt"></i> ${e.notasTecnicas}</div>`:``}
              ${e.foto?`<div class="ps-foto"><img src="${e.foto}" onclick="window.open('${e.foto}')"></div>`:``}
              ${e.videoLink?`<div class="ps-video">📉 <a href="${e.videoLink}" target="_blank">Ver vídeo time-lapse</a></div>`:``}
              <div class="diario-acoes">
                <button data-acao="editarEtapa" data-id="${e.id}"><i class="fas fa-pen"></i> Editar</button>
                <button data-acao="excluirEtapa" data-id="${e.id}" style="color:#dc2626;" aria-label="Excluir etapa"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          `).join(``)}
        </div>
      `:``}
    `}renderEstatisticas(){let e=this.entradas,t=this.obras,n={},r={},i={},a=0;e.forEach(e=>{if(!e.data||!e.horasTrabalhadas)return;let t=new Date(e.data),o=`${t.getFullYear()}-S${Math.ceil((t.getDate()-t.getDay()+1)/7)}`,s=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,c=t.getFullYear(),l=e.horasTrabalhadas||0;n[o]=(n[o]||0)+l,r[s]=(r[s]||0)+l,i[c]=(i[c]||0)+l,a+=l});let o={};e.forEach(e=>{(e.obrasTrabalhadas||[]).forEach(t=>{let n=W().items.find(e=>e.id===t);n&&n.tecnica&&(o[n.tecnica]=(o[n.tecnica]||0)+(e.horasTrabalhadas||0))})});let s={};t.forEach(e=>{if(!e.dataCadastro||!e.criadoEm)return;let t=this.processos.find(t=>t.obraId===e.id),n=t&&t.etapas||[],r=n.length>0?new Date(n[n.length-1].data):new Date(e.criadoEm),i=new Date(e.criadoEm),a=Math.round((r-i)/864e5);a>0&&e.tecnica&&(s[e.tecnica]||(s[e.tecnica]={total:0,count:0}),s[e.tecnica].total+=a,s[e.tecnica].count++)});let c=[...e].filter(e=>e.humor>=4&&e.horasTrabalhadas>=4).sort((e,t)=>(t.horasTrabalhadas||0)-(e.horasTrabalhadas||0)).slice(0,5),l=[],u=new Date;for(let e=5;e>=0;e--){let t=new Date(u.getFullYear(),u.getMonth()-e,1),n=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}`,i=t.toLocaleDateString(`pt-BR`,{month:`short`});l.push({chave:n,rotulo:i,horas:r[n]||0})}let d=Math.max(1,...l.map(e=>e.horas)),f=436/l.length-8,p=l.map((e,t)=>{let n=24+t*(436/l.length),r=e.horas/d*100,i=130-r;return`<rect class="stats-bar" x="${n}" y="${i}" width="${Math.max(f,6)}" height="${Math.max(r,2)}" rx="3"></rect>
        <text class="stats-value" x="${n+f/2}" y="${i-4}">${e.horas.toFixed(0)}</text>
        <text class="stats-label" x="${n+f/2}" y="138">${e.rotulo}</text>`}).join(``),m=Object.entries(o).sort((e,t)=>t[1]-e[1]),h=Math.max(1,...m.map(e=>e[1]));return`
      <div class="stats-grid">
        <div class="stats-card">
          <h4>⏰ Total de Horas</h4>
          <div class="stats-valor">${a.toFixed(1)}h</div>
          <div class="stats-sub">${e.length} dias registrados</div>
        </div>
        <div class="stats-card">
          <h4><i class="fas fa-calendar-alt"></i> Média Diária</h4>
          <div class="stats-valor">${e.length>0?(a/e.length).toFixed(1):0}h</div>
          <div class="stats-sub">por dia de trabalho</div>
        </div>
        <div class="stats-card">
          <h4><i class="fas fa-pencil-alt"></i> Média p/ Obra</h4>
          <div class="stats-valor">${Object.values(s).length>0?(Object.values(s).reduce((e,t)=>e+t.total/t.count,0)/Object.values(s).length).toFixed(0):`—`}</div>
          <div class="stats-sub">dias em média (${Object.keys(s).length} técnicas)</div>
        </div>
        <div class="stats-card" style="grid-column:1/-1;">
          <h4>📆 Horas por Mês</h4>
          <svg class="stats-svg" viewBox="0 0 460 140">${p}</svg>
        </div>
        ${m.length>0?`
        <div class="stats-card" style="grid-column:1/-1;">
          <h4><i class="fas fa-pencil-alt"></i> Produtividade por Técnica</h4>
          ${m.map(([e,t])=>`
            <div style="margin-bottom:8px;">
              <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:2px;">
                <span>${e}</span><span>${t.toFixed(1)}h</span>
              </div>
              <div class="stats-barra"><div class="fill" style="width:${t/h*100}%"></div></div>
            </div>
          `).join(``)}
        </div>`:``}
        <div class="stats-card">
          <h4>🤩 Dias de Maior Criatividade</h4>
          ${c.length===0?`<p style="font-size:0.8rem;color:var(--text-muted);">Registre mais entradas com humor alto para ver esta análise.</p>`:c.map(e=>`
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:3px 0;border-bottom:1px solid var(--border);">
              <span>${e.data?new Date(e.data).toLocaleDateString(`pt-BR`):``}</span>
              <span>${this.humorEmojis[e.humor]||`😐`} ${e.horasTrabalhadas||0}h</span>
            </div>
          `).join(``)}
        </div>
        <div class="stats-card">
          <h4><i class="fas fa-palette"></i> Por Técnica — Dias Médios</h4>
          ${Object.entries(s).length===0?`<p style="font-size:0.8rem;color:var(--text-muted);">Dados insuficientes.</p>`:Object.entries(s).map(([e,t])=>`
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;padding:3px 0;border-bottom:1px solid var(--border);">
              <span>${e}</span><span><strong>${(t.total/t.count).toFixed(0)}</strong> dias (${t.count} obra(s))</span>
            </div>
          `).join(``)}
        </div>
      </div>
      <div style="margin-top:14px;font-size:0.8rem;color:var(--text-muted);">
        <i class="fas fa-lightbulb"></i> Registre entradas diárias com humor e horas para estatísticas mais precisas.
      </div>
    `}renderInspiracao(){let e=new Date,t=Math.floor((e-new Date(e.getFullYear(),0,0))/864e5),n=t%this.citacoes.length,r=t%this.promptsDiarios.length,i=e.getDay()===1?Math.floor(t/7)%this.desafiosSemanais.length:-1,a=this.citacoes[n],o=this.promptsDiarios[r],s=i>=0?this.desafiosSemanais[i]:null;return`
      <div class="inspiracao-card">
        <div class="ic-citacao">"${a.texto}"</div>
        <div class="ic-autor">— ${a.autor}</div>
        <div class="ic-prompt"><i class="fas fa-lightbulb"></i> Prompt criativo de hoje: <strong>${o}</strong></div>
        ${s?`<div class="ic-desafio"><i class="fas fa-bullseye"></i> Desafio da semana: ${s}</div>`:``}
      </div>
      <div style="margin-top:16px;">
        <button class="btn-primario" id="btnNovaCitacao" style="font-size:0.8rem;padding:6px 14px;"><i class="fas fa-plus"></i> Nova citação</button>
        <button class="btn-secundario" id="btnNovoPrompt" style="font-size:0.8rem;padding:6px 14px;margin-left:6px;"><i class="fas fa-plus"></i> Novo prompt</button>
      </div>
      <div style="margin-top:24px;">
        <h4 style="font-size:0.9rem;margin-bottom:8px;"><i class="fas fa-clipboard"></i> Todas as citação</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px;">
          ${this.citacoes.map(e=>`
            <div style="font-size:0.75rem;padding:8px 10px;background:var(--card);border-radius:6px;border:1px solid var(--border);">
              <em>"${e.texto}"</em><br><span style="color:var(--text-muted);">— ${e.autor}</span>
            </div>
          `).join(``)}
        </div>
      </div>
    `}aposRenderizar(){this.removerListeners(),document.querySelectorAll(`.diario-tabs .tab-btn[data-tab]`).forEach(e=>{let t=()=>{this.tabAtiva=e.dataset.tab,this.rerenderizar()};e.addEventListener(`click`,t),this._bindCache[`tab_`+e.dataset.tab]={el:e,handler:t,type:`click`}}),document.getElementById(`btnNovaEntrada`)?.addEventListener(`click`,()=>this.abrirFormEntrada()),document.getElementById(`calMesAnt`)?.addEventListener(`click`,()=>{this.calData.setMonth(this.calData.getMonth()-1),this.rerenderizar()}),document.getElementById(`calMesProx`)?.addEventListener(`click`,()=>{this.calData.setMonth(this.calData.getMonth()+1),this.rerenderizar()}),document.getElementById(`calHoje`)?.addEventListener(`click`,()=>{this.calData=new Date,this.rerenderizar()}),document.querySelectorAll(`.cal-cell[data-data]`).forEach(e=>{let t=()=>{let t=e.dataset.data,n=this.entradas.find(e=>e.data&&e.data.startsWith(t));n?(this._entradaEditando=n.id,this.abrirFormEntrada(n.id)):(this._entradaEditando=null,this.abrirFormEntrada(null,t))};e.addEventListener(`click`,t),this._bindCache[`cal_`+e.dataset.data]={el:e,handler:t,type:`click`}});let e=document.getElementById(`selObraProcesso`);if(e){let t=()=>{this._filtroObraProc=e.value,this.rerenderizar()};e.addEventListener(`change`,t),this._bindCache.selObraProcesso={el:e,handler:t,type:`change`}}document.getElementById(`btnNovaEtapa`)?.addEventListener(`click`,()=>this.abrirFormEtapa()),document.getElementById(`btnExportarProcessoPDF`)?.addEventListener(`click`,()=>this.exportarProcessoPDF()),document.getElementById(`btnNovaCitacao`)?.addEventListener(`click`,()=>this.rerenderizar()),document.getElementById(`btnNovoPrompt`)?.addEventListener(`click`,()=>this.rerenderizar());let t=document.querySelector(`.proc-progresso`);t&&t.addEventListener(`click`,e=>{let t=e.target.closest(`.proc-dot--clicavel`);if(t){let e=t.dataset.titulo;e&&this.abrirFormEtapa(null,e)}});let n=document.getElementById(`diarioContent`)||document.getElementById(`viewPrincipal`);if(n){let e=e=>{let t=e.target.closest(`[data-acao]`);if(!t)return;let n=t.dataset.acao,r=t.dataset.id;n===`editarEntrada`?this.abrirFormEntrada(r):n===`excluirEntrada`?this.excluirEntrada(r):n===`editarEtapa`?this.abrirFormEtapa(r):n===`excluirEtapa`&&this.excluirEtapa(r)};n.addEventListener(`click`,e),this._bindCache.delegatedDiario={el:n,handler:e,type:`click`}}}abrirFormEntrada(e=null,t=null){let n=e?this.dataStore.buscarPorId(`entradasDiario`,e):null,r=this.obras.map(e=>`<option value="${e.id}"><i class="fas fa-images"></i> ${e.titulo||`Sem título`}</option>`).join(``);n&&n.obrasTrabalhadas;let i=n&&n.fotos||[],a=n?n.data.slice(0,10):t||new Date().toISOString().slice(0,10),o=n&&n.humor||3,s=n&&n.oQueTrabalhou||``,c=n&&n.horasTrabalhadas||0,l=n&&n.bloqueios||``,u=n&&n.avancos||``,d=n&&n.descobertas||``;this._fotosTemporarias=[...i],this._selHumor=o;let f=[1,2,3,4,5].map(e=>`<button type="button" class="humor-btn ${e===this._selHumor?`selecionado`:``}" data-humor="${e}" aria-label="Humor ${this.humorLabels[e]}">${this.humorEmojis[e]}</button>`).join(``);N(`
      <h3>${n?`<i class="fas fa-pen"></i> Editar Entrada`:`<i class="fas fa-plus"></i> Nova Entrada do Diário`}</h3>
      <form id="formModal" class="diario-form-grid">
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-calendar-alt"></i> Data</label>
          <input type="date" id="fEntData" value="${a}" required aria-label="Data" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">😀 Humor criativo</label>
          <div class="humor-selector" id="humorSelector">${f}</div>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-pencil-alt"></i> O que trabalhou hoje</label>
          <div style="margin-bottom:4px;display:flex;gap:4px;flex-wrap:wrap;">
            <button type="button" class="btn-toolbar" data-insere="<p></p>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;">Parágrafo</button>
            <button type="button" class="btn-toolbar" data-insere="<strong></strong>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;"><strong>Negrito</strong></button>
            <button type="button" class="btn-toolbar" data-insere="<em></em>" style="font-size:0.7rem;padding:2px 8px;border:1px solid var(--border);border-radius:4px;background:var(--card);cursor:pointer;"><em>Itálico</em></button>
          </div>
          <textarea id="fEntTexto" aria-label="O que trabalhou hoje" style="width:100%;min-height:100px;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);font-family:inherit;" placeholder="Descreva seu dia criativo...">${s}</textarea>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-images"></i> Obras trabalhadas (segure Ctrl para múltiplas)</label>
          <select multiple id="fEntObras" aria-label="Obras trabalhadas" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;min-height:60px;font-size:0.85rem;background:var(--bg);color:var(--text);">${r}</select>
          <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px;">Selecione as obras que trabalhou hoje</div>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);">⏰ Horas trabalhadas</label>
          <input type="number" id="fEntHoras" value="${c}" min="0" step="0.5" aria-label="Horas trabalhadas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-exclamation-triangle"></i> Bloqueios criativos</label>
          <textarea id="fEntBloqueios" aria-label="Bloqueios criativos" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que te travou hoje?">${l}</textarea>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-check"></i> Avanços</label>
          <textarea id="fEntAvancos" aria-label="Avanços" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que conquistou hoje?">${u}</textarea>
        </div>
        <div>
          <label style="font-size:0.8rem;color:var(--text-muted);"><i class="fas fa-lightbulb"></i> Descobertas</label>
          <textarea id="fEntDescobertas" aria-label="Descobertas" style="width:100%;padding:6px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;background:var(--bg);color:var(--text);min-height:40px;" placeholder="O que aprendeu hoje?">${d}</textarea>
        </div>
        <div class="campo-full">
          <label style="font-size:0.8rem;color:var(--text-muted);">📷 Fotos do dia</label>
          <input type="file" id="fEntFotos" accept="image/*" multiple aria-label="Fotos do dia" style="font-size:0.8rem;">
          <div class="photo-strip" id="photoStrip">${i.map(e=>`<div class="ps-item"><img src="${e}"><button type="button" class="ps-remove" data-foto="${e}" aria-label="Remover foto">📷</button></div>`).join(``)}</div>
        </div>
        <div class="modal-acoes" style="grid-column:1/-1;">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">${n?`Atualizar`:`Salvar Entrada`}</button>
        </div>
      </form>
    `),document.querySelectorAll(`.humor-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.humor-btn`).forEach(e=>e.classList.remove(`selecionado`)),e.classList.add(`selecionado`),this._selHumor=Number(e.dataset.humor)})}),document.querySelectorAll(`.btn-toolbar`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.getElementById(`fEntTexto`),n=e.dataset.insere,r=t.selectionStart,i=t.value,a=i.slice(0,r),o=i.slice(r);t.value=a+n+o,t.focus(),t.selectionStart=t.selectionEnd=r+n.indexOf(`>`)+1})}),document.getElementById(`fEntFotos`)?.addEventListener(`change`,e=>{let t=e.target.files;Array.from(t).forEach(e=>{let t=new FileReader;t.onload=e=>{this._fotosTemporarias.push(e.target.result),this.atualizarPhotoStrip()},t.readAsDataURL(e)})}),document.querySelectorAll(`.ps-remove`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.foto;this._fotosTemporarias=this._fotosTemporarias.filter(e=>e!==t),this.atualizarPhotoStrip()})}),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,t=>{t.preventDefault();let r=document.getElementById(`fEntObras`),i=r?Array.from(r.selectedOptions).map(e=>e.value):[],a={data:document.getElementById(`fEntData`).value,humor:this._selHumor,oQueTrabalhou:document.getElementById(`fEntTexto`).value.trim(),obrasTrabalhadas:i,fotos:this._fotosTemporarias,horasTrabalhadas:Number(document.getElementById(`fEntHoras`).value)||0,bloqueios:document.getElementById(`fEntBloqueios`).value.trim(),avancos:document.getElementById(`fEntAvancos`).value.trim(),descobertas:document.getElementById(`fEntDescobertas`).value.trim()};if(!a.data){A(`A data é obrigatória.`,`aviso`);return}n?(this.dataStore.atualizar(`entradasDiario`,e,a),A(`Entrada atualizada!`,`sucesso`)):(this.dataStore.adicionar(`entradasDiario`,a),A(`Entrada registrada no diário!`,`sucesso`)),P(),this._fotosTemporarias=[],this.rerenderizar()})}atualizarPhotoStrip(){let e=document.getElementById(`photoStrip`);e&&(e.innerHTML=this._fotosTemporarias.map(e=>`<div class="ps-item"><img src="${e}"><button type="button" class="ps-remove" data-foto="${e}" aria-label="Remover foto">📷</button></div>`).join(``),e.querySelectorAll(`.ps-remove`).forEach(e=>{e.addEventListener(`click`,()=>{this._fotosTemporarias=this._fotosTemporarias.filter(t=>t!==e.dataset.foto),this.atualizarPhotoStrip()})}))}async excluirEntrada(e){if(!await R(`Excluir esta entrada do diário?`))return;let t=this.dataStore.buscarPorId(`entradasDiario`,e);this.dataStore.remover(`entradasDiario`,e);let{dataStore:n}=this;z(`Entrada excluída.`,()=>{n.dados.entradasDiario.push(t),n.salvar()}),this.rerenderizar()}abrirFormEtapa(e=null,t=null){let n=this._filtroObraProc;if(!n){A(`Selecione uma obra primeiro.`,`aviso`);return}let r=this.processos.find(e=>e.obraId===n),i=null;e&&r&&(i=(r.etapas||[]).find(t=>t.id===e));let a=i?i.titulo:t,o=this.etapasPadrao.map(e=>`<option value="${e}" ${a===e?`selected`:``}>${e}</option>`).join(``),s=t&&!this.etapasPadrao.includes(t);N(`
      <h3>${i?`<i class="fas fa-pen"></i> Editar Etapa`:`<i class="fas fa-plus"></i> Nova Etapa do Processo`}</h3>
      <form id="formModal">
        <div class="campo-form"><label>Etapa</label><select id="fEtpTitulo" aria-label="Etapa"><option value="">→ Personalizada —</option>${o}</select></div>
        <div class="campo-form"><label>Ou digite título personalizado</label><input type="text" id="fEtpTituloCustom" value="${(i&&!this.etapasPadrao.includes(i.titulo)?i.titulo:s?t:``)||``}" placeholder="Ex.: Aplicação de verniz" aria-label="Título personalizado" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form"><label><i class="fas fa-calendar-alt"></i> Data</label><input type="date" id="fEtpData" value="${i?i.data||``:new Date().toISOString().slice(0,10)}" aria-label="Data da etapa" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="campo-form"><label><i class="fas fa-pencil-alt"></i> Descrição</label><textarea id="fEtpDesc" aria-label="Descrição da etapa" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:70px;font-family:inherit;">${i&&i.descricao||``}</textarea></div>
        <div class="campo-form"><label><i class="fas fa-pencil-alt"></i> Notas técnicas (cores, pincéis, misturas)</label><textarea id="fEtpNotas" aria-label="Notas técnicas" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;min-height:50px;">${i&&i.notasTecnicas||``}</textarea></div>
        <div class="campo-form"><label>📷 Foto da etapa</label><input type="file" id="fEtpFoto" accept="image/*" aria-label="Foto da etapa"></div>
        ${i&&i.foto?`<div style="margin-bottom:8px;"><img src="${i.foto}" style="max-width:150px;max-height:100px;border-radius:4px;"></div>`:``}
        <div class="campo-form"><label>📉 Link de vídeo (YouTube/Vimeo)</label><input type="url" id="fEtpVideo" value="${i&&i.videoLink||``}" placeholder="https://..." aria-label="Link de vídeo" style="width:100%;padding:7px 10px;border:1px solid var(--border);border-radius:6px;"></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-primario">${i?`Atualizar`:`Adicionar Etapa`}</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarModal`).addEventListener(`click`,P),document.getElementById(`formModal`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`fEtpTitulo`).value||document.getElementById(`fEtpTituloCustom`).value.trim();if(!t){A(`Título da etapa é obrigatório.`,`aviso`);return}let a={id:i?i.id:`etp_`+Date.now()+`_`+Math.floor(Math.random()*1e3),titulo:t,data:document.getElementById(`fEtpData`).value,descricao:document.getElementById(`fEtpDesc`).value.trim(),notasTecnicas:document.getElementById(`fEtpNotas`).value.trim(),foto:i?i.foto:``,videoLink:document.getElementById(`fEtpVideo`).value.trim()},o=document.getElementById(`fEtpFoto`);if(o&&o.files&&o.files[0]){let e=new FileReader;e.onload=e=>{a.foto=e.target.result,this.salvarEtapa(n,r,a,i)},e.readAsDataURL(o.files[0])}else i&&(a.foto=i.foto),this.salvarEtapa(n,r,a,i)})}salvarEtapa(e,t,n,r){if(t)if(r){let e=t.etapas.findIndex(e=>e.id===r.id);e>=0&&(t.etapas[e]=n),this.dataStore.atualizar(`etapasProcesso`,t.id,{etapas:t.etapas}),A(`Etapa atualizada!`,`sucesso`)}else t.etapas.push(n),this.dataStore.atualizar(`etapasProcesso`,t.id,{etapas:t.etapas}),A(`Etapa adicionada!`,`sucesso`);else this.dataStore.adicionar(`etapasProcesso`,{obraId:e,etapas:[n]}),A(`Processo criado e etapa adicionada!`,`sucesso`);P(),this.rerenderizar()}async excluirEtapa(e){if(!await R(`Excluir esta etapa do processo?`))return;let t=this._filtroObraProc,n=this.processos.find(e=>e.obraId===t);if(!n)return;let r=(n.etapas||[]).find(t=>t.id===e);n.etapas=(n.etapas||[]).filter(t=>t.id!==e),n.etapas.length===0?this.dataStore.remover(`etapasProcesso`,n.id):this.dataStore.atualizar(`etapasProcesso`,n.id,{etapas:n.etapas});let{dataStore:i}=this;z(`Etapa excluída.`,()=>{n&&(n.etapas.push(r),i.atualizar(`etapasProcesso`,n.id,{etapas:n.etapas}))}),this.rerenderizar()}exportarProcessoPDF(){if(window.jspdf===void 0||!window.jspdf.jsPDF){A(`jsPDF não carregado.`,`erro`);return}j(`Exportando making of...`);let e=this._filtroObraProc,t=W().items.find(t=>t.id===e),n=this.processos.find(t=>t.obraId===e);if(!t||!n){A(`Selecione uma obra com processo documentado.`,`aviso`);return}let{jsPDF:r}=window.jspdf,i=new r({orientation:`portrait`,unit:`mm`,format:`a4`}),a=20;i.setFont(`helvetica`,`bold`),i.setFontSize(22),i.text(`Making Of`,20,a),a+=10,i.setFontSize(14),i.setFont(`helvetica`,`normal`),i.text(t.titulo||`Obra sem título`,20,a),a+=7,i.setFontSize(10),i.text(`${t.tecnica||``}  ·  ${t.dimensoes?t.dimensoes.altura+`x`+t.dimensoes.largura+(t.dimensoes.profundidade?`x`+t.dimensoes.profundidade:``)+` cm`:``}`,20,a),a+=5,i.text(`Processo criativo documentado  ·  ${new Date().toLocaleDateString(`pt-BR`)}`,20,a),a+=8,i.setDrawColor(200),i.line(20,a,190,a),a+=10;let o=(n.etapas||[]).sort((e,t)=>new Date(e.data||0)-new Date(t.data||0));o.forEach((e,t)=>{a>250&&(i.addPage(),a=20),i.setFont(`helvetica`,`bold`),i.setFontSize(11),i.text(`${t+1}. ${e.titulo||`Etapa`}`,20,a),a+=5,i.setFont(`helvetica`,`normal`),i.setFontSize(8),e.data&&(i.text(`<i class="fas fa-calendar-alt"></i> ${new Date(e.data).toLocaleDateString(`pt-BR`)}`,20,a),a+=4),e.descricao&&i.splitTextToSize(e.descricao,170).forEach(e=>{a>270&&(i.addPage(),a=20),i.text(e,22,a),a+=4}),e.notasTecnicas&&(a>265&&(i.addPage(),a=20),i.text(`<i class="fas fa-pencil-alt"></i> Técnica: ${e.notasTecnicas}`,22,a),a+=5),t<o.length-1&&(i.setDrawColor(220),i.line(20,a,190,a),a+=4)}),a>230&&(i.addPage(),a=20),a+=6,i.setDrawColor(200),i.line(20,a,190,a),a+=6,i.setFont(`helvetica`,`bold`),i.setFontSize(10),i.text(`Dados da Obra`,20,a),a+=5,i.setFont(`helvetica`,`normal`),i.setFontSize(8),t.preco&&(i.text(`💵 Preço: ${O(t.preco)}`,20,a),a+=4),t.serie&&(i.text(`<i class="fas fa-folder"></i> Série: ${t.serie}`,20,a),a+=4),t.descricao&&i.splitTextToSize(t.descricao,170).forEach(e=>{i.text(e,20,a),a+=4}),i.save(`making-of-${(t.titulo||`obra`).replace(/\s+/g,`-`).toLowerCase()}.pdf`),M(),A(`Making Of exportado em PDF!`,`sucesso`)}},Yi=class extends H{constructor(e,t){super(e,t),this.token=``,this.cliente=null,this.encomendas=[]}render(){if(this.token=this.extrairToken(),!this.token)return`
        <div class="portal-wrapper">
          <div class="portal-card portal-erro">
            <div class="portal-icone"><i class="fas fa-lock"></i></div>
            <h2>Link inválido</h2>
            <p>O link de acesso não é válido ou expirou. Entre em contato com o artista para obter um novo link.</p>
          </div>
        </div>
      `;if(this.token.startsWith(`aceite_`))return this.renderAceiteOrcamento();let e=this.dataStore.listar(`portais`).find(e=>e.token===this.token&&e.ativo);if(!e)return`
        <div class="portal-wrapper">
          <div class="portal-card portal-erro">
            <div class="portal-icone"><i class="fas fa-lock"></i></div>
            <h2>Acesso não autorizado</h2>
            <p>Este link não está mais ativo ou é inválido. Solicite um novo link ao artista.</p>
          </div>
        </div>
      `;if(e.ultimoAcesso=new Date().toISOString(),this.dataStore.salvar(),this.cliente={id:e.clienteId,nome:e.clienteNome},e.encomendaId){let t=this.dataStore.buscarPorId(`encomendas`,e.encomendaId);this.encomendas=t?[t]:[]}else this.encomendas=this.dataStore.listar(`encomendas`).filter(t=>t.clienteNome===e.clienteNome||t.clienteEmail===e.clienteId);let t=this.encomendas.length>0?this.encomendas.map(e=>this.renderEncomendaCard(e)).join(``):`<div class="portal-vazio">Nenhuma encomenda encontrada para este cliente.</div>`,n=q().artista?.nome||`Artista`;return this.encomendas.length,`
      <div class="portal-wrapper">
        <div class="portal-header">
          <div class="portal-header-info">
            <h2><i class="fas fa-box"></i> ${this.encomendas.length===1?`Acompanhamento de Encomenda`:`Acompanhamento de Encomendas`}</h2>
            <p class="portal-sub">${e.clienteNome} · via ${n}</p>
          </div>
        </div>
        <div class="portal-encomendas-lista">
          ${t}
        </div>
        <div class="portal-footer">
          <p>Dúvidas? Entre em contato direto com o artista.</p>
          <p class="portal-footer-peq">Atualizado em ${new Date().toLocaleString(`pt-BR`)}</p>
        </div>
      </div>
    `}extrairToken(){try{let e=window.location.hash;return new URLSearchParams(e.replace(`#portal?`,``)).get(`token`)||``}catch{return``}}renderAceiteOrcamento(){let e=(q().precificadorOrcamentos||[]).find(e=>e.aceiteToken===this.token),t=q().artista?.nome||`Artista`;if(!e)return`
        <div class="portal-wrapper">
          <div class="portal-card portal-erro">
            <div class="portal-icone"><i class="fas fa-lock"></i></div>
            <h2>Proposta não encontrada</h2>
            <p>Não encontramos esta proposta. O link pode estar incorreto ou a proposta foi excluída.</p>
          </div>
        </div>
      `;let n=e.status===`aprovado`&&e.aceiteData,r=e.validadeData&&new Date(e.validadeData)<new Date,i=e.moeda||`BRL`,a=(Number(e.preco)||0).toLocaleString(`pt-BR`,{style:`currency`,currency:i}),o=[e.largura,e.altura,e.profundidade].filter(Boolean).join(`×`);return`
      <div class="portal-wrapper">
        <div class="portal-card portal-aceite">
          <div class="portal-icone portal-aceite-icone"><i class="fas fa-check-circle"></i></div>
          <h2>${n?`Proposta já aceita`:r?`Proposta expirada`:`Confirme o aceite`}</h2>
          <p class="portal-aceite-sub">${n?`Esta proposta já foi aprovada anteriormente em ${k(e.aceiteData)}.`:r?`Esta proposta ultrapassou a data de validade. Solicite uma nova proposta ao artista.`:`Revise os dados abaixo e confirme seu aceite. Esta ação será registrada.`}</p>
          <div class="portal-aceite-detalhes">
            <div class="portal-aceite-linha"><span>Proposta</span><strong>${B(e.nome||`Obra sem título`)}</strong></div>
            ${e.numero?`<div class="portal-aceite-linha"><span>Número</span><strong>${e.numero}</strong></div>`:``}
            ${o?`<div class="portal-aceite-linha"><span>Dimensões</span><strong>${o} cm</strong></div>`:``}
            ${e.tecnica?`<div class="portal-aceite-linha"><span>Técnica</span><strong>${L(e.tecnica)}</strong></div>`:``}
            <div class="portal-aceite-linha"><span>Valor</span><strong>${a}</strong></div>
            ${e.validadeData?`<div class="portal-aceite-linha"><span>Validade</span><strong>${k(e.validadeData)}</strong></div>`:``}
          </div>
          ${!n&&!r?`<button class="btn-primario" id="btnConfirmarAceite">Confirmar aceite</button>`:``}
          <p class="portal-footer-peq">via ${B(t)} · Atelier CRM</p>
        </div>
      </div>
    `}renderEncomendaCard(e){let t={criado:{rotulo:`Pedido Recebido`,cor:`#3b82f6`,icone:`<i class="fas fa-clipboard"></i>`},em_andamento:{rotulo:`Em Andamento`,cor:`#f59e0b`,icone:`<i class="fas fa-palette"></i>`},aprovacao:{rotulo:`Aguardando Aprovação`,cor:`#8b5cf6`,icone:`<i class="fas fa-check"></i>`},finalizado:{rotulo:`Finalizado`,cor:`#16a34a`,icone:`✨`},entregue:{rotulo:`Entregue`,cor:`#065f46`,icone:`<i class="fas fa-box"></i>`},cancelado:{rotulo:`Cancelado`,cor:`#dc2626`,icone:`<i class="fas fa-times"></i>`}},n=t[e.status]||{rotulo:e.status,cor:`#6b7280`,icone:`<i class="fas fa-clipboard"></i>`},r=e.prazo?Math.ceil((new Date(e.prazo)-new Date)/864e5):null,i=r===null?`Sem prazo definido`:r>0?`${r} dia${r>1?`s`:``} restante${r>1?`s`:``}`:`Prazo encerrado`,a=e.atualizacoes&&e.atualizacoes.length>0?e.atualizacoes.map(e=>`
        <div class="portal-timeline-item">
          <div class="portal-timeline-dot" style="background:${t[e.status]?.cor||`#6b7280`}"></div>
          <div class="portal-timeline-content">
            <div class="portal-timeline-status">${t[e.status]?.rotulo||e.status}</div>
            <div class="portal-timeline-msg">${B(e.mensagem)}</div>
            <div class="portal-timeline-data">${k(e.data)}</div>
          </div>
        </div>
      `).join(``):`<div class="portal-timeline-empty">Nenhuma atualização ainda.</div>`;return`
      <div class="portal-encomenda-card">
        <div class="portal-encomenda-header">
          <div class="portal-encomenda-titulo">
            <h3>${B(e.descricao)||`Encomenda`}</h3>
            <span class="portal-badge" style="background:${n.cor}20;color:${n.cor};border:1px solid ${n.cor}40;">
              ${n.icone} ${n.rotulo}
            </span>
          </div>
          <div class="portal-encomenda-meta">
            <span><i class="fas fa-dollar-sign"></i> ${O(e.valor||0)}</span>
            <span><i class="fas fa-calendar-alt"></i> ${i}</span>
            ${e.clienteEmail?`<span>✉️ ${B(e.clienteEmail)}</span>`:``}
          </div>
        </div>
        <div class="portal-encomenda-body">
          <h4>📜 Atualizações</h4>
          <div class="portal-timeline">
            ${a}
          </div>
        </div>
      </div>
    `}aposRenderizar(){this.removerListeners(),document.getElementById(`btnConfirmarAceite`)?.addEventListener(`click`,()=>{let e=(q().precificadorOrcamentos||[]).find(e=>e.aceiteToken===this.token);!e||e.validadeData&&new Date(e.validadeData)<new Date||(e.status=`aprovado`,e.aceiteData=new Date().toISOString(),q().salvar(),Q.registrar(`criacao`,`Orçamento aprovado via aceite confirmado`,e.nome,`criacao`),this.rerenderizar())})}},U=[`recebido`,`esboco`,`em_producao`,`ajustes_finais`,`acabamento`,`pronto_para_envio`,`entregue`,`cancelado`],Xi={recebido:{rotulo:`Recebido`,cor:`#3b82f6`},esboco:{rotulo:`Esboço`,cor:`#8b5cf6`},em_producao:{rotulo:`Em Produção`,cor:`#f59e0b`},ajustes_finais:{rotulo:`Ajustes Finais`,cor:`#f97316`},acabamento:{rotulo:`Acabamento`,cor:`#ec4899`},pronto_para_envio:{rotulo:`Pronto p/ Envio`,cor:`#14b8a6`},entregue:{rotulo:`Entregue`,cor:`#065f46`},cancelado:{rotulo:`Cancelado`,cor:`#dc2626`}},Zi=class extends H{constructor(e,t){super(e,t),this.filtroStatus=``,this.busca=``,this.selecionados=new Set,this.modo=localStorage.getItem(`atelier-crm-view-mode-encomendas`)||`lista`,this.mostrarCanceladas=!1}render(){let e=this.filtrarEncomendas(),t=this.dataStore.listar(`encomendas`)||[],n=[``,...U].map(e=>`<option value="${e}" ${this.filtroStatus===e?`selected`:``}>${e?this.rotuloStatus(e):`Todos`}</option>`).join(``),r=t.filter(e=>e.status!==`entregue`&&e.status!==`cancelado`).length,i=t.reduce((e,t)=>e+(t.valor||0),0),a=U.map(e=>{let n=t.filter(t=>t.status===e).length,r=Xi[e];return n?`<span class="chip-filtro" style="font-size:0.72rem;padding:2px 8px;border:1px solid ${r.cor}40;background:${r.cor}15;color:${r.cor};">${r.rotulo}: ${n}</span>`:``}).join(``),o=e.length>0?this.modo===`lista`?this.renderTabela(e):this.modo===`grid`?this.renderCards(e):this.renderKanban(e):`<div class="tabela-wrapper"><div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-box"></i></div><p>Nenhuma encomenda encontrada.</p></div></div>`;return`
      <div class="view-cabecalho">
        <div>
          <h2>Encomendas</h2>
          <p class="subtitulo">${t.length} encomenda${t.length===1?``:`s`} · ${r} pendente${r===1?``:`s`} · ${O(i)} previsto</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk" style="${this.modo===`kanban`?`display:none`:``}">
            <input type="checkbox" id="selectAllEnc" aria-label="Selecionar todas as encomendas" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAllEnc">Todos</label>
          </div>
          <div class="toggle-visualizacao">
            <button id="btnListaEnc" class="${this.modo===`lista`?`ativo`:``}" title="Tabela">☰ Lista</button>
            <button id="btnGridEnc" class="${this.modo===`grid`?`ativo`:``}" title="Cards">▦ Cards</button>
            <button id="btnKanbanEnc" class="${this.modo===`kanban`?`ativo`:``}" title="Kanban">📋 Kanban</button>
          </div>
          <button class="btn-gradient" id="btnNovaEncomenda">✚ Nova Encomenda</button>
        </div>
      </div>
      ${this.selecionados.size>0?this.renderBarraBulk():``}
      ${a?`<div class="vendas-summary">${a}</div>`:``}
      <div class="filtros-linha">
        <input type="text" id="buscaEncomenda" placeholder="Buscar por cliente ou descricao..." value="${B(this.busca)}" aria-label="Buscar encomendas" style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
        ${this.modo===`kanban`?`<label style="display:flex;align-items:center;gap:6px;font-size:0.82rem;white-space:nowrap;color:var(--text-muted);"><input type="checkbox" id="chkMostrarCanceladas" ${this.mostrarCanceladas?`checked`:``}> Mostrar canceladas</label>`:`<select id="filtroStatusEncomenda" style="padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">${n}</select>`}
        <button class="btn-secundario" id="btnPortaisCliente"><i class="fas fa-link"></i> Links de Acesso</button>
      </div>
      ${o}
    `}renderKanban(e){return`
      <div class="kanban-board" id="kanbanBoardEnc">
        ${(this.mostrarCanceladas?U:U.filter(e=>e!==`cancelado`)).map(t=>{let n=Xi[t],r=e.filter(e=>e.status===t);return`
            <div class="kanban-coluna" data-status="${t}">
              <div class="kanban-coluna-header" style="border-left:4px solid ${n.cor};">
                <span class="kanban-coluna-titulo">${n.rotulo}</span>
                <span class="kanban-coluna-contagem">${r.length}</span>
              </div>
              <div class="kanban-coluna-corpo">
                ${r.map(e=>this._kanbanCardHtml(e)).join(``)}
                ${r.length===0?`<div class="kanban-vazio">Nenhuma</div>`:``}
              </div>
            </div>`}).join(``)}
      </div>`}_kanbanCardHtml(e){Xi[e.status]||e.status;let t=e.prazo?Math.ceil((new Date(e.prazo)-new Date)/864e5):null,n=t===null?``:`<span style="font-size:0.72rem;${t<0?`color:#dc2626;font-weight:600;`:t<=15?`color:#f59e0b;`:`color:var(--text-muted);`}">${k(e.prazo)}${t<0?` ⚠`:``}</span>`,r=U.indexOf(e.status),i=r>0&&U[r-1]!==`cancelado`,a=r>=0&&r<U.length-1;return`
      <div class="kanban-card" draggable="true" data-id="${e.id}">
        <div class="kanban-card-corpo">
          <div class="kanban-card-nome"><strong>${B(e.clienteNome)||`—`}</strong></div>
          <div class="kanban-card-desc">${fi(e.descricao)||`—`}</div>
          <div class="kanban-card-meta">
            <span style="font-weight:600;">${O(e.valor||0)}</span>
            ${n}
          </div>
        </div>
        <div class="kanban-card-acoes">
          <button class="btn-miniatura btn-editar-enc" data-id="${e.id}" title="Editar" aria-label="Editar"><i class="fas fa-pen"></i></button>
          <button class="kanban-mobile-menu-btn" data-id="${e.id}" title="Mover etapa" aria-label="Mover etapa"><i class="fas fa-ellipsis-v"></i></button>
          <div class="kanban-mobile-dropdown" data-id="${e.id}">
            ${i?`<button class="kanban-mover-btn" data-id="${e.id}" data-status="${U[r-1]}" data-direcao="anterior">↑ ${Xi[U[r-1]]?.rotulo}</button>`:``}
            ${a?`<button class="kanban-mover-btn" data-id="${e.id}" data-status="${U[r+1]}" data-direcao="proximo">↓ ${Xi[U[r+1]]?.rotulo}</button>`:``}
          </div>
        </div>
      </div>`}renderTabela(e){return`
      <div class="tabela-wrapper">
        <table>
          <caption class="sr-only">Lista de encomendas</caption>
          <thead><tr>
            <th style="width:36px;"></th><th>Cliente</th><th>Descrição</th><th>Valor</th><th>Prazo</th><th>Status</th><th>Ações</th>
          </tr></thead>
          <tbody>${e.map(e=>this.renderLinha(e)).join(``)}</tbody>
        </table>
      </div>`}renderCards(e){return`
      <div class="grid-encomendas stagger-in">
        ${e.map(e=>{let t=Xi[e.status]||{rotulo:e.status,cor:`#6b7280`},n=e.prazo?Math.ceil((new Date(e.prazo)-new Date)/864e5):null,r=n===null?`—`:`<span style="${n<0?`color:#dc2626;font-weight:600;`:n<=15?`color:#f59e0b;`:``}">${k(e.prazo)}${n<0?` (atrasado)`:` (${n}d)`}</span>`;return`
            <div class="card-encomenda ${this.selecionados.has(e.id)?`selecionada`:``}">
              <div class="checkbox-bulk">
                <input type="checkbox" class="checkbox-item-enc" data-id="${e.id}" aria-label="Selecionar ${e.clienteNome||`encomenda`}" ${this.selecionados.has(e.id)?`checked`:``}>
              </div>
              <div class="enc-header">
                <strong>${B(e.clienteNome)||`—`}</strong>
                ${e.clienteEmail?`<span class="enc-email">${B(e.clienteEmail)}</span>`:``}
              </div>
              <div class="enc-descricao">${fi(e.descricao)||`—`}</div>
              <div class="enc-valor-prazo">
                <span class="enc-valor">${O(e.valor||0)}</span>
                <span class="enc-prazo">${r}</span>
              </div>
              <span class="tag-status ${this.classeStatus(e.status)}" style="background:${t.cor}20;color:${t.cor};">${t.rotulo}</span>
              <div class="enc-acoes">
                <button class="btn-miniatura btn-portal-enc" data-id="${e.id}" title="Portal" aria-label="Gerar link do portal"><i class="fas fa-link"></i></button>
                <button class="btn-miniatura btn-editar-enc" data-id="${e.id}" title="Editar" aria-label="Editar encomenda"><i class="fas fa-pen"></i></button>
                <button class="btn-miniatura btn-atualizar-enc" data-id="${e.id}" title="Atualizar" aria-label="Adicionar atualização"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn-miniatura btn-exportar-enc" data-id="${e.id}" title="Exportar" aria-label="Baixar portal HTML"><i class="fas fa-download"></i></button>
                <button class="btn-miniatura btn-remover-enc" data-id="${e.id}" title="Excluir" aria-label="Excluir encomenda" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
              </div>
            </div>`}).join(``)}
      </div>`}rotuloStatus(e){return Xi[e]?.rotulo||e}classeStatus(e){return{entregue:`vendida`}[e]||``}filtrarEncomendas(){let e=this.dataStore.listar(`encomendas`)||[];if(this.filtroStatus&&(e=e.filter(e=>e.status===this.filtroStatus)),this.busca){let t=this.busca.toLowerCase();e=e.filter(e=>(e.clienteNome||``).toLowerCase().includes(t)||(e.descricao||``).toLowerCase().includes(t))}return e.sort((e,t)=>new Date(t.criadoEm||0)-new Date(e.criadoEm||0))}renderLinha(e){let t=Xi[e.status]||{rotulo:e.status,cor:`#6b7280`},n=e.prazo?Math.ceil((new Date(e.prazo)-new Date)/864e5):null,r=n===null?`—`:`<span style="${n<0?`color:#dc2626;font-weight:600;`:n<=15?`color:#f59e0b;`:``}">${k(e.prazo)}${n<0?` (atrasado)`:` (${n}d)`}</span>`;return`
      <tr class="${this.selecionados.has(e.id)?`linha-selecionada`:``}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-enc" data-id="${e.id}" aria-label="Selecionar ${e.clienteNome||`encomenda`}" ${this.selecionados.has(e.id)?`checked`:``}>
        </td>
        <td><strong>${B(e.clienteNome)||`—`}</strong>${e.clienteEmail?`<br><span style="font-size:0.75rem;color:var(--text-muted);">${B(e.clienteEmail)}</span>`:``}</td>
        <td>${fi(e.descricao)||`—`}</td>
        <td>${O(e.valor||0)}</td>
        <td>${r}</td>
        <td><span class="tag-status ${this.classeStatus(e.status)}" style="background:${t.cor}20;color:${t.cor};">${t.rotulo}</span></td>
        <td>
          <button class="btn-miniatura btn-portal-enc" data-id="${e.id}" title="Gerar link do portal" aria-label="Gerar link do portal"><i class="fas fa-link"></i></button>
          <button class="btn-miniatura btn-editar-enc" data-id="${e.id}" title="Editar" aria-label="Editar encomenda"><i class="fas fa-pen"></i></button>
          <button class="btn-miniatura btn-atualizar-enc" data-id="${e.id}" title="Adicionar atualização" aria-label="Adicionar atualização"><i class="fas fa-pencil-alt"></i></button>
          <button class="btn-miniatura btn-exportar-enc" data-id="${e.id}" title="Baixar portal HTML" aria-label="Baixar portal HTML"><i class="fas fa-download"></i></button>
          <button class="btn-miniatura btn-remover-enc" data-id="${e.id}" title="Excluir" aria-label="Excluir encomenda" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `}renderBarraBulk(){return`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} encomenda${this.selecionados.size===1?``:`s`} selecionada${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportEnc"><i class="fas fa-file"></i> Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirEnc">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarEnc">✕ Cancelar</button>
        </div>
      </div>
    `}async bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`exportar`:{let e=t.map(e=>this.dataStore.buscarPorId(`encomendas`,e)).filter(Boolean),n=[[`cliente`,`email`,`descricao`,`valor`,`prazo`,`status`].join(`,`),...e.map(e=>[e.clienteNome,e.clienteEmail||``,e.descricao||``,e.valor||0,e.prazo||``,e.status].map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`))].join(`
`),r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8`}),i=document.createElement(`a`);i.href=URL.createObjectURL(r),i.download=`encomendas-${new Date().toISOString().slice(0,10)}.csv`,i.click(),URL.revokeObjectURL(i.href),A(`${e.length} encomenda(s) exportada(s)`,`sucesso`);break}case`excluir`:if(!await R(`Excluir ${t.length} encomenda(s) permanentemente?`))return;t.forEach(e=>this.dataStore.remover(`encomendas`,e)),A(`${t.length} encomenda(s) excluída(s)`,`sucesso`);break}this.selecionados.clear(),this.rerenderizar()}}abrirModalForm(e){let t=e||{},n=!!t.id,r=G().items;this._encImagens=t.imagens?[...t.imagens]:[],this._encImagensRef=[];let i=r.map(e=>`<option value="${e.id}" ${e.nome===t.clienteNome?`selected`:``}>${e.nome} (${e.email||``})</option>`).join(``),a=U.map(e=>`<option value="${e}" ${t.status===e?`selected`:``}>${this.rotuloStatus(e)}</option>`).join(``),o=t.status&&!U.includes(t.status)?`<option value="${t.status}" selected>${t.status}</option>`:``;N(`
      <h3>${n?`<i class="fas fa-pen"></i> Editar`:`<i class="fas fa-box"></i> Nova`} Encomenda</h3>
      <form id="formEncomenda">
        <div class="campo-form"><label>Cliente</label>
          <div style="display:flex;gap:6px;">
            <select id="encClienteSelect" aria-label="Cliente" style="flex:1;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
              <option value="">— Digitar nome manualmente —</option>
              ${i}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Nome do Cliente</label><input type="text" id="encClienteNome" value="${B(t.clienteNome||``)}" aria-label="Nome do Cliente" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Email</label><input type="email" id="encClienteEmail" value="${B(t.clienteEmail||``)}" aria-label="Email" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Telefone</label><input type="text" id="encClienteTel" value="${B(t.clienteTelefone||``)}" aria-label="Telefone" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form"><label>Descrição</label><textarea id="encDescricao" aria-label="Descrição" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:60px;background:var(--bg);color:var(--text);">${B(t.descricao||``)}</textarea></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Valor (R$)</label><input type="number" id="encValor" value="${t.valor||0}" min="0" step="0.01" aria-label="Valor" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Prazo</label><input type="date" id="encPrazo" value="${t.prazo?new Date(t.prazo).toISOString().slice(0,10):``}" aria-label="Prazo" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form"><label>Status</label>
          <select id="encStatus" aria-label="Status" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
            ${o}${a}
          </select>
        </div>
        <div class="campo-form">
          <label>Fotos da obra/referências</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
            <input type="file" id="encImagens" accept="image/*" multiple aria-label="Fotos da obra" style="display:none">
            <button type="button" class="btn-secundario" id="btnEncAddImagens" style="font-size:0.8rem;padding:6px 12px;"><i class="fas fa-camera"></i> Adicionar Fotos</button>
            <span id="encContagemImagens" style="font-size:0.8rem;color:var(--text-muted);">${(t.imagens||[]).length>0?`${t.imagens.length} foto(s)`:``}</span>
          </div>
          <div id="encPreviewImagens" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
            ${t.imagens&&t.imagens.length>0?t.imagens.map((e,t)=>`
              <div style="position:relative;width:60px;height:60px;border-radius:6px;overflow:hidden;border:1px solid var(--border);">
                <img src="${e.startsWith(`idb:`)?va:e}" style="width:100%;height:100%;object-fit:cover;">
                <button type="button" class="btn-remover-foto-enc" data-idx="${t}" aria-label="Remover foto" style="position:absolute;top:1px;right:1px;width:18px;height:18px;border-radius:50%;border:none;background:#dc2626;color:#fff;font-size:0.6rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
              </div>`).join(``):``}
          </div>
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarEnc">Cancelar</button>
          <button type="submit" class="btn-primario">${n?`Salvar`:`Criar`}</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarEnc`)?.addEventListener(`click`,P),document.getElementById(`encClienteSelect`)?.addEventListener(`change`,e=>{let t=r.find(t=>t.id===e.target.value);t&&(document.getElementById(`encClienteNome`).value=t.nome,document.getElementById(`encClienteEmail`).value=t.email||``,document.getElementById(`encClienteTel`).value=t.telefone||``)});let s=document.getElementById(`encImagens`);document.getElementById(`btnEncAddImagens`)?.addEventListener(`click`,()=>s?.click()),s?.addEventListener(`change`,e=>{Array.from(e.target.files).filter(e=>e.type.startsWith(`image/`)).forEach(e=>{let t=new FileReader;t.onload=async e=>{let t=e.target.result;try{let e=await imageStore.salvar(t),n=await imageStore.carregar(e.medium);this._encImagens.push(n),this._encImagensRef.push(e.medium)}catch{this._encImagens.push(t),this._encImagensRef.push(``)}this._renderEncPreview()},t.readAsDataURL(e)}),e.target.value=``}),document.getElementById(`encPreviewImagens`)?.addEventListener(`click`,e=>{let t=e.target.closest(`.btn-remover-foto-enc`);if(t){let e=parseInt(t.dataset.idx);this._encImagens.splice(e,1),this._encImagensRef.splice(e,1),this._renderEncPreview()}}),document.getElementById(`formEncomenda`)?.addEventListener(`submit`,async t=>{t.preventDefault(),await this.salvarEncomenda(e)})}_renderEncPreview(){let e=document.getElementById(`encPreviewImagens`),t=document.getElementById(`encContagemImagens`);if(e){if(this._encImagens.length===0){e.innerHTML=``,t&&(t.textContent=``);return}e.innerHTML=this._encImagens.map((e,t)=>`
      <div style="position:relative;width:60px;height:60px;border-radius:6px;overflow:hidden;border:1px solid var(--border);">
        <img src="${e}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
        <button type="button" class="btn-remover-foto-enc" data-idx="${t}" aria-label="Remover foto" style="position:absolute;top:1px;right:1px;width:18px;height:18px;border-radius:50%;border:none;background:#dc2626;color:#fff;font-size:0.6rem;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>`).join(``),t&&(t.textContent=`${this._encImagens.length} foto(s)`)}}abrirModalAtualizacao(e){let t=this.dataStore.buscarPorId(`encomendas`,e);if(!t){A(`Encomenda não encontrada.`,`aviso`);return}let n=U.map(e=>`<option value="${e}" ${t.status===e?`selected`:``}>${this.rotuloStatus(e)}</option>`).join(``);N(`
      <h3><i class="fas fa-pencil-alt"></i> Atualizar Status — ${B(t.descricao)}</h3>
      <form id="formAtualizacao">
        <div class="campo-form"><label>Novo Status</label>
          <select id="atuStatus" aria-label="Novo status" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">${n}</select>
        </div>
        <div class="campo-form"><label>Mensagem para o cliente</label>
          <textarea id="atuMensagem" aria-label="Mensagem para o cliente" placeholder="Ex: Iniciei a pintura, as cores estão secando..." style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:80px;background:var(--bg);color:var(--text);"></textarea>
        </div>
        <div class="campo-form" style="font-size:0.8rem;color:var(--text-muted);">
          <i class="fas fa-lightbulb"></i> Esta atualização ficará visível no portal do cliente.
        </div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarAtu">Cancelar</button>
          <button type="submit" class="btn-primario">Salvar Atualização</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarAtu`)?.addEventListener(`click`,P),document.getElementById(`formAtualizacao`)?.addEventListener(`submit`,e=>{e.preventDefault(),this.salvarAtualizacao(t)})}abrirModalPortais(){let e=this.dataStore.listar(`portais`)||[],t=G().items,n=this.dataStore.listar(`encomendas`)||[],r=e.length>0?e.map(e=>{let t=n.filter(t=>t.clienteNome===e.clienteNome).length;return`
        <div class="portal-item">
          <div class="portal-item-info">
            <strong>${B(e.clienteNome)}</strong>
            <span class="texto-ajuda">${t} encomenda${t>1?`s`:``} · ${e.ativo?`🟢 Ativo`:`🔴 Inativo`}</span>
            <span class="texto-ajuda">Último acesso: ${e.ultimoAcesso?k(e.ultimoAcesso):`Nunca`}</span>
          </div>
          <div class="portal-item-acoes">
            <input type="text" readonly value="${window.location.origin}${window.location.pathname}#portal?token=${e.token}" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:0.75rem;width:240px;background:var(--bg);color:var(--text);" onclick="this.select()">
            <button class="btn-miniatura btn-copiar-link" data-link="${window.location.origin}${window.location.pathname}#portal?token=${e.token}" title="Copiar link" aria-label="Copiar link"><i class="fas fa-clipboard"></i></button>
            <button class="btn-miniatura btn-toggle-portal" data-id="${e.id}" title="${e.ativo?`Desativar`:`Ativar`}" aria-label="${e.ativo?`Desativar portal`:`Ativar portal`}">${e.ativo?`<i class="fas fa-unlock"></i>`:`<i class="fas fa-lock"></i>`}</button>
            <button class="btn-miniatura btn-remover-portal" data-id="${e.id}" title="Remover" aria-label="Remover portal" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `}).join(``):`<p style="color:var(--text-muted);text-align:center;padding:12px;">Nenhum link de acesso gerado ainda.</p>`,i=t.filter(e=>n.some(t=>t.clienteNome===e.nome)).map(e=>`<option value="${e.id}">${e.nome}</option>`).join(``);N(`
      <h3><i class="fas fa-link"></i> Links de Acesso do Cliente</h3>
      <p class="texto-ajuda" style="margin-bottom:12px;">Gere links para que seus clientes acompanhem o status das encomendas.</p>
      <div class="portais-lista">${r}</div>
      <hr style="margin:12px 0;border-color:var(--border);">
      <h4 style="font-size:0.85rem;margin:0 0 8px;">Gerar novo link</h4>
      <div style="display:flex;gap:8px;align-items:center;">
        <select id="selClientePortal" aria-label="Selecionar cliente" style="flex:1;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
          ${i||`<option value="">Nenhum cliente com encomenda</option>`}
        </select>
        <button class="btn-primario" id="btnGerarPortal"><i class="fas fa-link"></i> Gerar Link</button>
      </div>
      <hr style="margin:12px 0;border-color:var(--border);">
      <h4 style="font-size:0.85rem;margin:0 0 8px;">Página autônoma do portal</h4>
      <p class="texto-ajuda" style="margin-bottom:8px;">Gere um arquivo HTML completo para hospedar em serviços gratuitos como GitHub Pages ou Vercel.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <select id="selClientePortalExport" aria-label="Selecionar cliente para exportar" style="flex:1;min-width:150px;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
          ${i||`<option value="">Nenhum cliente com encomenda</option>`}
        </select>
        <button class="btn-primario" id="btnExportarPortal"><i class="fas fa-download"></i> Baixar HTML</button>
        <button class="btn-secundario" id="btnCopiarInstrucoes"><i class="fas fa-copy"></i> Instruções</button>
      </div>
      <div class="modal-acoes" style="margin-top:16px;">
        <button class="btn-secundario" id="btnFecharPortais">Fechar</button>
      </div>
    `),document.getElementById(`btnFecharPortais`)?.addEventListener(`click`,P),document.getElementById(`btnGerarPortal`)?.addEventListener(`click`,()=>this.gerarLinkPortal()),document.getElementById(`btnExportarPortal`)?.addEventListener(`click`,()=>this.exportarPortalHTML()),document.getElementById(`btnCopiarInstrucoes`)?.addEventListener(`click`,()=>{navigator.clipboard.writeText(`Para hospedar a página do portal:

1. Crie um repositório no GitHub
2. Faça upload do arquivo portal-cliente.html
3. Ative o GitHub Pages em Settings > Pages
4. Use o link: https://seuusuario.github.io/seurepo/portal-cliente.html

Ou hospede no Vercel arrastando o arquivo para vercel.com/new`).then(()=>A(`Instruções copiadas!`,`info`)).catch(()=>A(`Erro ao copiar.`,`erro`))}),document.querySelector(`.portais-lista`)?.addEventListener(`click`,e=>{if(e.target.closest(`.btn-copiar-link`)){let t=e.target.closest(`.btn-copiar-link`).dataset.link;navigator.clipboard.writeText(t).then(()=>A(`Link copiado!`,`info`)).catch(()=>A(`Erro ao copiar.`,`erro`))}e.target.closest(`.btn-toggle-portal`)&&this.togglePortal(e.target.closest(`.btn-toggle-portal`).dataset.id),e.target.closest(`.btn-remover-portal`)&&this.removerPortal(e.target.closest(`.btn-remover-portal`).dataset.id)})}async salvarEncomenda(e){let t={clienteNome:document.getElementById(`encClienteNome`)?.value?.trim()||``,clienteEmail:document.getElementById(`encClienteEmail`)?.value?.trim()||``,clienteTelefone:document.getElementById(`encClienteTel`)?.value?.trim()||``,descricao:document.getElementById(`encDescricao`)?.value?.trim()||``,valor:Number(document.getElementById(`encValor`)?.value)||0,prazo:document.getElementById(`encPrazo`)?.value||``,status:document.getElementById(`encStatus`)?.value||`recebido`};if(!t.clienteNome||!t.descricao){A(`Preencha nome do cliente e descrição.`,`aviso`);return}let n=[];for(let e=0;e<(this._encImagens||[]).length;e++){let t=this._encImagens[e],r=this._encImagensRef?.[e];if(r)n.push(r);else if(t&&t.startsWith(`data:`))try{let e=await imageStore.salvar(t);n.push(e.medium)}catch{n.push(t)}else n.push(t||``)}t.imagens=n,e&&e.id?(t.atualizacoes=this.dataStore.buscarPorId(`encomendas`,e.id)?.atualizacoes||[],this.dataStore.atualizar(`encomendas`,e.id,t),A(`Encomenda atualizada!`,`sucesso`),Q.registrar(`atualizacao`,`Encomenda atualizada`,t.clienteNome,`atualizacao`)):(t.atualizacoes=[{data:new Date().toISOString(),status:`recebido`,mensagem:`Pedido registrado.`}],this.dataStore.adicionar(`encomendas`,t),A(`Encomenda criada!`,`sucesso`),Q.registrar(`criacao`,`Nova encomenda`,t.clienteNome,`criacao`)),P(),this.rerenderizar()}salvarAtualizacao(e,t){let n=t||document.getElementById(`atuStatus`)?.value||e.status,r=t?`Status alterado via Kanban.`:document.getElementById(`atuMensagem`)?.value?.trim()||``,i=e.atualizacoes||[];i.push({data:new Date().toISOString(),status:n,mensagem:r||`Status atualizado.`}),this.dataStore.atualizar(`encomendas`,e.id,{status:n,atualizacoes:i}),A(`Encomenda movida para "${this.rotuloStatus(n)}"`,`sucesso`),Q.registrar(`atualizacao`,`Encomenda: ${n}`,e.clienteNome,`atualizacao`),P(),this.rerenderizar()}async _moverParaStatus(e,t){let n=this.dataStore.buscarPorId(`encomendas`,e);if(!n||n.status===t)return;let r=n.atualizacoes||[];r.push({data:new Date().toISOString(),status:t,mensagem:`Status alterado via Kanban.`}),this.dataStore.atualizar(`encomendas`,e,{status:t,atualizacoes:r}),A(`Encomenda movida para "${this.rotuloStatus(t)}"`,`sucesso`),Q.registrar(`atualizacao`,`Encomenda: ${t}`,n.clienteNome,`atualizacao`),this.rerenderizar()}gerarLinkPortal(e){let t=q();if(!t.supabaseUrl||!t.supabasePublishableKey){A(`Para compartilhar um portal em outro dispositivo, configure o Portal Remoto nas Configurações. Seus dados continuam locais.`,`aviso`);return}let n,r;if(e){if(r=this.dataStore.buscarPorId(`encomendas`,e),!r){A(`Encomenda não encontrada.`,`aviso`);return}n=G().items.find(e=>e.nome===r.clienteNome)||{id:r.clienteEmail||r.id,nome:r.clienteNome}}else{let e=document.getElementById(`selClientePortal`);if(!e||!e.value){A(`Selecione um cliente.`,`aviso`);return}if(n=G().items.find(t=>t.id===e.value),!n){A(`Cliente não encontrado.`,`aviso`);return}}let i=this.dataStore.listar(`portais`)||[],a=e?i.find(t=>t.encomendaId===e):i.find(e=>e.clienteId===n.id&&!e.encomendaId);if(a){let e=window.location.origin+window.location.pathname+`#portal?token=`+a.token;if(a.ativo){A(`Link já existe: `+e,`aviso`);return}a.ativo=!0,this.dataStore.salvar(),A(`Link reativado: `+e,`sucesso`),this.rerenderizar(),P();return}let o=new Uint8Array(32);crypto.getRandomValues(o);let s=Array.from(o,e=>e.toString(16).padStart(2,`0`)).join(``),c={id:`portal_`+Date.now(),clienteId:n.id,encomendaId:e||``,clienteNome:n.nome,token:s,ativo:!0,criadoEm:new Date().toISOString(),ultimoAcesso:``};this.dataStore.dados.portais.push(c),this.dataStore.salvar(),A(`Link gerado!`,`sucesso`),Q.registrar(`criacao`,`Link de portal gerado`,e&&r?.descricao||n.nome,`criacao`),this.rerenderizar(),P()}togglePortal(e){let t=this.dataStore.buscarPorId(`portais`,e);t&&(t.ativo=!t.ativo,this.dataStore.salvar(),this.rerenderizar(),P())}async removerPortal(e){if(!await R(`Remover este link de acesso?`))return;let t=this.dataStore.buscarPorId(`portais`,e);this.dataStore.remover(`portais`,e);let{dataStore:n}=this;z(`Link removido.`,()=>{n.dados.portais.push(t),n.salvar()}),this.rerenderizar(),P()}async exportarPortalHTML(e){let t=e?this.dataStore.buscarPorId(`encomendas`,e):null;if(!t){A(`Selecione uma encomenda para exportar.`,`aviso`);return}let n=this.dataStore.obter(`configuracoes`)||{};j(!0);let r=[];for(let e of t.imagens||[])if(e&&e.startsWith(`idb:`))try{let t=await imageStore.carregar(e);r.push(t||e)}catch{r.push(e)}else r.push(e||``);let i={...t,imagens:r.filter(Boolean)},a={artista:n.nomeArtista||`Artista`,contatoEmail:n.email||``,contatoTel:n.contato||``,encomenda:i};try{let e=await(await fetch(`portal-cliente.html`)).text(),n=JSON.stringify(a),r=e.indexOf(`<script id="portalData" type="application/json">`),i=e.indexOf(`<\/script>`,r);hi(e.slice(0,r+48)+`
`+n+`
`+e.slice(i),`encomenda-${t.id.replace(/[^a-zA-Z0-9]/g,`-`).toLowerCase()}.html`)}catch{hi(gi(a),`encomenda-${t.id.replace(/[^a-zA-Z0-9]/g,`-`).toLowerCase()}.html`)}M()}async excluirEncomenda(e){if(!await R(`Excluir esta encomenda permanentemente?`))return;let t=this.dataStore.buscarPorId(`encomendas`,e);this.dataStore.remover(`encomendas`,e);let{dataStore:n}=this;z(`Encomenda excluída.`,()=>{n.dados.encomendas.push(t),n.salvar()}),this.rerenderizar()}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`);document.getElementById(`btnNovaEncomenda`)?.addEventListener(`click`,()=>this.abrirModalForm(null));let t=e=>{this.modo=e,localStorage.setItem(`atelier-crm-view-mode-encomendas`,e),this.rerenderizar()};document.getElementById(`btnListaEnc`)?.addEventListener(`click`,()=>t(`lista`)),document.getElementById(`btnGridEnc`)?.addEventListener(`click`,()=>t(`grid`)),document.getElementById(`btnKanbanEnc`)?.addEventListener(`click`,()=>t(`kanban`)),document.getElementById(`buscaEncomenda`)?.addEventListener(`input`,Tr(e=>{this.busca=e.target.value,this.rerenderizar(!0)},250)),document.getElementById(`filtroStatusEncomenda`)?.addEventListener(`change`,e=>{this.filtroStatus=e.target.value,this.rerenderizar()}),document.getElementById(`btnPortaisCliente`)?.addEventListener(`click`,()=>this.abrirModalPortais()),document.getElementById(`chkMostrarCanceladas`)?.addEventListener(`change`,e=>{this.mostrarCanceladas=e.target.checked,this.rerenderizar()});let n=document.getElementById(`selectAllEnc`);n&&n.addEventListener(`change`,e=>{let t=this.filtrarEncomendas();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item-enc`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkExportEnc`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkExcluirEnc`)?.addEventListener(`click`,()=>this.bulkAcao(`excluir`)),document.getElementById(`bulkCancelarEnc`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()}),document.querySelectorAll(`.btn-portal-enc`).forEach(e=>{e.addEventListener(`click`,()=>{let t=this.dataStore.buscarPorId(`encomendas`,e.dataset.id);if(!t)return;let n=(this.dataStore.listar(`portais`)||[]).find(e=>e.encomendaId===t.id);if(n&&n.ativo){let e=window.location.origin+window.location.pathname+`#portal?token=`+n.token;navigator.clipboard.writeText(e).then(()=>A(`Link copiado: `+e,`info`)).catch(()=>{})}else this.gerarLinkPortal(t.id)})}),document.querySelectorAll(`.btn-exportar-enc`).forEach(e=>{e.addEventListener(`click`,()=>this.exportarPortalHTML(e.dataset.id))}),document.querySelectorAll(`.btn-editar-enc`).forEach(e=>{e.addEventListener(`click`,()=>{let t=this.dataStore.buscarPorId(`encomendas`,e.dataset.id);t&&this.abrirModalForm(t)})}),document.querySelectorAll(`.btn-atualizar-enc`).forEach(e=>{e.addEventListener(`click`,()=>this.abrirModalAtualizacao(e.dataset.id))}),document.querySelectorAll(`.btn-remover-enc`).forEach(e=>{e.addEventListener(`click`,()=>this.excluirEncomenda(e.dataset.id))});let r=document.getElementById(`kanbanBoardEnc`);r&&(r.querySelectorAll(`.kanban-card`).forEach(e=>{e.addEventListener(`dragstart`,t=>{e.dataset.id,t.dataTransfer.setData(`text/plain`,e.dataset.id),t.dataTransfer.effectAllowed=`move`,e.classList.add(`arrastando`)}),e.addEventListener(`dragend`,()=>{e.classList.remove(`arrastando`),r.querySelectorAll(`.kanban-coluna`).forEach(e=>e.classList.remove(`kanban-coluna--drag-over`))})}),r.querySelectorAll(`.kanban-coluna-corpo`).forEach(e=>{e.addEventListener(`dragover`,t=>{t.preventDefault(),t.dataTransfer.dropEffect=`move`,e.closest(`.kanban-coluna`)?.classList.add(`kanban-coluna--drag-over`)}),e.addEventListener(`dragleave`,()=>{e.closest(`.kanban-coluna`)?.classList.remove(`kanban-coluna--drag-over`)}),e.addEventListener(`drop`,t=>{t.preventDefault();let n=e.closest(`.kanban-coluna`);n?.classList.remove(`kanban-coluna--drag-over`);let r=t.dataTransfer.getData(`text/plain`),i=n?.dataset.status;r&&i&&this._moverParaStatus(r,i)})}),r.addEventListener(`click`,e=>{let t=e.target.closest(`.kanban-mobile-menu-btn`);if(t){e.stopPropagation();let n=t.dataset.id;r.querySelectorAll(`.kanban-mobile-dropdown.visivel`).forEach(e=>{e.dataset.id!==n&&e.classList.remove(`visivel`)}),r.querySelector(`.kanban-mobile-dropdown[data-id="${n}"]`)?.classList.toggle(`visivel`);return}let n=e.target.closest(`.kanban-mover-btn`);if(n){let e=n.dataset.id,t=n.dataset.status;e&&t&&this._moverParaStatus(e,t);return}r.querySelectorAll(`.kanban-mobile-dropdown.visivel`).forEach(e=>e.classList.remove(`visivel`))}))}},Qi=class{constructor(){this.images=[],this.currentIndex=0,this.isOpen=!1,this.scale=1,this.minScale=.5,this.maxScale=5,this.offsetX=0,this.offsetY=0,this.isDragging=!1,this.dragStart={x:0,y:0},this.dragOffset={x:0,y:0},this.touchStartDistance=0,this.touchStartScale=1,this.swipeStartX=0,this.swipeStartY=0,this.isSwiping=!1,this.autoPlayTimer=null,this.autoPlayInterval=3500,this.zoomBtn=null,this.thumbScrollPos=0,this._onKeyDown=null,this._onMouseMove=null,this._onMouseUp=null,this._onTouchStart=null,this._onTouchMove=null,this._onTouchEnd=null,this._onWheel=null,this.overlay=null}open(e,t=0){!e||e.length===0||(this.images=e,this.currentIndex=Math.max(0,Math.min(t,e.length-1)),this.scale=1,this.offsetX=0,this.offsetY=0,this.isOpen=!0,document.body.style.overflow=`hidden`,this._render(),this._bindEvents(),this._showImage())}close(){this.isOpen&&(this.isOpen=!1,this.stopAutoPlay(),this._unbindEvents(),this.overlay&&this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),this.overlay=null,document.body.style.overflow=``)}navigate(e){let t=(this.currentIndex+e+this.images.length)%this.images.length;this.currentIndex=t,this.scale=1,this.offsetX=0,this.offsetY=0,this._showImage(),this._updateThumbActive()}zoomIn(){this._setScale(this.scale*1.3)}zoomOut(){this._setScale(this.scale/1.3)}resetZoom(){this._setScale(1),this.offsetX=0,this.offsetY=0,this._applyTransform()}toggleAutoPlay(){this.autoPlayTimer?this.stopAutoPlay():this.startAutoPlay()}startAutoPlay(){if(this.autoPlayTimer||this.images.length<=1)return;this.autoPlayTimer=setInterval(()=>this.navigate(1),this.autoPlayInterval);let e=this.overlay?.querySelector(`.lb-ctrl-autoplay`);e&&(e.textContent=`⏸`,e.classList.add(`ativo`))}stopAutoPlay(){this.autoPlayTimer&&(clearInterval(this.autoPlayTimer),this.autoPlayTimer=null);let e=this.overlay?.querySelector(`.lb-ctrl-autoplay`);e&&(e.textContent=`▶`,e.classList.remove(`ativo`))}_render(){let e=document.querySelector(`.lb-overlay`);e&&e.remove();let t=document.createElement(`div`);t.className=`lb-overlay`,t.innerHTML=`
      <div class="lb-topbar">
        <span class="lb-counter">${this.currentIndex+1} / ${this.images.length}</span>
        <div class="lb-top-actions">
          <button class="lb-btn lb-ctrl-autoplay" title="Slideshow" aria-label="Iniciar slideshow">▶</button>
          <button class="lb-btn lb-ctrl-download" title="Download" aria-label="Baixar imagem">⬇</button>
          <button class="lb-btn lb-ctrl-share" title="Compartilhar" aria-label="Compartilhar"><i class="fas fa-link"></i></button>
          <button class="lb-btn lb-ctrl-close" title="Fechar (ESC)" aria-label="Fechar">✕</button>
        </div>
      </div>
      <div class="lb-main">
        <div class="lb-img-container">
          <img class="lb-img" alt="">
          <div class="lb-loader"></div>
          <div class="lb-caption">
            <div class="lb-caption-title"></div>
            <div class="lb-caption-sub"></div>
          </div>
        </div>
      </div>
      <button class="lb-nav lb-nav-prev" title="Anterior (←)" aria-label="Imagem anterior">◀</button>
      <button class="lb-nav lb-nav-next" title="Próximo (→)" aria-label="Próxima imagem">▶</button>
      <div class="lb-thumbstrip">
        <div class="lb-thumb-track"></div>
      </div>
      <div class="lb-zoom-indicator">${Math.round(this.scale*100)}%</div>
    `,document.body.appendChild(t),this.overlay=t,t.querySelector(`.lb-ctrl-close`)?.addEventListener(`click`,()=>this.close()),t.querySelector(`.lb-nav-prev`)?.addEventListener(`click`,()=>this.navigate(-1)),t.querySelector(`.lb-nav-next`)?.addEventListener(`click`,()=>this.navigate(1)),t.querySelector(`.lb-ctrl-autoplay`)?.addEventListener(`click`,()=>this.toggleAutoPlay()),t.querySelector(`.lb-ctrl-download`)?.addEventListener(`click`,()=>this._download()),t.querySelector(`.lb-ctrl-share`)?.addEventListener(`click`,()=>this._share()),this._renderThumbs(),t.querySelector(`.lb-main`)?.addEventListener(`dblclick`,e=>{this.scale>1?this.resetZoom():this._setScale(2.5)})}_renderThumbs(){let e=this.overlay?.querySelector(`.lb-thumb-track`);e&&(e.innerHTML=this.images.map((e,t)=>`
      <div class="lb-thumb ${t===this.currentIndex?`ativo`:``}" data-idx="${t}">
        <img src="${e.src}" alt="Miniatura da obra" loading="lazy">
      </div>
    `).join(``),e.querySelectorAll(`.lb-thumb`).forEach(e=>{e.addEventListener(`click`,()=>{this.currentIndex=parseInt(e.dataset.idx),this.scale=1,this.offsetX=0,this.offsetY=0,this._showImage(),this._updateThumbActive()})}),this._scrollThumbIntoView())}_updateThumbActive(){this.overlay?.querySelectorAll(`.lb-thumb`).forEach(e=>{e.classList.toggle(`ativo`,parseInt(e.dataset.idx)===this.currentIndex)}),this._scrollThumbIntoView();let e=this.overlay?.querySelector(`.lb-counter`);e&&(e.textContent=`${this.currentIndex+1} / ${this.images.length}`)}_scrollThumbIntoView(){let e=this.overlay?.querySelector(`.lb-thumb.ativo`);e&&e.scrollIntoView({behavior:`smooth`,inline:`center`,block:`nearest`})}_showImage(){if(!this.overlay)return;let e=this.images[this.currentIndex],t=this.overlay.querySelector(`.lb-img`),n=this.overlay.querySelector(`.lb-loader`),r=this.overlay.querySelector(`.lb-caption-title`),i=this.overlay.querySelector(`.lb-caption-sub`);if(!t)return;n.style.display=`block`,t.style.opacity=`0`;let a=new Image;a.onload=()=>{t.src=e.src,t.alt=e.title||`Imagem da obra`,t.style.opacity=`1`,n&&(n.style.display=`none`),this._applyTransform()},a.onerror=()=>{t.alt=`Erro ao carregar imagem`,t.style.opacity=`1`,n&&(n.style.display=`none`)},a.src=e.src;let o=[];e.title&&o.push(e.title),e.subtitle&&o.push(e.subtitle),r.textContent=o.join(` · `)||``,e.price?i.textContent=e.price:i.textContent=e.caption||``}_applyTransform(){let e=this.overlay?.querySelector(`.lb-img`);if(!e)return;e.style.transform=`translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`;let t=this.overlay?.querySelector(`.lb-zoom-indicator`);t&&(t.textContent=`${Math.round(this.scale*100)}%`)}_setScale(e){this.scale=Math.max(this.minScale,Math.min(this.maxScale,e)),this.scale<=1&&(this.offsetX=0,this.offsetY=0),this._applyTransform()}_calcZoomCenter(e,t){let n=this.overlay?.querySelector(`.lb-img`);if(!n)return;let r=n.getBoundingClientRect();return{cx:(e-r.left)/r.width,cy:(t-r.top)/r.height}}_download(){let e=this.images[this.currentIndex];if(!e||!e.src)return;let t=document.createElement(`a`);t.href=e.src,t.download=(e.title||`imagem`)+`.jpg`,document.body.appendChild(t),t.click(),document.body.removeChild(t),this._toast(`⬇ Imagem baixada`)}_share(){let e=this.images[this.currentIndex],t=e.title?`${e.title}${e.price?` - `+e.price:``}`:`Minha obra de arte`;navigator.share?navigator.share({title:t,text:t}).catch(()=>{}):navigator.clipboard?navigator.clipboard.writeText(t).then(()=>this._toast(`<i class="fas fa-link"></i> Info copiada!`)).catch(()=>{}):this._toast(`<i class="fas fa-clipboard"></i> `+t)}_toast(e){let t=document.createElement(`div`);t.className=`lb-toast`,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.remove()},2e3)}_bindEvents(){this._onKeyDown=e=>{if(this.isOpen)switch(e.key){case`Escape`:this.close();break;case`ArrowLeft`:this.navigate(-1);break;case`ArrowRight`:this.navigate(1);break;case`+`:case`=`:this.zoomIn();break;case`-`:this.zoomOut();break;case`0`:this.resetZoom();break;case` `:e.preventDefault(),this.toggleAutoPlay();break}},this._onMouseMove=e=>{if(!this.isDragging)return;let t=e.clientX-this.dragStart.x,n=e.clientY-this.dragStart.y;this.offsetX=this.dragOffset.x+t,this.offsetY=this.dragOffset.y+n,this._applyTransform()},this._onMouseUp=()=>{if(this.isSwiping){let e=this.dragStart.x-(this.dragOffset.x+(this.offsetX-this.dragOffset.x));Math.abs(e)>80&&this.navigate(e>0?1:-1)}this.isDragging=!1,this.isSwiping=!1},this._onWheel=e=>{this.isOpen&&(e.preventDefault(),e.deltaY<0?this.zoomIn():this.zoomOut())},window.addEventListener(`keydown`,this._onKeyDown),window.addEventListener(`mousemove`,this._onMouseMove),window.addEventListener(`mouseup`,this._onMouseUp),this.overlay?.addEventListener(`wheel`,this._onWheel,{passive:!1}),this.overlay?.querySelector(`.lb-main`)?.addEventListener(`mousedown`,e=>{e.target.closest(`.lb-caption`)||e.target.closest(`.lb-thumbstrip`)||(this.dragStart={x:e.clientX,y:e.clientY},this.dragOffset={x:this.offsetX,y:this.offsetY},this.isDragging=!0,this.isSwiping=this.scale<=1)}),this.overlay?.querySelector(`.lb-main`)?.addEventListener(`click`,e=>{if(!this.isSwiping&&!this.isDragging){let t=e.currentTarget.getBoundingClientRect(),n=e.clientX-t.left;n<t.width*.3?this.navigate(-1):n>t.width*.7&&this.navigate(1)}}),this._onTouchStart=e=>{if(e.touches.length===1)this.dragStart={x:e.touches[0].clientX,y:e.touches[0].clientY},this.dragOffset={x:this.offsetX,y:this.offsetY},this.swipeStartX=e.touches[0].clientX,this.swipeStartY=e.touches[0].clientY,this.isDragging=!0,this.isSwiping=this.scale<=1;else if(e.touches.length===2){this.isDragging=!1;let t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY;this.touchStartDistance=Math.sqrt(t*t+n*n),this.touchStartScale=this.scale}},this._onTouchMove=e=>{if(this.isOpen){if(e.preventDefault(),e.touches.length===1&&this.isDragging){let t=e.touches[0].clientX-this.dragStart.x,n=e.touches[0].clientY-this.dragStart.y;this.isSwiping&&this.scale,this.offsetX=this.dragOffset.x+t,this.offsetY=this.dragOffset.y+n,this._applyTransform()}else if(e.touches.length===2){let t=e.touches[0].clientX-e.touches[1].clientX,n=e.touches[0].clientY-e.touches[1].clientY,r=Math.sqrt(t*t+n*n);if(this.touchStartDistance>0){let e=r/this.touchStartDistance;this._setScale(this.touchStartScale*e)}}}},this._onTouchEnd=e=>{if(this.isSwiping&&this.scale<=1){let t=this.swipeStartX-(e.changedTouches[0]?.clientX||this.swipeStartX);Math.abs(t)>60?(this.navigate(t>0?1:-1),this.offsetX=0,this.offsetY=0,this._applyTransform()):(this.offsetX=0,this.offsetY=0,this._applyTransform())}this.isDragging=!1,this.isSwiping=!1},this.overlay?.addEventListener(`touchstart`,this._onTouchStart,{passive:!0}),this.overlay?.addEventListener(`touchmove`,this._onTouchMove,{passive:!1}),this.overlay?.addEventListener(`touchend`,this._onTouchEnd,{passive:!0})}_unbindEvents(){this._onKeyDown&&window.removeEventListener(`keydown`,this._onKeyDown),this._onMouseMove&&window.removeEventListener(`mousemove`,this._onMouseMove),this._onMouseUp&&window.removeEventListener(`mouseup`,this._onMouseUp),this.overlay&&(this._onWheel&&this.overlay.removeEventListener(`wheel`,this._onWheel),this._onTouchStart&&this.overlay.removeEventListener(`touchstart`,this._onTouchStart),this._onTouchMove&&this.overlay.removeEventListener(`touchmove`,this._onTouchMove),this._onTouchEnd&&this.overlay.removeEventListener(`touchend`,this._onTouchEnd)),this._onKeyDown=null,this._onMouseMove=null,this._onMouseUp=null,this._onWheel=null,this._onTouchStart=null,this._onTouchMove=null,this._onTouchEnd=null}},$i=null,ea=class extends H{constructor(e,t){super(e,t),this.abaAtiva=`exportar`,this.previewData=null,this.arquivoCarregado=null}render(){return`
      <div class="view-cabecalho">
        <div>
          <h2><i class="fas fa-box"></i> Exportar / Importar Dados</h2>
          <p class="subtitulo">Backup completo, exportação seletiva e restauração</p>
        </div>
      </div>
      <div class="ei-tabs">
        <button class="ei-tab ${this.abaAtiva===`exportar`?`ativo`:``}" data-ei-tab="exportar">📤 Exportar</button>
        <button class="ei-tab ${this.abaAtiva===`importar`?`ativo`:``}" data-ei-tab="importar">📥 Importar</button>
        <button class="ei-tab ${this.abaAtiva===`historico`?`ativo`:``}" data-ei-tab="historico">🕐 Histórico</button>
      </div>
      <div class="ei-painel">${this.renderPainel()}</div>
    `}renderPainel(){return this.abaAtiva===`exportar`?this.renderExportar():this.abaAtiva===`importar`?this.renderImportar():this.renderHistorico()}renderExportar(){let e=[`obras`,`clientes`,`vendas`,`encomendas`,`contatosProfissionais`,`interacoes`,`eventos`,`financas`],t={};e.forEach(e=>{t[e]=(this.dataStore.listar(e)||[]).length});let n=Object.values(t).reduce((e,t)=>e+t,0),r=e.map(e=>`
        <div class="ei-colecao-card" data-colecao="${e}">
          <div class="eicc-header"><span class="eicc-icone">${{obras:`<i class="fas fa-images"></i> Obras`,clientes:`<i class="fas fa-user"></i> Clientes`,vendas:`<i class="fas fa-dollar-sign"></i> Vendas`,encomendas:`<i class="fas fa-box"></i> Encomendas`,contatosProfissionais:`🤝 Contatos`,interacoes:`💬 Interações`,eventos:`🎪 Eventos`,financas:`<i class="fas fa-chart-line"></i> Finanças`}[e]||e}</span><span class="eicc-nome">${e}</span></div>
          <div class="eicc-qtd">${t[e]} registros</div>
          <div class="eicc-acoes">
            <button class="btn-miniatura ei-export-json" data-colecao="${e}" title="Exportar JSON"><i class="fas fa-clipboard"></i> JSON</button>
            <button class="btn-miniatura ei-export-csv" data-colecao="${e}" title="Exportar CSV"><i class="fas fa-chart-bar"></i> CSV</button>
          </div>
        </div>
      `).join(``);return`
      <div class="ei-export-grid">
        <div class="ei-secao-destaque">
          <div class="ei-destaque-icon"><i class="fas fa-save"></i></div>
          <div class="ei-destaque-info">
            <h3>Backup Completo</h3>
            <p>Exporta todos os dados do CRM em um único arquivo JSON.</p>
            <p style="font-size:0.8rem;color:var(--text-muted);">${n} registros · ${Object.keys(t).length} coleções</p>
          </div>
          <button class="btn-primario" id="eiBackupCompleto">📥 Exportar Tudo</button>
        </div>
        <div class="ei-secao">
          <h3 style="margin-bottom:12px;">Exportar por Coleção</h3>
          <div class="ei-cards-grid">${r}</div>
        </div>
      </div>
    `}renderImportar(){return`
      <div class="ei-import-area" id="eiDropZone">
        <div class="ei-drop-content">
          <div class="ei-drop-icon">📥</div>
          <p><strong>Arraste um arquivo JSON</strong> ou clique para selecionar</p>
          <p style="font-size:0.8rem;color:var(--text-muted);">Formatos aceitos: backup completo (.json) ou exportação parcial</p>
        </div>
        <input type="file" id="eiFileInput" accept=".json" style="display:none;">
      </div>
      <div id="eiPreviewContainer">${this.previewData&&this.arquivoCarregado?this.renderPreview():``}</div>
    `}renderPreview(){if(!this.previewData||!this.previewData.valido)return`<div class="ei-preview-box ei-preview-erro"><span><i class="fas fa-times"></i></span> Arquivo inválido: ${this.previewData?.erro||`formato não reconhecido`}</div>`;let e=this.previewData.colecoes.map(e=>`<tr><td>${e.nome}</td><td>${e.quantidade}</td><td>${e.quantidade>0?`<i class="fas fa-plus-circle"></i> Novos dados`:`—`}</td></tr>`).join(``),t=this.previewData.tipo===`completo`;return`
      <div class="ei-preview-box">
        <div class="ei-preview-header">
          <span class="ei-preview-badge ${t?`ei-bg-azul`:`ei-bg-verde`}">${t?`Backup Completo`:`Dados Parciais`}</span>
          <span style="color:var(--text-muted);font-size:0.85rem;">${this.arquivoCarregado}</span>
        </div>
        <table class="ei-preview-tabela">
          <caption class="sr-only">Pré-visualização dos dados a importar</caption>
          <thead><tr><th>Coleção</th><th>Registros</th><th>Ação</th></tr></thead>
          <tbody>${e}</tbody>
        </table>
        <div class="ei-import-opcoes">
          <label class="ei-checkbox"><input type="radio" name="eiModo" value="substituir" checked> Substituir dados existentes</label>
          <label class="ei-checkbox"><input type="radio" name="eiModo" value="mesclar"> Mesclar com dados existentes (mantém IDs duplicados)</label>
        </div>
        <div class="ei-import-acoes">
          <button class="btn-primario" id="eiConfirmarImport"><i class="fas fa-check"></i> Confirmar Importação</button>
          <button class="btn-secundario" id="eiCancelarImport">Cancelar</button>
        </div>
      </div>
    `}renderHistorico(){let e=this.dataStore.obterHistoricoExport()||[];if(e.length===0)return`<div class="estado-vazio"><div class="icone-vazio">🕐</div><p>Nenhum backup exportado ainda.</p></div>`;let t=e.map((e,t)=>{let n=e.tamanho>1024?`${(e.tamanho/1024).toFixed(1)} KB`:`${e.tamanho} B`;return`
        <tr>
          <td>${k(e.data)}</td>
          <td><span class="tag-status" style="background:var(--accent)15;color:var(--accent);">${typeof e.tipo==`string`?e.tipo:`completo`}</span></td>
          <td>${n}</td>
        </tr>
      `}).join(``);return`
      <div class="ei-historico">
        <p style="margin-bottom:12px;color:var(--text-muted);font-size:0.85rem;">Últimos ${e.length} backups exportados.</p>
        <div class="tabela-wrapper">
          <table>
            <caption class="sr-only">Histórico de exportações</caption>
            <thead><tr><th>Data</th><th>Tipo</th><th>Tamanho</th></tr></thead>
            <tbody>${t}</tbody>
          </table>
        </div>
      </div>
    `}aposRenderizar(){this.configurarTabs(),this.configurarExportar(),this.configurarImportar(),this.configurarHistorico()}configurarTabs(){document.querySelectorAll(`.ei-tab`).forEach(e=>{e.addEventListener(`click`,()=>{this.abaAtiva=e.dataset.eiTab;let t=document.querySelector(`.ei-painel`);t&&(t.innerHTML=this.renderPainel(),this.aposRenderizar())})})}configurarExportar(){document.getElementById(`eiBackupCompleto`)?.addEventListener(`click`,()=>{this.dataStore.exportarBackup()}),document.querySelectorAll(`.ei-export-json`).forEach(e=>{e.addEventListener(`click`,()=>{this.dataStore.exportarColecao(e.dataset.colecao)})}),document.querySelectorAll(`.ei-export-csv`).forEach(e=>{e.addEventListener(`click`,()=>{this.exportarCSV(e.dataset.colecao)})})}exportarCSV(e){let t=this.dataStore.listar(e)||[];if(t.length===0){A(`Nenhum registro para exportar.`,`erro`);return}let n=Object.keys(t[0]).filter(e=>!e.startsWith(`_`)),r=t.map(e=>n.map(t=>{let n=e[t];if(n==null)return``;let r=String(n);return r.includes(`,`)||r.includes(`"`)||r.includes(`
`)?`"${r.replace(/"/g,`""`)}"`:r}).join(`,`)),i=[n.join(`,`),...r].join(`
`),a=new Blob([`﻿`+i],{type:`text/csv;charset=utf-8`}),o=URL.createObjectURL(a),s=document.createElement(`a`);s.href=o,s.download=`atelier-crm-${e}-${new Date().toISOString().replace(/[:.]/g,`-`)}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o),this.dataStore.salvarHistoricoExport(e,{tipo:`csv`,tamanho:i.length}),A(`<i class="fas fa-chart-bar"></i> CSV exportado: ${t.length} registros`,`sucesso`)}configurarImportar(){let e=document.getElementById(`eiDropZone`),t=document.getElementById(`eiFileInput`);e&&(e.addEventListener(`click`,()=>t.click()),e.addEventListener(`dragover`,t=>{t.preventDefault(),e.classList.add(`ei-drop-over`)}),e.addEventListener(`dragleave`,()=>{e.classList.remove(`ei-drop-over`)}),e.addEventListener(`drop`,t=>{t.preventDefault(),e.classList.remove(`ei-drop-over`);let n=t.dataTransfer.files[0];n&&this.processarArquivo(n)}),t.addEventListener(`change`,()=>{t.files[0]&&this.processarArquivo(t.files[0])}))}processarArquivo(e){if(!e.name.endsWith(`.json`)){A(`Apenas arquivos .json são suportados.`,`erro`);return}let t=new FileReader;t.onload=t=>{let n=t.target.result,r=this.dataStore.previewImport(n);this.previewData=r,this.arquivoCarregado=e.name;let i=document.getElementById(`eiPreviewContainer`);i&&(i.innerHTML=this.renderPreview(),this.configurarAcoesImport(n))},t.readAsText(e)}configurarAcoesImport(e){document.getElementById(`eiConfirmarImport`)?.addEventListener(`click`,()=>{document.querySelector(`input[name="eiModo"]:checked`)?.value;let t=this.dataStore.importarBackup(e);if(t.sucesso){A(`<i class="fas fa-check"></i> Dados importados com sucesso (${t.tipo})`,`sucesso`),this.previewData=null,this.arquivoCarregado=null;let e=document.getElementById(`eiPreviewContainer`);e&&(e.innerHTML=``),this.router&&this.router.navegar(this.router.viewAtual)}else A(`<i class="fas fa-times"></i> Erro na importação: ${t.erro}`,`erro`)}),document.getElementById(`eiCancelarImport`)?.addEventListener(`click`,()=>{this.previewData=null,this.arquivoCarregado=null;let e=document.getElementById(`eiPreviewContainer`);e&&(e.innerHTML=``)})}configurarHistorico(){}},ta=class extends H{constructor(e,t){super(e,t),this.busca=``,this.selecionados=new Set,this.modo=`lista`}render(){let e=this.filtrarExposicoes(),t=this.dataStore.listar(`exposicoes`)||[],n=t.filter(e=>e.status!==`encerrada`).length,r=e.length>0?this.modo===`lista`?this.renderTabela(e):this.renderCards(e):`<div class="tabela-wrapper"><div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-images"></i></div><p>Nenhuma exposicao encontrada.</p></div></div>`;return`
      <div class="view-cabecalho">
        <div>
          <h2>Exposicoes</h2>
          <p class="subtitulo">${t.length} exposicao${t.length===1?``:`es`} · ${n} ativa${n===1?``:`s`}</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllExp" aria-label="Selecionar todas as exposições" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAllExp">Todos</label>
          </div>
          <div class="toggle-visualizacao">
            <button id="btnListaExp" class="${this.modo===`lista`?`ativo`:``}" title="Tabela">☰ Lista</button>
            <button id="btnGridExp" class="${this.modo===`grid`?`ativo`:``}" title="Cards">▦ Cards</button>
          </div>
          <button class="btn-gradient" id="btnNovaExposicao">✚ Nova Exposicao</button>
        </div>
      </div>
      ${this.selecionados.size>0?this.renderBarraBulk():``}
      <div class="catalogo-filtros">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaExposicao" placeholder="Nome ou local..." value="${B(this.busca)}" aria-label="Buscar exposições">
        </div>
      </div>
      ${r}
    `}renderTabela(e){return`
      <div class="tabela-wrapper">
        <table>
          <caption class="sr-only">Lista de exposições</caption>
          <thead><tr><th style="width:36px;"></th><th>Nome</th><th>Local</th><th>Data</th><th>Status</th><th></th></tr></thead>
          <tbody>${e.map(e=>`
      <tr class="${this.selecionados.has(e.id)?`linha-selecionada`:``}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-exp" data-id="${e.id}" aria-label="Selecionar ${e.nome||`exposição`}" ${this.selecionados.has(e.id)?`checked`:``}>
        </td>
        <td><strong>${B(e.nome)||`-`}</strong></td>
        <td>${B(e.local)||`-`}</td>
        <td>${k(e.data)}</td>
        <td><span class="tag-status ${e.status===`confirmada`?`exposicao`:e.status===`encerrada`?`vendida`:``}" style="background:${e.status===`confirmada`?`#16a34a20`:e.status===`encerrada`?`#6b728020`:`#f59e0b20`};color:${e.status===`confirmada`?`#16a34a`:e.status===`encerrada`?`#6b7280`:`#f59e0b`};">${e.status||`planejada`}</span></td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-editar-expo="${e.id}" title="Editar" aria-label="Editar exposição"><i class="fas fa-pen"></i></button>
          <button class="btn-icone-tabela" data-excluir-expo="${e.id}" title="Excluir" aria-label="Excluir exposição" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join(``)}</tbody>
        </table>
      </div>`}renderCards(e){return`
      <div class="grid-exposicoes stagger-in">
        ${e.map(e=>`
          <div class="card-exposicao ${this.selecionados.has(e.id)?`selecionada`:``}">
            <div class="checkbox-bulk">
              <input type="checkbox" class="checkbox-item-exp" data-id="${e.id}" aria-label="Selecionar ${e.nome||`exposição`}" ${this.selecionados.has(e.id)?`checked`:``}>
            </div>
            <div class="exp-header">
              <strong>${B(e.nome)||`-`}</strong>
              <span class="exp-local">${B(e.local)||`-`}</span>
            </div>
            <span class="exp-data">${k(e.data)}</span>
            <span class="tag-status ${e.status===`confirmada`?`exposicao`:e.status===`encerrada`?`vendida`:``}" style="background:${e.status===`confirmada`?`#16a34a20`:e.status===`encerrada`?`#6b728020`:`#f59e0b20`};color:${e.status===`confirmada`?`#16a34a`:e.status===`encerrada`?`#6b7280`:`#f59e0b`};">${e.status||`planejada`}</span>
            <div class="exp-acoes">
              <button class="btn-icone-tabela" data-editar-expo="${e.id}" title="Editar" aria-label="Editar exposição"><i class="fas fa-pen"></i></button>
              <button class="btn-icone-tabela" data-excluir-expo="${e.id}" title="Excluir" aria-label="Excluir exposição" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `).join(``)}
      </div>`}filtrarExposicoes(){let e=this.dataStore.listar(`exposicoes`)||[];if(this.busca){let t=this.busca.toLowerCase();e=e.filter(e=>(e.nome||``).toLowerCase().includes(t)||(e.local||``).toLowerCase().includes(t))}return e.sort((e,t)=>new Date(t.data||0)-new Date(e.data||0))}renderBarraBulk(){return`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} exposição${this.selecionados.size===1?``:`ões`} selecionada${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportExp"><i class="fas fa-file"></i> Exportar</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirExp">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarExp">✕ Cancelar</button>
        </div>
      </div>
    `}async bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`exportar`:{let e=t.map(e=>this.dataStore.buscarPorId(`exposicoes`,e)).filter(Boolean),n=[[`nome`,`local`,`data`,`status`,`descricao`].join(`,`),...e.map(e=>[e.nome,e.local||``,e.data||``,e.status||``,e.descricao||``].map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`))].join(`
`),r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8`}),i=document.createElement(`a`);i.href=URL.createObjectURL(r),i.download=`exposicoes-${new Date().toISOString().slice(0,10)}.csv`,i.click(),URL.revokeObjectURL(i.href),A(`${e.length} exposição(ões) exportada(s)`,`sucesso`);break}case`excluir`:if(!await R(`Excluir ${t.length} exposição(ões) permanentemente?`))return;t.forEach(e=>this.dataStore.remover(`exposicoes`,e)),A(`${t.length} exposição(ões) excluída(s)`,`sucesso`);break}this.selecionados.clear(),this.rerenderizar()}}abrirFormExposicao(e){let t=e||{};N(`
      <h3>${t.id?`<i class="fas fa-pen"></i> Editar`:`✚ Nova`} Exposicao</h3>
      <form id="formExposicao">
        <div class="campo-form"><label>Nome *</label><input type="text" id="expoNome" value="${B(t.nome||``)}" required aria-label="Nome da exposição" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Local</label><input type="text" id="expoLocal" value="${B(t.local||``)}" aria-label="Local" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Data</label><input type="date" id="expoData" value="${t.data||new Date().toISOString().slice(0,10)}" aria-label="Data" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form">
          <label>Status</label>
          <select id="expoStatus" aria-label="Status" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
            <option value="planejada" ${t.status===`planejada`||!t.status?`selected`:``}>Planejada</option>
            <option value="confirmada" ${t.status===`confirmada`?`selected`:``}>Confirmada</option>
            <option value="encerrada" ${t.status===`encerrada`?`selected`:``}>Encerrada</option>
          </select>
        </div>
        <div class="campo-form"><label>Descricao</label><textarea id="expoDescricao" aria-label="Descrição" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:60px;background:var(--bg);color:var(--text);">${B(t.descricao||``)}</textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarExpo">Cancelar</button>
          <button type="submit" class="btn-primario">${t.id?`Salvar`:`Criar`}</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarExpo`)?.addEventListener(`click`,P),document.getElementById(`formExposicao`)?.addEventListener(`submit`,e=>{e.preventDefault(),this.salvarExposicao(t)})}salvarExposicao(e){let t={nome:document.getElementById(`expoNome`)?.value?.trim()||``,local:document.getElementById(`expoLocal`)?.value?.trim()||``,data:document.getElementById(`expoData`)?.value||``,status:document.getElementById(`expoStatus`)?.value||`planejada`,descricao:document.getElementById(`expoDescricao`)?.value?.trim()||``};if(!t.nome){A(`Preencha o nome da exposicao.`,`aviso`);return}e&&e.id?(this.dataStore.atualizar(`exposicoes`,e.id,t),A(`Exposicao atualizada!`,`sucesso`)):(this.dataStore.adicionar(`exposicoes`,t),A(`Exposicao criada!`,`sucesso`)),P(),this.rerenderizar()}async excluirExposicao(e){if(!await R(`Excluir esta exposicao permanentemente?`))return;let t=this.dataStore.buscarPorId(`exposicoes`,e);this.dataStore.remover(`exposicoes`,e);let{dataStore:n}=this;z(`Exposicao excluida.`,()=>{n.dados.exposicoes.push(t),n.salvar()}),this.rerenderizar()}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`);document.getElementById(`btnNovaExposicao`)?.addEventListener(`click`,()=>this.abrirFormExposicao(null)),document.getElementById(`btnListaExp`)?.addEventListener(`click`,()=>{this.modo=`lista`,this.rerenderizar()}),document.getElementById(`btnGridExp`)?.addEventListener(`click`,()=>{this.modo=`grid`,this.rerenderizar()}),document.getElementById(`buscaExposicao`)?.addEventListener(`input`,Tr(e=>{this.busca=e.target.value,this.rerenderizar(!0)},250));let t=document.getElementById(`selectAllExp`);t&&t.addEventListener(`change`,e=>{let t=this.filtrarExposicoes();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item-exp`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkExportExp`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkExcluirExp`)?.addEventListener(`click`,()=>this.bulkAcao(`excluir`)),document.getElementById(`bulkCancelarExp`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()}),document.querySelectorAll(`[data-editar-expo]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=this.dataStore.buscarPorId(`exposicoes`,e.dataset.editarExpo);t&&this.abrirFormExposicao(t)})}),document.querySelectorAll(`[data-excluir-expo]`).forEach(e=>{e.addEventListener(`click`,()=>this.excluirExposicao(e.dataset.excluirExpo))})}rerenderizar(e=!1){let t=document.getElementById(`viewPrincipal`);if(!t)return;let n=e?document.activeElement.id:null;if(this.removerListeners(),t.innerHTML=this.render(),this.aposRenderizar(),n){let e=document.getElementById(n);if(e){e.focus();let t=e.value;e.value=``,e.value=t}}}},na=class extends H{constructor(e,t){super(e,t),this.filtroTipo=``,this.busca=``,this.selecionados=new Set}render(){let e=this.filtrarTransacoes(),t=this.dataStore.listar(`transacoes`)||[],n=t.filter(e=>e.tipo===`entrada`).reduce((e,t)=>e+Number(t.valor||0),0),r=t.filter(e=>e.tipo===`saida`).reduce((e,t)=>e+Number(t.valor||0),0),i=n-r,a=e.map(e=>`
      <tr class="${this.selecionados.has(e.id)?`linha-selecionada`:``}">
        <td onclick="event.stopPropagation()">
          <input type="checkbox" class="checkbox-item-fin" data-id="${e.id}" aria-label="Selecionar ${e.descricao||`transação`}" ${this.selecionados.has(e.id)?`checked`:``}>
        </td>
        <td>${fi(e.descricao)}</td>
        <td><span class="tag-status ${e.tipo===`entrada`?`vendida`:``}" style="background:${e.tipo===`entrada`?`#16a34a20`:`#dc262620`};color:${e.tipo===`entrada`?`#16a34a`:`#dc2626`};">${e.tipo===`entrada`?`<i class="fas fa-dollar-sign"></i> Entrada`:`💸 Saida`}</span></td>
        <td style="font-weight:600;color:${e.tipo===`entrada`?`#16a34a`:`#dc2626`};">${e.tipo===`entrada`?`+`:`-`}${O(e.valor)}</td>
        <td>${k(e.data)}</td>
        <td class="acoes-linha-tabela">
          <button class="btn-icone-tabela" data-excluir-transacao="${e.id}" title="Excluir" aria-label="Excluir transação"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `).join(``),o=[...new Set(t.map(e=>e.categoria).filter(Boolean))],s=o.map(e=>{let i=t.filter(t=>t.categoria===e).reduce((e,t)=>e+Number(t.valor||0),0);return{nome:e,total:i,pct:n+r>0?Math.round(i/(n+r)*100):0}}).sort((e,t)=>t.total-e.total),c=s.length>0?s[0].total:1,l=s.map((e,t)=>{let n=(t*47+200)%360;return`
        <div class="cat-bar-linha">
          <div class="cat-bar-label"><span>${B(e.nome)}</span><span class="cat-bar-valor">${O(e.total)} (${e.pct}%)</span></div>
          <div class="cat-bar-trilha"><div class="cat-bar-preenchimento" style="width:${Math.round(e.total/c*100)}%;background:hsl(${n},55%,50%);"></div></div>
        </div>`}).join(``),u=e.length?`
      <div class="tabela-wrapper" style="margin-top:16px;">
        <table>
          <caption class="sr-only">Lista de transações</caption>
          <thead><tr><th style="width:36px;"></th><th>Descricao</th><th>Tipo</th><th>Valor</th><th>Data</th><th></th></tr></thead>
          <tbody>${a}</tbody>
        </table>
      </div>`:`
      <div class="tabela-wrapper" style="margin-top:16px;">
        <div class="estado-vazio"><div class="icone-vazio"><i class="fas fa-chart-bar"></i></div><p>Nenhuma transacao encontrada.</p></div>
      </div>
    `;return`
      <div class="view-cabecalho">
        <div>
          <h2>Financeiro</h2>
          <p class="subtitulo">${t.length} transacao${t.length===1?``:`es`} · ${O(n)} entradas · ${O(r)} saidas</p>
        </div>
        <div class="catalogo-acoes">
          <div class="selecao-bulk">
            <input type="checkbox" id="selectAllFin" aria-label="Selecionar todas as transações" ${this.selecionados.size===e.length&&e.length>0?`checked`:``}>
            <label for="selectAllFin">Todos</label>
          </div>
          <button class="btn-gradient" id="btnNovaTransacao">✚ Nova Transacao</button>
        </div>
      </div>
      ${this.selecionados.size>0?this.renderBarraBulk():``}
      <div class="grid-cards">
        <div class="card"><div class="rotulo-card" style="color:#16a34a;"><i class="fas fa-dollar-sign"></i> Entradas</div><div class="valor-card">${O(n)}</div></div>
        <div class="card"><div class="rotulo-card" style="color:#dc2626;">💸 Saidas</div><div class="valor-card">${O(r)}</div></div>
        <div class="card"><div class="rotulo-card">🏦 Saldo</div><div class="valor-card" style="color:${i>=0?`#16a34a`:`#dc2626`};">${O(i)}</div></div>
      </div>
      ${o.length?`<div class="card" style="margin-top:12px;padding:12px 16px;"><h4 style="margin:0 0 6px;font-size:0.82rem;">Categorias</h4>${l}</div>`:``}
      <div class="catalogo-filtros" style="margin-top:12px;">
        <div class="campo-filtro busca">
          <label>Buscar</label>
          <input type="text" id="buscaTransacao" placeholder="Descricao..." value="${B(this.busca)}" aria-label="Buscar transações">
        </div>
        <div class="campo-filtro">
          <label>Tipo</label>
          <select id="filtroTipoTransacao">
            <option value="">Todos</option>
            <option value="entrada" ${this.filtroTipo===`entrada`?`selected`:``}>Entrada</option>
            <option value="saida" ${this.filtroTipo===`saida`?`selected`:``}>Saida</option>
          </select>
        </div>
      </div>
      ${u}
    `}filtrarTransacoes(){let e=this.dataStore.listar(`transacoes`)||[];if(this.filtroTipo&&(e=e.filter(e=>e.tipo===this.filtroTipo)),this.busca){let t=this.busca.toLowerCase();e=e.filter(e=>(e.descricao||``).toLowerCase().includes(t))}return e.sort((e,t)=>new Date(t.data||0)-new Date(e.data||0))}renderBarraBulk(){return`
      <div class="bulk-actions-bar">
        <span class="bulk-info">${this.selecionados.size} transação${this.selecionados.size===1?``:`ões`} selecionada${this.selecionados.size===1?``:`s`}</span>
        <div class="bulk-buttons">
          <button class="btn-secundario" id="bulkExportFin"><i class="fas fa-file"></i> Exportar</button>
          <button class="btn-secundario" id="bulkCategoriaFin"><i class="fas fa-tag"></i> Categoria</button>
          <button class="btn-secundario btn-danger" id="bulkExcluirFin">🗑 Excluir</button>
          <button class="btn-secundario" id="bulkCancelarFin">✕ Cancelar</button>
        </div>
      </div>
    `}async bulkAcao(e){let t=Array.from(this.selecionados);if(t.length!==0){switch(e){case`exportar`:{let e=t.map(e=>this.dataStore.buscarPorId(`transacoes`,e)).filter(Boolean),n=[[`descricao`,`tipo`,`valor`,`data`,`categoria`].join(`,`),...e.map(e=>[e.descricao,e.tipo,e.valor||0,e.data||``,e.categoria||``].map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`))].join(`
`),r=new Blob([`﻿`+n],{type:`text/csv;charset=utf-8`}),i=document.createElement(`a`);i.href=URL.createObjectURL(r),i.download=`transacoes-${new Date().toISOString().slice(0,10)}.csv`,i.click(),URL.revokeObjectURL(i.href),A(`${e.length} transação(ões) exportada(s)`,`sucesso`);break}case`categoria`:{let e=this.dataStore.listar(`transacoes`)||[],n=[...new Set(e.map(e=>e.categoria).filter(Boolean))].sort();N(`
          <h3>Mudar categoria em lote</h3>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">${t.length} transação(ões) selecionada(s).</p>
          <select id="loteCategoriaSelect" aria-label="Nova categoria" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;background:var(--bg);color:var(--text);">
            <option value="">— Selecione —</option>
            ${[`Venda`,`Comissao`,`Material`,`Inscricao`,`Frete`,`Embalagem`,`Ferramenta`,`Assinatura`,`Outro`,...n].filter((e,t,n)=>n.indexOf(e)===t).map(e=>`<option value="${e}">${e}</option>`).join(``)}
          </select>
          <div class="modal-acoes" style="margin-top:12px;">
            <button type="button" class="btn-secundario" id="btnCancelarLoteCat">Cancelar</button>
            <button type="button" class="btn-primario" id="btnAplicarLoteCat">Aplicar</button>
          </div>
        `),document.getElementById(`btnCancelarLoteCat`)?.addEventListener(`click`,P),document.getElementById(`btnAplicarLoteCat`)?.addEventListener(`click`,()=>{let e=document.getElementById(`loteCategoriaSelect`)?.value;if(!e){A(`Selecione uma categoria.`,`aviso`);return}t.forEach(t=>this.dataStore.atualizar(`transacoes`,t,{categoria:e})),A(`${t.length} transação(ões) atualizada(s) para "${e}"`,`sucesso`),P(),this.selecionados.clear(),this.rerenderizar()});return}case`excluir`:if(!await R(`Excluir ${t.length} transação(ões) permanentemente?`))return;t.forEach(e=>this.dataStore.remover(`transacoes`,e)),A(`${t.length} transação(ões) excluída(s)`,`sucesso`);break}this.selecionados.clear(),this.rerenderizar()}}abrirFormTransacao(e){let t=e||{};N(`
      <h3>${t.id?`<i class="fas fa-pen"></i> Editar`:`✚ Nova`} Transacao</h3>
      <form id="formTransacao">
        <div class="campo-form"><label>Descricao *</label><input type="text" id="transDescricao" value="${B(t.descricao||``)}" required aria-label="Descrição" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Tipo *</label>
            <select id="transTipo" aria-label="Tipo" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
              <option value="entrada" ${t.tipo===`entrada`||!t.tipo?`selected`:``}><i class="fas fa-dollar-sign"></i> Entrada</option>
              <option value="saida" ${t.tipo===`saida`?`selected`:``}>💸 Saida</option>
            </select>
          </div>
          <div><label>Valor (R$) *</label><input type="number" id="transValor" value="${t.valor||``}" min="0" step="0.01" required aria-label="Valor" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
        </div>
        <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div><label>Data</label><input type="date" id="transData" value="${t.data||new Date().toISOString().slice(0,10)}" aria-label="Data" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);"></div>
          <div><label>Categoria</label>
            <select id="transCategoria" aria-label="Categoria" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;background:var(--bg);color:var(--text);">
              <option value="">— Selecione —</option>
              ${[`Venda`,`Comissao`,`Material`,`Inscricao`,`Frete`,`Embalagem`,`Ferramenta`,`Assinatura`,`Outro`].map(e=>`<option value="${e}" ${t.categoria===e?`selected`:``}>${e}</option>`).join(``)}
            </select>
          </div>
        </div>
        <div class="campo-form"><label>Notas</label><textarea id="transNotas" aria-label="Notas" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.85rem;width:100%;min-height:50px;background:var(--bg);color:var(--text);">${B(t.notas||``)}</textarea></div>
        <div class="modal-acoes">
          <button type="button" class="btn-secundario" id="btnCancelarTrans">Cancelar</button>
          <button type="submit" class="btn-primario">${t.id?`Salvar`:`Adicionar`}</button>
        </div>
      </form>
    `),document.getElementById(`btnCancelarTrans`)?.addEventListener(`click`,P),document.getElementById(`formTransacao`)?.addEventListener(`submit`,e=>{e.preventDefault(),this.salvarTransacao(t)})}salvarTransacao(e){let t={descricao:document.getElementById(`transDescricao`)?.value?.trim()||``,tipo:document.getElementById(`transTipo`)?.value||`entrada`,valor:Number(document.getElementById(`transValor`)?.value)||0,data:document.getElementById(`transData`)?.value||new Date().toISOString().slice(0,10),categoria:document.getElementById(`transCategoria`)?.value||``,notas:document.getElementById(`transNotas`)?.value?.trim()||``};if(!t.descricao||!t.valor){A(`Preencha descricao e valor.`,`aviso`);return}e&&e.id?(this.dataStore.atualizar(`transacoes`,e.id,t),A(`Transacao atualizada!`,`sucesso`)):(this.dataStore.adicionar(`transacoes`,t),A(`Transacao adicionada!`,`sucesso`)),P(),this.rerenderizar()}async excluirTransacao(e){if(!await R(`Excluir esta transacao?`))return;let t=this.dataStore.buscarPorId(`transacoes`,e);this.dataStore.remover(`transacoes`,e);let{dataStore:n}=this;z(`Transacao excluida.`,()=>{n.dados.transacoes.push(t),n.salvar()}),this.rerenderizar()}aposRenderizar(){this.removerListeners();let e=document.getElementById(`viewPrincipal`);document.getElementById(`btnNovaTransacao`)?.addEventListener(`click`,()=>this.abrirFormTransacao(null)),document.getElementById(`buscaTransacao`)?.addEventListener(`input`,Tr(e=>{this.busca=e.target.value,this.rerenderizar(!0)},250)),document.getElementById(`filtroTipoTransacao`)?.addEventListener(`change`,e=>{this.filtroTipo=e.target.value,this.rerenderizar()});let t=document.getElementById(`selectAllFin`);t&&t.addEventListener(`change`,e=>{let t=this.filtrarTransacoes();e.target.checked?t.forEach(e=>this.selecionados.add(e.id)):this.selecionados.clear(),this.rerenderizar()}),e.addEventListener(`change`,e=>{if(e.target.classList.contains(`checkbox-item-fin`)){let t=e.target.dataset.id;e.target.checked?this.selecionados.add(t):this.selecionados.delete(t),this.rerenderizar()}}),document.getElementById(`bulkExportFin`)?.addEventListener(`click`,()=>this.bulkAcao(`exportar`)),document.getElementById(`bulkCategoriaFin`)?.addEventListener(`click`,()=>this.bulkAcao(`categoria`)),document.getElementById(`bulkExcluirFin`)?.addEventListener(`click`,()=>this.bulkAcao(`excluir`)),document.getElementById(`bulkCancelarFin`)?.addEventListener(`click`,()=>{this.selecionados.clear(),this.rerenderizar()}),document.querySelectorAll(`[data-excluir-transacao]`).forEach(e=>{e.addEventListener(`click`,()=>this.excluirTransacao(e.dataset.excluirTransacao))})}rerenderizar(e=!1){let t=document.getElementById(`viewPrincipal`);if(!t)return;let n=e?document.activeElement.id:null;if(this.removerListeners(),t.innerHTML=this.render(),this.aposRenderizar(),n){let e=document.getElementById(n);if(e){e.focus();let t=e.value;e.value=``,e.value=t}}}},ra=class extends H{constructor(e,t){super(e,t)}_salvar(){let e=document.getElementById(`cfgNome`).value.trim(),t=document.getElementById(`cfgEmail`).value.trim(),n=document.getElementById(`cfgTelefone`).value.trim();q().artista={nome:e,email:t,telefone:n},q().textoGarantia=document.getElementById(`cfgTextoGarantia`).value.trim();let r=document.getElementById(`cfgIdioma`);r&&(q().idioma=r.value,window.AtelierCRMTranslations&&(window.AtelierCRMTranslations.locale=r.value));let i=document.getElementById(`cfgAltoContraste`);i&&(q().altoContraste=i.checked,document.body.setAttribute(`data-high-contrast`,i.checked));let a=document.getElementById(`cfgTamanhoFonte`);a&&(q().tamanhoFonte=a.value,document.body.setAttribute(`data-font-size`,a.value));let o=document.getElementById(`cfgGoogleClientId`);o&&(q().syncGoogleClientId=o.value.trim());let s=document.getElementById(`cfgWebDAVUrl`);s&&(q().syncWebDAVUrl=s.value.trim());let c=document.getElementById(`cfgWebDAVUser`);c&&(q().syncWebDAVUser=c.value.trim());let l=document.getElementById(`cfgWebDAVPass`);l&&(q().syncWebDAVPass=l.value.trim());let u=document.getElementById(`cfgAutoSync`);u&&(q().syncAutoBackup=u.checked);let d=document.getElementById(`cfgSyncInterval`);d&&(q().syncAutoBackupInterval=Number(d.value)||30);let f=document.getElementById(`cfgSupabaseUrl`);f&&(q().supabaseUrl=f.value.trim().replace(/\/$/,``));let p=document.getElementById(`cfgSupabaseKey`);p&&(q().supabasePublishableKey=p.value.trim()),q().salvar(),typeof Jr==`function`&&Jr(),A(`Configurações salvas com sucesso!`,`sucesso`)}async _salvarPin(){let e=document.getElementById(`cfgPin`)?.value;if(e&&e.length===4&&/^\d{4}$/.test(e)){let t=await Wr(e);q().pin=t,q().salvar(),A(`PIN salvo com sucesso!`,`sucesso`),document.getElementById(`cfgPin`).value=``}else A(`Digite um PIN de 4 dígitos.`,`aviso`)}async _removerPin(){await R(`Remover o PIN de acesso?`,{textoConfirmar:`Remover`,perigoso:!1})&&(q().pin=``,q().autoLock=!1,q().salvar(),A(`PIN removido.`,`sucesso`),this.router.viewAtual===`configuracoes`&&this.router.navegar(`configuracoes`))}render(){let e=q().artista||{},t=q().textoGarantia||``,n=q().idioma||`pt-BR`,r=q().tema||`classico`,i=q().altoContraste||!1,a=q().tamanhoFonte||`medio`,o=q().pin||``,s=q(),c=s.syncLastBackup?k(s.syncLastBackup):`Nunca`;return`
      <div class="view-cabecalho">
        <div>
          <h2>Configurações</h2>
          <p class="subtitulo">Dados do artista e preferências do sistema</p>
        </div>
      </div>
      <div class="painel" style="max-width:560px">
        <h3><i class="fas fa-user"></i> Perfil do Artista</h3>
        <div class="campo-form">
          <label>Nome / Nome do Ateliê</label>
          <input type="text" id="cfgNome" aria-label="Nome do Ateliê" value="${B(e.nome||``)}">
        </div>
        <div class="campo-form">
          <label>E-mail</label>
          <input type="email" id="cfgEmail" aria-label="E-mail" value="${B(e.email||``)}">
        </div>
        <div class="campo-form">
          <label>Telefone</label>
          <input type="text" id="cfgTelefone" aria-label="Telefone" value="${B(e.telefone||``)}">
        </div>
        <div class="campo-form">
          <label>Texto de garantia/autenticidade (usado nos recibos e propostas)</label>
          <textarea id="cfgTextoGarantia" aria-label="Texto de garantia" style="min-height:110px;">${B(t)}</textarea>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3><i class="fas fa-globe"></i> Idioma</h3>
        <div class="campo-form">
          <label>Idioma da interface</label>
          <select id="cfgIdioma" aria-label="Idioma da interface">${[{v:`pt-BR`,r:`🇧🇷 Português (BR)`},{v:`en-US`,r:`🇺🇸 English (US)`},{v:`es`,r:`🇪🇸 Español`},{v:`fr`,r:`🇫🇷 Français`},{v:`it`,r:`🇮🇹 Italiano`}].map(e=>`<option value="${e.v}" ${n===e.v?`selected`:``}>${e.r}</option>`).join(``)}</select>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>♿ Acessibilidade</h3>
        <div class="campo-form">
          <label><input type="checkbox" id="cfgAltoContraste" aria-label="Alto contraste" ${i?`checked`:``}> <i class="fas fa-lock"></i> Alto contraste</label>
        </div>
        <div class="campo-form">
          <label>Tamanho da fonte</label>
          <select id="cfgTamanhoFonte" aria-label="Tamanho da fonte">
            <option value="pequeno" ${a===`pequeno`?`selected`:``}>Pequeno</option>
            <option value="medio" ${a===`medio`?`selected`:``}>Médio</option>
            <option value="grande" ${a===`grande`?`selected`:``}>Grande</option>
          </select>
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>🎭 Tema Visual</h3>
        <p class="texto-ajuda" style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">Passe o mouse ou use Tab para pré-visualizar. Clique para confirmar.</p>
        <div class="tema-grid">
          ${[{id:`classico`,label:`Clássico`,icone:`🎨`,sidebar:`#111827`,bg:`#fdfaf6`,accent:`#2563eb`,textBar:`rgba(255,255,255,0.35)`,contentBar:`rgba(0,0,0,0.15)`},{id:`escuro`,label:`Escuro`,icone:`🌙`,sidebar:`#000000`,bg:`#0f0f0f`,accent:`#00d4ff`,textBar:`rgba(255,255,255,0.25)`,contentBar:`rgba(255,255,255,0.12)`},{id:`galeria`,label:`Galeria`,icone:`🖼️`,sidebar:`#fafafa`,bg:`#fafafa`,accent:`#000000`,textBar:`rgba(0,0,0,0.15)`,contentBar:`rgba(0,0,0,0.1)`},{id:`boho`,label:`Boho`,icone:`🌿`,sidebar:`#4a3f35`,bg:`#f7f3ee`,accent:`#c17f59`,textBar:`rgba(255,255,255,0.25)`,contentBar:`rgba(0,0,0,0.12)`},{id:`clean`,label:`Clean`,icone:`⚪`,sidebar:`#ffffff`,bg:`#ffffff`,accent:`#1a1a1a`,textBar:`rgba(0,0,0,0.1)`,contentBar:`rgba(0,0,0,0.08)`},{id:`dourado`,label:`Dourado`,icone:`👑`,sidebar:`#050505`,bg:`#0d0d0d`,accent:`#c9a227`,textBar:`rgba(255,255,255,0.25)`,contentBar:`rgba(255,255,255,0.1)`},{id:`marmore`,label:`Mármore`,icone:`🏛️`,sidebar:`#2b1f18`,bg:`#f2ece6`,accent:`#a0522d`,textBar:`rgba(255,255,255,0.25)`,contentBar:`rgba(0,0,0,0.12)`},{id:`esmeralda`,label:`Esmeralda`,icone:`💚`,sidebar:`#040a06`,bg:`#0a120e`,accent:`#00c853`,textBar:`rgba(255,255,255,0.2)`,contentBar:`rgba(255,255,255,0.1)`}].map(e=>`
            <div class="tema-card${r===e.id?` ativo`:``}" data-tema="${e.id}" tabindex="0" role="button" aria-label="Tema ${e.label}">
              <div class="tema-mockup" style="background:${e.bg}">
                <div class="tema-mockup-sidebar" style="background:${e.sidebar}">
                  <span class="bar" style="background:${e.textBar}"></span>
                  <span class="bar ativa" style="background:${e.accent}"></span>
                  <span class="bar" style="background:${e.textBar}"></span>
                </div>
                <div class="tema-mockup-content">
                  <span class="bar" style="background:${e.contentBar}"></span>
                  <span class="bar" style="background:${e.contentBar}"></span>
                  <span class="bar accent" style="background:${e.accent}"></span>
                </div>
              </div>
              <span class="tema-label">${e.icone} ${e.label}</span>
            </div>
          `).join(``)}
        </div>
      </div>
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3>🔐 Segurança</h3>
        <div class="campo-form">
          <label>PIN de acesso (4 dígitos) ${o?`<i class="fas fa-lock"></i> Ativo`:`<i class="fas fa-times"></i> Desativado`}</label>
          <div style="display:flex;gap:8px;">
            <input type="password" id="cfgPin" aria-label="PIN de acesso" maxlength="4" pattern="[0-9]*" inputmode="numeric" placeholder="****" style="width:100px;padding:7px 10px;border:1px solid var(--border);border-radius:6px;font-size:1.2rem;text-align:center;background:var(--bg);color:var(--text);letter-spacing:4px;">
            <button class="btn-secundario" id="btnSalvarPin" style="font-size:0.8rem;padding:6px 14px;">${o?`Alterar`:`Ativar`} PIN</button>
            ${o?`<button class="btn-secundario" id="btnRemoverPin" style="font-size:0.8rem;padding:6px 14px;color:#dc2626;">Remover PIN</button>`:``}
          </div>
        </div>
        <div class="campo-form">
          <label><input type="checkbox" id="cfgAutoLock" aria-label="Bloquear automaticamente após inatividade" ${q().autoLock?`checked`:``}> 🔐 Bloquear automaticamente após inatividade</label>
        </div>
      </div>

      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3><i class="fas fa-keyboard"></i> Atalhos de Teclado</h3>
        <p class="texto-ajuda" style="margin-bottom:8px;">Personalize os atalhos para navegar mais rápido.</p>
        <button class="btn-secundario" id="btnEditarAtalhos"><i class="fas fa-pen"></i> Personalizar Atalhos</button>
      </div>

      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3><i class="fas fa-database"></i> Gerenciamento de Imagens</h3>
        <p class="texto-ajuda" style="margin-bottom:8px;">Armazene imagens no IndexedDB (sem limite de 5MB do localStorage).</p>
        <button class="btn-secundario" id="btnMigrarImagens"><i class="fas fa-arrow-up"></i> Migrar imagens para IndexedDB</button>
        <span id="migracaoStatus" style="margin-left:8px;font-size:0.8rem;color:var(--text-muted);"></span>
      </div>

      <!-- Sincronização -->
      <div class="painel" style="max-width:560px;margin-top:16px;">
        <h3><i class="fas fa-cloud"></i> Sincronização na Nuvem</h3>
        <p class="texto-ajuda" style="margin-bottom:12px;">Último backup: ${c}</p>

        <div class="sync-tabs" style="display:flex;gap:4px;margin-bottom:12px;">
          <button class="sync-tab ativo" data-sync-tab="indexeddb"><i class="fas fa-save"></i> Local (IDB)</button>
          <button class="sync-tab" data-sync-tab="googledrive">☁️ Google Drive</button>
          <button class="sync-tab" data-sync-tab="webdav"><i class="fas fa-folder"></i> WebDAV</button>
          <button class="sync-tab" data-sync-tab="portal-remoto"><i class="fas fa-share-alt"></i> Portal remoto</button>
        </div>

        <div class="sync-panel" id="syncPanelIndexedDB">
          <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px;">Snapshots salvos no navegador (IndexedDB — sem limite de espaço).</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn-secundario" id="btnIDBSnapshot"><i class="fas fa-save"></i> Tirar Snapshot</button>
            <button class="btn-secundario" id="btnIDBListar"><i class="fas fa-clipboard"></i> Listar Snapshots</button>
          </div>
          <div id="idbSnapshotList" style="margin-top:8px;"></div>
        </div>

        <div class="sync-panel" id="syncPanelGoogleDrive" style="display:none;">
          <div class="campo-form">
            <label>Google Drive Client ID (OAuth 2.0)</label>
            <input type="text" id="cfgGoogleClientId" aria-label="Google Drive Client ID" value="${B(s.syncGoogleClientId||``)}" placeholder="123456789-xxxxx.apps.googleusercontent.com" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);">
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
            <button class="btn-secundario" id="btnGoogleAuth"><i class="fas fa-key"></i> Autenticar</button>
            <button class="btn-secundario" id="btnGoogleBackup">☁️ Fazer Backup</button>
            <button class="btn-secundario" id="btnGoogleListar"><i class="fas fa-clipboard"></i> Listar Backups</button>
          </div>
          <div id="googleBackupList" style="margin-top:8px;"></div>
        </div>

        <div class="sync-panel" id="syncPanelWebDAV" style="display:none;">
          <div class="campo-form">
            <label>URL do servidor WebDAV</label>
            <input type="url" id="cfgWebDAVUrl" aria-label="URL do servidor WebDAV" value="${B(s.syncWebDAVUrl||``)}" placeholder="https://meu-servidor.com/remote.php/dav/files/usuario/" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);">
          </div>
          <div class="campo-form" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div><label>Usuário</label><input type="text" id="cfgWebDAVUser" aria-label="Usuário" value="${B(s.syncWebDAVUser||``)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);"></div>
            <div><label>Senha</label><input type="password" id="cfgWebDAVPass" aria-label="Senha" value="${B(s.syncWebDAVPass||``)}" style="padding:8px;border:1px solid var(--border);border-radius:6px;font-size:0.82rem;width:100%;background:var(--bg);color:var(--text);"></div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
            <button class="btn-secundario" id="btnWebDAVTest"><i class="fas fa-link"></i> Testar Conexão</button>
            <button class="btn-secundario" id="btnWebDAVBackup">☁️ Fazer Backup</button>
            <button class="btn-secundario" id="btnWebDAVListar"><i class="fas fa-clipboard"></i> Listar Backups</button>
          </div>
          <div id="webdavBackupList" style="margin-top:8px;"></div>
        </div>

        <div class="sync-panel" id="syncPanelPortalRemoto" style="display:none;">
          <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px;">Use uma chave publicável do Supabase. Os links de clientes são atendidos por uma Edge Function e expiram; nenhuma chave secreta vai para o navegador.</p>
          <div class="campo-form"><label>URL do projeto Supabase</label><input type="url" id="cfgSupabaseUrl" value="${B(s.supabaseUrl||``)}" placeholder="https://seu-projeto.supabase.co"></div>
          <div class="campo-form"><label>Chave publicável</label><input type="text" id="cfgSupabaseKey" value="${B(s.supabasePublishableKey||``)}" placeholder="sb_publishable_..."></div>
          <p style="font-size:0.75rem;color:var(--warn);">A publicação do portal requer aplicar a migration e implantar a Edge Function incluídas no projeto.</p>
        </div>

        <div class="campo-form" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
          <label><input type="checkbox" id="cfgAutoSync" aria-label="Backup automático no IndexedDB" ${s.syncAutoBackup?`checked`:``}> <i class="fas fa-sync"></i> Backup automático no IndexedDB</label>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
            <span style="font-size:0.75rem;color:var(--text-muted);">A cada</span>
            <select id="cfgSyncInterval" aria-label="Intervalo de backup" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:0.8rem;background:var(--bg);color:var(--text);">
              ${[5,10,15,30,60,120].map(e=>`<option value="${e}" ${(s.syncAutoBackupInterval||30)===e?`selected`:``}>${e} min</option>`).join(``)}
            </select>
          </div>
        </div>
      </div>

      <button class="btn-primario" id="btnSalvarConfig" style="margin-top:16px;">Salvar Configurações</button>
    `}aposRenderizar(){this.removerListeners();let e=document.getElementById(`btnSalvarConfig`);if(e){let t=()=>this._salvar();e.addEventListener(`click`,t),this._bindCache.btnSalvarConfig={el:e,handler:t,type:`click`}}let t=document.getElementById(`btnSalvarPin`);if(t){let e=()=>this._salvarPin();t.addEventListener(`click`,e),this._bindCache.btnSalvarPin={el:t,handler:e,type:`click`}}let n=document.getElementById(`btnRemoverPin`);if(n){let e=()=>this._removerPin();n.addEventListener(`click`,e),this._bindCache.btnRemoverPin={el:n,handler:e,type:`click`}}this._temaSalvoPreview=q().tema||`classico`,document.querySelectorAll(`.tema-card`).forEach(e=>{let t=e.dataset.tema,n=null,r=()=>{n&&(clearTimeout(n),n=null),this._previewTema(t)},i=()=>{document.activeElement!==e&&this._reverterTema()},a=()=>{n&&(clearTimeout(n),n=null),this._previewTema(t)},o=()=>{n=setTimeout(()=>{document.querySelector(`.tema-card:focus`)||this._reverterTema()},80)},s=()=>this._confirmarTema(t,e),c=n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),this._confirmarTema(t,e))};e.addEventListener(`mouseenter`,r),e.addEventListener(`mouseleave`,i),e.addEventListener(`focus`,a),e.addEventListener(`blur`,o),e.addEventListener(`click`,s),e.addEventListener(`keydown`,c),this._bindCache[`tema_`+t+`_enter`]={el:e,handler:r,type:`mouseenter`},this._bindCache[`tema_`+t+`_leave`]={el:e,handler:i,type:`mouseleave`},this._bindCache[`tema_`+t+`_focus`]={el:e,handler:a,type:`focus`},this._bindCache[`tema_`+t+`_blur`]={el:e,handler:o,type:`blur`},this._bindCache[`tema_`+t+`_click`]={el:e,handler:s,type:`click`},this._bindCache[`tema_`+t+`_key`]={el:e,handler:c,type:`keydown`}}),document.querySelectorAll(`.sync-tab`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.sync-tab`).forEach(e=>e.classList.remove(`ativo`)),e.classList.add(`ativo`),document.querySelectorAll(`.sync-panel`).forEach(e=>e.style.display=`none`);let t=document.getElementById({indexeddb:`syncPanelIndexedDB`,googledrive:`syncPanelGoogleDrive`,webdav:`syncPanelWebDAV`,"portal-remoto":`syncPanelPortalRemoto`}[e.dataset.syncTab]);t&&(t.style.display=`block`)})}),document.getElementById(`btnEditarAtalhos`)?.addEventListener(`click`,()=>oi()),document.getElementById(`btnMigrarImagens`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`btnMigrarImagens`),t=document.getElementById(`migracaoStatus`);e&&(e.disabled=!0),t&&(t.textContent=`Migrando...`);let n=W().items,r=await imageStore.migrar(n);n.forEach(e=>W().atualizar(e.id,e)),t&&(t.textContent=`✓ ${r} imagem(ns) migrada(s) para IndexedDB.`),e&&(e.disabled=!1)}),document.getElementById(`btnIDBSnapshot`)?.addEventListener(`click`,()=>{$.salvarSnapshotIDB().then(()=>this._mostrarIDBSnapshots())}),document.getElementById(`btnIDBListar`)?.addEventListener(`click`,()=>this._mostrarIDBSnapshots()),document.getElementById(`btnGoogleAuth`)?.addEventListener(`click`,()=>$.autenticarGoogle()),document.getElementById(`btnGoogleBackup`)?.addEventListener(`click`,()=>$.backupGoogle()),document.getElementById(`btnGoogleListar`)?.addEventListener(`click`,()=>this._listarGoogle()),document.getElementById(`btnWebDAVTest`)?.addEventListener(`click`,async()=>{this._salvar();let e=await $.testarWebDAV();A(e?`<i class="fas fa-check"></i> Conexão WebDAV OK!`:`<i class="fas fa-times"></i> Falha na conexão WebDAV`,e?`sucesso`:`erro`)}),document.getElementById(`btnWebDAVBackup`)?.addEventListener(`click`,()=>$.backupWebDAV()),document.getElementById(`btnWebDAVListar`)?.addEventListener(`click`,()=>this._listarWebDAV())}_previewTema(e){document.body.setAttribute(`data-tema`,e),typeof Jr==`function`&&Jr()}_reverterTema(){document.body.setAttribute(`data-tema`,this._temaSalvoPreview),typeof Jr==`function`&&Jr()}_confirmarTema(e,t){q().tema=e,q().salvar(),this._temaSalvoPreview=e,this._reverterTema(),document.querySelectorAll(`.tema-card`).forEach(e=>e.classList.remove(`ativo`)),t.classList.add(`ativo`);let n=document.getElementById(`seletorTema`);n&&(n.value=e),A(`Tema ${e} aplicado!`,`sucesso`)}async _mostrarIDBSnapshots(){let e=document.getElementById(`idbSnapshotList`);if(e){e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>`;try{let t=await $.listarSnapshotsIDB();if(t.length===0){e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum snapshot encontrado.</span>`;return}e.innerHTML=`
        <div style="max-height:200px;overflow-y:auto;">
          ${t.map(e=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
              <span style="font-size:0.75rem;color:var(--text);">${e.label||e.timestamp}</span>
              <span style="font-size:0.7rem;color:var(--text-muted);">${new Date(e.timestamp).toLocaleString(`pt-BR`)}</span>
              <span>
                <button class="btn-miniatura btn-restaurar-idb" data-id="${e.id}" title="Restaurar" aria-label="Restaurar">↩️</button>
                <button class="btn-miniatura btn-remover-idb" data-id="${e.id}" title="Excluir" aria-label="Excluir" style="color:#dc2626;"><i class="fas fa-trash"></i></button>
              </span>
            </div>
          `).join(``)}
        </div>
      `,e.querySelectorAll(`.btn-restaurar-idb`).forEach(e=>{e.addEventListener(`click`,()=>$.restaurarSnapshotIDB(Number(e.dataset.id)).then(()=>{this.router.viewAtual===`configuracoes`&&this.router.navegar(`configuracoes`)}))}),e.querySelectorAll(`.btn-remover-idb`).forEach(e=>{e.addEventListener(`click`,async()=>{await $.removerSnapshotIDB(Number(e.dataset.id)),this._mostrarIDBSnapshots()})})}catch(t){e.innerHTML=`<span style="color:#dc2626;font-size:0.8rem;">Erro ao carregar: `+t.message+`</span>`}}}async _listarGoogle(){let e=document.getElementById(`googleBackupList`);if(!e)return;e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>`;let t=await $.listarBackupsGoogle();if(t.length===0){e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum backup no Google Drive.</span>`;return}e.innerHTML=`
      <div style="max-height:200px;overflow-y:auto;">
        ${t.map(e=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
            <span style="font-size:0.75rem;color:var(--text);">${e.nome}</span>
            <span style="font-size:0.7rem;color:var(--text-muted);">${new Date(e.data).toLocaleString(`pt-BR`)}</span>
            <button class="btn-miniatura btn-restaurar-gd" data-id="${e.id}" title="Restaurar" aria-label="Restaurar">↩️</button>
          </div>
        `).join(``)}
      </div>
    `,e.querySelectorAll(`.btn-restaurar-gd`).forEach(e=>{e.addEventListener(`click`,()=>$.restaurarGoogle(e.dataset.id).then(()=>{this.router.viewAtual===`configuracoes`&&this.router.navegar(`configuracoes`)}))})}async _listarWebDAV(){let e=document.getElementById(`webdavBackupList`);if(!e)return;e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Carregando...</span>`;let t=await $.listarBackupsWebDAV();if(t.length===0){e.innerHTML=`<span style="color:var(--text-muted);font-size:0.8rem;">Nenhum backup no WebDAV.</span>`;return}e.innerHTML=`
      <div style="max-height:200px;overflow-y:auto;">
        ${t.map(e=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:var(--bg);border-radius:4px;margin-bottom:4px;border:1px solid var(--border);">
            <span style="font-size:0.75rem;color:var(--text);">${e.nome}</span>
            <span style="font-size:0.7rem;color:var(--text-muted);">${e.data||``}</span>
            <button class="btn-miniatura btn-restaurar-wd" data-nome="${e.nome}" title="Restaurar" aria-label="Restaurar">↩️</button>
          </div>
        `).join(``)}
      </div>
    `,e.querySelectorAll(`.btn-restaurar-wd`).forEach(e=>{e.addEventListener(`click`,()=>$.restaurarWebDAV(e.dataset.nome).then(()=>{this.router.viewAtual===`configuracoes`&&this.router.navegar(`configuracoes`)}))})}},ia=class{constructor(e){this._backupEmAndamento=!1,this.dataStore=e,this._db=null,this._dbPromise=null}get db(){return this._dbPromise||(this._dbPromise=new Promise((e,t)=>{let n=indexedDB.open(`AtelierCRM`,1);n.onupgradeneeded=e=>{let t=e.target.result;if(!t.objectStoreNames.contains(`snapshots`)){let e=t.createObjectStore(`snapshots`,{keyPath:`id`,autoIncrement:!0});e.createIndex(`timestamp`,`timestamp`,{unique:!1}),e.createIndex(`label`,`label`,{unique:!1})}},n.onsuccess=t=>{this._db=t.target.result,e(this._db)},n.onerror=e=>t(e.target.error)})),this._dbPromise}async salvarSnapshotIDB(e){let t=(await this.db).transaction(`snapshots`,`readwrite`).objectStore(`snapshots`),n={dados:JSON.parse(JSON.stringify(this.dataStore.dados)),timestamp:new Date().toISOString(),label:e||`Backup `+new Date().toLocaleString(`pt-BR`)};return new Promise((e,r)=>{let i=t.add(n);i.onsuccess=()=>{A(`Snapshot salvo no IndexedDB!`,`sucesso`),e(i.result)},i.onerror=()=>r(i.error)})}async listarSnapshotsIDB(){let e=(await this.db).transaction(`snapshots`,`readonly`).objectStore(`snapshots`).index(`timestamp`);return new Promise((t,n)=>{let r=e.openCursor(null,`prev`),i=[];r.onsuccess=e=>{let n=e.target.result;n?(i.push(n.value),n.continue()):t(i)},r.onerror=()=>n(r.error)})}async restaurarSnapshotIDB(e){let t=(await this.db).transaction(`snapshots`,`readonly`).objectStore(`snapshots`);return new Promise((n,r)=>{let i=t.get(e);i.onsuccess=e=>{let t=e.target.result;t?(this.dataStore.dados=JSON.parse(JSON.stringify(t.dados)),this.dataStore.salvar(),A(`Snapshot restaurado com sucesso!`,`sucesso`),n(!0)):r(Error(`Snapshot não encontrado`))},i.onerror=()=>r(i.error)})}async removerSnapshotIDB(e){let t=(await this.db).transaction(`snapshots`,`readwrite`).objectStore(`snapshots`);return new Promise((n,r)=>{let i=t.delete(e);i.onsuccess=()=>n(!0),i.onerror=()=>r(i.error)})}get googleToken(){return this.dataStore.dados.config.syncGoogleToken||``}get googleClientId(){return this.dataStore.dados.config.syncGoogleClientId||``}async autenticarGoogle(){let e=this.googleClientId;return e?new Promise(t=>{let n=window.location.origin+window.location.pathname,r=`crm_sync_`+Date.now(),i=`https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=`+encodeURIComponent(e)+`&redirect_uri=`+encodeURIComponent(n)+`&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&state=`+r,a=window.open(i,`google_oauth`,`width=600,height=700`);if(!a){A(`Pop-up bloqueado. Permita pop-ups para usar o Google Drive.`,`aviso`),t(!1);return}let o=setInterval(()=>{try{if(a.closed){clearInterval(o),t(!1);return}if(a.location.hash&&a.location.hash.includes(`access_token`)){let e=new URLSearchParams(a.location.hash.replace(`#`,``)).get(`access_token`);e&&(this.dataStore.dados.config.syncGoogleToken=e,this.dataStore.salvar(),A(`Google Drive autenticado!`,`sucesso`),a.close(),clearInterval(o),t(!0))}}catch(e){console.warn(`Polling Google Auth:`,e)}},500)}):(A(`Configure o Client ID do Google Drive nas Configurações.`,`aviso`),!1)}async _reqGoogle(e,t,n){let r=this.googleToken;if(!r)throw Error(`Google Drive não autenticado`);let i={method:t||`GET`,headers:{Authorization:`Bearer `+r,"Content-Type":`application/json`}};n&&(i.body=JSON.stringify(n));let a=await fetch(`https://www.googleapis.com/drive/v3/`+e,i);if(a.status===401)throw this.dataStore.dados.config.syncGoogleToken=``,this.dataStore.salvar(),A(`Token expirado. Autentique novamente.`,`erro`),Error(`Token expirado`);return a.json()}async _garantirPastaGoogle(){let e=await this._reqGoogle(`files?q=name%3D%27AtelierCRM%27%20and%20mimeType%3D%27application%2Fvnd.google-apps.folder%27&fields=files(id,name)`);return e.files&&e.files.length>0?e.files[0].id:(await this._reqGoogle(`files`,`POST`,{name:`AtelierCRM`,mimeType:`application/vnd.google-apps.folder`})).id}async backupGoogle(){if(!this.googleToken&&!await this.autenticarGoogle())return!1;j(`Enviando backup para Google Drive...`);try{let e=await this._garantirPastaGoogle(),t=JSON.stringify(this.dataStore.dados),n=`atelier-crm-backup-${new Date().toISOString().replace(/[:.]/g,`-`)}.json`,r=`crm_boundary_`+Date.now(),i=[`--`+r,`Content-Type: application/json; charset=UTF-8`,``,JSON.stringify({name:n,parents:[e]}),`--`+r,`Content-Type: application/json`,``,t,`--`+r+`--`].join(`\r
`),a=this.googleToken,o=await(await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart`,{method:`POST`,headers:{Authorization:`Bearer `+a,"Content-Type":`multipart/related; boundary=`+r},body:i})).json();return o.id?(this.dataStore.dados.config.syncLastBackup=new Date().toISOString(),this.dataStore.salvar(),M(),A(`Backup enviado para Google Drive!`,`sucesso`),!0):(M(),A(`Erro: `+(o.error?.message||`Falha no upload`),`erro`),!1)}catch(e){return M(),A(`Erro ao fazer backup no Google Drive: `+e.message,`erro`),!1}}async listarBackupsGoogle(){if(!this.googleToken)return[];try{return((await this._reqGoogle(`files?q=name%20contains%20%27atelier-crm-backup%27&orderBy=createdTime%20desc&fields=files(id,name,createdTime,size)`)).files||[]).map(e=>({id:e.id,nome:e.name,data:e.createdTime,tamanho:e.size}))}catch(e){return console.warn(`Falha ao listar backups Google Drive`,e),[]}}async restaurarGoogle(e){if(!this.googleToken)return A(`Google Drive não autenticado.`,`erro`),!1;j(`Restaurando do Google Drive...`);try{let t=await fetch(`https://www.googleapis.com/drive/v3/files/`+e+`?alt=media`,{headers:{Authorization:`Bearer `+this.googleToken}});if(!t.ok)throw Error(`Erro HTTP `+t.status);let n=await t.json();return n&&n.obras?(this.dataStore.dados=n,this.dataStore.salvar(),M(),A(`Backup restaurado do Google Drive!`,`sucesso`),!0):(M(),A(`Arquivo inválido no Google Drive.`,`erro`),!1)}catch(e){return M(),A(`Erro ao restaurar: `+e.message,`erro`),!1}}_webdavConfig(){let e=this.dataStore.dados.config;return{url:e.syncWebDAVUrl||``,user:e.syncWebDAVUser||``,pass:e.syncWebDAVPass||``}}async _reqWebDAV(e,t,n){let r=this._webdavConfig();if(!r.url)throw Error(`WebDAV não configurado`);let i=r.url.replace(/\/+$/,``)+`/`+e.replace(/^\//,``),a=btoa(r.user+`:`+r.pass),o={method:t||`GET`,headers:{Authorization:`Basic `+a}};n&&(o.body=n);let s=await fetch(i,o);if(!s.ok)throw Error(`WebDAV HTTP `+s.status);return s}async testarWebDAV(){try{return await this._reqWebDAV(``,`PROPFIND`),!0}catch(e){return console.warn(`Falha ao testar WebDAV`,e),!1}}async backupWebDAV(){j(`Enviando backup para WebDAV...`);try{let e=JSON.stringify(this.dataStore.dados),t=`atelier-crm-backup-${new Date().toISOString().replace(/[:.]/g,`-`)}.json`;return await this._reqWebDAV(t,`PUT`,e),this.dataStore.dados.config.syncLastBackup=new Date().toISOString(),this.dataStore.salvar(),M(),A(`Backup enviado para WebDAV!`,`sucesso`),!0}catch(e){return M(),A(`Erro WebDAV: `+e.message,`erro`),!1}}async listarBackupsWebDAV(){try{let e=await(await this._reqWebDAV(``,`PROPFIND`)).text(),t=new DOMParser().parseFromString(e,`text/xml`).querySelectorAll(`response`),n=[];return t.forEach(e=>{let t=e.querySelector(`href`)?.textContent||``,r=t.split(`/`).filter(Boolean).pop()||``;if(r.startsWith(`atelier-crm-backup`)){let i=e.querySelector(`getcontentlength`)?.textContent||`0`,a=e.querySelector(`getlastmodified`)?.textContent||``;n.push({nome:r,data:a,tamanho:i,href:t})}}),n.reverse()}catch(e){return console.warn(`Falha ao listar backups WebDAV`,e),[]}}async restaurarWebDAV(e){j(`Restaurando do WebDAV...`);try{let t=await(await this._reqWebDAV(e,`GET`)).json();return t&&t.obras?(this.dataStore.dados=t,this.dataStore.salvar(),M(),A(`Backup restaurado do WebDAV!`,`sucesso`),!0):(M(),A(`Arquivo inválido no WebDAV.`,`erro`),!1)}catch(e){return M(),A(`Erro ao restaurar WebDAV: `+e.message,`erro`),!1}}iniciarAutoBackup(){let e=this.dataStore.dados.config;if(!e.syncAutoBackup)return;let t=(e.syncAutoBackupInterval||30)*60*1e3;setInterval(async()=>{if(!this._backupEmAndamento){this._backupEmAndamento=!0;try{await this.salvarSnapshotIDB(`Auto `+new Date().toLocaleString(`pt-BR`))}catch(e){console.warn(`Auto-backup falhou`,e)}finally{this._backupEmAndamento=!1}}},t)}},aa=Hn(),oa=Xn(`obras`,{state:()=>({items:[],_loaded:!1}),getters:{porId:e=>t=>e.items.find(e=>e.id===t),filtrados:e=>t=>t?e.items.filter(e=>(e.titulo||``).toLowerCase().includes(t)):e.items,total:e=>e.items.length,valorAcervo:e=>e.items.reduce((e,t)=>e+(Number(t.preco)||0),0),vendidas:e=>e.items.filter(e=>e.status===`vendida`),emEstoque:e=>e.items.filter(e=>e.status!==`vendida`)},actions:{carregar(e){this.items=e,this._loaded=!0},adicionar(e){this.items.unshift(e),this._persistir()},atualizar(e,t){let n=this.items.findIndex(t=>t.id===e);n>=0&&(this.items[n]={...this.items[n],...t},this._persistir())},remover(e){this.items=this.items.filter(t=>t.id!==e),this._persistir()},_persistir(){try{localStorage.setItem(`atelier_crm_obras`,JSON.stringify(this.items));try{window.dataStore&&(window.dataStore.dados.obras=this.items)}catch(e){console.warn(`Falha ao sincronizar obras com DataStore`,e)}}catch(e){console.warn(`Falha ao persistir obras`,e)}}}}),W=()=>oa(aa),sa=Xn(`clientes`,{state:()=>({items:[],_loaded:!1}),getters:{porId:e=>t=>e.items.find(e=>e.id===t),total:e=>e.items.length},actions:{carregar(e){this.items=e,this._loaded=!0},adicionar(e){this.items.unshift(e),this._persistir()},atualizar(e,t){let n=this.items.findIndex(t=>t.id===e);n>=0&&(this.items[n]={...this.items[n],...t},this._persistir())},remover(e){this.items=this.items.filter(t=>t.id!==e),this._persistir()},_persistir(){try{localStorage.setItem(`atelier_crm_clientes`,JSON.stringify(this.items));try{window.dataStore&&(window.dataStore.dados.clientes=this.items)}catch(e){console.warn(`Falha ao sincronizar clientes com DataStore`,e)}}catch(e){console.warn(e)}}}}),G=()=>sa(aa),ca=Xn(`vendas`,{state:()=>({items:[],_loaded:!1}),getters:{porId:e=>t=>e.items.find(e=>e.id===t),total:e=>e.items.length,valorTotal:e=>e.items.reduce((e,t)=>e+(Number(t.valor)||0),0),doCliente:e=>t=>e.items.filter(e=>e.clienteId===t)},actions:{carregar(e){this.items=e,this._loaded=!0},adicionar(e){this.items.unshift(e),this._persistir()},atualizar(e,t){let n=this.items.findIndex(t=>t.id===e);n>=0&&(this.items[n]={...this.items[n],...t},this._persistir())},remover(e){this.items=this.items.filter(t=>t.id!==e),this._persistir()},_persistir(){try{localStorage.setItem(`atelier_crm_vendas`,JSON.stringify(this.items));try{window.dataStore&&(window.dataStore.dados.vendas=this.items)}catch(e){console.warn(`Falha ao sincronizar vendas com DataStore`,e)}}catch(e){console.warn(e)}}}}),K=()=>ca(aa),la=`atelier_crm_config`,ua=Xn(`config`,{state:()=>({artista:{nome:`Meu Ateliê`,email:``,telefone:``,assinatura:``},tema:`classico`,idioma:`pt-BR`,altoContraste:!1,tamanhoFonte:`medio`,pin:``,autoLock:!1,tourCompleted:!1,precificador:{valorHora:60,multiplicadorExperiencia:1.5,arredondamento:0,metaMensal:1e4,metaAnual:12e4,metaInicio:``,comissaoGaleria:0,negociacaoMin:-10,negociacaoMeta:0,negociacaoIdeal:15},tecnicasCusto:{óleo:{valorHora:80,multiplicador:2},acrílica:{valorHora:70,multiplicador:1.8},aquarela:{valorHora:65,multiplicador:1.6},guache:{valorHora:60,multiplicador:1.5},têmpera:{valorHora:65,multiplicador:1.6},desenho:{valorHora:45,multiplicador:1.3},gravura:{valorHora:70,multiplicador:1.8},escultura:{valorHora:90,multiplicador:2.2},cerâmica:{valorHora:75,multiplicador:1.9},têxtil:{valorHora:55,multiplicador:1.5},outra:{valorHora:60,multiplicador:1.5}},precificadorRegras:[],precificadorOrcamentos:[],moedaPadrao:`BRL`,taxasCambio:{USD:5,EUR:5.5,GBP:6.3},contadorRecibos:{},contadorPropostas:{},contadorCertificados:{},textoGarantia:``,syncGoogleClientId:``,syncGoogleToken:``,syncWebDAVUrl:``,syncWebDAVUser:``,syncWebDAVPass:``,syncAutoBackup:!1,syncAutoBackupInterval:30,syncLastBackup:``,supabaseUrl:``,supabasePublishableKey:``,syncSupabaseAccessToken:``,syncSupabaseUserId:``}),actions:{carregar(){try{let e=localStorage.getItem(la);if(e){let t=JSON.parse(e);Object.assign(this,t)}Object.assign(this,Br())}catch(e){console.warn(`Falha ao carregar config`,e)}},salvar(){try{Vr(this.$state);let e={...this.$state};Ei.forEach(t=>{delete e[t]}),localStorage.setItem(la,JSON.stringify(e));try{window.dataStore&&(window.dataStore.dados.config=this.$state)}catch(e){console.warn(`Falha ao sincronizar config com DataStore`,e)}}catch(e){console.warn(e)}},atualizar(e){Object.assign(this,e),this.salvar()}}}),q=()=>ua(aa),da={obras:{get:oa,single:W},clientes:{get:sa,single:G},vendas:{get:ca,single:K}},fa=class{constructor(e){this.dataStore=e,this.dados=e.dados,this._initStores()}_initStores(){W().carregar(this.dataStore.listar(`obras`)),G().carregar(this.dataStore.listar(`clientes`)),K().carregar(this.dataStore.listar(`vendas`)),q().carregar()}_piniaStore(e){let t=da[e];return t?t.get(aa):null}listar(e){let t=this._piniaStore(e);return t?t.items:this.dataStore.listar(e)}adicionar(e,t){let n=this._piniaStore(e);return n?(t.id=crypto.randomUUID?crypto.randomUUID():`id_`+Date.now()+`_`+Math.floor(Math.random()*1e3),t.criadoEm=t.criadoEm||new Date().toISOString(),n.adicionar({...t}),this.dataStore.dados[e]=n.items,this.dataStore.salvar(),t):this.dataStore.adicionar(e,t)}atualizar(e,t,n){let r=this._piniaStore(e);return r?(r.atualizar(t,n),this.dataStore.dados[e]=r.items,this.dataStore.salvar(),r.porId(t)):this.dataStore.atualizar(e,t,n)}remover(e,t){let n=this._piniaStore(e);n?(n.remover(t),this.dataStore.dados[e]=n.items,this.dataStore.salvar()):this.dataStore.remover(e,t)}buscarPorId(e,t){let n=this._piniaStore(e);return n?n.porId(t):this.dataStore.buscarPorId(e,t)}salvar(){this.dataStore.salvar(),q().salvar()}exportarBackup(){return this.dataStore.exportarBackup()}exportarColecao(e){return this.dataStore.exportarColecao(e)}importarBackup(e){return this.dataStore.importarBackup(e)}previewImport(e){return this.dataStore.previewImport(e)}obterHistoricoExport(){return this.dataStore.obterHistoricoExport()}},pa=[{alvo:`.sidebar`,titulo:`<i class="fas fa-palette"></i> Bem-vindo ao Atelier CRM!`,desc:`Este é seu hub criativo. Navegue entre os módulos pelo menu lateral.`,pos:`right`},{alvo:`#seletorTema`,titulo:`🎭 Escolha seu Tema`,desc:`Personalize o visual com 8 temas.`,pos:`bottom`},{alvo:`#btnBackup`,titulo:`<i class="fas fa-save"></i> Backup Seguro`,desc:`Exporte seus dados periodicamente.`,pos:`bottom`},{alvo:`[data-rota="catalogo"]`,titulo:`<i class="fas fa-images"></i> Catálogo de Obras`,desc:`Cadastre, edite e gerencie seu portfólio.`,pos:`right`},{alvo:`[data-rota="vendas"]`,titulo:`<i class="fas fa-dollar-sign"></i> Vendas e Recibos`,desc:`Registre vendas e gere recibos em PDF.`,pos:`right`},{alvo:`[data-rota="diario"]`,titulo:`<i class="fas fa-book-open"></i> Diário Criativo`,desc:`Registre seu processo diário.`,pos:`right`},{alvo:`[data-rota="configuracoes"]`,titulo:`⚙️ Configurações`,desc:`Configure idioma, segurança e dados do artista.`,pos:`right`}],ma=null,ha=!1,ga={"ctrl+k":{desc:`Busca global (spotlight)`,acao:()=>Xr()},"ctrl+n":{desc:`Nova obra`,acao:()=>{X?.navegar(`catalogo`),setTimeout(()=>Z.emitir(`abrir-nova-obra`),200)}},"ctrl+v":{desc:`Nova venda`,acao:()=>{X?.navegar(`vendas`),setTimeout(()=>Z.emitir(`abrir-nova-venda`),200)}},"ctrl+c":{desc:`Novo cliente`,acao:()=>{X?.navegar(`clientes`),setTimeout(()=>Z.emitir(`abrir-novo-cliente`),200)}},"ctrl+d":{desc:`Dashboard`,acao:()=>X?.navegar(`dashboard`)},"ctrl+g":{desc:`Galeria Virtual`,acao:()=>X?.navegar(`galeriaVirtual`)},"ctrl+p":{desc:`Precificador`,acao:()=>X?.navegar(`precificador`)},"ctrl+a":{desc:`Atelier/Estoque`,acao:()=>X?.navegar(`atelier`)},"ctrl+f":{desc:`Financeiro`,acao:()=>X?.navegar(`financeiro`)},"ctrl+r":{desc:`Rede Profissional`,acao:()=>X?.navegar(`rede`)},"ctrl+j":{desc:`Diário Criativo`,acao:()=>X?.navegar(`diario`)},"ctrl+b":{desc:`Backup rápido`,acao:()=>{Y?.exportarBackup(),A(`Backup exportado!`,`sucesso`),Q.registrar(`export`,`Backup exportado`,`Backup completo do sistema`,`export`)}},"ctrl+s":{desc:`Salvar dados`,acao:()=>{Y?.salvar(),A(`Dados salvos!`,`sucesso`),Q.registrar(`atualizacao`,`Dados salvos`,`Salvamento manual`,`atualizacao`)}},Escape:{desc:`Fechar modal`,acao:()=>P()},"/":{desc:`Mostrar todos os atalhos`,acao:()=>ai()},"?":{desc:`Mostrar ajuda`,acao:()=>ai()}},_a=ni(),va=`data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23e0e0e0" width="200" height="200"/%3E%3Ctext x="100" y="105" text-anchor="middle" fill="%23999" font-size="14" font-family="sans-serif"%3E...%3C/text%3E%3C/svg%3E`,J=[],ya=[`Reserve 15 minutos ao final do dia para registrar seu progresso no Diário Criativo.`,`Uma obra bem documentada valoriza 30% mais no mercado secundário.`,`Clientes que recebem atualizações do processo criativo têm 2x mais chances de recomprar.`,`Experimente a técnica dos 3 valores: luz, meia-tinta e sombra para dar volume.`,`Mantenha seu catálogo sempre atualizado — você nunca sabe quando um comprador aparece.`,`Use o Precificador para calcular o valor justo da sua hora de trabalho artístico.`,`Tire fotos das suas obras com luz natural difusa para melhores resultados.`,`O descanso é parte do processo criativo. Respeite seus limites.`,`Analise suas estatísticas criativas todo mês para identificar padrões de produtividade.`,`Uma boa relação com galeristas começa com um portfólio digital organizado.`,`Documente cada etapa do processo — o "making of" é tão valioso quanto a obra final.`,`Estabeleça metas realistas. 3 horas de pintura por dia é mais sustentável que 8.`,`Participe de pelo menos 2 editais ou exposições por ano.`,`Materiais de qualidade fazem diferença. Invista nos melhores pincéis que puder.`,`Faça pausas a cada 50 minutos para evitar fadiga visual e manter a criatividade.`,`Seu diário criativo é seu melhor instrumento de autoconhecimento artístico.`,`Compartilhe seu processo nas redes — o público ama ver o "antes e depois".`,`Uma paleta limitada (3-5 cores) força soluções criativas e harmoniosas.`,`Artistas que diversificam técnicas tendem a ter carreiras mais longas.`,`O networking não é sobre quantidade, mas qualidade das conexões.`,`Recibos e certificados bem feitos transmitem profissionalismo e segurança.`,`Revisite obras antigas periodicamente — sua evolução técnica vai te surpreender.`,`Crie uma série temática anual. Colecionadores valorizam coesão de portfólio.`,`Use o calendário do Diário para planejar seus ciclos criativos com antecedência.`,`A luz do seu ateliê muda com as estações. Aproveite cada qualidade de luz.`,`Faça um backup dos dados toda semana — seu registro criativo é precioso.`,`O mercado de arte valoriza histórias. Cada obra tem uma — conte-a bem.`,`Estude um mestre por mês. Incorpore uma técnica nova ao seu repertório.`,`Clientes satisfeitos indicam. Invista no pós-venda e no relacionamento.`,`A arte é um músculo: quanto mais você pratica, mais forte sua voz criativa fica.`],Y=new fa(new Ai),window.dataStore=Y,ba=new Ni(Y),X=new Fi(Y),Z=new ji,Q=new Mi,xa=new Ii(Y,X),Sa=new Li(Y,X),Ca=new Bi(Y),wa=new Ri(Y,X),Ta=new zi(Y,X,Ca),Ea=new Vi(Y,X),Da=new Hi(Y,X),Oa=new Ui(Y,X),ka=new Gi(Y,X),Aa=new Ki(Y,X),ja=new Ji(Y,X),Ma=new qi(Y,X),Na=new Yi(Y,X),$=new ia(Y),Pa=new Zi(Y,X),Fa=new ta(Y,X),Ia=new na(Y,X),La=new ra(Y,X),Ra=new ea(Y,X),document.getElementById(`viewPrincipal`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-abrir-modal]`);if(t){wr(t.dataset.abrirModal,Y,X);return}if(e.target.id===`btnAtalhoNovaObra`){Z.emitir(`abrir-nova-obra`);return}if(e.target.getAttribute(`data-acao`)===`irCatalogo`){X.navegar(`catalogo`);return}if(e.target.id===`btnAtalhoVenda`){Z.emitir(`abrir-nova-venda`);return}if(e.target.id===`btnAtalhoRecibo`){Z.emitir(`abrir-recibo-rapido`);return}}),document.getElementById(`btnColapsar`).addEventListener(`click`,()=>{document.getElementById(`sidebar`).classList.toggle(`colapsada`)}),document.getElementById(`btnBackup`).addEventListener(`click`,()=>{Y.exportarBackup(),A(`Backup exportado com sucesso!`,`sucesso`)}),document.addEventListener(`submit`,e=>{let t=e.target,n=t&&t.querySelector&&t.querySelector(`button[type="submit"]`);n&&n.tagName===`BUTTON`&&(n.classList.add(`btn-carregando`),setTimeout(()=>n.classList.remove(`btn-carregando`),600))},!0),document.getElementById(`modalOverlay`).addEventListener(`click`,e=>{e.target.id===`modalOverlay`&&P()}),window.innerWidth<=860&&document.getElementById(`sidebar`).classList.add(`colapsada`),window.mostrarToast=function(e,t=`info`){let n=document.getElementById(`toast`),r=document.getElementById(`toastMsg`),i=n?.querySelector(`i`),a=document.getElementById(`toastProgress`);if(!n||!r)return;let o={sucesso:`fa-check-circle`,erro:`fa-times-circle`,aviso:`fa-exclamation-triangle`,info:`fa-info-circle`},s=/<i\s|[\u{1F000}-\u{1FFFF}]/u.test(e);i&&t&&o[t]&&!s&&(i.className=`fas `+o[t]),r.textContent=e,n.className=`toast`+(t&&o[t]?` `+t:``),n.classList.add(`mostrar`),a&&(a.style.animation=`none`,a.offsetWidth,a.style.animation=``),clearTimeout(window._toastTimeout),window._toastTimeout=setTimeout(()=>{n.classList.add(`saindo`),setTimeout(()=>{n.classList.remove(`mostrar`,`saindo`)},250)},2800)},za=Fi.prototype.navegar,Fi.prototype.navegar=function(e){za.call(this,e),_i(this.container,e)},`serviceWorker`in navigator&&navigator.serviceWorker.register(`./sw.js`).catch(()=>{}),ba.inicializar(),Dr(),X.inicializar(),ii(),setTimeout(()=>ei(),500),setTimeout(()=>$.iniciarAutoBackup(),2e3),si(),Qr(),ci(),li(),Y&&!Y.dados.config.tourCompleted&&setTimeout(()=>$r(),1e3),(function(){let e=window.location.hash;e&&e.startsWith(`#portal`)?setTimeout(()=>X.navegar(`portal`),200):e&&e.includes(`galeria=virtual`)&&setTimeout(()=>{X.navegar(`galeriaVirtual`),e.includes(`tour=obras-disponiveis`)&&Oa&&setTimeout(()=>Oa.iniciarTour(),800)},300)})(),Ba=null,window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),Ba=e;let t=document.getElementById(`btnInstalarPWA`);t&&(t.style.display=`flex`)}),window.instalarPWA=async function(){if(Ba&&(Ba.prompt(),(await Ba.userChoice).outcome===`accepted`)){Ba=null;let e=document.getElementById(`btnInstalarPWA`);e&&(e.style.display=`none`)}},new MutationObserver(()=>{pi()}).observe(document.getElementById(`viewPrincipal`),{childList:!0,subtree:!0}),typeof module<`u`&&module.exports&&(module.exports={DataStore:Ai,StoreBridge:fa,pinia:aa,obraStore:W,useObraStore:oa,clienteStore:G,useClienteStore:sa,vendaStore:K,useVendaStore:ca,configStore:q,useConfigStore:ua,EventBus:ji,ThemeEngine:Ni,Router:Fi,DashboardView:Ii,CatalogoView:Li,ClientesView:Ri,VendasView:zi,CertificadosView:Vi,ReferenciasView:Hi,GaleriaVirtualView:Ui,PrecificadorView:Gi,AtelierView:Ki,RedeView:qi,DiarioView:Ji,PortalView:Yi,CloudSync:ia,EncomendasView:Zi,ExposicoesView:ta,FinanceiroView:na,ConfiguracoesView:ra,ExportImportView:ea,ImageLightbox:Qi,abrirLightbox:Yr,imageLightbox:$i,formatarMoeda:O,formatarData:k,classeStatus:F,rotuloStatus:pr,classeStatusVenda:yr,rotuloStatusVenda:br,sanitizarHTML:B,sanitizarURL:di,sanitizarRich:fi,debounce:Tr,gerarImagemPlaceholder:I,calcularObrasPorMes:mr,gerarGraficoSVG:hr,capitalizarTexto:L,abrirModal:N,fecharModal:P,mostrarToast:A,confirmarAcao:R,mostrarToastComDesfazer:z,renderizarDashboard:ui,renderizarViewPlaceholder:vr,PDFGenerator:Bi,gerarQRCodeDataUrl:xr,observarImagens:pi,aplicarTransicaoView:_i,iniciarMonitorInatividade:ei,bloquearTela:ti,dispararConfetti:Zr,obterDicaDoDia:vi,iniciarTour:$r})}));t((()=>{n(),r(),Va()}))();