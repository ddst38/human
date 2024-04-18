import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import { mountComponent } from '@/tests-unit';
import BeneficiaireComp from '@/elements/Beneficiaire/BeneficiaireComp.vue';
import { Configuration } from '@cnamts/human-uc-oa17_h/src';
import axios from 'axios';

let wrapper: Wrapper<Vue>;

describe('App', () => {
	it('BeneficiaireComp renders correctly', () => {
		const configuration = new Configuration({ basePath: '' });
		const axiosInstance = axios.create({});

		wrapper = mountComponent(BeneficiaireComp, {
			propsData: {
				configuration: configuration,
				axiosInstance: axiosInstance
			}
		});
		expect(wrapper.text()).toContain('Nom du bénéficiaire récupéré : veuillez cliquer sur le bouton');
	});
});
