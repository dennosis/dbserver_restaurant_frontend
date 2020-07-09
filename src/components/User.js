import React, { Component } from 'react';
import { FaUser, FaCheck, FaTimes } from "react-icons/fa";
import { MdFavorite, MdEdit, MdDelete } from "react-icons/md";

import Input from './Input';
import Select from './Select';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:props.id,
            name:props.name,
            favoriteRestaurantId: props.favoriteRestaurantId,
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
        
        if (this.state.favoriteRestaurantId !== nextProps.favoriteRestaurantId) {
            this.setState({
                favoriteRestaurantId: nextProps.favoriteRestaurantId
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
            let {id, name, favoriteRestaurantId} = this.state
            favoriteRestaurantId = parseInt(favoriteRestaurantId)===0? undefined : favoriteRestaurantId
            this.props.onSubmit({id, name, favoriteRestaurantId})
            this.onEditMode(false)
        }
    }

    onDelete(){
        if(this.props.onDelete)
            this.props.onDelete()
    }

    render(){

        const restaurantName = this.props.optsRestaurants.filter((item)=>item.value === this.state.favoriteRestaurantId )

        return(
			<section id={this.state.id} className="user grid grid-gap--m align-items--center padding--xs border--1 border-radius--2xs border-color--base-20 hover-border-color--grey-60">
                <div className="flex">
                    { 
                        !this.state.edit && 
                        <>
                            <FaUser className="margin-right--xs"/>
                            <span className="text-overflow" >{this.state.name}</span>
                        </>
                    }

                    { 
                        this.state.edit && 
                        <Input value={this.state.name} name="name" onChange={(value)=>this.handleInputChange(value)} placeholder="Nome" />
                    }
                </div>

                <div className="flex">
                    { 
                        !this.state.edit &&  this.state.favoriteRestaurantId &&
                        <>
                            <MdFavorite className="margin-right--xs"/>
                            <span className="text-overflow">
                                {
                                    (restaurantName[0]) ? restaurantName[0].name:""
                                }
                            </span>
                        </>
                    }

                    { 
                        this.state.edit && 
                        <Select options={this.props.optsRestaurants} onChange={(value)=>this.handleInputChange(value)} name="favoriteRestaurantId" firstOption={{value:0, name:"Restaurante Favorito"}} value={this.state.favoriteRestaurantId} />
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