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
            startTime: '2024-05-09T09:00:00',
            endTime: '2024-05-09T22:00:00',
            possibilities: ['invalid', 'electrocar'],
        },
        places: [
            {
                id: 0,
                title: 'Ground floor',
                row_count: 2,
                rows: [
                    {
                        id: 0,
                        title: 'Row 1',
                        seats: [
                            [
                                {
                                    id: 0,
                                    title: 'Spot 1',
                                    isReserved: true
                                },
                                {
                                    id: 1,
                                    title: 'Spot 2',
                                    isReserved: false
                                },
                            ],
                            [
                                {
                                    id: 2,
                                    title: 'Spot 3',
                                    isReserved: false
                                },
                                {
                                    id: 3,
                                    title: 'Spot 4',
                                    isReserved: true
                                },
                            ]
                        ]
                    },
                    {
                        id: 1,
                        title: 'Row 2',
                        seats: [
                            [{
                                id: 4,
                                title: 'Spot 1',
                                isReserved: false
                            },
                                {
                                    id: 5,
                                    title: 'Spot 2',
                                    isReserved: false
                                }],
                            [{
                                id: 6,
                                title: 'Spot 3',
                                isReserved: false
                            },
                                {
                                    id: 7,
                                    title: 'Spot 4',
                                    isReserved: false
                                }]
                        ]
                    }
                ]
            },
            {
                id: 1,
                title: 'First floor',
                row_count: 2,
                rows: [
                    {
                        id: 0,
                        title: 'Row 1',
                        seats: [
                            [{
                                id: 8,
                                title: 'Spot 1',
                                isReserved: false
                            },
                                {
                                    id: 9,
                                    title: 'Spot 2',
                                    isReserved: false
                                }],
                            [{
                                id: 10,
                                title: 'Spot 3',
                                isReserved: false
                            },
                                {
                                    id: 11,
                                    title: 'Spot 4',
                                    isReserved: false
                                }],
                            [{
                                id: 12,
                                title: 'Spot 5',
                                isReserved: false
                            },
                                {
                                    id: 13,
                                    title: 'Spot 6',
                                    isReserved: false
                                }]
                        ]
                    },
                    {
                        id: 1,
                        title: 'Row 2',
                        seats: [
                            [{
                                id: 14,
                                title: 'Spot 1',
                                isReserved: false
                            },
                                {
                                    id: 15,
                                    title: 'Spot 2',
                                    isReserved: false
                                }],
                            [{
                                id: 16,
                                title: 'Spot 3',
                                isReserved: false
                            },
                                {
                                    id: 17,
                                    title: 'Spot 4',
                                    isReserved: false
                                }]
                        ]
                    }
                ]
            }
        ]
    }
]