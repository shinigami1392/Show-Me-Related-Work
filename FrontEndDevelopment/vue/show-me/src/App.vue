<template>
  <div id="app">
     <!-- Fixed navbar -->
    <div>
            <app-navbar></app-navbar>
    </div>    

    <!--  Main -->        
    <div id="main">
            <div class="container-fluid">
                <div class="row content" style="height:50%;">
                    <div class="col-md-3">
                        <app-box v-bind:boxHeaderProp = "researchAreasBoxHeader">
                              <app-listbox></app-listbox>
                        </app-box>
                    </div>
                    <div class="col-md-9">
                        <app-box v-bind:boxHeaderProp = "researchPaperAndRelationsBoxHeader">
                            <router-view></router-view>   
                        </app-box>
                    </div>
                </div> 
                <div class="row" style="height:20%;">
                        <div class="col-md-3">
                            <app-box v-bind:boxHeaderProp = "infoBoxHeader">
                                <router-view></router-view>
                            </app-box>
                        </div>
                        <div class="col-md-9">
                            <app-box v-bind:boxHeaderProp = "userFeedbackBoxHeader">
                            
                            </app-box>
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
          researchAreasBoxHeader: 'Research Areas',
          researchPaperAndRelationsBoxHeader: 'Research Papers and References',
          infoBoxHeader: 'Info Box',
          userFeedbackBoxHeader: 'Comment and Vote'
      }
    }
  }
</script>

<style>

</style>
