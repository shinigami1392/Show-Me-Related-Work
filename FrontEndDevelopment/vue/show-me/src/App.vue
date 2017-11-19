<template>
  <div id="app">
    <div><app-navbar></app-navbar></div>
    
  <div>
    <app-box v-bind:boxHeaderProp = "listBoxHeader" style="width: 20rem;"></app-box>
    <app-listbox style="width: 20rem;"></app-listbox>
  </div>

  

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
