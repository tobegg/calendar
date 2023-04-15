import { eventAPI } from "@/services/EventService";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from './reducers/TasksSlice';

const rootReducer = combineReducers({
  taskReducer,
  [eventAPI.reducerPath]: eventAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventAPI.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
