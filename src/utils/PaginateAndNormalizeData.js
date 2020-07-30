export default (state, pageSize, curPage) => {
  const currentPage = curPage ? curPage : state.currentPage;
  const indexOfLastItem = currentPage * pageSize; // settings for pagination
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const fullAmtPages = Math.floor(state.fetchedData.length / pageSize);
  const amtPages =
    state.fetchedData.length % pageSize === 0 ? fullAmtPages : fullAmtPages + 1;
  const availablePages = [];
  for (let i = 1; i <= amtPages; i++) {
    availablePages.push(i);
  }
  const sortedByDatePaginatedData = state.sortedByDateFetchedData[
    indexOfLastItem
  ]
    ? state.sortedByDateFetchedData.slice(indexOfFirstItem, indexOfLastItem)
    : state.sortedByDateFetchedData.slice(
        indexOfFirstItem,
        state.sortedByDateFetchedData.length
      );
  const paginatedData = state.fetchedData[indexOfLastItem]
    ? state.fetchedData.slice(indexOfFirstItem, indexOfLastItem)
    : state.fetchedData.slice(indexOfFirstItem, state.fetchedData.length);
  // data normalization for pagination
  let splitter = 0; // needs for splitting specially for grid structure
  let toInsertPaginatedDefault = []; // needs to insert by batch
  let toInsertPaginatedByDate = [];
  let normData = []; // this one is final update by not modifying reducer
  let normDataByDate = [];
  const fullBatches = Math.floor(paginatedData.length / 3);
  const totalItemsOfFullBatches = fullBatches * 3; // calculate full rows/batches for grid structure
  const remainder = paginatedData.length % 3; // this is for the last row
  for (let i = 0; i < totalItemsOfFullBatches; i++) {
    toInsertPaginatedDefault.push(paginatedData[i]);
    toInsertPaginatedByDate.push(sortedByDatePaginatedData[i]);
    splitter++;
    if (splitter === 3) {
      // if splitter = 3 then it's enough for GridStructure one batch
      splitter = 0;
      normData.push(toInsertPaginatedDefault);
      normDataByDate.push(toInsertPaginatedByDate);
      toInsertPaginatedDefault = [];
      toInsertPaginatedByDate = [];
    }
  }
  // this is for the last batch
  toInsertPaginatedDefault = [];
  toInsertPaginatedByDate = [];
  for (let i = 0; i < remainder; i++) {
    toInsertPaginatedDefault.push(paginatedData[totalItemsOfFullBatches + i]);
    toInsertPaginatedByDate.push(
      sortedByDatePaginatedData[totalItemsOfFullBatches + i]
    );
  }
  normData.push(toInsertPaginatedDefault);
  normDataByDate.push(toInsertPaginatedByDate);

  // update everything calculated so far
  return {
    pageSize: pageSize,
    indexOfLastItem: indexOfLastItem,
    indexOfFirstItem: indexOfFirstItem,
    amtPages: amtPages,
    normalizedData: normData,
    paginatedData: paginatedData,
    availablePages: availablePages,
    sortedByDatePaginatedData: sortedByDatePaginatedData,
    sortedByDateNormalizedData: normDataByDate,
  };
};
