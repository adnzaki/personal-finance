import{_ as p,ao as m,u as _,m as f,j as a,n as s,Q as g,am as b,G as c,ap as v}from"./index-evmeErVa.js";import{Q as y}from"./QBtnToggle-DKjL70iV.js";import{Q as C}from"./QForm-C0MgQWxz.js";import{u as i}from"./category-store-DhAlv8f9.js";const x={__name:"AddFormContent",props:{mobile:{type:Boolean,default:!1}},setup(n,{expose:t}){t();const r=n,e=i(),l=m(),d=()=>e.save({id:null,afterSuccess:()=>o()}),o=()=>{r.mobile?l.push("/kategori"):e.showAddForm=!1},u={props:r,store:e,router:l,save:d,closeForm:o,get useCategoryStore(){return i},get useRouter(){return m}};return Object.defineProperty(u,"__isScriptSetup",{enumerable:!1,value:!0}),u}};function Q(n,t,r,e,l,d){return _(),f("div",null,[a(b,{class:"scroll card-section"},{default:s(()=>[a(C,{class:"q-gutter-xs",onSubmit:e.save},{default:s(()=>[a(g,{outlined:"",modelValue:e.store.data.category_name,"onUpdate:modelValue":t[0]||(t[0]=o=>e.store.data.category_name=o),class:"rounded-field q-mb-md",label:"Nama Kategori",rules:[o=>!!o||"Nama Kategori Tidak Boleh Kosong"]},null,8,["modelValue","rules"]),a(y,{modelValue:e.store.data.category_type,"onUpdate:modelValue":t[1]||(t[1]=o=>e.store.data.category_type=o),"toggle-color":"teal-10",color:"teal-5",rounded:"",unelevated:"",spread:"",class:"q-mb-md",size:"16px",options:[{label:"Income",value:"income"},{label:"Expense",value:"expense"}]},null,8,["modelValue"])]),_:1})]),_:1}),a(v,{align:"right"},{default:s(()=>[a(c,{flat:"",label:"Tutup",onClick:e.closeForm,class:"custom-round",color:"negative"}),a(c,{unelevated:"",label:"Simpan",onClick:e.save,class:"save-btn",color:"primary"})]),_:1})])}const A=p(x,[["render",Q],["__file","AddFormContent.vue"]]);export{A};