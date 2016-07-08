import {List, Map} from 'immutable';

export default {
  notes: [
    {
      id: 'a1',
      title: 'react',
      text: 'Stuff about React.',
      timestamp: {
        created: 'EEST 1970-10-12 11:33',
        modified: 'EEST 1980-10-12 12:33'
      }
    },
    {
      id: '2e',
      title: 'redux',
      text: 'Stuff about Redux.',
      timestamp: {
        created: 'EEST 1970-10-12 11:34',
        modified: 'EEST 1980-10-12 12:32'
      }
    },
    {
      id: '3r',
      title: 'immutable',
      text: 'Stuff about Immutable.',
      timestamp: {
        created: 'EEST 1970-10-12 11:35',
        modified: 'EEST 1980-10-12 12:31'
      }
    }
  ],
  editing: undefined
};

// export default Map({
//   notes: List.of(
//             Map({
//               id: 'a1', title: 'react', text: 'Stuff about React.',
//               timestamp: Map({
//                 created: 'EEST 1970-10-12 11:33',
//                 modified: 'EEST 1980-10-12 12:33'
//               })
//             }),
//             Map({
//               id: '2e', title: 'redux', text: 'Stuff about Redux.',
//               timestamp: Map({
//                 created: 'EEST 1970-10-12 11:34',
//                 modified: 'EEST 1980-10-12 12:32'
//               })
//             }),
//             Map({
//               id: '3r', title: 'immutable', text: 'Stuff about Immutable.',
//               timestamp: Map({
//                 created: 'EEST 1970-10-12 11:35',
//                 modified: 'EEST 1980-10-12 12:31'
//               })
//             })
//           ),
//   editing: undefined
// });
