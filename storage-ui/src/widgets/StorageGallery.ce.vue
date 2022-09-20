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
@use "@material/theme" with (
  $primary: #a1c861,
  $secondary: #303030,
  $background: #fff
);

@use "@material/button/styles" as button-styles;
@use "@material/fab";
@use "@material/checkbox";
@use "@material/icon-button/styles" as icon-button-styles;

@use "@material/data-table/styles" as data-table-styles;

@include checkbox.core-styles;
@include fab.core-styles;

:host {
  --background: #fff;
}

.storageGallery {
  --mdc-outlined-button-outline-color: #a1c861;
  --mdc-protected-button-label-text-color: #fff;
  --mdc-outlined-button-hover-state-layer-color: #303030;
}

.storageList {
  width: 100%;

  &__actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  &Item {
    &__preview {
      img {
        width: 65px;
      }
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
    }
  }
}

img {
  width: 100%;
  height: auto;
}

.material-icons.small {
  transform: scale(0.8);
}

.mdc-button--outlined:not(:disabled) {
  color: #303030;
  border-color: #303030;
}
</style>
