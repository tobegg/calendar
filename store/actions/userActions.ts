import axios, { AxiosError } from "axios";
import { tasksSlice } from "../reducers/TasksSlice";
import { AppDispatch } from "../store";

/* 
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(tasksSlice.actions.fetchingUsers());
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
    dispatch(tasksSlice.actions.fetchingUsersSuccess(response.data));
  } catch (error) {
    const axiosErr = error as AxiosError;
    dispatch(tasksSlice.actions.fetchingUsersFailed(axiosErr.message));
  }
} */