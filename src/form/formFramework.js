// создаем функцию которая возвращает новый обьект  
export function createControl(config, validation) { // принимает в себя конфигурацию и набор правил валидации
    return { // возвращаем новый обьект
        ...config, // с помощью ...спреда разворачиваем объект конфигурации который сюда передадим, тк здесь может быть n колличество различных полей
        // они могут быть по разному названы и т.д  
        validation, // также передаем для каждого поля обьект валидации 
        valid: !validation, // отрицание от обьекта validation т.е. если мы передали набор правил валидации, в таком случае начальное значение valid будет false 
        // т.к есть изначальный набор правил и изначальное состояние у него не валидное
        touched: false,  // 
        value: '' 
    }
}
// данную функцию импортируем в quizcreator

export function validate (value, validation = null) {
    if (!validation) {
        return true
    }
 let isValid = true
 
 if (validation.required) {
    isValid = value.trim() !== '' && isValid
 }


 return isValid
}

export function validateForm(formControls) {
    let isFormValid = true

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}