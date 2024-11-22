import{ar as h,L as s,at as n,as as m,N as d,au as o,av as c,v as u}from"./index-CWLLNYBf.js";import{u as r}from"./index-BSAJd14Z.js";const g=h("fund",{state:()=>({baseUrl:"fund/",error:{},current:1,showAddForm:!1,showEditForm:!1,disableButton:!1,formTitle:"Tambah Sumber Dana",fundId:null,data:{nama:"",kepemilikan:[],ownerName:"",ownerId:null,balance:"0"},ownerList:[],deletedBalance:[]}),actions:{addBalance(){if(this.data.balance!==""){this.data.kepemilikan.push({name:this.data.ownerName,id_kepemilikan:this.data.ownerId,jumlah_dana:this.data.balance.replace(/,/g,"")});const a=this.ownerList.findIndex(i=>i.id===this.data.ownerId);a>-1&&this.ownerList.splice(a,1),this.ownerList.length>0&&(this.data.ownerId=this.ownerList[0].id,this.data.ownerName=this.ownerList[0].kepemilikan),this.data.balance="0"}},removeBalance(a){const i=this.data.kepemilikan.findIndex(e=>e.id_kepemilikan===a.id_kepemilikan);i>-1&&this.data.kepemilikan.splice(i,1),this.deletedBalance.push({ownerId:a.id_kepemilikan,fundId:a.id_sumber_dana})},getPemilik(){s.get(`${this.baseUrl}get-pemilik`,{headers:{Authorization:n}}).then(({data:a})=>{this.ownerList=a,a.length>0&&(this.data.ownerName=a[0].kepemilikan,this.data.ownerId=a[0].id)}).catch(a=>{console.error(a)})},deleteFund(a){m.create({title:"Hapus Sumber Dana",message:"Anda yakin ingin menghapus sumber dana ini?",cancel:!0,persistent:!0}).onOk(()=>{const i=d.create({group:!1,spinner:!0,message:"Menghapus data sumber dana...",color:"info",position:"center",timeout:0});s.get(`${this.baseUrl}delete/${a}`,{headers:{Authorization:n}}).then(({data:e})=>{i({timeout:o,message:e.msg,spinner:!1}),e.code===200?i({color:"positive",icon:"done"}):i({color:"negative",icon:"close"}),r().reloadData()}).catch(e=>{console.error(e),i({message:e.message,color:"negative",spinner:!1,timeout:o})})}).onCancel(()=>{})},getDetail(a,i){s.get(`${this.baseUrl}detail/${a}`,{headers:{Authorization:n}}).then(({data:e})=>{this.data.nama=e.fundSource.nama,this.data.kepemilikan=e.ownership,this.data.ownerName=e.ownership.kepemilikan,this.data.ownerId=e.ownership.id_kepemilikan,e.ownership.length>0&&(this.data.balance=e.ownership.jumlah_dana),this.fundId=e.fundSource.id,this.formTitle="Perbarui Sumber Dana",i()}).catch(e=>{console.error(e)})},save(a){const i=this.fundId!==null?`${this.baseUrl}save/${this.fundId}`:`${this.baseUrl}save`,e=d.create({group:!1,spinner:!0,message:"Menyimpan data sumber dana...",color:"info",position:"center",timeout:0}),l={nama:this.data.nama,kepemilikan:JSON.stringify(this.data.kepemilikan),ownerName:this.data.ownerName,ownerId:this.data.ownerId,balance:this.data.balance,deletedBalance:JSON.stringify(this.deletedBalance)};s.post(i,l,{headers:{Authorization:n},transformRequest:[t=>c(t)]}).then(({data:t})=>{e({timeout:o}),t.code===500?(this.error=t.msg,e({message:"Error! Silakan isi form dengan benar.",color:"negative",spinner:!1})):(this.resetForm(),e({message:t.msg,color:"positive",icon:"done",spinner:!1}),this.data.nama="",a())})},getFund(){r().state.rows=25,r().getData({token:n,lang:"indonesia",limit:25,offset:this.current-1,orderBy:"nama",searchBy:"nama",sort:"ASC",search:"",url:`${u.apiPublicPath}${this.baseUrl}get-data/`,autoReset:{active:!0,timeout:500}})},resetForm(){this.error={},this.current=1,this.deletedBalance=[],r().reloadData()}}});export{g as u};
