<template>
  <div class="drag-component" ref="window_container" style="height: 800px">
    <VueDragResize
      v-for="(modal, index) in modals"
      v-show="modal.status"
      :key="index"
      :w="modal.width"
      :h="modal.height"
      :x="modal.left"
      :y="modal.top"
      :isActive="modal.active"
      :minw="modal.minw"
      :minh="modal.minh"
      :parentLimitation="true"
      :snapToGrid="true"
      :gridX="10"
      :gridY="10"
      :z="modal.zIndex"
      :isResizable="modal.resizable"
      contentClass="box-modal"
      @activated="activateWindow(index)"
      @deactivated="deactivateWindow(index)"
      @dragging="changePosition($event, index)"
      @dragstop="changeStop"
      @resizing="changePosition($event, index)"
      @resizestop="changeStop">
      <template v-if="modal.type !== 'return'">
        <div class="box-modal__header d-flex align-items-center">
          <h5 class="modal-title">Modal title {{modal.id}}</h5>
          <button type="button" class="close ml-auto" @click="deleteWindow(index)">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="box-modal__body">
          <p><b>Top:</b> {{ modal.top }} - <b>Left:</b> {{ modal.top }}</p>
        </div>
      </template>
      <template v-else>
        <div class="box-modal__body box-return">
          <a href="#"
             class="text-center"
             @click.prevent="returnWindow">
            +Return title to trading desk
          </a>
        </div>
      </template>
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'DragComponent',
  components: {
    VueDragResize,
  },
  data() {
    return {
      modals: [
        {
          id: 1,
          status: 1,
          type: 'window',
          width: 300,
          height: 100,
          top: 100,
          left: 100,
          minw: 150,
          minh: 100,
          zIndex: 1,
          active: false,
          resizable: true,
        },
        {
          id: 2,
          status: 1,
          type: 'window',
          width: 300,
          height: 100,
          top: 200,
          left: 700,
          minw: 150,
          minh: 100,
          zIndex: 1,
          active: false,
          resizable: true,
        },
        {
          id: 3,
          status: 1,
          type: 'window',
          width: 300,
          height: 100,
          top: 300,
          left: 100,
          minw: 150,
          minh: 100,
          zIndex: 1,
          active: false,
          resizable: true,
        },
        {
          id: 4,
          status: 1,
          type: 'window',
          width: 300,
          height: 100,
          top: 400,
          left: 700,
          minw: 150,
          minh: 100,
          zIndex: 1,
          active: false,
          resizable: true,
        },
        {
          id: 5,
          status: 1,
          type: 'return',
          width: 300,
          height: 100,
          top: 500,
          left: 100,
          minw: 150,
          minh: 100,
          zIndex: 1,
          active: false,
          resizable: false,
        },
      ],
      lastRemoveWindow: null,
    };
  },
  computed: {},
  methods: {
    setLocalStore() {
      const element = this.modals.filter((a) => a.status !== 0);
      if (typeof window.localStorage !== 'undefined') {
        localStorage.setItem('window_position', JSON.stringify(element));
      }
    },
    activateWindow(index) {
      for (let i = 0, l = this.modals.length; i < l; i += 1) {
        this.modals[i].active = false;
        this.modals[i].zIndex = 1;
        if (i === index) {
          this.modals[index].active = true;
          this.modals[index].zIndex = 99;
        }
      }
    },
    deactivateWindow(index) {
      this.modals[index].active = false;
      this.modals[index].zIndex = 1;
    },
    changePosition(e, index) {
      this.modals[index].top = e.top;
      this.modals[index].left = e.left;
      this.modals[index].width = e.width;
      this.modals[index].height = e.height;
    },
    changeStop() {
      this.setLocalStore();
    },
    deleteWindow(index) {
      this.lastRemoveWindow = index;
      this.modals[index].status = 0;
      this.setLocalStore();
    },
    returnWindow() {
      if (this.lastRemoveWindow === null) return;
      let calculateLeft = 0;
      let calculateTop = 0;
      const width = this.$refs.window_container.clientWidth;
      const height = this.$refs.window_container.clientHeight;
      this.modals[this.lastRemoveWindow].width = 300;
      setTimeout(() => {
        this.modals[this.lastRemoveWindow].height = 100;
      }, 1);
      setTimeout(() => {
        calculateLeft = (width / 2) - this.modals[this.lastRemoveWindow].width / 2;
        this.modals[this.lastRemoveWindow].left = calculateLeft;
      }, 2);
      setTimeout(() => {
        calculateTop = (height / 2) - this.modals[this.lastRemoveWindow].height / 2;
        this.modals[this.lastRemoveWindow].top = calculateTop;
        this.modals[this.lastRemoveWindow].status = 1;
      }, 3);
    },
  },
  created() {
    if (typeof window.localStorage !== 'undefined' && localStorage.getItem('window_position')) {
      this.modals = JSON.parse(localStorage.getItem('window_position'));
    }
    console.log('LoadDragComponent');
  },
};
</script>

<style scoped lang="scss">
.drag-component {
  position: relative;
  -webkit-box-shadow: 0 0 2px #aaa;
  box-shadow: 0 0 2px #aaa;
  background-color: #fff;
}
.box-modal {
  border: 1px solid #badbff;
  background-color: #ffffff;
  &__header {
    border-bottom: 1px solid #badbff;
    padding: 10px;
    cursor: move;
    background-color: #e1f0ff;
  }
  &__body {
    padding: 10px;
    text-align: center;
    &.box-return {
      cursor: move;
      text-align: center;
      height: 100%;
      display: flex;
      align-items: center;
      a {
        display: inline-block;
        padding: 10px 10px;
      }
    }
  }
}
</style>
