import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts = [
      {
        id: 0,
        created_by: 'Keifer',
        created_on: new Date(2017, 1, 1),
        text: 'This is my first ever post!',
      },
      {
        id: 1,
        created_by: 'Keifer',
        created_on: new Date(2017, 1, 1),
        text: 'Welcome to the Quiz Bowl',
      },
    ];
    const questions = [
      { 
        id: 0,
        created_by: 'Keifer',
        created_on: new Date(2017, 1, 1),
        category: 'Pop Culture',
        difficulty: 1,
        text: 'What is a question?',
        answers: [
          {
            id: 0,
            answer: 'Yes',
            alt1: '',
            alt2: '',
            data_type: 'text'
          }
        ],
        rating: {
          average: 4,
          count: 13
        },
      },
      { 
        id: 1,
        created_by: 'Keifer',
        created_on: new Date(2017, 1, 2),
        category: 'History',
        difficulty: 1,
        text: 'What is a what?',
        answers: [
          {
            id: 1,
            answer: 'No',
            alt1: '',
            alt2: '',
            data_type: 'text'
          }
        ],
        rating: {
          average: 2,
          count: 3
        },
      },
    ];
    return {posts, questions};
  }
}