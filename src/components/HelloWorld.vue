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
                  <v-btn color="green" dark v-on="on" class="ml-5">
                    <v-icon color="white">mdi-eye </v-icon>
                    Result
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Tested result history.</span>
                  </v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.
                    Justo ex quisque nulla accusamus venenatis, sed quis. Nibh phasellus gravida metus in, fusce aenean ut erat commodo eros. Ut turpis, dui integer, nonummy pede placeat nec in sit leo. Faucibus porttitor illo taciti odio, amet viverra scelerisque quis quis et tortor, curabitur morbi a. Enim tempor at, rutrum elit condimentum, amet rutrum vitae tempor torquent nunc. Praesent vestibulum integer maxime felis. Neque aenean quia vitae nostra, tempus elit enim id dui, at egestas pulvinar. Integer libero vestibulum, quis blandit scelerisque mattis fermentum nulla, tortor donec vestibulum dolor amet eget, elit nullam. Aliquam leo phasellus aliquam curabitur metus a, nulla justo mattis duis interdum vel, mollis vitae et id, vestibulum erat ridiculus sit pulvinar justo sed. Vehicula convallis, et nulla wisi, amet vestibulum risus, quam ac egestas.
                    Et vitae, nulla gravida erat scelerisque nullam nunc pellentesque, a dictumst cras augue, purus imperdiet non. Varius montes cursus varius vel tortor, nec leo a qui, magni cras, velit vel consectetuer lobortis vel. Nibh erat et wisi felis leo porttitor, sapien nibh sapien pede mi, sed eget porttitor, repellendus arcu ac quis. Luctus vulputate aut est sem magna, placerat accumsan nunc vestibulum ipsum ac auctor, maecenas lorem in ut nec mauris tortor, doloribus varius sem tortor vestibulum mollis, eleifend tortor felis tempus lacus eu eu. Eleifend vel eu, nullam maecenas mauris nec nunc euismod, tortor porta ridiculus potenti, massa tristique nam magna, et wisi placerat et erat ante. Eget pede erat in facilisis, fermentum venenatis sodales. Ac tortor sociis et non animi tristique, rhoncus malesuada, ut arcu volutpat scelerisque sollicitudin, elit curabitur dui pede purus dolor, integer aenean risus taciti nulla eleifend accumsan. At pulvinar diam parturient, interdum mi velit aliquet et a. Arcu at ac placerat eget justo semper, purus sociis curabitur mi ipsum consequat ut, mollis vestibulum, est ante ornare lacus sem. Neque magna mauris, commodo quisque, praesent semper suscipit lobortis nam. Justo malesuada cursus ac nunc litora nunc. Tellus ac, in lobortis nunc, montes lectus purus fermentum.
                    Ac sit wisi. Sodales aliquam, sed vestibulum nullam arcu sit risus arcu, id luctus vitae lorem nibh, integer nec nullam class cursus mi, purus arcu lectus. Vel ante suscipit volutpat potenti mattis sed, wisi eu placerat aliquam erat, lectus morbi lobortis at assumenda. Consequat neque purus ipsum voluptas odio, netus vestibulum ut nec, suspendisse pellentesque nec enim in. Wisi dictum sed semper a, ipsum erat tellus habitasse est, erat sem ornare, vitae quisque ultricies. Dui sed blandit. Tempor et faucibus justo sed luctus, nec vitae vitae. Nunc nibh pede, ipsum vestibulum aenean leo ante ultricies, nam cras quis sed penatibus amet. In mauris a. Integer metus mauris tortor, et rutrum vestibulum ultricies, ut phasellus in ullamcorper ut mollit, eu justo. Cursus pretium venenatis.
                    Cras pellentesque vel sodales accumsan aenean. Feugiat metus sit nec in aliquet amet, porttitor pretium vulputate massa. Consequat ipsum luctus quisque adipiscing libero. Wisi sollicitudin. Eget vitae ac lobortis, lorem natoque vestibulum et, aliquet faucibus at morbi nibh, vel condimentum. Massa unde orci sed id sed, odio donec congue nec praesent amet. Hymenaeos velit lacus, quis vivamus libero tempus duis, eu nisi eu, ipsum at accumsan pede justo morbi donec, massa et libero sit risus neque tortor. Ut sed sed etiam hendrerit dapibus, quis metus suspendisse nibh.
                    Fringilla tempor felis augue magna. Cum arcu a, id vitae. Pellentesque pharetra in cras sociis adipiscing est. Nibh nec mattis at maecenas, nisl orci aliquam nulla justo egestas venenatis, elementum duis vel porta eros, massa vitae, eligendi imperdiet amet. Nec neque luctus suscipit, justo sem praesent, ut nisl quisque, volutpat torquent wisi tellus aliquam reprehenderit, curabitur cras at quis massa porttitor mauris. Eros sed ultrices. Amet dignissim justo urna feugiat mauris litora, etiam accumsan, lobortis a orci suspendisse. Semper ac mauris, varius bibendum pretium, orci urna nunc ullamcorper auctor, saepe sem integer quam, at feugiat egestas duis. Urna ligula ante. Leo elementum nonummy. Sagittis mauris est in ipsum, nulla amet non justo, proin id potenti platea posuere sit ut, nunc sit erat bibendum. Nibh id auctor, ab nulla vivamus ultrices, posuere morbi nunc tellus gravida vivamus.
                    Mauris nec, facilisi quam fermentum, ut mauris integer, orci tellus tempus diam ut in pellentesque. Wisi faucibus tempor et odio leo diam, eleifend quis integer curabitur sit scelerisque ac, mauris consequat luctus quam penatibus fringilla dis, vitae lacus in, est eu ac tempus. Consectetuer amet ipsum amet dui, sed blandit id sed. Tellus integer, dignissim id pede sodales quis, felis dolorem id mauris orci, orci tempus ut. Nullam hymenaeos. Curabitur in a, tortor ut praesent placerat tincidunt interdum, ac dignissim metus nonummy hendrerit wisi, etiam ut.
                    Semper praesent integer fusce, tortor suspendisse, augue ligula orci ante asperiores ullamcorper. In sit per mi sed sed, mi vestibulum mus nam, morbi mauris neque vitae aliquam proin senectus. Ac amet arcu mollis ante congue elementum, inceptos eget optio quam pellentesque quis lobortis, sollicitudin sed vestibulum sollicitudin, lectus parturient nullam, leo orci ligula ultrices. At tincidunt enim, suspendisse est sit sem ac. Amet tellus molestie est purus magna augue, non etiam et in wisi id. Non commodo, metus lorem facilisi lobortis ac velit, montes neque sed risus consectetuer fringilla dolor. Quam justo et integer aliquam, cursus nulla enim orci, nam cursus adipiscing, integer torquent non, fringilla per maecenas. Libero ipsum sed tellus purus et. Duis molestie placerat erat donec ut. Dolor enim erat massa faucibus ultrices in, ante ultricies orci lacus, libero consectetuer mauris magna feugiat neque dapibus, donec pretium et. Aptent dui, aliquam et et amet nostra ligula.
                    Augue curabitur duis dui volutpat, tempus sed ut pede donec. Interdum luctus, lectus nulla aenean elit, id sit magna, vulputate ultrices pellentesque vel id fermentum morbi. Tortor et. Adipiscing augue lorem cum non lacus, rutrum sodales laoreet duis tortor, modi placerat facilisis et malesuada eros ipsum, vehicula tempus. Ac vivamus amet non aliquam venenatis lectus, sociosqu adipiscing consequat nec arcu odio. Blandit orci nec nec, posuere in pretium, enim ut, consectetuer nullam urna, risus vel. Nullam odio vehicula massa sed, etiam sociis mauris, lacus ullamcorper, libero imperdiet non sodales placerat justo vehicula. Nec morbi imperdiet. Fermentum sem libero iaculis bibendum et eros, eget maecenas non nunc, ad pellentesque. Ut nec diam elementum interdum. Elementum vitae tellus lacus vitae, ipsum phasellus, corporis vehicula in ac sed massa vivamus, rutrum elit, ultricies metus volutpat.
                    Semper wisi et, sollicitudin nunc vestibulum, cursus accumsan nunc pede tempus mi ipsum, ligula sed. Non condimentum ac dolor sit. Mollis eu aliquam, vel mattis mollis massa ut dolor ante, tempus lacinia arcu. Urna vestibulum lorem, nulla fermentum, iaculis ut congue ac vivamus. Nam libero orci, pulvinar nulla, enim pellentesque consectetuer leo, feugiat rhoncus rhoncus vel. Magna sociosqu donec, dictum cursus ullamcorper viverra. Ultricies quis orci lorem, suspendisse ut vestibulum integer, purus sed lorem pulvinar habitasse turpis.
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
          return this.$store.state.selected;
        },
        set (value) {
          console.log(value);
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

          if(marketplaceItems.indexOf(item.marketplace) == -1){
            marketplaceItems.push(item.marketplace);
          }
          if(versionItems.indexOf(item.version) == -1){
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