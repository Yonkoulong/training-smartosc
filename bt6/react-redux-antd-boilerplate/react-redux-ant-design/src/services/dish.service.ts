import { http } from "./http";

export async function fetchDish() {
  return http.get<any>("/dishes");
}

export async function postDish(url: string, body: object) {
  return http.post<any>(`/dishes`, body)
}

export async function deleteDish(id: string) {
  return http.delete<any>(`/dishes/${id}`);
}

export async function deleteAllDish() {
  
}

export async function getDishById(id: string) {
    return http.get<any>(`/dishes/${id}`)
}

export async function updateDish(id: string, body: object) {
  return http.put<any>(`dishes/${id}`, body)
}