<template>
  <v-card>
    <form action="" @submit.prevent="">
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
          <tr v-for="item in items" :key="item.name" v-if="item.active">
            <td :search="search">{{ item.name }}</td>
            <td><v-switch :value="item.order" v-model="selected"></v-switch></td>
            <td><v-switch :value="item.payment" v-model="selected"></v-switch></td>
            <td><v-switch :value="item.contact" v-model="selected"></v-switch></td>
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
        <v-btn class="px-12" color="blue-grey lighten-5">Submit</v-btn>
      </v-footer>
    </form>
  </v-card>
</template>


<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
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
    }
  }
</script>