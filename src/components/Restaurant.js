import React, { Component } from 'react';
import {  FaCheck, FaTimes } from "react-icons/fa";
import { MdRestaurant, MdEdit, MdDelete, MdLocationOn } from "react-icons/md";

import Input from './Input';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:props.id,
            name:props.name,
            location: props.location,
            edit: props.id?false:true,
        };
    }

    
    componentWillReceiveProps(nextProps) {

        if (this.state.id !== nextProps.id) {
            this.setState({
                id: nextProps.id,
                edit: nextProps.id?false:true,
            });
        }

        if (this.state.name !== nextProps.name) {
            this.setState({
                name: nextProps.name
            });
        }
        
        if (this.state.location !== nextProps.location) {
            this.setState({
                location: nextProps.location
            });
        }
    }
    
    handleInputChange(input){
        this.setState({
            [input.name]:input.value
        })
    }

    onEditMode(isEdit){
        this.setState({
            edit: isEdit
        })
    }

    onCancel(){
        if(this.state.id){
            this.onEditMode(false)
        }else{
            if(this.props.onCancel)
                this.props.onCancel()
        }
    }
    onSubmit(){
        if(this.props.onSubmit){
            const {id, name, location} = this.state
            this.props.onSubmit({id, name, location})
            this.onEditMode(false)
        }
    }

    onDelete(){
        if(this.props.onDelete)
            this.props.onDelete()
    }

    render(){
        return(
			<section className="restaurant grid grid-gap--m align-items--center padding--xs border--1 border-radius--2xs border-color--base-20 hover-border-color--grey-60">
                <div className="flex">
                    { 
                        !this.state.edit && 
                        <>
                            <MdRestaurant className="margin-right--xs"/>
                            <span className="text-overflow">{this.state.name}</span>
                        </>
                    }

                    { 
                        this.state.edit && 
                        <Input value={this.state.name} name="name" onChange={(value)=>this.handleInputChange(value)} placeholder="Nome" />
                    }
                </div>

                <div className="flex">
                    { 
                        !this.state.edit &&  this.state.location &&
                        <>
                            <MdLocationOn className="margin-right--xs"/>
                            <span className="text-overflow">{ this.state.location }</span>
                        </>
                    }

                    { 
                        this.state.edit && 
                        <Input value={this.state.location} name="location" onChange={(value)=>this.handleInputChange(value)} placeholder="Localização" />
                    }

                </div>

                <div className="grid grid--row grid-gap--2xs">
                    { 
                        !this.state.edit && 
                        <>
                            <MdEdit onClick={()=>this.onEditMode(true)} className="hover-fill--base-75 cursor--pointer"/>
                            <MdDelete onClick={()=>this.onDelete()} className="hover-fill--base-80 cursor--pointer"/>
                        </>
                    }

                    {
                        this.state.edit && 
                        <>
                            <FaCheck onClick={()=>this.onSubmit()} className="hover-fill--base-60 cursor--pointer"/>
                            <FaTimes onClick={()=>this.onCancel()} className="hover-fill--base-80 cursor--pointer"/>
                        </>

                    }
                </div>

			</section>
        )
    }
}
  
export default User;