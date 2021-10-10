import React, {Component} from "react";
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";
// каждый элемент массива links представляется в виде объекта
const links = [ // и у каждого обьекта есть свои параметры
    {to: '/', // говорим куда будет произведена навигация в данной ссылке
    label: 'Список', // название данной ссылки
    exact: true}, // тут true и она будет считываться несмотря на префикс после /
    
    // поэтому мы указываем напрямую что нужно только точное совпадение

    {to: '/auth', 
    label: 'Авторизация', 
    exact: false}, // false т.к. у них будут отдельные страницы и они ни скем не будут пересекаться

    {to: '/quiz-creator', 
    label: 'Создать тест', 
    exact: false}
]


class Drawer extends Component {
    clickHandler = () => {
        this.props.onClose()
    }
    renderLinks () { // пробегается по массиву links и генерирует теги li и NavLink
        return links.map((link,index) => {
            return (
                <li key={index}>
                <NavLink
                to={link.to} 
                exact={link.exact}
                activeClassName={classes.active}
                onClick={this.clickHandler} // закрывает выпадающий список после выбора
                >
                    {/* {link.label} - выведет название ссылок */}
                    {link.label} 
                </NavLink>
                </li>
            )
        })
    }
    render () {
        const cls = [classes.Drawer]
        if (!this.props.isOpen){
            cls.push(classes.close)
        }
        return (
            <React.Fragment>
            <nav className={cls.join(' ')}>
                    <ul>
                    {this.renderLinks()}
                    </ul>
            </nav>
            {/* Компонент затемнения */}
            {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            
            </React.Fragment>
        )
    }
}



export default Drawer