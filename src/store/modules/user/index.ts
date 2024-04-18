import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';

import { RootState } from '../../types';
import { UserState, User } from './types';

export const state: UserState = {
	user: null
};

export const actions: ActionTree<UserState, RootState> = {
	setUser({ commit }, user: User) {
		commit('SETUSER', user);
	},
	clearUser({ commit }) {
		commit('CLEARUSER');
	}
};

export const mutations: MutationTree<UserState> = {
	SETUSER(state, user: User) {
		state.user = user;
	},
	CLEARUSER(state) {
		state.user = null;
	}
};

export const getters: GetterTree<UserState, RootState> = {
	roleBenefRead(state) {
		if (Array.isArray(state?.user?.value?.authorities)) {
			if (state?.user?.value?.authorities?.find( obj => obj?.authority === 'ROLE_BENEF_READ' )) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
};

export const user: Module<UserState, RootState> = {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
};
