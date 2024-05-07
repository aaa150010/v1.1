import { createStore } from "vuex";

export default createStore({
  state: {
    nodeConfig: { visible: false, title: "新增子任务", type: "add" },
  },
  mutations: {
    setNodeConfig(state, nodeConfig) {
      state.nodeConfig = { ...state.nodeConfig, ...nodeConfig };
    },
  },
  actions: {},
  modules: {},
});
