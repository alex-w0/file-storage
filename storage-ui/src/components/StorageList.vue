<script setup lang="ts">
import StorageListItem from "./StorageListItem.vue";
</script>

<template>
  <div class="storageList">
    <StorageListItem
      v-for="index in 10"
      :key="index"
      file-name="Item 1"
      image-url="https://image.shutterstock.com/image-photo/epic-red-golden-clouds-above-600w-1935806773.jpg"
    ></StorageListItem>
  </div>
</template>
