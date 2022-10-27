<script setup lang="ts">
import { initializeApolloClient } from "@/apollo-client";
import { provideApolloClients } from "@vue/apollo-composable";
import { watchEffect } from "vue";
import StorageList from "../components/StorageList.vue";
import { configuration } from "@/composition-api/configuration";
import Alert from "../components/Alert.vue";
import { AlertState } from "@/shared/enums/AlertState";

const props = defineProps({
  bucketName: {
    type: String,
    required: true,
  },
});

const apolloClient = initializeApolloClient();

provideApolloClients({
  default: apolloClient,
});

watchEffect(() => {
  configuration.bucketName = props.bucketName;
});
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />
  <div class="font-sans">
    <div v-if="props.bucketName" class="storageGallery">
      <StorageList></StorageList>
    </div>
    <Alert v-else :alert-type="AlertState.ERROR"
      >The configuration of the widget was not configured properly.</Alert
    >
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
@use "@material/banner/styles";
@use "@material/dialog";

@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";

@include linear-progress.core-styles;
@include checkbox.core-styles;
@include fab.core-styles;
@include dialog.core-styles;
@include textfield.core-styles;
@import "../style.css";

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

  &__noData {
    padding: 16px 20px;
    text-align: center;
  }

  &Item {
    &__icon {
      display: block;
    }

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

.mdc-banner__graphic {
  background-color: #b00020;
}
</style>
