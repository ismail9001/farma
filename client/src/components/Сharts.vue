<template>
    <v-layout fill-height="">
        <v-container
            class="fill-height"
            fluid>
            <v-row
                align="center"
                justify="center">
                <v-col
                    cols="6"
                    sm="6"
                    md="4">
                    <v-card class="elevatio-12">
                        <div>
                            <apexchart type="line" :options="options" :series="series"></apexchart>
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

export default {
  name: 'charts',
  data () {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
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
