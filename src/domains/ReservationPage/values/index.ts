

export const floors: unknown[] = [
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
                            title: 'Seat 1',
                            isReserved: true
                        },
                        {
                            id: 1,
                            title: 'Seat 2',
                            isReserved: false
                        }
                    ],
                    [
                        {
                            id: 2,
                            title: 'Seat 3',
                            isReserved: false
                        },
                        {
                            id: 3,
                            title: 'Seat 4',
                            isReserved: true
                        }
                    ]
                ]
            },
            {
                id: 1,
                title: 'Row 2',
                seats: [
                    [{
                        id: 4,
                        title: 'Seat 1',
                        isReserved: false
                    },
                        {
                            id: 5,
                            title: 'Seat 2',
                            isReserved: false
                        }],
                    [{
                        id: 6,
                        title: 'Seat 3',
                        isReserved: false
                    },
                        {
                            id: 7,
                            title: 'Seat 4',
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
                        title: 'Seat 1',
                        isReserved: false
                    },
                        {
                            id: 9,
                            title: 'Seat 2',
                            isReserved: false
                        }],
                    [{
                        id: 10,
                        title: 'Seat 3',
                        isReserved: false
                    },
                        {
                            id: 11,
                            title: 'Seat 4',
                            isReserved: false
                        }],
                    [{
                        id: 12,
                        title: 'Seat 5',
                        isReserved: false
                    },
                        {
                            id: 13,
                            title: 'Seat 6',
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
                        title: 'Seat 1',
                        isReserved: false
                    },
                        {
                            id: 15,
                            title: 'Seat 2',
                            isReserved: false
                        }],
                    [{
                        id: 16,
                        title: 'Seat 3',
                        isReserved: false
                    },
                        {
                            id: 17,
                            title: 'Seat 4',
                            isReserved: false
                        }]
                ]
            }
        ]
    }
]