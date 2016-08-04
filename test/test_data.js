import { List, Map } from 'immutable';

// export default {
//   query: '',
//   notes: [
//     {
//       title: 'react',
//       text: 'Stuff about React.',
//       timestamp: {
//         created: 'EEST 1970-10-12 11:33',
//         modified: 'EEST 1980-10-12 12:33'
//       }
//     },
//     {
//       title: 'redux',
//       text: 'Stuff about Redux.',
//       timestamp: {
//         created: 'EEST 1970-10-12 11:34',
//         modified: 'EEST 1980-10-12 12:32'
//       }
//     },
//     {
//       title: 'immutable',
//       text: 'Stuff about Immutable.',
//       timestamp: {
//         created: 'EEST 1970-10-12 11:35',
//         modified: 'EEST 1980-10-12 12:31'
//       }
//     }
//   ],
//   selected: undefined,
// };

export default new Map({
  query: '',
  notes: List.of(
            new Map({
              title: 'react',
              text: 'Stuff about React.',
              timestamp: new Map({
                created: '1970-10-12T11:33:00.000Z',
                modified: '1980-10-12T12:33:00.000Z',
              }),
            }),
            new Map({
              title: 'redux',
              text: 'Stuff about Redux.',
              timestamp: new Map({
                created: '1970-10-12T11:34:00.000Z',
                modified: '1980-10-12T12:32:00.000Z',
              }),
            }),
            new Map({
              title: 'immutable',
              text: 'Stuff about Immutable.',
              timestamp: new Map({
                created: '1970-10-12T11:35:00.000Z',
                modified: '1980-10-12T12:31:00.000Z',
              }),
            })
          ),
  selected: null,
  orderBy: 'title ascending',
});
