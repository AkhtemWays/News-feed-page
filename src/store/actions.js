import { FETCH, SHOW_GRID, SHOW_LIST, SET_PAGINATION } from "./types";

export function fetch() {
  return {
    type: FETCH,
  };
}

export function showGrid() {
  return {
    type: SHOW_GRID,
  };
}
export function showList() {
  return {
    type: SHOW_LIST,
  };
}

export function setPagination(values) {
  console.log(values);
  return {
    type: SET_PAGINATION,
    payload: values,
  };
}
