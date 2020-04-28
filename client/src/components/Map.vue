<template>
    <div id="app">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <td width="100%">
                        <div id="map" style="width:100%; height:778px"></div>
                    </td>
                    <td valign="top">
                        <div id="formpolygon">
                            <strong>Форма создания многоугольников</strong><br />
                            <br />Цвет заливки<br />
                            <v-color-picker
                                block
                                class="my-2"
                                mode="hexa"
                                hide-mode-switch
                                hide-canvas
                                v-model="fillColor">
                            </v-color-picker>
                            <v-btn
                                block
                                class="my-2"
                                id="addPolygonBtn"
                                :disabled="addPolygonBtnDisable"
                                @click="addPolygon">
                                Добавить
                            </v-btn>
                            <v-btn
                                block
                                class="my-2"
                                id="delPolygonBtn"
                                @click="deletePolygon">
                                Удалить
                            </v-btn>
                            <v-btn
                                block
                                class="my-2"
                                id="stopEditPolygonBtn"
                                :disabled="stopEditPolygonBtnDisable"
                                @click="stopEditPolygon">
                                Завершить редактирование
                            </v-btn>
                        </div>
                    </td>
                </tr>
                </thead>
            </template>
        </v-simple-table>
    </div>
</template>

<script>

import PolygonService from '../services/PolygonService'
import { loadYmap } from 'vue-yandex-maps'

var map
var polygon
var geoCollection

async function save (polygon) {
  try {
    await PolygonService.put({
      uuid: polygon.properties.get('uuid'),
      marker: {
        type: 'Polygon',
        coordinates: polygon.geometry.getCoordinates()
      },
      color: polygon.options.get('fillColor')
    })
  } catch (error) {
    this.error = error.response.data.error
  }
}

export default {
  data: () => ({
    stopEditPolygonBtnDisable: false,
    addPolygonBtnDisable: false,
    polygons: [],
    fillColor: '#00FF0088'
  }),
  async mounted () {
    this.polygons = (await PolygonService.get()).data
    await loadYmap({ debug: true })
    // eslint-disable-next-line no-undef
    map = new ymaps.Map('map', {
      center: [55.833523, 50.458884],
      zoom: 15,
      type: 'yandex#hybrid',
      controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
    })
    // eslint-disable-next-line no-undef
    geoCollection = new ymaps.GeoObjectCollection()
    for (let i = 0; i < this.polygons.length; i++) { // выведет 0, затем 1, затем 2
      // eslint-disable-next-line no-undef
      var myGeoObject = new ymaps.Polygon(
        this.polygons[i].marker.coordinates, {
          uuid: this.polygons[i].uuid
        },
        {
        // Описываем опции геообъекта.
        // Цвет заливки.
          fillColor: this.polygons[i].color,
          // Ширина обводки.
          strokeWidth: 1
        },
        {
          uuid: this.polygons[i].uuid
        })
      geoCollection.add(myGeoObject)
      myGeoObject.events.add(['click'], function (e) {
        geoCollection.each(function (e) {
          e.editor.stopEditing()
        })
        polygon = e.get('target')
        polygon.editor.startEditing()
      })
      myGeoObject.events.add(['contextmenu'], function (e) {
        polygon = e.get('target')
        save(polygon)
        polygon.editor.stopEditing()
      })
    }
    /*    map.events.add(['click']), function () {

                    } */
    map.geoObjects.add(geoCollection)
    map.setBounds(geoCollection.getBounds())
    // здесь доступна переменная ymaps
  },
  methods: {
    addPolygon () {
      geoCollection.each(function (e) {
        e.editor.stopEditing()
      })
      this.stopEditPolygonBtnDisable = false
      // eslint-disable-next-line no-undef
      polygon = new ymaps.Polygon([], {}, {
        // Курсор в режиме добавления новых вершин.
        editorDrawingCursor: 'crosshair',
        fillColor: this.fillColor,
        strokeWidth: 1
      })
      geoCollection.add(polygon)
      polygon.editor.startDrawing()
      this.addPolygonBtnDisable = true
    },
    async stopEditPolygon () {
      this.addPolygonBtnDisable = false
      polygon.editor.stopEditing()
      var coords = polygon.geometry.getCoordinates()
      this.marker2 = {
        type: 'Polygon',
        coordinates: coords
      }
      this.stopEditPolygonBtnDisable = true
      try {
        await PolygonService.post({
          color: this.fillColor,
          marker: this.marker2
        })
        this.polygons = (await PolygonService.get()).data
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async deletePolygon () {
      try {
        await PolygonService.delete(polygon.properties.get('uuid'))
      } catch (error) {
        this.error = error.response.data.error
      }
      geoCollection.remove(polygon)
    },
    contextMenu (e) {
      polygon = e.get('target')
      polygon.editor.stopEditing()
    }
  }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
