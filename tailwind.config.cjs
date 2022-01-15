const colors = ['slate', 'amber', 'orange', 'cyan', 'lime', 'rose', 'red', 'stone', 'fuchsia'];
const safelist = colors
	.map((color) => [
		`bg-${color}-500`,
		`hover:bg-${color}-400`,
		`ring-${color}-300`,
		`dark:hover:bg-${color}-400`,
		`dark:bg-${color}-500`,
		`dark:focus:ring-${color}-600`
	])
	.reduce((acc, curr) => (acc = [...acc, ...curr]), []);

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: 'class',
	purge: {
		content: ['./src/**/*.svelte'],
		// These options are passed through directly to PurgeCSS
		options: {
			safelist
		}
	}
};
