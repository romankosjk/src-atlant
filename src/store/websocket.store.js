import Vue from 'vue';

const state = {
  socket: {
    message: {},
    items: [],
    calculate: 0,
    isConnected: false,
    reconnectError: false,
  },
};

const getters = {};

const actions = {
  sendMessage({ commit }, message) {
    commit('SOCKET_SEND_MESSAGE', message);
  },
  reloadSocket({ commit }) {
    commit('SOCKET_RELOAD');
  },
};

const mutations = {
  SOCKET_ONMESSAGE(state, message) {
    state.socket.message = message;
    if (message.transaction && Object.keys(message.transaction).length) {
      if (state.socket.items.length >= 10) {
        state.socket.items.pop();
      }
      let sum = 0;
      message.transaction.inputs.forEach((val) => {
        sum += val.value;
      });
      state.socket.calculate += sum;
      state.socket.message.transaction.sum = sum;
      state.socket.message.transaction.addItem = true;
      state.socket.items.unshift(state.socket.message.transaction);
    }
  },
  SOCKET_ONOPEN(state, event) {
    console.log(`Connected to ${event.currentTarget.url}`);
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },
  SOCKET_ONCLOSE(state, event) {
    console.log(`Disconnected from ${event.currentTarget.url}`);
    state.socket.isConnected = false;
  },
  SOCKET_ONERROR(state, event) {
    console.error(state, event);
  },
  SOCKET_RECONNECT(state, count) {
    console.info(state, count);
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
  SOCKET_SEND_MESSAGE(state, message) {
    // eslint-disable-next-line no-unused-expressions
    state.socket.isConnected && Vue.prototype.$socket.sendObj(message);
  },
  SOCKET_RELOAD(state) {
    // eslint-disable-next-line no-unused-expressions
    state.socket.items = [];
    state.socket.calculate = 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
