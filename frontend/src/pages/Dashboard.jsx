import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { LayoutDashboard, Plus } from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Load logged-in user from localStorage
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setUserProfile(profile);
  }, []);

  // Add or Update Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return alert("Task title is required");

    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? { ...task, ...newTask } : task
        )
      );
      setEditingTask(null);
    } else {
      // Add new task
      const taskWithUser = {
        ...newTask,
        _id: Date.now().toString(),
        status: "Pending",
        createdAt: new Date().toISOString(),
        user: userProfile?.name || "Unknown",
      };
      setTasks([taskWithUser, ...tasks]);
    }

    setNewTask({ title: "", description: "" });
    setShowAddForm(false);
  };

  // Delete Task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // Edit Task
  const handleEdit = (task) => {
    setShowAddForm(true);
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
  };

  // Toggle Task Status
  const handleUpdateStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task._id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white/60 backdrop-blur-xl p-6 flex flex-col gap-2 shadow-xl border-r border-white">
        <div className="mb-10 px-4">
          <div className="bg-[#115e59] text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-teal-900/20">
            <LayoutDashboard size={20} />
            <span className="font-bold">Task Manager</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 text-[#115e59] bg-teal-50 font-bold rounded-xl cursor-pointer">
          All Tasks
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-black text-gray-800 tracking-tight">
                Workspace
              </h1>
              <p className="text-teal-600 font-medium">
                Tasks assigned to you
              </p>
            </div>

            {/* Add Task Button */}
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                if (editingTask) setEditingTask(null);
              }}
              className="bg-[#115e59] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-teal-900/20"
            >
              <Plus size={20} /> {showAddForm ? "Close" : "Add Task"}
            </button>
          </div>

          {/* Add / Edit Task Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddTask}
              className="bg-white p-6 rounded-[2rem] shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Task Title"
                className="p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Task Description"
                className="p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <button className="bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700">
                {editingTask ? "Update Task" : "Save Task"}
              </button>
            </form>
          )}

          {/* Task Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onUpdate={handleUpdateStatus}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

