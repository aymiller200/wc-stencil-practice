import { p as promiseResolve, b as bootstrapLazy } from './index-02548b4b.js';

/*
 Stencil Client Patch Esm v2.10.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["uc-side-drawer",[[1,"uc-side-drawer",{"title":[513],"opened":[1540],"showContactInfo":[32],"open":[64]}]]],["uc-tooltip",[[1,"uc-tooltip",{"text":[1],"toolTipVisible":[32]}]]],["uc-spinner_3",[[1,"uc-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]],[1,"uc-spinner"]]]], options);
  });
};

export { defineCustomElements };
