import {List, Map} from 'immutable';

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

export default Map({
  query: '',
  notes: List.of(
            Map({
              title: 'react',
              text: 'Stuff about React.',
              timestamp: Map({
                created: 'EEST 1970-10-12 11:33',
                modified: 'EEST 1980-10-12 12:33'
              })
            }),
            Map({
              title: 'redux',
              text: 'Stuff about Redux.',
              timestamp: Map({
                created: 'EEST 1970-10-12 11:34',
                modified: 'EEST 1980-10-12 12:32'
              })
            }),
            Map({
              title: 'immutable',
              text: 'Stuff about Immutable.',
              timestamp: Map({
                created: 'EEST 1970-10-12 11:35',
                modified: 'EEST 1980-10-12 12:31'
              })
            })
          ),
  selected: null,
  orderBy: 'modified ascending'
});
