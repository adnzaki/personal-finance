const t=(e,a)=>new Intl.NumberFormat(e,a),r=e=>t("en-US",{style:"decimal"}).format(e),n=e=>/^\d+(,\d+)*$/.test(e),s={days:["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],months:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],daysShort:["Mgg","Sen","Sel","Rab","Kam","Jum","Sab"],monthsShort:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"]};export{r as f,s as i,n as v};