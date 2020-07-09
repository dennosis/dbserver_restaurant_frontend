import React, { Component } from 'react';
import api from './Api'


import Layout from './components/Layout';
import Users from './components/Users';
import Restaurants from './components/Restaurants';
import Votes from './components/Votes';


class App extends Component {

    constructor(props) {
		super(props)
		this.state = {
            day:new Date(),
            users:[],
            restaurants:[],
            votes:[],
			alert:{}
		}
    }

    componentWillMount(){
        api.getUsers()
            .then(
                res => {
                    this.setState({ 
                        users: res.data || [],
                    })
                },
                error => {

                }
            )
        api.getRestaurants()
            .then(
                res => {
                    this.setState({ 
                        restaurants: res.data || [],
                    })
                },
                error => {
                    this.setState({
                        alert: { type: "error", content: "Erro ao buscar restaurant" },

                    })
                }
            )
        api.getVotes({date:this.state.day.toLocaleDateString()})
            .then(
                res => {
                    this.setState({ 
                        votes: res.data || [],
                    })
                },
                error => {
                    this.setState({
                        alert: { type: "error", content: "Erro ao buscar votos" },

                    })
                }
            )
    }

    alert(type, content){
        this.setState({
            alert: { type, content },
        })
    }

    onPlus(local){
        this.setState({
            [local]:[
                ...this.state[local],
                {}
            ]
        })
    }

    onMinus(local, index){
        if(this.state[local][index] && this.state[local][index].id===undefined){
            this.setState({
                [local]:this.state[local].filter((item, idx)=>{ return idx !== index })
            })
        }
    }

    deleteRegister(local, index){
        this.setState({
            [local]:this.state[local].filter((item, idx)=>idx !== index)
        })
    }

    setRegister(local, index, value){
        const items = [...this.state[local]]

        if(index!==undefined){
            items[index] = value
        }else{
            items.push(value)
        }

        this.setState({
            [local]:items
        })
    }

    onDelete(local,index){
        switch(local){
            case 'votes':
                api.deleteVote(this.state.votes[index].id)
                    .then(
                        res => { this.deleteRegister(local, index) },
                        error => {this.alert("error", error.response.data.message)}
                    )
                break

            case 'users':
                api.deleteUser(this.state.users[index].id)
                    .then(
                        res => { this.deleteRegister(local, index) },
                        error => {this.alert("error", error.response.data.message)}
                    )
                break

            case 'restaurants':
                api.deleteRestaurant(this.state.restaurants[index].id)
                    .then(
                        res => { this.deleteRegister(local, index) },
                        error => {this.alert("error", error.response.data.message)}
                    )
                break

            default:
                break
        }
    }

    onSubmit(local, index, value){

        if(value.id){
            switch(local){
                case 'votes':
                    api.setVote(value)
                        .then(
                            res => { this.setRegister(local, index, res.data)},
                            error => { this.alert("error", error.response.data.message) }
                        )
                    break
    
                case 'users':
                    api.setUser(value)
                        .then(
                            res => { this.setRegister(local, index, res.data) },
                            error => { this.alert("error", error.response.data.message) }
                        )
                    break
    
                case 'restaurants':
                    api.setRestaurant(value)
                        .then(
                            res => { this.setRegister(local, index, res.data) },
                            error => { this.alert("error", error.response.data.message) }
                        )
                    break

                default:
                    break
            }
        }else{
            switch(local){
                case 'votes':
                    api.storeVote(value)
                        .then(
                            res => { this.setRegister(local, index, res.data) },
                            error => { this.alert("error", error.response.data.message) }
                        )
                    break
    
                case 'users':
                    api.storeUser(value)
                        .then(
                            res => { this.setRegister(local, index, res.data) },
                            error => { this.alert("error", error.response.data.message) }
                        )
                    break
    
                case 'restaurants':
                    api.storeRestaurant(value)
                        .then(
                            res => { this.setRegister(local, index, res.data) },
                            error => { this.alert("error", error.response.data.message) }
                        )
                    break
                default:
                    break
            }
        }
    }

    setDay(newDate){

        const date = new Date(newDate)

        api.getVotes({date:date.toLocaleDateString()})
            .then(
                res => {
                    this.setState({ 
                        votes: res.data || [],
                        day: date
                    })
                },
                error => { this.alert("error", error.response.data.message) }
        )
    }


	render(){
        return (
            <Layout alert={this.state.alert} closeAlert={()=>this.setState({alert: {}})} >
                <div className="app grid grid-gap--l grid-template-columns--2fr grid-template-rows--2fr">
                    <Votes
                        users = {this.state.users} 
                        restaurants = {this.state.restaurants} 
                        votes = {this.state.votes} 
                        day={this.state.day}
                        setDay={(date)=>this.setDay(date)}

                        onDelete = {(index)=>this.onDelete('votes', index)}
                        onSubmit = {(index, value)=>this.onSubmit('votes', index, value)}

                    />
                    
                    <Users 
                        users = {this.state.users} 
                        restaurants = {this.state.restaurants} 

                        onPlus = {()=>this.onPlus('users')}
                        onMinus = {(index)=>this.onMinus('users', index)}
                        onDelete = {(index)=>this.onDelete('users', index)}
                        onSubmit = {(index, value)=>this.onSubmit('users', index, value)}
                    />
                    <Restaurants 
                        restaurants = {this.state.restaurants}

                        onPlus = {()=>this.onPlus('restaurants')}
                        onMinus = {(index)=>this.onMinus('restaurants', index)}
                        onDelete = {(index)=>this.onDelete('restaurants', index)}
                        onSubmit = {(index, value)=>this.onSubmit('restaurants', index, value)}
                    />
                </div>
            </Layout>
        );
    }
}

export default App;
