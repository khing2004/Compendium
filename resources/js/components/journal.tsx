import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { useForm, Head } from '@inertiajs/react';
import { 
    BookOpen, 
    Heart, 
    HelpCircle, 
    Quote, 
    Plus, 
    X, 
    Calendar,
    PenLine,
    Edit2,
    Trash2
} from 'lucide-react';
import { router } from '@inertiajs/react';

// --- Types ---
export interface JournalEntry {
    id: number;
    learning_journal: string;
    heart_journal: string;
    questions: string;
    quotes: string;
    created_at: string;
    display_date: string; 
}

// --- Mock Data (Static Content) ---
const MOCK_ENTRIES: JournalEntry[] = [
    {
        id: 1,
        display_date: 'Wednesday, Oct 25, 2024',
        created_at: '2024-10-25',
        learning_journal: 'Today I finally understood how React Context API works. It avoids prop drilling by creating a global state that any component can subscribe to.',
        heart_journal: 'I felt really frustrated in the morning when my code kept crashing, but overcoming that bug gave me a huge boost of confidence.',
        questions: 'Is Redux still worth learning in 2024, or is Context + Query enough?',
        quotes: '"First, solve the problem. Then, write the code." - John Johnson'
    },
    {
        id: 2,
        display_date: 'Tuesday, Oct 24, 2024',
        created_at: '2024-10-24',
        learning_journal: 'Deep dived into Laravel Eloquent relationships. The difference between hasMany and belongsTo is clearer now.',
        heart_journal: 'Feeling grateful for the mentorship I received today. It makes such a difference.',
        questions: 'How do I optimize database queries for n+1 problems automatically?',
        quotes: '"Simplicity is the soul of efficiency." - Austin Freeman'
    }
];

// Define props received from Laravel
export interface Props {
    entries: JournalEntry[];
}

