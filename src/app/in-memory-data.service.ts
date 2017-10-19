import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const posts = [
      {
        id: 4,
        created_by: 'Keifer',
        created_on: new Date(2017, 9, 13),
        modified_on: new Date(2017, 9, 13),
        title: 'New Layout!',
        text: 'placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor',
      },
      {
        id: 3,
        created_by: 'Keifer',
        created_on: new Date(2017, 9, 11),
        modified_on: new Date(2017, 9, 11),
        title: 'News?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        id: 2,
        created_by: 'Keifer',
        created_on: new Date(2017, 9, 9),
        modified_on: new Date(2017, 9, 9),
        title: 'Future Updates - Please Look Forward',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate dignissim suspendisse in est ante. Massa massa ultricies mi quis hendrerit dolor magna. Rhoncus est pellentesque elit ullamcorper.',
      },
      {
        id: 1,
        created_by: 'Keifer',
        created_on: new Date(2017, 9, 8),
        modified_on: new Date(2017, 9, 8),
        title: 'Getting Started',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo odio aenean sed adipiscing. Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Ridiculus mus mauris vitae ultricies.',
      },
      {
        id: 0,
        created_by: 'Keifer',
        created_on: new Date(2017, 9, 8),
        modified_on: new Date(2017, 9, 8),
        title: 'First Post!',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Nibh praesent tristique magna sit amet purus gravida quis.',
      },
    ];
    const questions = [
      { 
        id: 0,
        created_by: 'John',
        created_on: new Date(2017, 9, 19),
        modified_on: new Date(2017, 9, 19),
        difficulty: 1,
        text: 'Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque?',
        answer: 'sagittis',
        alternate_answer: '',
        answer_type: 'str',
        tags: ['maecenas', 'pharetra']
      },
      { 
        id: 1,
        created_by: 'Anne',
        created_on: new Date(2017, 9, 18),
        modified_on: new Date(2017, 9, 18),
        difficulty: 1,
        text: 'Faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod?',
        answer: 'volutpat',
        alternate_answer: '',
        answer_type: 'str',
        tags: ['vel', 'pharetra', 'vel']
      },
      { 
        id: 2,
        created_by: 'Tom',
        created_on: new Date(2017, 9, 17),
        modified_on: new Date(2017, 9, 17),
        difficulty: 1,
        text: 'Mauris pellentesque pulvinar pellentesque habitant morbi tristique?',
        answer: 'nisl',
        alternate_answer: '',
        answer_type: 'str',
        tags: ['vel']
      },
      { 
        id: 3,
        created_by: 'Todd',
        created_on: new Date(2017, 9, 9),
        modified_on: new Date(2017, 9, 9),
        difficulty: 3,
        text: 'Donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque?',
        answer: 'in',
        alternate_answer: '',
        answer_type: 'str',
        tags: ['eu', 'sem', 'integer', 'vitae', 'justo']
      },
      { 
        id: 4,
        created_by: 'QuizMaster',
        created_on: new Date(2017, 9, 11),
        modified_on: new Date(2017, 9, 11),
        difficulty: 5,
        text: 'placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tin?',
        answer: 'dolor magna',
        alternate_answer: '',
        answer_type: 'str',
        tags: ['dui', 'sapien', 'eget', 'mi', 'proin', 'sed', 'libero', 'enim', 'sed', 'faucibus', 'turpis', 'in', 'eu', 'mi', 'bibendum', 'neque', 'egestas', 'congue', 'quisque', 'egestas', 'diam', 'in', 'arcu', 'cursus', 'euismod']
      },
      { 
        id: 5,
        created_by: 'QuizMaster',
        created_on: new Date(2017, 9, 11),
        modified_on: new Date(2017, 9, 11),
        difficulty: 3,
        text: 'Iaculis nunc sed augue lacus?',
        answer: 'tempor',
        alternate_answer: '',
        answer_type: 'str',
        tags: ['aenean', 'pharetra', 'magna', 'ac', 'placerat', 'vestibulum', 'lectus']
      },
    ];
    const sets = [
      {
        id: 0,
        created_by: 'QuizMaster',
        created_on: new Date(2017, 1, 1),
        modified_on: new Date(2017, 1, 1),
        title: 'bibendum at varius vel pharetra',
        count: 9,
        tags: ['nec', 'feugiat', 'in']
      },
      {
        id: 1,
        created_by: 'Bane',
        created_on: new Date(2017, 1, 2),
        modified_on: new Date(2017, 1, 2),
        title: 'at imperdiet dui accumsan sit',
        count: 5,
        tags: ['augue']
      },
      {
        id: 2,
        created_by: 'Jack',
        created_on: new Date(2017, 9, 1),
        modified_on: new Date(2017, 9, 1),
        title: 'luctus accumsan tortor posuere ac ut',
        count: 36,
        tags: ['bibendum', 'at', 'varius', 'vel', 'pharetra']
      },
      {
        id: 3,
        created_by: 'BatMan',
        created_on: new Date(2017, 9, 3),
        modified_on: new Date(2017, 9, 3),
        title: 'volutpat blandit aliquam',
        count: 1,
        tags: ['in', 'nisl', 'nisi', 'scelerisque', 'eu']
      },
      {
        id: 4,
        created_by: 'Bane',
        created_on: new Date(2017, 9, 4),
        modified_on: new Date(2017, 9, 4),
        title: 'ultricies lacus sed',
        count: 14,
        tags: ['amet', 'dictum']
      },
      {
        id: 5,
        created_by: 'QuizMaster',
        created_on: new Date(2017, 9, 4),
        modified_on: new Date(2017, 9, 4),
        title: 'viverra nam libero justo laoreet sit amet',
        count: 16,
        tags: ['et', 'tortor', 'at', 'risus']
      },
      {
        id: 6,
        created_by: 'QuizMaster',
        created_on: new Date(2017, 9, 6),
        modified_on: new Date(2017, 9, 6),
        title: 'viverra vitae',
        count: 95,
        tags: ['ut', 'tellus', 'elementum']
      },
      {
        id: 7,
        created_by: 'Balloon',
        created_on: new Date(2017, 9, 8),
        modified_on: new Date(2017, 9, 8),
        title: 'aliquet eget sit amet tellus cras',
        count: 99,
        tags: ['integer']
      },
      {
        id: 8,
        created_by: 'Bannana',
        created_on: new Date(2017, 9, 8),
        modified_on: new Date(2017, 9, 8),
        title: 'pharetra',
        count: 500,
        tags: ['in']
      },
      {
        id: 9,
        created_by: 'Coke',
        created_on: new Date(2017, 9, 9),
        modified_on: new Date(2017, 9, 9),
        title: 'est ante in nibh',
        count: 62,
        tags: ['vitae', 'suscipit']
      },
    ]
    return {posts, questions, sets};
  }
}