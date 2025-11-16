import create from 'zustand';
import { persist } from 'zustand/middleware';

const AdminStore = create(persist(
  (set) => ({
    adminSessionId: -1,
    setAdminSessionId: (id) => set({ adminSessionId: id }),
  }),
  {
    name: 'admin-session-storage', // name of the storage item
    storage: sessionStorage, // or localStorage
  }
));
export default AdminStore;
