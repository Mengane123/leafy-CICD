function Validation(values){
    alert("")
    let errors={}
    const Email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const Password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;


if (values.Email === undefined || values.Email === "") {
    errors.Email = "Email should not be empty";
} else if (!Email_pattern.test(values.Email)) {
    errors.Email = "Email format is incorrect";
} else {
    errors.Email = "";
}

if (values.Password === undefined || values.Password === "") {
    errors.Password = "Password should not be empty";
} else if (!Password_pattern.test(values.Password)) {
    errors.Password = "Password format is incorrect";
} else {
    errors.Password = "";
}
return errors;
}
export default Validation;