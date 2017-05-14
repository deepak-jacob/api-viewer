import 'rxjs/add/operator/scan'
import {  AppBarHtml, AppBarObservable, AppBarActions } from '../src/js/components/AppBar'

describe('AppBar component', () => {

	let menuNode, ctaNode;

	const testCase = [{
			state: { navigationOpen: true },
			prvState: { navigationOpen: false },
			result: true
		},	{
			state: { navigationOpen: false },
			prvState: { navigationOpen: true },
			result: false
		}
	]

	before(() => {
		const ele = document.createElement('div')
		ele.id = 'AppBarTest'
		ele.innerHTML = AppBarHtml({children: ''}).children
		document.body.appendChild(ele)
		menuNode = document.querySelector('header .dropdown-menu')
		ctaNode = document.querySelector('header .menu-three-dot')
	})

	it('it should have AppBarHtml, AppBarObservable and AppBarActions functions', () => {
		expect(AppBarHtml).to.be.a.function
		expect(AppBarObservable).to.be.a.function
		expect(AppBarActions).to.be.a.function
	})

	describe('AppBarActions', () => {
		it('it should toggle dropdown-menu css class', () => {
			testCase.forEach(ele => {
				AppBarActions(ele.state, ele.prvState);
				expect(menuNode.classList.contains('show')).to.be[ele.result];
			})
		})
	})

	describe('when AppBarObservable subscribed', () => {

		let initState = {
			navigationOpen: false
		}

		let lastState = initState

		before(() => {
			AppBarObservable()
				.scan((state, changeFn) => changeFn(state), initState)
				.subscribe((state) => {
					AppBarActions(state, lastState)
					lastState = state
				})
		})

		it('it should not have show class at start', () => {
			expect(menuNode.classList.contains('show')).to.be.false;
		})

		it('it should have show class on click of menu', () => {
			ctaNode.click();
			expect(menuNode.classList.contains('show')).to.be.true;
		})

		it('it should not have show class on click of body', () => {
			document.body.click();
			expect(menuNode.classList.contains('show')).to.be.false;
		})
	})

});
