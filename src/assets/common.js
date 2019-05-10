function openNewPage(_vm,url) {
	let routeData = _vm.$router.resolve({ path: url });
    window.open(routeData.href, '_blank');
}
function fmoney(s, n) {  
    if (s=="") {
        return "0.00"
    }  
    n = n > 0 && n <= 20 ? n : 2;  
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
    let t = "";  
    for (let i = 0; i < l.length; i++) {  
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
    }  
    return t.split("").reverse().join("") + "." + r;  
}  
function moneyBig(n){  
    var fraction = ['角', '分'];    
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];    
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];    
    var head = n < 0? '欠': '';    
    n = Math.abs(n);    
  
    var s = '';    
  
    for (var i = 0; i < fraction.length; i++)     
    {    
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');    
    }    
    s = s || '整';    
    n = Math.floor(n);    
  
    for (var i = 0; i < unit[0].length && n > 0; i++)     
    {    
        var p = '';    
        for (var j = 0; j < unit[1].length && n > 0; j++)     
        {    
            p = digit[n % 10] + unit[1][j] + p;    
            n = Math.floor(n / 10);    
        }    
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;    
    }    
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');    
} 
export default {
    openNewPage,
    fmoney,
    moneyBig,
}