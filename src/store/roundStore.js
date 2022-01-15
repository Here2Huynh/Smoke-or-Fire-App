import { writable } from 'svelte/store';

const Rounds = writable({
	1: {
		options: ['Smoke', 'Fire'],
		punishment: {
			right: 'give',
			wrong: 'take',
			amount: 1
		}
	},
	2: {
		options: ['High', 'Low'],
		punishment: {
			right: 'give',
			wrong: 'take',
			amount: 2
		}
	},
	3: {
		options: ['In', 'Out']
	},
	4: {
		options: ['♠️', '♣️', '♥️', '♦️']
	}
});

export default Rounds;
