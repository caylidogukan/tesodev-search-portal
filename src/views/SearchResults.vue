<template>
  <div>
    <!-- Header -->
    <header class="header">
      <router-link to="/">
        <img src="@/assets/tesodev-logo.png" alt="Tesodev Logo" />
      </router-link>
      <button @click="navigateToAddRecord">Add new record</button>
    </header>

    <!-- Search Section -->
    <section class="search-section">
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="search-input"
        />
        <button @click="performSearch" class="search-button">Search</button>
      </div>
    </section>

    <!-- Ordering Section -->
    <section class="ordering-section">
      <label for="orderBy" class="order-label">Order By:</label>
      <select
        v-model="orderBy"
        @change="sortResults"
        id="orderBy"
        class="order-select"
      >
        <option value="name-asc">Name ascending</option>
        <option value="name-desc">Name descending</option>
        <option value="year-asc">Year ascending</option>
        <option value="year-desc">Year descending</option>
      </select>
    </section>

    <!-- Results Section -->
    <section class="results-section">
      <ul class="results-list">
        <li
          v-for="(result, index) in paginatedResults"
          :key="index"
          @click="selectResult(result)"
          @mouseover="hoverResult(result)"
          @mouseleave="hoverResult(null)"
          :class="{
            selected: selectedResult === result,
            hovered: hoveredResult === result,
          }"
          class="result-item"
        >
          <div>
            <p class="result-name">{{ result.nameSurname }}</p>
            <small class="result-location"
              >{{ result.city }}, {{ result.country }}</small
            >
          </div>
          <div>
            <p class="result-metadata">
              {{ result.date }} - {{ result.author }}
            </p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Pagination Section -->
    <section class="pagination-section">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        Previous
      </button>
      <span
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ 'active-page': currentPage === page }"
        class="pagination-page"
      >
        {{ page }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-button"
      >
        Next
      </button>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import mockData from "@/data/mock-data.json";

const searchQuery = ref("");
const searchResults = ref([]);
const selectedResult = ref(null);
const hoveredResult = ref(null);
const orderBy = ref("name-asc");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const router = useRouter();
const route = useRoute();

onMounted(() => {
  const query = route.query.q || "";
  searchQuery.value = query;
  performSearch();
});

const sortResults = () => {
  if (orderBy.value === "name-asc") {
    searchResults.value.sort((a, b) =>
      a.nameSurname.localeCompare(b.nameSurname)
    );
  } else if (orderBy.value === "name-desc") {
    searchResults.value.sort((a, b) =>
      b.nameSurname.localeCompare(a.nameSurname)
    );
  } else if (orderBy.value === "year-asc") {
    searchResults.value.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (orderBy.value === "year-desc") {
    searchResults.value.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

const performSearch = () => {
  const query = searchQuery.value.trim().toLowerCase();
  searchResults.value = mockData.data
    .map((item) => {
      const result = {};
      mockData.cols.forEach((col, index) => {
        result[col] = item[index];
      });
      return result;
    })
    .filter((item) => item.nameSurname.toLowerCase().includes(query));

  sortResults();
  currentPage.value = 1; // Reset to first page
};

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return searchResults.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(searchResults.value.length / itemsPerPage.value)
);

const visiblePages = computed(() => {
  const total = totalPages.value;
  if (total <= 6) {
    return Array.from({ length: total }, (_, i) => i + 1);
  } else if (currentPage.value <= 3) {
    return [1, 2, 3, 4, "...", total];
  } else if (currentPage.value >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  } else {
    return [
      1,
      "...",
      currentPage.value - 1,
      currentPage.value,
      currentPage.value + 1,
      "...",
      total,
    ];
  }
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const goToPage = (page) => {
  if (page !== "...") {
    currentPage.value = page;
  }
};

const selectResult = (result) => {
  selectedResult.value = result;
};

const hoverResult = (result) => {
  hoveredResult.value = result;
};

const navigateToAddRecord = () => {
  router.push({ name: "AddRecord" });
};
</script>
<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

header img {
  height: 100px;
}

header button {
  position: absolute;
  right: 20px;
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

header button:hover {
  background-color: #0056b3;
}

.search-section,
.ordering-section,
.results-section,
.pagination-section {
  padding: 20px 600px;
}

.search-container {
  display: flex;
  gap: 1em;
  justify-content: center;
  margin-bottom: 1em;
}

.search-input {
  flex: 1;
  padding: 0.75em;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 1rem;
}

.search-button {
  padding: 0.75em 1.5em;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.search-button:hover {
  background-color: #0056b3;
}
.order-label {
  margin-right: 0.5em;
}

.order-select {
  padding: 0.5em;
  border-radius: 5px;
  border: 1px solid #ced4da;
  font-size: 1rem;
}

.results-list {
  list-style: none;
  padding: 0;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  margin-bottom: 0.5em;
  background-color: #f8f9fa;
}
.result-item:hover,
.result-item.selected {
  background-color: #e9ecef;
}
.result-info {
  flex: 1;
}

.result-meta {
  text-align: right;
}

.result-name {
  font-weight: bold;
  margin-bottom: 0.25em;
}

.result-location {
  color: #6c757d;
}

.result-metadata {
  font-size: 0.875rem;
  color: #6c757d;
}

.pagination-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  margin-top: 1em;
}

.pagination-button {
  padding: 0.5em 1em;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin: 0 0.5em;
}

.pagination-page {
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.pagination-button:disabled {
  background-color: #d6d8db;
  cursor: not-allowed;
}
.pagination-page.active-page {
  background-color: #007bff;
  color: white;
}
.active-page {
  font-weight: bold;
  text-decoration: underline;
}

.footer {
  background-color: #35495e;
  color: white;
  text-align: center;
  padding: 1em;
}
.logo {
  height: 100px;
}
button {
  margin: 1em;
}
</style>
