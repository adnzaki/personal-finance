import{_ as S,c as f,u as i,m as p,H as g,j as t,G as c,q as w,n as a,r as D,ao as q,ah as z,F as V,ai as P,J as C,v as M,M as k,I as b,an as h,ap as N,aq as A,am as F,W as B,ar as I,K}from"./index-D-6t3Skm.js";import{b as $,w as L,t as U}from"./screen-Du9EXmt7.js";import{Q as H,f as R,a as j}from"./QSpace-DUFslAxy.js";import{u as T}from"./use-quasar-DDQxJQOd.js";import{u as m}from"./category-store-Dyf1b7cs.js";import{Q as J,a as x}from"./QItemSection-CrXKyLmV.js";import{Q as W}from"./QItemLabel-ASLgX9dO.js";import{Q as X}from"./QExpansionItem-C4C5bduQ.js";import{Q as Y}from"./QList-DsR3IaR3.js";import{u as E}from"./index-MxqVipEs.js";import{C as G}from"./ClosePopup-BRj3iwYa.js";import{A as Z}from"./AddFormContent-DzXmVeox.js";import{E as ee}from"./EditFormContent-Bm4wpTjn.js";import"./QBtnToggle-DmZZH1ow.js";import"./QForm-CNGEEaky.js";const te={__name:"ButtonGroup",setup(n,{expose:o}){o();const s=m(),e=T(),u=f(()=>s.hideDefault===1?"visibility":"visibility_off"),d=f(()=>s.hideDefault===1?"Tampilkan":"Sembunyikan"),l=f(()=>e.screen.lt.md?"btn-w98 q-mb-md":""),_={store:s,$q:e,visibleIcon:u,visibleText:d,visibleClass:l,toggleDefault:()=>{s.hideDefault=s.hideDefault===1?0:1,s.toggleDefaultCategory()},get fabPos(){return R},computed:f,get useQuasar(){return T},get useCategoryStore(){return m}};return Object.defineProperty(_,"__isScriptSetup",{enumerable:!1,value:!0}),_}},oe={class:"col-12 col-md-8"},ae={class:"q-gutter-xs"};function re(n,o,s,e,u,d){return i(),p("div",oe,[g("div",ae,[t(c,{icon:"add",class:"q-pl-sm custom-round mobile-hide",unelevated:"",color:"primary",label:"Tambah",onClick:o[0]||(o[0]=l=>e.store.showAddForm=!0)}),t(c,{icon:e.visibleIcon,class:w(["q-pl-sm custom-round",e.visibleClass]),unelevated:"",color:"primary",label:e.visibleText+" Kategori Default",onClick:e.toggleDefault},null,8,["icon","class","label"])]),t(H,{position:"bottom-right",offset:e.fabPos,class:"mobile-only custom-fab"},{default:a(()=>[t(c,{fab:"",icon:"add",class:"custom-round",color:"primary",to:"/kategori/add"})]),_:1},8,["offset"])])}const se=S(te,[["render",re],["__file","ButtonGroup.vue"]]),ne={__name:"DataTable",setup(n,{expose:o}){o();const s=E(),e=D(1),u=q(),d=m();d.getCategories();const l=(v,O=!1)=>{d.getDetail(v,()=>{O?u.push("/kategori/edit"):d.showEditForm=!0})},r=v=>v==="Income"?"o_monetization_on":"o_payment",_=v=>v===1,y=f(()=>s.state.data),Q={paging:s,current:e,router:u,store:d,getDetail:l,icon:r,disable:_,data:y,ref:D,computed:f,get usePagingStore(){return E},get useCategoryStore(){return m},get useRouter(){return q}};return Object.defineProperty(Q,"__isScriptSetup",{enumerable:!1,value:!0}),Q}},le={class:"q-px-md q-pb-md"};function ie(n,o,s,e,u,d){const l=z("data-nav");return i(),p("div",null,[g("div",le,[t(Y,{bordered:"",class:"rounded-borders",separator:""},{default:a(()=>[(i(!0),p(V,null,P(e.data,(r,_)=>(i(),C(J,{clickable:"",class:"mobile-hide",key:_,disable:e.disable(r.is_default)},{default:a(()=>[t(x,{avatar:""},{default:a(()=>[t(M,{name:e.icon(r.category_type)},null,8,["name"])]),_:2},1024),t(x,null,{default:a(()=>[k(b(r.category_name)+" ",1),t(W,{caption:""},{default:a(()=>[k(b(r.category_type),1)]),_:2},1024)]),_:2},1024),t(x,{side:""},{default:a(()=>[t(c,{class:"custom-round",flat:"",color:"primary",icon:"r_edit",onClick:y=>e.getDetail(r.id)},null,8,["onClick"])]),_:2},1024),t(x,{side:""},{default:a(()=>[t(c,{class:"custom-round",flat:"",color:"primary",icon:"r_delete_outline",onClick:y=>e.store.deleteCategory(r.id)},null,8,["onClick"])]),_:2},1024)]),_:2},1032,["disable"]))),128)),(i(!0),p(V,null,P(e.data,(r,_)=>(i(),C(X,{"expand-separator":"",icon:e.icon(r.category_type),label:r.category_name,class:"mobile-only",caption:r.category_type,key:_,"header-class":"bottom-border",group:"kategori",disable:e.disable(r.is_default)},{default:a(()=>[t(h,null,{default:a(()=>[t(N,{align:"right"},{default:a(()=>[t(c,{flat:"",color:"primary",onClick:y=>e.getDetail(r.id,!0)},{default:a(()=>o[1]||(o[1]=[k("Edit")])),_:2},1032,["onClick"]),t(c,{flat:"",color:"primary",onClick:y=>e.store.deleteCategory(r.id)},{default:a(()=>o[2]||(o[2]=[k("Hapus")])),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1032,["icon","label","caption","disable"]))),128))]),_:1}),t(l,{modelValue:e.current,"onUpdate:modelValue":o[0]||(o[0]=r=>e.current=r)},null,8,["modelValue"])])])}const de=S(ne,[["render",ie],["__file","DataTable.vue"]]),ce={__name:"AddFormDialog",setup(n,{expose:o}){o();const e={store:m(),get useCategoryStore(){return m},get dialogSize(){return $},AddFormContent:Z};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},ue={class:"text-h6 text-capitalize"};function _e(n,o,s,e,u,d){return i(),C(I,{"no-backdrop-dismiss":"",modelValue:e.store.showAddForm,"onUpdate:modelValue":o[0]||(o[0]=l=>e.store.showAddForm=l)},{default:a(()=>[t(h,{class:"q-pa-sm",style:A(e.dialogSize())},{default:a(()=>[t(F,{class:"row items-center q-pb-none"},{default:a(()=>[g("div",ue,b(e.store.formTitle),1),t(j),B(t(c,{icon:"close",flat:"",round:"",dense:""},null,512),[[G]])]),_:1}),t(e.AddFormContent)]),_:1},8,["style"])]),_:1},8,["modelValue"])}const me=S(ce,[["render",_e],["__file","AddFormDialog.vue"]]),pe={__name:"EditFormDialog",setup(n,{expose:o}){o();const e={store:m(),get useCategoryStore(){return m},get dialogSize(){return $},EditFormContent:ee};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},fe={class:"text-h6 text-capitalize"};function ge(n,o,s,e,u,d){return i(),C(I,{"no-backdrop-dismiss":"",modelValue:e.store.showEditForm,"onUpdate:modelValue":o[0]||(o[0]=l=>e.store.showEditForm=l)},{default:a(()=>[t(h,{class:"q-pa-sm",style:A(e.dialogSize())},{default:a(()=>[t(F,{class:"row items-center q-pb-none"},{default:a(()=>[g("div",fe,b(e.store.formTitle),1),t(j),B(t(c,{icon:"close",flat:"",round:"",dense:""},null,512),[[G]])]),_:1}),t(e.EditFormContent)]),_:1},8,["style"])]),_:1},8,["modelValue"])}const be=S(pe,[["render",ge],["__file","EditFormDialog.vue"]]),ye={__name:"MainView",setup(n,{expose:o}){o();const e={cardTitle:D("Kategori"),ref:D,get wrapperPadding(){return L},get titleSpacing(){return U},ButtonGroup:se,DataTable:de,AddFormDialog:me,EditFormDialog:be};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},ve={class:"row"},Ce={key:1,class:"text-subtitle1 text-uppercase q-mt-xs page-title-pl-5"},Se={key:2,class:"text-h6 text-capitalize"};function ke(n,o,s,e,u,d){const l=z("search-box");return i(),p("div",{class:w(e.wrapperPadding())},[t(h,{class:"content-card"},{default:a(()=>[t(F,{class:"q-mb-md"},{default:a(()=>[g("div",ve,[n.$q.screen.lt.sm?(i(),C(c,{key:0,color:"teal",flat:"",class:"back-button q-mb-md",rounded:"",icon:"arrow_back",onClick:o[0]||(o[0]=r=>n.$router.push("/pengaturan"))})):K("",!0),n.$q.screen.lt.sm?(i(),p("div",Ce,b(e.cardTitle),1)):(i(),p("div",Se,b(e.cardTitle),1))]),g("div",{class:w(["row",e.titleSpacing()])},[t(e.ButtonGroup),t(l,{label:"Cari kategori..."})],2)]),_:1}),t(e.DataTable),t(e.AddFormDialog),t(e.EditFormDialog)]),_:1})],2)}const $e=S(ye,[["render",ke],["__file","MainView.vue"]]);export{$e as default};
