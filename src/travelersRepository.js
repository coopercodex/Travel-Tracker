class TravelerRepository {
  constructor(sampleTravelerData) {
    this.traveler = sampleTravelerData
  }

  getTravelerById(travelerId) {
    let singleTraveler = this.traveler.find((person) => {
      return person.id === travelerId;
    })
    return singleTraveler;
  }
}


export default TravelerRepository;