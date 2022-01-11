export interface ICardDrew {
	success: boolean;
	cards: [
		{
			image: string;
			value: string;
			suit: string;
			code: string;
		},
		{
			image: string;
			value: string;
			suit: string;
			code: string;
		}
	];
	deck_id: string;
	remaining: number;
}
