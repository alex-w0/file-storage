<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import StorageListItem from "./StorageListItem.vue";

import { MDCDataTable } from "@material/data-table";
import { MDCLinearProgress } from "@material/linear-progress";
import { useFiles } from "@/composition-api/useFiles";
import Dialog from "./Dialog.vue";
import TableHeader from "./TableHeader.vue";
import ButtonIcon from "./ButtonIcon.vue";

const dataTableElement: Ref<HTMLElement | null> = ref(null);
const dataTableLoadingElement: Ref<HTMLElement | null> = ref(null);
const showCreateDirectoryDialog: Ref<boolean> = ref(false);

const { files, isLoading, loadFiles } = useFiles();

loadFiles();

onMounted(() => {
  if (dataTableElement.value === null) {
    throw new Error("DataTableElement is not defined");
  }

  if (dataTableLoadingElement.value === null) {
    throw new Error("DataTableElement is not defined");
  }

  new MDCDataTable(dataTableElement.value);
  new MDCLinearProgress(dataTableLoadingElement.value);
});
</script>

<template>
  <table class="w-full border">
    <thead>
      <tr>
        <TableHeader>Name</TableHeader>
        <TableHeader>Storage Type</TableHeader>
        <TableHeader>Size</TableHeader>
        <TableHeader>File extension</TableHeader>
        <TableHeader>Created At</TableHeader>
        <TableHeader>
          <div class="flex gap-4 justify-end items-center">
            <ButtonIcon icon="upload" size="large" />
            <ButtonIcon
              @click="showCreateDirectoryDialog = true"
              icon="createFolder"
              size="large"
            />
            <ButtonIcon icon="delete" size="large" />
          </div>
        </TableHeader>
      </tr>
    </thead>
    <tbody v-if="files">
      <template v-if="files.length">
        <StorageListItem
          v-for="file in files"
          :key="file.uuid"
          :storage-file="file"
        ></StorageListItem>
      </template>
      <tr v-else>
        <td class="py-4 px-8 text-center text-sm" colspan="7">
          This directory is empty
        </td>
      </tr>
    </tbody>
  </table>

  <Dialog
    v-if="showCreateDirectoryDialog"
    dialog-title="Create a new directory"
  >
    <label class="mdc-text-field mdc-text-field--outlined">
      <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <span class="mdc-floating-label" id="my-label-id">Name</span>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>
      <input
        type="text"
        id="directoryDialog__name"
        name="directoryDialog__name"
        class="mdc-text-field__input"
        aria-labelledby="my-label-id"
      />
    </label>
  </Dialog>
</template>
