<template>
	<div>
		Nom du bénéficiaire récupéré : {{ resultat }} <br>
		<VBtn
			color="accent"
			height="auto"
			min-height="30px"
			class="text-wrap mt-8"
			@click="helloThere"
		>
			Appeler l'api beneficiaire
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
	import { BeneficiaireApiFactory, Configuration } from '@cnamts/human-uc-oa17_h/src';
	import { AxiosInstance } from 'axios';
	import { PropType } from 'vue';

	const Props = Vue.extend({
		props: {
			axiosInstance: {
				type: Function as PropType<AxiosInstance>,
				required: true
			}
		}
	});

	@Component<BeneficiaireComp>({})
	export default class BeneficiaireComp extends Props {
		// on surcharge la configuration pour forcer la baseURL a celle configuree dans axiosInstance
		// si la basePath contient une uri relative comme '/sk17j/rest'
		// le fait de l'avoir a la fois dans la basePath de la configuration et
		// dans l'axiosInstance, on aboutit a un appel du type '/sk17j/rest/sk17j/rest...'
		// la base path est dupliquee dans l'url reellement utilisee
		// pour contourner cela, on force la basePath avec la valeur '.'
		private configuration = new Configuration({ basePath: '.' });
		private postsApi = BeneficiaireApiFactory(this.configuration, undefined, this.axiosInstance);
		private resultat = 'veuillez cliquer sur le bouton';
		private success = false;
		private launch = false;

		public helloThere(): void {
			// {"value":{"id":1,"matricule":"1990197000001","date-naissance":"1999-01-31","rang":1,"nom":"Martini","prenom":"Rossé"}}
			const promise = this.postsApi.read(1);
			promise.then((beneficiaire) => {
				this.resultat = beneficiaire.data.value.prenom + ' ' + beneficiaire.data.value.nom;
				this.launch = true;
				this.success = true;
			}).catch((error) => {
				this.launch = true;
				this.success = false;
				// eslint-disable-next-line no-console
				console.error(error);
			});
		}
	}

</script>
