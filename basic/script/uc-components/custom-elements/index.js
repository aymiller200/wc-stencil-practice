import { h, createEvent, Host, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

const sideDrawerCss = "aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;z-index:100;background:#e9e9e9;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26);transition:left 0.3s ease-out}:host([opened]) aside{left:0}header{padding:1rem;background:black;position:relative}header h1{font-size:1.5rem;color:white;margin:0}header button{position:absolute;top:0;right:0;padding:1rem;color:white;background-color:transparent;font-size:1.5rem;border:none}header-button:focus{outline:none}#tabs{display:flex;justify-content:center;width:100%;margin:1rem 0}#tabs button{width:30%;background:white;color:black;text-align:center;border:1px solid black;font:inherit;padding:0.15rem, 0}#tabs button.active,#tabs button:hover{background:black;color:white}#tabs button:focus{outline:none}#contact-info{padding:0 1rem}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(0, 0, 0, 0.75);z-index:10;opacity:0;pointer-events:none;transition:opacity 0.3s ease-out}:host([opened]) .backdrop{opacity:1;pointer-events:all}";

let SideDrawer = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    //? Have to add the prop decorator here, because stencil will not pick up this property name. Even if set programmatically from outside, stencil will not rerender.
    //? We do not need to configure the prop decorator, though there are some configurations we can pass
    //? When we add the prop decorator, stencil will watch for attributes named title on our component, and if we set or change such an attribute, or if we directly programmatically set or change the title property from outside JS (for example), then stencil will detect this change and automatically rerun the render method and it will do so in an efficient manner so that it does not re-render the entire DOM that was generated, but only the parts of the DOM that changed.
    //? Adds an automatic watcher
    //? With reflect stencil adds some logic to the generated web component that will update the attricute whenever the property changes
    //? Stencil has a unidirectional dataflow, data always flows in one direction (from outside the component to inside the component). If we want to change props from the inside, we must add the mutable configuration. 
    //? If you are only going to me making changes from inside, we use the state decorator rather than mutable configuration.
    this.showContactInfo = false;
  }
  onCloseDrawer() {
    this.opened = false;
  }
  onChangeContent(content) {
    this.showContactInfo = content === 'contact';
  }
  open() {
    this.opened = true;
  }
  render() {
    let mainContent = h("slot", null);
    if (this.showContactInfo) {
      mainContent = (h("div", { id: "contact-info" }, h("h2", null, "Contact Information"), h("p", null, "You can reach us via phone or email."), h("ul", null, h("li", null, "Phone: 111-111-1111"), h("li", null, "Email:", ' ', h("a", { href: "mailto:email@email.com" }, "email@email.com")))));
    }
    // if(this.open) {
    //   content = (
    //     <aside>
    //       <header>
    //         <h1>{this.title}</h1>
    //       </header>
    //       <main>
    //         {/* can't style nested content with the slot tag, you have to do that from the light DOM  */}
    //         <slot />
    //       </main>
    //     </aside>
    //   )
    //   }
    return [
      h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
      h("aside", null, h("header", null, h("h1", null, this.title), h("button", { onClick: this.onCloseDrawer.bind(this) }, "X")), h("section", { id: "tabs" }, h("button", { class: !this.showContactInfo ? 'active' : '', onClick: this.onChangeContent.bind(this, 'nav') }, "Navigation"), h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onChangeContent.bind(this, 'contact') }, "Contact")), h("main", null, mainContent))
    ];
  }
  static get style() { return sideDrawerCss; }
};

const spinnerCss = ".lds-ring{display:inline-block;position:relative;width:80px;height:80px}.lds-ring div{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid #3b013b;border-radius:50%;animation:lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;border-color:#3b013b transparent transparent transparent}.lds-ring div:nth-child(1){animation-delay:-0.45s}.lds-ring div:nth-child(2){animation-delay:-0.3s}.lds-ring div:nth-child(3){animation-delay:-0.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

let Spinner = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h("div", { class: "lds-ring" }, h("div", null), h("div", null), h("div", null), h("div", null)));
  }
  static get style() { return spinnerCss; }
};

const AV_API_KEY = 'V4NQBORT4D78VV79';

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary, black);padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:var(--color-primary-inverse, white)}form button:hover,form button:active{background:var(--color-primary-highlight, grey);border-color:var(--color-primary-highlight, grey)}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.5rem;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background:var(--color-primary, black);color:var(--color-primary-inverse, white)}";

let StockFinder = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  static get style() { return stockFinderCss; }
};

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:#3b013b;color:white}form button:hover,form button:active{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}";

let StockPrice = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  get el() { return this; }
  static get watchers() { return {
    "stockSymbol": ["stockSymbolChanged"]
  }; }
  static get style() { return stockPriceCss; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};

const tooltipCss = ":host{position:relative}#tooltip-icon{background:black;color:white;padding:0.15rem 0.45rem;border-radius:50%;margin-left:0.5rem}#tooltip-text{position:absolute;top:1.5rem;left:1rem;width:8rem;background:black;color:white;padding:0.5rem;border-radius:3px;box-shadow:0 2px 6px rgba(0, 0, 0, 0.26)}";

let Tooltip = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.toolTipVisible = false;
  }
  onToggleTooltip() {
    this.toolTipVisible = !this.toolTipVisible;
  }
  render() {
    let tooltip = null;
    if (this.toolTipVisible) {
      tooltip = h("div", { id: "tooltip-text" }, this.text);
    }
    return [
      h("slot", null),
      h("span", { id: "tooltip-icon", onClick: this.onToggleTooltip.bind(this) }, "?"),
      tooltip
    ];
  }
  static get style() { return tooltipCss; }
};

const UcSideDrawer = /*@__PURE__*/proxyCustomElement(SideDrawer, [1,"uc-side-drawer",{"title":[513],"opened":[1540],"showContactInfo":[32]}]);
const UcSpinner = /*@__PURE__*/proxyCustomElement(Spinner, [1,"uc-spinner"]);
const UcStockFinder = /*@__PURE__*/proxyCustomElement(StockFinder, [1,"uc-stock-finder",{"searchResults":[32],"loading":[32]}]);
const UcStockPrice = /*@__PURE__*/proxyCustomElement(StockPrice, [1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]]);
const UcTooltip = /*@__PURE__*/proxyCustomElement(Tooltip, [1,"uc-tooltip",{"text":[1],"toolTipVisible":[32]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      UcSideDrawer,
  UcSpinner,
  UcStockFinder,
  UcStockPrice,
  UcTooltip
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { UcSideDrawer, UcSpinner, UcStockFinder, UcStockPrice, UcTooltip, defineCustomElements };
