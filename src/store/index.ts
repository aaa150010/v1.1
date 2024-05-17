import { createStore } from "vuex";

export default createStore({
  state: {
    nodeConfig: {
      visible: false,
      title: "",
      type: "",
      selectRow: {},
    },
    loading: false,
    personInfoConfig: {
      visible: false,
      userId: "",
    },
  },
  mutations: {
    setNodeConfig(state, nodeConfig) {
      state.nodeConfig = { ...state.nodeConfig, ...nodeConfig };
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setPersonInfoConfig(state, personInfoConfig) {
      state.personInfoConfig = {
        ...state.personInfoConfig,
        ...personInfoConfig,
      };
    },
  },
  actions: {},
  modules: {},
});
