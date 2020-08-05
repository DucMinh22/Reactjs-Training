import * as _ from 'lodash'

const numberRegex = /^[0-9]([,.]?[0-9]?)*$/;

const isRequired = (name, value) => {
    return _.isEmpty(value)
        ? { [name]: "Fill all required field" }
        : {}
}

const isTypeNumber = (name, value) => {
    return !numberRegex.test(value)
        ? { [name]: "Please enter number in number field" }
        : {}
}

export {
    isTypeNumber,
    isRequired
}