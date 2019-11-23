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
                      name="email"
                      prepend-icon="person"
                      type="text"
                      v-model="email"
                      :error-messages="emailError"
                      required
                  />
                  <v-text-field
                      label="Пароль"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      v-model="password"
                      :error-messages="passwordError"
                      required
                  />
                  </v-form>
              </v-card-text>
                  <div class="danger-alert" v-html="error" />
                  <br>
              <v-card-actions>
                  <v-spacer />
                  <router-link
                      :to="{name:'registration'}"
                      class="mr-4 link"
                  >
                      Забыли пароль?</router-link>
                  <v-btn color="primary"
                         @click="validate">
                      Войти
                  </v-btn>
              </v-card-actions>
              </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  name: 'Login',
  props: {
    source: String
  },
  data () {
    return {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
      error: null,
      rules: {
        email: {
          filled: (v) => !!v || 'Нужно ввести пользователя',
          valid: (v) => /.+@.+\..+/.test(v) || 'Проверьте формат почты'
        },
        password: {
          filled: (v) => !!v || 'Пароль не может быть пустым',
          valid: v => (v && v.length >= 6) || 'Пароль не должен быть менее 6 символов'
        }
      }
    }
  },
  methods: {
    validate () {
      this.emailError = null
      if (this.rules.email.valid(this.email) !== true) {
        this.emailError = this.rules.email.valid(this.email)
      }
      if (this.rules.email.filled(this.email) !== true) {
        this.emailError = this.rules.email.filled(this.email)
      }
      this.passwordError = null
      if (this.rules.password.valid(this.password) !== true) {
        this.passwordError = this.rules.password.valid(this.password)
      }
      if (this.rules.password.filled(this.password) !== true) {
        this.passwordError = this.rules.password.filled(this.password)
      }
    },
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
        this.error = error.response.data.error
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
