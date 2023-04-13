import { IUser } from "@/models/IUser";
import axios, { AxiosError } from "axios";
import { userSlice } from "../reducers/UserSlice";
import { AppDispatch } from "../store";


export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.fetchingUsers());
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
    dispatch(userSlice.actions.fetchingUsersSuccess(response.data));
  } catch (error) {
    const axiosErr = error as AxiosError;
    dispatch(userSlice.actions.fetchingUsersFailed(axiosErr.message));
  }
}