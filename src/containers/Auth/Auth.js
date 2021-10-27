import React, { Component } from "react";
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from "../../components/UI/Input/Input";
import axios from "axios";
// регекс мыла 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '', // изначальное значение контрола пустая строка
                type: 'email', // тип контрола 
                label: 'Email', // название контрола
                errorMessage: 'Введите корректный email', // сообщение об ошибке если контрол неправильный
                valid: false, // отвечает за состояние валидации данного контрола 
                touched: false, // отвечает за состояние, был ли затронут данный инпут или нет
                validation: { // здесь укажем правило по которому нужно валидировать данный контрол
                    required: true, // требование контрола, без него сабмит не произойдет
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6 // минимальная длина пароля
                }
            }
        }
    }


    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
       const responce = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_3aws89cx2BVY1dkpuLg7si96GQznNB0", authData)
            console.log(responce.data)
    } catch (e) {
            console.log(e)

        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
       const responce = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_3aws89cx2BVY1dkpuLg7si96GQznNB0", authData)
            console.log(responce.data)
    } catch (e) {
            console.log(e)

        }

    }
    // отменяет стандартное поведение формы
    submitHandler = event => {
        event.preventDefault()

    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        // копия стейта во избежание мутации 
        const formControls = { ...this.state.formControls }
        //копия нужного контрола 
        const control = { ...formControls[controlName] }

        // переопределяем все значения в переменную контрол, зна что в самом стейте уже ничего не изменим
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            // переменная control определяется по ключу formControls, т.е. мыла или пароля для меньшего написания кода
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type} // сейчас в control лежит обьект характерный для каждого из контролов, и у него есть все ключи: type, value и пр.
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation} // проверяет, нужно ли валидировать инпут, определяется универсально с приведением булевому типу !! 
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)} // callback принимает в себя ивент 

                />
            )
        })
    }

    render() {


        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {/* функция которая рендерит инпуты: */}
                        {this.renderInputs()}
                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Регистрация
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}