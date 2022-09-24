class Destination {
  constructor(destinationInfo) {
  this.destination = destinationInfo;
  }

  getDestinationId(id) {
    let currentDestination = this.destination.find((place) => {
      return (place.id === id)
    })
    return currentDestination
  }
}


export default Destination;