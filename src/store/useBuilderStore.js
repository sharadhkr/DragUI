import { create } from "zustand";

export const useBuilderStore = create((set) => ({
  components: [],
  selectedId: null,

  addComponent: (comp) =>
    set((state) => ({
      components: [...state.components, comp],
    })),

  selectComponent: (id) =>
    set({ selectedId: id }),

  updateProps: (id, newProps) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, props: { ...c.props, ...newProps } } : c
      ),
    })),
}));