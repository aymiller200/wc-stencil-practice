import { Component, h, State, Element, Prop, Watch, Listen } from "@stencil/core";
import { AV_API_KEY } from '../../global/global'

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})


export class StockPrice {
  stockInput: HTMLInputElement;
  // initialStockSymbol: string;

  @Element() el: HTMLElement; //? With this we have all the methods available that we would have on any HTML element

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol') //Watches for property Changes
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue
      this.stockInputValid = true
      this.fetchStockPrice(newValue)
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true
    } else {
      this.stockInputValid = false
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault()
    //only use shadowRoot is you are using the shadow DOM
    //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
    this.stockSymbol = this.stockInput.value //another way of getting access to our user input data
    //this.fetchStockPrice(stockSymbol)
  }

  /*
  ? componentWillLoad(){
    console.log('componentWillLoad')
    console.log(this.stockSymbol)
    * In this lifescycle method, you can change a property and that change will be taken into account in the upcoming render function. ComponentWillLoad runs before the render function is executed for the first time.
    * If you want to make a stateful change to a property, it is better to do it in this life cycle method rather than componentDidLoad. If we made the change in component did load, it would first render with set property, and then rerender with the stateful change.
  }
  */

  componentDidLoad() {
    console.log('componentDidLoad')
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol)
    }
  }

  /*
  !Lifecycle methods test
  ? componentWillUpdate() {
    console.log('componentWillUpdate')
    * Will fire right before it will re-render bacause some prop or state property changed.
  }

  ? componentDidUpdate(){
    console.log('componentDidUpdate')
    if(this.stockSymbol !== this.initialStockSymbol){
      this.initialStockSymbol = this.stockSymbol
      this.fetchStockPrice(this.stockSymbol)
    }
    * Will fire whenever it did call render
  }

  ? disconnectedCallback(){
    console.log('disconnectedCallback')
    * Called whenever a component is removed from the DOM. This is a great place for any clean-up work you need to do.
  }
  */


  @Listen('ucSymbolSelected', { target: 'body' })
  //? Listen decorator allows us to listen to any events emitted. You pass the decorator the event name (set in stock-finder)
  //? By default Listen listens for events emitted inside of the render function of the shadow DOM belonging belonging to this component. In order for Listen to listen globally, we must add the target to the Listen decorator.
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  fetchStockPrice(stockSymbol: string) {
    this.loading = true;
    if (this.stockSymbol) {
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        .then(res => {
          return res.json()
        })
        .then(parsedRes => {
          if (!+parsedRes['Global Quote']['05. price']) {
            throw new Error('Invalid Symbol!')
          }
          this.error = null
          this.fetchedPrice = +parsedRes['Global Quote']['05. price']
          this.loading = false
        })
        .catch(err => {
          this.error = err.message
          this.fetchedPrice = null
          this.loading = false
        })
    }
  }

  //? In the hostData method, we return an object with some metadata about your host element (your custome element, the tag itself of your custom element so to say)
  hostData() {
    return { class: this.error ? 'error' : '' }
  }

  render() {
    let dataContent = <p>Please enter a symbol!</p>
    if (this.error) {
      dataContent = <p>{this.error}</p>
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>
    }

    if (this.loading) {
      dataContent = <uc-spinner></uc-spinner>
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)} >
        <input
          id="stock-symbol"
          ref={el => this.stockInput = el}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>Fetch</button>
      </form>,

      <div>
        {dataContent}
      </div>
    ]
  }
}