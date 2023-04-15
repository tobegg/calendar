import { COLORS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { tasksSlice } from "@/store/reducers/TasksSlice";
import IOption from "@/models/IOption";
import React, { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react";
import LabelMultiSelect from "./LabelMultiSelect";
import { ITask } from "@/models/ITask";

interface ModalProps {
  showModal: boolean;
  setShowModal: any;
  editableTask: ITask | null;
  handleNewTaskSubmit: (title: string, opts: IOption[]) => void;
  handleTaskUpdate: (title: string, opts: IOption[]) => void;
}

const TaskModal: FC<ModalProps> = ({
  editableTask, showModal, setShowModal, handleNewTaskSubmit, handleTaskUpdate
}) => {
  const [taskName, setTaskName] = useState<string>('');
  const [selectedLabels, selectLabels] = useState<IOption[]>([]);
  const [newLabel, setNewLabel] = useState<string>('');
  const [newColor, setNewColor] = useState<string>('');
  const [showLabelForm, setShowLabelForm] = useState<boolean>(false);

  const { labels } = useAppSelector(state => state.taskReducer);
  const { addLabel } = tasksSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editableTask) {
      setTaskName(editableTask.title);
      selectLabels(editableTask.labels);
    }
  }, [editableTask])

  const handleSave: MouseEventHandler<HTMLButtonElement> = (e) => {
    e?.preventDefault();
    if (editableTask) {
      handleTaskUpdate(taskName, selectedLabels);
    } else {
      handleNewTaskSubmit(taskName, selectedLabels);
    }
    // handleNewTaskSubmit(taskName, selectedLabels);
    setTaskName('');
    selectLabels([]);
    setShowModal(false);
  }

  const handleNewLabelChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewLabel(e.target.value);
  }

  const handleNewColorChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setNewColor(e.target.value);
  }

  const handleChangeLabels = (val: IOption[]) => {
    selectLabels(val);
  }

  const saveLabel = () => {
    const label = { value: newColor, label: newLabel };
    dispatch(addLabel(label));
    selectLabels([...selectedLabels, label])
    setNewColor('');
    setNewLabel('');
    setShowLabelForm(false);
  }

  return (
    <>
      <button
        className="bg-blue-100 text-black active:bg-blue-500 px-3 py-1 w-full uppercase font-bold rounded outline-none focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create task
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[400px]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl">
                    {editableTask?.id ? 'Edit task' : 'Add task'}
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block py-0">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="w-full">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={taskName}
                      onChange={(event) => setTaskName(event.target.value)}
                      className="w-full rounded border-2 h-10 p-1"
                    />
                    <div className="mt-4">
                      <label>Select labels:</label>
                      <LabelMultiSelect
                        options={labels}
                        onChange={handleChangeLabels}
                        selectedValue={selectedLabels} 
                      />
                    </div>
                  </form>
                  {!showLabelForm && <p className="flex justify-end cursor-pointer" onClick={() => setShowLabelForm(true)}>Add new label</p>}
                  {showLabelForm && (
                    <div className="mt-6 bg-gray-200 rounded p-3">
                      <label>Label Name:</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newLabel}
                          onChange={handleNewLabelChange}
                          className="w-full rounded border-2 h-10 p-1 mr-2"
                        />
                        <select className="w-full rounded border-2 h-10 p-1" onChange={handleNewColorChange}>
                          {COLORS.map(color => (
                            <option key={color} value={color}>
                              {color}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center justify-end p-6">
                        <button
                          type="button"
                          className="flex justify-end cursor-pointer"
                          onClick={() => setShowLabelForm(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="flex justify-end cursor-pointer ml-3 bg-green-500 py-1 px-3 rounded text-white"
                          onClick={saveLabel}
                        >
                          Save Label
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-green-500 active:bg-green-700 disabled:bg-gray font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    disabled={!taskName.length}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default TaskModal;
