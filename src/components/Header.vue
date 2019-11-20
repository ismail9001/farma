<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>    <router-link
                class="home"
                tag="span"
                :to="{
     name:'helloworld'
     }">
                Farmer
            </router-link></v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text
                       :to="{name:'login'}"
                >
                    Войти
                </v-btn>
                <v-btn text
                       :to="{name:'registration'}"
                >
                    Регистрация</v-btn>
            </v-toolbar-items>

            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn icon
                       :to="{name:'login'}">
                    <v-icon>mdi-export-variant</v-icon>
                </v-btn>
            </template>
        </v-toolbar>
    </div>
<!-- <v-toolbar-items v-if="$store.state.isUserLoggedIn">
      <v-btn flat dark
             @click="logout">
        Log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>-->
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
