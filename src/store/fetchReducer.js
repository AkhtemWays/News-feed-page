import { SHOW_GRID, SHOW_LIST, SET_PAGINATION } from "./types";
import { data } from "../data";

const initialData = {
  fetchedData: data,
  listSelected: true,
  currentPage: 1,
  paginatedData: [],
  amtPages: 3,
  normalizedData: [],
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
    case SET_PAGINATION:
      const pageSize = action.payload; // pageSize from form reducer
      const indexOfLastItem = state.currentPage * pageSize; // settings for pagination
      const indexOfFirstItem = indexOfLastItem - pageSize;
      const fullAmtPages = Math.floor(state.fetchedData.length / pageSize);
      const amtPages =
        state.fetchedData.length % pageSize === 0
          ? fullAmtPages
          : fullAmtPages + 1;

      // data normalization for pagination
      let splitter = 0; // needs for splitting specially for grid structure
      let toInsert = []; // needs to insert by batch
      let normData = []; // this one is final update by not modifying reducer
      const fullBatches = Math.floor(state.paginatedData.length / 3);
      const totalItemsOfFullBatches = fullBatches * 3; // calculate full rows/batches for grid structure
      const remainder = state.paginatedData.length % 3; // this is for the last row
      for (let i = 0; i < totalItemsOfFullBatches; i++) {
        toInsert.push(state.paginatedData[i]);
        splitter++;
        if (splitter === 3) {
          // if splitter = 3 then it's enough for GridStructure one batch
          splitter = 0;
          normData.push(toInsert);
          toInsert = [];
        }
      }
      // this is for the last batch
      toInsert = [];
      for (let i = 0; i < remainder; i++) {
        toInsert.push(state.paginatedData[totalItemsOfFullBatches + i]);
      }
      normData.push(toInsert);
      // update everything calculated so far
      return {
        ...state,
        paginatedData: state.fetchedData[indexOfLastItem]
          ? state.fetchedData.slice(indexOfFirstItem, indexOfLastItem)
          : state.fetchedData.slice(indexOfFirstItem, state.fetchedData.length),
        amtPages: amtPages,
        normalizedData: normData,
      };

    default:
      return state;
  }
}
