<template>

  <div class="card" v-bind:style="cardStyle">
    <div class="card-header card-outline-info h6 customBox">
        {{boxHeaderProp}}
    </div>
    <div class="card-block" v-bind:style="cardBlockStyle">
         <div  v-bind:style="cardBlockContentStyle">
         <slot></slot>
         </div>
     </div> 
  </div>

</template>


<script>
  export default {
      props: ['boxHeaderProp', 'cardStyle','cardBlockStyle', 'cardBlockContentStyle']
  };
</script>


<style>
.customBox{
  background: -webkit-radial-gradient(circle, #fff, #CED0DE);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
