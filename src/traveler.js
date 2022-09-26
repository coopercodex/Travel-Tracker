import Trip from "./trip";
import dayjs from "dayjs";
let date = dayjs().format('YYYY/MM/DD');

class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.pastTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
    this.todaysDate = date;
  }


  getTravelerFirstName() {
    let firstName = this.name.split(" ");
    return `${firstName[0]}`;
  }

  getUpcomingTrips(trips) {
    let allTrips = trips.filter((trip) => {
      return (trip.userID === this.id)
    }).forEach((trip) => {
      let tripDate = new Date(`${trip.date}`).getTime();
      if (tripDate > this.todaysDate) {
        this.upcomingTrips.push(trip)
      }
    })
    return allTrips;
  }

  getPendingTrips(trips) {
    let allTrips = trips.filter((trip) => {
      return (trip.userID === this.id)
    }).forEach((trip) => {
      if (trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
    })
    return allTrips;
  }

  getPastTrips(trips) {
    let allTrips = trips.filter((trip) => {
      return (trip.userID === this.id)
    }).forEach((trip) => {
      let tripDate = new Date(`${trip.date}`).getTime();
      if (tripDate < this.todaysDate) {
        this.upcomingTrips.push(trip)
      }
    })
    return allTrips;
  }

  // getSpendingOfYear(trips, destinations) {
  //   let currentDay = date
  //   let currentYear = currentDay.split('/')[0];
  //   // let travelersTrips = this.getTravelersTripsById(id)
  //   console.log('trips', trips, 'destination', destinations)
  //   let allTrips = trips.filter((trip) => {
  //     return (trip.userID === this.id)
  //   });

  //   let thisYearsTrips = allTrips.filter((trip) => new Date(`${trip.date}`).getFullYear() === currentYear)
    
  //   let TotalCost = thisYearsTrips.reduce((acc, trip) => {
  //     trip.getCostOfTripsOfYear(destinations)
  //     acc += trip.tripTotal;
  //     return acc;
  //   }, 0)
  //   return `Total spent on trips this year $${TotalCost}`
  // }

}






export default Traveler;