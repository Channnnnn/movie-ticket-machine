import React, { Component } from 'react';
import './modal.scss'

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      appearance: this.props.showModal ? "modal modalActive":"modal modalInactive"
    }  
  }

  componentDidUpdate(){
    // this.setState({appearance: this.props.showModal ? "modal modalActive":"modal modalInactive"})
  }

  render() { 
    return ( 
      <div className={this.state.appearance}>
        {this.props.children}
      </div>
    );
  }
}
 
export default Modal;