<template>
    <v-layout fill-height="">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Вход в систему</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Имя пользователя"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
                <div class="danger-alert" v-html="error" />
                <br>
              <v-card-actions>
                <v-spacer />
                  <router-link
                  :to="{name:'login'}"
                  class="mr-4 link"
              >
                  Забыли пароль?</router-link>
                <v-btn color="primary"
                       @click="login">
                    Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
</template>

<script>
import AuthenticationService from '../service/AuthenticationService'

export default {
  name: 'Login',
  props: {
    source: String
  },
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          grant_type: 'password', // TODO: сделать боевой метод
          email: 'admin@gmail.com', // this.email,
          password: '12345'// this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'cows'
        })
      } catch (error) {
        this.error = error // .response.data.error
      }
    }
  }
}
</script>

<style scoped>
    .link {
        cursor: pointer;
    }
</style>
