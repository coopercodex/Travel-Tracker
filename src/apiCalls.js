const fetchAllData = (dataPath) => {
  return fetch(`http://localhost:3001/api/v1/${dataPath}`)
  .then(response => response.json())
  .then(`response => response.${dataPath}`)
  .catch(error => console.log(`Error: ${dataPath} fetch error`, error))
}

const fetchSingleTravelerData = (userNumber) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${userNumber}`)
    .then(response => response.json())
    .catch(error =>{
      console.log(`Error: ${error.message}`)
    })
  }
  

export { fetchAllData, fetchSingleTravelerData }