const Base_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");


for(let select of dropdown){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to" && code==="BDT"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        
        updateFlag(evt.target);
    })
}


const updateFlag=(element)=>{
    let currCode=element.value;
    //console.log(currCode);
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;

}

btn.addEventListener(("click"), async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("form input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount="1";
    }

    const URL=`${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let response= await fetch(URL);
     let data= await response.json();
     let rate=data[toCurr.value.toLowerCase()];
     let finalAmount=amtVal*rate;
     msg.innerText=`${amtVal}${fromCurr.value}=${finalAmount}${toCurr.value}`;
});


