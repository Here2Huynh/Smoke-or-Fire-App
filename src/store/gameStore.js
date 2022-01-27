import { writable } from 'svelte/store';

const Game = writable({
	started: false,
	currentPlayer: null,
	playersWithCard: [],
	round: 1
});

export default Game;
