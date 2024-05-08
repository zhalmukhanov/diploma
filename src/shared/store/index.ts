import { defineStore } from 'pinia'
import {usersData, vehiclesData, cardData, parkingsData} from "@/shared/store/values";

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
    }
}

export type ParkingForMap = {
    id: number
    lat: number
    lng: number
}

export type Store = {
    users: User[]
    currentUser: User
    userId: number

    vehicles: Vehicle[]
    vehicleId: number

    cards: Vehicle[]
    cardId: number

    parking: Parking[]
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
      parkings: parkingsData

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
      }
  },
})