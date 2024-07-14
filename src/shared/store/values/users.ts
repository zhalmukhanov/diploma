import {User, Vehicle} from "@/shared/store";


export const usersData: User[] = [
    {
        id: 1,
        name: 'Adilbek',
        surname: 'Zhalmukhanov',
        email: 'adok@gmail.com',
        password: 'qwerty123'
    }
]



export const vehiclesData: Vehicle[] = [
    {
        id: 1,
        name: 'Toyota Camry',
        number: '123 ATA 04',
        userId: 1
    },
    {
        id: 2,
        name: 'Toyota Corolla',
        number: '001 DEV 01',
        userId: 1
    }
]

export const cardData: Vehicle[]  = [
    {
        id: 1,
        name: 'Main Card',
        number: '4400 0000 0000 6330',
        userId: 1
    },
    {
        id: 2,
        name: 'Kaspi Card',
        number: '4300 0000 0000 4768',
        userId: 1
    }
]
