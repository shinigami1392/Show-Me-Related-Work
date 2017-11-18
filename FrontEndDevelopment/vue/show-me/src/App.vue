<template>
  <div id="app">
    <app-message>Hello there</app-message>
    <app-message>Hello there</app-message>
    <app-message>{{ boxHeader}}</app-message>
    <app-box v-bind:boxHeaderProp = "boxHeader" style="width: 20rem;"></app-box>
    <p>Hols rew</p>

  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
          boxHeader: 'HOLA BOX'
      }
    }
  }
</script>

<style>

</style>
