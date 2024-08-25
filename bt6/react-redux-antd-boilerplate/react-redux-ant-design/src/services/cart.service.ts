import { booking } from "./http";

export async function fetchDishFromCart() {
    return booking.get<any>('https://627c83bdbf2deb7174dbc91e.mockapi.io/cart')
}

export async function postDishToTheCart(url: string, body:object) {
    return booking.post<any>('https://627c83bdbf2deb7174dbc91e.mockapi.io/cart', body)
}