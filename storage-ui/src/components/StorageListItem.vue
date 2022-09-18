<script setup lang="ts">
const props = defineProps({
  fileName: String,
  imageUrl: String,
});
</script>

<template>
  <li class="mdc-list-item" tabindex="0">
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__graphic">
      <div class="storageListItem__preview">
        <img :src="$props.imageUrl" />
      </div>
    </span>
    <span class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">{{ props.fileName }}</span>
      <span class="mdc-list-item__secondary-text">20mb</span>
    </span>
    <span aria-hidden="true" class="mdc-list-item__meta">
      <button class="mdc-fab mdc-fab--mini mdc-fab--touch">
        <div class="mdc-fab__ripple"></div>
        <span class="material-icons mdc-fab__icon">more_vert</span>
        <div class="mdc-fab__touch"></div>
      </button>
    </span>
  </li>
</template>
