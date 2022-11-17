console.log("Javascript Działa! ")
function validateForm(){ 
    console.log("ValideFrom Działa!  ")
    const titleInput = document.getElementById(`title`)
    const typeInput = document.getElementById(`type`)
    const directorInput = document.getElementById(`director`)
    const yearInput = document.getElementById(`year`)

    const errorTitle = document.getElementById(`errorTitle`)
    const errorType = document.getElementById(`errorType`)
    const errorDirector = document.getElementById(`errorDirector`)
    const errorYear = document.getElementById(`errorYear`)
    const errorSummary = document.getElementById(`errorSummary`)
  
    resetErrors([titleInput , typeInput , directorInput , yearInput ], 
        [errorTitle , errorType , errorDirector , errorYear, errorSummary])

    let valid = true;

    if(!checkRequired(titleInput.value)){
        valid = false;
        titleInput.classList.add("error-input")
        errorTitle.innerText = "Pole wymagane";
        
    } else if(!checkTextLengthRange(titleInput.value , 2 , 60)){
        valid = false;
        titleInput.classList.add("error-input")
        errorTitle.innerText = "Pole powinno zawierać od 2 do 60 znaków"
    }

    if(!checkRequired(typeInput.value)){
        valid = false;
        typeInput.classList.add("error-input")
        errorType.innerText = "Pole wymagane";
    } else if(!checkTextLengthRange(typeInput.value , 2 , 60)){
        valid = false;
        typeInput.classList.add("error-input")
        errorType.innerText = "Pole powinno zawierać od 2 do 60"
    
    }
    console.log("DIRECTOR LENGTH = " , directorInput.value.length)
    console.log("typ : " , typeof directorInput.value)

    if(!checkRequired(directorInput.value)){
        valid = false;
        directorInput.classList.add("error-input")
        errorDirector.innerText = "Pole wymagane";
    } else if(!checkTextLengthRange(directorInput.value , 2 , 30)){
        console.log("DIRECTOR LENGTH = " , directorInput.value)
        valid = false;
        directorInput.classList.add("error-input")
        errorDirector.innerText = "Pole powinno zawierać od 2 do 30"
    }

    if(!checkYear(yearInput.value)){
        valid = false;
        yearInput.classList.add("error-input")
        errorYear.innerText = "Pole wymagane ' 1980 - 2022"
    }

    return valid;
}

function checkTime(value){
    if(value > 360 || value <= 0)
        return false
    else 
        return true
}

function checkYear(value){
    if(value == 0 || value < 1980 || value > 2022)
        return false
    else
        return true
}


function checkDate(value){
    if(!value){
        return false;
    }
    const pattern = /(\d{4}) - (\d{2}) - (\d{2})/
    return pattern.test(value) 
}

function checkDateIfAfter(value , compareTo) {
    if(!value){
        return false
    }
    if(!compareTo)
    {
        return false
    }

}

function resetErrors(inputs , errrors){
    inputs.forEach(i => {
        i.classList.remove("error-input");
        i.innerText = "";
    })

    errrors.forEach(e => {
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

    
    if(value.length > max)
    return false

    

    return true
}