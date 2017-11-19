<template>
  <div id="app">
     <!-- Fixed navbar -->
    <div id="navigation" class="navbar navbar-default ">
      <div class="container">
                <app-logo></app-logo>
                <app-social-sign-in></app-social-sign-in>
      </div>
    </div>    

    <!--  Main -->        
    <div id="main">
            <div class="container-fluid">
                <div class="row content" style="height:50%;">
                    <div class="col-md-3">
                        <app-box v-bind:boxHeaderProp = "listBoxHeader">
                              <app-listbox></app-listbox>
                        </app-box>
                    </div>
                    <div class="col-md-9">
                    </div>
                </div> 
                <div class="row" style="height:20%;">
                        <div class="col-md-3">

                        </div>
                        <div class="col-md-9">
                        </div>
                </div> 
            </div>
    </div>  
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
          listBoxHeader: 'Research Areas'
      }
    }
  }
</script>

<style>

</style>
