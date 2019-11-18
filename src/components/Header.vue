<template>
  <v-app>
    <div>
      <v-toolbar>
        <v-img
          alt="Farmer Logo"
          class="shrink mr-2 hidden-sm-and-down"
          contain
          max-height="60"
          width="50"
          transition="scale-transition"
          src="@/assets/logo.png"
        />
        <v-toolbar-title>Farmer</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text>Link 1</v-btn>
          <v-btn text>Link 2</v-btn>
          <v-btn text>Link 3</v-btn>
        </v-toolbar-items>

        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-btn icon>
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
    </div>
<!--  <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
    <router-link
      class="home"
      tag="span"
      :to="{
     name:'songs'
     }">
      Farmer
    </router-link>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>-->
  <!--<v-toolbar fixed class="teal" dark>
    <v-toolbar-title class="mr-4">
      <router-link
        class="home"
        tag="span"
        :to="{
     name:'songs'
     }">
        Farmer
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
             :to="{name:'songs'}">
        Browse
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
      <v-btn flat dark
             :to="{name:'login'}">
        Login
      </v-btn>
      <v-btn flat dark
             :to="{name:'register'}">
        Sign Up
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="$store.state.isUserLoggedIn">
      <v-btn flat dark
             @click="logout">
        Log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>-->
  </v-app>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>

<style scoped>
  .home {
    cursor: pointer;
  }
</style>
