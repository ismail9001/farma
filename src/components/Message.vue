<template>
    <div>
        <v-alert class="message col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4" type="error">
            I'm an error alert.
        </v-alert>
    </div>
</template>

<script>
export default {
  name: 'Message'
}
</script>

<style scoped>
.message {
    float: right;
}
</style>
