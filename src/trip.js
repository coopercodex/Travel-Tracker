import Destination from "./destination";
import dayjs from "dayjs";
import { tripsData } from "./sample-data";


class Trip {
  constructor(tripInformation) {
    this.tripInformation = tripInformation;
  }

  getTravelersTripsById(id) {
    let allTrips = this.tripInformation.filter((trip) => {
      return (trip.userID === id)
    })
    return allTrips;
  }

  getDestinations(id, destinations) {
    let allTrips = this.getTravelersTripsById(id);
    // console.log('All Trips: ', allTrips);
    // console.log('All Destinations: ', destinations);
    // let allDestinations = allTrips.reduce((acc, trip) => {
    //   console.log('Trip: ', trip);
    //   console.log('acc: ', acc);
    //   destinations.forEach((destination) => {
    //     if (destination.id === trip.destinationID) {
    //       console.log('I AM IN HERE!')
    //       acc.push(destination)
    //     }
    //   })
    //   return acc;
    // }, [])
    let allDestinations = [];
    allTrips.forEach(trip => {
      destinations.forEach(destination => {
        if (destination.id === trip.destinationID) {
          allDestinations.push(destination);
        }
      });
    });
    // console.log('All Dest', allDestinations);
    return allDestinations;
  }

  getThisYearsTrips(id, date) {
    let allTrips = this.getTravelersTripsById(id);
    let currentYear = date.split('/')[0].toString();
    let currentTrips = allTrips.filter(trip => trip.date.split('/')[0].includes(currentYear))
    return currentTrips;
  }

  getPastTrips(id, date) {
    let allTrips = this.getTravelersTripsById(id);
    let currentYear = date.split('/').join('');
    let pastTrips = allTrips.filter(trip => trip.date.split('/').join('') < currentYear);
    return pastTrips;
  }

  getPendingTrips(id, date) {
    let allTrips = this.getTravelersTripsById(id);
    let pendingTrips = allTrips.filter(trip => trip.status === 'pending');
    return pendingTrips;
  }

  getFutureTrips(id, date) {
    let allTrips = this.getTravelersTripsById(id);
    let currentYear = date.split('/').join('');
    let futureTrips = allTrips.filter(trip => trip.date.split('/').join('') >= currentYear);
    return futureTrips;
  }

  getLodgingCost(id, date, destinations) {
    let yearlyTrips = this.getThisYearsTrips(id, date);
    let allDestinations = this.getDestinations(id, destinations);
    let yearlyDestinations = yearlyTrips.reduce((acc, trip) => {
      let getInfo = allDestinations.find(destination => destination.id === trip.destinationID)
      let getDollars = getInfo.estimatedLodgingCostPerDay * trip.duration;
      acc += getDollars;
      return acc;
    }, 0)
    return yearlyDestinations;
  }

  getFlightCost(id, date, destinations) {
    let yearlyTrips = this.getThisYearsTrips(id, date);
    let allDestinations = this.getDestinations(id, destinations);
    let yearlyDestinations = yearlyTrips.reduce((acc, trip) => {
      console.log('acc', acc);
      console.log('trip', trip);
      let getInfo = allDestinations.find(destination => destination.id === trip.destinationID);
      let getDollars = getInfo.estimatedFlightCostPerPerson * trip.travelers;
      acc += getDollars;
      return acc;
    }, 0);
    return yearlyDestinations;
  }

  getTotalCost(id, date, destinations) {
    let flights = this.getFlightCost(id, date, destinations) * 1.1;
    let lodging = this.getLodgingCost(id, date, destinations) * 1.1;
    let total = flights + lodging; 
    return total;
  }

  //  getTripsPicture(destination) {
  //  }


}

export default Trip;