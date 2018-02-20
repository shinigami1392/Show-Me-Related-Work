<template>
  <div id="aboutsection" class="aboutdev aboutdev-default customabout">
    <div class="header">
      <div id="devSection">
        <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-home"></span> Login <i class="fab fa-github"></i>
        </button>
      </div>
    </div>
    <div class="topabout" align="left">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit"><i class="fa fa-search"></i></button>
    </div>

  </div>
</template>


<style>
.customabout {
  background: -webkit-radial-gradient(circle, #fff, #fff);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.header{
      border-radius: 3px;
      width: 100%;
      height: 50px;
      background-color: #343a40;
    }
.customBox {
    background: #343a40;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
#login{
      padding-top: 10px;
      padding-right: 10px;
      padding-left: 10px;
      text-align: right;
    }

.topabout {
  width: 100%;
  padding-left: 3%;
  float: left;
  text-align: left;
  padding-top: 5px;
}



.topabout input[type=text] {
  font-size: 17px;
  border: 1;
  border-radius: 3px;
}

</style>
