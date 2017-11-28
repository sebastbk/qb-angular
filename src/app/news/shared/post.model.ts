export class Post {
  id?: number;
  created_by?: string;
  created_on?: Date;
  modified_on?: Date;
  title: string;
  lead: string;
  body: string;
  image?: string;
}
