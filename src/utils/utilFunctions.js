export const alphabatizeResults = (results) => {
  const newResults = [...results]
  return  newResults.sort((a, b) => a.name > b.name ? 1 : -1)
};