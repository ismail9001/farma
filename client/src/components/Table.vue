<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Добавить запись</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="editedItem.weight" @keypress="isNumber($event)"></v-text-field>
                                        <v-date-picker v-model="editedItem.date"  color="green lighten-1" header-color="primary"></v-date-picker>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                edit
            </v-icon>
            <v-icon
                small
                @click="deleteItem(item)"
            >
                delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import MilkService from '../services/MilkService'

export default {
  data: () => ({
    weight: 1234.34,
    date: new Date().toISOString().substr(0, 10),
    dialog: false,
    milks: null,
    headers: [
      {
        text: 'Дата',
        align: 'left',
        value: 'date'
      },
      { text: 'Вес', value: 'weight' },
      { text: '', value: 'action', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      weight: 0,
      date: ''
    },
    defaultItem: {
      weight: 0,
      date: ''
    }
  }),
  computed: {
    formTitle () { // определение название всплывющего окна
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  async created () {
    this.desserts = (await MilkService.get()).data
  },
  methods: {
    isNumber: function (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.date = new Date(Date.parse(this.editedItem.date))
      this.editedItem.date = this.editedItem.date.getFullYear() + '-' + ('0' + (this.editedItem.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.editedItem.date.getDate()).slice(-2) // TODO: вынести в метод
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      try {
        await MilkService.delete(item.id)
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    async save () {
      if (this.editedIndex > -1) {
        // this.desserts.push(this.editedItem)
        try {
          await MilkService.put({
            id: this.editedItem.id,
            date: this.editedItem.date,
            weight: this.editedItem.weight
          })
        } catch (error) {
          this.error = error.response.data.error
        }
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        try {
          await MilkService.post({
            date: this.editedItem.date,
            weight: this.editedItem.weight
          })
          this.desserts = (await MilkService.get()).data
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.close()
    }
  }
}
</script>
