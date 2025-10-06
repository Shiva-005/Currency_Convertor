const BASE_URL =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_ceJcCoRXR8BAIoogTOuI2HZnPYTVb3vS002e7DyZ";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapBtn = document.getElementById("swap");

// Populate currency dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update flag dynamically
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Fetch exchange rate
async function getExchangeRate() {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal <= 0) {
        amtVal = 1;
        amount.value = "1";
    }

    msg.innerText = "Fetching exchange rate...";

    const URL = `${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data && data.data && data.data[toCurr.value]) {
            const rate = data.data[toCurr.value].value;
            const finalAmount = (amtVal * rate).toFixed(2);
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        } else {
            msg.innerText = "Exchange rate not found.";
        }
    } catch (error) {
        msg.innerText = "Error fetching data. Please try again.";
        console.error(error);
    }
}

// Handle button click
btn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

// Swap button functionality
swapBtn.addEventListener("click", () => {
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
    getExchangeRate();
});
