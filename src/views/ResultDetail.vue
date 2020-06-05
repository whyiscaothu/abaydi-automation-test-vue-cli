<template>
    <v-card>
        <form action="" method="post" @submit.prevent="axiosPostData">
            <v-card-title>
                Result Detail
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
              :headers="resultDetailHeaders"
              :items="items"
              hide-default-footer
              class="mb-12 pb-6"
            >
                <template v-slot:body>
                    <tbody>
                        <tr v-for="(item, index) in getTestResultDetail($route.params.id)" :key="index" v-if="!item.hide">
                            <td :search="search">{{index + 1}}</td>
                            <td :search="search">{{item.marketplace}}</td>
                            <td :search="search">
                                <a :href="'https://www.' + item.name" target="_blank">{{ item.name }}</a>
                            </td>


                            <td>{{item.resultOrder.orderId}}</td>
                            <td>{{item.resultOrder.paymentMethod}}</td>
                            <td>{{item.resultOrder.paymentStatus}}</td>
                            <td>
                                <v-chip
                                  class="ma-2"
                                  color="teal"
                                  text-color="white"
                                  v-if="item.resultOrder.orderId"
                                >
                                    <v-avatar left>
                                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                                    </v-avatar>
                                    Done
                                </v-chip>
                                <v-chip
                                  class="ma-2"
                                  color="orange"
                                  text-color="white"
                                  v-else
                                >
                                    <v-avatar left>
                                        <v-icon>mdi-cancel</v-icon>
                                    </v-avatar>
                                    Not Complete
                                </v-chip>
                            </td>


                            <td>
                                payment
                            </td>
                            <td>
                                contact
                            </td>
                            <!--      if/else block statement-->
                            <v-chip
                              class="ma-2"
                              color="blue darken-4"
                              text-color="white"
                              v-if="item.version === '2.1'">
                                {{ item.version }}
                            </v-chip>
                            <v-chip class="ma-2" color="blue darken-4" text-color="white" v-if="item.version === '2.2'">
                                {{ item.version }}
                            </v-chip>
                            <v-chip class="ma-2" color="red darken-2" text-color="white" v-if="item.version === '3.0'">
                                {{ item.version }}
                            </v-chip>
                            <v-chip class="ma-2" color="red darken-1" text-color="white" v-if="item.version === '4.0'">
                                {{ item.version }}
                            </v-chip>
                            <!--       End if/else block statement-->
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
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

                        <v-btn type="submit"  class="px-12 ml-5" color="blue-grey lighten-5">Submit</v-btn>
                    </div>
                </template>
            </v-footer>
        </form>
    </v-card>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';
    export default {
        data () {
            return {
                dialog: false,
            }
        },
        name: "Result",
        computed: {
            ...mapState([
                'testResults',
                'items',
                'resultDetailHeaders',
                'search',
                'selected',
                'testResults',
            ]),
            ...mapGetters([
                'countTotalItems',
                'countSelectedItems',
                'countMarketPlace',
            ])
        },
        methods: {
            getTestResultDetail (paramId) {
                let resultDetail = this.testResults.find(item => (+item.name) === (+paramId));
                return resultDetail.data;
            },
            axiosGetTestResult () {
                this.$axios.post('http://localhost:9009/test-result').then(({data}) => {
                    this.$store.commit('getTestResults', data )
                });
                return this.testResults;
            },
        },
        created() {
            this.$axios.post('http://localhost:9009/test-result').then(({data}) => {
                this.$store.dispatch('getTestResults', data )
            });
            return this.testResults;
        }
    };
</script>

<style scoped>

</style>