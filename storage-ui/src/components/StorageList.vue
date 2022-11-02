<script setup lang="ts">
import { ref, type Ref } from "vue";
import StorageListItem from "./StorageListItem.vue";

import { useFiles } from "@/composition-api/useFiles";
import TableHeader from "./TableHeader.vue";
import ButtonIcon from "./ButtonIcon.vue";
import DialogCreateDirectory from "./dialogs/DialogCreateDirectory.vue";

const showCreateDirectoryDialog: Ref<boolean> = ref(false);

const { files, isLoading, loadFiles } = useFiles();

loadFiles();
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

  <DialogCreateDirectory v-if="showCreateDirectoryDialog" />
</template>
