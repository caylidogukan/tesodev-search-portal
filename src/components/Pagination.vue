<script setup lang="ts">
import { ref, computed } from "vue";

const currentPage = ref(1);
const itemsPerPage = 10;

const paginate = (items: any[]) => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.slice(start, end);
};

const totalPages = computed(() => {
  return Math.ceil(items.length / itemsPerPage);
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div>
    <ul>
      <li v-for="item in paginatedItems" :key="item.id">
        {{ item.name }}
      </li>
    </ul>

    <nav>
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </nav>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
