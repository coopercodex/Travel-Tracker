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
  
  // methods that update trips, 3 args- past, upcoming, pending from trip class
}






export default Traveler;