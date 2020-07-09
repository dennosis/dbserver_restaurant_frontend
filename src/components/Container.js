import React, { Component } from 'react';

class Container extends Component {
  render(){

		let className = `container shadow-container shadow-neumorphic padding--l border-radius--s`

		if(this.props.className){
			className = `${className} ${this.props.className}`
		}else{
			className = `${className} flex flex--column`
		}
		
		className = `${className} ${this.props.addClassName || ""}`

        
        return(
            <div style={this.props.style||{}} className={className}>
			    {
					this.props.children
				}
            </div>
        )
    }
}

export default Container;