'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-b059b479.js');

const sideDrawerCss = "aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;z-index:100;background:#e9e9e9;box-shadow:0 2px 8px rgba(0, 0, 0, 0.26);transition:left 0.3s ease-out}:host([opened]) aside{left:0}header{padding:1rem;background:black;position:relative}header h1{font-size:1.5rem;color:white;margin:0}header button{position:absolute;top:0;right:0;padding:1rem;color:white;background-color:transparent;font-size:1.5rem;border:none}header-button:focus{outline:none}#tabs{display:flex;justify-content:center;width:100%;margin:1rem 0}#tabs button{width:30%;background:white;color:black;text-align:center;border:1px solid black;font:inherit;padding:0.15rem, 0}#tabs button.active,#tabs button:hover{background:black;color:white}#tabs button:focus{outline:none}#contact-info{padding:0 1rem}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(0, 0, 0, 0.75);z-index:10;opacity:0;pointer-events:none;transition:opacity 0.3s ease-out}:host([opened]) .backdrop{opacity:1;pointer-events:all}";

let SideDrawer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    let mainContent = index.h("slot", null);
    if (this.showContactInfo) {
      mainContent = (index.h("div", { id: "contact-info" }, index.h("h2", null, "Contact Information"), index.h("p", null, "You can reach us via phone or email."), index.h("ul", null, index.h("li", null, "Phone: 111-111-1111"), index.h("li", null, "Email:", ' ', index.h("a", { href: "mailto:email@email.com" }, "email@email.com")))));
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
      index.h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
      index.h("aside", null, index.h("header", null, index.h("h1", null, this.title), index.h("button", { onClick: this.onCloseDrawer.bind(this) }, "X")), index.h("section", { id: "tabs" }, index.h("button", { class: !this.showContactInfo ? 'active' : '', onClick: this.onChangeContent.bind(this, 'nav') }, "Navigation"), index.h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onChangeContent.bind(this, 'contact') }, "Contact")), index.h("main", null, mainContent))
    ];
  }
};
SideDrawer.style = sideDrawerCss;

exports.uc_side_drawer = SideDrawer;
