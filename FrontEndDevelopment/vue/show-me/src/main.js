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
import Datatable from './components/Datatable.vue'

import { routes } from './routes';
import { store } from './store';

import './assets/css/fontawesome-all.css';

Vue.use(VueRouter);

Vue.component('app-box', Box);
Vue.component('app-listbox', ListBox);
Vue.component('app-navbar', NavigationBar);
Vue.component('app-table', PapersTable);
Vue.component('app-paper-infobox', PaperInfoBox);
Vue.component('app-link-infobox', LinkInfoBox);
Vue.component('app-paginated-table', PaginatedTable);
Vue.component('grid', Grid);
Vue.component('datatable', Datatable);


const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

import axios from "axios";
function fetchPaperInfo(paperid) {
  axios
    .get(`http://localhost:8081/graphNode/graphNode/` + paperid)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });

}

var paperInfo = '';
function setPaperInfoValue(value) {
  paperInfo = value;
}
var visitedPapers = [];
const maxVisitHistory = 5;

router.beforeEach(function (to, from, next) {
  if (to.name === 'paperInfo') {
    if(visitedPapers.length < maxVisitHistory){
      visitedPapers.push({'id':to.params.paperid,'name':''})
    }
    else if(visitedPapers.length == maxVisitHistory){
        for(let index = 1; index <= maxVisitHistory - 1; index++){
            visitedPapers[index-1] =visitedPapers[index];
        }
        visitedPapers[maxVisitHistory - 1] = {'id':to.params.paperid, 'name':''};
    }

    axios
      .get(`http://localhost:8081/graphNode/graphNode/` + to.params.paperid)
      .then(response => {
        paperInfo = response.data;
        if(paperInfo != null){
          visitedPapers[visitedPapers.length - 1]['name'] =  paperInfo.name;
        }

        to.matched[0].props.paperInfo = paperInfo;
        to.matched[0].props.visitedPapers = visitedPapers;
        setPaperInfoValue(paperInfo);
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }
  else if (to.name === 'linkInfo') {
    
    var fetchLinkInfo = function () {
      var papers = to.params.linkid.split("_");
      axios
        .get(`http://localhost:8081/relations/get?domain=` + to.params.areaid + `&source=`+papers[0]+`&destination=`+papers[1]+`&user=user0`)
        .then(response => {
          to.matched[0].props.linkInfo = response.data;
          next();
        })
        .catch(err => {
          next();
        });
    }

    if (paperInfo == '') {
      axios
        .get(`http://localhost:8081/graphNode/graphNode/` + to.params.paperid)
        .then(response => {
          paperInfo = response.data;
          to.matched[0].props.paperInfo = paperInfo;
          setPaperInfoValue(paperInfo);
          fetchLinkInfo();
        })
        .catch(err => {
          console.log(err);
        });
    }
    else {
      to.matched[0].props.paperInfo = paperInfo;
      fetchLinkInfo();
    }
  }
  else {
    next();
  }

}.bind(Vue))

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
})
