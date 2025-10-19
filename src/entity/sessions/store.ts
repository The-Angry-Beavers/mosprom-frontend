import { create } from 'zustand';

type SessionType = {
  session: {
    id: number;
    user_id: string;
    table_id: number;
    created_at: string;
    expires_at: string;
    is_closed: boolean;
  } | null;

  setSession: (session: any) => void;
  deleteSession: () => void;
};

export const useSession = create<SessionType>((set) => ({
  session: null,
  setSession: (session: any) => set({ session }),
  deleteSession: () => set({ session: null }),
}));
