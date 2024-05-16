import { defineStore } from "pinia";
export const usePiniaStore = defineStore("data", {
  state: () => {
    return {
      spin:false,
      unreadNumber:0
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
    setNumber(number){
      this.unreadNumber=number
    }
  },
  getters: {},
});
