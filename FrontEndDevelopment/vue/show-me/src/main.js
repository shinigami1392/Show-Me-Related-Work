import Vue from 'vue'
import App from './App.vue'
import Message from './components/Message.vue'
import Box from './components/Box.vue'
import ListBox from './components/ListBox.vue'
<<<<<<< Updated upstream
import NavigationBar from './components/NavigationBar.vue'
=======
import SocialSignIn from './components/SocialSignIn.vue'
import Logo from './components/Logo.vue'
>>>>>>> Stashed changes

Vue.component('app-box', Box );
Vue.component('app-listbox', ListBox );
Vue.component('app-navbar', NavigationBar );
Vue.component('app-message', Message);
Vue.component('app-social-sign-in', SocialSignIn);
Vue.component('app-logo',Logo);

new Vue({
  el: '#app',
  render: h => h(App)
})
