<template>
  <v-card>
    <form action="" method="post" @submit.prevent="axiosPostData">
      <v-card-title>
        Domain
        <v-spacer></v-spacer>
      </v-card-title>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <v-select
                    v-model="marketplaceSelect"
                    :items="marketplaceItems"
                    v-on:change="changeFilter"
                    label="Marketplace"
                    multiple
                    dense
                    outlined
            >
              <template v-slot:prepend-item>
                <v-list-item
                        ripple
                        @click="toggleFilterMarketplace"
                >
                  <v-list-item-action>
                    <v-icon :color="marketplaceSelect.length > 0 ? 'indigo darken-4' : ''">{{ iconFilterMarketplace }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Select All</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <v-chip v-if="index === 1">
                  <span>{{ item }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="grey--text caption"
                >(+{{ marketplaceSelect.length - 2 }} others)</span>
              </template>
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select
                    v-model="versionSelect"
                    :items="versionItems"
                    v-on:change="changeFilter"
                    label="Version"
                    multiple
                    dense
                    outlined
            >
              <template v-slot:prepend-item>
                <v-list-item
                        ripple
                        @click="toggleFilterVersion"
                >
                  <v-list-item-action>
                    <v-icon :color="versionSelect.length > 0 ? 'indigo darken-4' : ''">{{ iconFilterVersion }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Select All</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <v-chip v-if="index === 1">
                  <span>{{ item }}</span>
                </v-chip>
                <span
                        v-if="index === 2"
                        class="grey--text caption"
                >(+{{ versionSelect.length - 2 }} others)</span>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table
              :headers="headers"
              :items="items"
              hide-default-footer
      >
        <template v-slot:body>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" v-if="!item.hide">
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
                        {{result.filename}}
                        <a :href="`result/${result.filename}`">
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
    </form>
  </v-card>
</template>


<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        selectedItems: [],
        marketplaceSelect: [],
        marketplaceItems: [],
        versionSelect: [],
        versionItems: [],
        dialog: false,
      }
    },
    methods: {
      axiosPostData () {
        let dataSubmit = this.items;
        dataSubmit = dataSubmit.filter((item) => (item.run_order || item.run_order || item.run_order));
        if (dataSubmit.length) {
          this.$axios.post('http://localhost:9009/data-submit', {
            dataSubmit
          }).then(function (response) {
            alert('Đã chạy thành công: ' + response.data.length);
            console.log(response.data);
          })
        }
      },
      axiosGetTestResult () {
        this.$axios.post('http://localhost:9009/test-result').then(({data}) => {
          this.$store.commit('getTestResults', data )
        });
        return this.testResults;
      },
      toggleFilterMarketplace () {
        this.$nextTick(() => {
          if (this.marketplaceSelect.length === this.marketplaceItems.length) {
            this.marketplaceSelect = []
          } else {
            this.marketplaceSelect = this.marketplaceItems.slice()
          }
          this.changeFilter();
        })
      },
      toggleFilterVersion () {
        this.$nextTick(() => {
          if (this.versionSelect.length === this.versionItems.length) {
            this.versionSelect = []
          } else {
            this.versionSelect = this.versionItems.slice()
          }
          this.changeFilter();
        })
      },
      changeFilter() {
        let versionSelected = this.versionSelect;
        let marketplaceSelectSelected = this.marketplaceSelect;

        for (let item of this.items){
          item.hide = true;
          for(let itemMarketplaceSelected of marketplaceSelectSelected){
            if(itemMarketplaceSelected === item.marketplace){
              for(let itemVersionSelected of versionSelected){
                if(itemVersionSelected === item.version){
                  item.hide = false;
                  break;
                }
              }
              break;
            }
          }
        }
      },
      onSubmitClick () {
        //code goes here
        alert('đã submit')
      },
    },
    computed: {
      selected: {
        get () {
          return this.selected;
        },
        set (value) {
          this.$store.commit('selection', value)
        }
      },
      iconFilterMarketplace () {
        if (this.marketplaceSelect.length === this.marketplaceItems.length) return 'mdi-close-box'
        if (this.marketplaceSelect.length > 0 && this.marketplaceSelect.length !== this.marketplaceItems.length) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
      iconFilterVersion () {
        if (this.versionSelect.length === this.versionItems.length) return 'mdi-close-box'
        if (this.versionSelect.length > 0 && this.versionSelect.length !== this.versionItems.length) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
      ...mapState([
              'items',
              'headers',
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
    created() {
      this.$axios.post(`http://localhost:9009/domains`).then(({data}) => {
        let marketplaceItems = [];
        let versionItems = [];
        for(let item of data){
          item.run_order = false;
          item.run_payment = false;
          item.run_contact = false;
          item.hide = false;

          if(marketplaceItems.indexOf(item.marketplace) === -1){
            marketplaceItems.push(item.marketplace);
          }
          if(versionItems.indexOf(item.version) === -1){
            versionItems.push(item.version);
          }
        }
        this.marketplaceItems = marketplaceItems;
        this.marketplaceSelect = marketplaceItems;
        this.versionItems = versionItems;
        this.versionSelect = versionItems;
        this.$store.dispatch('initData', data);
      });
    }
  }
</script>