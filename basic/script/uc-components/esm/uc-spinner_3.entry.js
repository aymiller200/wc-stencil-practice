import { r as registerInstance, h, c as createEvent, g as getElement, H as Host } from './index-02548b4b.js';

const spinnerCss = ".lds-ring{display:inline-block;position:relative;width:80px;height:80px}.lds-ring div{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid #3b013b;border-radius:50%;animation:lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;border-color:#3b013b transparent transparent transparent}.lds-ring div:nth-child(1){animation-delay:-0.45s}.lds-ring div:nth-child(2){animation-delay:-0.3s}.lds-ring div:nth-child(3){animation-delay:-0.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

let Spinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "lds-ring" }, h("div", null), h("div", null), h("div", null), h("div", null)));
  }
};
Spinner.style = spinnerCss;

const AV_API_KEY = 'V4NQBORT4D78VV79';

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary, black);padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:var(--color-primary-inverse, white)}form button:hover,form button:active{background:var(--color-primary-highlight, grey);border-color:var(--color-primary-highlight, grey)}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.5rem;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background:var(--color-primary, black);color:var(--color-primary-inverse, white)}";

let StockFinder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ucSymbolSelected = createEvent(this, "ucSymbolSelected", 7);
    this.searchResults = [];
    this.loading = false;
  }
  onFindStocks(event) {
    event.preventDefault();
    this.loading = true;
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
      this.searchResults = parsedRes['bestMatches'].map(match => {
        return { name: match['2. name'], symbol: match['1. symbol'] };
      });
      this.loading = false;
    }).catch(err => {
      console.log(err);
      this.loading = false;
    });
  }
  onSelectSymbol(symbol) {
    this.ucSymbolSelected.emit(symbol);
  }
  render() {
    let content = h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), "-", result.name))));
    if (this.loading) {
      content = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFindStocks.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }), h("button", { type: "submit" }, "Find")),
      content
    ];
  }
};
StockFinder.style = stockFinderCss;

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:#3b013b;color:white}form button:hover,form button:active{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}";

let StockPrice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.stockInputValid = false;
    this.loading = false;
  }
  stockSymbolChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }
  onUserInput(event) {
    this.stockUserInput = event.target.value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    }
    else {
      this.stockInputValid = false;
    }
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    //only use shadowRoot is you are using the shadow DOM
    //const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value
    this.stockSymbol = this.stockInput.value; //another way of getting access to our user input data
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
    console.log('componentDidLoad');
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
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
  //? Listen decorator allows us to listen to any events emitted. You pass the decorator the event name (set in stock-finder)
  //? By default Listen listens for events emitted inside of the render function of the shadow DOM belonging belonging to this component. In order for Listen to listen globally, we must add the target to the Listen decorator.
  onStockSymbolSelected(event) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    if (this.stockSymbol) {
      fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
        .then(res => {
        return res.json();
      })
        .then(parsedRes => {
        if (!+parsedRes['Global Quote']['05. price']) {
          throw new Error('Invalid Symbol!');
        }
        this.error = null;
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
        this.loading = false;
      })
        .catch(err => {
        this.error = err.message;
        this.fetchedPrice = null;
        this.loading = false;
      });
    }
  }
  //? In the hostData method, we return an object with some metadata about your host element (your custome element, the tag itself of your custom element so to say)
  hostData() {
    return { class: this.error ? 'error' : '' };
  }
  __stencil_render() {
    let dataContent = h("p", null, "Please enter a symbol!");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.fetchedPrice) {
      dataContent = h("p", null, "Price: $", this.fetchedPrice);
    }
    if (this.loading) {
      dataContent = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
      h("div", null, dataContent)
    ];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};
StockPrice.style = stockPriceCss;

export { Spinner as uc_spinner, StockFinder as uc_stock_finder, StockPrice as uc_stock_price };
