import { writable } from 'svelte/store';

let players = [];
for (let i = 0; i < 3; i++) {
	players.push({
		name: `player${i + 1}`,
		cards: [],
		idx: i,
		cardsFlipped: null
	});
}

const Players = writable(players);

export default Players;
