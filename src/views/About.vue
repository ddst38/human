<template>
	<PageContainer>
		<VCard class="pa-8">
			<VBtn
				:to="{
					name: 'home'
				}"
				color="accent"
				class="mb-8"
				outlined
				exact
				data-cy="backBtn"
			>
				<VIcon class="mr-2">
					{{ backArrowIcon }}
				</VIcon>

				{{ $t('views.about.backBtn.label') }}
			</VBtn>

			<h2 class="text-h6 font-weight-bold primary--text">
				{{ $t('views.about.title') }}
			</h2>

			<LinksList
				v-for="(data, index) in links"
				:key="index"
				:title="data.title"
				:links="data.links"
				class="mt-4"
				data-cy="links"
			/>
		</VCard>
	</PageContainer>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';

	import { Meta, MetaInfo } from '@/decorators';

	import { LinkItem } from '@/types';

	import { mdiArrowLeft } from '@mdi/js';

	@Component({
		components: {
			LinksList: () => import(
				/* webpackChunkName: "links-list" */
				'@/components/LinksList'
			)
		}
	})
	export default class About extends Vue {
		backArrowIcon = mdiArrowLeft;

		get links(): LinkItem[] {
			return this.$t('views.about.links') as unknown as LinkItem[];
		}

		/* istanbul ignore next */
		@Meta
		metaInfo(): MetaInfo {
			return {
				title: this.$t('views.about.meta.title') as string,
				meta: [
					{
						name: 'description',
						vmid: 'description',
						content: this.$t('views.about.meta.description') as string
					}
				]
			};
		}
	}
</script>
