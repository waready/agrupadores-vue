import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//blockui
import moment from 'moment';
//dataTables
import { ClientTable} from 'v-tables-3';
const app = createApp(App);

app.config.globalProperties.$moment = moment;

// createApp(App)
app
    .use(store)
    .use(router)
    .use(ClientTable,{},'bootstrap4')
    .mount("#app");
