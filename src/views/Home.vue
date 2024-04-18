<template>
	<PageContainer>
		<VCard class="pa-8">
			<h2 class="text-h6 font-weight-bold primary--text mb-4">
				{{ $t('views.home.title') }}
			</h2>

			<p>{{ $t('views.home.description.block1') }}</p>

			<p>{{ $t('views.home.description.block2') }}</p>

			<RouterLink
				:to=" {
					name: 'about'
				}"
				data-cy="aboutLink"
			>
				{{ $t('views.home.about.label') }}
			</RouterLink>

			<VSpacer />

			<VBtn
				color="accent"
				outlined
				height="auto"
				min-height="36px"
				class="text-wrap mt-8"
				data-cy="sendNotification"
				@click="sendNotification"
			>
				{{ $t('views.home.sendNotification') }}
			</VBtn>
			<br><br>
			<BeneficiaireComp
				:axios-instance="axiosInstance"
			/>
			<br><br>
			<UserComp
				:get-user="callUserEndpoint"
				@user-receive-value="receiveUserData"
				@user-receive-error="receiveUserError"
			/>
			<VBtn
				color="purple lighten-1"
				height="auto"
				min-height="36px"
				class="text-wrap mt-8"
				data-cy="clearUser"
				@click="clearUser"
			>
				vider le store des donnees User
			</VBtn>
			<br><br>
			Verification du role applicatif "ROLE_BENEF_READ" pour l'utilisateur courant : <br>
			<v-chip
				v-if="roleBenefRead"
				color="green"
				label
			>
				L'utilisateur courant a bien le bon role
			</v-chip>
			<v-chip
				v-if="!roleBenefRead"
				color="red"
				label
			>
				L'utilisateur courant n'a pas le bon role
			</v-chip>
		</VCard>
	</PageContainer>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import { Meta, MetaInfo } from '@/decorators';
	import { mapActions, mapState, mapGetters } from 'vuex';
	import { axios } from '@/plugins/axios';
	import { User } from '@/types/';

	@Component({
		// Vuex bindings
		methods: {
			...mapActions('notification', ['addNotification']),
			...mapActions('user', ['setUser', 'clearUser'])
		},
		computed: {
			...mapState('user', ['user']),
			...mapGetters('user', ['roleBenefRead'])
		}
	})
	export default class Home extends Vue {

		// typescript definition pour les actions
		setUser!: (user: User) => void;
		clearUser!: () => void;

		private axiosInstance = axios;

		private callUserEndpoint(): Promise<User> {
			// appel sans passer par un client open-api contrairement a l'api beneficiaire
			// la baseURL est definie dans la variable API_URL du fichier /public/js/config.js
			return this.axiosInstance.get('/user').then((response) => response.data);
		}

		/* istanbul ignore next */
		sendNotification(): void {
			this.addNotification({
				type: 'success',
				message: 'Exemple de notification'
			});
		}

		receiveUserData(user: User): void {
			this.setUser(user);
		}

		receiveUserError(): void {
			this.clearUser();
		}

		/* istanbul ignore next */
		@Meta
		metaInfo(): MetaInfo {
			return {
				title: this.$t('views.home.meta.title') as string,
				meta: [
					{
						name: 'description',
						vmid: 'description',
						content: this.$t('views.home.meta.description') as string
					}
				]
			};
		}
	}
</script>
