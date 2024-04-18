import Vue from 'vue';

import VueRouter, { RouterOptions } from 'vue-router';
import VueMeta from 'vue-meta';

import { i18n, loadLanguageAsync } from '@/i18n';

import { store } from '@/store';

import { scrollBehavior } from '@cnamts/vue-dot/src/helpers/scrollBehavior';
import { navigationRedirect } from './navigationRedirect';
import { routes } from './routes';

Vue.use(VueRouter);
Vue.use(VueMeta, {
	refreshOnceOnNavigation: true
});

const confRouter: RouterOptions = {
	mode: 'history', // Use the History API, and remove the hash from the URL
	routes,
	scrollBehavior
};

const router = new VueRouter(confRouter);

router.beforeEach(async(to, from, next) => {
	// Remove notification
	store.dispatch('notification/clear');

	const lang = i18n.locale;

	// Resolve translations before each navigation
	await loadLanguageAsync(lang).catch(
		() => next(false) // Cancel navigation on error
	);

	navigationRedirect(to, from, next);
});

export { router };
