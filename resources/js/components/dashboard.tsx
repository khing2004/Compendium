import React, { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  Plus, 
  MoreVertical, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Edit2, 
  Trash2, 
  X,
  TrendingUp,
  Layout
} from 'lucide-react';

// --- Types ---
export interface Task {
  id: number;
  title: string;
  category: {
    name: string,
    color: string,
  };
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
  dueDate: string;
}

interface ChartDataPoint {
  name: string,
  tasks: number,
}

//Define props received from Laravel
export interface Props {
  initialTasks: Task[];
  chartData: ChartDataPoint[];
}

const CHART_DATA = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 3 },
  { name: 'Wed', tasks: 7 },
  { name: 'Thu', tasks: 5 },
  { name: 'Fri', tasks: 2 },
  { name: 'Sat', tasks: 6 },
  { name: 'Sun', tasks: 4 },
];

// Accept props here
const ProgressTracker = ({initialTasks, chartData}: Props) => {

  const tasks = initialTasks;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic',
    priority: 'Medium',
    dueDate: ''
  });

  // Derived Metrics
  const activeTasksCount = tasks.filter(t => t.status !== 'Done').length;
  const completedTasksCount = tasks.filter(t => t.status === 'Done').length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  // --- Handlers ---
  const handleOpenModal = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        category: task.category.name,
        priority: task.priority,
        dueDate: task.dueDate
      });
    } else {
      setEditingTask(null);
      setFormData({ title: '', category: 'Academic', priority: 'Medium', dueDate: '' });
    }
    setIsModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      // Update: Sending PUT request to Laravel
      router.put(`/task/${editingTask.id}`, formData, {
        onSuccess: () => setIsModalOpen(false),
      });
    } else {
      // Create
      router.post('/task', formData, {
        onSuccess: () => setIsModalOpen(false),
      });
    }

    console.log("Task saved");
  };

  const handleDeleteTask = (id: number) => {
    // SENDING DELETE REQUEST
    if (confirm('Are you sure you want to delete this task?')){
      router.delete(`/task/${id}`);
    }
  };

  const toggleStatus = (id: number) => {
    // TOGGLE: SEND PATCH REQUEST
    router.patch(`/task/${id}/toggle`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Compendium Weekly</h1>
            <p className="text-slate-500 flex items-center gap-2">
              <Layout size={18} />
              You have <span className="font-bold text-slate-800">{activeTasksCount} active tasks</span> this week.
            </p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus size={20} /> New Task
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Left Column: Stats & Chart --- */}
          <div className="space-y-6">
            
            {/* Progress Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Weekly Goal</h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">+12%</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-slate-900">{progressPercentage}%</span>
                <span className="text-slate-400 mb-1">completed</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Bar Chart Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[300px]">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={20} className="text-blue-600"/>
                <h3 className="font-bold text-lg">Productivity</h3>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    dy={10}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="tasks" radius={[6, 6, 6, 6]} barSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#2563eb' : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* --- Right Column: Task List --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">Current Tasks</h3>
                <button className="text-slate-400 hover:text-slate-600 text-sm font-medium">View All</button>
              </div>
              
              <div className="divide-y divide-slate-50">
                {tasks.map((task) => (
                  <div key={task.id} className="p-5 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <button 
                        onClick={() => toggleStatus(task.id)}
                        className={`mt-1 transition-colors ${task.status === 'Done' ? 'text-blue-600' : 'text-slate-300 hover:text-blue-600'}`}
                      >
                        {task.status === 'Done' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                      </button>
                      
                      <div>
                        <h4 className={`font-semibold text-slate-800 ${task.status === 'Done' ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span 
                          className="text-[10px] px-2 py-0.5 rounded font-bold uppercase text-slate-700 border border-slate-200"
                            style={{ 
                              backgroundColor: task.category.color,
                              color: `color-mix(in srgb, ${task.category.color}, black 70%)`
                            }}
                          >
                            {task.category.name}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar size={12} /> {task.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(task)}
                        className="p-2 text-slate-400 hover:bg-white hover:text-blue-600 rounded-lg hover:shadow-sm border border-transparent hover:border-slate-100"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-slate-400 hover:bg-white hover:text-red-500 rounded-lg hover:shadow-sm border border-transparent hover:border-slate-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {tasks.length === 0 && (
                  <div className="p-12 text-center text-slate-400">
                    <p>No tasks yet. Create one to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modal Overlay --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-bold mb-6">{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
            
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Task Title</label>
                <input 
                  autoFocus
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="e.g. Finish React Project"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option>Academic</option>
                    <option>Career</option>
                    <option>Health</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 text-slate-600"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                  onClick={handleSaveTask}
                >
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;