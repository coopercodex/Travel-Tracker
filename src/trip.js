import Destination from "./destination";
import dayjs from "dayjs";
import { tripsData } from "./sample-data";
// let dayJsObj = dayjs().format('YYYY/MM/DD');

class Trip {
  constructor(tripInformation) {
    this.tripInformation = tripInformation;
    // this.id = tripInformation.id;
    // this.userID = tripInformation.userID;
    // this.destinationID = tripInformation.destinationID;
    // this.travelers = tripInformation.travelers;
    // this.date = tripInformation.date;
    // this.duration = tripInformation.duration;
    // this.status = tripInformation.status;
    // this.suggestedActivities = [];
    // this.destination
    // this.tripTotal
  }

  getTravelersTripsById(id) {
    let allTrips = this.tripInformation.filter((trip) => {
      return (trip.userID === id)
    })
    return allTrips;
  }
  
  getDestinations(id, destinations) {
    let allTrips = this.getTravelersTripsById(id)
    let allDestinations = allTrips.reduce((acc, trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.id) {
          acc.push(destination)
        }
      })
      return acc;
    }, [])
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
    console.log(pastTrips)
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
      let getInfo = allDestinations.find(destination =>  destination.id === trip.id)
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
       let getInfo = allDestinations.find(destination =>  destination.id === trip.id)
       let getDollars = getInfo.estimatedFlightCostPerPerson * trip.travelers;
       acc += getDollars;
       return acc;
     }, 0)
     return yearlyDestinations;
   }

   getTotalCost(id, date, destinations) {
    let flights = this.getFlightCost(id, date, destinations) * 1.1;
    let lodging = this.getLodgingCost(id, date, destinations) * 1.1;
    let total = flights + lodging;
    return total;
   }
  

}
    // let currentDay = dayJsObj
    // let currentYear = currentDay.split('/')[0];
    // let travelersTrips = this.getTravelersTripsById(id)
    // let thisYearsTrips = travelersTrips.filter((trip) => trip.date.slice(0, 4) === currentYear)
    // let sum = thisYearsTrips.reduce((acc, trip) => {
    //     destinations.forEach((dest) => {
    //         if (dest.id === trip.destinationID) {
    //             acc += (dest.estimatedLodgingCostPerDay * trip.duration) + (dest.estimatedFlightCostPerPerson * trip.travelers);
    //           }
    //         })
    //         return acc;
    //       }, 0) * 1.1;
    //       return Number(sum.toFixed(2));
    //     }
        
        
        
        // take a user id, use that id to find trips with user id
        // from those trips do math on the ones from 2022
        // match trip.destinationid with destination.id
        // destination.estimatedLodgingCostPerDay": 130, * trip.duration
        // destination.estimatedFlightCostPerPerson": 950 * per trip.travelercount
        // add then * 1.1;
        // console.log('destination', destinations)


        // let mostRecentDestination = destinations.find((destination) => {
        //   return (destination.id === this.destinationID) 
        // })
        // this.destination = mostRecentDestination;
        
        // let sum = this.destination.reduce((acc, dest) => {
        //       acc += (mostRecentDestination.estimatedLodgingCostPerDay * dest.duration) + (mostRecentDestination.estimatedFlightCostPerPerson * dest.travelers); 
        //       return acc;
        //     }, 0) * 1.1;
        //     // console.log('SUMMMM', sum)
        //     return Number(sum.toFixed(2));
        //   }
        
        
        export default Trip;