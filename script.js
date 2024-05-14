const Base_Url=" https://open.er-api.com/v6/latest/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
let msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        if(select.name=== "from" && currCode==="USD"){
            newoption.selected="selected";
        }else if(select.name=== "to" && currCode==="INR"){
                newoption.selected="selected";
        }
        select.append(newoption);

    }
    select.addEventListener("change",(evt)=>
    {
      updateFlag(evt.target);
    })
}
const updateFlag=(element)=>{
      let currency=element.value;
      let country=countryList[currency];
      let newSrc=`https://flagsapi.com/${country}/shiny/64.png`;
      let img=element.parentElement.querySelector("img");
      img.src=newSrc;
}
btn.addEventListener("click", async (evt)=>{
evt.preventDefault();
updateExchangerate();

})
 const updateExchangerate=async()=>{
    let from=document.querySelector(".from select");
    let to=document.querySelector(".to select");
    let amount=document.querySelector(".amount input");
    amount=amount.value;
    if(amount==="" || amount<1)
        amount=1;
    //console.log(from.value,to.value);
    const URL=` https://open.er-api.com/v6/latest/${from.value}`;
    let response=await fetch(URL);
     let data=await response.json();
     console.log(data);
     let rate=data.rates[to.value];
     let final_amount=amount*rate;
    console.log(final_amount);
    msg.innerText=`${amount} ${from.value} = ${final_amount} ${to.value}`;
 }
 window.addEventListener("load",()=>{
    updateExchangerate();
 })