import{r,h as t,c as i,g as o,H as s}from"./p-b575f4ad.js";let n=class{constructor(t){r(this,t)}render(){return t("div",{class:"lds-ring"},t("div",null),t("div",null),t("div",null),t("div",null))}};n.style=".lds-ring{display:inline-block;position:relative;width:80px;height:80px}.lds-ring div{box-sizing:border-box;display:block;position:absolute;width:64px;height:64px;margin:8px;border:8px solid #3b013b;border-radius:50%;animation:lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;border-color:#3b013b transparent transparent transparent}.lds-ring div:nth-child(1){animation-delay:-0.45s}.lds-ring div:nth-child(2){animation-delay:-0.3s}.lds-ring div:nth-child(3){animation-delay:-0.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";let e=class{constructor(t){r(this,t),this.ucSymbolSelected=i(this,"ucSymbolSelected",7),this.searchResults=[],this.loading=!1}onFindStocks(r){r.preventDefault(),this.loading=!0,fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.stockNameInput.value}&apikey=V4NQBORT4D78VV79`).then((r=>r.json())).then((r=>{this.searchResults=r.bestMatches.map((r=>({name:r["2. name"],symbol:r["1. symbol"]}))),this.loading=!1})).catch((r=>{console.log(r),this.loading=!1}))}onSelectSymbol(r){this.ucSymbolSelected.emit(r)}render(){let r=t("ul",null,this.searchResults.map((r=>t("li",{onClick:this.onSelectSymbol.bind(this,r.symbol)},t("strong",null,r.symbol),"-",r.name))));return this.loading&&(r=t("uc-spinner",null)),[t("form",{onSubmit:this.onFindStocks.bind(this)},t("input",{id:"stock-symbol",ref:r=>this.stockNameInput=r}),t("button",{type:"submit"},"Find")),r]}};e.style=":host{font-family:sans-serif;border:2px solid var(--color-primary, black);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary, black);padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid var(--color-primary, black);background:var(--color-primary, black);color:var(--color-primary-inverse, white)}form button:hover,form button:active{background:var(--color-primary-highlight, grey);border-color:var(--color-primary-highlight, grey)}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.5rem;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background:var(--color-primary, black);color:var(--color-primary-inverse, white)}";let l=class{constructor(t){r(this,t),this.stockInputValid=!1,this.loading=!1}stockSymbolChanged(r,t){r!==t&&(this.stockUserInput=r,this.stockInputValid=!0,this.fetchStockPrice(r))}onUserInput(r){this.stockUserInput=r.target.value,this.stockInputValid=""!==this.stockUserInput.trim()}onFetchStockPrice(r){r.preventDefault(),this.stockSymbol=this.stockInput.value}componentDidLoad(){console.log("componentDidLoad"),this.stockSymbol&&(this.stockUserInput=this.stockSymbol,this.stockInputValid=!0,this.fetchStockPrice(this.stockSymbol))}onStockSymbolSelected(r){r.detail&&r.detail!==this.stockSymbol&&(this.stockSymbol=r.detail)}fetchStockPrice(r){this.loading=!0,this.stockSymbol&&fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${r}&apikey=V4NQBORT4D78VV79`).then((r=>r.json())).then((r=>{if(!+r["Global Quote"]["05. price"])throw new Error("Invalid Symbol!");this.error=null,this.fetchedPrice=+r["Global Quote"]["05. price"],this.loading=!1})).catch((r=>{this.error=r.message,this.fetchedPrice=null,this.loading=!1}))}hostData(){return{class:this.error?"error":""}}__stencil_render(){let r=t("p",null,"Please enter a symbol!");return this.error&&(r=t("p",null,this.error)),this.fetchedPrice&&(r=t("p",null,"Price: $",this.fetchedPrice)),this.loading&&(r=t("uc-spinner",null)),[t("form",{onSubmit:this.onFetchStockPrice.bind(this)},t("input",{id:"stock-symbol",ref:r=>this.stockInput=r,value:this.stockUserInput,onInput:this.onUserInput.bind(this)}),t("button",{type:"submit",disabled:!this.stockInputValid||this.loading},"Fetch")),t("div",null,r)]}get el(){return o(this)}static get watchers(){return{stockSymbol:["stockSymbolChanged"]}}render(){return t(s,this.hostData(),this.__stencil_render())}};l.style=":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:#3b013b;color:white}form button:hover,form button:active{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}";export{n as uc_spinner,e as uc_stock_finder,l as uc_stock_price}