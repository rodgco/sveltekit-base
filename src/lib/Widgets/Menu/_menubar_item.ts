import type Menubar from './_menubar';
import PopupMenu from './_popupmenu';

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
class MenubarItem {
	menu: Menubar;
	domNode: HTMLElement;
	popupMenu: null | PopupMenu;
	hasFocus: boolean;
	hasHover: boolean;
	isMenubarItem: boolean;
	keyCode: Readonly<Record<string, number>>;

	constructor(domNode: HTMLElement, menuObj: Menubar) {
		this.menu = menuObj;
		this.domNode = domNode;
		this.popupMenu = null;

		this.hasFocus = false;
		this.hasHover = false;

		this.isMenubarItem = true;

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
		this.domNode.addEventListener('focus', this.handleFocus.bind(this));
		this.domNode.addEventListener('blur', this.handleBlur.bind(this));
		this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
		this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

		// Initialize pop up menus

		const nextElement = <HTMLElement>this.domNode.nextElementSibling;

		if (nextElement && nextElement.tagName === 'UL') {
			this.popupMenu = new PopupMenu(nextElement, this);
			this.popupMenu.init();
		}
	}

	handleKeydown(event: KeyboardEvent): void {
		const char = event.key;
		let flag = false;

		function isPrintableCharacter(str: string): boolean {
			return str.length === 1 && !!str.match(/\S/);
		}

		switch (event.keyCode) {
			case this.keyCode.SPACE:
			case this.keyCode.RETURN:
			case this.keyCode.DOWN:
				if (this.popupMenu) {
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
					flag = true;
				}
				break;

			case this.keyCode.LEFT:
				if (this.popupMenu) {
					this.popupMenu.close(true);
				}
				this.menu.setFocusToPreviousItem(this);
				flag = true;
				break;

			case this.keyCode.RIGHT:
				if (this.popupMenu) {
					this.popupMenu.close(true);
				}
				this.menu.setFocusToNextItem(this);
				flag = true;
				break;

			case this.keyCode.UP:
				if (this.popupMenu) {
					this.popupMenu.open();
					this.popupMenu.setFocusToLastItem();
					flag = true;
				}
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

			case this.keyCode.TAB:
				this.popupMenu.close(true);
				break;

			case this.keyCode.ESC:
				(<PopupMenu>this.popupMenu).close(true);
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

	handleFocus(): void {
		this.menu.hasFocus = true;
	}

	handleBlur(): void {
		this.menu.hasFocus = false;
	}

	handleMouseover(): void {
		this.hasHover = true;
		this.popupMenu?.open();
	}

	handleMouseout(): void {
		this.hasHover = false;
		setTimeout(this.popupMenu?.close.bind(this.popupMenu, false), 300);
	}
}

export default MenubarItem;
