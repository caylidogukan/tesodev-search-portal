<template>
  <div>
    <input v-model="query" @input="onInput" placeholder="Search..." />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, emit } from "vue";

export default defineComponent({
  emits: ["search"],
  setup(_, { emit }) {
    const query = ref("");

    const onInput = () => {
      emit("search", query.value);
    };

    return { query, onInput };
  },
});
</script>
