import { VueConstructor } from 'vue';
import BeneficiaireComp from './elements/Beneficiaire/BeneficiaireComp.vue';
import UserComp from './elements/User/UserComp.vue';

export default {
	install(Vue: VueConstructor): void {
		Vue.component('BeneficiaireComp', BeneficiaireComp);
		Vue.component('UserComp', UserComp);
	}
};
