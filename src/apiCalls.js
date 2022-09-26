const fetchAllData = (dataPath) => {
  return fetch(`http://localhost:3001/api/v1/${dataPath}`)
  .then(response => response.json())
  .then(`response => response.${dataPath}`)
  .catch(error => console.log(`Error: ${dataPath} fetch error`, error))
}


export { fetchAllData }