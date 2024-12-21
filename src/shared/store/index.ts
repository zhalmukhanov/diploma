import { defineStore } from 'pinia'
import {usersData, vehiclesData, cardData, parkingsData, reservationsData, historyData} from "@/shared/store/values";

export type User = {
    id: number
    name: string
    surname: string
    email: string
    password: string
}

export type Vehicle = {
    id: number
    name: string
    number: string
    userId: number
}

export type Parking = {
    id: number
    lat: number
    lng: number
    isFavorite: boolean
    info: {
        name: string
        address: string
        price: number
        free: number
        images: string[]
        startTime: string
        endTime: string
        possibilities: string[]
    },
    places: unknown[]
}

export type ParkingForMap = {
    id: number
    lat: number
    lng: number
}

export type Reservation = {
    id: number
    userId: number
    spotName: string
    placeName: string
    parkingName: string
    startTime: string
    endTime: string
    price: number
}

export type History = {
    id: number
    parkingName: string
    startDate: string
    endDate: string
    price: number
}

export type Store = {
    users: User[]
    currentUser: User
    userId: number

    vehicles: Vehicle[]
    vehicleId: number

    cards: Vehicle[]
    cardId: number

    parkings: Parking[]

    reservations: Reservation[]
    reservationsId: number
    history: History[]
}



export const useStore = defineStore('main', {
  state: (): Store => ({
    users: usersData,
    currentUser: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {
        id: 0,
        name: '',
        surname: '',
        email: '',
        password: ''
    },
    userId: usersData.length + 1,

    vehicles: vehiclesData,
    vehicleId: vehiclesData.length + 1,

    cards: cardData,
    cardId: cardData.length + 1,

    // parking
    parkings: parkingsData,

    // reservations
    reservations: reservationsData,
    reservationsId: reservationsData.length + 1,
    history: historyData
  }),
  getters: {
      getUsers(): User[] {
          return this.users
      },
        getCurrentUser(): User {
            return this.currentUser
        },

      getVehicles(): Vehicle[] {
          return this.vehicles.filter((v) => v.userId === this.currentUser.id)
      },

      getCards(): Vehicle[] {
          return this.cards.filter((v) => v.userId === this.currentUser.id)
      },

      getUserLastReservation(): Reservation | null {
          return this.reservations.find((r) => r.userId === this.currentUser.id) || null
      },

      getHistory(): History[] {
            return this.history
      }
  },
  actions: {
    addUser(user: User) {
      this.users.push({...user, id: this.userId++})
    },
    setUsers(users: User[]) {
        this.users = users
    },
    checkUser(user: User): boolean {
        return this.users.some((u) => u.email === user.email)
    },
      checkUserPassword(user: User): boolean {
            return this.users.some((u) => u.email === user.email && u.password === user.password)
      },
    setCurrentUser(user: User) {
        this.currentUser = user
    },

      getUserByEmail(email: string): User {
          return this.users.find((u) => u.email === email) || {
              id: 0,
              name: '',
              surname: '',
              email: '',
              password: ''
          }
      },

      updateUser(name: string, surname: string, email: string) {
          this.currentUser = {
              ...this.currentUser,
              name,
              surname,
              email,
          }

            this.users = this.users.map((u) => {
                if (u.id === this.currentUser.id) {
                    return {
                        ...u,
                        name,
                        surname,
                        email,
                    }
                }
                return u
            })
      },
      deleteVehicle(id: number) {
            this.vehicles = this.vehicles.filter((v) => v.id !== id)
      },
      addVehicle(name: string, number: string) {
            this.vehicles.push({
                id: this.vehicleId++,
                name,
                number,
                userId: this.currentUser.id
            })
      },

        deleteCard(id: number) {
            this.cards = this.cards.filter((v) => v.id !== id)
        },
        addCard(name: string, number: string) {
            this.cards.push({
                id: this.cardId++,
                name,
                number,
                userId: this.currentUser.id
            })
        },

        // parking
      getParkings(): ParkingForMap[] {
            return this.parkings.map((p) => ({
                id: p.id,
                lat: p.lat,
                lng: p.lng
            }))
      },
      getParkingById(id: number): Parking {
            return this.parkings.find((p) => p.id === id) || {
                id: 0,
                lat: 0,
                lng: 0,
                isFavorite: false,
                info: {
                    name: '',
                    address: '',
                    price: 0,
                    free: 0,
                    images: [],
                    startTime: '',
                    endTime: '',
                    possibilities: []
                }
            }
      },
      setFavoriteParking(id: number) {
            this.parkings = this.parkings.map((p) => {
                if (p.id === id) {
                    return {
                        ...p,
                        isFavorite: !p.isFavorite
                    }
                }
                return p
            })
      },

      // reservations
      setReservation({spotName, placeName, parkingName, startTime, endTime, price}) {
        debugger
        const id = this.reservationsId++
          this.reservations.push({
                id,
                userId: this.currentUser.id,
                spotName,
                placeName,
                parkingName,
                startTime,
                endTime,
                price
            })
      },

      getParkingBySpotId(spotId: number): Parking {
            return this.parkings.find((p) => p.places.some((pl) => pl.id === spotId)) || {
                id: 0,
                lat: 0,
                lng: 0,
                isFavorite: false,
                info: {
                    name: '',
                    address: '',
                    price: 0,
                    free: 0,
                    images: [],
                    startTime: '',
                    endTime: '',
                    possibilities: []
                },
                places: []
            }
      },

      getSpotName(spotId: number): string {
            const parking = this.getParkingBySpotId(spotId)
            const places = parking.places.find((p) => p.places.some((pl) => pl.id === spotId))

            return places?.places.find((pl) => pl.id === spotId)?.title || ''
      },

      getPlaceName(spotId: number): string {
            const parking = this.getParkingBySpotId(spotId)
            const places = parking.places.find((p) => p.places.some((pl) => pl.id === spotId))

            return places[0].title || ''
      },

      getResevationById(id: number): Reservation {
            return this.reservations.find((r) => r.id === id) || {
                id: 0,
                userId: 0,
                spotName: '',
                placeName: '',
                parkingName: '',
                startTime: '',
                endTime: '',
                price: 0
            }
      },

      updateReservation(startTime: string, endTime: string, price: number, id: number) {
            this.reservations = this.reservations.map((r) => {
                if (r.id === id) {
                    return {
                        ...r,
                        startTime,
                        endTime,
                        price
                    }
                }
                return r
            })
      },

      getParkingPriceByName(name: string): number {
            return this.parkings.find((p) => p.info.name === name)?.info.price || 0
      },

      cancelReservation(id: number) {
            this.reservations = this.reservations.filter((r) => r.id !== id)
      }
  },
})