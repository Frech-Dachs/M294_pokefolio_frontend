import { Card } from './card';

export class CardInstance {
  public id!: number;
  public card: Card = new Card();
  public condition?: string;
  public quantity = 1;
}
