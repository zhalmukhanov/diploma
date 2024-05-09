import {History, Reservation} from "@/shared/store";


export const reservationsData: Reservation[] = [
    {
        id: 1,
        userId: 1,
        startTime: '2024-04-24T10:00:00',
        endTime: '2024-04-24T22:00:00',
        parkingName: 'Parking 1',
        placeName: 'Row 1',
        spotName: 'Spot 1',
        price: 200
    }
]


export const historyData: History[] = [
    {
        id: 1,
        parkingName: 'Parking 1',
        startDate: '2024-04-24T10:00:00',
        endDate: '2024-04-24T22:00:00',
        price: 2600
    },
    {
        id: 2,
        parkingName: 'Parking 2',
        startDate: '2024-04-24T10:00:00',
        endDate: '2024-04-24T12:00:00',
        price: 2600
    },
    {
        id: 3,
        parkingName: 'Parking 3',
        startDate: '2024-04-25T08:00:00',
        endDate: '2024-04-25T18:00:00',
        price: 3000
    },
    {
        id: 4,
        parkingName: 'Parking 4',
        startDate: '2024-04-26T09:00:00',
        endDate: '2024-04-26T19:00:00',
        price: 3500
    },
    {
        id: 5,
        parkingName: 'Parking 5',
        startDate: '2024-04-27T10:00:00',
        endDate: '2024-04-27T20:00:00',
        price: 4000
    }
]
