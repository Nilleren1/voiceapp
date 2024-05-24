import { create } from "zustand";

type Entry = {
  text: string;
  date: string;
};

type DiaryStore = {
  entries: Entry[];
  addEntry: (entryText: string) => void;
  removeEntry: (index: number) => void;
};

export const useDiaryStore = create<DiaryStore>((set) => ({
  entries:
    typeof window !== "undefined" // Check if we're in the browser environment
      ? JSON.parse(localStorage.getItem("entries") || "[]").map(
          (entry: any) => ({
            text: entry.text,
            date:
              entry.date && !isNaN(Date.parse(entry.date))
                ? new Date(entry.date).toISOString()
                : new Date().toISOString(),
          })
        )
      : [],
  addEntry: (entryText: string) => {
    set((state) => {
      const newEntry = { text: entryText, date: new Date().toISOString() };
      const newEntries = [...state.entries, newEntry];
      if (typeof window !== "undefined") {
        localStorage.setItem("entries", JSON.stringify(newEntries));
      }
      return { entries: newEntries };
    });
  },
  removeEntry: (index: number) => {
    set((state) => {
      const newEntries = [...state.entries];
      newEntries.splice(index, 1);
      if (typeof window !== "undefined") {
        localStorage.setItem("entries", JSON.stringify(newEntries));
      }
      return { entries: newEntries };
    });
  },
}));
