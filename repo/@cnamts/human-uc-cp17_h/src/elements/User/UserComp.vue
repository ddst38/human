<template>
	<div>
		Utilisateur courant : {{ resultat }} <br>
		<VBtn
			color="accent"
			height="auto"
			min-height="30px"
			class="text-wrap mt-8"
			@click="helloThere"
		>
			Appeler l'api user
		</VBtn>
		<br>
		<br>
		<v-chip
			v-if="success && launch"
			color="green"
			label
		>
			TEST EFFECTUE AVEC SUCCES
		</v-chip>
		<v-chip
			v-if="!success && launch"
			color="red"
			label
		>
			TEST EN ERREUR
		</v-chip>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import { PropType } from 'vue';
	import { User } from '@/types/';

	const Props = Vue.extend({
		props: {
			getUser: {
				type: Function as PropType<() => Promise<User>>,
				required: true
			}
		}
	});

	@Component<UserComp>({})
	export default class UserComp extends Props {
		private resultat = 'veuillez cliquer sur le bouton';
		private success = false;
		private launch = false;

		public helloThere(): void {
			// {"value":{"id":1,"matricule":"1990197000001","date-naissance":"1999-01-31","rang":1,"nom":"Martini","prenom":"Rossé"}}
			const promise = this.getUser();
			promise.then((user) => {
				// this.resultat = user.data
				// eslint-disable-next-line no-console
				console.log(JSON.stringify(user));
				this.$emit('user-receive-value', user);

				this.launch = true;
				this.success = true;
			}).catch((error) => {
				this.launch = true;
				this.success = false;
				this.$emit('user-receive-error', error);

				// eslint-disable-next-line no-console
				console.error(error);
			});
		}
	}

</script>
