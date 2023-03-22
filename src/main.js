import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//blockui

//dataTables
import { ClientTable} from 'v-tables-3';

createApp(App)
    .use(store)
    .use(router)
    .use(ClientTable,{},'bootstrap4')
    .mount("#app");
