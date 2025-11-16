function ContactValidation(values) {
    let errors = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.username === undefined || values.username === "") {
        errors.username = "Name should not be empty";
    } else {
        errors.username = "";
    }
    if (values.email === undefined || values.email === "") {
        errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Email format is incorrect";
    } else {
        errors.email = "";
    }

    if (values.number === undefined || values.number === "") {
        errors.number = "Number should not be empty";
    }  else {
        errors.number = "";
    }
    if (values.message === undefined || values.message === "") {
        errors.message = "message should not be empty";
    }  else {
        errors.message = "";
    }

    return errors;
}

export default ContactValidation;