import React, { Component } from 'react';
import { Link }  from 'react-router-dom'

import { getUser} from '../../persist'
import Button from './Button.js';



class InfoUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user:getUser()||{}
        };
    }



    render() {
        return (
            <>
                { 
                    this.state.user['id'] &&
                    <div className="flex flex--column align-content--flex-start">
                        <span className="font-size-s font--regular color--base-40">Seja bem vindo</span>
                        <div className="flex flex--column">
                            <span onClick={()=>this.props.openMenu()}  className={`font-size--2xl font--bold color--base-40 cursor--pointer ${this.props.addClassNameName}`}>{this.state.user.name}</span>
                            
                            {
                                this.props.isEdit &&
                                <div className="grid grid--row grid-gap--l margin-right--auto">
                                    <Link to="/user/true" className="font-size--xs font--bold color--base-30 hover-color--base-40">editar</Link>
                                    <Link to="/signout" className="font-size--xs font--bold color--base-30 hover-color--base-40">sair</Link>
                                </div>
                            }

                        </div>
                    </div>

                }

                { 
                    !this.state.user['id'] &&
                    <div className="grid grid-template-columns--2fr grid-gap--m">
                        <Button to="/signin" text="Login"/>
                        <Button to="/signUp" text="Cadastre-se"/>
                    </div>
                }

            </>
        );
    }
}

export default InfoUser