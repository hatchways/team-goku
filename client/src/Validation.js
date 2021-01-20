// Taken from http://emailregex.com/ under the Javascript section
const validEmailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email) {
    return validEmailRegularExpression.test(String(email));
}

export function validatePassword(password) {
    return password.length >= 6;
}
