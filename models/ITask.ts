import { ILabel } from "./ILabel";

export interface ITask {
  id: string;
  title: string;
  labels: ILabel[];
  date: number;
  month: number;
  year: number;
}