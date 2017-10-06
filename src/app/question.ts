import { Answer } from './answer';
import { Rating } from './rating';

export class Question {
  id: number;
  created_by: string;
  created_on: Date;
  category: string;
  difficulty: number;
  text: string;
  answers: Answer[];
  rating: Rating;
}