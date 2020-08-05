export default (
  state,
  pageSizeComing,
  curPage,
  fetchedData,
  sortedFetchedData
) => {
  const currentPage = curPage ? curPage : state.currentPage;
  const pageSize = pageSizeComing ? pageSizeComing : state.pageSize;
  const indexOfLastItem = currentPage * pageSize; // settings for pagination
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const fetchData = fetchedData ? fetchedData : state.fetchedData;
  const fullAmtPages = Math.floor(fetchData.length / pageSize);
  const amtPages =
    fetchData.length % pageSize === 0 ? fullAmtPages : fullAmtPages + 1;
  const availablePages = [];
  for (let i = 1; i <= amtPages; i++) {
    availablePages.push(i);
  }
  const sortedByDateFetchedData = sortedFetchedData
    ? sortedFetchedData
    : state.sortedByDateFetchedData;
  const sortedByDatePaginatedData = sortedByDateFetchedData[indexOfLastItem]
    ? sortedByDateFetchedData.slice(indexOfFirstItem, indexOfLastItem)
    : sortedByDateFetchedData.slice(
        indexOfFirstItem,
        sortedByDateFetchedData.length
      );

  const paginatedData = fetchData[indexOfLastItem]
    ? fetchData.slice(indexOfFirstItem, indexOfLastItem)
    : fetchData.slice(indexOfFirstItem, fetchData.length);
  if (paginatedData.length === 0) {
    console.log(indexOfFirstItem);
    console.log(indexOfLastItem);
  }
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
    sortedByDateFetchedData: sortedByDateFetchedData,
    fetchedData: fetchData,
    currentPage: currentPage,
  };
};
