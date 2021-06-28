import Menubar from './_menubar';

export default function menubarAction(node: HTMLElement): void {
	const menubar = new Menubar(node);
	menubar.init();
}
