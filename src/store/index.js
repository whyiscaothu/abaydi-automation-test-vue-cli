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
    items: [
      {
        name: 'https://www.indiavisagov.in',
        order: `https://www.indiavisagov.in/apply-visa`,
        payment: `https://www.indiavisagov.in/make-payment`,
        contact: `https://www.indiavisagov.in/contact-us`,
        version: 4.0,
        active: true,
      },
      {
        name: 'https://www.indian-visagov.com',
        order: `https://www.indian-visagov.com/apply-visa`,
        payment: `https://www.indian-visagov.com/make-payment`,
        contact: `https://www.indian-visagov.com/contact-us`,
        version: 4.3,
        active: true,
      },
      {
        name: 'https://www.indianevisaonline.org',
        order: `https://www.indianevisaonline.org/apply-visa`,
        payment: `https://www.indianevisaonline.org/make-payment`,
        contact: `https://www.indianevisaonline.org/contact-us`,
        version: 6.0,
        active: true,
      },
      {
        name: 'https://www.indianvisagov.asia',
        order: `https://www.indianvisagov.asia/apply-visa`,
        payment: `https://www.indianvisagov.asia/make-payment`,
        contact: `https://www.indianvisagov.asia/contact-us`,
        version: 4.3,
        active: true,
      },
      {
        name: 'https://www.indianvisagov.in',
        order: `https://www.indianvisagov.in/apply-visa`,
        payment: `https://www.indianvisagov.in/make-payment`,
        contact: `https://www.indianvisagov.in/contact-us`,
        version: 3.9,
        active: true,
      },
      {
        name: 'https://www.indianvisagov.org.in',
        order: `https://www.indianvisagov.org.in/apply-visa`,
        payment: `https://www.indianvisagov.org.in/make-payment`,
        contact: `https://www.indianvisagov.org.in/contact-us`,
        version: 0.0,
        active: true,
      },
      {
        name: 'https://www.indiavisagov.org.in',
        order: `https://www.indiavisagov.org.in/apply-visa`,
        payment: `https://www.indiavisagov.org.in/make-payment`,
        contact: `https://www.indiavisagov.org.in/contact-us`,
        version: 0,
        active: true,
      },
      {
        name: 'https://www.indianonlinevisa.org.in',
        order: `https://www.indianonlinevisa.org.in/apply-visa`,
        payment: `https://www.indianonlinevisa.org.in/make-payment`,
        contact: `https://www.indianonlinevisa.org.in/contact-us`,
        version: 6.5,
        active: true,
      },
      {
        name: 'https://www.indiavisagov.asia',
        order: `https://www.indiavisagov.asia/apply-visa`,
        payment: `https://www.indiavisagov.asia/make-payment`,
        contact: `https://www.indiavisagov.asia/contact-us`,
        version: 4.9,
        active: true,
      },
      {
        name: 'https://www.indianvisagov.co.in',
        order: `https://www.indianvisagov.co.in/apply-visa`,
        payment: `https://www.indianvisagov.co.in/make-payment`,
        contact: `https://www.indianvisagov.co.in/contact-us`,
        version: 7,
        active: true,
      },
      {
        name: 'https://www.indianvisagovweb.org',
        order: `https://www.indianvisagovweb.org/apply-visa`,
        payment: `https://www.indianvisagovweb.org/make-payment`,
        contact: `https://www.indianvisagovweb.org/contact-us`,
        version: 7,
        active: true,
      },
      {
        name: 'https://www.visaindianonline.org',
        order: `https://www.visaindianonline.org/apply-visa`,
        payment: `https://www.visaindianonline.org/make-payment`,
        contact: `https://www.visaindianonline.org/contact-us`,
        version: 0.0,
        active: true,
      },
      {
        name: 'https://www.indiavisagov.co.in',
        order: `https://www.indiavisagov.co.in/apply-visa`,
        payment: `https://www.indiavisagov.co.in/make-payment`,
        contact: `https://www.indiavisagov.co.in/contact-us`,
        version: 0,
        active: true,
      },
      {
        name: 'https://www.evisaindian.in',
        order: `https://www.evisaindian.in/apply-visa`,
        payment: `https://www.evisaindian.in/make-payment`,
        contact: `https://www.evisaindian.in/contact-us`,
        version: 4.9,
        active: true,
      },
      {
        name: 'https://www.evisaindiangov.in',
        order: `https://www.evisaindiangov.in/apply-visa`,
        payment: `https://www.evisaindiangov.in/make-payment`,
        contact: `https://www.evisaindiangov.in/contact-us`,
        version: 7,
        active: true,
      },
      {
        name: 'https://www.visaindiagov.co.in',
        order: `https://www.visaindiagov.co.in/apply-visa`,
        payment: `https://www.visaindiagov.co.in/make-payment`,
        contact: `https://www.visaindiagov.co.in/contact-us`,
        version: 7,
        active: true,
      },
      {
        name: 'https://www.visaindian.co.in',
        order: `https://www.visaindian.co.in/apply-visa`,
        payment: `https://www.visaindian.co.in/make-payment`,
        contact: `https://www.visaindian.co.in/contact-us`,
        version: 7,
        active: true,
      },
      {
        name: 'https://www.visaonlineindia.co.in',
        order: `https://www.visaonlineindia.co.in/apply-visa`,
        payment: `https://www.visaonlineindia.co.in/make-payment`,
        contact: `https://www.visaonlineindia.co.in/contact-us`,
        version: 7,
        active: true,
      },
      {
        name: 'https://www.evisaindia.co.in',
        order: `https://www.evisaindia.co.in/apply-visa`,
        payment: `https://www.evisaindia.co.in/make-payment`,
        contact: `https://www.evisaindia.co.in/contact-us`,
        version: 0.0,
        active: true,
      },
      {
        name: 'https://www.evisaindian.co.in',
        order: `https://www.evisaindian.co.in/apply-visa`,
        payment: `https://www.evisaindian.co.in/make-payment`,
        contact: `https://www.evisaindian.co.in/contact-us`,
        version: 0,
        active: true,
      },
      {
        name: 'https://www.indianevisa.co.in',
        order: `https://www.indianevisa.co.in/apply-visa`,
        payment: `https://www.indianevisa.co.in/make-payment`,
        contact: `https://www.indianevisa.co.in/contact-us`,
        version: 6.5,
        active: true,
      },
      {
        name: 'https://www.indiavisagovt.com',
        order: `https://www.indiavisagovt.com/apply-visa`,
        payment: `https://www.indiavisagovt.com/make-payment`,
        contact: `https://www.indiavisagovt.com/contact-us`,
        version: 4.9,
        active: true,
      },
      {
        name: 'https://www.myanmarvisagov.asia',
        order: `https://www.myanmarvisagov.asia/apply-visa`,
        payment: `https://www.myanmarvisagov.asia/make-payment`,
        contact: `https://www.myanmarvisagov.asia/contact-us`,
        version: 7,
        active: true,
      },
      {
        name: 'https://www.myanmarvisagov.org.in',
        order: `https://www.myanmarvisagov.org.in/apply-visa`,
        payment: `https://www.myanmarvisagov.org.in/make-payment`,
        contact: `https://www.myanmarvisagov.org.in/contact-us`,
        version: 7,
        active: true,
      },
      {
        name: 'https://www.canadavisagov.com',
        order: `https://www.canadavisagov.com/apply-visa`,
        payment: `https://www.canadavisagov.com/make-payment`,
        contact: `https://www.canadavisagov.com/contact-us`,
        version: 3,
        active: true,
      },
    ],
  },
  getters: {
    countTotalItems: state => {
      return state.items.length;
    }
  },
  mutations: {
    selection (state, value) {
      state.selected = value;
    }
  },
  actions: {

  },
  modules: {

  }
})
