<script setup lang="ts">
import { initializeApolloClient } from "@/apollo-client";
import { DefaultApolloClient } from "@vue/apollo-composable/dist";
import { onMounted, provide, ref, watchEffect, type Ref } from "vue";
import StorageList from "../components/StorageList.vue";
import { MDCBanner } from "@material/banner";
import { configuration } from "@/composition-api/configuration";

const props = defineProps({
  bucketName: {
    type: String,
    required: true,
  },
});

const invalidSetupConfigurationElement: Ref<HTMLElement | null> = ref(null);
const apolloClient = initializeApolloClient();

provide(DefaultApolloClient, apolloClient);

watchEffect(() => {
  configuration.bucketName = props.bucketName;
});

onMounted(() => {
  if (invalidSetupConfigurationElement.value) {
    const el = new MDCBanner(invalidSetupConfigurationElement.value);
    el.open();
  }
});
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
  />

  <div v-if="props.bucketName" class="storageGallery">
    <StorageList></StorageList>
  </div>
  <div
    v-else
    class="mdc-banner"
    role="banner"
    ref="invalidSetupConfigurationElement"
  >
    <div class="mdc-banner__content" role="alertdialog" aria-live="assertive">
      <div class="mdc-banner__graphic-text-wrapper">
        <div class="mdc-banner__graphic" role="img" alt="">
          <i class="material-icons mdc-banner__icon">error</i>
        </div>
        <div class="mdc-banner__text">
          The configuration of the widget was not configured properly.
        </div>
      </div>
    </div>
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
