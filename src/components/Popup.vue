<template>
  <div v-if="visible" :class="popupClass" class="popup">
    <p>{{ message }}</p>
    <button @click="hidePopup">✖</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Props to control visibility and message
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  success: {
    type: Boolean,
    default: false,
  },
});

// Emit an event to hide the popup
const emit = defineEmits(["hide"]);

// Computed class for popup styling
const popupClass = computed(() =>
  props.success ? "success-popup" : "error-popup"
);

const hidePopup = () => {
  emit("hide");
};
</script>

<style scoped>
.popup {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  align-items: center;
}

.error-popup {
  background-color: #ffcccc;
  color: #ff0000;
}

.success-popup {
  background-color: #ccffcc;
  color: #008000;
}

.popup button {
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  margin-left: 1em;
}

.popup p {
  font-size: 14px;
  margin: 0;
}
</style>
