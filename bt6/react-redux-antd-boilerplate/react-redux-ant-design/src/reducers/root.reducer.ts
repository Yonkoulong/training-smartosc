import { UserReducer } from "@/reducers/users.reducer";
import { combineReducers } from "redux";
import { CounterReducer } from "@/reducers/counter.reducer";
import { DishReducer } from "./dish.reducer";
import { EnumsReducer } from "./appEnums.reducer";
import { TableReducer } from "./table.reducer";
import { PopupReducer } from "./popup.reducer";
import { ReservationReducer } from "./reservation.reducer";
import { CartReducer } from "./cart.reducer";

export const RootReducer = combineReducers({
  users: UserReducer,
  count: CounterReducer,
  dish: DishReducer,
  table: TableReducer,
  appEnums: EnumsReducer,
  popup: PopupReducer,
  reservation: ReservationReducer,
  cart: CartReducer,
});
