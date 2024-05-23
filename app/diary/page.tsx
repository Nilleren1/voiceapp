"use client";
import Navbar from "@/app/components/navigation/navbar";
import { useDiaryStore } from "../store";

export default function Diary() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Entries />
    </div>
  );
}

const Entries = () => {
  const { entries, removeEntry } = useDiaryStore((state) => ({
    entries: state.entries,
    removeEntry: state.removeEntry,
  }));

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <h1 className="text-3xl font-bold mb-4">Diary</h1>
      <div className="flex flex-wrap justify-center">
        {entries.map((entry, index) => (
          <div key={index} className="w-full md:w-4/5 lg:w-1/3 p-2 min-w-64">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col justify-between items-center h-full">
                <span className="text-gray-500 mb-2">
                  {formatDate(new Date())}
                </span>
                <span className="text-center">{entry}</span>
                <button
                  onClick={() => removeEntry(index)}
                  className="bg-red-500 text-white rounded px-2 py-1 mt-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
