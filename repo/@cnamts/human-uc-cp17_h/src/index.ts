import { VueConstructor } from 'vue';
import { registerAllComponents } from './registerAllComponents';
import { InstallPlugin } from '../types';

const installPlugin: InstallPlugin = {
	install(Vue: VueConstructor) {
		registerAllComponents(Vue);
	}
};

// Ignore the next block in unit test
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(installPlugin);
}

export default installPlugin;
