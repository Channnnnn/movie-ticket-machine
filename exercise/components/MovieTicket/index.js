import React, { Component } from 'react';

class MovieTicket extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      cashRecieved: false,
      amount: 1,
      totalPrice: this.props.movie.price,
      cash: 0,
      sufficientCash: false
    }
    this.getTotalPrice = this.getTotalPrice.bind(this)
    this.validatePositive = this.validatePositive.bind(this)
    this.validateAmount = this.validateAmount.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.sufficientCash = this.sufficientCash.bind(this)
  }

  handleKeyPress(event){
    const target = event.target;
    const key = event.key
    if (key === 'Enter'){
      if (target.name === 'amount'){
        document.getElementById('cash').focus()
      }
    }
  }

  handleCash(event){
    const {value} = event.target;
    this.setState({
      cash: value
    }) 
  }

  handleAmountChange(event){
    const target = event.target;
    const value = target.value;
    this.setState({
      amount: value
    })
  }

  handleIncrement(){
    this.setState((prevState)=> {
      prevState.amount = this.validatePositive(++prevState.amount)
      return prevState
    })
  }

  handleDecrement(){
    this.setState((prevState)=> {
      prevState.amount = this.validatePositive(--prevState.amount)
      return prevState
    })
  }

  getTotalPrice(){
    return this.validatePositive(this.state.amount) * this.props.movie.price
  }

  validatePositive(amount){
    return amount > 0 ? amount : 1
  }

  validateAmount(){
    this.setState((prevState) => {
      prevState.amount = this.validatePositive(prevState.amount)
      prevState.totalPrice = this.getTotalPrice()
      return prevState
    })
  }

  sufficientCash(){
    return this.state.cash >= this.state.totalPrice
  }

  render() { 
    const {movie} = this.props
    return ( 
      <div>
        <div>
          <h3>Buy Ticket</h3>
          <h4>Price per unit: {movie.price} THB</h4>
          <div className="ticketForm">
            <button className="decrement" onClick={this.handleDecrement.bind(this)}>-</button>
            <input type="number" name="amount" id="amount" value={this.state.amount} defaultValue="1" onBlur={this.validateAmount} onChange={this.handleAmountChange.bind(this)} onKeyPress={this.handleKeyPress}/>
            <button className="increment" onClick={this.handleIncrement.bind(this)}>+</button>
          </div>
          <div className="checkoutForm">
            <h4>Total price: {this.state.totalPrice} THB</h4>
            <label htmlFor="cash">Cash</label>
            <input type="number" name="cash" id="cash" value={this.state.cash} defaultValue="0" onChange={this.handleCash.bind(this)}/>
            <button disabled={!this.state.sufficientCash}>Confirm</button>
          </div>
          <div className="changeForm">
            <h4>Change</h4>
            <div className="changeDisplay">
              {

              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default MovieTicket;