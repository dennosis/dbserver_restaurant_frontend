import React, { Component } from 'react';

import Container from './Container';
import Title from './Title';

import Select from './Select';

import Vote from './Vote';


class Votes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days:this.weekDays(new Date()),
            weekDaysNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        };
    }

    async handleInputChange(restaurantId, input){

        let indexUser

        const checkUser = this.props.votes.filter((item, index)=>{
            if(item.userId===input.value){
                indexUser = index
                return true
            }else{
                return false
            }
        })

        let vote

        if(checkUser.lenght > 0){
            vote = checkUser[0]
            if(vote.restaurantId === restaurantId){
                return
            }
            vote.restaurantId = restaurantId
        }else{
            vote = {userId:input.value, restaurantId: restaurantId, date:this.props.day.toLocaleDateString()}
        }

        await this.props.onSubmit(indexUser, vote)

    }
    
    addDate(initdate, days){
        const date = new Date(initdate)
        date.setDate(date.getDate() + days);
        return date;
    }
 
    weekDays(initdate){
        const date = new Date(initdate)
        const weekday = date.getDay()
        const days = [date]
        for(let i = weekday-1; i >=0; i-- ){
            days.unshift(this.addDate(date, (i-weekday)))
        }
        for(let i = weekday+1; i < 7; i++ ){
            days.push(this.addDate(date, (i-weekday)))
        }
        return days
    }

    getVotesByRestaurantId(id){
        if(this.props.votes)
            return this.props.votes
                    .map((item, index)=>{
                        if(item.restaurantId===id){
                            let onDelete
                            if((new Date(this.props.day)).getTime() < (new Date((new Date()).toLocaleDateString())).getTime())
                                onDelete = false
                            else
                                onDelete = ()=>this.props.onDelete(index)


                            return(
                                <Vote key={index} userId={item.userId} users={this.props.users} onDelete={onDelete} onSubmit />
                            )
                        }
                    })
    }

    getVotesByfavoriteRestaurantId(id){
        if(this.props.users)
            return this.props.users
                        .filter((item, index)=>{
                            if(item.favoriteRestaurantId===id){
                                //mostra o uuario restautante favorito se o usuario não votou nenhuma vez
                                if(!this.props.votes.map((vote)=>vote.userId).includes(item.id)){
                                    return true
                                }
                            }
                            return false
                        })
                        .map((item, index)=>(
                            <Vote key={index} favorite userId={item.id} users={this.props.users} />
                        ))
    }


    render(){

        return(

			<Container addClassName="grid-span-column--2">

                <Title tag="h2" text="Votos" />
                
                <div className="flex flex--column flex__item--grow">
                    <div className="grid grid--row grid-gap--s padding-bottom--l margin-bottom--l border-bottom--1 border-color--base-20">
                        {
                            this.state.days.map((date, index)=>(

                                <div key={index} onClick={()=>this.props.setDay(date)} className={`flex flex--column align-items--center padding--2xs border--2 border-radius--2xs border-color--base-20 cursor--pointer hover-border-color--grey-60 hover-color--grey-60 ${(date.getTime() < (new Date((new Date()).toLocaleDateString())).getTime())?"color--base-20":""} ${ this.props.day.getDay()===index?'color--base-75 border-color--base-75':''}`}>
                                    <span className="font-size--xs">
                                    {
                                        this.state.weekDaysNames[index]
                                    }
                                    </span>
                                    <span className="font-size--2xl font--bold">
                                        {
                                            date.getDate()
                                        }
                                    </span>
                                </div>
                            ))
                        }

                    </div>
                    
                    <div style={{gridAutoColumns: "1fr"}}  className="grid grid--row grid-gap--s flex__item--grow">

                        {   
                            this.props.restaurants &&
                            this.props.restaurants.filter((item)=>item.id).map((item, index)=>(
                                <div key={index} className="flex flex--column padding--m border--1 border-radius--2xs border-color--base-20">
                                    <span className="font-size--l font--bold text-align--center border-bottom--1 padding-bottom--2xs border-color--base-20">
                                        { item.name }
                                    </span>

                                    <div className="flex flex--wrap padding-top--m padding-bottom--m">
                                        
                                        {
                                            !((new Date(this.props.day)).getTime() < (new Date((new Date()).toLocaleDateString())).getTime()) &&
                                            this.getVotesByfavoriteRestaurantId(item.id)
                                        }

                                        {
                                            this.getVotesByRestaurantId(item.id)
                                        }
                                    </div>
                                    
                                    {
                                        !(this.props.day.getTime() < (new Date((new Date()).toLocaleDateString())).getTime())  &&
                                        <div className="align-self--stretch margin-top--auto">
                                            <Select 
                                                value={this.state.vote}
                                                name="vote"
                                                onChange={(value)=>this.handleInputChange(item.id,value)} 
                                                firstOption={{name:"Selecione o Usuario"}} 
                                                options={this.props.users.filter((item)=>item.id).map((item)=>({value:item.id, name:item.name}))}
                                            />
                                        </div>
                                    }
                                </div>
                            ))
                        }

                    </div>


                </div>

			</Container>
        )
    }
}
  
export default Votes;