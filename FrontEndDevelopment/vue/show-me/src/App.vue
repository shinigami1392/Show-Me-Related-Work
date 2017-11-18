<template>
  <div id="app">
    <message>Hello there</message>
    <message>Hello there</message>
    <message>Hello there</message>
    <Box>Hola</Box>
  </div>
</template>

<script>

  import Message from './components/Message.vue'
  import Box from './components/Box.vue'

  export default {
    name: 'app',
    components: { Message , Box },
    data () {
      return {

      }
    }
  }
</script>

<style>

</style>
