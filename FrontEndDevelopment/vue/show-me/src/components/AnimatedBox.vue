<template>
    <div id="animated-back">
          <h1> SHOW ME<br/> related work</h1>
          <h3> A better way to find relations between scholarly articles</h3>
    </div>
</template>

<script></script>

<style>
@import url(https://fonts.googleapis.com/css?family=Kaushan+Script);

#animated-back {
  background: -webkit-radial-gradient(circle, #CED0DE, #fff);
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

h1 {
  font-family: "Kaushan Script";
  text-align: center;

  border-top: solid black 3.9px;
  border-bottom: solid black 5.9px;

  padding: 0;
  overflow: hidden;
  animation: animateHeading 3s forwards;
}

h3 {
  font-family: "Kaushan Script";
  text-align: right;

  border-bottom: solid black 2.9px;
  padding: 0;
  overflow: hidden;
}
@keyframes animateHeading {
  0% {
    transform: rotate(90deg);
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

    height: 3.11em;
  }
}
</style>