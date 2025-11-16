function validation(values) {
    let errors = {};

    const Email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    // Updated password pattern to meet your criteria
    const Password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (values.FName === undefined || values.FName === "") {
        errors.FName = "First name should not be empty";
    }

    if (values.LName === undefined || values.LName === "") {
        errors.LName = "Last name should not be empty";
    }

    if (values.Email === undefined || values.Email === "") {
        errors.Email = "Email should not be empty";
    } else if (!Email_pattern.test(values.Email)) {
        errors.Email = "Email format is incorrect";
    }

    if (values.Password === undefined || values.Password === "") {
        errors.Password = "Password should not be empty";
    } else if (!Password_pattern.test(values.Password)) {
        errors.Password = "Password format is incorrect. It should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    return errors;
}

export default validation;
