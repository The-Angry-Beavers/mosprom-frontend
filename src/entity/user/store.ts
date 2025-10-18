
import { create } from 'zustand';
import type { IUser } from './type';

type State = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  removeUser: () => void;
};

export const useAuth = create<State>((set) => ({
  removeUser: () => set({ user: {} as IUser }),
  setUser: (user: IUser) => set({ user }),
  user: null,
}));
