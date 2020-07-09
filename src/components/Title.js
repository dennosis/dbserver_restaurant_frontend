import React, { Component } from 'react';

class Title extends Component {
  render() {

        const Tag = this.props.tag || "h1"
        let className=""

        switch (Tag) {
            case 'h2':
                className="font-size--3xl font--bold padding-top--s padding-bottom--m color--base-40"
                break;
            
            case 'h3':
                className="font-size--xl font--bold padding-top--xs padding-bottom--s color--base-40"
                break;

            case 'h4':
                className="font-size--l font--bold padding-top--2xs padding-bottom--2xs color--base-40"
                break;

            default:
                
                className="font-size--4xl font--bold padding-top--l padding-bottom--l color--base-30"
                break;
        }

        return (
            <Tag className={`${className} ${this.props.addClassName ? this.props.addClassName : ""}`}>
                {this.props.text}
            </Tag>
        );
    }
}

export default Title