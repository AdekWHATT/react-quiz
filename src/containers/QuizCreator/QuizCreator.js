import React, {Component} from "react";
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import {createControl} from '../../form/formFramework'
import Input from "../../components/UI/Input/Input";
// импортированная функция createControl возвращает простой объект
// - // - // - // - // - // - // - // - // - // - // - // - //-
 
// Чтобы правильно задавать значения для каждого из option
// будем принимать некоторый параметр number, 
function createOptionControl(number) {
    return createControl({ 
        // трансформируем с помощью обратных кавычек `` строку label 
        // и вместо статической цифры 1 выводить набор number который передавали выше
        // функции createOptionControl
         label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым!', 
            id: number
        },
        {required: true}
    )
}
// - // - // - // - // - // - // - // - // - // - // - // - //-
// Функция которая будет обнулять стейт formControls при добавлении нового вопроса 
// т.е мы занового будет смотреть всю нашу форму и делать обьект

function createFormControls () { // без параметров
   // всё что будет делать это возвращать сгенерированный набор объектов
    return {
        question: createControl({ 
            label: 'Введите вопрос', 
            errorMessage: 'Вопрос не может быть пустым! ' 
        }, {required: true}),  
        // Вместо того чтобы каждый раз прописываать функцию createControl и выдавать однотипные параметры
        // мы вызываем функцию createOptionControl() и в скобках передаем цифры номер данного параметра от 1 до 4 по счет наших option
        option1: createOptionControl(1), 
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
        
    }
} 

export default class QuizCreator extends Component {
state = {
    quiz: [],
    formControls: createFormControls()
}

    submitHandler = event => {
        event.PreventDefault()
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    changeHandler = (value, controlName) => {

    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <>
                <Input
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={event => this.changeHandler(event.target.value, controlName) }
                />
                {/* вертикальная черта ниже первого инпута */}
                        {index === 0 ? <hr/> : null}
                        </>
            )
        })
    }

    render() {
        return(
            <div className={classes.QuizCreator}>
              <div>
                  <h1>Создание теста</h1>

                  <form onSubmit={this.submitHandler}>
                   
                    { this.renderControls()}

                      <select></select>
                        <Button
                        type="primary"
                        onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                        type="success"
                        onClick={this.createQuizHandler}
                        >
                            Создать тест
                        </Button>
                  </form>
              </div>
            </div>
        )
    }
}