console.log("Działam ")

function validateForm(){
    const surenameInput = document.getElementById(`surename`)
    const countryInput = document.getElementById(`country`)
    const codeInput = document.getElementById(`code`)
    const cityInput = document.getElementById(`city`)


    const errorSurname = document.getElementById(`errorSureName`)
    const errorCountry = document.getElementById(`errorCountry`)
    const errorCode = document.getElementById(`errorCode`)
    const errorCity = document.getElementById(`errorCity`)
    const errorSummary = document.getElementById(`errorSummary`)

    resetErrors([surenameInput , countryInput, codeInput, cityInput] , 
       [errorSurname , errorCountry , errorCode , errorCity, errorSummary ])



    let valid = true;
    
    if(!checkRequired(surenameInput.value)){
        valid = false;
        surenameInput.classList.add("error-input")
        errorSurname.innerText = "Pole wymagane"
    }
    if(!checkRequired(countryInput.value)){
        valid = false;
        countryInput.classList.add("error-input")
        errorCountry.innerText = "Pole wymagane"
    }

    if(!checkRequired(cityInput.value)){
        valid = false;
        cityInput.classList.add("error-input")
        errorCity.innerText = "Pole wymagane"
    }
 
    if(!checkCode(codeInput.value)){
        valid = false
        codeInput.classList.add("error-input")
        errorCode.innerText = "Niepoprawny kod"
    }

    if(!valid){
        errorSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}


function checkCode(value){
    if(!value)
        return false

    if(value.length > 6)
        return false;

    const pattern = /[0-9][0-9]-[0-9][0-9][0-9]/
    return pattern.test(value)
}

function resetErrors(inputs , errors){
    inputs.forEach(i => {
        i.classList.remove("error-input");
        i.innerText = "";
    })

    errors.forEach(e => {
        e.innerText = ""
    })
}

function checkRequired(a){
  if(!a)
  return false
  else return true
}

function checkTextLengthRange(value , min , max){
    console.log("DANE WEJSCIOWE : ", value , min , max)
    if(!value)
    return false

    console.log("!value " , !value )
    


    console.log("isNAN = " , isNaN(value))

    
    if(value.length < min )
    return false

    console.log(value.length , " > " ,)
    if(value.length > max)
    return false

    console.log(value.length , " < " , max)

    return true
}