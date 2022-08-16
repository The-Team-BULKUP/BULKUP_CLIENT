// import { createApp } from 'vue'
// import App from './App.vue'
//
// createApp(App).mount('#app')


// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './assets/css/global-style.css';
import './assets/vender/css/bootstrap.min.css';

// JS import
import { createApp } from 'vue';
import App from './App.vue';
import VueOnsen from 'vue-onsenui'; // This imports 'onsenui', so no need to import it separately

const app = createApp(App);

import * as components from 'vue-onsenui/esm/components';

// Register all vue-onsenui components
Object.values(components).forEach(component =>
    app.component(component.name, component));

app.use(VueOnsen); // VueOnsen set here as plugin to VUE.
app.mount('#app');