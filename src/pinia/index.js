import { defineStore } from "pinia";
export const usePiniaStore = defineStore("data", {
  state: () => {
    return {
      spin:false
    };
  },
  actions: {
    showFullLoading(){
      this.spin=true
      console.log(this.spin)
    },
    hideFullLoading(){
      this.spin=false
    },
  },
  getters: {},
});
