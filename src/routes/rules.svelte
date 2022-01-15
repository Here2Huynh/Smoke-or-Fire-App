<div
	class="flex justify-center text-gray-900 dark:text-white 
	overflow-y-auto rules-height"
>
	<div class="flex flex-col m-6">
		<div class="inline-flex mb-4">
			<!-- svelte-ignore invalid-html-attribute -->
			<svg
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 
					11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 
					8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 
					0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 
					12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
				/></svg
			>
			<p class="ml-2 mt-1">3-10 players</p>
		</div>
		<p class="text-left font-bold">Rounds 1-4</p>
		<ul class="list-inside list-none whitespace-normal">
			<li class="p-2">
				1. Each player chooses a card color, smoke (black) or fire (red). A correct guess earns 1 to
				give away, and an incorrect guess earns you 1.
			</li>
			<li class="p-2">
				2. Each player guesses their next card will be either higher than or lower than as their
				first card. If it is the same value, then it counts lower. Correct guess earns 2 to give or
				2 to take.
			</li>
			<li class="p-2">
				3. Each player guesses their next card will be either outside of their current cards,
				between their current cards, or exactly either one (post). Correct guess earns 3 to give,
				incorrect 3 to take.
			</li>
			<li class="p-2">
				4. Each player guesses the suit of their last card. A correct guess earns 4 to give,
				incorrect 4 to take.
			</li>
			<li class="list-none italic indent-8 p-2">
				*** The context of earn and give X is a form punishment i.e. drinks, pushups, candy etc.
			</li>
		</ul>

		<div
			class="animate-bounce bg-white dark:bg-gray-800 ml-auto mr-auto mt-2 p-2 w-10 h-10 ring-1 
			ring-gray-900/5 dark:ring-gray-200/20 shadow-lg rounded-full 
			flex items-center justify-center"
		>
			<svg
				class="w-4 h-4 text-amber-400"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
			</svg>
		</div>

		<p class="text-left font-bold">Rounds 5-12</p>
		<p class="indent-4">
			There will be 2 columns of 4 cards each. Right side is giving column. Left side is taking
			column. Going down the right column first, if the number matches a card in a player's hand
			(cards acquired from above rounds), ...
		</p>
		<ul class="list-inside list-none whitespace-normal">
			<li class="p-2">
				5. ... they give 1 (right column) and flip the card in their hand face down.
			</li>
			<li class="p-2">
				6. ... they give 2 (right column) and flip the card in their hand face down.
			</li>
			<li class="p-2">
				7. ... they give 3 (right column) and flip the card in their hand face down.
			</li>
			<li class="p-2">
				8. ... they give 4 (right column) and flip the card in their hand face down.
			</li>
			<li class="p-2">
				9. ... they take 1 (left column) and flip the card in their hand face down.
			</li>
			<li class="p-2">
				10. ... they take 2 (left column) and flip the card in their hand face down.
			</li>
			<li class="p-2">
				11. ... they take 3 (left column) and flip the card in their hand face down.
			</li>
			<li class="p-2">
				12. ... they take 4 (left column) and flip the card in their hand face down.
			</li>
		</ul>

		<div
			class="animate-bounce bg-white dark:bg-gray-800 ml-auto mr-auto mt-2 p-2 w-10 h-10 ring-1 
		ring-gray-900/5 dark:ring-gray-200/20 shadow-lg rounded-full 
		flex items-center justify-center"
		>
			<svg
				class="w-4 h-4 text-amber-400"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
			</svg>
		</div>

		<p class="text-left font-bold">Pyramid Round</p>
		<p class="indent-4">Player with the most amount of face up cards will enter pyramid round.</p>
		<p class="indent-4">
			Presented is a pyramid of face down cards. Player will start anywhere at the bottom by
			flipping the card up and proceed to the next level of pyramid by chosing the card(s) that is
			touching the card they have chosen from the previous below level. If player reveals a face
			card (Ace is a face card), player has to reset everything and start back at the bottom. This
			will repeat until the cards in the deck runs out.
		</p>
	</div>
</div>

<style>
	.rules-height {
		height: 600px;
	}
</style>
