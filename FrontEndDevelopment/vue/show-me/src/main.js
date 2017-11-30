import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Box from './components/Box.vue'
import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'
import PapersTable from './components/PapersTable.vue'
import PaperInfoBox from './components/PaperInfoBox.vue'
import LinkInfoBox from './components/LinkInfoBox.vue'
import PaginatedTable from './components/PaginatedTable.vue'
import Grid from './components/Grid.vue'

import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);

Vue.component('app-box', Box );
Vue.component('app-listbox', ListBox );
Vue.component('app-navbar', NavigationBar );
Vue.component('app-table',PapersTable);
Vue.component('app-paper-infobox',PaperInfoBox);
Vue.component('app-link-infobox',LinkInfoBox);
Vue.component('app-paginated-table',PaginatedTable);
Vue.component('grid',Grid);


const router = new VueRouter({
  routes: routes,
  mode:'history'
});

import axios from "axios";
function fetchPaperInfo (paperid) {
 // console.log("Inside fetchPaperInfo");
  //return {"id":"1","name":"paper_a","author":["abc","def"],"year":1993,"url":"http://abc.com","incoming_relations":[{"id":"e13","source_id":"3","source_name":"pqr","weight":32},{"id":"e12","source_id":"2","source_name":"xyz","weight":45}],"outgoing_relations":[{"id":"e14","destination_id":"4","destination_name":"mno","weight":65},{"id":"e15","destination_id":"5","destination_name":"good","weight":87}]}
  axios
  .get(`http://localhost:8081/graphNode/graphNode/`+paperid)
  .then(response => {
    console.log("API Call");
    console.log(response.data);
    return response.data;
  })
  .catch(err => {
    console.log(err);
  });

}




var paperInfo = '';
function setPaperInfoValue(value){
  console.log("Inside Set Value: ")
  paperInfo = value;
}

router.beforeEach(function(to, from, next) {
  console.log("Before Each 1");
  if(to.name === 'paperInfo'){
    console.log("Before Each 2: "+to.params.paperid);
    //paperInfo = fetchPaperInfo(to.params.paperid);
    axios
    .get(`http://localhost:8081/graphNode/graphNode/`+to.params.paperid)
    .then(response => {
      console.log("Paper API Call");
      console.log(JSON.stringify(response.data));
      paperInfo = response.data;
      to.matched[0].props.paperInfo = paperInfo;
      setPaperInfoValue(paperInfo);
      next();
    })
    .catch(err => {
      console.log(err);
      next();
    });
  
    //console.log("Props:")
    //console.log(to.matched[0].props);
    //console.log("Data");
    //console.log(paperInfo);
    //to.matched[0].props.paperInfo = paperInfo;
  }
  else if(to.name === 'linkInfo'){
      var fetchLinkInfo = function(){
        axios
        .get(`http://localhost:8081/relations/get?id=`+to.params.linkid+'&'+'user=user0')
        .then(response => {
          console.log("Link API Call");
          to.matched[0].props.linkInfo = response.data;
          console.log("Links")
          console.log(response.data);
          next();
        })
        .catch(err => {
          console.log(err);
          next();
        });
      }

      if(paperInfo == ''){
        console.log("PaperInfo Empty");
        axios
        .get(`http://localhost:8081/graphNode/graphNode/`+to.params.paperid)
        .then(response => {
          console.log("Paper API Call");
          console.log(JSON.stringify(response.data));
          paperInfo = response.data;
          to.matched[0].props.paperInfo = paperInfo;
          setPaperInfoValue(paperInfo);
          fetchLinkInfo();
        })
        .catch(err => {
          console.log(err);
        });
      }
      else{
      console.log("Paper Not Empty");
      to.matched[0].props.paperInfo = paperInfo;
      fetchLinkInfo();
      }
     /* axios
      .get(`http://localhost:8081/relations/get?id=`+to.params.linkid+'&'+'user=user0')
      .then(response => {
        console.log("Link API Call");
        to.matched[0].props.linkInfo = response.data;
        console.log("Links")
        console.log(response.data);
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });*/
    
  } 
  else{
    next();
  }
       /* console.log(to);
        console.log(next);
        console.log("beforeEach");
        if(to.name === 'paperInfo'){
          console.log("Inside paperInfo");
          var paperInfo = fetchPaperInfo();
          next({
            params: paperInfo
          })
          
        }*/
        
}.bind(Vue))

new Vue({
  el: '#app',
  store:store,
  router:router,
  render: h => h(App)
})