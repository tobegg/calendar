import { ITask } from "@/models/ITask";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  list: ITask[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  list: [],
  isLoading: false,
  error: ''
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      console.log(action);
      state.list.push(action.payload);
      console.log(state.list);
    },
    editTask(state, action: PayloadAction<ITask>) {
      const taskIndex = state.list.findIndex(task => task.id === action.payload.id);
      state.list[taskIndex] = action.payload;
    }
  }
});

export default tasksSlice.reducer;
