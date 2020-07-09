
import React, { Component } from 'react';
import InputMask from "react-input-mask";


class Input extends Component {
    constructor(props){
        super(props)
        
        this.state={
            value: props.value || "",
            name:props.name || "",
            error:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value || ""

        if (this.state.value !== value) {
            this.setState({
                value
            });
        }
        if (this.state.error !== nextProps.error) {
            let error
            if(nextProps.error){
                error = Array.isArray(nextProps.error)?nextProps.error:[nextProps.error]
            }else{
                error = []
            }

            this.setState({
                error
            });
            
        }
    }
    handleChange = async (event) =>{
        const value = this.props.type==="number"?event.target.valueAsNumber:event.target.value
        const returnValue = this.props.mask ? value.replace(/\D/g,'') : value

        await this.setState({
            value
        });
        
        if(this.props.onChange){
            let value
            if(this.state.name){
                value = {
                    name:this.state.name, 
                    value:returnValue
                }
            }else{
                value = returnValue
            }
            await this.props.onChange(value)
        }

    }


    
    render(){

        const Element = this.props.mask? InputMask:'input'
        const maskChar = this.props.mask?{maskChar:this.props.maskChar}:{}
        
        return(
            <label className="flex flex--column flex__item--grow">
                <Element
                    type={this.props.type || "text"}  
                    name={this.state.name} 
                    id={this.props.id} 
                    value={this.state.value} 
                    mask={this.props.mask} 
                    step={this.props.step} 

                    {...maskChar} 
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder || "..."}
                    onChange={this.handleChange} 
                    max={this.props.max}
                    autoComplete={this.props.autocomplete||"on"}
                    className="input shadow-neumorphic--inset padding--xs border-radius--2xs"
                />
                {
                    this.state.error.map((value, index) => {
                        return  <span className="font-size--2xs color--danger-10 padding-left--s" key={index} >{value}</span>
                    })
                }

            </label>
        )
    }
}
  
export default Input;