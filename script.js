const locationOpt = document.getElementById("location-opt")
const result = document.getElementById("result")
const outPut = document.getElementById("out-put")
const addAmountDollar = document.getElementById("add-amount-dollar")
const conversionBtn = document.getElementById("conversion-btn")
const cardNumber = document.getElementById("card-number")
const expiry = document.getElementById("expiry")
const cvv = document.getElementById("cvv")
const payButton = document.getElementById("pay-button")
const modalTextContent = document.getElementById("modal-textContent")
const modalCloseBtn = document.getElementById("modal-close-btn")
const modalBtn = document.getElementById("modal-btn")
let outPuted
let currencySymbol
let currencyInitial

// Fetch exchange rates using openexchangerates.org API
fetch("https://openexchangerates.org/api/latest.json?app_id=6fe683cf85b545a39905a927dda2f980")
    .then(response => response.json())
    .then(data => {

        // listen for selected drop-own option
        locationOpt.addEventListener("change", () => {

            const selectedOption = locationOpt.options[locationOpt.selectedIndex].value

            // display selected result in the dom
            result.innerHTML = `<p>You've selected the currency used in
                <strong>${selectedOption}</strong>.</p>
             `
           
            // create 'objectMap' object to represent drop-down values  
            const objectMap = {
                "Zambia": data.rates["ZMW"],
                "Canada": data.rates["CAD"],
                "United-kingdom": data.rates["GBP"],
                "Egypt": data.rates["EGP"],
                "Israel": data.rates["ILS"],
                "Japan": data.rates["JPY"]
            }
            
            // translate selected value to pick value from objectMap
            const selectedObject = objectMap[selectedOption]
            
            // listern for click event on conversion button
            conversionBtn.addEventListener("click", function () {
                outPuted = addAmountDollar.value * selectedObject
                outPut.textContent = outPuted.toFixed(2)
            })

            // display selected currency symbol 
            if (selectedObject) {
                if(selectedObject === objectMap["Zambia"]) {
                    currencySymbol = "K"
                    currencyInitial = "ZMW"
                }
                else if(selectedObject === objectMap["Canada"]) {
                    currencySymbol = "$"
                    currencyInitial = "CAD"
                }
                else if(selectedObject === objectMap["United-kingdom"]) {
                    currencySymbol = "£"
                    currencyInitial = "GBP"
                }
                else if(selectedObject === objectMap["Egypt"]) {
                    currencySymbol = "E£"
                    currencyInitial = "EGP"
                }
                else if(selectedObject === objectMap["Israel"]) {
                    currencySymbol = "₪"
                    currencyInitial = "ILS"
                }
                else if(selectedObject === objectMap["Japan"]) {
                    currencySymbol = "¥"
                    currencyInitial = "JPY"
                }

            }
        })

        // listern for click on pay button
         payButton.addEventListener("click", function() {
            
            // display modal after 1.2 seconds when pay button is clicked
            setTimeout(()=>{

                modal.style.display = 'inline'
                modalTextContent.innerHTML =`
                
                <p>You are about to complete a payment for ${locationOpt.value}'s(${currencyInitial}) currency which
                converted $${addAmountDollar.value}USD to the local currency which is
                now ${currencySymbol}${outPuted.toFixed(2)}.</p>

                <p>Your card details are,..</P> 
                
                <ul>
                    <li>card number: ${cardNumber.value}</li>
                    <li>Your cvv: ${cvv.value}</li>
                    <li>Your expiry: date is ${expiry.value}.</li>
                </ul>
                
                <p>to continue with payments please click agree</p>
                
                `
            },1200) 

                // enable modal close button
                modalCloseBtn.disabled = false

                // listen for modal close button
                modalCloseBtn.addEventListener('click', function(){
                    modal.style.display = 'none'
                })

        })

        // listen for modal button click
        modalBtn.addEventListener("click", () => {
            console.log("modal btn works")
            modalCloseBtn.disabled = false
            modal.style.display = 'none'
        })
        
    })

