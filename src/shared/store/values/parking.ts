import {Parking} from "@/shared/store";


export const parkingsData: Parking[] = [
    {
        id: 1,
        lat: 43.208296,
        lng: 76.670286,
        isFavorite: false,
        info: {
            name: 'SDU Parking',
            address: 'Проспект Абылай хана, 1/1',
            price: 500,
            free: 25,
            images: ['/img/parking4.jpg', '/img/parking1.jpg', '/img/parking2.jpg', '/img/parking3.jpg'],
            startTime: '2024-06-13T09:00:00',
            endTime: '2024-06-13T22:00:00',
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
                        title: 'Row A',
                        seats: [
                            [
                                {
                                    id: 0,
                                    title: 'A-01',
                                    isReserved: true
                                },
                                {
                                    id: 1,
                                    title: 'A-02',
                                    isReserved: false
                                },
                            ],
                            [
                                {
                                    id: 2,
                                    title: 'A-03',
                                    isReserved: false
                                },
                                {
                                    id: 3,
                                    title: 'A-04',
                                    isReserved: true
                                },
                            ]
                        ]
                    },
                    {
                        id: 1,
                        title: 'Row B',
                        seats: [
                            [{
                                id: 4,
                                title: 'B-01',
                                isReserved: false
                            },
                                {
                                    id: 5,
                                    title: 'B-02',
                                    isReserved: false
                                }],
                            [{
                                id: 6,
                                title: 'B-03',
                                isReserved: false
                            },
                                {
                                    id: 7,
                                    title: 'B-04',
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
                        title: 'Row A',
                        seats: [
                            [{
                                id: 8,
                                title: 'A-11',
                                isReserved: false
                            },
                                {
                                    id: 9,
                                    title: 'A-12',
                                    isReserved: false
                                }],
                            [{
                                id: 10,
                                title: 'A-13',
                                isReserved: false
                            },
                                {
                                    id: 11,
                                    title: 'A-14',
                                    isReserved: false
                                }],
                            [{
                                id: 12,
                                title: 'A-15',
                                isReserved: false
                            },
                                {
                                    id: 13,
                                    title: 'A-16',
                                    isReserved: false
                                }]
                        ]
                    },
                    {
                        id: 1,
                        title: 'Row B',
                        seats: [
                            [{
                                id: 14,
                                title: 'B-11',
                                isReserved: false
                            },
                                {
                                    id: 15,
                                    title: 'B-12',
                                    isReserved: false
                                }],
                            [{
                                id: 16,
                                title: 'B-13',
                                isReserved: false
                            },
                                {
                                    id: 17,
                                    title: 'B-14',
                                    isReserved: false
                                }]
                        ]
                    }
                ]
            }
        ]
    }
]