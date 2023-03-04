const currency1el=document.getElementById("currency-1")
const currency2el=document.getElementById("currency-2")
const worth1el=document.getElementById("worth1")
const worth2el=document.getElementById("worth2")
const exchangeel=document.getElementById("exchange-rate")
function updateRate(){
    fetch(`https://v6.exchangerate-api.com/v6/fb74406cd88b134790a919dc/latest/${currency1el.value}`)
    .then((res)=>res.json())
    .then((data)=>{
    const rate=data.conversion_rates[currency2el.value];
    console.log(rate);
    exchangeel.innerText=`1 ${currency1el.value}= ${rate+" "+currency2el.value}`;
     worth2el.value=(worth1el.value*rate).toFixed(2)  ; 
    });
    
}
currency1el.addEventListener("change",updateRate)
currency2el.addEventListener("change",updateRate)
worth1el.addEventListener("input",updateRate)
