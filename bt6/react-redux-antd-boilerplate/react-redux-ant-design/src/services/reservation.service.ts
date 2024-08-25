import { booking, http } from "./http";

export async function fetchBookingTable() {
    return booking.get<any>('https://627c83bdbf2deb7174dbc91e.mockapi.io/reservations');
}

export async function postBookingTable(url: string, body: object) {
    return booking.post<any>('https://627c83bdbf2deb7174dbc91e.mockapi.io/reservations', body);
}

export async function deleteBookingTable(id:string) {
    return booking.delete<any>(`https://627c83bdbf2deb7174dbc91e.mockapi.io/reservations/${id}`);
}

export async function confirmBookingTable(id: string, body: object) {
    return booking.put<any>(`https://627c83bdbf2deb7174dbc91e.mockapi.io/reservations/${id}`, body);
}