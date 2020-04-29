export const alphabatizeResults = (results) => {
  return results.sort((a, b) => a.name > b.name ? 1 : -1);
};

export const titleCase = (string) => {
  let newString = string.toLowerCase().split(' ')
  return newString.map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');
}

export const filterByState = (arr, selectedState, states) => {
  if (selectedState === "") return arr 
  let selectedAbbrv = states[selectedState];
  if (!selectedAbbrv) return arr;
  return arr.filter(record => record.state.includes(selectedAbbrv));
};

export const filterByQuery = (arr, query) => {
  if (query === "") return arr

  return arr.filter(record => {
    return record.name.toLowerCase().includes(query.toLowerCase()) ? true
    : record.city.toLowerCase().includes(query.toLowerCase()) ? true
    : record.genre.toLowerCase().includes(query.toLowerCase()) ? true
    : record.attire.toLowerCase().includes(query.toLowerCase()) ? true
    : null
  });
};

export const filterByCheckboxes = (arrData, arrCheckboxes) => {
  if (arrCheckboxes.length === 0) return arrData

  let i = 0;
  let results = arrData;

  while (arrCheckboxes[i]) {
    results = results.filter(record => {
      return record.genre.toLowerCase().includes(arrCheckboxes[i].toLowerCase()) ? true
      : record.tags.toLowerCase().includes(arrCheckboxes[i].toLowerCase()) ? true
      : record.attire.toLowerCase() === arrCheckboxes[i].toLowerCase() ? true
      : null
    })
    i++
  }
  return results
}