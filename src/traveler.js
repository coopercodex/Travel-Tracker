class Traveler {
  constructor(travelerInformation) {
    this.id = travelerInformation.id;
    this.name = travelerInformation.name;
    this.travelerType = travelerInformation.travelerType
  }

  getTravelerFirstName() {
    let firstName = this.name.split(" ");
    return firstName[0];
  }
}
 



export default Traveler;