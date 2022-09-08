<script setup lang="ts">
const props = defineProps({
  fileName: String,
  imageUrl: String,
});
</script>

<template>
  <div class="storageListItem">
    <img :src="$props.imageUrl" />
    {{ props.fileName }}
  </div>
</template>
