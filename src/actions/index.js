const EDIT_QUERY='EDIT_QUERY';

export function editQuery(newQuery) {
  return {
    type: EDIT_QUERY,
    newQuery
  }
}
