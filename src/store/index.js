import Vue from 'vue'
import Vuex from 'vuex'
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
      let selected = 0;
      for (let item of state.items) {
        if (item.run_order) {
          selected++
        }
        if (item.run_payment) {
          selected++
        }
        if (item.run_contact) {
          selected++
        }
      }
      return selected;
    },
    countMarketPlace: state => {
      let tmpArr = [];
      for (let item of state.items) {
        tmpArr.push(item.marketplace)
      }
      let unique = [...new Set(tmpArr)];
      return unique.length;
    },
  },
  mutations: {
    selection (state, value) {
      state.selected = value;
    },
  },
  actions: {
    initData ({state}, value) {
      state.items = value;
    },
  },
  modules: {

  }
})
