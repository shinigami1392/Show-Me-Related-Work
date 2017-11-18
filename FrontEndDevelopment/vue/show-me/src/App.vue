<template>
  <div id="app">
    <app-message>Navigation Bar will be here</app-message>

    <app-box v-bind:boxHeaderProp = "listBoxHeader" style="width: 20rem;"></app-box>
    <app-listbox style="width: 20rem;"></app-listbox>
  

  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
          listBoxHeader: 'List of Papers'
      }
    }
  }
</script>

<style>

</style>
