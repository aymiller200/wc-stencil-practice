'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-b059b479.js');

const tooltipCss = ":host{position:relative}#tooltip-icon{background:black;color:white;padding:0.15rem 0.45rem;border-radius:50%;margin-left:0.5rem}#tooltip-text{position:absolute;top:1.5rem;left:1rem;width:8rem;background:black;color:white;padding:0.5rem;border-radius:3px;box-shadow:0 2px 6px rgba(0, 0, 0, 0.26)}";

let Tooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.toolTipVisible = false;
  }
  onToggleTooltip() {
    this.toolTipVisible = !this.toolTipVisible;
  }
  render() {
    let tooltip = null;
    if (this.toolTipVisible) {
      tooltip = index.h("div", { id: "tooltip-text" }, this.text);
    }
    return [
      index.h("slot", null),
      index.h("span", { id: "tooltip-icon", onClick: this.onToggleTooltip.bind(this) }, "?"),
      tooltip
    ];
  }
};
Tooltip.style = tooltipCss;

exports.uc_tooltip = Tooltip;
