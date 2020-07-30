export default (state, pageSize) => {
  const indexOfLastItem = state.currentPage * pageSize; // settings for pagination
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const fullAmtPages = Math.floor(state.fetchedData.length / pageSize);
  const amtPages =
    state.fetchedData.length % pageSize === 0 ? fullAmtPages : fullAmtPages + 1;
  const availablePages = [];
  for (let i = 1; i <= amtPages; i++) {
    availablePages.push(i);
  }
  const paginatedData = state.fetchedData[indexOfLastItem]
    ? state.fetchedData.slice(indexOfFirstItem, indexOfLastItem)
    : state.fetchedData.slice(indexOfFirstItem, state.fetchedData.length);
  // data normalization for pagination
  let splitter = 0; // needs for splitting specially for grid structure
  let toInsert = []; // needs to insert by batch
  let normData = []; // this one is final update by not modifying reducer
  const fullBatches = Math.floor(paginatedData.length / 3);
  const totalItemsOfFullBatches = fullBatches * 3; // calculate full rows/batches for grid structure
  const remainder = paginatedData.length % 3; // this is for the last row
  for (let i = 0; i < totalItemsOfFullBatches; i++) {
    toInsert.push(paginatedData[i]);
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
    toInsert.push(paginatedData[totalItemsOfFullBatches + i]);
  }
  normData.push(toInsert);

  // update everything calculated so far
  return {
    pageSize: pageSize,
    indexOfLastItem: indexOfLastItem,
    indexOfFirstItem: indexOfFirstItem,
    amtPages: amtPages,
    normalizedData: normData,
    paginatedData: paginatedData,
    availablePages: availablePages,
  };
};
