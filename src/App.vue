<template>
    <div id="app">
    <v-app>
        <v-content>
        <Header/>
        <v-container fluid>
            <router-view>
            </router-view>
        </v-container>
            <Message/>
      <Footer/>
        </v-content>
    </v-app>
    </div>
</template>

<script>
import Header from './components/Header'
import Message from './components/Message'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    Header,
    Message,
    Footer
  },

  data: () => ({

  })
}
</script>
