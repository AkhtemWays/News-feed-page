import { FETCH, SHOW_GRID, SHOW_LIST } from "./types";
import { data } from "../data";

const initialData = {
  fetchedData: data,
  listSelected: true,
};

export default function (state = initialData, action) {
  switch (action.type) {
    case SHOW_GRID:
      return {
        ...state,
        listSelected: false,
      };
    case SHOW_LIST:
      return {
        ...state,
        listSelected: true,
      };

    default:
      return state;
  }
}
