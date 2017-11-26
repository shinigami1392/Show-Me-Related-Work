<template>

  <div class="card" style="height:90%;">
    <div class="card-header card-outline-info h6">
        {{boxHeaderProp}}
    </div>
    <div class="card-block">
         <slot></slot>
     </div> 
  </div>

</template>


<script>
  export default {
      props: ['boxHeaderProp'],
  };
</script>


<style>

</style>
