import{x as s,i,P as a,R as p,a6 as c,c as u,h as d,O as g,g as l,bz as f}from"./index-B7TI8NV3.js";const $=s({name:"QPageContainer",setup(h,{slots:n}){const{proxy:{$q:r}}=l(),e=i(p,a);if(e===a)return console.error("QPageContainer needs to be child of QLayout"),a;c(f,!0);const o=u(()=>{const t={};return e.header.space===!0&&(t.paddingTop=`${e.header.size}px`),e.right.space===!0&&(t[`padding${r.lang.rtl===!0?"Left":"Right"}`]=`${e.right.size}px`),e.footer.space===!0&&(t.paddingBottom=`${e.footer.size}px`),e.left.space===!0&&(t[`padding${r.lang.rtl===!0?"Right":"Left"}`]=`${e.left.size}px`),t});return()=>d("div",{class:"q-page-container",style:o.value},g(n.default))}});export{$ as Q};
