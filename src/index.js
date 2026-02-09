import { throttle } from '@opentech0/js-helpers';

class BackToTop extends HTMLElement {

	/**
   * Back to top button active class.
   *
   * @type {string}
   */
	static ACTIVE_CLASS = 'is-active';

	/**
   * Delay for the throttle on scroll.
   *
   * @type {number}
   */
	static THROTTLE_DELAY = 100;

	constructor() {
		super();

		this.settings = {
			distance: this.getAttribute('distance') || 800,
			rounded: this.getAttribute('rounded') !== 'false'
		};

		this.inner = this.innerHTML;
		this.innerHTML = '';
		this._onScroll = throttle(this._onScroll.bind(this), BackToTop.THROTTLE_DELAY);

		this.addEventListener('click', e => {
			e.preventDefault();
			this.scrollToTop();
		});
	}

	connectedCallback() {
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `
      ${this._styles()}
      ${this._html()}
    `;

		this.$button = this.shadowRoot.querySelector('button');

		if (this.settings.distance > 0) {
			window.addEventListener('scroll', this._onScroll);
		} else {
			this.$button.classList.add(BackToTop.ACTIVE_CLASS);
		}
	}

	/**
   * Back to top styles.
   *
   * @private
   */
	_styles() {
		return `
      <style>
        button {
            display: -webkit-inline-box;
            display: -ms-inline-flexbox;
            display: inline-flex;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            width: var(--back-to-top__width, 50px);
            height: var(--back-to-top__height, 50px);
            position: fixed;
            z-index: var(--back-to-top__z-index, 100);
            right: var(--back-to-top__right, 0);
            bottom: var(--back-to-top__bottom, 20px);
            cursor: pointer;
            ${this.settings.rounded ? 'border-radius: 100%;' : ''}
            background: var(--back-to-top__background, #000);
            -webkit-appearance: none;
               -moz-appearance: none;
                    appearance: none;
            border: none;
            padding: 0;
            margin: 0;
            -webkit-transform: var(--back-to-top__transform, translate3d(calc(100% + var(--back-to-top__extra-offset, 0px)), 0, 0)) var(--back-to-top__extra-transform, rotate(0deg));
                    transform: var(--back-to-top__transform, translate3d(calc(100% + var(--back-to-top__extra-offset, 0px)), 0, 0)) var(--back-to-top__extra-transform, rotate(0deg));
            -webkit-transition: background .3s ease-in-out, -webkit-transform .3s ease-in-out;
            transition: background .3s ease-in-out, -webkit-transform .3s ease-in-out;
            -o-transition: background .3s ease-in-out, transform .3s ease-in-out;
            transition: background .3s ease-in-out, transform .3s ease-in-out;
            transition: background .3s ease-in-out, transform .3s ease-in-out, -webkit-transform .3s ease-in-out;
            -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
        }
        @media (hover: hover) {
          button:hover {
            background: var(--back-to-top__background--active, #FFF);
          }
        }
        button.${BackToTop.ACTIVE_CLASS} {
            -webkit-transform: var(--back-to-top__transform--active, translate3d(calc((var(--back-to-top__offset-right, 20px) + var(--back-to-top__extra-offset, 0px)) * -1), 0, 0)) var(--back-to-top__extra-transform--active, var(--back-to-top__extra-transform, rotate(0deg)));
                    transform: var(--back-to-top__transform--active, translate3d(calc((var(--back-to-top__offset-right, 20px) + var(--back-to-top__extra-offset, 0px)) * -1), 0, 0)) var(--back-to-top__extra-transform--active, var(--back-to-top__extra-transform, rotate(0deg)));
        }
      </style>
    `;
	}

	/**
   * Back to top element.
   *
   * @private
   */
	_html() {
		return `
      <button aria-hidden="true">${this.inner}</button>
    `;
	}

	/**
   * Remove scrolling event if the back to top doesn't exist anymore
   */
	disconnectedCallback() {
		window.removeEventListener('scroll', this._onScroll);
	}

	/**
   * Scroll to top on click on the back to top
   */
	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	/**
   * On scroll, add back-to-top--is-active class to the element
   * if we go further `distance`
   *
   * @private
   */
	_onScroll() {
		const isActive = this.$button.classList.contains(BackToTop.ACTIVE_CLASS);

		if (window.scrollY > this.settings.distance) {
			this.$button.classList.add(BackToTop.ACTIVE_CLASS);
			!isActive && window.dispatchEvent(new Event('back-to-top:is-active'));
		} else {
			this.$button.classList.remove(BackToTop.ACTIVE_CLASS);
			isActive && window.dispatchEvent(new Event('back-to-top:is-hidden'));
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	customElements.define('back-to-top', BackToTop);
});