<template>
    <v-data-table
        :headers="headers"
        :items="feeds"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Корма</v-toolbar-title>
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
                                        <v-text-field v-model="editedItem.title"></v-text-field>
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
import FeedService from '../services/FeedService'

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Название', value: 'title' },
      { text: '', value: 'action', sortable: false }
    ],
    feeds: [],
    editedIndex: -1,
    editedItem: {
      title: ''
    },
    defaultItem: {
      title: ''
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
    this.feeds = (await FeedService.get()).data
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.feeds.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.feeds.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.feeds.splice(index, 1)
      try {
        await FeedService.delete(item.id)
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
          await FeedService.put({
            id: this.editedItem.id,
            title: this.editedItem.title
          })
        } catch (error) {
          this.error = error.response.data.error
        }
        Object.assign(this.feeds[this.editedIndex], this.editedItem)
      } else {
        try {
          await FeedService.post({
            title: this.editedItem.title
          })
          this.feeds = (await FeedService.get()).data
        } catch (error) {
          this.error = error.response.data.error
        }
      }
      this.close()
    }
  }
}
</script>
