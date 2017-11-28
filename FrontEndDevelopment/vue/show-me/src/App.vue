<template>
  <div id="app">
     <!-- Fixed navbar -->
    <div>
            <app-navbar></app-navbar>
    </div>    

    <!--  Main -->        
    <div id="main">
            <div class="container-fluid" style="height:700px">
                <div class="row content" style="height:60%;">
                    <div class="col-md-3" style="height:100%;">
                             <router-view name="area-box"></router-view>
                    </div>
                    <div class="col-md-9" style="height:100%;">
                            <transition name="slide" mode="out-in">
                                <router-view name="animation-box"></router-view>   
                            </transition>

                            <transition name="slide" mode="out-in">
                                <router-view name="table-box"></router-view>   
                            </transition>
                    </div>
                </div> 
               
                <div class="row" style="height:30%; margin-top:20px;">
                        <div class="col-md-3" style="height:100%;">
                                <transition name="slide" mode="out-in">
                                    <router-view name="info-box"></router-view>
                                    <router-view name="link-info-box"></router-view>
                                </transition>
                        </div>
                        <div class="col-md-9" style="height:100%">
                            <!--<app-box v-bind:boxHeaderProp = "userFeedbackBoxHeader">
                            </app-box> -->
                            <transition name="slide" mode="out-in">
                                    <router-view name="feedback-box"></router-view>
                            </transition>
                        </div>
                </div> 
            </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      userFeedbackBoxHeader: "Comment and Vote"
    };
  }
};
</script>







<style>

.slide-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
  animation: slide-out 0.2s ease-out forwards;
}

.slide-leave {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter-active {
  animation: slide-in 0.2s ease-out forwards;
}

@keyframes slide-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-30px);
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
}



</style>
