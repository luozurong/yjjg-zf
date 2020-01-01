import React, {Component} from 'react'
import navbar from './navbar.module.css'

class NavBar extends Component{
    render(){
        return (
            <div className={navbar.navbar}>
                <div  className={navbar.wrap}>
                    <i></i>
                    <span>{this.props.navbarword}</span>
                </div>
            </div>
        )
    }
    
}

export default NavBar