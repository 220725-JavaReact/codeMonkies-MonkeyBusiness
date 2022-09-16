import { ICard } from './Card';

export interface ICards {
    success: boolean,
    deck_id: string,
    cards: ICard[],
    remaining: number
}