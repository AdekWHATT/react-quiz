import React from "react";
import classes from './Input.module.css'

function isInvalid ({valid, touched,shouldValidate}) {
    return !valid && shouldValidate && touched

}


const Input = props => {
// переменная которая будет определять, какого типа у нас инпут
    const inputType = props.type || 'text'      // или если тип не опрелен, то по умолчанию это будет type текст
    
    // а это переменная с классами 
    const cls = [classes.Input]

    const htmlFor = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
<label htmlFor={htmlFor}>{props.label}</label>
<input
type={inputType} 
id={htmlFor}
value={props.value}
onChange={props.onChange}
/>
{
    isInvalid(props)
    ? <span>{props.errorMessage || "Введите верное значение"}</span>
    : null
}
        </div>
    )
}

export default Input