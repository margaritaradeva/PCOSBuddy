import { create } from "zustand";


const useGlobally = create((set, get) => ({

    // Initialisation
    authenticated:false,
    initialised: false,
    init: false,

    init: () => {
        set({ initialised: false });
        setTimeout(() => {
            set({ initialised: true });
        }, 1000);
    },
   
}))

export default useGlobally;