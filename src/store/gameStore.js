import { writable } from 'svelte/store';

const Game = writable({
	started: false,
	players: []
});

export default Game;
