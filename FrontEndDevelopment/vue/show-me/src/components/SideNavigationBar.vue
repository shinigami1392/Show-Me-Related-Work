<template>
	<div>
    <div style="overflow-X: auto;">
      <div id="sideBar" class="sidenav ">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav"> Close &times;</a>        
        <ul class="list-group" v-if="categories && categories.length" >
          <li v-for="category in categories" class="list-group-item">
            <router-link :to="{ name:'allPapers',params:{areaid:category.id}}">{{ category.name }}</router-link>
            <span class="badge badge-primary badge-pill">{{ category.count }}</span>
          </li>
        </ul>        
      </div>
    </div>
    <div style="overflow-X: auto;">
		  <app-box v-bind:boxHeaderProp="researchAreasBoxHeader"  style="height:100; width:30;" v-bind:cardStyle ="cardStyle"  v-on:click.native="openNav">
		  </app-box>
    </div>
    	
	</div>
</template>

<script>
import axios from "axios";
function getPaperCatagories(vm) {
  axios
    .get(`http://54.201.123.246:8081/domains/all`)
    .then(response => {
      vm.categories = response.data.domains;
    })
    .catch(err => {
      vm.errors.push(err);
    });
}

export default {
  data() {
    return {
      researchAreasBoxHeader: "Research Areas",
	  flag: false,
      categories: [],
      errors: []      
    };
  },
  methods: {
    closeNav: function (event) {      
        let sideBarElement = "sideBar";
        let close = document.getElementById(sideBarElement); 
        close.style.width = "0px";
    },
    openNav: function(event){
      let sideBarElement = "sideBar";
      open = document.getElementById(sideBarElement);
      open.style.width = "250px";
    }   

  },
  created() {
    getPaperCatagories(this);
    this.cardStyle = "writing-mode:tb-rl;height:100%;float:right;cursor:pointer";
    this.cardBlockStyle = "";
    this.cardBlockContentStyle = "height:100%;"
  }
};
</script>
<style>
  .sidenav {
	    height: 50%; 
      width: 0;
	    position: fixed; 
      z-index: 1;
      top: 0;      
      right: 0;
	  display: flex;
      background-color: #283e4a;      
      overflow-x: hidden;
      transition: 0.5s;
      padding-top: 60px;
  }
  
  .sidenav a {
    text-decoration: none;
    color: #818181;
    display: block;
    transition: 0.3s;
   }
   
   .sidenav a:hover {
    color: black;
	  font-weight:bold;
	  text-decoration:underline;
	}
   
  .sidenav .closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 20px;
	    color: grey;
      margin-left: 30px;
  }

</style>