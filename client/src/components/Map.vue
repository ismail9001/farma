<template>
    <v-container
        :fluid=true
        class="cont"
    >
        <v-row no-gutters>
            <v-col
                cols="10"
            >
                <yandex-map :coords=coords
                            :zoom=zoom
                            :controls=controls
                            :map-type=mapType
                            style="width: 100%; height: 812px;"
                @map-was-initialized="initHandler">
                </yandex-map>
            </v-col>
            <v-col
                cols="2">
                <div class="ml-3">
                    <strong>Форма создания многоугольников</strong><br />
                    <br />Цвет заливки<br />
                    <v-color-picker
                        width = "100%"
                        mode="hexa"
                        hide-mode-switch
                        hide-canvas
                        v-model="fillColor">
                    </v-color-picker>
                    <v-btn
                        block
                        class="mt-3"
                        @click="deletePolygon"
                        id="deleteBtn"
                        :disabled="delBtnDisable"
                    >
                        Удалить
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { yandexMap } from 'vue-yandex-maps'
import PolygonService from '../services/PolygonService'

var polygon
var geoCollection

export default {
    data: () => ({
        coords: [55.833523, 50.458884],
        zoom: 14,
        controls: ['typeSelector', 'zoomControl'],
        mapType: 'hybrid',
        polygons: [],
        fillColor: '#00FF0088',
        delBtnDisable: true
    }),
    components: {
        yandexMap
    },
    async mounted () {
        this.polygons = (await PolygonService.get()).data
    },
    methods: {
        initHandler (map) {
            // eslint-disable-next-line no-undef
            const btn = new ymaps.control.Button({
                data: {
                    image: 'button-polygon.png'
                }
            })
            // eslint-disable-next-line no-undef
            geoCollection = new ymaps.GeoObjectCollection()
            map.geoObjects.add(this.fill(geoCollection))
            map.setBounds(geoCollection.getBounds())
            btn.events.add(['select'], () => {
                geoCollection.each(function (e) {
                    e.editor.stopEditing()
                })
                // eslint-disable-next-line no-undef
                polygon = new ymaps.Polygon([], {}, {
                    editorDrawingCursor: 'crosshair',
                    fillColor: this.fillColor,
                    strokeWidth: 1
                })
                polygon.editor.events.add(['drawingstop'], async () => {
                    polygon.editor.stopDrawing()
                    polygon.editor.stopEditing()
                    const coords = polygon.geometry.getCoordinates()
                    const marker = {
                        type: 'Polygon',
                        coordinates: coords
                    }
                    try {
                        const newPolygon = (await PolygonService.post({
                            color: this.fillColor,
                            marker: marker
                        })).data
                        // eslint-disable-next-line no-undef
                        this.polygons = (await PolygonService.get()).data
                        map.geoObjects.remove(polygon)
                        this.add(newPolygon)
                    } catch (error) {
                        this.error = error.response.data.error
                    }
                    btn.deselect()
                })
                map.geoObjects.add(polygon)
                polygon.editor.startDrawing()
            })
            map.controls.add(btn, {
                float: 'right',
                floatIndex: 100
            })
        },
        fill (geoCollection) { // из массива объектов  бд получаем коллекцию геообъектов
            for (let i = 0; i < this.polygons.length; i++) {
            // eslint-disable-next-line no-undef
                var geoObject = new ymaps.Polygon(
                    this.polygons[i].marker.coordinates, {
                        uuid: this.polygons[i].uuid
                    },
                    {
                        fillColor: this.polygons[i].color,
                        strokeWidth: 1
                    })
                geoObject.events.add(['click'], (e) => {
                    this.delBtnDisable = false
                    geoCollection.each(function (e) {
                        e.editor.stopEditing()
                    })
                    polygon = e.get('target')
                    this.fillColor = polygon.options.get('fillColor')
                    polygon.editor.startEditing()
                })
                geoObject.editor.events.add(['drawingstop'], () => {
                    polygon.editor.stopDrawing()
                    polygon.editor.stopEditing()
                    polygon.options.set({ fillColor: this.fillColor })
                    this.save(polygon)
                    this.delBtnDisable = true
                })
                geoCollection.add(geoObject)
            }
            return geoCollection
        },
        add (newPolygon) {
            // eslint-disable-next-line no-undef
            var geoObject = new ymaps.Polygon(
                newPolygon.marker.coordinates, {
                    uuid: newPolygon.uuid
                },
                {
                    fillColor: newPolygon.color,
                    strokeWidth: 1
                })
            geoObject.events.add(['click'], (e) => {
                this.delBtnDisable = false
                geoCollection.each(function (e) {
                    e.editor.stopEditing()
                })
                polygon = e.get('target')
                this.fillColor = polygon.options.get('fillColor')
                polygon.editor.startEditing()
            })
            geoObject.editor.events.add(['drawingstop'], () => {
                polygon.editor.stopDrawing()
                polygon.editor.stopEditing()
                polygon.options.set({ fillColor: this.fillColor })
                this.save(polygon)
                this.delBtnDisable = true
            })
            geoCollection.add(geoObject)
        },
        async save () {
            try {
                await PolygonService.put({
                    uuid: polygon.properties.get('uuid'),
                    marker: {
                        type: 'Polygon',
                        coordinates: polygon.geometry.getCoordinates()
                    },
                    color: this.fillColor
                })
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
            this.delBtnDisable = true
        }
        // TODO: много повторяющегося кода
        // TODO: сохранение и отображение кадастрового номера
        // TODO: динамическое изменение цвета полигонов
    }
}
</script>
<style>
    .cont{
        padding:0px;
    }
    html,body{
        height:100%;
        margin:0px;
        padding:0px;
    }
</style>
