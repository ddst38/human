import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { v4 as UUIDGenerator } from 'uuid';
import common from '@/translations/fr/common';
import { store } from '@/store';

const code_401 = 401;
const code_500 = 500;

/** The axios instance */
const instance = axios.create({
	withCredentials: false,
	// la baseURL est definie dans la variable API_URL du fichier /public/js/config.js
	baseURL: window.API_URL,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});

/** Default error message */
const DEFAULT_ERROR_MESSAGE = common.defaultErrorMessage;

const onRequestFulfilled = async(config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
	const idCorrelation = UUIDGenerator();
	if (config && config.headers) {
		config.headers['X-Correlation-ID'] = idCorrelation;
		config.headers['X-App-Name'] = process.env.VUE_APP_CODE_MODULE || '';
		config.headers['X-App-Version'] = process.env.VUE_APP_VERSION || '';
		// /!\ Header pour indiquer que la provenance de la requête n'est pas liée à l'affichage de
		// la page web dans le navigateur mais à un appel de type service / rest
		// ce header permet cote apache de ne pas renvoyer de 401 sur ce type d'appel
		config.headers['X-Request-Engine'] = 'Axios';
	}

	return config;
};

// Response interceptor to handle errors globally
const onAxiosResponseError = (error: AxiosError): Promise<unknown> => {
	let errorMessage: string | undefined = undefined;

	if (error.response?.status === code_401) {
		store.dispatch('notification/add', {
			type: 'error',
			message: 'Déconnexion suite à l\'expiration de la session ou à l\'absence de droits'
		});
	} else if (!error.response || error.response.status >= code_500) {
		// If we don't have an error or we have a 500 HTTP Code
		// Use the default message
		errorMessage = DEFAULT_ERROR_MESSAGE;
	} else {
		// Else, use message from server or fallback to default one
		errorMessage = error.response.data.message || DEFAULT_ERROR_MESSAGE;
	}

	if (errorMessage) {
		// Send notification error
		store.dispatch('notification/add', {
			type: 'error',
			message: errorMessage
		});
	}

	return Promise.reject(error);
};

// Response interceptor to handle errors globally
instance.interceptors.response.use(undefined, onAxiosResponseError);

// Request interceptor to add useful headers
instance.interceptors.request.use(onRequestFulfilled);

export { instance as axios, AxiosResponse, onAxiosResponseError };
