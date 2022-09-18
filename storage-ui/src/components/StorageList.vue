<script setup lang="ts">
import StorageListItem from "./StorageListItem.vue";
</script>

<template>
  <ul class="mdc-list mdc-list--two-line storageList">
    <StorageListItem
      v-for="index in 10"
      :key="index"
      file-name="Item 1"
      image-url="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
    ></StorageListItem>
  </ul>
</template>
