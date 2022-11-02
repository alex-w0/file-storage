<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
  },
  required: {
    type: Boolean,
  },
});
</script>

<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-dark"
      >{{ label }}
      <template v-if="required"> *</template>
    </label>
    <input
      type="text"
      :required="required"
      :id="id"
      class="bg-white border border-gray-dark text-gray-dark placeholder-gray text-sm rounded-lg block w-full p-2.5"
    />
    <p v-if="hint" class="mt-2 text-sm text-gray-dark">
      {{ hint }}
    </p>
  </div>
</template>
