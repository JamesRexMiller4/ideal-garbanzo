export const alphabatizeResults = (results) => {
  return  results.sort((a, b) => a.name > b.name ? 1 : -1)
};

export const filterByState = (arr, selectedState, states) => {
  let selectedAbbrv = states[selectedState];
  if (!selectedAbbrv) return arr
  return arr.filter(record => record.state.includes(selectedAbbrv))
};

export const filterByQuery = (arr, query) => {
  return arr.filter(record => {
    return record.name.toLowerCase().includes(query.toLowerCase()) ? true
    : record.city.toLowerCase().includes(query.toLowerCase()) ? true
    : record.genre.toLowerCase().includes(query.toLowerCase()) ? true
    : null
  })
}