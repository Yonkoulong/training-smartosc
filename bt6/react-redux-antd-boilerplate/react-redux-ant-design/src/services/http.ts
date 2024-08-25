import axios from "axios";

const BASE_URL = process.env?.REACT_APP_API as string;
const BOOKING_URL = process.env?.REACT_BOOKING_API as string;

export const http = axios.create({
    baseURL: BASE_URL
});

export const booking = axios.create({
    baseURL: BOOKING_URL
});