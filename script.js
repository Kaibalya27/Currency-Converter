let selectf=document.querySelector('#From')
let selectt=document.querySelector('#To')
let imgf=document.querySelector('#FromImg')
let imgt=document.querySelector('#ToImg')
let button=document.querySelector('#button')
let ans=document.createElement('h3');
let change=document.querySelector('#change')
let api="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let text=`1 INR = 1 INR`
ans.innerText=text;
button.after(ans);

selectf.addEventListener('change',()=>{
    imgf.src="https://flagsapi.com/"+countryList[selectf.value]+"/flat/64.png"
})

selectt.addEventListener('change',()=>{
    imgt.src="https://flagsapi.com/"+countryList[selectt.value]+"/flat/64.png"
})

for(code in countryList){
    let opt=document.createElement('option');
    opt.value=code;
    opt.innerText=code;
    let clone=opt.cloneNode(true)
    if(code=='INR'){
        opt.selected=true;
        clone.selected=true;
    }
    
    selectf.append(opt);
    selectt.append(clone);
}
let data
button.addEventListener('click',async (event)=>{
    event.preventDefault();
    let input=document.querySelector('input');
    let amount=input.value;
    if(amount===''||amount<1){
        amount=1;
        input.value='1';
    }
    let response=await fetch(`${api}/${selectf.value.toLowerCase()}.json`)
    data=await response.json()
    let output=data[selectf.value.toLowerCase()][selectt.value.toLowerCase()]*amount
    let text=`${amount} ${selectf.value} = ${output} ${selectt.value}`
    ans.innerText=text;
})

change.addEventListener('click',()=>{
    [selectf.value, selectt.value] = [selectt.value, selectf.value];
    selectf.dispatchEvent(new Event('change'))
    selectt.dispatchEvent(new Event('change'))

})


