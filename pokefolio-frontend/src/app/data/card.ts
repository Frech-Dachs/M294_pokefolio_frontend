import { CardType } from "./card-type";

export interface Card {
  id: number;
  cardType: CardType;
  name: string;
  type: string;
  hp: number;
  rarity: string;
  setName: string;
  cardNumber: string;
  imageUrl: string;
}