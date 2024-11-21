Vue.component("add", {
  template: "#add",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    add() {
      if (this.value) {
        this.$store.dispatch("add", this.value);
        this.value = '';
      }
    },
  },
});

Vue.component("list", {
  template: "#list",
  data() {
    return {
      list: [],
      newValue: "",
    };
  },
  methods: {
    del(key) {
      this.$store.dispatch("del", key);
    },
    edit(key) {
      this.list[key].isShow = true;
      this.newValue = this.list[key].info;
      setTimeout(() => {
        this.$refs.ipt[key].focus();
      }, 1);
    },
    blur(key) {
      this.$store.dispatch({
        type: "edit",
        value: {
          id: key,
          info: this.newValue,
          isShow: false,
        },
        key: key,
      });
    },
  },
  created() {
    this.list = this.$store.state.list;
  },
  updated() {
    let str = JSON.stringify(this.list);
    localStorage.setItem('Todos', str);
  }
});

const store = new Vuex.Store({
  state: {
    list: [],
  },
  mutations: {
    add(state, value) {
      state.list.push({
        id: state.list.length,
        info: value,
        isShow: false,
        done: false,
      });
    },
    del(state, key) {
      state.list.splice(key, 1);
    },
    edit(state, payload) {
      state.list.splice(payload.key, 1, payload.value);
    },
  },
  actions: {
    add({ commit }, value) {
      commit("add", value);
    },
    del({ commit }, key) {
      commit("del", key);
    },
    edit({ commit }, payload) {
      commit("edit", payload);
    },
  },
});

var vm = new Vue({
  el: "#app",
  store,
  created() {
    let str = localStorage.getItem('Todos');
    if (str) {
      let dataobj = JSON.parse(str);
      this.$store.state.list = dataobj;
    }
  }
});
