/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

import PopupMenu from './_popupmenu';

class MenuItem {
	domNode: HTMLElement;
	menu: PopupMenu;
	popupMenu: null | PopupMenu;
	hasFocus: boolean;
	hasHover: boolean;
	isMenubarItem: boolean;
	keyCode: Readonly<Record<string, number>>;

	constructor(domNode: HTMLElement, menuObj: PopupMenu) {
		// if (typeof popupObj !== 'object') {
		// 	popupObj = false;
		// }

		this.domNode = domNode;
		this.menu = menuObj;
		this.popupMenu = null;
		this.isMenubarItem = false;

		this.hasFocus = false;
		this.hasHover = false;

		this.keyCode = Object.freeze({
			TAB: 9,
			RETURN: 13,
			ESC: 27,
			SPACE: 32,
			PAGEUP: 33,
			PAGEDOWN: 34,
			END: 35,
			HOME: 36,
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40
		});
	}

	init(): void {
		this.domNode.tabIndex = -1;

		this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
		this.domNode.addEventListener('click', this.handleClick.bind(this));
		this.domNode.addEventListener('focus', this.handleFocus.bind(this));
		this.domNode.addEventListener('blur', this.handleBlur.bind(this));
		this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
		this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

		// Initialize flyout menu

		const nextElement = <HTMLElement>this.domNode.nextElementSibling;

		if (nextElement && nextElement.tagName === 'UL') {
			this.popupMenu = new PopupMenu(nextElement, this);
			this.popupMenu.init();
		}
	}

	isExpanded(): boolean {
		return this.domNode.getAttribute('aria-expanded') === 'true';
	}

	/* EVENT HANDLERS */

	handleKeydown(event: KeyboardEvent): void {
		const tgt = event.currentTarget;
		const char = event.key;

		let flag = false;

		let clickEvent;

		function isPrintableCharacter(str) {
			return str.length === 1 && str.match(/\S/);
		}

		switch (event.keyCode) {
			case this.keyCode.SPACE:
			case this.keyCode.RETURN:
				if (this.popupMenu && typeof this.popupMenu !== 'boolean') {
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
				} else {
					// Create simulated mouse event to mimic the behavior of ATs
					// and let the event handler handleClick do the housekeeping.
					try {
						clickEvent = new MouseEvent('click', {
							view: window,
							bubbles: true,
							cancelable: true
						});
					} catch (err) {
						if (document.createEvent) {
							// DOM Level 3 for IE 9+
							clickEvent = document.createEvent('MouseEvents');
							clickEvent.initEvent('click', true, true);
						}
					}
					tgt.dispatchEvent(clickEvent);
				}

				flag = true;
				break;

			case this.keyCode.UP:
				this.menu.setFocusToPreviousItem(this);
				flag = true;
				break;

			case this.keyCode.DOWN:
				this.menu.setFocusToNextItem(this);
				flag = true;
				break;

			case this.keyCode.LEFT:
				this.menu.setFocusToController('previous');
				this.menu.close(true);
				flag = true;
				break;

			case this.keyCode.RIGHT:
				if (this.popupMenu) {
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
				} else {
					this.menu.setFocusToController('next');
					this.menu.close(true);
				}
				flag = true;
				break;

			case this.keyCode.HOME:
			case this.keyCode.PAGEUP:
				this.menu.setFocusToFirstItem();
				flag = true;
				break;

			case this.keyCode.END:
			case this.keyCode.PAGEDOWN:
				this.menu.setFocusToLastItem();
				flag = true;
				break;

			case this.keyCode.ESC:
				this.menu.setFocusToController('');
				this.menu.close(true);
				flag = true;
				break;

			case this.keyCode.TAB:
				this.menu.setFocusToController('');
				break;

			default:
				if (isPrintableCharacter(char)) {
					this.menu.setFocusByFirstCharacter(this, char);
					flag = true;
				}
				break;
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	setExpanded(value: boolean): void {
		if (value) {
			this.domNode.setAttribute('aria-expanded', 'true');
		} else {
			this.domNode.setAttribute('aria-expanded', 'false');
		}
	}

	handleClick(): void {
		this.menu.setFocusToController('');
		this.menu.close(true);
	}

	handleFocus(): void {
		this.menu.hasFocus = true;
		this.hasFocus = true;
	}

	handleBlur(): void {
		this.menu.hasFocus = false;
		this.hasFocus = false;
		setTimeout(this.menu.close.bind(this.menu, false), 300);
	}

	handleMouseover(): void {
		this.menu.hasHover = true;
		this.hasHover = true;
		this.menu.open();
		if (this.popupMenu) {
			this.popupMenu.hasHover = true;
			this.popupMenu.open();
		}
	}

	handleMouseout(): void {
		if (this.popupMenu) {
			this.popupMenu.hasHover = false;
			this.popupMenu.close(true);
		}

		this.menu.hasHover = false;
		this.hasHover = false;
		setTimeout(this.menu.close.bind(this.menu, false), 300);
	}
}

export default MenuItem;
