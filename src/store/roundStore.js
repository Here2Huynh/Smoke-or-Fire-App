import { writable } from 'svelte/store';

const Rounds = writable({
	1: {
		options: ['Smoke', 'Fire']
	},
	2: {
		options: ['High', 'Low']
	},
	3: {
		options: ['In', 'Out']
	},
	4: {
		options: ['♠️', '♣️', '♥️', '♦️']
	}
});

export default Rounds;
