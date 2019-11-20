<template>
  <v-app id="inspire">
    <v-content>
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
                <v-toolbar-title>Регистрация</v-toolbar-title>
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
                    <v-text-field
                        id="password_repeat"
                        label="Повторите пароль"
                        name="password_repeat"
                        prepend-icon="lock"
                        type="password"
                    />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                  <router-link
                      :to="{name:'login'}"
                      class="mr-4 link"
                  >
                      У меня есть аккаунт</router-link>
                <v-btn color="primary">Зарегистрироваться</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Registration',
  props: {
    source: String
  }
}
</script>

<style scoped>
    .link {
        cursor: pointer;
    }
</style>
