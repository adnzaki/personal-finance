import{_ as d,al as p,l as f,m as k,f as a,n as t,Q as _,u as n,ap as C,G as r,an as b}from"./index-BO94wXXz.js";import{Q as v}from"./QForm-D_jBr271.js";import{u as Q}from"./ownership-store-DcaW3ESv.js";const E={__name:"EditFormContent",props:{mobile:{type:Boolean,default:!1}},setup(i){const u=i,e=Q(),m=p(),o=()=>e.save({id:e.data.id,afterSuccess:()=>s()}),s=()=>{u.mobile?m.push("/kepemilikan"):e.showEditForm=!1,e.data.kepemilikan=""};return(F,l)=>(f(),k("div",null,[a(C,{class:"scroll card-section"},{default:t(()=>[a(v,{class:"q-gutter-xs",onSubmit:o},{default:t(()=>[a(_,{outlined:"",modelValue:n(e).data.kepemilikan,"onUpdate:modelValue":l[0]||(l[0]=c=>n(e).data.kepemilikan=c),class:"rounded-field",label:"Nama Pemilik"},null,8,["modelValue"])]),_:1})]),_:1}),a(b,{align:"right"},{default:t(()=>[a(r,{flat:"",label:"Tutup",onClick:s,class:"custom-round",color:"negative"}),a(r,{unelevated:"",label:"Simpan",onClick:o,class:"save-btn",color:"primary"})]),_:1})]))}},h=d(E,[["__file","EditFormContent.vue"]]);export{h as E};