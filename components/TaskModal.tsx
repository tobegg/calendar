import React, { FC, useState } from "react";

interface ModalProps {
  newTask: string;
  handleNewTaskChange: () => void;
  handleNewTaskSubmit: () => void;
}

const TaskModal: FC<ModalProps> = ({ newTask, handleNewTaskChange, handleNewTaskSubmit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    handleNewTaskSubmit();
    setShowModal(false);
  }

  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 px-3 py-1 w-full uppercase font-bold rounded outline-none focus:outline-none"
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
                  <h3 className="text-2xl">Add task</h3>
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
                    <label>
                      Title:
                      <input type="text" value={newTask} onChange={handleNewTaskChange} className="border-2 ml-3" />
                    </label>
                  </form>
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
                    className="text-white bg-green-500 active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
                    type="button"
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
