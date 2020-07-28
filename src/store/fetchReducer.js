import { FETCH, SHOW_GRID, SHOW_LIST } from "./types";
import { data } from "../data";

const initialData = {
  fetchedData: data,
  listSelected: true,
  pageSize: 4,
  pageSizeOptions: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
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
