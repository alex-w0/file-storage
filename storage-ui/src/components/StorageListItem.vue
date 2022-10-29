<script setup lang="ts">
import { useFiles } from "@/composition-api/useFiles";
import type { PropType } from "vue";
import type { StorageFile } from "../generated/graphql";
import { isStorageDirectory } from "../utils/assertion";
import TableColumn from "./TableColumn.vue";
import ButtonIcon from "./ButtonIcon.vue";
import { FolderIcon, PhotoIcon } from "@heroicons/vue/24/solid";

defineProps({
  storageFile: {
    type: Object as PropType<StorageFile>,
    required: true,
  },
});

const { loadFiles } = useFiles();

function openStorageDirectory(uuid: string) {
  loadFiles({
    directoryLevel: uuid,
  });
}

function editStorageItem(uuid: string) {
  console.log("edit");
}

function deleteStorageItem(uuid: string) {
  console.log("delete");
}

const previewStorageItem = (uuid: string) => {
  console.log(uuid);
};
</script>

<template>
  <tr
    @click="
      isStorageDirectory(storageFile)
        ? openStorageDirectory(storageFile.uuid)
        : undefined
    "
  >
    <TableColumn>
      {{
        storageFile.__typename === "StorageDirectory"
          ? storageFile.metaData.name
          : ""
      }}
    </TableColumn>
    <TableColumn>
      <FolderIcon
        v-if="isStorageDirectory(storageFile)"
        class="w-4 h-4"
      ></FolderIcon>
      <PhotoIcon v-else class="w-4 h-4"></PhotoIcon>
    </TableColumn>

    <TableColumn>
      <template v-if="isStorageDirectory(storageFile)">-</template>
      <template v-else>20mb</template>
    </TableColumn>

    <TableColumn>
      <template v-if="isStorageDirectory(storageFile)">-</template>
      <template v-else>jpg</template>
    </TableColumn>

    <TableColumn>
      {{ storageFile.createdAt }}
    </TableColumn>

    <TableColumn>
      <div class="flex gap-4 justify-end items-center">
        <ButtonIcon
          @click.stop.prevent="editStorageItem(storageFile.uuid)"
          icon="edit"
        />
        <ButtonIcon
          @click.stop.prevent="previewStorageItem(storageFile.uuid)"
          icon="previewFile"
        />
        <ButtonIcon
          @click.stop.prevent="deleteStorageItem(storageFile.uuid)"
          icon="delete"
        />
      </div>
    </TableColumn>
  </tr>
</template>
