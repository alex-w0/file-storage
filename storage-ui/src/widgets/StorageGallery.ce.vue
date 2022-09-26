<script setup lang="ts">
import { initializeApolloClient } from "@/apollo-client";
import { DefaultApolloClient } from "@vue/apollo-composable/dist";
import { provide } from "vue";
import StorageList from "../components/StorageList.vue";

const apolloClient = initializeApolloClient();

provide(DefaultApolloClient, apolloClient);
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />

  <div class="storageGallery">
    <StorageList></StorageList>
  </div>
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

@use "@material/linear-progress";

@include linear-progress.core-styles;
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

  &__loader {
    top: 56px;
  }

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
