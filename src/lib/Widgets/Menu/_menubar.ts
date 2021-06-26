/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

import MenubarItem from './_menubar_item';
import type PopupMenu from './_popupmenu';

class Menubar {
	isMenubar: boolean;
	domNode: HTMLElement;
	menubarItems: MenubarItem[];
	firstChars: string[];
	firstItem?: null | MenubarItem;
	lastItem?: null | MenubarItem;
	hasFocus: boolean;
	hasHover: boolean;

	constructor(domNode: HTMLElement) {
		const msgPrefix = 'Menubar constructor argument menubarNode ';

		// Check whether menubarNode is a DOM element
		if (!(domNode instanceof HTMLElement)) {
			throw new TypeError(msgPrefix + 'is not a DOM Element.');
		}

		// Check whether menubarNode has descendant elements
		if (domNode.childElementCount === 0) {
			throw new Error(msgPrefix + 'has no element children.');
		}

		// Check whether menubarNode has A elements
		let e: Element = domNode.firstElementChild;
		while (e) {
			const menubarItem = e.firstElementChild;
			if (e && menubarItem && menubarItem.tagName !== 'A') {
				throw new Error(msgPrefix + 'child elements are not A elements.');
			}
			e = e.nextElementSibling;
		}

		this.isMenubar = true;

		this.domNode = domNode;

		this.menubarItems = []; // See Menubar init method
		this.firstChars = []; // See Menubar init method

		this.firstItem = null; // See Menubar init method
		this.lastItem = null; // See Menubar init method

		this.hasFocus = false; // See MenubarItem handleFocus, handleBlur
		this.hasHover = false; // See Menubar handleMouseover, handleMouseout
	}

	init(): void {
		// Traverse the element children of menubarNode: configure each with
		// menuitem role behavior and store reference in menuitems array.
		let elem: HTMLElement = <HTMLElement>this.domNode.firstElementChild;

		while (elem) {
			const menuElement: HTMLElement = <HTMLElement>elem.firstElementChild;

			if (elem && menuElement && menuElement.tagName === 'A') {
				const menubarItem = new MenubarItem(menuElement, this);
				menubarItem.init();
				this.menubarItems.push(menubarItem);
				const textContent: string = menuElement.textContent.trim();
				this.firstChars.push(textContent.substring(0, 1).toLowerCase());
			}

			elem = <HTMLElement>elem.nextElementSibling;
		}

		// Use populated menuitems array to initialize firstItem and lastItem.
		const numItems = this.menubarItems.length;
		if (numItems > 0) {
			this.firstItem = this.menubarItems[0];
			this.lastItem = this.menubarItems[numItems - 1];
		}
		this.firstItem.domNode.tabIndex = 0;
	}

	/* FOCUS MANAGEMENT METHODS */

	setFocusToItem(newItem: MenubarItem): void {
		let flag = false;

		for (let i = 0; i < this.menubarItems.length; i++) {
			const mbi = this.menubarItems[i];

			if (mbi.domNode.tabIndex == 0) {
				flag = mbi.domNode.getAttribute('aria-expanded') === 'true';
			}

			mbi.domNode.tabIndex = -1;
			if (mbi.popupMenu) {
				(<PopupMenu>mbi.popupMenu).close();
			}
		}

		newItem.domNode.focus();
		newItem.domNode.tabIndex = 0;

		if (flag && newItem.popupMenu) {
			(<PopupMenu>newItem.popupMenu).open();
		}
	}

	setFocusToFirstItem(): void {
		this.setFocusToItem(this.firstItem);
	}

	setFocusToLastItem(): void {
		this.setFocusToItem(this.lastItem);
	}

	setFocusToPreviousItem(currentItem: MenubarItem): void {
		let newItem;

		if (currentItem === this.firstItem) {
			newItem = this.lastItem;
		} else {
			const index = this.menubarItems.indexOf(currentItem);
			newItem = this.menubarItems[index - 1];
		}

		this.setFocusToItem(newItem);
	}

	setFocusToNextItem(currentItem: MenubarItem): void {
		let newItem;

		if (currentItem === this.lastItem) {
			newItem = this.firstItem;
		} else {
			const index = this.menubarItems.indexOf(currentItem);
			newItem = this.menubarItems[index + 1];
		}

		this.setFocusToItem(newItem);
	}

	setFocusByFirstCharacter(currentItem: MenubarItem, char: string): void {
		// let flag = currentItem.domNode.getAttribute('aria-expanded') === 'true';

		const lowerChar = char.toLowerCase();

		// Get start index for search based on position of currentItem
		let start = this.menubarItems.indexOf(currentItem) + 1;
		if (start === this.menubarItems.length) {
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
			this.setFocusToItem(this.menubarItems[index]);
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
}

export default Menubar;
