import dayjs from "dayjs";
let dayJsObj = dayjs().format('YYYY/MM/DD');

class Trip {
  constructor(tripInformation) {
    this.trip = tripInformation;
  }

  getTravelersTripsById(id) {
    let allTravelerTrips = this.trip.filter((place) => {
      return (place.userID === id)
    })
    return allTravelerTrips;
  }

  getCurrentTrips() {
    let currentDay = dayJsObj;
    let findCurrentTrips = this.trip.filter((place) => {
      return (place.date === currentDay)
    })
    return findCurrentTrips
  }

  getPastTrips() {
    let currentDay = dayJsObj;
    let findPastTrips = this.trip.filter((place) => {
      return (place.date < currentDay);
    })
    return findPastTrips;
  }

  getUpcomingTrips() {
    let currentDay = dayJsObj;
    let findUpcomingTrips = this.trip.filter((place) => {
      return (place.date > currentDay)
    })
    return findUpcomingTrips;
  }

  getPendingTrips() {
    let findPendingTrips = this.trip.filter((place) => {
      return (place.status === 'pending')
    })
    return findPendingTrips;
  }

  getCostOfTripsOfYear(id, destinations) {
    let travelersTrips = this.getTravelersTripsById(id)
    let thisYearsTrips = travelersTrips.filter((trip) => trip.date.slice(0, 4) === '2022')
    let sum = thisYearsTrips.reduce((acc, trip) => {
      destinations.forEach((dest) => {
        if (dest.id === trip.destinationID) {
          acc += (dest.estimatedLodgingCostPerDay * trip.duration) + (dest.estimatedFlightCostPerPerson * trip.travelers);
        }
      })
      return acc;
    }, 0) * 1.1;
    return Number(sum.toFixed(2));
  }
}


// take a user id, use that id to find trips with user id
// from those trips do math on the ones from 2022
// match trip.destinationid with destination.id
// destination.estimatedLodgingCostPerDay": 130, * trip.duration
// destination.estimatedFlightCostPerPerson": 950 * per trip.travelercount
// add then * 1.1;


export default Trip;