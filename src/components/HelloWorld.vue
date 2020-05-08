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
      <p>hãy xóa tôi</p>
      <v-footer color="blue accent-2" fixed class="d-flex justify-space-between">

        <span>
          <v-badge color="green lighten-1" overlap :content="countTotalItems" v-if="countTotalItems" :key="countTotalItems">
            <v-chip class="ma-2">Domains</v-chip>
          </v-badge>
          <span v-else :key="countTotalItems">
            <v-chip class="ma-2">Domains</v-chip>
          </span>
        </span>
        <span>
          <v-badge color="green lighten-1" overlap :content="countTotalItems" v-if="countTotalItems" :key="">
            <v-chip class="ma-2">Market Place</v-chip>
          </v-badge>
          <span v-else :key="">
            <v-chip class="ma-2">Market Place</v-chip>
          </span>
        </span>

        <span>
          <v-badge color="orange" overlap :content="countSelectedItems" v-if="countSelectedItems" :key="selected">
            <v-chip class="ma-2">Selected</v-chip>
          </v-badge>
          <span v-else :key="selected">
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
              'countSelectedItems',
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