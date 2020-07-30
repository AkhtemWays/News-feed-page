import { SHOW_GRID, SHOW_LIST, SET_PAGINATION, SET_PAGE } from "./types";
import { data, sortedData } from "../data";
import PaginateAndNormalizeData from "../utils/PaginateAndNormalizeData";

const initialData = {
  fetchedData: data,
  sortedByDateFetchedData: sortedData.sort((a, b) => a.date - b.date),
  listSelected: true,
  currentPage: 1,
  paginatedData: [],
  amtPages: 16,
  normalizedData: [],
  pageAmtOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  availablePages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  pageSize: 1,
  sortOption: "default",
  sortOptions: ["default", "date"],
  sortedByDatePaginatedData: [],
  sortedByDateNormalizedData: [],
  isDefaultSort: true,
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
        availablePages: initialData.availablePages,
        sortedByDatePaginatedData: initialData.sortedByDatePaginatedData,
        sortedByDateNormalizedData: initialData.sortedByDateNormalizedData,
      };
    case SET_PAGE:
      const curPage = action.payload;
      const dataAfterPageChanging = PaginateAndNormalizeData(
        state,
        state.pageSize,
        curPage
      );
      return {
        ...state,
        currentPage: action.payload,
        paginatedData: dataAfterPageChanging.paginatedData,
        normalizedData: dataAfterPageChanging.normalizedData,
        availablePages: dataAfterPageChanging.availablePages,
        sortedByDatePaginatedData:
          dataAfterPageChanging.sortedByDatePaginatedData,
        sortedByDateNormalizedData:
          dataAfterPageChanging.sortedByDateNormalizedData,
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
          pageSize: pageSize,
          availablePages: data.availablePages,
          currentPage: 1,
          amtPages: data.amtPages,
          paginatedData: data.paginatedData,
          normalizedData: data.normalizedData,
          sortedByDateNormalizedData: data.sortedByDateNormalizedData,
          sortedByDatePaginatedData: data.sortedByDatePaginatedData,
        };
      } else if (action.meta.field === "sortOption") {
        if (action.payload === "date") {
          const data = PaginateAndNormalizeData(state);
          return {
            ...state,
            isDefaultSort: false,
            sortOption: action.payload,
          };
        } else if (action.payload === "default") {
          return {
            ...state,
            isDefaultSort: true,
            sortOption: action.payload,
          };
        }
      }
      break;

    default:
      return state;
  }
}
