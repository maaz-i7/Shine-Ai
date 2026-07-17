import { create } from "zustand";

const useWorkspaceStore = create((set) => ({
    workspace: null,

    setWorkspace: (workspace) =>
        set({ workspace }),

    clearWorkspace: () =>
        set({ workspace: null }),

    updateUserCode: (userCode) =>
        set((state) => {
            if (!state.workspace) return state;

            return {
                workspace: {
                    ...state.workspace,
                    userCode,
                },
            };
        }),
}));

export default useWorkspaceStore;