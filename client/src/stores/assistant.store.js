import { create } from "zustand";

const useAssistantStore = create((set) => ({

    messages: [],

    input: "",

    loading: false,

    error: null,

    setMessages: (messages) =>
        set((state) => ({
            messages:
                typeof messages === "function"
                    ? messages(state.messages)
                    : messages,
        })),

    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),

    setInput: (input) =>
        set({ input }),

    setLoading: (loading) =>
        set({ loading }),

    setError: (error) =>
        set({ error }),

    clearChat: () =>
        set({
            messages: [],
            input: "",
            loading: false,
            error: null,
        }),

}));

export default useAssistantStore;