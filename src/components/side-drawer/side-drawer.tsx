import { Component, h, Method, Prop, State } from "@stencil/core";

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true

  //? To use styles, we have to inform stencil where we find that file and that it should use such an external file, by adding styleUrl configuration to this object we pass to component.
  //? Multiple style configurations: 
  //* styleUrls: allows us to define an array of paths to external files, all of which would be pulled together to form one stlye sheet for this component.
  //* styles: allows us to write inline styles without style tage ==> `.h1{}`
  //* styleUrl: Just one external file. 
  //? Shadow property: 
  //* With this set to true, stencil will automatically provide polyfills for older browers. We save all of these extra attributes, and hence we shrink our code we ship in the end, and it should be a little bit more performant
  //? Scoped property: 
  //* Allows us to tell stencil that all of the styles it finds in the external style sheet should be scoped to this component only. It does so when set to true, but it does not use the shadow DOM. Adds an attribute to all of our elements and changes all of our css styles to take that attribute into account. This is an emulation of the shadow DOM, better for older browsers that do not use shadow DOM.
})

export class SideDrawer {
  //? Have to add the prop decorator here, because stencil will not pick up this property name. Even if set programmatically from outside, stencil will not rerender.
  //? We do not need to configure the prop decorator, though there are some configurations we can pass
  //? When we add the prop decorator, stencil will watch for attributes named title on our component, and if we set or change such an attribute, or if we directly programmatically set or change the title property from outside JS (for example), then stencil will detect this change and automatically rerun the render method and it will do so in an efficient manner so that it does not re-render the entire DOM that was generated, but only the parts of the DOM that changed.
  //? Adds an automatic watcher
  //? With reflect stencil adds some logic to the generated web component that will update the attricute whenever the property changes
  //? Stencil has a unidirectional dataflow, data always flows in one direction (from outside the component to inside the component). If we want to change props from the inside, we must add the mutable configuration. 
  //? If you are only going to me making changes from inside, we use the state decorator rather than mutable configuration.
  @State() showContactInfo = false
  @Prop({ reflect: true }) title: string
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  onCloseDrawer() {
    this.opened = false
  }

  onChangeContent(content: string) {
    this.showContactInfo = content === 'contact'
  }

  @Method() //this decorator makes this method public, so we can call this method outside of this class (in the script in html for example)
  open(){
    this.opened = true
  }
  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-info">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 111-111-1111</li>
            <li>Email:{' '}
              <a href="mailto:email@email.com">email@email.com</a></li>
          </ul>
        </div>
      )

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
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          {/* have to use bind to make sure "this" always refers to the class, not the button */}
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onChangeContent.bind(this, 'nav')}>Navigation</button>
          <button class={this.showContactInfo ? 'active' : ''} onClick={this.onChangeContent.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
          {/* can't style nested content with the slot tag, you have to do that from the light DOM  */}
          {mainContent}
        </main>
      </aside>
    ]
  }
}