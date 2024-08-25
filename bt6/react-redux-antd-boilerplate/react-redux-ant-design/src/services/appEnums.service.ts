import {http} from "./http"
export const EnumsHttpService = {
    getCategories: ()=> http.get('/categories')
}