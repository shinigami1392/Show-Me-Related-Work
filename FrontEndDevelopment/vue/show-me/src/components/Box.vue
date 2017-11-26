<template>

  <div class="card" v-bind:style="cardStyle">
    <div class="card-header card-outline-info h6">
        {{boxHeaderProp}}
    </div>
    <div class="card-block" v-bind:style="cardBlockStyle">
         <slot></slot>
     </div> 
  </div>

</template>


<script>
  export default {
      props: ['boxHeaderProp', 'cardStyle','cardBlockStyle']
  };
</script>


<style>

</style>
