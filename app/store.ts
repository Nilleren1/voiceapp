import { create } from "zustand";

type DiaryStore = {
  entries: string[];
  addEntry: (entry: string) => void;
  removeEntry: (index: number) => void;
};

export const useDiaryStore = create<DiaryStore>((set) => ({
  entries: JSON.parse(localStorage.getItem("entries") || "[]"),
  addEntry: (entry: string) => {
    set((state) => {
      const newEntries = [...state.entries, entry];
      localStorage.setItem("entries", JSON.stringify(newEntries));
      return { entries: newEntries };
    });
  },
  removeEntry: (index: number) => {
    set((state) => {
      const newEntries = [...state.entries];
      newEntries.splice(index, 1);
      localStorage.setItem("entries", JSON.stringify(newEntries));
      return { entries: newEntries };
    });
  },
}));
