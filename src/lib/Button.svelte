<script>
	export let option = 'setup';
	export let label = 'default';

	const assignOptionStyle = (option) => {
		let color;
		switch (option) {
			case 'setup':
				color = 'amber';
				break;
			case 'game':
				color = 'fuchsia';
				break;
			case 'Smoke':
				color = 'slate';
				break;
			case 'Fire':
				color = 'amber';
				break;
			case 'High':
				color = 'orange';
				break;
			case 'Low':
				color = 'cyan';
				break;
			case 'In':
				color = 'lime';
				break;
			case 'Out':
				color = 'rose';
				break;
			case '♠️':
				color = 'stone';
				break;
			case '♣️':
				color = 'stone';
				break;
			case '♥️':
				color = 'red';
				break;
			case '♦️':
				color = 'red';
				break;
		}

		return `text-white bg-${color}-500 hover:bg-${color}-400 focus:ring-4 
                focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                mr-2 mb-2`;
	};
</script>

<button on:click type="button" class={assignOptionStyle(option)}>{label}</button>
