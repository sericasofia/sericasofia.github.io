

// initializing a CreditCard class
class CreditCard {
  #creditCardNumber;  // private creditCardNumber field
  #numberArray;       // private numberArray field 
  #validCreditNumber; // private validCreditNumber field
  #companyName;       // private companyName field

  
  constructor(creditCardNumber = "", numberArray = [], validCreditNumber = false, companyName = "") {
    this.#creditCardNumber = creditCardNumber;
    this.#numberArray = numberArray;
    this.#validCreditNumber = validCreditNumber;
    this.#companyName = companyName;
  }

  #clearInput() {
    document.getElementById("creditNumberInput").value = null;
  }

  #clearDisplay() {
    document.getElementById("creditcardcheckerdisplay").innerHTML = null;
  }

  // Private method that retrieves the input value from html and 
  // Set value to constructor's creditCardNumber variable.
  #getInput() {
    
    this.#creditCardNumber = document.getElementById("creditNumberInput").value;
    
  }

  // Private method that checks if creditCardNumber value is only numbers and between 13 to 19 digits.
  // If the input value is false, give the user pop up where is info about correct input. 
  // Lastly, method clears input.
  #validateInput() {

    const isValidInput = /^[0-9]+$/.test(this.#creditCardNumber);
        
    if (isValidInput && this.#creditCardNumber.length >= 13 && this.#creditCardNumber.length <= 19) {
      console.log(`Input: ${this.#creditCardNumber}`);
      return true;
    }
    
    alert("Input must constains 13 to 19 digits\nand it must contains only numbers.");
    this.#clearInput();
    this.#clearDisplay();
    return false;
    
  }

  // Private method that takes input and makes it array. 
  // Then it set value to constructor's numberArray variable.
  // Check also if input length and array length are same length.
  // Lastly, method clears input.
  #inputToArray() {

    const numbersLength = this.#creditCardNumber.length;

    const array = String(this.#creditCardNumber).split("").map(digit => Number(digit));

    if (numbersLength > 0 && numbersLength === array.length) {
      this.#numberArray = array;
      console.log("Array: ",this.#numberArray);
      return true;
  
    }

    this.#clearInput();
    return false;

  }

  // Private method that calculate if credit card number is valid.
  // Returns true or false and set value to constructor's validCreditNumber variable.
  #validateCreditCard() {
    this.#numberArray = this.#numberArray.reverse();
    let sum = 0;

    for (let i = 1; i < this.#numberArray.length; i++) {
      if (i % 2 !== 0) {
        if ((this.#numberArray[i] * 2) > 9) {
          sum += (this.#numberArray[i] * 2) - 9;
        } else {
          sum += (this.#numberArray[i] * 2);
        }
      } else {
        sum += this.#numberArray[i];
      }
    }

    this.#numberArray = this.#numberArray.reverse();
    sum += this.#numberArray[this.#numberArray.length - 1];

    
    this.#validCreditNumber = sum % 10 === 0;
    return this.#validCreditNumber; 
  }

  // Private method that is triggered if validateCreditCard method returns false value.
  // Method checks Array's first index value and set output to constructor's companyName variable.
  #invalidCardCompany() {
    
    this.#companyName = this.#numberArray[0] === 3 ? "American Express" 
                      : this.#numberArray[0] === 4 ? "Visa Inc" 
                      : this.#numberArray[0] === 5 ? "Mastercard" 
                      : this.#numberArray[0] === 6 ? "Discover" 
                      : "Company not found";

  }

  // Private method that display html text if credit card number is valid.
  // Lastly, method clears input.
  #displayValidOutput() {
    
    console.log('The card number is valid.');
    document.getElementById('creditcardcheckerdisplay').innerHTML = 'The card number is valid.';
    this.#clearInput();
    
  }

  // Private method that display html text if credit card number is invalid.
  // Method also display invalid credit card company name.
  // Lastly, method clears input.
  #displayInvalidOutput() {

    console.log('The card number is invalid.');
    
    if (this.#companyName !== 'Company not found') {
      document.getElementById('creditcardcheckerdisplay').innerHTML = `The card number is invalid. We were able to identify the name of the company and the card belongs to ${this.#companyName}.`;
      this.#clearInput();
      return;
    }
    
    document.getElementById('creditcardcheckerdisplay').innerHTML = 'The card number is invalid. Unfortunately, we were unable to identify the name of the company to whom the card belongs.'
    this.#clearInput();
    
  }


  // Public method is triggered when html button is clicked.
  check() {

    

    this.#getInput();

    if (this.#validateInput()) {
      
      this.#inputToArray();

      if (this.#validateCreditCard()) {
        
        this.#displayValidOutput();

      } else {
        
        this.#invalidCardCompany();

        this.#displayInvalidOutput();

      }

      return true;
    
    }

    return false;

  }
}

// Class variable.
const card = new CreditCard();

// Key listener for input field which triggers html button when Enter is pressed.
const input = document.getElementById("creditNumberInput");
input.addEventListener('keyup',(event) => {
  if (event.key === "Enter") {
    card.check();
  }
});

// Listener for left mouse click that triggers button if pressed.
const button = document.getElementById("checkNumberButton");
button.addEventListener('click', (event) => {
    if (event.button === 0) {
      card.check();
    }
  
});

