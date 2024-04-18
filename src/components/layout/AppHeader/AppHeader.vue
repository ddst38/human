<template>
	<HeaderBar
		:service-title="$t('components.layout.appHeader.title')"
		:navigation-items="navigationItems"
	>
		<UserMenuBtn
			v-if="!$maintenanceEnabled"
			:full-name="$t('components.layout.appHeader.user')"
			:additional-information="$t('components.layout.appHeader.role')"
		>
			<VListItem
				v-for="(item, index) in navigationItems"
				:key="index"
				:disabled="item.disabled"
				:to="item.to ? item.to : null"
				exact
			>
				<VListItemTitle>{{ item.label }}</VListItemTitle>
			</VListItem>
		</UserMenuBtn>
	</HeaderBar>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';

	import { NavigationItem } from '@cnamts/vue-dot/src/patterns/HeaderBar/types';

	@Component
	export default class AppHeader extends Vue {
		get navigationItems(): NavigationItem[] | null {
			if (this.$maintenanceEnabled) {
				return null;
			}

			return this.$t('components.layout.appHeader.navigationItems') as unknown as NavigationItem[];
		}
	}
</script>
