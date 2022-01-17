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
		options: ['In', 'Out'],
		punishment: {
			right: 'give',
			wrong: 'take',
			amount: 3
		}
	},
	4: {
		options: ['♠️', '♣️', '♥️', '♦️'],
		punishment: {
			right: 'give',
			wrong: 'take',
			amount: 4
		}
	}
});

export default Rounds;
