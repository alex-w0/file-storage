<script setup lang="ts">
import type { PropType } from "vue";
import {
  PencilSquareIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
  ArrowUpTrayIcon,
  FolderPlusIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  icon: {
    type: String as PropType<
      "edit" | "previewFile" | "delete" | "upload" | "createFolder"
    >,
    required: true,
  },
  size: {
    type: String as PropType<"medium" | "large">,
    default: "medium",
  },
});

const iconSize = props.size === "medium" ? "w-4 h-4" : "w-6 h-6";
</script>

<template>
  <button
    class="p-2 text-gray-dark rounded-full cursor-pointer hover:bg-gray/10"
  >
    <PencilSquareIcon
      v-if="icon === 'edit'"
      :class="iconSize"
    ></PencilSquareIcon>
    <ArrowTopRightOnSquareIcon
      v-if="icon === 'previewFile'"
      :class="iconSize"
    ></ArrowTopRightOnSquareIcon>
    <TrashIcon v-if="icon === 'delete'" :class="iconSize"></TrashIcon>
    <ArrowUpTrayIcon
      v-if="icon === 'upload'"
      :class="iconSize"
    ></ArrowUpTrayIcon>
    <FolderPlusIcon
      v-if="icon === 'createFolder'"
      :class="iconSize"
    ></FolderPlusIcon>
  </button>
</template>
