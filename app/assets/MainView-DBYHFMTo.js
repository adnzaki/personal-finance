import{_ as g,l as u,m as p,H as d,f as e,u as i,G as m,n as t,r as v,al as z,c as M,ah as F,F as I,ai as Y,K as T,M as V,I as _,am as q,ao as G,ap as S,W as x,aq as U,t as L,Q as N,q as C}from"./index-CWLLNYBf.js";import{a as j,t as H,w as K}from"./screen-QEa_gagZ.js";import{f as O,Q as R,a as E}from"./QSpace-BVjNmTZw.js";import{u as Q,F as W,Q as A,a as J,d as X}from"./FormContent-CZv6uGHt.js";import{Q as Z,a as k,b as w}from"./QItemSection-KgyVrj8Z.js";import{Q as ee}from"./QBadge-CjoSByOk.js";import{Q as te}from"./QList-BW3yEfgz.js";import{u as ae}from"./index-BSAJd14Z.js";import{u as se}from"./use-quasar-D6GF591H.js";import{C as y}from"./ClosePopup-BwcWNgQO.js";import{i as oe}from"./cleave-zen.module-BjngOIXk.js";import"./QSelect-CoPT871l.js";import"./selection-UFkX9jzo.js";import"./TouchPan-CwsOH7cd.js";import"./QForm-BTpm5OtR.js";const le={class:"col-12 col-md-5"},ne={class:"q-gutter-xs mobile-hide"},re={__name:"ButtonGroup",setup(b){const s=Q();return(o,a)=>(u(),p("div",le,[d("div",ne,[e(m,{icon:"add",class:"q-pl-sm custom-round",unelevated:"",color:"primary",label:"Tambah",onClick:a[0]||(a[0]=n=>i(s).showForm=!0)})]),e(R,{position:"bottom-right",offset:i(O),class:"mobile-only custom-fab"},{default:t(()=>[e(m,{fab:"",icon:"add",class:"custom-round",color:"primary",to:"/transaksi/add"})]),_:1},8,["offset"])]))}},ie=g(re,[["__file","ButtonGroup.vue"]]),ue={class:"q-px-md q-pb-md"},ce={class:"text-subtitle1 text-weight-bold text-center",style:{"font-size":"1.4rem","margin-bottom":"0 !important"}},de=d("br",null,null,-1),me={class:"text-subtitle2 text-weight-regular",style:{"font-size":"0.8rem"}},_e={__name:"DataTable",setup(b){const s=se(),o=ae(),a=v(1),n=z(),c=Q();c.getTransactions();const D=h=>{c.getDetail(h,()=>{s.screen.lt.sm?n.push("/transaksi/edit"):c.showForm=!0})},$=M(()=>o.state.data);return(h,r)=>{const f=F("data-nav");return u(),p("div",null,[d("div",ue,[e(te,{bordered:"",class:"rounded-borders",separator:""},{default:t(()=>[(u(!0),p(I,null,Y($.value,(l,B)=>(u(),T(Z,{clickable:"",key:B},{default:t(()=>[e(k,{avatar:""},{default:t(()=>[d("p",ce,[V(_(l.tgl_transaksi_dayOnly)+" ",1),de,d("small",me,_(l.tgl_transaksi_monthYear),1)])]),_:2},1024),e(k,null,{default:t(()=>[V(_(l.deskripsi)+" ",1),e(w,{caption:""},{default:t(()=>[V(_(l.nominal),1)]),_:2},1024),e(w,{caption:""},{default:t(()=>[e(ee,{color:"primary",label:l.sumber_dana,class:"q-mr-xs"},null,8,["label"])]),_:2},1024)]),_:2},1024),e(k,{side:""},{default:t(()=>[e(m,{class:"custom-round",flat:"",color:"primary",icon:"r_edit",onClick:P=>D(l.id)},null,8,["onClick"])]),_:2},1024),e(k,{side:"",class:"mobile-hide"},{default:t(()=>[e(m,{class:"custom-round",flat:"",color:"primary",icon:"r_delete_outline",onClick:P=>i(c).deleteTransaction(l.id)},null,8,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1}),e(f,{modelValue:a.value,"onUpdate:modelValue":r[0]||(r[0]=l=>a.value=l)},null,8,["modelValue"])])])}}},pe=g(_e,[["__file","DataTable.vue"]]),fe={class:"text-h6 text-capitalize"},ve={__name:"FormDialog",setup(b){const s=Q();return(o,a)=>(u(),T(U,{"no-backdrop-dismiss":"",modelValue:i(s).showForm,"onUpdate:modelValue":a[0]||(a[0]=n=>i(s).showForm=n),onHide:a[1]||(a[1]=n=>i(s).resetForm())},{default:t(()=>[e(q,{class:"q-pa-sm",style:G(i(j)())},{default:t(()=>[e(S,{class:"row items-center q-pb-none"},{default:t(()=>[d("div",fe,_(i(s).formTitle),1),e(E),x(e(m,{icon:"close",flat:"",round:"",dense:""},null,512),[[y]])]),_:1}),e(W)]),_:1},8,["style"])]),_:1},8,["modelValue"]))}},ge=g(ve,[["__file","FormDialog.vue"]]),be={class:"col-12 col-md-3 justify-end"},he={class:"row items-center justify-end q-gutter-sm"},ke={__name:"DateFilter",setup(b){const s=Q(),o=v(null),a=v("Filter Tanggal"),n=v(null),c=r=>X.formatDate(r,"DD-MMM-YYYY",oe),D=r=>{r.from!==void 0&&r.to!==void 0?a.value=`${c(r.from)} sd. ${c(r.to)}`:a.value=c(r)},$=()=>{n.value=null,a.value="Filter Tanggal",s.filter.date="all",o.value=null,s.getTransactions()},h=()=>{o.value.from!==void 0&&o.value.to!==void 0?n.value=`${o.value.from.replace(/\//g,"-")}_${o.value.to.replace(/\//g,"-")}`:n.value=o.value.replace(/\//g,"-"),s.filter.date=n.value,s.getTransactions()};return(r,f)=>(u(),p("div",be,[e(N,{outlined:"",modelValue:a.value,"onUpdate:modelValue":f[1]||(f[1]=l=>a.value=l),class:"rounded-field date-filter",dense:"",readonly:""},{append:t(()=>[e(L,{name:"event",class:"cursor-pointer"},{default:t(()=>[e(A,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:t(()=>[e(J,{modelValue:o.value,"onUpdate:modelValue":[f[0]||(f[0]=l=>o.value=l),D],range:""},{default:t(()=>[d("div",he,[x(e(m,{label:"Cancel",color:"primary",flat:""},null,512),[[y]]),x(e(m,{label:"Reset",onClick:$,color:"negative",flat:""},null,512),[[y]]),x(e(m,{label:"OK",color:"primary",flat:"",onClick:h},null,512),[[y]])])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]))}},xe=g(ke,[["__file","DateFilter.vue"]]),ye={key:0,class:"text-subtitle1 text-uppercase q-mb-sm"},Qe={key:1,class:"text-h6 text-capitalize"},De={__name:"MainView",setup(b){const s=v("Transaksi");return(o,a)=>{const n=F("search-box");return u(),p("div",{class:C(i(K)())},[e(q,{class:"content-card"},{default:t(()=>[e(S,{class:"q-mb-md"},{default:t(()=>[o.$q.screen.lt.sm?(u(),p("div",ye,_(s.value),1)):(u(),p("div",Qe,_(s.value),1)),d("div",{class:C(["row",i(H)()])},[e(ie),e(xe),e(n,{label:"Cari transaksi..."})],2)]),_:1}),e(pe),e(ge)]),_:1})],2)}}},Ue=g(De,[["__file","MainView.vue"]]);export{Ue as default};
