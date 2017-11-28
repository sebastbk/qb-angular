export class Collection {
  id?: number;
  created_by?: string;
  created_on?: Date;
  modified_on?: Date;
  like?: boolean;
  likes?: number;
  question_count?: number;
  average_difficulty?: number;
  questions?: number[];
  title: string;
  description: string;
  tags: string[] = [];
}
