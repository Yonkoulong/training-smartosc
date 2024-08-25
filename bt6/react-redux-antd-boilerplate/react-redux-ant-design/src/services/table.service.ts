import { http } from "./http";

export async function fetchTable() {
  return http.get<any>("/tables");
}

export async function postTable(url:string, body: object) {
  return http.post<any>(`/tables`, body)
}

export async function deleteTable(id: string) {
  return http.delete<any>(`/tables/${id}`);
}

export async function deleteAllTable() {
  
}

export async function getTableById(id: string) {
    return http.get<any>(`/tables/${id}`)
}

export async function updateTable(id: string, body: object) {
  return http.put<any>(`tables/${id}`, body)
}