import { create } from "zustand";

type DiaryStore = {
    entries: string[];
    addEntry: (entry: string) => void;
};

export const useDiaryStore = create<DiaryStore>((set) => ({
    entries: [],
    addEntry: (entry: string) => {
        set((state) => ({
            entries: [...state.entries, entry],
        }));
    },
    removeEntry: () => {
        set((state) => ({
            entries: state.entries.slice(0, -1),
        }));
    },
}));