import { CardType } from "./card-type";

export class Card {
  public id!: number;
  public cardType: CardType = CardType.POKEMON;
  public name = '';
  public type = '';
  public hp = 0;
  public rarity = '';
  public setName = '';
  public cardNumber = '';
  public imageUrl = '';
}