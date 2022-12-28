export const isValidName = text => text.toString().match('^[A-Za-z ]*$');

export const isValidAge = age => age > 15 && age < 65;

export const isValidYear = age => age.toString().length === 4;

export const isValidEmail = email => new RegExp(/^([a-z0-9+_-]+)(\.[a-z0-9+_-]+)*@([a-z0-9-]+\.)+[a-z]{2,6}$/gi).test(email);
