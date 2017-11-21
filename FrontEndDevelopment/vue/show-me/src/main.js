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

Vue.use(VueRouter);

Vue.component('app-box', Box );
Vue.component('app-listbox', ListBox );
Vue.component('app-navbar', NavigationBar );
Vue.component('app-message', Message);
Vue.component('app-social-sign-in', SocialSignIn);
Vue.component('app-logo',Logo);
Vue.component('app-table',PapersTable);
Vue.component('app-paper-infobox',PaperInfoBox);


const routes = [
  { path:'/papers/:catId',component:PapersTable},
  { path:'/graph/paper/:paperid',component:PaperInfoBox}
  ];

const router = new VueRouter({
  routes: routes,
  mode:'history'
});


new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
