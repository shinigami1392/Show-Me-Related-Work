import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'
import NetworkGraph from './components/NetworkGraph.vue'
import Feedback from './components/Feedback.vue'
import LinkInfoBox from './components/LinkInfoBox.vue'

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

function fetchPaperInfo () {
  console.log("Inside fetchPaperInfo");
  return {
    paperInfo: {"id":"1","name":"paper_a","author":["abc","def"],"year":1993,"url":"http://abc.com","incoming_relations":[{"id":"e13","source_id":"3","source_name":"pqr","weight":32},{"id":"e12","source_id":"2","source_name":"xyz","weight":45}],"outgoing_relations":[{"id":"e14","destination_id":"4","destination_name":"mno","weight":65},{"id":"e15","destination_id":"5","destination_name":"good","weight":87}]}
  }
}

function testRoute(to, from){
   console.log("Route: ");
   console.log(to);
   return {query:'a'};
}


var paperInfo = {};
export const routes = [{
    path: '/',
    name: 'home',
    components: {
      default: NavigationBar,
      'area-box': ListBox
    }
  },
  {
    path: '/areas/:areaid',
    name: 'allPapers',
    components: {
      'area-box': ListBox,
      'table-box': PapersTable
    },
  },
  {
    path: '/areas/:areaid/paper/:paperid',
    beforeEnter: (to, from, next) => {
      console.log("Inside paperInfo: ");
      //paperInfo = fetchPaperInfo();
      //console.log(to);
      //to.matched[0].props = paperInfo;
      //test();
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
      'feedback-box':Feedback
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
