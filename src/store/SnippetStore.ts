import { create } from 'zustand'

interface Snippet {
    name: string;
    code: string | null;
}

interface SnippetState {
    snippetNames: string[];
    selectedSnippet: Snippet | null;
    addSnippetName: (name: string) => void;
    setSnippetNames: (name: string[]) => void;
    setSelectedSnippet: (snippet: Snippet | null) => void;
    removeSnippetName: (name: string) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
    snippetNames: [],
    selectedSnippet: null,
    addSnippetName: (name) => 
        set((state) => ({
        snippetNames: [...state.snippetNames, name],
    })),
    setSnippetNames: (names) => set({ snippetNames: names }),
    setSelectedSnippet: (snippet) => set({selectedSnippet: snippet}),
    removeSnippetName: name => set(state => ({
        snippetNames: state.snippetNames.filter(n => n !== name)
    }))
}));