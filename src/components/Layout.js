import React, { Component } from 'react';

import Footer from './Footer.js'
import Header from './Header.js'
import Content from './Content.js'
import InfoAlert from './InfoAlert'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
			alert: {},
			alertOpen:false
        };
	}

	componentWillReceiveProps(nextProps) {
		
        if (nextProps.alert !== undefined && Object.keys(nextProps.alert).length > 0 && !Object.is(this.state.alert, nextProps.alert)) {

            this.setState({
				alert:nextProps.alert,
				alertOpen:true
            });
        }
    }
	
	closeAlert(){
		this.setState({
			alert: {},
			alertOpen:false
		})
		this.props.closeAlert()
	}

	render() {
        return (
			<>
				<section className="position--fixed z-index--10 top--0 left--0 right--0 flex flex--column ">
					<Header mode={this.props.headerMode} history={this.props.history}/>

					<InfoAlert type={this.state.alert.type} open={this.state.alertOpen} onClose={()=>this.closeAlert()} content={this.state.alert.content}/>
				</section>

				<Content addClassName={`content-body ${this.props.isMiniFilter?"content-body--home":""}`} >
					{
						this.props.children
					}
				</Content>

				<Footer/>
			</>
        )
    }
}

export default Layout;