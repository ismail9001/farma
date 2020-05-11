<template>
    <div>
        <!--<v-toolbar
            color="primary"
            dark
            flat>
            <v-toolbar-title>
                <router-link
                class="home"
                tag="span"
                :to="{name:'helloworld'}">
                Farmer
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn
                    text
                    :to="{name:'table'}">
                    Ввод данных
                </v-btn>
                <v-btn
                    text
                    :to="{name:'charts'}">
                    Надои
                </v-btn>
                <v-btn
                    text
                    :to="{name:'login'}">
                    Войти
                </v-btn>
                <v-btn
                    text
                    :to="{name:'registration'}">
                    Регистрация
                </v-btn>
            </v-toolbar-items>

            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn icon
                       :to="{name:'login'}">
                    <v-icon>mdi-export-variant</v-icon>
                </v-btn>
            </template>
        </v-toolbar>-->
        <v-app-bar
            app
            color="primary"
            dark
            flat
        >
            <v-toolbar-title>
                <router-link
                    class="home"
                    tag="span"
                    :to="{name:'map'}">
                    Farmer
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
<!--            <v-toolbar-items>
                <v-btn
                    text
                    :to="{name:'login'}">
                    Войти
                </v-btn>
                <v-btn
                    text
                    :to="{name:'registration'}">
                    Регистрация
                </v-btn>
            </v-toolbar-items>-->

            <!--<v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
        </v-app-bar>
        <!--
        <v-navigation-drawer
            v-model="drawer"
            app
            right
        >
            <v-list dense>

                <v-list-item link :to="{name:'table'}">
                    <v-list-item-action>
                        <v-icon>mdi-contact-mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Ввод данных</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link :to="{name:'charts'}">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Надои</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link :to="{name:'feeds'}">
                    <v-list-item-action>
                        <v-icon>mdi-contact-mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Справочник</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link :to="{name:'map'}">
                    <v-list-item-action>
                        <v-icon>mdi-contact-mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Карта</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>-->
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
    data: () => ({
        drawer: false
    }),
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
