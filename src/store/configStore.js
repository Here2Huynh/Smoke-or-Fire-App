import { writable } from 'svelte/store';

const ConfigStore = writable({
	darkMode: true,
	funMode: true
});

export default ConfigStore;
