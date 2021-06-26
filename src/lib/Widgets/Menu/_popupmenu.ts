import MenuItem from './_popupmenu_item';
import type MenubarItem from './_menubar_item';

/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */
class PopupMenu {
	isMenubar: boolean;
	domNode: HTMLElement;
	controller: MenubarItem | MenuItem;
	menuitems: MenuItem[]; // See PopupMenu init method
	firstChars: string[]; // See PopupMenu init method
	firstItem: MenuItem; // See PopupMenu init method
	lastItem: MenuItem; // See PopupMenu init method
	hasFocus: boolean; // See MenuItem handleFocus, handleBlur
	hasHover: boolean; // See PopupMenu handleMouseover, handleMouseout
	keyCode: Readonly<Record<string, number>>;

	constructor(domNode: HTMLElement, controllerObj: MenubarItem | MenuItem) {
		const msgPrefix = 'PopupMenu constructor argument domNode ';

		// Check whether domNode is a DOM element
		if (!(domNode instanceof HTMLElement)) {
			throw new TypeError(msgPrefix + 'is not a DOM Element.');
		}
		// Check whether domNode has child elements
		if (domNode.childElementCount === 0) {
			throw new Error(msgPrefix + 'has no element children.');
		}
		// Check whether domNode descendant elements have A elements
		let childElement = domNode.firstElementChild;
		while (childElement) {
			const menuitem = childElement.firstElementChild;
			if (menuitem && menuitem.tagName !== 'A') {
				throw new Error(msgPrefix + 'has descendant elements that are not A elements.');
			}
			childElement = childElement.nextElementSibling;
		}

		this.isMenubar = false;

		this.domNode = domNode;
		this.controller = controllerObj;

		this.menuitems = []; // See PopupMenu init method
		this.firstChars = []; // See PopupMenu init method

		this.firstItem = null; // See PopupMenu init method
		this.lastItem = null; // See PopupMenu init method

		this.hasFocus = false; // See MenuItem handleFocus, handleBlur
		this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout
	}

	/*
	 *   @method init  @desc
	 *       Add domNode event listeners for mouseover and mouseout. Traverse
	 *       domNode children to configure each menuitem and populate menuitems
	 *       array. Initialize firstItem and lastItem properties.
	 */
	init(): void {
		let menuElement, menuItem, textContent;

		// Configure the domNode itself

		this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
		this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

		// Traverse the element children of domNode: configure each with
		// menuitem role behavior and store reference in menuitems array.
		let childElement = this.domNode.firstElementChild;

		while (childElement) {
			menuElement = childElement.firstElementChild;

			if (menuElement && menuElement.tagName === 'A') {
				menuItem = new MenuItem(menuElement, this);
				menuItem.init();
				this.menuitems.push(menuItem);
				textContent = menuElement.textContent.trim();
				this.firstChars.push(textContent.substring(0, 1).toLowerCase());
			}
			childElement = childElement.nextElementSibling;
		}

		// Use populated menuitems array to initialize firstItem and lastItem.
		const numItems = this.menuitems.length;
		if (numItems > 0) {
			this.firstItem = this.menuitems[0];
			this.lastItem = this.menuitems[numItems - 1];
		}
	}

	/* EVENT HANDLERS */

	handleMouseover(): void {
		this.hasHover = true;
	}

	handleMouseout(): void {
		this.hasHover = false;
		setTimeout(this.close.bind(this, false), 1);
	}

	/* FOCUS MANAGEMENT METHODS */

	setFocusToController(command: string): void {
		if (typeof command !== 'string') {
			command = '';
		}

		function setFocusToMenubarItem(controller, close) {
			while (controller) {
				if (controller.isMenubarItem) {
					controller.domNode.focus();
					return controller;
				} else {
					if (close) {
						controller.menu.close(true);
					}
					controller.hasFocus = false;
				}
				controller = controller.menu.controller;
			}
			return false;
		}

		if (command === '') {
			if (this.controller && this.controller.domNode) {
				this.controller.domNode.focus();
			}
			return;
		}

		if (!this.controller.isMenubarItem) {
			this.controller.domNode.focus();
			this.close();

			if (command === 'next') {
				const menubarItem: MenubarItem = setFocusToMenubarItem(<MenuItem>this.controller, false);
				menubarItem?.menu.setFocusToNextItem(menubarItem);
			}
		} else {
			if (command === 'previous') {
				(<MenubarItem>this.controller).menu.setFocusToPreviousItem(<MenubarItem>this.controller);
			} else if (command === 'next') {
				(<MenubarItem>this.controller).menu.setFocusToNextItem(<MenubarItem>this.controller);
			}
		}
	}

	setFocusToFirstItem(): void {
		this.firstItem.domNode.focus();
	}

	setFocusToLastItem(): void {
		this.lastItem.domNode.focus();
	}

	setFocusToPreviousItem(currentItem: MenuItem): void {
		if (currentItem === this.firstItem) {
			this.lastItem.domNode.focus();
		} else {
			const index = this.menuitems.indexOf(currentItem);
			this.menuitems[index - 1].domNode.focus();
		}
	}

	setFocusToNextItem(currentItem: MenuItem): void {
		if (currentItem === this.lastItem) {
			this.firstItem.domNode.focus();
		} else {
			const index = this.menuitems.indexOf(currentItem);
			this.menuitems[index + 1].domNode.focus();
		}
	}

	setFocusByFirstCharacter(currentItem: MenuItem, char: string): void {
		const lowerChar = char.toLowerCase();

		// Get start index for search based on position of currentItem
		let start = this.menuitems.indexOf(currentItem) + 1;
		if (start === this.menuitems.length) {
			start = 0;
		}

		// Check remaining slots in the menu
		let index = this.getIndexFirstChars(start, lowerChar);

		// If not found in remaining slots, check from beginning
		if (index === -1) {
			index = this.getIndexFirstChars(0, lowerChar);
		}

		// If match was found...
		if (index > -1) {
			this.menuitems[index].domNode.focus();
		}
	}

	getIndexFirstChars(startIndex: number, char: string): number {
		for (let i = startIndex; i < this.firstChars.length; i++) {
			if (char === this.firstChars[i]) {
				return i;
			}
		}
		return -1;
	}

	/* MENU DISPLAY METHODS */

	open(): void {
		// Get position and bounding rectangle of controller object's DOM node
		const rect = this.controller.domNode.getBoundingClientRect();

		// Set CSS properties
		if (!this.controller.isMenubarItem) {
			(<HTMLElement>this.domNode.parentNode).style.position = 'relative';
			this.domNode.style.display = 'block';
			this.domNode.style.position = 'absolute';
			this.domNode.style.left = rect.width + 'px';
			this.domNode.style.zIndex = 100 + '';
		} else {
			this.domNode.style.display = 'block';
			this.domNode.style.position = 'absolute';
			this.domNode.style.top = rect.height - 1 + 'px';
			this.domNode.style.zIndex = 100 + '';
		}

		this.controller.setExpanded(true);
	}

	close(force = false): void {
		const controllerHasHover = this.controller.hasHover;

		let hasFocus = this.hasFocus;

		for (let i = 0; i < this.menuitems.length; i++) {
			const mi = this.menuitems[i];
			if (mi.popupMenu) {
				hasFocus = hasFocus || (<PopupMenu>mi.popupMenu).hasFocus;
			}
		}

		if (!this.controller.isMenubarItem) {
			this.controller.hasHover = false;
		}

		if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
			this.domNode.style.display = 'none';
			this.domNode.style.zIndex = 0 + '';
			this.controller.setExpanded(false);
		}
	}
}

export default PopupMenu;
