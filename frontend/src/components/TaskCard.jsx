
import React from "react";
import { Edit2, Trash2, CheckCircle, Circle, Calendar } from "lucide-react";

const TaskCard = ({ task, onUpdate, onDelete, onEdit }) => {
  const isCompleted = task.status === "Completed";

  return (
    <div
      className={`p-6 rounded-[2rem] shadow-sm transition border ${
        isCompleted ? "bg-gray-50 border-gray-200" : "bg-white border-teal-100"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Status Button */}
          <button
            onClick={() =>
              onUpdate(task._id, { status: isCompleted ? "Pending" : "Completed" })
            }
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
              isCompleted ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-400"
            }`}
          >
            {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
          </button>

          <div>
            <h3
              className={`font-bold text-gray-800 ${
                isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-teal-600 font-bold">
              Assigned to: {task.user}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-teal-600 bg-gray-50 rounded-lg"
          >
            <Edit2 size={16} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className={`text-sm mb-6 ${isCompleted ? "text-gray-400" : "text-gray-500"}`}>
        {task.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
          <Calendar size={12} /> {new Date(task.createdAt).toLocaleDateString()}
        </div>
        <div
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
            isCompleted ? "bg-gray-200 text-gray-500" : "bg-teal-600 text-white"
          }`}
        >
          {task.status}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
