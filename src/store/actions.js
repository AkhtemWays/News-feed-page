import {
  SHOW_GRID,
  SHOW_LIST,
  SET_PAGE,
  FETCH_POSTS,
  CANCEL_START,
} from "./types";

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

export function fetchPosts() {
  return async (dispatch) => {
    const response = await fetch(
      "https://dev-kvant-14856-ng.ecosystem-kvant.com/api/H:1D6419D74772A07/P:WORK/B:1D56942E082C9E7/C:1D56DF2707EFEF7/I:PACK?format=json"
    );
    const json = await response.json();
    const dataLocated = json["$PACK"];
    const data = dataLocated[0]["$OBJECT"];

    dispatch({ type: FETCH_POSTS, payload: data });
  };
}

export function cancelStart() {
  return {
    type: CANCEL_START,
  };
}
