<template>
    <v-layout fill-height="">
        <v-container
            class="fill-height"
            fluid>
            <v-row
                align="center"
                justify="center">
                <v-col
                    cols="12"
                    sm="12"
                    md="12">
                    <v-card class="elevatio-12">
                        <div>
                            <apexchart type=area height=600 :options="chartOptions" :series="series"></apexchart>
                        </div>
                    </v-card>
                </v-col>
                <v-col
                    cols="6"
                    sm="6"
                    md="4">
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>

import MilkService from '../services/MilkService'

export default {
  name: 'charts',
  data () {
    return {
      series: [{
        name: 'series1',
        data: []
      }],
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
        tooltip: {
          x: {
            format: 'dd-MM-yy'
          }
        }
      }
    }
  },
  async beforeMount () {
    this.temp = (await MilkService.get()).data
    let index, len
    for (index = 0, len = this.temp.length; index < len; ++index) {
      this.series[0].data.push(this.temp[index].weight)
      let date = new Date(Date.parse(this.temp[index].date))
      date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) +
          'T' + ('0' + (date.getHours())).slice(-2) + ':' + ('0' + (date.getMinutes())).slice(-2) + ':' + ('0' + (date.getSeconds())).slice(-2) // TODO: вынести в метод когда понадобиться(сейчас решается на уровне типа столбца)
      this.chartOptions.xaxis.categories.push(date)
    }
  }
}

</script>

<style scoped>
    #chart {
        max-width: 650px;
        margin: 35px auto;
    }
</style>
