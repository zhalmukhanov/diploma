export type Foor = {
    id: number
    title: string
    row_count: number
    rows: {
        id: number
        title: string
        seats: {
            id: number
            title: string
            isReserved: boolean
        }[][]
    }[]
}

export type Reservation = {
    floor_id: number
    row_id: number
    seat_id: number
}