import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts = [
      {
        id: 4,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 13),
        title: 'New Layout!',
        text: 'placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor',
      },
      {
        id: 3,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 11),
        title: 'News?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 2,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 10),
        title: 'Future Updates - Please Look Forward',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante. Massa massa ultricies mi quis hendrerit dolor magna. Rhoncus est pellentesque elit ullamcorper.',
      },
      {
        id: 1,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 8),
        title: 'Getting Started',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo odio aenean sed adipiscing. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Ridiculus mus mauris vitae ultricies.',
      },
      {
        id: 0,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 8),
        title: 'First Post!',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Nibh praesent tristique magna sit amet purus gravida quis.',
      },
    ];
    const questions = [
      { 
        id: 0,
        created_by: 'Keifer',
        created_on: new Date(2017, 1, 1),
        category: 'Pop Culture',
        difficulty: 1,
        text: 'Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque?',
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
        text: 'Faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod?',
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
      { 
        id: 2,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 10),
        category: 'Sports',
        difficulty: 1,
        text: 'Faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod?',
        answers: [
          {
            id: 1,
            answer: 'Hockey',
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
      { 
        id: 3,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 10),
        category: 'Science',
        difficulty: 3,
        text: 'Donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque?',
        answers: [
          {
            id: 1,
            answer: 'Hockey',
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
      { 
        id: 4,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 11),
        category: 'Politics',
        difficulty: 3,
        text: 'Iaculis nunc sed augue lacus?',
        answers: [
          {
            id: 1,
            answer: 'Parlament',
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
    const sets = [
      {
        id: 0,
        created_by: 'Keifer',
        created_on: new Date(2017, 1, 1),
        title: 'bibendum at varius vel pharetra',
        count: 10,
      },
      {
        id: 1,
        created_by: 'Keifer',
        created_on: new Date(2017, 1, 2),
        title: 'at imperdiet dui accumsan sit',
        count: 5,
      },
      {
        id: 2,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 1),
        title: 'luctus accumsan tortor posuere ac ut',
        count: 36,
      },
      {
        id: 3,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 3),
        title: 'volutpat blandit aliquam',
        count: 15,
      },
      {
        id: 4,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 4),
        title: 'ultricies lacus sed',
        count: 14,
      },
      {
        id: 5,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 4),
        title: 'viverra nam libero justo laoreet sit amet',
        count: 16,
      },
      {
        id: 6,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 6),
        title: 'viverra vitae',
        count: 105,
      },
      {
        id: 7,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 8),
        title: 'aliquet eget sit amet tellus cras',
        count: 99,
      },
      {
        id: 8,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 8),
        title: 'pharetra',
        count: 500,
      },
      {
        id: 9,
        created_by: 'Keifer',
        created_on: new Date(2017, 10, 10),
        title: 'est ante in nibh',
        count: 62,
      },
    ]
    return {posts, questions, sets};
  }
}