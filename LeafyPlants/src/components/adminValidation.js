function adminValidation(values){
    alert("")
    let errors={}
    const Email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const Password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

if (values.adminEmail === undefined || values.adminEmail === "") {
    errors.adminEmail = "Email should not be empty";
} else if (!Email_pattern.test(values.adminEmail)) {
    errors.adminEmail = "Email format is incorrect";
} else {
    errors.adminEmail = "";
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
export default adminValidation;