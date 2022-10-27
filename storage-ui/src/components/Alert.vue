<script setup lang="ts">
import type { AlertState } from "@/shared/enums/AlertState";
import type { PropType } from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";

defineProps({
  alertType: {
    type: Number as PropType<AlertState>,
    required: true,
  },
});
</script>

<template>
  <div class="text-red bg-red/20 p-4 relative flex gap-4 items-center">
    <ExclamationCircleIcon class="h-8 w-8" />
    <slot></slot>
  </div>
</template>
