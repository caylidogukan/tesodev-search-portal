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
      <h1>Find in records</h1>
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          @input="handleSearchInput"
          class="search-input"
        />
        <button
          :disabled="isSearchButtonDisabled"
          @click="navigateToSearchResults"
          class="search-button"
        >
          Search
        </button>
      </div>

      <div v-if="limitedResults.length > 0" class="search-results">
        <ul class="dropdown-menu">
          <li
            v-for="(result, index) in limitedResults"
            :key="index"
            class="dropdown-item"
            @click="navigateToSearchResults"
          >
            <p class="result-name">{{ result.nameSurname }}</p>
            <small class="result-location"
              >{{ result.city }}, {{ result.country }}</small
            >
          </li>
        </ul>
        <button @click="navigateToSearchResults" class="show-more-btn">
          Show more...
        </button>
      </div>
    </section>

    <!-- Top News Section -->
    <section class="top-news">
      <h2>Top News</h2>
      <div class="news-slider-container">
        <button
          @click="scrollNews('left')"
          class="slider-btn left"
          aria-label="Scroll left"
        >
          ‹
        </button>
        <div class="news-slider-wrapper">
          <div class="news-slider">
            <div
              v-for="(news, index) in newsItems"
              :key="index"
              class="news-item"
            >
              <img :src="news.image" alt="News Image" class="news-image" />
              <p>{{ news.title }}</p>
              <small>{{ news.time }} - by {{ news.author }}</small>
            </div>
          </div>
        </div>
        <button
          @click="scrollNews('right')"
          class="slider-btn right"
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-image">
          <img
            src="@/assets/contact.png"
            alt="Footer Image"
            class="footer-image"
          />
        </div>
        <div class="contact-info">
          <p>İletişim</p>
          <address>
            <p>
              Adres: Çifte Havuzlar Mah. Eski Londra Asfalt Cad. Kuluçka Merkezi
              D2 Blok No: 151/1F İç Kapı No: 2803 Esenler/İstanbul
            </p>
            <p>Email: bilgi@tesodev.com</p>
          </address>
        </div>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.279562401978!2d28.888373176694554!3d41.01913931875523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb7abf29ba35%3A0xc98f44e9057adcde!2zVGVzb2RldiBZYXrEsWzEsW0!5e0!3m2!1sen!2str!4v1723725304047!5m2!1sen!2str"
            width="500"
            height="250"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import mockData from "@/data/mock-data.json";

import newsImage from "@/assets/news.png";

const searchQuery = ref("");
const searchResults = ref<Array<any>>([]);
const router = useRouter();

const scrollNews = (direction: string) => {
  const slider = document.querySelector(".news-slider-wrapper");
  const itemWidth = document.querySelector(".news-item").clientWidth;
  const scrollAmount = itemWidth;
  if (direction === "left") {
    slider.scrollLeft -= scrollAmount;
  } else {
    slider.scrollLeft += scrollAmount;
  }
};

const handleSearchInput = () => {
  const query = searchQuery.value.trim().toLowerCase();

  if (query.length >= 2) {
    searchResults.value = mockData.data
      .map((item) => {
        const result = {};
        mockData.cols.forEach((col, index) => {
          result[col] = item[index];
        });
        return result;
      })
      .filter((item: any) => {
        const nameParts = item.nameSurname.toLowerCase().split(" ");
        return nameParts.some((part) => part.startsWith(query));
      });
  } else {
    searchResults.value = []; // clear results if less than 2 characters
  }
};

const isSearchButtonDisabled = computed(
  () => searchQuery.value.trim().length < 2
);

const navigateToSearchResults = () => {
  router.push({ name: "SearchResults", query: { q: searchQuery.value } });
};

const navigateToAddRecord = () => {
  router.push({ name: "AddRecord" });
};

const limitedResults = computed(() => {
  return Array.isArray(searchResults.value)
    ? searchResults.value.slice(0, 3)
    : [];
});

const newsItems = ref([
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
  {
    title: "A Plan to Rebuild the Bus Terminal Everyone Loves to Hate",
    image: newsImage,
    time: "1h ago",
    author: "Troy Corlson",
  },
]);
</script>

<style scoped>
.header {
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

/* search section */
.search-section {
  text-align: center;
  margin-top: 4em;
}

.search-container {
  display: inline-flex;
  align-items: center;
  gap: 1em;
}

.search-input {
  width: 400px;
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

.search-results {
  margin-top: 1em;
  padding: 1em;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.dropdown-menu {
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.result-name {
  font-weight: bold;
}

.result-location {
  font-size: 0.875em;
  color: #666;
}

.show-more-btn {
  background-color: #007bff;
  color: white;
  padding: 0.75em 1.5em;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.show-more-btn:hover {
  background-color: #0056b3;
}

/*news section */
.top-news {
  padding: 2em 0;
}

.news-slider-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  margin: 0;
}

.news-slider-wrapper {
  display: flex;
  overflow-x: hidden;
  max-width: 100%;
  padding: 0 2em;
}

.news-slider {
  display: flex;
  gap: 1em;
  transition: transform 0.3s ease;
}

.news-item {
  flex: 0 0 300px;
  text-align: center;
}

.news-image {
  width: 100%;
  height: auto;
}

.slider-btn {
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 15px;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.slider-btn.left {
  left: 20px;
}

.slider-btn.right {
  right: 20px;
}
.slider-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
@media (max-width: 768px) {
  .news-item {
    flex: 0 0 90%;
  }
}

/* Footer */
footer {
  background-color: #35495e;
  color: white;
  padding: 2em 0;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
}

.footer-image {
  max-width: 200px;
}

.map-container {
  max-width: 500px;
  width: 100%;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  .footer-image,
  .map-container {
    margin-top: 1em;
  }
}
</style>
