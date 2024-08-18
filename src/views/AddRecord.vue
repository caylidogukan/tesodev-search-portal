<template>
  <div>
    <header>
      <router-link to="/">
        <img src="@/assets/tesodev-logo.png" alt="Tesodev Logo" />
      </router-link>
      <button @click="navigateToListPage">Return to List Page</button>
    </header>

    <h1>Add New Record</h1>
    <form @submit.prevent="submitForm">
      <!-- Name and Surname -->
      <label>Name Surname</label>
      <input
        v-model="name"
        placeholder="Enter name and surname"
        @input="clearError('name')"
      />
      <span v-if="errors.name" class="error-text">{{ errors.name }}</span>

      <!-- Country -->
      <label>Country</label>
      <input
        v-model="country"
        placeholder="Enter a country"
        @input="clearError('country')"
      />
      <span v-if="errors.country" class="error-text">{{ errors.country }}</span>

      <!-- City -->
      <label>City</label>
      <input
        v-model="city"
        placeholder="Enter a city"
        @input="clearError('city')"
      />
      <span v-if="errors.city" class="error-text">{{ errors.city }}</span>

      <!-- Email -->
      <label>Email</label>
      <input
        v-model="email"
        placeholder="Enter an email"
        @input="clearError('email')"
      />
      <span v-if="errors.email" class="error-text">{{ errors.email }}</span>

      <!-- Website -->
      <label>Website</label>
      <input
        v-model="website"
        placeholder="Enter a website"
        @input="clearError('website')"
      />
      <span v-if="errors.website" class="error-text">{{ errors.website }}</span>

      <!-- Add Button -->
      <button :disabled="!isFormValid" class="add-btn">Add</button>
    </form>

    <!-- Popup Component -->
    <Popup
      v-if="popupVisible"
      :message="popupMessage"
      :visible="popupVisible"
      :success="popupSuccess"
      @hide="popupVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Popup from "@/components/Popup.vue";

// local file for storage (using localStorage)
const LOCAL_STORAGE_KEY = "records";

const router = useRouter();

const name = ref("");
const country = ref("");
const city = ref("");
const email = ref("");
const website = ref("");

const errors = ref<{ [key: string]: string }>({});

// popup
const popupVisible = ref(false);
const popupMessage = ref("");
const popupSuccess = ref(false);

// check form validity
const isFormValid = computed(() => {
  return (
    name.value.trim().length > 0 &&
    country.value.trim().length > 0 &&
    city.value.trim().length > 0 &&
    email.value.trim().length > 0 &&
    website.value.trim().length > 0 &&
    Object.keys(errors.value).length === 0
  );
});

// clear specific errors when user types in input
const clearError = (field: string) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

const submitForm = async () => {
  // reset errors
  errors.value = {};
  let hasError = false;
  let errorMessages = [];

  // validation for name
  if (!name.value.includes(" ")) {
    errors.value.name = "Name and surname should contain at least 2 words. ";
    errorMessages.push(errors.value.name);
    hasError = true;
  }

  // validation for country
  if (!country.value) {
    errors.value.country = "Country is required. ";
    errorMessages.push(errors.value.country);
    hasError = true;
  }

  // validation for city
  if (!city.value) {
    errors.value.city = "City is required. ";
    errorMessages.push(errors.value.city);
    hasError = true;
  }

  // validation for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errors.value.email = "Invalid email format. ";
    errorMessages.push(errors.value.email);
    hasError = true;
  }

  // validation for website
  const websiteRegex = /^https?:\/\/\S+/;
  if (!websiteRegex.test(website.value)) {
    errors.value.website =
      "Invalid website format. Make sure it starts with http or https. ";
    errorMessages.push(errors.value.website);
    hasError = true;
  }

  if (hasError) {
    // show popup with error messages
    popupMessage.value = errorMessages.join("\n");
    popupSuccess.value = false;
    popupVisible.value = true;
  } else {
    // shorten the website URL using API
    try {
      const response = await fetch("http://localhost:3000/shorten-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: website.value }),
      });

      const data = await response.json();

      if (data.shortenedUrl) {
        // update website field with shortenedUrl
        website.value = data.shortenedUrl;

        // storing it in localStorage
        const newRecord = {
          name: name.value,
          country: country.value,
          city: city.value,
          email: email.value,
          website: website.value,
        };
        storeRecordInLocalStorage(newRecord);

        // show success popup and reset form
        popupMessage.value = "Record added successfully!";
        popupSuccess.value = true;
        popupVisible.value = true;

        // clear form fields
        name.value = "";
        country.value = "";
        city.value = "";
        email.value = "";
        website.value = "";
      } else {
        throw new Error("URL shortening failed");
      }
    } catch (error) {
      // show error popup if the URL shortening fails
      popupMessage.value = `Error shortening the URL: ${error.message}`;
      popupSuccess.value = false;
      popupVisible.value = true;
    }
  }

  // automatically hide the popup after 5 seconds
  setTimeout(() => {
    popupVisible.value = false;
  }, 5000);
};

const storeRecordInLocalStorage = (record: object) => {
  const storedRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
  const recordsArray = storedRecords ? JSON.parse(storedRecords) : [];
  recordsArray.push(record);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recordsArray));
};

const navigateToListPage = () => {
  router.push({ name: "SearchResults" });
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

h1 {
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

form label {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

form input {
  padding: 0.75em;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

form input:hover,
form input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.error-text {
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.add-btn {
  padding: 0.75em 1.5em;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
}

.add-btn:hover {
  background-color: #0056b3;
}

.add-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
