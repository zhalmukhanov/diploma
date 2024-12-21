import {History, Reservation} from "@/shared/store";


export const reservationsData: Reservation[] = [
    {
        id: 1,
        userId: 1,
        startTime: '2024-12-26T10:45:00',
        endTime: '2024-12-26T12:30:00',
        parkingName: 'SDU Parking',
        placeName: 'Row A',
        spotName: 'A-02',
        price: 1750
    }
]


export const historyData: History[] = [
    {
        id: 1,
        parkingName: 'SDU Parking',
        startDate: '2024-12-26T10:00:00',
        endDate: '2024-12-26T22:00:00',
        price: 2600
    },
    {
        id: 2,
        parkingName: 'Parking Forum',
        startDate: '2024-12-26T10:00:00',
        endDate: '2024-12-26T12:00:00',
        price: 2600
    },
    {
        id: 3,
        parkingName: 'Esentai Mall Parking',
        startDate: '2024-12-26T08:00:00',
        endDate: '2024-12-26T18:00:00',
        price: 3000
    },
    {
        id: 4,
        parkingName: 'Mega Park',
        startDate: '2024-12-26T09:00:00',
        endDate: '2024-12-26T19:00:00',
        price: 3500
    },
    {
        id: 5,
        parkingName: 'Esentai Mall Parking',
        startDate: '2024-12-26T10:00:00',
        endDate: '2024-12-26T20:00:00',
        price: 4000
    }
]
