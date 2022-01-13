import { writable } from 'svelte/store';

const Rounds = writable({
	1: {
		question: 'Smoke or Fire?'
	}
});

export default Rounds;
