export class Question {
  id: number;
  created_by: string;
  created_on: Date;
  modified_on: Date;
  difficulty: number;
  text: string;
  answer: string;
  alternate_answer: string;
  answer_type: string;
  tags: string[];
}