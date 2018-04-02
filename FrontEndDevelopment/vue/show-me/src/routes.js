import ListBox from './components/SideNavigationBar.vue'
import NavigationBar from './components/NavigationBar.vue'
import NetworkGraph from './components/NetworkGraph.vue'
import Feedback from './components/Feedback.vue'
import LinkInfoBox from './components/LinkInfoBox.vue'
import AnimatedBox from './components/AnimatedBox.vue'
import PaginatedTable from './components/PaginatedTable.vue'
import SearchBox from './components/SearchBox.vue'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//Lazy routing
const PapersTable = resolve => {
  require.ensure(['./components/PapersTable.vue'], () => {
    resolve(require('./components/PapersTable.vue'));
  });
};
const PaperInfoBox = resolve => {
  require.ensure(['./components/PaperInfoBox.vue'], () => {
    resolve(require('./components/PaperInfoBox.vue'));
  });
};


var paperInfo = {};
export const routes = [{
  path: '/',
  name: 'home',
  components: {
    default: NavigationBar,
    'area-box': ListBox,
    'animation-box': AnimatedBox,
    'search-box': SearchBox
  }
},
{
  path: '/areas/:areaid',
  name: 'allPapers',
  components: {
    'area-box': ListBox,
    'table-box': PaginatedTable,
    'search-box': SearchBox
  },
},
{
  path: '/areas/:areaid/paper/:paperid',
  beforeEnter: (to, from, next) => {
    next();
  },
  components: {
    'area-box': ListBox,
    'table-box': NetworkGraph,
    'info-box': PaperInfoBox,
    'search-box': SearchBox
  },
  name: 'paperInfo',
  meta: { adminOnly: false }

},
{
  path: '/areas/:areaid/paper/:paperid/links/:linkid',
  components: {
    'area-box': ListBox,
    'table-box': NetworkGraph,
    'link-info-box': LinkInfoBox,
    'feedback-box': Feedback,
    'search-box': SearchBox
  },
  name: 'linkInfo'
},
{
  path: '*',
  redirect: {
    name: 'home'
  }
}


];
//
// routes.beforeEach((to, from, next) => {
//   if(to.name == 'allPapers') { // check if "to"-route is "callback" and allow access
//   next()
// } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
//   next()
// } else { // trigger auth0 login
//   router.app.$auth.login()
// }
// })
