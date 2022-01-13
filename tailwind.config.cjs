module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: 'class',
	purge: {
		content: ['./src/**/*.svelte'],
		// These options are passed through directly to PurgeCSS
		options: {
			safelist: ['bg-slate-400', 'hover:bg-slate-500', 'ring-slate-300', 'bg-amber-400']
		}
	}
};