// Accept props here
const JournalIndex = ({entries}: Props) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
    
    // We keep useForm for the UI, but we won't actually POST to a server yet
    const [ formData, setFormData ] = useState({
        learning_journal: '',
        heart_journal: '',
        questions: '',
        quotes: '',
    });

    // --- Handlers ---

    const handleSaveEntry = (e: React.FormEvent) => {
        e.preventDefault();
        
            // PUT REQUEST
        if (editingEntry) {
            router.put(`/journal-entry/${editingEntry.id}`, formData, {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            // POST REQUEST
            router.post('/journal-entry', formData, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDeleteEntry = (id: number) => {
        // DELETE REQUEST
        if (confirm('Are you sure you want to delete this entry?')){
            router.delete(`/journal-entry/${id}`);
        }
    };

    const handleOpenModal = (entries?: JournalEntry) => {
        if (entries) {
            setEditingEntry(entries);
            setFormData({
                learning_journal: entries.learning_journal,
                heart_journal: entries.heart_journal,
                questions: entries.questions,
                quotes: entries.quotes
            });
        } else {
            setEditingEntry(null);
            setFormData({ learning_journal: '', heart_journal: '', questions: '', quotes: ''});
        }
        setIsModalOpen(true);
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- Header --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Compendium Journal</h1>
                        <p className="text-slate-500 flex items-center gap-2">
                            <PenLine size={18} />
                            Document your learning, feelings, and curiosity.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95"
                    >
                        <Plus size={20} /> New Entry
                    </button>
                </header>

                {/* --- Journal Grid --- */}
                <div className="grid grid-cols-1 gap-8">
                    {/* Mapping to props for database connection */}
                    {entries.map((entry) => (
                        <div key={entry.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                            {/* Entry Date Header */}
                            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-2">
                                <Calendar className="text-slate-400" size={18} />
                                <h3 className="font-bold text-slate-700">{entry.display_date}</h3>

                                <div className='ml-auto flex items-center gap-2 opacity-0 hover:opacity-100 transition-opacity'>
                                    <button 
                                        onClick={() => handleOpenModal(entry)}
                                        className="p-2 text-slate-400 hover:bg-white hover:text-blue-600 rounded-lg hover:shadow-sm border border-transparent hover:border-slate-100"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteEntry(entry.id)}
                                        className="p-2 text-slate-400 hover:bg-white hover:text-red-500 rounded-lg hover:shadow-sm border border-transparent hover:border-slate-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            
                            
                            {/* The 4 Quadrants */}
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                
                                {/* 1. Learning (Blue) */}
                                <div className="p-6 space-y-3">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <BookOpen size={20} />
                                        <h4 className="font-bold text-sm uppercase tracking-wide">Learning</h4>
                                    </div>
                                    <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                                        {entry.learning_journal}
                                    </p>
                                </div>

                                {/* 2. Heart (Rose) */}
                                <div className="p-6 space-y-3">
                                    <div className="flex items-center gap-2 text-rose-500 mb-2">
                                        <Heart size={20} />
                                        <h4 className="font-bold text-sm uppercase tracking-wide">Heart</h4>
                                    </div>
                                    <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                                        {entry.heart_journal}
                                    </p>
                                </div>

                                {/* 3. Questions (Amber) */}
                                <div className="p-6 space-y-3 border-t md:border-t-0 border-slate-100">
                                    <div className="flex items-center gap-2 text-amber-500 mb-2">
                                        <HelpCircle size={20} />
                                        <h4 className="font-bold text-sm uppercase tracking-wide">Questions</h4>
                                    </div>
                                    <p className="text-slate-600 whitespace-pre-wrap leading-relaxed italic">
                                        {entry.questions}
                                    </p>
                                </div>

                                {/* 4. Quotes (Violet) */}
                                <div className="p-6 space-y-3 border-t md:border-t-0 border-slate-100">
                                    <div className="flex items-center gap-2 text-violet-600 mb-2">
                                        <Quote size={20} />
                                        <h4 className="font-bold text-sm uppercase tracking-wide">Quotes</h4>
                                    </div>
                                    <blockquote className="text-slate-600 whitespace-pre-wrap border-l-4 border-violet-200 pl-4 italic">
                                        {entry.quotes}
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    ))}

                    {entries.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                            <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-slate-900">Your journal is empty</h3>
                            <p className="text-slate-500">Start documenting your journey today.</p>
                        </div>
                    )}
                </div>
            </div>
    
        {/* --- Create Modal --- */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
                    
                    <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex justify-between items-center z-10">
                        <h2 className="text-xl font-bold text-slate-800">New Journal Entry</h2>
                        <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSaveEntry} className="p-6 space-y-6">
                        {/* Learning Input */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <BookOpen size={16} className="text-blue-600"/> What did you learn today?
                            </label>
                            <textarea
                                autoFocus
                                value={formData.learning_journal}
                                onChange={(e) => setFormData({...formData, learning_journal: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 min-h-[100px] transition-all"
                                placeholder="Summarize key concepts..."
                                required
                            />
                        </div>

                        {/* Heart Input */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                <Heart size={16} className="text-rose-500"/> How is your heart?
                            </label>
                            <textarea
                                value={formData.heart_journal}
                                onChange={(e) => setFormData({...formData, heart_journal: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 min-h-[80px] transition-all"
                                placeholder="Reflect on your emotions..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Questions Input */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                    <HelpCircle size={16} className="text-amber-500"/> Unanswered Questions
                                </label>
                                <textarea
                                    value={formData.questions}
                                    onChange={(e) => setFormData({...formData, questions: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 min-h-[100px] transition-all"
                                    placeholder="What are you curious about?"
                                    required
                                />
                            </div>

                            {/* Quotes Input */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                                    <Quote size={16} className="text-violet-600"/> Memorable Quotes
                                </label>
                                <textarea
                                    value={formData.quotes}
                                    onChange={(e) => setFormData({...formData, quotes: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 min-h-[100px] transition-all"
                                    placeholder="Note down powerful lines..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSaveEntry}
                                className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70"
                            >
                                {editingEntry ? 'Save Changes' : 'Create Entry'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
    );
};


export default JournalIndex;