<script setup lang="ts">
import StorageList from "../components/StorageList.vue";
import HelloWorld from "../components/HelloWorld.vue";

import * as mdc from "material-components-web";

mdc.autoInit();
</script>

<template>
  <div class="storageGallery">
    <StorageList></StorageList>
  </div>
  <label
    class="mdc-text-field mdc-text-field--filled"
    data-mdc-auto-init="MDCTextField"
  >
    <span class="mdc-text-field__ripple"></span>
    <input class="mdc-text-field__input" type="text" aria-labelledby="label" />
    <span id="label" class="mdc-floating-label">Input Label</span>
    <span class="mdc-line-ripple"></span>
  </label>

  <button
    class="mdc-icon-button"
    aria-label="Add to favorites"
    aria-pressed="false"
    data-mdc-auto-init="MDCIconButtonToggle"
  >
    <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on"
      >favorite</i
    >
    <i class="material-icons mdc-icon-button__icon">favorite_border</i>
  </button>
</template>

<style lang="scss">
:host {
  --background: #fff;
}

.storageList {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  &Item {
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    position: relative;
    padding: 16px;
    border-radius: 4px;
    background: var(--background);
    box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  }
}

img {
  width: 100%;
  height: auto;
}
</style>
