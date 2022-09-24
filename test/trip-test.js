import { expect } from 'chai';
import Traveler from '../src/traveler';
import Trip from "../src/trip";
import { sampleTrips } from "../src/sample-data";

describe('Trip', () => {
  let trip1


  beforeEach(() => {
    trip1 = new Trip(sampleTrips);

  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceOf(Trip);
  })

  it('should get travelers trips by id', () => {
    // console.log(trip1.getTripsById(1))
    expect(trip1.getTripsById(1)).to.deep.equal(
      [
        {
          id: 1,
          userID: 1,
          destinationID: 49,
          travelers: 1,
          date: '2022/09/16',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 2,
          userID: 1,
          destinationID: 25,
          travelers: 5,
          date: '2022/10/04',
          duration: 18,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 3,
          userID: 1,
          destinationID: 22,
          travelers: 4,
          date: '2022/05/22',
          duration: 17,
          status: 'approved',
          suggestedActivities: []
        }
      ]
    );
  })

  it ('should be able to get present trips', () => {
    expect(trip1.getCurrentTrips()).to.deep.equal([
      {
        "id": 6,
        "userID": 3,
        "destinationID": 35,
        "travelers": 3,
        "date": "2022/09/23",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
      }
    ])
  })
})