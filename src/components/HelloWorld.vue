<template>
  <v-card>
    <v-card-title>
      <h2>Automation Test Using Puppeteer</h2>
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          outlined
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :search="search"
        item-key="name"
        class="elevation-1"
    >
      <template v-slot:body>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>
              <v-switch v-model="switch1" inset></v-switch>
            </td>
            <td>{{ item.fat }}</td>
            <td>{{ item.carbs }}</td>
            <td>{{ item.version }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-card>

</template>

<script>
  export default {
    data () {
      return {
        singleSelect: false,
        selected: [],
        search: '',
        headers: [
          {
            text: 'Domain',
            align: 'start',
            sortable: true,
            filterable: true,
            divider: true,
            value: 'name',
          },
          { text: 'Order', value: 'order',sortable: false, divider: true, width: 100 },
          { text: 'Fat (g)', value: 'fat',sortable: false, divider: true, width: 100 },
          { text: 'Carbs (g)', value: 'carbs',sortable: false, divider: true, width: 100},
          { text: 'Version', value: 'version',sortable: false, divider: true, width: 100 },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            order: 159,
            fat: 6.0,
            carbs: 24,
            version: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            order: 237,
            fat: 9.0,
            carbs: 37,
            version: 4.3,
          },
          {
            name: 'Eclair',
            order: 262,
            fat: 16.0,
            carbs: 23,
            version: 6.0,
          },
          {
            name: 'Cupcake',
            order: 305,
            fat: 3.7,
            carbs: 67,
            version: 4.3,
          },
          {
            name: 'Gingerbread',
            order: 356,
            fat: 16.0,
            carbs: 49,
            version: 3.9,
          },
          {
            name: 'Jelly bean',
            order: 375,
            fat: 0.0,
            carbs: 94,
            version: 0.0,
          },
          {
            name: 'Lollipop',
            order: 392,
            fat: 0.2,
            carbs: 98,
            version: 0,
          },
          {
            name: 'Honeycomb',
            order: 408,
            fat: 3.2,
            carbs: 87,
            version: 6.5,
          },
          {
            name: 'KitKat',
            order: 452,
            fat: 25.0,
            carbs: 51,
            version: 4.9,
          },
          {
            name: 'hitttttttttttt',
            order: 518,
            fat: 26.0,
            carbs: 65,
            version: 7,
          },
          {
            name: 'honnnn',
            order: 518,
            fat: 26.0,
            carbs: 65,
            version: 7,
          },
        ],
      }
    },
    methods: {

    }
  }
</script>