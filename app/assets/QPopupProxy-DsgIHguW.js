import{c,aH as E,x as Ee,z as st,aF as ct,g as Ne,A as vt,aG as dt,r as q,aX as ft,w as W,ae as Be,h as u,av as Z,O as mt,aJ as ht,G as Y,aY as yt,ar as gt}from"./index-BEae-QxD.js";import{t as bt,a as $e,f as _t,g as wt,j as we,_ as xt}from"./date-DuxP8qnT.js";import{u as Dt,a as Ct,Q as Mt}from"./QMenu-BfcMvzKR.js";function qt(){let n=Object.create(null);return{getCache:(g,y)=>n[g]===void 0?n[g]=typeof y=="function"?y():y:n[g],setCache(g,y){n[g]=y},hasCache(g){return Object.hasOwnProperty.call(n,g)},clearCache(g){g!==void 0?delete n[g]:n=Object.create(null)}}}const kt=["gregorian","persian"],Ae={mask:{type:String},locale:Object,calendar:{type:String,validator:n=>kt.includes(n),default:"gregorian"},landscape:Boolean,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,readonly:Boolean,disable:Boolean},Ht=["update:modelValue"];function F(n){return n.year+"/"+E(n.month)+"/"+E(n.day)}function St(n,g){const y=c(()=>n.disable!==!0&&n.readonly!==!0),B=c(()=>y.value===!0?0:-1),x=c(()=>{const f=[];return n.color!==void 0&&f.push(`bg-${n.color}`),n.textColor!==void 0&&f.push(`text-${n.textColor}`),f.join(" ")});function N(){return n.locale!==void 0?{...g.lang.date,...n.locale}:g.lang.date}function b(f){const S=new Date,O=f===!0?null:0;if(n.calendar==="persian"){const H=bt(S);return{year:H.jy,month:H.jm,day:H.jd}}return{year:S.getFullYear(),month:S.getMonth()+1,day:S.getDate(),hour:O,minute:O,second:O,millisecond:O}}return{editable:y,tabindex:B,headerClass:x,getLocale:N,getCurrentDate:b}}const P=20,Ot=["Calendar","Years","Months"],Pe=n=>Ot.includes(n),xe=n=>/^-?[\d]+\/[0-1]\d$/.test(n),L=" — ";function I(n){return n.year+"/"+E(n.month)}const Tt=Ee({name:"QDate",props:{...Ae,...ct,...st,modelValue:{required:!0,validator:n=>typeof n=="string"||Array.isArray(n)===!0||Object(n)===n||n===null},multiple:Boolean,range:Boolean,title:String,subtitle:String,mask:{...Ae.mask,default:"YYYY/MM/DD"},defaultYearMonth:{type:String,validator:xe},yearsInMonthView:Boolean,events:[Array,Function],eventColor:[String,Function],emitImmediately:Boolean,options:[Array,Function],navigationMinYearMonth:{type:String,validator:xe},navigationMaxYearMonth:{type:String,validator:xe},noUnset:Boolean,firstDayOfWeek:[String,Number],todayBtn:Boolean,minimal:Boolean,defaultView:{type:String,default:"Calendar",validator:Pe}},emits:[...Ht,"rangeStart","rangeEnd","navigation"],setup(n,{slots:g,emit:y}){const{proxy:B}=Ne(),{$q:x}=B,N=vt(n,x),{getCache:b}=qt(),{tabindex:f,headerClass:S,getLocale:O,getCurrentDate:H}=St(n,x);let j;const re=dt(n),ue=ht(re),G=q(null),m=q(Oe()),h=q(O()),Re=c(()=>Oe()),Qe=c(()=>O()),V=c(()=>H()),i=q(je(m.value,h.value)),C=q(n.defaultView),De=c(()=>x.lang.rtl===!0?"right":"left"),p=q(De.value),ie=q(De.value),se=i.value.year,ee=q(se-se%P-(se<0?P:0)),D=q(null),ze=c(()=>{const e=n.landscape===!0?"landscape":"portrait";return`q-date q-date--${e} q-date--${e}-${n.minimal===!0?"minimal":"standard"}`+(N.value===!0?" q-date--dark q-dark":"")+(n.bordered===!0?" q-date--bordered":"")+(n.square===!0?" q-date--square no-border-radius":"")+(n.flat===!0?" q-date--flat no-shadow":"")+(n.disable===!0?" disabled":n.readonly===!0?" q-date--readonly":"")}),$=c(()=>n.color||"primary"),R=c(()=>n.textColor||"white"),te=c(()=>n.emitImmediately===!0&&n.multiple!==!0&&n.range!==!0),ce=c(()=>Array.isArray(n.modelValue)===!0?n.modelValue:n.modelValue!==null&&n.modelValue!==void 0?[n.modelValue]:[]),k=c(()=>ce.value.filter(e=>typeof e=="string").map(e=>he(e,m.value,h.value)).filter(e=>e.dateHash!==null&&e.day!==null&&e.month!==null&&e.year!==null)),Q=c(()=>{const e=t=>he(t,m.value,h.value);return ce.value.filter(t=>ft(t)===!0&&t.from!==void 0&&t.to!==void 0).map(t=>({from:e(t.from),to:e(t.to)})).filter(t=>t.from.dateHash!==null&&t.to.dateHash!==null&&t.from.dateHash<t.to.dateHash)}),ae=c(()=>n.calendar!=="persian"?e=>new Date(e.year,e.month-1,e.day):e=>{const t=$e(e.year,e.month,e.day);return new Date(t.gy,t.gm-1,t.gd)}),ve=c(()=>n.calendar==="persian"?F:(e,t,a)=>_t(new Date(e.year,e.month-1,e.day,e.hour,e.minute,e.second,e.millisecond),t===void 0?m.value:t,a===void 0?h.value:a,e.year,e.timezoneOffset)),U=c(()=>k.value.length+Q.value.reduce((e,t)=>e+1+wt(ae.value(t.to),ae.value(t.from)),0)),Ce=c(()=>{if(n.title!==void 0&&n.title!==null&&n.title.length!==0)return n.title;if(D.value!==null){const a=D.value.init,l=ae.value(a);return h.value.daysShort[l.getDay()]+", "+h.value.monthsShort[a.month-1]+" "+a.day+L+"?"}if(U.value===0)return L;if(U.value>1)return`${U.value} ${h.value.pluralDay}`;const e=k.value[0],t=ae.value(e);return isNaN(t.valueOf())===!0?L:h.value.headerTitle!==void 0?h.value.headerTitle(t,e):h.value.daysShort[t.getDay()]+", "+h.value.monthsShort[e.month-1]+" "+e.day}),Je=c(()=>k.value.concat(Q.value.map(t=>t.from)).sort((t,a)=>t.year-a.year||t.month-a.month)[0]),Le=c(()=>k.value.concat(Q.value.map(t=>t.to)).sort((t,a)=>a.year-t.year||a.month-t.month)[0]),Me=c(()=>{if(n.subtitle!==void 0&&n.subtitle!==null&&n.subtitle.length!==0)return n.subtitle;if(U.value===0)return L;if(U.value>1){const e=Je.value,t=Le.value,a=h.value.monthsShort;return a[e.month-1]+(e.year!==t.year?" "+e.year+L+a[t.month-1]+" ":e.month!==t.month?L+a[t.month-1]:"")+" "+t.year}return k.value[0].year}),ne=c(()=>{const e=[x.iconSet.datetime.arrowLeft,x.iconSet.datetime.arrowRight];return x.lang.rtl===!0?e.reverse():e}),qe=c(()=>n.firstDayOfWeek!==void 0?Number(n.firstDayOfWeek):h.value.firstDayOfWeek),We=c(()=>{const e=h.value.daysShort,t=qe.value;return t>0?e.slice(t,7).concat(e.slice(0,t)):e}),T=c(()=>{const e=i.value;return n.calendar!=="persian"?new Date(e.year,e.month,0).getDate():we(e.year,e.month)}),Ge=c(()=>typeof n.eventColor=="function"?n.eventColor:()=>n.eventColor),_=c(()=>{if(n.navigationMinYearMonth===void 0)return null;const e=n.navigationMinYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),w=c(()=>{if(n.navigationMaxYearMonth===void 0)return null;const e=n.navigationMaxYearMonth.split("/");return{year:parseInt(e[0],10),month:parseInt(e[1],10)}}),de=c(()=>{const e={month:{prev:!0,next:!0},year:{prev:!0,next:!0}};return _.value!==null&&_.value.year>=i.value.year&&(e.year.prev=!1,_.value.year===i.value.year&&_.value.month>=i.value.month&&(e.month.prev=!1)),w.value!==null&&w.value.year<=i.value.year&&(e.year.next=!1,w.value.year===i.value.year&&w.value.month<=i.value.month&&(e.month.next=!1)),e}),le=c(()=>{const e={};return k.value.forEach(t=>{const a=I(t);e[a]===void 0&&(e[a]=[]),e[a].push(t.day)}),e}),ke=c(()=>{const e={};return Q.value.forEach(t=>{const a=I(t.from),l=I(t.to);if(e[a]===void 0&&(e[a]=[]),e[a].push({from:t.from.day,to:a===l?t.to.day:void 0,range:t}),a<l){let o;const{year:v,month:r}=t.from,s=r<12?{year:v,month:r+1}:{year:v+1,month:1};for(;(o=I(s))<=l;)e[o]===void 0&&(e[o]=[]),e[o].push({from:void 0,to:o===l?t.to.day:void 0,range:t}),s.month++,s.month>12&&(s.year++,s.month=1)}}),e}),K=c(()=>{if(D.value===null)return;const{init:e,initHash:t,final:a,finalHash:l}=D.value,[o,v]=t<=l?[e,a]:[a,e],r=I(o),s=I(v);if(r!==M.value&&s!==M.value)return;const d={};return r===M.value?(d.from=o.day,d.includeFrom=!0):d.from=1,s===M.value?(d.to=v.day,d.includeTo=!0):d.to=T.value,d}),M=c(()=>I(i.value)),Ue=c(()=>{const e={};if(n.options===void 0){for(let a=1;a<=T.value;a++)e[a]=!0;return e}const t=typeof n.options=="function"?n.options:a=>n.options.includes(a);for(let a=1;a<=T.value;a++){const l=M.value+"/"+E(a);e[a]=t(l)}return e}),Ke=c(()=>{const e={};if(n.events===void 0)for(let t=1;t<=T.value;t++)e[t]=!1;else{const t=typeof n.events=="function"?n.events:a=>n.events.includes(a);for(let a=1;a<=T.value;a++){const l=M.value+"/"+E(a);e[a]=t(l)===!0&&Ge.value(l)}}return e}),Xe=c(()=>{let e,t;const{year:a,month:l}=i.value;if(n.calendar!=="persian")e=new Date(a,l-1,1),t=new Date(a,l-1,0).getDate();else{const o=$e(a,l,1);e=new Date(o.gy,o.gm-1,o.gd);let v=l-1,r=a;v===0&&(v=12,r--),t=we(r,v)}return{days:e.getDay()-qe.value-1,endDay:t}}),He=c(()=>{const e=[],{days:t,endDay:a}=Xe.value,l=t<0?t+7:t;if(l<6)for(let r=a-l;r<=a;r++)e.push({i:r,fill:!0});const o=e.length;for(let r=1;r<=T.value;r++){const s={i:r,event:Ke.value[r],classes:[]};Ue.value[r]===!0&&(s.in=!0,s.flat=!0),e.push(s)}if(le.value[M.value]!==void 0&&le.value[M.value].forEach(r=>{const s=o+r-1;Object.assign(e[s],{selected:!0,unelevated:!0,flat:!1,color:$.value,textColor:R.value})}),ke.value[M.value]!==void 0&&ke.value[M.value].forEach(r=>{if(r.from!==void 0){const s=o+r.from-1,d=o+(r.to||T.value)-1;for(let X=s;X<=d;X++)Object.assign(e[X],{range:r.range,unelevated:!0,color:$.value,textColor:R.value});Object.assign(e[s],{rangeFrom:!0,flat:!1}),r.to!==void 0&&Object.assign(e[d],{rangeTo:!0,flat:!1})}else if(r.to!==void 0){const s=o+r.to-1;for(let d=o;d<=s;d++)Object.assign(e[d],{range:r.range,unelevated:!0,color:$.value,textColor:R.value});Object.assign(e[s],{flat:!1,rangeTo:!0})}else{const s=o+T.value-1;for(let d=o;d<=s;d++)Object.assign(e[d],{range:r.range,unelevated:!0,color:$.value,textColor:R.value})}}),K.value!==void 0){const r=o+K.value.from-1,s=o+K.value.to-1;for(let d=r;d<=s;d++)e[d].color=$.value,e[d].editRange=!0;K.value.includeFrom===!0&&(e[r].editRangeFrom=!0),K.value.includeTo===!0&&(e[s].editRangeTo=!0)}i.value.year===V.value.year&&i.value.month===V.value.month&&(e[o+V.value.day-1].today=!0);const v=e.length%7;if(v>0){const r=7-v;for(let s=1;s<=r;s++)e.push({i:s,fill:!0})}return e.forEach(r=>{let s="q-date__calendar-item ";r.fill===!0?s+="q-date__calendar-item--fill":(s+=`q-date__calendar-item--${r.in===!0?"in":"out"}`,r.range!==void 0&&(s+=` q-date__range${r.rangeTo===!0?"-to":r.rangeFrom===!0?"-from":""}`),r.editRange===!0&&(s+=` q-date__edit-range${r.editRangeFrom===!0?"-from":""}${r.editRangeTo===!0?"-to":""}`),(r.range!==void 0||r.editRange===!0)&&(s+=` text-${r.color}`)),r.classes=s}),e}),Ze=c(()=>n.disable===!0?{"aria-disabled":"true"}:{});W(()=>n.modelValue,e=>{if(j===JSON.stringify(e))j=0;else{const t=je(m.value,h.value);z(t.year,t.month,t)}}),W(C,()=>{G.value!==null&&B.$el.contains(document.activeElement)===!0&&G.value.focus()}),W(()=>i.value.year+"|"+i.value.month,()=>{y("navigation",{year:i.value.year,month:i.value.month})}),W(Re,e=>{Ie(e,h.value,"mask"),m.value=e}),W(Qe,e=>{Ie(m.value,e,"locale"),h.value=e});function fe(e){j=JSON.stringify(e)}function Se(){const{year:e,month:t,day:a}=V.value,l={...i.value,year:e,month:t,day:a},o=le.value[I(l)];(o===void 0||o.includes(l.day)===!1)&&ge(l),me(l.year,l.month)}function pe(e){Pe(e)===!0&&(C.value=e)}function et(e,t){["month","year"].includes(e)&&(e==="month"?Ye:ye)(t===!0?-1:1)}function me(e,t){C.value="Calendar",z(e,t)}function tt(e,t){if(n.range===!1||!e){D.value=null;return}const a=Object.assign({...i.value},e),l=t!==void 0?Object.assign({...i.value},t):a;D.value={init:a,initHash:F(a),final:l,finalHash:F(l)},me(a.year,a.month)}function Oe(){return n.calendar==="persian"?"YYYY/MM/DD":n.mask}function he(e,t,a){return xt(e,t,a,n.calendar,{hour:0,minute:0,second:0,millisecond:0})}function je(e,t){const a=Array.isArray(n.modelValue)===!0?n.modelValue:n.modelValue?[n.modelValue]:[];if(a.length===0)return Ve();const l=a[a.length-1],o=he(l.from!==void 0?l.from:l,e,t);return o.dateHash===null?Ve():o}function Ve(){let e,t;if(n.defaultYearMonth!==void 0){const a=n.defaultYearMonth.split("/");e=parseInt(a[0],10),t=parseInt(a[1],10)}else{const a=V.value!==void 0?V.value:H();e=a.year,t=a.month}return{year:e,month:t,day:1,hour:0,minute:0,second:0,millisecond:0,dateHash:e+"/"+E(t)+"/01"}}function Ye(e){let t=i.value.year,a=Number(i.value.month)+e;a===13?(a=1,t++):a===0&&(a=12,t--),z(t,a),te.value===!0&&oe("month")}function ye(e){const t=Number(i.value.year)+e;z(t,i.value.month),te.value===!0&&oe("year")}function at(e){z(e,i.value.month),C.value=n.defaultView==="Years"?"Months":"Calendar",te.value===!0&&oe("year")}function nt(e){z(i.value.year,e),C.value="Calendar",te.value===!0&&oe("month")}function lt(e,t){(le.value[t]?.includes(e.day)===!0?be:ge)(e)}function A(e){return{year:e.year,month:e.month,day:e.day}}function z(e,t,a){if(_.value!==null&&e<=_.value.year&&((t<_.value.month||e<_.value.year)&&(t=_.value.month),e=_.value.year),w.value!==null&&e>=w.value.year&&((t>w.value.month||e>w.value.year)&&(t=w.value.month),e=w.value.year),a!==void 0){const{hour:o,minute:v,second:r,millisecond:s,timezoneOffset:d,timeHash:X}=a;Object.assign(i.value,{hour:o,minute:v,second:r,millisecond:s,timezoneOffset:d,timeHash:X})}const l=e+"/"+E(t)+"/01";l!==i.value.dateHash&&(p.value=i.value.dateHash<l==(x.lang.rtl!==!0)?"left":"right",e!==i.value.year&&(ie.value=p.value),Be(()=>{ee.value=e-e%P-(e<0?P:0),Object.assign(i.value,{year:e,month:t,day:1,dateHash:l})}))}function Te(e,t,a){const l=e!==null&&e.length===1&&n.multiple===!1?e[0]:e,{reason:o,details:v}=Fe(t,a);fe(l),y("update:modelValue",l,o,v)}function oe(e){const t=k.value[0]!==void 0&&k.value[0].dateHash!==null?{...k.value[0]}:{...i.value};Be(()=>{t.year=i.value.year,t.month=i.value.month;const a=n.calendar!=="persian"?new Date(t.year,t.month,0).getDate():we(t.year,t.month);t.day=Math.min(Math.max(1,t.day),a);const l=J(t),{details:o}=Fe("",t);fe(l),y("update:modelValue",l,e,o)})}function Fe(e,t){return t.from!==void 0?{reason:`${e}-range`,details:{...A(t.target),from:A(t.from),to:A(t.to)}}:{reason:`${e}-day`,details:A(t)}}function J(e,t,a){return e.from!==void 0?{from:ve.value(e.from,t,a),to:ve.value(e.to,t,a)}:ve.value(e,t,a)}function ge(e){let t;if(n.multiple===!0)if(e.from!==void 0){const a=F(e.from),l=F(e.to),o=k.value.filter(r=>r.dateHash<a||r.dateHash>l),v=Q.value.filter(({from:r,to:s})=>s.dateHash<a||r.dateHash>l);t=o.concat(v).concat(e).map(r=>J(r))}else{const a=ce.value.slice();a.push(J(e)),t=a}else t=J(e);Te(t,"add",e)}function be(e){if(n.noUnset===!0)return;let t=null;if(n.multiple===!0&&Array.isArray(n.modelValue)===!0){const a=J(e);e.from!==void 0?t=n.modelValue.filter(l=>l.from!==void 0?l.from!==a.from&&l.to!==a.to:!0):t=n.modelValue.filter(l=>l!==a),t.length===0&&(t=null)}Te(t,"remove",e)}function Ie(e,t,a){const l=k.value.concat(Q.value).map(v=>J(v,e,t)).filter(v=>v.from!==void 0?v.from.dateHash!==null&&v.to.dateHash!==null:v.dateHash!==null),o=(n.multiple===!0?l:l[0])||null;fe(o),y("update:modelValue",o,a)}function ot(){if(n.minimal!==!0)return u("div",{class:"q-date__header "+S.value},[u("div",{class:"relative-position"},[u(Z,{name:"q-transition--fade"},()=>u("div",{key:"h-yr-"+Me.value,class:"q-date__header-subtitle q-date__header-link "+(C.value==="Years"?"q-date__header-link--active":"cursor-pointer"),tabindex:f.value,...b("vY",{onClick(){C.value="Years"},onKeyup(e){e.keyCode===13&&(C.value="Years")}})},[Me.value]))]),u("div",{class:"q-date__header-title relative-position flex no-wrap"},[u("div",{class:"relative-position col"},[u(Z,{name:"q-transition--fade"},()=>u("div",{key:"h-sub"+Ce.value,class:"q-date__header-title-label q-date__header-link "+(C.value==="Calendar"?"q-date__header-link--active":"cursor-pointer"),tabindex:f.value,...b("vC",{onClick(){C.value="Calendar"},onKeyup(e){e.keyCode===13&&(C.value="Calendar")}})},[Ce.value]))]),n.todayBtn===!0?u(Y,{class:"q-date__header-today self-start",icon:x.iconSet.datetime.today,flat:!0,size:"sm",round:!0,tabindex:f.value,onClick:Se}):null])])}function _e({label:e,type:t,key:a,dir:l,goTo:o,boundaries:v,cls:r}){return[u("div",{class:"row items-center q-date__arrow"},[u(Y,{round:!0,dense:!0,size:"sm",flat:!0,icon:ne.value[0],tabindex:f.value,disable:v.prev===!1,...b("go-#"+t,{onClick(){o(-1)}})})]),u("div",{class:"relative-position overflow-hidden flex flex-center"+r},[u(Z,{name:"q-transition--jump-"+l},()=>u("div",{key:a},[u(Y,{flat:!0,dense:!0,noCaps:!0,label:e,tabindex:f.value,...b("view#"+t,{onClick:()=>{C.value=t}})})]))]),u("div",{class:"row items-center q-date__arrow"},[u(Y,{round:!0,dense:!0,size:"sm",flat:!0,icon:ne.value[1],tabindex:f.value,disable:v.next===!1,...b("go+#"+t,{onClick(){o(1)}})})])]}const rt={Calendar:()=>[u("div",{key:"calendar-view",class:"q-date__view q-date__calendar"},[u("div",{class:"q-date__navigation row items-center no-wrap"},_e({label:h.value.months[i.value.month-1],type:"Months",key:i.value.month,dir:p.value,goTo:Ye,boundaries:de.value.month,cls:" col"}).concat(_e({label:i.value.year,type:"Years",key:i.value.year,dir:ie.value,goTo:ye,boundaries:de.value.year,cls:""}))),u("div",{class:"q-date__calendar-weekdays row items-center no-wrap"},We.value.map(e=>u("div",{class:"q-date__calendar-item"},[u("div",e)]))),u("div",{class:"q-date__calendar-days-container relative-position overflow-hidden"},[u(Z,{name:"q-transition--slide-"+p.value},()=>u("div",{key:M.value,class:"q-date__calendar-days fit"},He.value.map(e=>u("div",{class:e.classes},[e.in===!0?u(Y,{class:e.today===!0?"q-date__today":"",dense:!0,flat:e.flat,unelevated:e.unelevated,color:e.color,textColor:e.textColor,label:e.i,tabindex:f.value,...b("day#"+e.i,{onClick:()=>{ut(e.i)},onMouseover:()=>{it(e.i)}})},e.event!==!1?()=>u("div",{class:"q-date__event bg-"+e.event}):null):u("div",""+e.i)]))))])])],Months(){const e=i.value.year===V.value.year,t=l=>_.value!==null&&i.value.year===_.value.year&&_.value.month>l||w.value!==null&&i.value.year===w.value.year&&w.value.month<l,a=h.value.monthsShort.map((l,o)=>{const v=i.value.month===o+1;return u("div",{class:"q-date__months-item flex flex-center"},[u(Y,{class:e===!0&&V.value.month===o+1?"q-date__today":null,flat:v!==!0,label:l,unelevated:v,color:v===!0?$.value:null,textColor:v===!0?R.value:null,tabindex:f.value,disable:t(o+1),...b("month#"+o,{onClick:()=>{nt(o+1)}})})])});return n.yearsInMonthView===!0&&a.unshift(u("div",{class:"row no-wrap full-width"},[_e({label:i.value.year,type:"Years",key:i.value.year,dir:ie.value,goTo:ye,boundaries:de.value.year,cls:" col"})])),u("div",{key:"months-view",class:"q-date__view q-date__months flex flex-center"},a)},Years(){const e=ee.value,t=e+P,a=[],l=o=>_.value!==null&&_.value.year>o||w.value!==null&&w.value.year<o;for(let o=e;o<=t;o++){const v=i.value.year===o;a.push(u("div",{class:"q-date__years-item flex flex-center"},[u(Y,{key:"yr"+o,class:V.value.year===o?"q-date__today":null,flat:!v,label:o,dense:!0,unelevated:v,color:v===!0?$.value:null,textColor:v===!0?R.value:null,tabindex:f.value,disable:l(o),...b("yr#"+o,{onClick:()=>{at(o)}})})]))}return u("div",{class:"q-date__view q-date__years flex flex-center"},[u("div",{class:"col-auto"},[u(Y,{round:!0,dense:!0,flat:!0,icon:ne.value[0],tabindex:f.value,disable:l(e),...b("y-",{onClick:()=>{ee.value-=P}})})]),u("div",{class:"q-date__years-content col self-stretch row items-center"},a),u("div",{class:"col-auto"},[u(Y,{round:!0,dense:!0,flat:!0,icon:ne.value[1],tabindex:f.value,disable:l(t),...b("y+",{onClick:()=>{ee.value+=P}})})])])}};function ut(e){const t={...i.value,day:e};if(n.range===!1){lt(t,M.value);return}if(D.value===null){const a=He.value.find(o=>o.fill!==!0&&o.i===e);if(n.noUnset!==!0&&a.range!==void 0){be({target:t,from:a.range.from,to:a.range.to});return}if(a.selected===!0){be(t);return}const l=F(t);D.value={init:t,initHash:l,final:t,finalHash:l},y("rangeStart",A(t))}else{const a=D.value.initHash,l=F(t),o=a<=l?{from:D.value.init,to:t}:{from:t,to:D.value.init};D.value=null,ge(a===l?t:{target:t,...o}),y("rangeEnd",{from:A(o.from),to:A(o.to)})}}function it(e){if(D.value!==null){const t={...i.value,day:e};Object.assign(D.value,{final:t,finalHash:F(t)})}}return Object.assign(B,{setToday:Se,setView:pe,offsetCalendar:et,setCalendarTo:me,setEditingRange:tt}),()=>{const e=[u("div",{class:"q-date__content col relative-position"},[u(Z,{name:"q-transition--fade"},rt[C.value])])],t=mt(g.default);return t!==void 0&&e.push(u("div",{class:"q-date__actions"},t)),n.name!==void 0&&n.disable!==!0&&ue(e,"push"),u("div",{class:ze.value,...Ze.value},[ot(),u("div",{ref:G,class:"q-date__main col column",tabindex:-1},e)])}}}),Ft=Ee({name:"QPopupProxy",props:{...Dt,breakpoint:{type:[String,Number],default:450}},emits:["show","hide"],setup(n,{slots:g,emit:y,attrs:B}){const{proxy:x}=Ne(),{$q:N}=x,b=q(!1),f=q(null),S=c(()=>parseInt(n.breakpoint,10)),{canShow:O}=Ct({showing:b});function H(){return N.screen.width<S.value||N.screen.height<S.value?"dialog":"menu"}const j=q(H()),re=c(()=>j.value==="menu"?{maxHeight:"99vh"}:{});W(()=>H(),m=>{b.value!==!0&&(j.value=m)});function ue(m){b.value=!0,y("show",m)}function G(m){b.value=!1,j.value=H(),y("hide",m)}return Object.assign(x,{show(m){O(m)===!0&&f.value.show(m)},hide(m){f.value.hide(m)},toggle(m){f.value.toggle(m)}}),yt(x,"currentComponent",()=>({type:j.value,ref:f.value})),()=>{const m={ref:f,...re.value,...B,onShow:ue,onHide:G};let h;return j.value==="dialog"?h=gt:(h=Mt,Object.assign(m,{target:n.target,contextMenu:n.contextMenu,noParentEvent:!0,separateClosePopup:!0})),u(h,m,g.default)}}});export{Ft as Q,Tt as a,Ae as b,St as c,F as g,Ht as u};
