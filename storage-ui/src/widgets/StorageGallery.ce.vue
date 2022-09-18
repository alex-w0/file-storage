<script setup lang="ts">
import StorageList from "../components/StorageList.vue";
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />

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
@use "@material/card";
@use "@material/button/styles";
@use "@material/fab";
@use "@material/list";

@include card.core-styles;
@include fab.core-styles;
@include list.deprecated-core-styles;

:host {
  --background: #fff;
}

.storageList {
  &Item {
    &__preview {
      img {
        width: 65px;
      }
    }
  }
}

img {
  width: 100%;
  height: auto;
}
</style>
