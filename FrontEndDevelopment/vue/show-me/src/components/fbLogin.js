import facebookLogin from './FacebookLogin.vue'
export const facebookLoginPlugin = {
  install: function (Vue, options) {
    Vue.component(facebookLogin.name, facebookLogin)
  }
}
export default facebookLogin