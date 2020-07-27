import { FETCH, SHOW_GRID, SHOW_LIST } from "./types";

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
