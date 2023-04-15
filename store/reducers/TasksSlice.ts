import { mockedLabels, mockedTask } from "@/constants/mock";
import IOption from "@/models/IOption";
import { ITask } from "@/models/ITask";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDraggableTask {
  id: string;
  date: number;
  order: number;
}

interface UserState {
  list: ITask[];
  filter: string;
  labelFilter: IOption[];
  labels: IOption[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  list: [mockedTask],
  filter: '',
  labelFilter: [],
  labels: mockedLabels,
  isLoading: false,
  error: ''
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITask>) {
      state.list.push(action.payload);
    },
    editTask(state, action: PayloadAction<ITask>) {
      const taskIndex = state.list.findIndex(task => task.id === action.payload.id);
      state.list[taskIndex] = action.payload;
    },
    replaceTask(state, action: PayloadAction<IDraggableTask>) {
      const taskIndex = state.list.findIndex(task => task.id === action.payload.id);
      const tasksRemoved = state.list.splice(taskIndex, 1);
      const newTask = { ...tasksRemoved[0], date: action.payload.date };
      const prevTasks = state.list.filter(task => task.date === action.payload.date);

      if (action.payload.order === 0) {
        state.list = [newTask, ...state.list];
      } else  if (action.payload.order >= prevTasks.length) {
        state.list = [...state.list, newTask];
      } else {
        const prevIndex = state.list.findIndex(task => task.id === prevTasks[action.payload.order].id);
        state.list.splice(prevIndex, 0, newTask);
      }
    },
    addLabel(state, action: PayloadAction<IOption>) {
      state.labels.push(action.payload);
    },
    changeFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    changeLabelFilter(state, action: PayloadAction<IOption[]>) {
      state.labelFilter = action.payload;
    },
  }
});

export default tasksSlice.reducer;
