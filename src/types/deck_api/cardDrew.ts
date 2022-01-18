export interface ICardDrew {
	success: boolean;
	cards: ICard[];
	deck_id: string;
	remaining: number;
}

interface ICard {
	image: string;
	value: string;
	suit: string;
	code: string;
	show: boolean;
}
