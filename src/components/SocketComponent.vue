<template>
  <div class="socket-component" style="min-height: 500px">
    <div class="row">
      <div class="col-12 d-flex justify-content-around btc-button">
        <a href="#" @click.prevent="onSubscribe" class="btn btn-success">Запуск</a>
        <a href="#" @click.prevent="onUnsubscribed" class="btn btn-danger">Остановка</a>
        <a href="#" @click.prevent="onSubscribeReload" class="btn btn-warning">Сброс</a>
      </div>
      <div class="col-12">
        <div class="btc-sum w-100">Сумма: {{calculate / 100000000}} BTC</div>
      </div>

      <div class="col-12">
        <table class="table w-100">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Sum</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(transaction, index) in message"
              :key="index" >
            <th scope="row" class="index">{{ index + 1 }}</th>
            <td>
              <p v-for="(item, index) in transaction.inputs" :key="index">
                {{ item.address }}
              </p>
            </td>
            <td>
              <p v-for="(item, index) in transaction.out" :key="index">
                {{ item.addr }}
              </p>
            </td>
            <td>
              {{transaction.sum / 100000000}} BTC
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocketComponent',
  data() {
    return {
      coins: [],
      calcSum: 0,
    };
  },
  computed: {
    message() {
      return this.$store.state.websocket.socket.items;
    },
    calculate() {
      return this.$store.state.websocket.socket.calculate;
    },
    isConnected() {
      return this.$store.state.websocket.socket.isConnected;
    },
  },
  methods: {
    onSubscribe() {
      this.$store.dispatch('sendMessage', { coin: 'btc', command: 'subscribe', entity: 'pending_transaction' });
    },
    onUnsubscribed() {
      this.$store.dispatch('sendMessage', { coin: 'btc', command: 'unsubscribe', entity: 'pending_transaction' });
    },
    onSubscribeReload() {
      this.$store.dispatch('sendMessage', { coin: 'btc', command: 'unsubscribe', entity: 'pending_transaction' });
      this.$store.dispatch('reloadSocket');
      setTimeout(() => {
        this.$store.dispatch('sendMessage', { coin: 'btc', command: 'subscribe', entity: 'pending_transaction' });
      }, 100);
    },
  },
  mounted() {
    this.$connect();
    console.log('LoadSocketComponent');
  },
  beforeDestroy() {
    this.$disconnect();
  },
};
</script>

<style scoped lang="scss">
.socket-component {
  position: relative;
  -webkit-box-shadow: 0 0 2px #aaa;
  box-shadow: 0 0 2px #aaa;
  background-color: #fff;
  .btc-sum {
    padding: 20px 0;
    font-size: 30px;
    text-align: center;
  }
  .btc-button {
    padding: 20px 0;
  }
  table {
    tr:first-child {
      td {
        background-color: #e1f0ff;
      }
    }
    td {
      font-size: 12px;
      p {
        margin-bottom: 1px;
      }
    }
    th.index {
      width: 50px;
    }
  }
}
</style>
