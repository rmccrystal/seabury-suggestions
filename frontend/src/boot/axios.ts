import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import {LocalStorage} from "quasar";

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }) => {
  Vue.prototype.$axios = axios;
  const session: any = LocalStorage.getItem('session');
  if(session.token) {
    axios.defaults.headers.common['Auth-Token'] = session.token;
  }
});
