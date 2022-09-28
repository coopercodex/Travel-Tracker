import { expect } from 'chai';
import Traveler from '../src/traveler';
import Trip from "../src/trip";
import { destinationsData, tripsData } from "../src/sample-data";

describe('Trip', () => {
  let trip1


  beforeEach(() => {
    trip1 = new Trip(tripsData);

  })

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceOf(Trip);
  })

  it('should get travelers trips by id', () => {
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
          status: 'pending',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should get all destinations', () => {
    expect(trip1.getDestinations(1, destinationsData)).to.deep.equal(
      [
        {
          id: 49,
          destination: 'Castries, St Lucia',
          estimatedLodgingCostPerDay: 650,
          estimatedFlightCostPerPerson: 90,
          image: 'https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
          alt: 'aerial photography of rocky mountain under cloudy sky'
        },
        {
          id: 25,
          destination: 'New York, New York',
          estimatedLodgingCostPerDay: 175,
          estimatedFlightCostPerPerson: 200,
          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          alt: 'people crossing the street during the day surrounded by tall buildings and advertisements'
        }
      ]
    )
  })

  it('should get trips for the year', () => {
    expect(trip1.getThisYearsTrips(1, '2022/09/26')).to.deep.equal(
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
        }
      ]
    )
  })


  it('should get yearly cost of lodging', () => {
    expect(trip1.getLodgingCost(1, '2022/09/26', destinationsData)).to.equal(8350)
  })

  it('should get yearly cost of flights', () => {
    expect(trip1.getFlightCost(1, '2022/09/26', destinationsData)).to.equal(1090)
  })

  it('should get total cost of trips for year', () => {
    expect(trip1.getTotalCost(1, '2022/09/26', destinationsData)).to.equal(10384)
  })


  it('should return a travelers past trips', () => {
    expect(trip1.getPastTrips(1, '2022/09/26')).to.deep.equal(
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
          status: 'pending',
          suggestedActivities: []
        }
      ]
    )
  })

  it('should return a travelers future trips', () => {
    expect(trip1.getFutureTrips(1, '2022/09/26')).to.deep.equal(
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
        }
      ]
    )
  })

  it('should return a travelers pending trips', () => {
    expect(trip1.getPendingTrips(1, '2022/09/26')).to.deep.equal(
      [
        {
          id: 3,
          userID: 1,
          destinationID: 22,
          travelers: 4,
          date: '2021/05/22',
          duration: 17,
          status: 'pending',
          suggestedActivities: []
        }
      ]
    )
  })

  
})