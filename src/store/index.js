import Vue from 'vue'
import Vuex from 'vuex'

console.log('store/index.js')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: [],
    search: '',
    headers: [
      {
        text: 'No.',
        align: 'start',
        sortable: true,
        filterable: true,
        divider: true,
        value: 'no',
        width: 70
      },
      {
        text: 'Marketplace',
        align: 'start',
        sortable: true,
        filterable: true,
        divider: true,
        value: 'marketplace',
        width: 150
      },
      {
        text: 'Domain',
        align: 'start',
        sortable: true,
        filterable: true,
        divider: true,
        value: 'name',
      },
      { text: 'Order', value: 'order',sortable: false, divider: true, width: 100 },
      { text: 'Payment', value: 'payment',sortable: false, divider: true, width: 100 },
      { text: 'Contact', value: 'contact',sortable: false, divider: true, width: 100},
      { text: 'Version', value: 'version',sortable: true, divider: true, width: 100 },
    ],
    items: [],
  },
  getters: {
    countTotalItems: state => {
      return state.items.length;
    },
    countSelectedItems: state => {
      return state.selected.length;
    }
  },
  mutations: {
    selection (state, value) {
      state.selected = value;
    },
    initData (state, value) {
      state.items = value;
    }
  },
  actions: {

  },
  modules: {

  }
})
