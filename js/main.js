const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i< dropList.length; i++){
    for(currency_code in country_list){
        let selected;
        if(i == 0){
            selected = currency_code == 'USD' ? 'selected' : '';
        }
        else if(i == 1){
            selected = currency_code == 'BDT' ? 'selected' : '';
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener('change', e =>{
        loadFlag(e.target);
    })
}
function loadFlag(element){
    for(code in country_list){
        if(code === element.value){
            let imgTag = element.parentElement.querySelector('img');
            imgTag.src = `https://www.countryflags.io/${country_list[code]}/flat/64.png`
        }
    }
}
window.addEventListener('load', () => {
    getExchangeRate();
});
getButton.addEventListener('click', e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener('click', ()=> {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate()
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    const exchangeRateText = document.querySelector(".exchange-rate");
    let amountValue = amount.value;
    if(amountValue === '' || amountValue === "0"){
        amount.value = '1';
        amountValue = 1;
    }
    exchangeRateText.innerText = 'Getting Exchange Rate...'

    let url = `https://v6.exchangerate-api.com/v6/0b0dd3e78d0ad2920e33a5b5/latest/${fromCurrency.value}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let exchangeRate = data.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
        console.log(totalExchangeRate);
        exchangeRateText.innerText = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() => {
        exchangeRateText.innerText = "Something Went Wrong";
    })
}

