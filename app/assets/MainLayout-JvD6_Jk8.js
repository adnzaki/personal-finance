import{x as ne,c as u,h as S,O as Te,g as he,i as qe,P as H,R as Qe,r as L,w as k,S as me,U as at,V as Ke,o as Ue,W as De,X as Xe,Y as ze,E as lt,Z as nt,t as fe,$ as Ge,a0 as ot,a1 as rt,a2 as ut,a3 as it,a4 as Ie,a5 as Ae,a6 as st,a7 as ct,a8 as dt,a9 as vt,aa as ft,y as ht,ab as mt,A as bt,ac as gt,ad as yt,ae as Fe,B as ke,af as We,ag as wt,_ as Je,l as ve,J as _e,n as D,f as $,K as Ye,M as Ze,I as kt,ah as He,u as Ee,G as _t,q as ce,m as Tt,F as qt,ai as Ct,aj as xt}from"./index-DHhMYjuE.js";import{Q as Oe,a as Lt,b as St}from"./QLayout-BsJDeSkB.js";import{r as Bt}from"./selection-kP7jgO5W.js";import{a as Ne,b as $t,Q as pe}from"./QItemLabel-DJbbNSqO.js";import{Q as Pt}from"./QList-DekyhpMK.js";import{T as Ve}from"./TouchPan-j5gDPP88.js";import{u as Rt}from"./use-quasar-DiZQ859o.js";const Mt=ne({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:T}){const h=u(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>S("div",{class:h.value},Te(T.default))}}),It=ne({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:T}){const h=u(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>S("div",{class:h.value,role:"toolbar"},Te(T.default))}}),Vt=ne({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:T,emit:h}){const{proxy:{$q:d}}=he(),a=qe(Qe,H);if(a===H)return console.error("QHeader needs to be child of QLayout"),H;const g=L(parseInt(e.heightHint,10)),x=L(!0),I=u(()=>e.reveal===!0||a.view.value.indexOf("H")!==-1||d.platform.is.ios&&a.isContainer.value===!0),B=u(()=>{if(e.modelValue!==!0)return 0;if(I.value===!0)return x.value===!0?g.value:0;const c=g.value-a.scroll.value.position;return c>0?c:0}),O=u(()=>e.modelValue!==!0||I.value===!0&&x.value!==!0),n=u(()=>e.modelValue===!0&&O.value===!0&&e.reveal===!0),P=u(()=>"q-header q-layout__section--marginal "+(I.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(O.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),R=u(()=>{const c=a.rows.value.top,i={};return c[0]==="l"&&a.left.space===!0&&(i[d.lang.rtl===!0?"right":"left"]=`${a.left.size}px`),c[2]==="r"&&a.right.space===!0&&(i[d.lang.rtl===!0?"left":"right"]=`${a.right.size}px`),i});function _(c,i){a.update("header",c,i)}function f(c,i){c.value!==i&&(c.value=i)}function C({height:c}){f(g,c),_("size",c)}function q(c){n.value===!0&&f(x,!0),h("focusin",c)}k(()=>e.modelValue,c=>{_("space",c),f(x,!0),a.animate()}),k(B,c=>{_("offset",c)}),k(()=>e.reveal,c=>{c===!1&&f(x,e.modelValue)}),k(x,c=>{a.animate(),h("reveal",c)}),k(a.scroll,c=>{e.reveal===!0&&f(x,c.direction==="up"||c.position<=e.revealOffset||c.position-c.inflectionPoint<100)});const m={};return a.instances.header=m,e.modelValue===!0&&_("size",g.value),_("space",e.modelValue),_("offset",B.value),me(()=>{a.instances.header===m&&(a.instances.header=void 0,_("size",0),_("offset",0),_("space",!1))}),()=>{const c=at(T.default,[]);return e.elevated===!0&&c.push(S("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),c.push(S(Oe,{debounce:0,onResize:C})),S("header",{class:P.value,style:R.value,onFocusin:q},c)}}});let At=0;const Qt=["click","keydown"],Dt={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${At++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Ot(e,T,h,d){const a=qe(Ke,H);if(a===H)return console.error("QTab/QRouteTab component needs to be child of QTabs"),H;const{proxy:g}=he(),x=L(null),I=L(null),B=L(null),O=u(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),n=u(()=>a.currentModel.value===e.name),P=u(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(n.value===!0?" q-tab--active"+(a.tabProps.value.activeClass?" "+a.tabProps.value.activeClass:"")+(a.tabProps.value.activeColor?` text-${a.tabProps.value.activeColor}`:"")+(a.tabProps.value.activeBgColor?` bg-${a.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&a.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||a.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(d!==void 0?d.linkClass.value:"")),R=u(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(a.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),_=u(()=>e.disable===!0||a.hasFocus.value===!0||n.value===!1&&a.hasActiveTab.value===!0?-1:e.tabindex||0);function f(i,M){if(M!==!0&&x.value!==null&&x.value.focus(),e.disable===!0){d!==void 0&&d.hasRouterLink.value===!0&&ze(i);return}if(d===void 0){a.updateModel({name:e.name}),h("click",i);return}if(d.hasRouterLink.value===!0){const s=(b={})=>{let V;const W=b.to===void 0||ot(b.to,e.to)===!0?a.avoidRouteWatcher=rt():null;return d.navigateToRouterLink(i,{...b,returnRouterError:!0}).catch(z=>{V=z}).then(z=>{if(W===a.avoidRouteWatcher&&(a.avoidRouteWatcher=!1,V===void 0&&(z===void 0||z.message!==void 0&&z.message.startsWith("Avoided redundant navigation")===!0)&&a.updateModel({name:e.name})),b.returnRouterError===!0)return V!==void 0?Promise.reject(V):z})};h("click",i,s),i.defaultPrevented!==!0&&s();return}h("click",i)}function C(i){lt(i,[13,32])?f(i,!0):nt(i)!==!0&&i.keyCode>=35&&i.keyCode<=40&&i.altKey!==!0&&i.metaKey!==!0&&a.onKbdNavigate(i.keyCode,g.$el)===!0&&ze(i),h("keydown",i)}function q(){const i=a.tabProps.value.narrowIndicator,M=[],s=S("div",{ref:B,class:["q-tab__indicator",a.tabProps.value.indicatorClass]});e.icon!==void 0&&M.push(S(fe,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&M.push(S("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&M.push(e.alertIcon!==void 0?S(fe,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):S("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),i===!0&&M.push(s);const b=[S("div",{class:"q-focus-helper",tabindex:-1,ref:x}),S("div",{class:R.value},Ge(T.default,M))];return i===!1&&b.push(s),b}const m={name:u(()=>e.name),rootRef:I,tabIndicatorRef:B,routeData:d};me(()=>{a.unregisterTab(m)}),Ue(()=>{a.registerTab(m)});function c(i,M){const s={ref:I,class:P.value,tabindex:_.value,role:"tab","aria-selected":n.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:f,onKeydown:C,...M};return De(S(i,s,q()),[[Xe,O.value]])}return{renderTab:c,$tabs:a}}const de=ne({name:"QRouteTab",props:{...ut,...Dt},emits:Qt,setup(e,{slots:T,emit:h}){const d=it({useDisableForRouterLinkProps:!1}),{renderTab:a,$tabs:g}=Ot(e,T,h,{exact:u(()=>e.exact),...d});return k(()=>`${e.name} | ${e.exact} | ${(d.resolvedLink.value||{}).href}`,()=>{g.verifyRouteModel()}),()=>a(d.linkTag.value,d.linkAttrs.value)}});function zt(e,T,h){const d=h===!0?["left","right"]:["top","bottom"];return`absolute-${T===!0?d[0]:d[1]}${e?` text-${e}`:""}`}const Ft=["left","center","right","justify"],Wt=ne({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Ft.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:T,emit:h}){const{proxy:d}=he(),{$q:a}=d,{registerTick:g}=Ie(),{registerTick:x}=Ie(),{registerTick:I}=Ie(),{registerTimeout:B,removeTimeout:O}=Ae(),{registerTimeout:n,removeTimeout:P}=Ae(),R=L(null),_=L(null),f=L(e.modelValue),C=L(!1),q=L(!0),m=L(!1),c=L(!1),i=[],M=L(0),s=L(!1);let b=null,V=null,W;const z=u(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:zt(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),E=u(()=>{const l=M.value,o=f.value;for(let t=0;t<l;t++)if(i[t].name.value===o)return!0;return!1}),U=u(()=>`q-tabs__content--align-${C.value===!0?"left":c.value===!0?"justify":e.align}`),be=u(()=>`q-tabs row no-wrap items-center q-tabs--${C.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),X=u(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+U.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),G=u(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),ae=u(()=>e.vertical!==!0&&a.lang.rtl===!0),J=u(()=>Bt===!1&&ae.value===!0);k(ae,ee),k(()=>e.modelValue,l=>{le({name:l,setCurrent:!0,skipEmit:!0})}),k(()=>e.outsideArrows,Y);function le({name:l,setCurrent:o,skipEmit:t}){f.value!==l&&(t!==!0&&e["onUpdate:modelValue"]!==void 0&&h("update:modelValue",l),(o===!0||e["onUpdate:modelValue"]===void 0)&&(Ce(f.value,l),f.value=l))}function Y(){g(()=>{Z({width:R.value.offsetWidth,height:R.value.offsetHeight})})}function Z(l){if(G.value===void 0||_.value===null)return;const o=l[G.value.container],t=Math.min(_.value[G.value.scroll],Array.prototype.reduce.call(_.value.children,(v,y)=>v+(y[G.value.content]||0),0)),r=o>0&&t>o;C.value=r,r===!0&&x(ee),c.value=o<parseInt(e.breakpoint,10)}function Ce(l,o){const t=l!=null&&l!==""?i.find(v=>v.name.value===l):null,r=o!=null&&o!==""?i.find(v=>v.name.value===o):null;if(t&&r){const v=t.tabIndicatorRef.value,y=r.tabIndicatorRef.value;b!==null&&(clearTimeout(b),b=null),v.style.transition="none",v.style.transform="none",y.style.transition="none",y.style.transform="none";const w=v.getBoundingClientRect(),A=y.getBoundingClientRect();y.style.transform=e.vertical===!0?`translate3d(0,${w.top-A.top}px,0) scale3d(1,${A.height?w.height/A.height:1},1)`:`translate3d(${w.left-A.left}px,0,0) scale3d(${A.width?w.width/A.width:1},1,1)`,I(()=>{b=setTimeout(()=>{b=null,y.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",y.style.transform="none"},70)})}r&&C.value===!0&&p(r.rootRef.value)}function p(l){const{left:o,width:t,top:r,height:v}=_.value.getBoundingClientRect(),y=l.getBoundingClientRect();let w=e.vertical===!0?y.top-r:y.left-o;if(w<0){_.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(w),ee();return}w+=e.vertical===!0?y.height-v:y.width-t,w>0&&(_.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(w),ee())}function ee(){const l=_.value;if(l===null)return;const o=l.getBoundingClientRect(),t=e.vertical===!0?l.scrollTop:Math.abs(l.scrollLeft);ae.value===!0?(q.value=Math.ceil(t+o.width)<l.scrollWidth-1,m.value=t>0):(q.value=t>0,m.value=e.vertical===!0?Math.ceil(t+o.height)<l.scrollHeight:Math.ceil(t+o.width)<l.scrollWidth)}function ue(l){V!==null&&clearInterval(V),V=setInterval(()=>{Se(l)===!0&&j()},5)}function ge(){ue(J.value===!0?Number.MAX_SAFE_INTEGER:0)}function ye(){ue(J.value===!0?0:Number.MAX_SAFE_INTEGER)}function j(){V!==null&&(clearInterval(V),V=null)}function xe(l,o){const t=Array.prototype.filter.call(_.value.children,A=>A===o||A.matches&&A.matches(".q-tab.q-focusable")===!0),r=t.length;if(r===0)return;if(l===36)return p(t[0]),t[0].focus(),!0;if(l===35)return p(t[r-1]),t[r-1].focus(),!0;const v=l===(e.vertical===!0?38:37),y=l===(e.vertical===!0?40:39),w=v===!0?-1:y===!0?1:void 0;if(w!==void 0){const A=ae.value===!0?-1:1,K=t.indexOf(o)+w*A;return K>=0&&K<r&&(p(t[K]),t[K].focus({preventScroll:!0})),!0}}const Le=u(()=>J.value===!0?{get:l=>Math.abs(l.scrollLeft),set:(l,o)=>{l.scrollLeft=-o}}:e.vertical===!0?{get:l=>l.scrollTop,set:(l,o)=>{l.scrollTop=o}}:{get:l=>l.scrollLeft,set:(l,o)=>{l.scrollLeft=o}});function Se(l){const o=_.value,{get:t,set:r}=Le.value;let v=!1,y=t(o);const w=l<y?-1:1;return y+=w*5,y<0?(v=!0,y=0):(w===-1&&y<=l||w===1&&y>=l)&&(v=!0,y=l),r(o,y),ee(),v}function we(l,o){for(const t in l)if(l[t]!==o[t])return!1;return!0}function Be(){let l=null,o={matchedLen:0,queryDiff:9999,hrefLen:0};const t=i.filter(w=>w.routeData!==void 0&&w.routeData.hasRouterLink.value===!0),{hash:r,query:v}=d.$route,y=Object.keys(v).length;for(const w of t){const A=w.routeData.exact.value===!0;if(w.routeData[A===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:K,query:Re,matched:et,href:tt}=w.routeData.resolvedLink.value,Me=Object.keys(Re).length;if(A===!0){if(K!==r||Me!==y||we(v,Re)===!1)continue;l=w.name.value;break}if(K!==""&&K!==r||Me!==0&&we(Re,v)===!1)continue;const te={matchedLen:et.length,queryDiff:y-Me,hrefLen:tt.length-K.length};if(te.matchedLen>o.matchedLen){l=w.name.value,o=te;continue}else if(te.matchedLen!==o.matchedLen)continue;if(te.queryDiff<o.queryDiff)l=w.name.value,o=te;else if(te.queryDiff!==o.queryDiff)continue;te.hrefLen>o.hrefLen&&(l=w.name.value,o=te)}l===null&&i.some(w=>w.routeData===void 0&&w.name.value===f.value)===!0||le({name:l,setCurrent:!0})}function ie(l){if(O(),s.value!==!0&&R.value!==null&&l.target&&typeof l.target.closest=="function"){const o=l.target.closest(".q-tab");o&&R.value.contains(o)===!0&&(s.value=!0,C.value===!0&&p(o))}}function Q(){B(()=>{s.value=!1},30)}function F(){se.avoidRouteWatcher===!1?n(Be):P()}function oe(){if(W===void 0){const l=k(()=>d.$route.fullPath,F);W=()=>{l(),W=void 0}}}function $e(l){i.push(l),M.value++,Y(),l.routeData===void 0||d.$route===void 0?n(()=>{if(C.value===!0){const o=f.value,t=o!=null&&o!==""?i.find(r=>r.name.value===o):null;t&&p(t.rootRef.value)}}):(oe(),l.routeData.hasRouterLink.value===!0&&F())}function Pe(l){i.splice(i.indexOf(l),1),M.value--,Y(),W!==void 0&&l.routeData!==void 0&&(i.every(o=>o.routeData===void 0)===!0&&W(),F())}const se={currentModel:f,tabProps:z,hasFocus:s,hasActiveTab:E,registerTab:$e,unregisterTab:Pe,verifyRouteModel:F,updateModel:le,onKbdNavigate:xe,avoidRouteWatcher:!1};st(Ke,se);function re(){b!==null&&clearTimeout(b),j(),W!==void 0&&W()}let N;return me(re),ct(()=>{N=W!==void 0,re()}),dt(()=>{N===!0&&oe(),Y()}),()=>S("div",{ref:R,class:be.value,role:"tablist",onFocusin:ie,onFocusout:Q},[S(Oe,{onResize:Z}),S("div",{ref:_,class:X.value,onScroll:ee},Te(T.default)),S(fe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(q.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||a.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:ge,onTouchstartPassive:ge,onMouseupPassive:j,onMouseleavePassive:j,onTouchendPassive:j}),S(fe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(m.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||a.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ye,onTouchstartPassive:ye,onMouseupPassive:j,onMouseleavePassive:j,onTouchendPassive:j})])}}),Ht=ne({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:T,emit:h}){const{proxy:{$q:d}}=he(),a=qe(Qe,H);if(a===H)return console.error("QFooter needs to be child of QLayout"),H;const g=L(parseInt(e.heightHint,10)),x=L(!0),I=L(vt.value===!0||a.isContainer.value===!0?0:window.innerHeight),B=u(()=>e.reveal===!0||a.view.value.indexOf("F")!==-1||d.platform.is.ios&&a.isContainer.value===!0),O=u(()=>a.isContainer.value===!0?a.containerHeight.value:I.value),n=u(()=>{if(e.modelValue!==!0)return 0;if(B.value===!0)return x.value===!0?g.value:0;const s=a.scroll.value.position+O.value+g.value-a.height.value;return s>0?s:0}),P=u(()=>e.modelValue!==!0||B.value===!0&&x.value!==!0),R=u(()=>e.modelValue===!0&&P.value===!0&&e.reveal===!0),_=u(()=>"q-footer q-layout__section--marginal "+(B.value===!0?"fixed":"absolute")+"-bottom"+(e.bordered===!0?" q-footer--bordered":"")+(P.value===!0?" q-footer--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus"+(B.value!==!0?" hidden":""):"")),f=u(()=>{const s=a.rows.value.bottom,b={};return s[0]==="l"&&a.left.space===!0&&(b[d.lang.rtl===!0?"right":"left"]=`${a.left.size}px`),s[2]==="r"&&a.right.space===!0&&(b[d.lang.rtl===!0?"left":"right"]=`${a.right.size}px`),b});function C(s,b){a.update("footer",s,b)}function q(s,b){s.value!==b&&(s.value=b)}function m({height:s}){q(g,s),C("size",s)}function c(){if(e.reveal!==!0)return;const{direction:s,position:b,inflectionPoint:V}=a.scroll.value;q(x,s==="up"||b-V<100||a.height.value-O.value-b-g.value<300)}function i(s){R.value===!0&&q(x,!0),h("focusin",s)}k(()=>e.modelValue,s=>{C("space",s),q(x,!0),a.animate()}),k(n,s=>{C("offset",s)}),k(()=>e.reveal,s=>{s===!1&&q(x,e.modelValue)}),k(x,s=>{a.animate(),h("reveal",s)}),k([g,a.scroll,a.height],c),k(()=>d.screen.height,s=>{a.isContainer.value!==!0&&q(I,s)});const M={};return a.instances.footer=M,e.modelValue===!0&&C("size",g.value),C("space",e.modelValue),C("offset",n.value),me(()=>{a.instances.footer===M&&(a.instances.footer=void 0,C("size",0),C("offset",0),C("space",!1))}),()=>{const s=Ge(T.default,[S(Oe,{debounce:0,onResize:m})]);return e.elevated===!0&&s.push(S("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),S("footer",{class:_.value,style:f.value,onFocusin:i},s)}}}),je=150,Et=ne({name:"QDrawer",inheritAttrs:!1,props:{...ft,...ht,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...mt,"onLayout","miniState"],setup(e,{slots:T,emit:h,attrs:d}){const a=he(),{proxy:{$q:g}}=a,x=bt(e,g),{preventBodyScroll:I}=wt(),{registerTimeout:B,removeTimeout:O}=Ae(),n=qe(Qe,H);if(n===H)return console.error("QDrawer needs to be child of QLayout"),H;let P,R=null,_;const f=L(e.behavior==="mobile"||e.behavior!=="desktop"&&n.totalWidth.value<=e.breakpoint),C=u(()=>e.mini===!0&&f.value!==!0),q=u(()=>C.value===!0?e.miniWidth:e.width),m=L(e.showIfAbove===!0&&f.value===!1?!0:e.modelValue===!0),c=u(()=>e.persistent!==!0&&(f.value===!0||Ce.value===!0));function i(t,r){if(V(),t!==!1&&n.animate(),Q(0),f.value===!0){const v=n.instances[J.value];v!==void 0&&v.belowBreakpoint===!0&&v.hide(!1),F(1),n.isContainer.value!==!0&&I(!0)}else F(0),t!==!1&&oe(!1);B(()=>{t!==!1&&oe(!0),r!==!0&&h("show",t)},je)}function M(t,r){W(),t!==!1&&n.animate(),F(0),Q(U.value*q.value),re(),r!==!0?B(()=>{h("hide",t)},je):O()}const{show:s,hide:b}=gt({showing:m,hideOnRouteChange:c,handleShow:i,handleHide:M}),{addToHistory:V,removeFromHistory:W}=yt(m,b,c),z={belowBreakpoint:f,hide:b},E=u(()=>e.side==="right"),U=u(()=>(g.lang.rtl===!0?-1:1)*(E.value===!0?1:-1)),be=L(0),X=L(!1),G=L(!1),ae=L(q.value*U.value),J=u(()=>E.value===!0?"left":"right"),le=u(()=>m.value===!0&&f.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:q.value:0),Y=u(()=>e.overlay===!0||e.miniToOverlay===!0||n.view.value.indexOf(E.value?"R":"L")!==-1||g.platform.is.ios===!0&&n.isContainer.value===!0),Z=u(()=>e.overlay===!1&&m.value===!0&&f.value===!1),Ce=u(()=>e.overlay===!0&&m.value===!0&&f.value===!1),p=u(()=>"fullscreen q-drawer__backdrop"+(m.value===!1&&X.value===!1?" hidden":"")),ee=u(()=>({backgroundColor:`rgba(0,0,0,${be.value*.4})`})),ue=u(()=>E.value===!0?n.rows.value.top[2]==="r":n.rows.value.top[0]==="l"),ge=u(()=>E.value===!0?n.rows.value.bottom[2]==="r":n.rows.value.bottom[0]==="l"),ye=u(()=>{const t={};return n.header.space===!0&&ue.value===!1&&(Y.value===!0?t.top=`${n.header.offset}px`:n.header.space===!0&&(t.top=`${n.header.size}px`)),n.footer.space===!0&&ge.value===!1&&(Y.value===!0?t.bottom=`${n.footer.offset}px`:n.footer.space===!0&&(t.bottom=`${n.footer.size}px`)),t}),j=u(()=>{const t={width:`${q.value}px`,transform:`translateX(${ae.value}px)`};return f.value===!0?t:Object.assign(t,ye.value)}),xe=u(()=>"q-drawer__content fit "+(n.isContainer.value!==!0?"scroll":"overflow-auto")),Le=u(()=>`q-drawer q-drawer--${e.side}`+(G.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(x.value===!0?" q-drawer--dark q-dark":"")+(X.value===!0?" no-transition":m.value===!0?"":" q-layout--prevent-focus")+(f.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${C.value===!0?"mini":"standard"}`+(Y.value===!0||Z.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(ue.value===!0?" q-drawer--top-padding":""))),Se=u(()=>{const t=g.lang.rtl===!0?e.side:J.value;return[[Ve,Pe,void 0,{[t]:!0,mouse:!0}]]}),we=u(()=>{const t=g.lang.rtl===!0?J.value:e.side;return[[Ve,se,void 0,{[t]:!0,mouse:!0}]]}),Be=u(()=>{const t=g.lang.rtl===!0?J.value:e.side;return[[Ve,se,void 0,{[t]:!0,mouse:!0,mouseAllDir:!0}]]});function ie(){l(f,e.behavior==="mobile"||e.behavior!=="desktop"&&n.totalWidth.value<=e.breakpoint)}k(f,t=>{t===!0?(P=m.value,m.value===!0&&b(!1)):e.overlay===!1&&e.behavior!=="mobile"&&P!==!1&&(m.value===!0?(Q(0),F(0),re()):s(!1))}),k(()=>e.side,(t,r)=>{n.instances[r]===z&&(n.instances[r]=void 0,n[r].space=!1,n[r].offset=0),n.instances[t]=z,n[t].size=q.value,n[t].space=Z.value,n[t].offset=le.value}),k(n.totalWidth,()=>{(n.isContainer.value===!0||document.qScrollPrevented!==!0)&&ie()}),k(()=>e.behavior+e.breakpoint,ie),k(n.isContainer,t=>{m.value===!0&&I(t!==!0),t===!0&&ie()}),k(n.scrollbarWidth,()=>{Q(m.value===!0?0:void 0)}),k(le,t=>{N("offset",t)}),k(Z,t=>{h("onLayout",t),N("space",t)}),k(E,()=>{Q()}),k(q,t=>{Q(),o(e.miniToOverlay,t)}),k(()=>e.miniToOverlay,t=>{o(t,q.value)}),k(()=>g.lang.rtl,()=>{Q()}),k(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&($e(),n.animate())}),k(C,t=>{h("miniState",t)});function Q(t){t===void 0?Fe(()=>{t=m.value===!0?0:q.value,Q(U.value*t)}):(n.isContainer.value===!0&&E.value===!0&&(f.value===!0||Math.abs(t)===q.value)&&(t+=U.value*n.scrollbarWidth.value),ae.value=t)}function F(t){be.value=t}function oe(t){const r=t===!0?"remove":n.isContainer.value!==!0?"add":"";r!==""&&document.body.classList[r]("q-body--drawer-toggle")}function $e(){R!==null&&clearTimeout(R),a.proxy&&a.proxy.$el&&a.proxy.$el.classList.add("q-drawer--mini-animate"),G.value=!0,R=setTimeout(()=>{R=null,G.value=!1,a&&a.proxy&&a.proxy.$el&&a.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function Pe(t){if(m.value!==!1)return;const r=q.value,v=ke(t.distance.x,0,r);if(t.isFinal===!0){v>=Math.min(75,r)===!0?s():(n.animate(),F(0),Q(U.value*r)),X.value=!1;return}Q((g.lang.rtl===!0?E.value!==!0:E.value)?Math.max(r-v,0):Math.min(0,v-r)),F(ke(v/r,0,1)),t.isFirst===!0&&(X.value=!0)}function se(t){if(m.value!==!0)return;const r=q.value,v=t.direction===e.side,y=(g.lang.rtl===!0?v!==!0:v)?ke(t.distance.x,0,r):0;if(t.isFinal===!0){Math.abs(y)<Math.min(75,r)===!0?(n.animate(),F(1),Q(0)):b(),X.value=!1;return}Q(U.value*y),F(ke(1-y/r,0,1)),t.isFirst===!0&&(X.value=!0)}function re(){I(!1),oe(!0)}function N(t,r){n.update(e.side,t,r)}function l(t,r){t.value!==r&&(t.value=r)}function o(t,r){N("size",t===!0?e.miniWidth:r)}return n.instances[e.side]=z,o(e.miniToOverlay,q.value),N("space",Z.value),N("offset",le.value),e.showIfAbove===!0&&e.modelValue!==!0&&m.value===!0&&e["onUpdate:modelValue"]!==void 0&&h("update:modelValue",!0),Ue(()=>{h("onLayout",Z.value),h("miniState",C.value),P=e.showIfAbove===!0;const t=()=>{(m.value===!0?i:M)(!1,!0)};if(n.totalWidth.value!==0){Fe(t);return}_=k(n.totalWidth,()=>{_(),_=void 0,m.value===!1&&e.showIfAbove===!0&&f.value===!1?s(!1):t()})}),me(()=>{_!==void 0&&_(),R!==null&&(clearTimeout(R),R=null),m.value===!0&&re(),n.instances[e.side]===z&&(n.instances[e.side]=void 0,N("size",0),N("offset",0),N("space",!1))}),()=>{const t=[];f.value===!0&&(e.noSwipeOpen===!1&&t.push(De(S("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Se.value)),t.push(We("div",{ref:"backdrop",class:p.value,style:ee.value,"aria-hidden":"true",onClick:b},void 0,"backdrop",e.noSwipeBackdrop!==!0&&m.value===!0,()=>Be.value)));const r=C.value===!0&&T.mini!==void 0,v=[S("div",{...d,key:""+r,class:[xe.value,d.class]},r===!0?T.mini():Te(T.default))];return e.elevated===!0&&m.value===!0&&v.push(S("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(We("aside",{ref:"content",class:Le.value,style:j.value},v,"contentclose",e.noSwipeClose!==!0&&f.value===!0,()=>we.value)),S("div",{class:"q-drawer-container"},t)}}}),Nt=Object.assign({name:"EssentialLink"},{__name:"EssentialLink",props:{title:{type:String,required:!0},link:{type:String,default:"#"},icon:{type:String,default:""}},setup(e){const T=e;return(h,d)=>De((ve(),_e(pe,{clickable:"",to:T.link,"active-class":"bg-red-1",class:"su-menu-item"},{default:D(()=>[T.icon?(ve(),_e(Ne,{key:0,avatar:""},{default:D(()=>[$(fe,{name:T.icon},null,8,["name"])]),_:1})):Ye("",!0),$(Ne,null,{default:D(()=>[$($t,null,{default:D(()=>[Ze(kt(T.title),1)]),_:1})]),_:1})]),_:1},8,["to"])),[[Xe]])}}),jt=Je(Nt,[["__file","EssentialLink.vue"]]),Kt=Object.assign({name:"MainLayout"},{__name:"MainLayout",setup(e){const T=Rt(),h=L("dashboard"),d=I=>I===h.value?"text-primary":"",a=[{title:"Dashboard",icon:"r_dashboard",link:"/dashboard"},{title:"Kepemilikan",icon:"r_groups",link:"/kepemilikan"},{title:"Sumber Dana",icon:"r_storage",link:"/sumber-dana"},{title:"Transaksi",icon:"r_sync_alt",link:"/transaksi"},{title:"Pengaturan",icon:"r_settings",link:"/pengaturan"}],g=L(!1);localStorage.getItem("username");function x(){g.value=!g.value}return(I,B)=>{const O=He("logout-btn"),n=He("router-view");return ve(),_e(St,{view:"hHh Lpr lFf"},{default:D(()=>[$(Vt,{elevated:"",reveal:!!Ee(T).screen.lt.sm},{default:D(()=>[$(It,null,{default:D(()=>[$(_t,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:x,class:"mobile-hide"}),$(Mt,null,{default:D(()=>[Ze(" SisaUang ")]),_:1})]),_:1})]),_:1},8,["reveal"]),Ee(T).screen.lt.sm?(ve(),_e(Ht,{key:0,class:"su-box-shadow"},{default:D(()=>[$(Wt,{align:"center",modelValue:h.value,"onUpdate:modelValue":B[0]||(B[0]=P=>h.value=P),class:"bg-white text-black"},{default:D(()=>[$(de,{name:"dashboard",class:ce(d("dashboard")),icon:"r_dashboard",to:"/dashboard"},null,8,["class"]),$(de,{to:"/sumber-dana",name:"sumber-dana",class:ce(d("sumber-dana")),icon:"r_storage"},null,8,["class"]),$(de,{to:"/transaksi",name:"transaksi",class:ce(["main-feature",d("transaksi")]),icon:"r_sync_alt"},null,8,["class"]),$(de,{to:"/kepemilikan",name:"kepemilikan",class:ce(d("kepemilikan")),icon:"r_groups"},null,8,["class"]),$(de,{to:"/pengaturan",name:"pengaturan",class:ce(d("pengaturan")),icon:"r_settings"},null,8,["class"])]),_:1},8,["modelValue"])]),_:1})):Ye("",!0),$(Et,{modelValue:g.value,"onUpdate:modelValue":B[1]||(B[1]=P=>g.value=P),class:"q-mt-md","show-if-above":"",bordered:""},{default:D(()=>[$(Pt,{class:"q-px-sm"},{default:D(()=>[(ve(),Tt(qt,null,Ct(a,P=>$(jt,xt({key:P.title},P),null,16)),64)),$(pe,null,{default:D(()=>[$(O)]),_:1})]),_:1})]),_:1},8,["modelValue"]),$(Lt,null,{default:D(()=>[$(n)]),_:1})]),_:1})}}}),ea=Je(Kt,[["__file","MainLayout.vue"]]);export{ea as default};