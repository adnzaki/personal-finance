import{x as E,r as P,a5 as q,a6 as A,o as B,g as I,h as R,O as V,aK as O,_ as p,ae as Q,bt as j,a7 as D,by as K}from"./index-BEae-QxD.js";const M=E({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(r,{slots:F,emit:l}){const C=I(),u=P(null);let i=0;const s=[];function d(e){const a=typeof e=="boolean"?e:r.noErrorFocus!==!0,f=++i,x=(t,o)=>{l(`validation${t===!0?"Success":"Error"}`,o)},g=t=>{const o=t.validate();return typeof o.then=="function"?o.then(n=>({valid:n,comp:t}),n=>({valid:!1,comp:t,err:n})):Promise.resolve({valid:o,comp:t})};return(r.greedy===!0?Promise.all(s.map(g)).then(t=>t.filter(o=>o.valid!==!0)):s.reduce((t,o)=>t.then(()=>g(o).then(n=>{if(n.valid===!1)return Promise.reject(n)})),Promise.resolve()).catch(t=>[t])).then(t=>{if(t===void 0||t.length===0)return f===i&&x(!0),!0;if(f===i){const{comp:o,err:n}=t[0];if(n!==void 0&&console.error(n),x(!1,o),a===!0){const h=t.find(({comp:S})=>typeof S.focus=="function"&&O(S.$)===!1);h!==void 0&&h.comp.focus()}}return!1})}function v(){i++,s.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function m(e){e!==void 0&&p(e);const a=i+1;d().then(f=>{a===i&&f===!0&&(r.onSubmit!==void 0?l("submit",e):e?.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function b(e){e!==void 0&&p(e),l("reset"),Q(()=>{v(),r.autofocus===!0&&r.noResetFocus!==!0&&c()})}function c(){j(()=>{if(u.value===null)return;(u.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||u.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||u.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(u.value.querySelectorAll("[tabindex]"),a=>a.tabIndex!==-1))?.focus({preventScroll:!0})})}D(K,{bindComponent(e){s.push(e)},unbindComponent(e){const a=s.indexOf(e);a!==-1&&s.splice(a,1)}});let y=!1;return q(()=>{y=!0}),A(()=>{y===!0&&r.autofocus===!0&&c()}),B(()=>{r.autofocus===!0&&c()}),Object.assign(C.proxy,{validate:d,resetValidation:v,submit:m,reset:b,focus:c,getValidationComponents:()=>s}),()=>R("form",{class:"q-form",ref:u,onSubmit:m,onReset:b},V(F.default))}});export{M as Q};
