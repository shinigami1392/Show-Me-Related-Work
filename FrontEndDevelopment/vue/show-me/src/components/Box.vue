<template>

  <div class="card" v-bind:style="cardStyle">
    <div class="card-header card-outline-info h6 customBox testBox">
        {{boxHeaderProp}}
    </div>

    <!--Test-->
    <div class="testBox">
      <ul>
          <li v-for="testBoxHeader in testBoxHeaders">
            {{ testBoxHeader }}
          </li>
      </ul>
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
      data () {
        return {
          testBoxHeaders: ['Papers Information','Relationship Information','List of papers','Comments on relationship','Show Me Related Work']
        }
      },
      props: ['boxHeaderProp', 'cardStyle','cardBlockStyle', 'cardBlockContentStyle']
  };
</script>


<style>
.customBox{
  background: #343a40;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
