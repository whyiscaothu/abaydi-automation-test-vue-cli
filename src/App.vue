<template>
  <v-app>
    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
console.log('App.vue')

export default {
  name: 'App',
  components: {
    HelloWorld,
  },

  data () {
    return {

    }
  },
  methods: {
/*    increments() {
      this.$store.commit('increment');
    }*/
  },
  computed: {
    localComputed () {

    },
/*    ...mapState(
            // [
            //   'count'
            // ]

            {
              count: sssa => sssa.count,
              countAlias: 'count',
              countPlusState(state){
                return state.count + this.localCount;
              }
            }
    )*/
  }

};
</script>
