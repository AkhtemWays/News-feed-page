import { SHOW_GRID, SHOW_LIST, SET_PAGE } from "./types";

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

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: page,
  };
}
