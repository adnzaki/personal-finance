import{_ as b,aF as d,r as c,ah as k,u as s,m as l,j as e,n as u,am as v,H as m,G as T,I as _,q as f,J as x,K as y,an as S}from"./index-evmeErVa.js";import{w,t as C}from"./screen-DUOckAWz.js";import{u as g}from"./FormContent-DP9jQQqd.js";import{D,F as R}from"./FormDialog-117A8Nup.js";import"./QSelect-Si8-Teg1.js";import"./QItemSection-D65uN7PT.js";import"./QItemLabel-D5wGN3qo.js";import"./selection-Bej4Y5el.js";import"./QBtnToggle-DKjL70iV.js";import"./QPopupProxy-DZUjqHkz.js";import"./date-D_bmwiLl.js";import"./TouchPan-D64oOO68.js";import"./QForm-C0MgQWxz.js";import"./ClosePopup-Cwl2y1Vm.js";import"./use-quasar-D3ANFAZu.js";import"./index-CSEZ5p7v.js";import"./utils-Bi8AkgVO.js";import"./cleave-zen.module-Cq8K1Kdq.js";import"./QBadge-BiwRiPJw.js";import"./QList-BvbI4Bi0.js";import"./QSpace-CKVIx3A6.js";const h={__name:"TransactionList",setup(i,{expose:a}){a();const r=d(),t=g(),n=c(!1);t.filter.date=r.params.dateRange,t.filter.category=r.params.categoryId,n.value=!0;const p=c("Rincian Transaksi"),o={route:r,store:t,isReady:n,cardTitle:p,ref:c,get useRoute(){return d},get wrapperPadding(){return w},get titleSpacing(){return C},get useTransactionStore(){return g},DataTable:D,FormDialog:R};return Object.defineProperty(o,"__isScriptSetup",{enumerable:!1,value:!0}),o}},q={class:"row"},B={key:0,class:"text-subtitle1 text-uppercase q-mt-xs page-title-pl-5"},F={key:1,class:"text-h6 text-capitalize"};function P(i,a,r,t,n,p){const o=k("search-box");return s(),l("div",{class:f(t.wrapperPadding())},[e(S,{class:"content-card"},{default:u(()=>[e(v,{class:"q-mb-md"},{default:u(()=>[m("div",q,[e(T,{color:"teal",flat:"",class:"back-button q-mb-md",rounded:"",icon:"arrow_back",onClick:a[0]||(a[0]=L=>i.$router.back())}),i.$q.screen.lt.sm?(s(),l("div",B,_(t.cardTitle),1)):(s(),l("div",F,_(t.cardTitle),1))]),m("div",{class:f(["row",t.titleSpacing()])},[a[1]||(a[1]=m("div",{class:"col-12 col-md-8"},null,-1)),e(o,{label:"Cari transaksi..."})],2)]),_:1}),t.isReady?(s(),x(t.DataTable,{key:0})):y("",!0),e(t.FormDialog)]),_:1})],2)}const at=b(h,[["render",P],["__file","TransactionList.vue"]]);export{at as default};