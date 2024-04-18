import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import { mountComponent } from '@/tests-unit';
import UserComp from '@/elements/User/UserComp.vue';

let wrapper: Wrapper<Vue>;

describe('App', () => {
	it('UserComp renders correctly', () => {
		wrapper = mountComponent(UserComp, {
			propsData: {
				getUser: () => null
			}
		});
		expect(wrapper.text()).toContain('Utilisateur courant : veuillez cliquer sur le bouton');
	});
});
