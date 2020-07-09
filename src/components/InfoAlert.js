import React, { Component } from 'react';

import { FaExclamationTriangle, FaBan, FaSkullCrossbones, FaInfo, FaCheckCircle, FaTimes } from 'react-icons/fa';

class InfoAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open || false
        };
    }

    alertClose = () => {
        this.setState({
            open:false
        })

        if(this.props.onClose){
            this.props.onClose()
        }
    }

    componentDidMount() {
        if(this.props.type==="success")
            setTimeout(this.alertClose, 2000)
    }

    componentWillReceiveProps(nextProps) {

        if (this.state.open !== nextProps.open) {
            this.setState({
                open:nextProps.open
            });
        }
    }

    

    typeAlert(type) {
        let alert = {icon:{},className:""}
        switch(type){
            case "warning":
                alert.icon = <FaExclamationTriangle size={20} />
                alert.className = "color--white background-color--warning-10"
                break

            case "bloq":
                alert.icon = <FaBan size={20} />
                alert.className = "color--white background-color--danger-10"
                break

            case "error":
                alert.icon = <FaSkullCrossbones size={20} />
                alert.className = "color--white background-color--danger-10"
                break

            case "info":
                alert.icon = <FaInfo size={20} />
                alert.className = "color--white background-color--info-10"
                break
        
            case "success":
                alert.icon = <FaCheckCircle size={20} />
                alert.className = "color--white background-color--success-10"
                break

            default:
                alert.icon = <FaExclamationTriangle size={20} />
                alert.className = "color--white background-color--base-10"
        }

        return alert

    }

    render() {

        const alert = this.typeAlert(this.props.type)

        return (
            <>
                {
                    this.state.open &&
                    
                    <div className = {`l-info-alert font--bold grid justify-items--center align-items--center padding--l padding-left--2xl padding-right--2xl fill--white ${alert.className}`} >
                            
                            {
                                alert.icon
                            }
                            
                            <span className = 'text-alert'>
                            {
                                this.props.content 
                            }
                            </span>

                            <FaTimes className = 'cursor--pointer' onClick = {this.alertClose}/>
                    </div> 
                }
            </>

        );
    }
}

  
export default InfoAlert;