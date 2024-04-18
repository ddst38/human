import { PluginFunction } from 'vue';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface InstallationAutoDesComposantsOptions {}

export interface InstallPlugin {
	install: PluginFunction<InstallationAutoDesComposantsOptions>;
}

declare const InstallationAutoDesComposants: InstallPlugin;
export default InstallationAutoDesComposants;
