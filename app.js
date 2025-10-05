const BASE_URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_ceJcCoRXR8BAIoogTOuI2HZnPYTVb3vS002e7DyZ";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name=="from"&& currCode==="USD"){
            newOption.selected="selected"
        }else if(select.name=="to"&& currCode==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        upadateFlag(evt.target);
    });
}

const upadateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal===""||amtVal<=1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`

    const response=await fetch(URL);
    const data=await response.json();
    const rate=data.data[toCurr.value].value;
    const finalAmount=amtVal*rate;
    // console.log(toCurr.value);
    // console.log(rate);
    console.log(data[toCurr.value]);
    if (msg) {
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } else {
        console.error("Result element not found");
    }
})