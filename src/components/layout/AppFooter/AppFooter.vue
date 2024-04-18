<template>
	<FooterBar
		:version="version"
		hide-cookies-link
		hide-sitemap-link
		hide-a11y-link
		hide-cgu-link
		hide-legal-notice-link
	/>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';

	@Component
	export default class AppFooter extends Vue {
		version = process.env.VUE_APP_VERSION;
	}
</script>
