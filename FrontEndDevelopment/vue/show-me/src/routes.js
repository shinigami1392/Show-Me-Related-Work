import ListBox from './components/SideNavigationBar.vue'
import NavigationBar from './components/NavigationBar.vue'
import NetworkGraph from './components/NetworkGraph.vue'
import Feedback from './components/Feedback.vue'
import LinkInfoBox from './components/LinkInfoBox.vue'
import AnimatedBox from './components/AnimatedBox.vue'
import SearchBox from './components/SearchBox.vue'
import Datatable from './components/Datatable.vue'
import AboutUs from './components/AboutUs.vue'
import ContactUs from './components/ContactUs.vue'

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
  path: '/aboutus',
  name: 'aboutus',
  components: {
    'aboutus': AboutUs,
  },
},
{
  path: '/contactus',
  name: 'contactus',
  components: {
    'contactus': ContactUs,
  },
},
{
  path: '/areas/:areaid',
  name: 'allPapers',
  components: {
    'area-box': ListBox,
    'search-box': SearchBox,
    'table-box': Datatable
  },
},
{
  path: '/areas/:areaid/paper/:paperid',
  beforeEnter: (to, from, next) => {
    console.log("beforeEnter");
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