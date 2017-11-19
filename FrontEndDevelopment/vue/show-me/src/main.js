import Vue from 'vue'
import App from './App.vue'
import Message from './components/Message.vue'
import Box from './components/Box.vue'
import ListBox from './components/ListBox.vue'
import NavigationBar from './components/NavigationBar.vue'

Vue.component('app-box', Box );
Vue.component('app-listbox', ListBox );
Vue.component('app-navbar', NavigationBar );
Vue.component('app-message', Message);

new Vue({
  el: '#app',
  render: h => h(App)
})
