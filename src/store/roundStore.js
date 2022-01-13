import { writable } from 'svelte/store';

const Rounds = writable({
	1: {
		question: 'Smoke/Fire'
	},
	2: {
		question: 'High/Low'
	},
	3: {
		question: 'In/Out'
	},
	4: {
		question: 'Suit'
	}
});

export default Rounds;
