import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Message from './components/Message.vue'
import Box from './components/Box.vue'
import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'
import SocialSignIn from './components/SocialSignIn.vue'
import Logo from './components/Logo.vue'
import PapersTable from './components/PapersTable.vue'
import PaperInfoBox from './components/PaperInfoBox.vue'

import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);

Vue.component('app-box', Box );
Vue.component('app-listbox', ListBox );
Vue.component('app-navbar', NavigationBar );
Vue.component('app-message', Message);
Vue.component('app-social-sign-in', SocialSignIn);
Vue.component('app-logo',Logo);
Vue.component('app-table',PapersTable);
Vue.component('app-paper-infobox',PaperInfoBox);


const router = new VueRouter({
  routes: routes,
  mode:'history'
});

function fetchPaperInfo () {
 // console.log("Inside fetchPaperInfo");
  return {
    paperInfo: {"id":"p1","name":"paper_a","author":["abc","def"],"year":1993,"url":"http://abc.com","incoming_relations":[{"id":"e13","source_id":"p3","source_name":"pqr","weight":32},{"id":"e12","source_id":"p2","source_name":"xyz","weight":45}],"outgoing_relations":[{"id":"e14","destination_id":"p4","destination_name":"mno","weight":65},{"id":"e15","destination_id":"p5","destination_name":"good","weight":87}]}
  }
}


new Vue({
  el: '#app',
  store:store,
  router:router,
  render: h => h(App)
})
/*
router.beforeEach(function(to, from, next) {
        console.log(to);
        console.log(next);
        console.log("beforeEach");
        if(to.name === 'paperInfo'){
          console.log("Inside paperInfo");
          var paperInfo = fetchPaperInfo();
          next({
            params: paperInfo
          })
          
        }
        next()
}.bind(Vue)) */