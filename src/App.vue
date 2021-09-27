<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <ul class="navigation d-flex justify-content-center">
            <li><a href="#drag-component">Drag Window</a></li>
            <li><a href="#socket-component">Socket Component</a></li>
<!--            <li><a href="#" @click.prevent="loadDrag = !loadDrag">test</a></li>-->
<!--            <li><a href="#" @click.prevent="loadSocket = !loadSocket">test2</a></li>-->
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div id="drag-component" style="min-height: 800px">
            <DragComponent/>
<!--            <observer @on-change="onChangeDrag">-->
<!--              <DragComponent/>-->
<!--            </observer>-->
          </div>
          <div style="height:500px"></div>
          <div id="socket-component" style="min-height: 500px">
            <SocketComponent/>
<!--            <observer @on-change="onChangeSocket">-->
<!--              <SocketComponent/>-->
<!--            </observer>-->
          </div>
          <div style="height:200px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Observer from 'vue-intersection-observer';
import LoadComponent from './utils/lazy-load-component';
import LoadEmulation from './components/Load/LoadEmulation';

export default {
  name: 'App',
  components: {
    // Observer,
    // DragComponent: () => import('./components/DragComponent'),
    // SocketComponent: () => import('./components/SocketComponent'),
    DragComponent: LoadComponent({
      componentFactory: () => import('./components/DragComponent'),
      loading: LoadEmulation,
    }),
    SocketComponent: LoadComponent({
      componentFactory: () => import('./components/SocketComponent'),
      loading: LoadEmulation,
    }),
  },
  data() {
    return {
      loadDrag: true,
      loadSocket: false,
    };
  },
  methods: {
    // onChangeDrag(entry) {
    //   // if (entry.isIntersecting) {
    //   //   unobserve();
    //   // }
    //   console.log(entry.isIntersecting, 1);
    // },
    // onChangeSocket(entry) {
    //   // if (entry.isIntersecting) {
    //   //   unobserve();
    //   // }
    //   console.log(entry.isIntersecting, 2);
    // },
  },
};
</script>

<style lang="scss">
body {
  background-color: #eaeaea!important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.navigation {
  padding: 0;
  margin: 0;
  list-style: none;
  a {
    display: inline-block;
    padding: 10px 20px;
    margin: 0 10px;
  }
}
</style>
