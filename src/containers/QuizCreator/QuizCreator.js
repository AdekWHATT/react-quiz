import React, {Component} from "react";
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import {createControl, validate,validateForm} from '../../form/formFramework'
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import axios from "axios";
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
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
}

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            anwers: [
          
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()

        })
    }
//-//-//-//-Метод создания теста-//-//-//-//-//

    createQuizHandler = async event => {
        event.preventDefault()
        try {
            await axios.post('https://react-quiz-f5616-default-rtdb.firebaseio.com/quizes.json', this.state.quiz)
                   this.setState({
                    quiz: [],
                    isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
                   })
            } catch(e) {
                console.log(e)
            }

    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
         const control = { ...formControls[controlName] }
         control.touched = true
         control.value = value
         control.valid = validate(control.value, control.validation)

         formControls[controlName] = control

         this.setState({
             formControls,
             isFormValid: validateForm(formControls)
         })


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

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }
    render() {
        const select = 
        <Select
        
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4}
        ]}
        />
        return(
            <div className={classes.QuizCreator}>
              <div>
                  <h1>Создание теста</h1>

                  <form onSubmit={this.submitHandler}>
                   
                    { this.renderControls()}

                      {select}


                        <Button
                        type="primary"
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                        type="success"
                        onClick={this.createQuizHandler}
                        disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                  </form>
              </div>
            </div>
        )
    }
}





