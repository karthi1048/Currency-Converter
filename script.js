const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (code in countryList) {
//     console.log(code, countryList[code]);
// }

for( let select of dropdowns) {
    for (currCode in countryList) {
        // making every item in a countryList into a option
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        // for From selection 
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        // for To selection 
        if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    // when a change occurs on select it calls updateFlag()
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    // to retard negative & empty values
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    // URl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies//${fromCurr}/${toCurr}.json`
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // lower case is used here because API as items in 'lowercase'
    let response = await fetch(URL);
    let data = await response.json()  // json to js object

    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amountVal * rate;

    // msg.innerText = `1USD = 80INR`;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    // console.log(finalAmount);
} 

// for updating flags
const updateFlag = (element) => {
    // element holds select's value
    let currCode = element.value;
    // use currCode to get countryCode
    let countryCode = countryList[currCode]; // IN, EU
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // template literals to induce countryCode into api link
    let img = element.parentElement.querySelector('img');
    img.src = newSrc; // changing img-tag src URL every time as the dropdown option changes the countryCode
}

// button
btn.addEventListener("click", (event) => {
    event.preventDefault(); // prevents all automatic changes that occurs by default, in this case of btn 'refresh'
    updateExchangeRate();
});

// call's updateExchangeRate() when the browser window loads the document
window.addEventListener("load", () => {
    updateExchangeRate();
});