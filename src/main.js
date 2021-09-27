import Vue from 'vue';
// import VueSocketIO from 'vue-socket.io';
// import SocketIO from 'socket.io-client';
import VueNativeSock from 'vue-native-websocket';
import store from './store';

import App from './App.vue';
import './assets/style/main.scss';

Vue.config.productionTip = false;

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'wss://ws.blockchain.info/inv',
// }));
Vue.use(VueNativeSock, 'wss://ws.blockchain.info/coins', {
  store,
  format: 'json',
  connectManually: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 5000,
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
