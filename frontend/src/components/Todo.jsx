import { useEffect, useState } from "react";
import { ClipboardList, Plus, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!title.trim()) return;

      const response = await axios.post(
        "https://todo-1-29fz.onrender.com/newtask",
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.user);
      setTitle("");
      setDescription("");
      toast.info("Task Added!", {
        position: "bottom-right",
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://todo-1-29fz.onrender.com/api/logoutuser");
      console.log(response);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = (index) => {
    try {
      axios.delete(`https://todo-1-29fz.onrender.com/deletetask/${index}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.info("Task Deleted!", {
        position: "bottom-right",
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await axios.get("https://todo-1-29fz.onrender.com/getalltask", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTodos(result.data.tasks);
        // console.log();
        setUser(result.data.userData[0].name);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [todos]);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen backdrop-blur-sm bg-black/30 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Glass Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-center space-x-4">
              <ClipboardList className="w-12 h-12 text-white" />
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Task Master
              </h1>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {user}
              </h1>
              <button
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 border border-white/10 backdrop-blur-sm group"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          {/* Add Todo Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-2xl border border-white/20"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-white mb-2"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/20 text-white placeholder-white/50 transition-all outline-none backdrop-blur-sm"
                  placeholder="What needs to be done?"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-lg font-medium text-white mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/20 text-white placeholder-white/50 transition-all outline-none backdrop-blur-sm resize-none"
                  placeholder="Add some details about your task..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 border border-white/10 backdrop-blur-sm group"
              >
                <Plus className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-300" />
                <span className="text-lg">Create Task</span>
              </button>
            </div>
          </form>

          {todos.length === 0 && (
            <div className="text-center py-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <ClipboardList className="w-20 h-20 text-white/40 mx-auto mb-6" />
              <p className="text-white/80 text-xl">
                Your task list is empty. Time to be productive!
              </p>
            </div>
          )}

          {/* Todo List */}
          <div className="grid grid-cols-2 gap-6 ">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 transform hover:-translate-y-1 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {todo.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {todo.description}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-white/60 hover:text-red-400 transition-colors duration-300 p-2 hover:bg-white/10 rounded-lg group"
                  >
                    <X className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
