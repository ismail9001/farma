<template>
    <div>
        <v-alert class="message col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4" type="error">
            <div class="danger-alert" v-html="error" />
        </v-alert>
    </div>
</template>

<script>
export default {
  name: 'Message',
  data: function () {
    return {
      error: null
    }
  },
  watch: {
    catch (error) {
      this.error = error
      console.log(error)// .response.data.error
    }
  }
}
</script>

<style scoped>
.message {
    float: right;
    visibility: hidden;
}
</style>
