import { writable } from 'svelte/store';

const CardValues = writable({
	A: 1,
	J: 11,
	Q: 12,
	K: 13,
	ACE: 1,
	JACK: 11,
	QUEEN: 12,
	KING: 13
});

export default CardValues;
