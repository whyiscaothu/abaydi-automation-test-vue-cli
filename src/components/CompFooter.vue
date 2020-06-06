<template>
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

    <template>
      <div class="text-center d-flex">
        <v-row justify="center">
          <v-dialog v-model="dialog" width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="green" dark v-on="on" @click="axiosGetTestResult" class="ml-5">
                <v-icon color="white">mdi-eye </v-icon>
                Result
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Tested result history.</span>
              </v-card-title>
              <v-card-text>
                <ul>
                  <li v-for="(result, index) in testResults" :key="index">
                    {{result.name}}
                    <a :href="`/result/${result.name}`">
                      <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
                    </a>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>

        <v-btn type="submit" @click="onSubmitClick" class="px-12 ml-5" color="blue-grey lighten-5">Submit</v-btn>
      </div>
    </template>
  </v-footer>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    export default {
        name: "CompFooter",
        data () {
            return {
                dialog: false,
            }
        },
        computed: {
            ...mapState([
                'testResults',
            ]),
            ...mapGetters([
                'countTotalItems',
                'countSelectedItems',
                'countMarketPlace',
            ])
        },
        methods: {
            onSubmitClick () {
                //code goes here
                alert('đã submit')
            },
            axiosGetTestResult () {
                this.$axios.post('http://localhost:9009/test-result').then(({data}) => {
                    this.$store.commit('getTestResults', data )
                });
                return this.testResults;
            },
        },
    };
</script>

<style scoped>

</style>