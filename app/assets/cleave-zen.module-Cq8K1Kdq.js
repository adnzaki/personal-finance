var r,l,e;(function(a){a.UATP="uatp",a.AMEX="amex",a.DINERS="diners",a.DISCOVER="discover",a.MASTERCARD="mastercard",a.DANKORT="dankort",a.INSTAPAYMENT="instapayment",a.JCB15="jcb15",a.JCB="jcb",a.MAESTRO="maestro",a.VISA="visa",a.MIR="mir",a.UNIONPAY="unionpay",a.GENERAL="general"})(e||(e={}));var A;(r={})[e.UATP]=[4,5,6],r[e.AMEX]=[4,6,5],r[e.DINERS]=[4,6,4],r[e.DISCOVER]=[4,4,4,4],r[e.MASTERCARD]=[4,4,4,4],r[e.DANKORT]=[4,4,4,4],r[e.INSTAPAYMENT]=[4,4,4,4],r[e.JCB15]=[4,6,5],r[e.JCB]=[4,4,4,4],r[e.MAESTRO]=[4,4,4,4],r[e.VISA]=[4,4,4,4],r[e.MIR]=[4,4,4,4],r[e.UNIONPAY]=[4,4,4,4],r[e.GENERAL]=[4,4,4,4];(l={})[e.UATP]=/^(?!1800)1\d{0,14}/,l[e.AMEX]=/^3[47]\d{0,13}/,l[e.DISCOVER]=/^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,l[e.DINERS]=/^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,l[e.MASTERCARD]=/^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,l[e.DANKORT]=/^(5019|4175|4571)\d{0,12}/,l[e.INSTAPAYMENT]=/^63[7-9]\d{0,13}/,l[e.JCB15]=/^(?:2131|1800)\d{0,11}/,l[e.JCB]=/^(?:35\d{0,2})\d{0,12}/,l[e.MAESTRO]=/^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,l[e.MIR]=/^220[0-4]\d{0,12}/,l[e.VISA]=/^4\d{0,15}/,l[e.UNIONPAY]=/^(62|81)\d{0,14}/;(function(a){a.THOUSAND="thousand",a.LAKH="lakh",a.WAN="wan",a.NONE="none"})(A||(A={}));var k=A.THOUSAND,L=function(a,N){var n=N??{},p=n.delimiter,v=n.numeralThousandsGroupStyle,E=n.numeralIntegerScale,T=n.numeralDecimalMark,R=n.numeralDecimalScale,M=n.stripLeadingZeroes,D=n.numeralPositiveOnly,I=n.tailPrefix,O=n.signBeforePrefix,P=n.prefix;return function(d){var f,g,i,t=d.delimiter,o=d.numeralDecimalMark,u=d.numeralDecimalScale,B=d.stripLeadingZeroes,x=d.numeralPositiveOnly,C=d.numeralIntegerScale,U=d.numeralThousandsGroupStyle,y=d.signBeforePrefix,h=d.tailPrefix,m=d.prefix,S="",c=d.value.replace(/[A-Za-z]/g,"").replace(o,"M").replace(/[^\dM-]/g,"").replace(/^-/,"N").replace(/-/g,"").replace("N",x!=null&&x?"":"-").replace("M",o);B&&(c=c.replace(/^(-)?0+(?=\d)/,"$1"));var s=c.slice(0,1)==="-"?"-":"";switch(g=y?s+m:m+s,i=c,c.includes(o)&&(i=(f=c.split(o))[0],S=o+f[1].slice(0,u)),s==="-"&&(i=i.slice(1)),C>0&&(i=i.slice(0,C)),U){case A.LAKH:i=i.replace(/(\d)(?=(\d\d)+\d$)/g,"$1"+t);break;case A.WAN:i=i.replace(/(\d)(?=(\d{4})+$)/g,"$1"+t);break;case A.THOUSAND:i=i.replace(/(\d)(?=(\d{3})+$)/g,"$1"+t)}return h?s+i+(u>0?S:"")+m:g+i+(u>0?S:"")}({value:a,delimiter:p===void 0?",":p,numeralIntegerScale:E===void 0?0:E,numeralDecimalMark:T===void 0?".":T,numeralDecimalScale:R===void 0?2:R,stripLeadingZeroes:M===void 0||M,numeralPositiveOnly:D!==void 0&&D,numeralThousandsGroupStyle:v===void 0?k:v,tailPrefix:I!==void 0&&I,signBeforePrefix:O!==void 0&&O,prefix:P===void 0?"":P})};export{L as M};
