import { InMemoryDbService } from 'angular-in-memory-web-api';

import { questions }   from './questions';
import { collections } from './collections';
import { tags }        from './tags';
import { posts }       from './posts';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {questions, collections, tags, posts};
  }
}