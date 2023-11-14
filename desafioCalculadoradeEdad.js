const moment = require(`moment`)

const fechaactual = moment()

var birthDay = moment("2003-06-19");

if(birthDay.isValid()){
    console.log("la fecha es valida") 

} else {
    console.log("la fecha NO es valida")
}

 const resultadoEnDias =  fechaactual.diff(birthDay, "days")

 console.log(resultadoEnDias)