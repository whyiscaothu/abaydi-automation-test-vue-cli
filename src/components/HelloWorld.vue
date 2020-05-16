<template>
  <v-card>
    <form action="" method="post" @submit.prevent="axiosPostData">
      <v-data-table
              dark
              :headers="headers"
              :items="items"
              hide-default-footer
      >
        <template v-slot:body>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td :search="search">{{index + 1}}</td>
              <td :search="search">{{item.marketplace}}</td>
              <td :search="search">
                <a :href="'https://www.' + item.name" target="_blank">{{ item.name }}</a>
              </td>
              <td><v-switch v-model="item.run_order"></v-switch></td>
              <td><v-switch v-model="item.run_payment"></v-switch></td>
              <td><v-switch v-model="item.run_contact"></v-switch></td>
  <!--      if/else block statement-->
              <v-chip class="ma-2" color="blue darken-4" text-color="white" v-if="item.version === '2.1'">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ item.version }}
              </v-chip>
              <v-chip class="ma-2" color="blue darken-4" text-color="white" v-if="item.version === '2.2'">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ item.version }}
              </v-chip>
              <v-chip class="ma-2" color="red darken-2" text-color="white" v-if="item.version === '3.0'">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ item.version }}
              </v-chip>
              <v-chip class="ma-2" color="red darken-1" text-color="white" v-if="item.version === '4.0'">
                <v-avatar left>
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                {{ item.version }}
              </v-chip>
  <!--       End if/else block statement-->
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <p>{{selected}}</p>
      <p>hãy xóa tôi</p>
      <v-footer color="blue accent-2" fixed class="d-flex justify-space-between">

        <span>
          <v-badge color="green lighten-1" overlap :content="countTotalItems" v-if="countTotalItems">
            <v-chip class="ma-2">Domains</v-chip>
          </v-badge>
          <span v-else>
            <v-chip class="ma-2">Domains</v-chip>
          </span>
        </span>
        <span>
          <v-badge color="green lighten-1" overlap :content="countMarketPlace" v-if="countMarketPlace">
            <v-chip class="ma-2">Market Place</v-chip>
          </v-badge>
          <span v-else>
            <v-chip class="ma-2">Market Place</v-chip>
          </span>
        </span>

        <span>
          <v-badge color="orange" overlap :content="countSelectedItems" v-if="countSelectedItems">
            <v-chip class="ma-2">Selected</v-chip>
          </v-badge>
          <span v-else>
            <v-chip class="ma-2">Selected</v-chip>
          </span>
        </span>
        <v-btn type="submit" class="px-12" color="blue-grey lighten-5">Submit</v-btn>
      </v-footer>
    </form>
  </v-card>
</template>


<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        selectedItems: []
      }
    },
    methods: {
      axiosPostData () {
        let dataSubmit = this.items;
        dataSubmit = dataSubmit.filter((item) => (item.run_order || item.run_order || item.run_order));
        this.$axios.post('http://localhost:9009/data-submit', {
          dataSubmit
        })
      },
    },
    computed: {
      selected: {
        get () {
          return this.$store.state.selected;
        },
        set (value) {
          console.log(value);
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
              'countSelectedItems',
              'countMarketPlace',
      ])
    },
    created() {
      this.$axios.post(`http://localhost:9009/domains`).then(({data}) => {
        for(let item of data){
          item.run_order = false;
          item.run_payment = false;
          item.run_contact = false;
        }
        this.$store.dispatch('initData', data);
      });
    }
  }
</script>