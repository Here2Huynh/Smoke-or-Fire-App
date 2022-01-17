import { writable } from 'svelte/store';

const CardValues = writable({
	A: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	0: 10,
	J: 11,
	Q: 12,
	K: 13,
	ACE: 1,
	JACK: 11,
	QUEEN: 12,
	KING: 13
});

export default CardValues;
