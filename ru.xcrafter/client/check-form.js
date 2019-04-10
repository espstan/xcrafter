function check() {

    email = document.formx.email.value.toString();
    if (email != "") {
        MyReg = /^[a-z\d]+@[a-z\d]+(.([a-z\d])+)+$/i;
        if (!(MyReg.test(email))) {
            alert("Введите правильный E-mail !");
            document.formx.email.focus();
            document.formx.email.select();
            return false;
        }
    } else {
        alert("Введите e-mail!");
        document.formx.email.focus();
    }

    pass = document.formx.password.value.toString();
    if (pass == "") {
        alert("Введите пароль!");
        return false;
        document.formx.password.focus();
    }
    pass2 = document.formx.repeatPassword.value.toString();
    if (pass2 == "") {
        alert("Пожалуйста подтвердите пароль!");
        return false;
        document.formx.repeatPassword.focus();
    }
    if (pass != pass2) {
        alert('Оба введенных пароля должны быть идентичны!');
        return false;

    }



}
/*var email = document.getElementById("mail");

email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("I expect an e-mail, darling!");
    } else {
        email.setCustomValidity("");
    }
});*/