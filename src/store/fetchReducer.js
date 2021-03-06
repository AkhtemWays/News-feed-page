import {
  SHOW_GRID,
  SHOW_LIST,
  SET_PAGE,
  FETCH_POSTS,
  CANCEL_START,
} from "./types";
import PaginateAndNormalizeData from "../utils/PaginateAndNormalizeData";
import { imageUrls } from "../static/images";

const initialData = {
  fetchedData: [],
  sortedByDateFetchedData: [],
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
  isStart: true,
  images: imageUrls,
};

export default function (state = initialData, action) {
  switch (action.type) {
    case CANCEL_START:
      return {
        ...state,
        isStart: false,
      };

    case SET_PAGE:
      const curPage = action.payload;
      const dataAfterPageChanging = PaginateAndNormalizeData(
        state,
        state.pageSize,
        curPage,
        state.fetchedData,
        state.sortedByDateFetchedData
      );
      return {
        ...state,
        currentPage: dataAfterPageChanging.currentPage,
        paginatedData: dataAfterPageChanging.paginatedData,
        normalizedData: dataAfterPageChanging.normalizedData,
        availablePages: dataAfterPageChanging.availablePages,
        sortedByDatePaginatedData:
          dataAfterPageChanging.sortedByDatePaginatedData,
        sortedByDateNormalizedData:
          dataAfterPageChanging.sortedByDateNormalizedData,
        amtPages: dataAfterPageChanging.amtPages,
      };
    case FETCH_POSTS:
      const payload = action.payload;
      const cleanFetchedData = [];
      const shortness = 200;
      for (let [index, item] of payload.entries()) {
        const copy = (" " + item["Description"]).slice(1);

        const shortenedDescription = copy.slice(0, shortness);
        cleanFetchedData.push({
          title: item.Title,
          body:
            index !== 10
              ? shortenedDescription
              : cleanFetchedData[cleanFetchedData.length - 4].body,
          date: new Date(item.date),
          imgUrl: state.images[index],
        });
      }
      const cleanFetchedDataSorted = [...cleanFetchedData].sort(
        (a, b) => a.date - b.date
      );

      const initialData = PaginateAndNormalizeData(
        state,
        state.pageSize,
        state.currentPage,
        cleanFetchedData,
        cleanFetchedDataSorted
      );
      return {
        ...state,
        fetchedData: initialData.fetchedData,
        sortedByDateFetchedData: cleanFetchedDataSorted,
        paginatedData: initialData.paginatedData,
        normalizedData: initialData.normalizedData,
        amtPages: initialData.amtPages,
        availablePages: initialData.availablePages,
        sortedByDatePaginatedData: initialData.sortedByDatePaginatedData,
        sortedByDateNormalizedData: initialData.sortedByDateNormalizedData,
        pageSize: initialData.pageSize,
        currentPage: initialData.currentPage,
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
        const data = PaginateAndNormalizeData(state, pageSize, 1);
        return {
          ...state,
          pageSize: data.pageSize,
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
