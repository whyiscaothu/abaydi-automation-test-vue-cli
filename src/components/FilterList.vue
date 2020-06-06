<template>
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
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "FilterList",
        data () {
            return {
                versionSelect: [],
            }
        },
        props: {
            marketplaceSelect: Array,
            marketplaceItems: Array,
            selectedItems: Array,
            versionItems: Array,
        },
        methods: {
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
        },
        computed: {
            ...mapState([
                'items',
            ]),
        },
    };
</script>

<style scoped>

</style>