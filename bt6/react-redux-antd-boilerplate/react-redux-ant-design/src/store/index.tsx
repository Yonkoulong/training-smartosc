import React from "react";
import createSagaMiddleware from "redux-saga";

import { createStore, applyMiddleware, compose } from "redux";
import { RootReducer } from "@/reducers/root.reducer";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { RootSaga } from "@/saga/root.saga";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
sagaMiddleware.run(RootSaga);

export function ReduxStoreProvider({
  children,
}: PropsWithChildren<any>) {
  return <Provider store={store}>{children}</Provider>;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
