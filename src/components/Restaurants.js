import React, { Component } from 'react';
import { FiPlusCircle } from "react-icons/fi";

import Container from './Container';
import Title from './Title';

import Restaurant from './Restaurant';

class Restaurants extends Component {


    render(){
        return(
			<Container>
                <Title tag="h2" text="Restaurantes" />

                <div className="grid grid-gap--xs margin-bottom--m">
                    {   
                        this.props.restaurants &&
                        this.props.restaurants.map((item, index)=>(
                            <Restaurant 
                                key={index}
                                id={item.id}
                                name={item.name}
                                location={item.location}
                                
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
  
export default Restaurants;