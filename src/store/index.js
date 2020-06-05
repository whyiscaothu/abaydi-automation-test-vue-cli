import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: [],
    search: '',
    homeHeaders: [
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
    resultDetailHeaders: [
      {
        text: 'No.',
        align: 'start',
        sortable: true,
        filterable: true,
        divider: true,
        width: 70
      },
      {
        text: 'Marketplace',
        align: 'start',
        sortable: true,
        filterable: true,
        divider: true,
        width: 150
      },
      {
        text: 'Domain',
        align: 'start',
        sortable: true,
        filterable: true,
        divider: true,
      },

      { text: 'Order ID', sortable: false, divider: true, width: 100 },
      { text: 'Payment Method', sortable: false, divider: true, width: 100 },
      { text: 'Payment Status', sortable: false, divider: true, width: 100 },

      { text: 'Order', sortable: false, divider: true, width: 100 },
      { text: 'Payment', sortable: false, divider: true, width: 100 },
      { text: 'Contact', sortable: false, divider: true, width: 100},
      { text: 'Version', sortable: true, divider: true, width: 100 },
    ],
    items: [],
    testResults: [
      {
        data: [
          {
            marketplace: '',
            name: '',
            version: '',
            resultOrder: {
              orderId: '',
              paymentMethod: '',
              paymentStatus: '',
            },
          }
        ],
        filename: '',
        name: '',
      }
    ],
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
    getTestResults (state, data) {
      state.testResults = data
    },
  },
  actions: {
    initData ({state}, value) {
      state.items = value;
    },
    getTestResults ({commit}, data) {
      commit('getTestResults', data)
    },
  },
  modules: {

  }
})
