import { Component, h, Method, Prop, State } from "@stencil/core";
export class SideDrawer {
  constructor() {
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
      mainContent = (h("div", { id: "contact-info" },
        h("h2", null, "Contact Information"),
        h("p", null, "You can reach us via phone or email."),
        h("ul", null,
          h("li", null, "Phone: 111-111-1111"),
          h("li", null,
            "Email:",
            ' ',
            h("a", { href: "mailto:email@email.com" }, "email@email.com")))));
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
      h("aside", null,
        h("header", null,
          h("h1", null, this.title),
          h("button", { onClick: this.onCloseDrawer.bind(this) }, "X")),
        h("section", { id: "tabs" },
          h("button", { class: !this.showContactInfo ? 'active' : '', onClick: this.onChangeContent.bind(this, 'nav') }, "Navigation"),
          h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onChangeContent.bind(this, 'contact') }, "Contact")),
        h("main", null, mainContent))
    ];
  }
  static get is() { return "uc-side-drawer"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["./side-drawer.css"]
  }; }
  static get styleUrls() { return {
    "$": ["side-drawer.css"]
  }; }
  static get properties() { return {
    "title": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "title",
      "reflect": true
    },
    "opened": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "opened",
      "reflect": true
    }
  }; }
  static get states() { return {
    "showContactInfo": {}
  }; }
  static get methods() { return {
    "open": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {},
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
}
