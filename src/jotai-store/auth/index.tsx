import { atom } from "jotai";

interface User {
  user: {
    id: string;
  };
}

export const userAtom = atom<User | null>(null);
