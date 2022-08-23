// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')


// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './assets/css/global-style.css';
import 'v-calendar/dist/style.css';
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import { BootstrapVue3 } from 'bootstrap-vue-3'
// import './assets/vender/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { createApp } from 'vue';
import App from './App.vue';
import VueOnsen from 'vue-onsenui'; // This imports 'onsenui', so no need to import it separately


const app = createApp(App);
app.config.globalProperties.Auth = Auth;

import * as components from 'vue-onsenui/esm/components';
import router from './router';
import './registerServiceWorker'
import Auth from "@/api/store/auth";

// Register all vue-onsenui components
Object.values(components).forEach(component =>
    app.component(component.name, component));

app.use(VueOnsen); // VueOnsen set here as plugin to VUE.
app.use(router);
app.use(SetupCalendar);
app.use(BootstrapVue3);
// eslint-disable-next-line
app.component("Calendar", Calendar)
// eslint-disable-next-line
app.component("DatePicker", DatePicker)
app.mount('#app');