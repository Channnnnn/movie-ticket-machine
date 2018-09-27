import React, { Component } from 'react';
import script from '../../script';
import './movieTicket.scss';

class MovieTicket extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      cashRecieved: false,
      amount: 1,
      cash: "",
      changes: {}
    }
    this.getTotalPrice = this.getTotalPrice.bind(this)
    this.validatePositive = this.validatePositive.bind(this)
    this.validateNonNegative = this.validateNonNegative.bind(this)
    this.validateAmount = this.validateAmount.bind(this)
    this.validateCash = this.validateCash.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.sufficientCash = this.sufficientCash.bind(this)
  }

  handleKeyPress(event){
    const target = event.target;
    const key = event.key
    if (key === 'Enter'){
      if (target.name === 'ticketAmount'){
        document.getElementById('cashAmount').focus()
      }
      if (target.name === 'cashAmount'){
        document.getElementById('paymentButton').click()
      }
    }
  }

  handleCash(event){
    const { value } = event.target;
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
    let price = script.Defaults(this.props.movie.price, 0)
    return this.validatePositive(this.state.amount) * price
  }

  validatePositive(amount){
    return amount > 0 ? amount : 1
  }

  validateNonNegative(amount){
    return amount >= 0 ? amount : ""
  }

  validateAmount(){
    this.setState((prevState) => {
      prevState.amount = this.validatePositive(prevState.amount)
      return prevState
    })
  }

  validateCash(){
    this.setState((prevState) => {
      prevState.cash = this.validateNonNegative(prevState.cash)
      return prevState
    })
  }

  sufficientCash(){
    return this.state.cash >= this.getTotalPrice()
  }

  handlePayment(){
    const cash = this.state.cash;
    const amount = this.getTotalPrice();
    const result = script.GetChange(amount, cash)
    this.setState({
      cashRecieved: true,
      change: result.amount,
      coins: result.changes
    })
  }

  render() { 
    const {movie} = this.props
    return ( 
      <div className="movieTicket">
        <h2 className="banner">Buy Ticket
        <div>
          {
            script.IsNotUndefined(movie.showtimes) && 
            movie.showtimes.map(time => { return <button className="ticketTime" key={time}>{time}</button> })             
          }
        </div></h2>
        <section>
          <h3 className="ticketPrice">Price per unit: <label>{movie.price} THB</label></h3>
          <div className="ticketForm">
            <button id="decrementButton" className="decrement" onClick={this.handleDecrement.bind(this)}>-</button>
            <input type="number" name="ticketAmount" id="ticketAmount" value={this.state.amount} onBlur={this.validateAmount} onChange={this.handleAmountChange.bind(this)} onKeyPress={this.handleKeyPress}/>
            <button id="incrementButton" className="increment" onClick={this.handleIncrement.bind(this)}>+</button>
          </div>
          <h3>TOTAL: {this.getTotalPrice()} THB</h3>
        </section>
        <section>
          <div className="checkoutForm">
            <h3 className="cashTitle">Enter Cash</h3>
            <div className="cashForm">
              <input type="number" name="cashAmount" id="cashAmount" value={this.state.cash} onBlur={this.validateCash} onChange={this.handleCash.bind(this)} onKeyPress={this.handleKeyPress} />
              <label htmlFor="cashAmount">THB</label>
              <button id="paymentButton" disabled={!this.sufficientCash()} onClick={this.handlePayment.bind(this)}>Confirm</button>
            </div>
          </div>
          {
            this.state.cashRecieved &&
            <div className="changeForm">
              <h3 className="changeAmount">Change: {this.state.change} THB</h3>
              <div className="changeDisplay">
                {
                  script.IsNotUndefined(this.state.coins) &&
                    this.state.coins.map((coin, index)=>{
                      let coinShape = "change" + coin
                      return <label key={index} className={coinShape}>{coin}</label>
                    })
                }
              </div>
            </div>
          }
        </section>
      </div>
    );
  }
}
 
export default MovieTicket;