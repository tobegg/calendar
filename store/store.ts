import { userAPI } from "@/services/UserService";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from './reducers/TasksSlice';

const rootReducer = combineReducers({
  taskReducer,
  [userAPI.reducerPath]: userAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware) 
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
