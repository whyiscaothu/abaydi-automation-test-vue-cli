<template>
  <v-card>
    <form action="" method="post" @submit.prevent="axiosPostData">
      <v-card-title>
        Nutrition
        <v-spacer></v-spacer>
        <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              hide-default-footer
      >
        <template v-slot:body>
          <tbody>
          <tr v-for="(item, index) in items" :key="item.name">
            <td :search="search">{{index + 1}}</td>
            <td :search="search">{{item.marketplace}}</td>
            <td :search="search">
              <a :href="'https://www.' + item.name" target="_blank">{{ item.name }}</a>
            </td>
            <td><v-switch :value="'https://www.' + item.name + '/apply-visa'" v-model="selected"></v-switch></td>
            <td><v-switch :value="'https://www.' + item.name + '/make-payment'" v-model="selected"></v-switch></td>
            <td><v-switch :value="'https://www.' + item.name + '/contact-us'" v-model="selected"></v-switch></td>
            <td>{{ item.version }}</td>
          </tr>
          </tbody>
        </template>
      </v-data-table>
      <p>{{selected}}</p>
      <p>hãy xóa tôi</p>
      <v-footer color="blue accent-2" fixed class="d-flex justify-space-between">
        <span>Tổng số domains: {{ countTotalItems }}</span>
        <span>Tổng số countries: {{ countTotalItems }}</span>
        <v-btn type="submit" class="px-12" color="blue-grey lighten-5">Submit</v-btn>
      </v-footer>
    </form>
  </v-card>
</template>


<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    methods: {
      axiosPostData () {
        this.$axios.post('http://localhost:3000/urls', {
          urls: this.$store.state.selected
        })
      }
    },
    computed: {
      selected: {
        get () {
          return this.$store.state.selected;
        },
        set (value) {
          this.$store.commit('selection', value)
        }
      },
      ...mapState([
              'items',
              'headers',
              'search',
      ]),
      ...mapGetters([
              'countTotalItems',
      ])
    },
    props: {
/*      selected: Array,
      search: String,
      headers: Array,
      items: Array*/
    },
    created() {
      this.$axios.post('http://localhost:3000/domains').then(({data}) => {
        this.$store.commit('initData', data);
      });
    }
  }
</script>