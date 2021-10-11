import React, {Component} from "react";
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from "../../components/UI/Input/Input";
export default class Auth extends Component {
    state = {
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


    loginHandler = () => {

    }

    registerHandler = () => {

    }
// отменяет стандартное поведение формы
    submitHandler = event => {
        event.preventDefault()

    }

    onChangeHandler = (event, controlName) => {
        // проверка на правильность поведения инпутов
            console.log(`${controlName}:`, event.target.value)
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
                    onChange={event => this.onChangeHandler (event, controlName)} // callback принимает в себя ивент 

                    />
                )
        })
    }

    render() {


        return(
            <div className={classes.Auth}>
               <div>
                   <h1>Авторизация</h1>
                   <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {/* функция которая рендерит инпуты: */}
                        {this.renderInputs()}
                        <Button 
                        type="success" 
                        onClick={this.loginHandler}> 
                            Войти
                            </Button>
                            
                            <Button 
                        type="primary" 
                        onClick={this.registerHandler}>
                            Регистрация
                            </Button>
                    </form>
               </div>
            </div>
        )
    }
}