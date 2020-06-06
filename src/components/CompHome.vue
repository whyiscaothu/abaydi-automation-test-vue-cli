<template>
  <v-card>
    <form action="" method="post" @submit.prevent="axiosPostData" class="mb-12 pb-6">
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <v-select
                    v-model="marketplaceSelect"
                    :items="marketplaceItems"
                    v-on:change="changeFilter"
                    label="Marketplace"
                    multiple
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
              dark
              :headers="homeHeaders"
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
      <comp-footer />
    </form>
  </v-card>
</template>


<script>
  import { mapState } from 'vuex'
  import CompFooter from './CompFooter';
  export default {
    components: {
        CompFooter
    },
    data(){
      return {
        selectedItems: [],
        marketplaceSelect: [],
        marketplaceItems: [],
        versionSelect: [],
        versionItems: [],
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
    },
    computed: {
      ...mapState([
          'items',
          'homeHeaders',
          'search',
          'selected',
          'testResults',
      ]),
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