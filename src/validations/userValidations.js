import { required, minLength, email, alphaNum, decimal } from 'vuelidate/lib/validators'

export const userFieldValidations = {
    name: {
        required,
        minLength: minLength(2)
    },
    username: {
        required,
        alphaNum,
        minLength: minLength(4)
    },
    email: {
        required,
        email
    },
    phone: {
        required,
        //numeric
    },
}

export const userAddressValidations = {
    street: {
        required
    },
    city: {
        required
    },
    zipcode: {
        required
    },
    lat: {
        decimal
    },
    lng: {
        decimal
    }
}

const validationMessages = {
    required: 'is required',
    email: 'format is not correct',
    alphaNum: 'should have only Alphanumeric characters',
    decimal: 'should have only decimal numbers',
    numeric: 'should have only numbers',
    minLength: (min) => `should have at least ${min} characters`
}

export const getErrorMsg = (label, validationInfo) => {
    console.log(validationInfo, 'validationInfo')
    if(validationInfo.$error){
        for(let param in validationInfo.$params){
            if(!validationInfo[param]){
                if(param === 'minLength'){
                    return `${label} ${validationMessages[param](validationInfo.$params.minLength.min)}`
                }
                return `${label} ${validationMessages[param]}`
            }
        }
    }
    return '';
}
