import IOption from "./IOption";

export interface ITask {
  id: string;
  title: string;
  labels: IOption[];
  date: number;
  month: number;
  year: number;
}