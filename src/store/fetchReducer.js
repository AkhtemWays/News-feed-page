import { SHOW_GRID, SHOW_LIST, SET_PAGINATION } from "./types";
import { data } from "../data";
import PaginateAndNormalizeData from "../utils/PaginateAndNormalizeData";

const initialData = {
  fetchedData: data,
  listSelected: true,
  currentPage: 1,
  paginatedData: [],
  amtPages: 3,
  normalizedData: [],
  pageAmtOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
};

export default function (state = initialData, action) {
  switch (action.type) {
    case "@@INIT":
      const initialData = PaginateAndNormalizeData(state, state.currentPage);
      return {
        ...state,
        amtPages: initialData.amtPages,
        paginatedData: initialData.paginatedData,
        normalizedData: initialData.normalizedData,
      };

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
    case "@@redux-form/CHANGE":
      if (action.meta.field === "pageSize") {
        const pageSize = action.payload;
        const data = PaginateAndNormalizeData(state, pageSize);

        return {
          ...state,
          paginatedData: data.paginatedData,
          amtPages: data.amtPages,
          normalizedData: data.normalizedData,
        };
      }

    default:
      return state;
  }
}
