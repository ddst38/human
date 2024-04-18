import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { mountComponent } from '@/tests-unit';
import Home from '../Home.vue';

let wrapper: Wrapper<Vue>;

describe('Home', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let store: Store<any>;

	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				user: {
					namespaced: true,
					state: { user: null },
					actions: {
						setUser: jest.fn(),
						clearUser: jest.fn()
					},
					getters: {
						roleBenefRead: () => true
					}
				}
			}
		});
	});

	it('renders correctly', () => {
		wrapper = mountComponent(Home, { store });
		expect(wrapper).toMatchSnapshot();
	});
});
