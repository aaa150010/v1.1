import { createStore } from "vuex";

export default createStore({
  state: {
    nodeConfig: {
      visible: false,
      title: "",
      type: "",
      selectRow: {},
      nodeForm: {},
    },
    loading: false,
  },
  mutations: {
    setNodeConfig(state, nodeConfig) {
      state.nodeConfig = { ...state.nodeConfig, ...nodeConfig };
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {},
  modules: {},
});
