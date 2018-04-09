<template>

    <!-- <div id="animated-back">
          <h1> SHOW ME<br/> related work<br/></h1>
          <h3> A better way to find relations between scholarly articles</h3>      
    </div>  -->
	<div>
		<div id="animated-back">
			  <h1><img src="./LogoMakr_7jkdrq.png" /></h1>
		</div>
		<div id="animated-back">
			  <h3> A better way to find relations between scholarly articles</h3>    
		</div>
	</div>
    
    
</template>

<script></script>

<style>
@import url(https://fonts.googleapis.com/css?family=Kaushan+Script);

#animated-back {
  background: -webkit-radial-gradient(circle, #fff, #fff);
  height: 100%;
  margin: auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

h1 {
  /* font-family: "Kaushan Script";  */
  /* text-align: middle;  */
  width: 450px;
  color: #0E6390;
  /* border-top: solid #86888A 3.9px; */
  /* border-bottom: solid #86888A 3.9px; */

  overflow: hidden;
  /* animation: animateHeading 3s forwards;  */
}

h3 {
  font-family: "Kaushan Script";
  text-align: center;
  color: black;
  /*border-bottom: solid #86888A 2.9px; */
  border-bottom: solid #0E6390 2.9px;
  padding: 0;
  overflow: hidden;
}

@keyframes animateHeading {
  0% {
    transform: rotate(360deg);
    width: 0;
    height: 0;
  }
  20% {
    transform: none;
    width: 20%;
    height: 0;
  }
  40%,
  80% {
    width: 30%;
    height: 1.4em;
  }
  100% {
    width: 25%;
    height: 2.8em;
  }
}
</style>