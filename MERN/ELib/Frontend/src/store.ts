import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTokenStore = create(
  persist(
    (set) => ({
      token: "",
      setToken: (token: string) => set({ token: token }),
    }),
    {
      name: "token-store",
    }
  )
);

export default useTokenStore;
