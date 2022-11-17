function validateForm(){
    console.log("START!")
    const titleSelect = document.getElementById(`title`)
    const sureNameSelect = document.getElementById(`surename`)
    const startDate = document.getElementById(`startDate`)
    const endDate = document.getElementById(`endDate`)

    const errorTitle = document.getElementById(`errorTitle`)
    const errorSurename = document.getElementById(`errorSurename`)
    const errorStartDate = document.getElementById(`errorStartDate`)
    const errorEndDate = document.getElementById(`errorEndDate`)
    const errorSummary = document.getElementById(`errorSummary`)

    resetErrors([titleSelect, sureNameSelect , startDate , endDate] , 
        [errorTitle , errorSurename , errorStartDate , errorEndDate , errorSummary])
 
    let valid = true;

    console.log(titleSelect.value)

    if(!checkRequired(titleSelect.value)){
        valid = false; 
        titleSelect.classList.add(`error-input`)
        errorTitle.innerText = "Pole wymagane"
    }

    if(!checkRequired(sureNameSelect.value)){
        valid = false;
        sureNameSelect.classList.add(`error-input`)
        errorSurename.innerText = "Pole wymagane"
    }

    if(!checkDate(startDate.value)){
        valid = false
        startDate.classList.add("error-input")
        errorStartDate.innerText = "Pole wymagane"
        console.log("DATA ERROR")
    } 

    if(!checkDate(endDate.value)){
        valid = false
        endDate.classList.add("error-input")
        errorEndDate.innerText = "Pole wymagane"
        console.log("DATA ERROR")
    } else if(!checkDateIfAfter(startDate.value , endDate.value )){
        valid = false;
        endDate.classList.add("error-input")
        errorEndDate.innerText = "Data jest przed data oddania"
    }


    if(!valid){
        errorSummary.innerText = "Formularz zawiera błędy";
    }
    console.log("END")
    return valid;
}


function checkDate(value){
    if(!value)
        return false;

    const pattern = /(\d{4})-(\d{2})-(\d{2})/
    if(!pattern.test(value))
        return false

    return true;
    
}

function checkDateIfAfter(value , compareTo){
    if(!checkDate(value))
        return false
    if(!checkDate(compareTo))
        return false


    const valueDate = new Date(value)
    const compateToDate = new Date(compareTo)
    console.log("now  " ,  valueDate)

    console.log("compate  " ,  compateToDate)
    if(valueDate.getTime() > compateToDate.getTime()){
        return false
    }

    return true;
}



function resetErrors(inputs , errors){
    inputs.forEach(i => {
        i.classList.remove("error-input");
    })

    errors.forEach(e => {
        e.innerText = ""
    })
}

function checkRequired(a){
  if(!a)
    return false
  else if(a == 0) 
    return false;
    
    return true
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