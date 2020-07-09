import React, { Component } from 'react';

import Container from './Container';
import Title from './Title';
import { FiPlusCircle } from "react-icons/fi";

import User from './User';


class Users extends Component {

    render(){
        return(
			<Container>
                <Title tag="h2" text="Usuarios" />
                <div className="grid grid-gap--xs margin-bottom--m">
                    {   
                        this.props.users &&
                        this.props.users.map((item, index)=>(
                            <User 
                                key={index}
                                id={item.id}
                                name={item.name}
                                favoriteRestaurantId={item.favoriteRestaurantId}
                                optsRestaurants = {this.props.restaurants.filter((item)=>item.id).map((item)=>({value:item.id, name:item.name}))}
                                
                                onCancel={()=>this.props.onMinus(index)} 
                                onSubmit={(value)=>this.props.onSubmit(index, value)}
                                onDelete={()=>this.props.onDelete(index)}
                            />
                        ))
                    }
                </div>

                <FiPlusCircle onClick={()=>this.props.onPlus()} className="font-size--3xl align-self--center fill--transparent hover-fill--base-75 cursor--pointer"/>

			</Container>
        )
    }
}
  
export default Users;