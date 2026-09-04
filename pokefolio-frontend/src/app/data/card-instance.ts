import { Card } from './card';

export interface CardInstance {
  id: number;
  card: Card;
  condition?: string;
  quantity: number;
}
