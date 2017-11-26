import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'
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
    components: {
      'area-box': ListBox,
      'table-box': PapersTable,
      'info-box': PaperInfoBox
    },
    name: 'paperInfo'
  },
  {
    path: '/links/:linkid',
    components: {
      'area-box': ListBox,
      'link-info-box': LinkInfoBox
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
