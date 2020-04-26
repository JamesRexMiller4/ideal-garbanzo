export const getData = () => {
  return fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Api-Key q3MNxtfep8Gt"
      }
    })
    .then(res => {
      if (!res.ok) {
        throw Error('Problem fetching data')
      }

      return res.json()
    })
  }