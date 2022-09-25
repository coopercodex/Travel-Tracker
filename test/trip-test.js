import { expect } from 'chai';
import Traveler from '../src/traveler';
import Trip from "../src/trip";
import { destinationsData, sampleTrips } from "../src/sample-data";

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
    expect(trip1.getTravelersTripsById(1)).to.deep.equal(
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
          date: '2021/05/22',
          duration: 17,
          status: 'approved',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should be able to get present trips', () => {
    expect(trip1.getCurrentTrips()).to.deep.equal([
      {
        "id": 6,
        "userID": 3,
        "destinationID": 35,
        "travelers": 3,
        "date": "2022/09/24",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []
      }
    ])
  })

  it('should return a travelers past trips', () => {
    expect(trip1.getPastTrips()).to.deep.equal(
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
          id: 3,
          userID: 1,
          destinationID: 22,
          travelers: 4,
          date: '2021/05/22',
          duration: 17,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 4,
          userID: 2,
          destinationID: 14,
          travelers: 2,
          date: '2022/02/25',
          duration: 10,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 5,
          userID: 2,
          destinationID: 29,
          travelers: 3,
          date: '2022/04/30',
          duration: 18,
          status: 'approved',
          suggestedActivities: []
        },
        {
          id: 8,
          userID: 5,
          destinationID: 39,
          travelers: 6,
          date: '2022/02/07',
          duration: 4,
          status: 'approved',
          suggestedActivities: []
        }, {
          id: 171,
          userID: 2,
          destinationID: 43,
          travelers: 1,
          date: '2020/12/27',
          duration: 18,
          status: 'pending',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should return a travelers upcoming trips', () => {
    expect(trip1.getUpcomingTrips()).to.deep.equal(
      [
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
          id: 7,
          userID: 4,
          destinationID: 17,
          travelers: 5,
          date: '2022/5/28',
          duration: 20,
          status: 'approved',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should return a travelers pending trips', () => {
    expect(trip1.getPendingTrips()).to.deep.equal(
      [
        {
          id: 171,
          userID: 2,
          destinationID: 43,
          travelers: 1,
          date: '2020/12/27',
          duration: 18,
          status: 'pending',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should caculate cost of trips of most recent year', () => {
    expect(trip1.getCostOfTripsOfYear(1, destinationsData)).to.equal(10384.00)
  })
})