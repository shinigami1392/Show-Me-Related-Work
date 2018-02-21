import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'
import AboutSection from './components/AboutDev.vue'
import NetworkGraph from './components/NetworkGraph.vue'
import Feedback from './components/Feedback.vue'
import LinkInfoBox from './components/LinkInfoBox.vue'
import AnimatedBox from './components/AnimatedBox.vue'
import PaginatedTable from './components/PaginatedTable.vue'

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
    AboutSection
  }
},
{
  path: '/areas/:areaid',
  name: 'allPapers',
  components: {
    'area-box': ListBox,
    'table-box': PaginatedTable
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
    'info-box': PaperInfoBox
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
    'feedback-box': Feedback
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
