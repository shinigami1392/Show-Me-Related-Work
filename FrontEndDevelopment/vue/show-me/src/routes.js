import PapersTable from './components/PapersTable.vue'
import PaperInfoBox from './components/PaperInfoBox.vue'

export const routes = [
    { path:'/papers/:catId',component:PapersTable},
    { path:'/graph/paper/:paperid',component:PaperInfoBox}
    ];