import { Component, h, Prop, State } from "@stencil/core";


@Component({
  tag: 'uc-tooltip',
  styleUrl: './tooltip.css',
  shadow: true
})

export class Tooltip {

  @State() toolTipVisible = false
  @Prop() text: string

  onToggleTooltip() {
    this.toolTipVisible = !this.toolTipVisible
  }

  render() {

    let tooltip = null
    if (this.toolTipVisible) {
      tooltip = <div id="tooltip-text">{this.text}</div>

    }

    return [
      <slot />,
      <span id="tooltip-icon" onClick={this.onToggleTooltip.bind(this)}>?</span>,      
      tooltip
    ]
  }

}