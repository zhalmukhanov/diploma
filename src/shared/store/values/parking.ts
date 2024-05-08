import {Parking} from "@/shared/store";


export const parkingsData: Parking[] = [
    {
        id: 1,
        lat: 43.23927166645193,
        lng: 76.9288000266096,
        isFavorite: false,
        info: {
            name: 'Parking 1',
            address: 'Almaty, Al-Farabi 1',
            price: 200,
            free: 10,
            images: ['/img/parking4.jpg', '/img/parking1.jpg', '/img/parking2.jpg', '/img/parking3.jpg'],
            startTime: '2024-04-24T09:00:00',
            endTime: '2024-04-24T22:00:00',
            possibilities: ['invalid', 'electrocar']
        }
    }
]