import { VueConstructor } from 'vue';
import { registerComponents, Components } from '@cnamts/vue-dot/src/helpers/registerComponents';
import { elements } from './elements';

const components: Components[] = [
	elements
];

export function registerAllComponents(Vue: VueConstructor): void {
	components.forEach((component) => {
		registerComponents(Vue, component);
	});
}
