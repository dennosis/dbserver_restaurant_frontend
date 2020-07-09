import React, { Component } from 'react';
import { FaTimes } from "react-icons/fa";

import { MdFavorite } from "react-icons/md";



class Vote extends Component {



    render(){
        const user = this.props.users.filter((user)=>user.id===this.props.userId)
        const name = user[0]?user[0].name: this.props.userId

        return(
            <div className={`flex align-items--center margin--3xs padding--2xs padding-left--xs padding-right--xs border--1 border-radius--4xl ${this.props.favorite?'color--base-20':""} border-color--base-20 hover-border-color--grey-60`}>
                <a href={`#${this.props.userId}`}>
                    {
                        name
                    }
                </a>

                {
                    this.props.favorite &&
                    <MdFavorite className="margin-left--3xs fill--base-20 hover-fill--danger-10"/>
                }

                {
                    this.props.onDelete &&
                    <FaTimes onClick={()=>this.props.onDelete()} className="margin-left--3xs fill--base-20 hover-fill--base-80 cursor--pointer"/>
                }          
            </div>
        )
    }
}
export default Vote;