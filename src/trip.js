import dayjs from "dayjs";
let dayJsObj = dayjs().format('YYYY/MM/DD');


class Trip {
  constructor(tripInformation) {
    this.trip = tripInformation;
  }

  getTripsById(id) {
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


}


export default Trip;