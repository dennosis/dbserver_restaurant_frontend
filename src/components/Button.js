
import React, { Component } from 'react';


class Button extends Component {
    render(){

        let Element = this.props.href ? "a":"button"

        const attribs = {}
        if(Element==="button"){
            attribs['type'] = this.props.type || "button"
        }else{
            attribs['to'] = this.props.to
            attribs['href'] = this.props.href
        }

        if(this.props.target)
            attribs['target'] = this.props.target
        

        attribs['onClick'] = this.props.onClick
        attribs['className'] = `button font-size--m font--regular flex justify-content--center align-items--center shadow-neumorphic padding--s border-radius--2xs hover-gradient-color--white ${this.props.addClassName || ""}` 

        return(
            <Element {...attribs}>
                {this.props.text}
            </ Element >
        )
    }
}
  
export default Button;