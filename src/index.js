const notificationWrapper = document.getElementById('liveToast')

/* Credit DOM elements */
const creditForm = document.getElementById('loan-form');

const creditAmount = document.getElementById('credit-amount');
const creditInterestInput = document.getElementById('credit-interest');
const creditYearsInput = document.getElementById('credit-years');

const creditTotalPaymentOutput = document.getElementById('credit-total-payment');
const creditResultsWrapper = document.querySelector('[data-id="credit-results"]');
const creditSaveButton = document.getElementById('credit-save-file');

/* Deposit DOM elements */
const depositForm = document.getElementById('deposit-form');

const depositAmount = document.getElementById('deposit-initial-sum');
const depositInterest = document.getElementById('deposit-interest');
const depositYears = document.getElementById('deposit-years');

const depositResultWrapper = document.querySelector('[data-id="deposit-results"]');
const depositResult = document.getElementById('deposit-result');
const depositSaveButton = document.getElementById('deposit-save-file');


let results = {
    credit: {},
    deposit: {}
}

//Calculate Results function
const calculateCredit = (event) =>{
    event.preventDefault()

    const principal = parseFloat(creditAmount.value);
    const calculatedInterest = parseFloat(creditInterestInput.value) / 100 / 12;
    const calculatedPayment = parseFloat(creditYearsInput.value) * 12;
    //Create monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        //check whether it is finite or not
        creditTotalPaymentOutput.value = (monthly * calculatedPayment).toFixed(2);
        //Show Results
        creditResultsWrapper.style.display = 'block';

        results.credit = {
            type: 'Credit',
            principal: creditAmount.value,
            interest: creditInterestInput.value,
            years: creditYearsInput.value,
            totalPayment: creditTotalPaymentOutput.value,
        }
    } else {
        showToast('Please check your inputs');
    }
}



const calculateDeposit = (event) => {
    event.preventDefault();

    const amount = parseFloat(depositAmount.value);
    const interest = parseFloat(depositInterest.value);
    const years = parseFloat(depositYears.value);

    if (years && interest && amount) {
        const result = amount * (1 + interest / 100) ** years;

        depositResult.value = result.toFixed(2);
        depositResultWrapper.style.display = 'block';

        results.deposit = {
            type: 'Deposit',
            amount,
            interest,
            years,
            result
        }

    } else {
        showToast('Please check your inputs');
    }
}

const showToast = (message) => {
    const messageWrapper = notificationWrapper.querySelector('.toast-body')
    messageWrapper.innerText = message

    const toast = new bootstrap.Toast(notificationWrapper)

    toast.show()
}

const saveFile = (type) => () => {
    window.api.dialog(results[type], type);
}


creditForm.addEventListener('submit', calculateCredit);
creditSaveButton.addEventListener('click', saveFile('credit'))

depositForm.addEventListener('submit', calculateDeposit);
depositSaveButton.addEventListener('click', saveFile('deposit'))

