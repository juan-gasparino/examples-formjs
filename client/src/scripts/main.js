
let person = {
    name: "",
    lastName: "",
    email: "",
    dni: "",
    phone: "",
    validationFields
};

let email2 = "";
let arrayErrors;

function disableFields(disabled) {
    $("#inp_name").prop( "disabled", disabled ); 
    $("#inp_lastName").prop( "disabled", disabled ); 
    $("#inp_email").prop( "disabled", disabled ); 
    $("#inp_email2").prop( "disabled", disabled ); 
    $("#inp_dni").prop( "disabled", disabled ); 
    $("#inp_name").prop( "disabled", disabled ); 
    $("#inp_phone" ).prop( "disabled", disabled ); 
    $("#btn_summit" ).prop( "disabled", disabled ); 
}

function mapValuesToObject() {

    person.name = $("#inp_name").val();
    person.lastName = $("#inp_lastName").val();
    person.email = $("#inp_email").val();
    email2 = $("#inp_email2").val();
    person.dni = $("#inp_dni").val();
    person.phone = $("#inp_phone").val();

    arrayErrors = person.validationFields(person);

    if(arrayErrors.length == 0) {
        $( ".errorMSG" ).remove();
        $( ".successMSG" ).remove();
        insertUser(person).then((result)=>{
            $('.app').append('<div class="successMSG">'+result+'</div>');
            setTimeout(()=>{ $( ".successMSG" ).remove(); }, 3000);
        }).catch((result)=>{
            $('.app').append('<div class="errorMSG">'+result+'</div>');
        });
    }else{
        $( ".errorMSG" ).remove();
        $('.app').append('<div class="errorMSG">'+arrayErrors[0]+'</div>');
    };
}

function removeClassError() {
    $("#inp_name").removeClass("errorField");
    $("#inp_lastName").removeClass("errorField");
    $("#inp_email").removeClass("errorField");
    $("#inp_email2").removeClass("errorField");
    $("#inp_phone").removeClass("errorField");
    $("#inp_dni").removeClass("errorField");
}

function validationFields(person) {

    let arrayErrors = [];
    let patternEmail = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    let patternPhone = /^[6|7]{1}([\d]{2}[-]*){3}[\d]{2}$/;
    let patternDNI = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    
    removeClassError();

    if(person.name == "" || person.lastName == "" || person.email == "" || person.dni == "" || person.phone == "") {
        arrayErrors.push("Todos los campos deben estar informados");
        person.name != "" ? $("#inp_name").removeClass("errorField") : $("#inp_name").addClass("errorField");
        person.lastName != "" ? $("#inp_lastName").removeClass("errorField") : $("#inp_lastName").addClass("errorField");
    }
    if(person.email != email2) {
        arrayErrors.push("Los correos no coinciden");
        $("#inp_email").addClass("errorField");
        $("#inp_email2").addClass("errorField");
    }
    if(!patternEmail.test(person.email)) {
        arrayErrors.push("correo no valido");
        $("#inp_email").addClass("errorField");
        $("#inp_email2").addClass("errorField");
    }
    if(!patternPhone.test(person.phone)) {
        arrayErrors.push("telefono no valido");
        $("#inp_phone").addClass("errorField");
    }
    if(!patternDNI.test(person.dni)) {
        arrayErrors.push("DNI no valido");
        $("#inp_dni").addClass("errorField");
    }
        return arrayErrors
}

function userExist(person) {
    return new Promise((resolve,reject) => {
        $.ajax({
            url: '../../../formjs/server/user-search.php',
            type: 'POST',
            data: {
                email: person.email
            },
            success: (response)=>{
                resolve(JSON.parse(response))
            },
            error: (err)=>{
                reject(err)
            }
        });
    });
}

function addUser(person) {
    return new Promise((resolve,reject) => {
        $.ajax({
            url: '../../../formjs/server/add-user.php',
            type: 'POST',
            data: {
                name: person.name,
                lastName: person.lastName,
                email: person.email,
                dni: person.dni,
                phone: person.phone,
            },
            success: (response)=>{
                resolve(response)
            },
            error: (err)=>{
                reject(err)
            }
        });
    });
}

function insertUser(person) {
    return new Promise((resolve,reject) => {
        disableFields(true);
        userExist(person).then((result)=>{
            if(result.length == 0){
                addUser(person).then((result)=>{
                    disableFields(false);
                    resolve(result);
                })
            }
            else{
                disableFields(false);
                reject("el usuario ya existe en la BBDD");
            }
        });
    });
}

$(document).ready(()=>{
    $("#btn_summit").click(()=>{
        mapValuesToObject();
    });
});