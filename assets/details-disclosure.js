class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    if(this.mainDetailsToggle.dataset.mode==="click"){
      this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
      this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
    }
    if(this.mainDetailsToggle.dataset.mode==="hover"){
      this.mainDetailsToggle.addEventListener('mouseenter', this.onHover.bind(this));
      this.mainDetailsToggle.addEventListener('mouseleave', this.onleave.bind(this))
      this.mainDetailsToggle.querySelector('summary').addEventListener('click',(e)=>e.preventDefault())
    }

  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach(animation => animation.play());
    } else {
      this.animations.forEach(animation => animation.cancel());
    }
  }
  onHover(e) {
    e.preventDefault()
    this.mainDetailsToggle.setAttribute('open', '')
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded',true)
    this.onToggle()

  }
  onleave(){
    setTimeout(() => {
    this.close();
    })
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
    document.documentElement.style.setProperty('--header-bottom-position-desktop', `${Math.floor(this.header.getBoundingClientRect().bottom)}px`);
  }
}

customElements.define('header-menu', HeaderMenu);
