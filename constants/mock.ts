
import IOption from "@/models/IOption";
import { ITask } from "@/models/ITask";

export const mockedLabels: IOption[] = [
  { label: 'Urgent', value: 'green' },
  { label: 'Not Urgent', value: 'red' },
  { label: 'Work', value: 'orange' },
  { label: 'Events', value: 'amber' },
];

export const mockedTask: ITask = {
  id: '132',
  title: 'IOS design in depth',
  labels: mockedLabels,
  date: 12,
  month: 4,
  year: 2023,
};