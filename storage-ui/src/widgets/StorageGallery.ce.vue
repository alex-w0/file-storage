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
  <div class="font-sans">
    <div v-if="props.bucketName">
      <StorageList></StorageList>
    </div>
    <Alert v-else :alert-type="AlertState.ERROR"
      >The configuration of the widget was not configured properly.</Alert
    >
  </div>
</template>

<style lang="scss">
@import "../style.css";
</style>
