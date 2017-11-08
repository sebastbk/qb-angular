export class Collection {
  id?: number;
  created_by?: string;
  created_on?: Date;
  modified_on?: Date;
  title: string = '';
  tags: string[] = [];
}