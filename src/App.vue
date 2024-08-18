<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <div>
    <!-- Header or Navbar -->

    <!-- Main content area where views will be injected -->
    <main>
      <RouterView />
    </main>

    <!-- Footer (optional) -->
    <footer>
      <p>&copy; 2024 TESODEV</p>
    </footer>
  </div>
</template>

<style>
/* General App Styles */
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #35495e;
  padding: 1em;
  color: white;
}

nav {
  display: flex;
  gap: 1em;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

main {
  flex: 1; /* This ensures that the main content area takes up the remaining space */
  padding: 1em;
}

footer {
  background-color: #35495e;
  color: white;
  text-align: center;
  padding: 1em;
}
</style>
