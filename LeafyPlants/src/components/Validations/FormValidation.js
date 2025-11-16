function FormValidation(values) {
    let errors = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    if (values.name === undefined || values.name === "") {
        errors.name = "Name should not be empty";
    } else {
        errors.name = "";
    }
    if (values.email === undefined || values.email === "") {
        errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Email format is incorrect";
    } else {
        errors.email = "";
    }
    if (values.mobile === undefined || values.mobile === "") {
        errors.mobile = "Email should not be empty";
    }  else {
        errors.mobile = "";
    }
    if (values.address === undefined || values.address === "") {
        errors.address = "Address should not be emp ty";
    }  else {
        errors.address = "";
    }
    if (values.garden_service === undefined || values.garden_service === "") {
        errors.garden_service = "Gardenservice should not be empty";
    }  else {
        errors.garden_service = "";
    }
    if (values.price === undefined || values.price === "") {
        errors.price = "Gardenservice values";
    }  else {
        errors.price = "";
    }

    return errors;
}

export default FormValidation;