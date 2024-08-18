// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { transformData } from "./utils/transformData";
import mockData from "./data/mock-data.json";

const transformedData = transformData(mockData);

// Save the transformed data to local storage
localStorage.setItem("searchData", JSON.stringify(transformedData));

createApp(App).use(router).mount("#app");
