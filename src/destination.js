class Destination {
  constructor(destinationInfo) {
  this.destination = destinationInfo;
  // console.log(this.destination)
  }

  getDestinationId(location) {
    let currentDestination = this.destination.find((place) => {
      return (place.destination === location)
    })
    return currentDestination;
  }
}


export default Destination;