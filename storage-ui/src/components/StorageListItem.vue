<script setup lang="ts">
import { useFiles } from "@/composition-api/useFiles";
import type { PropType } from "vue";
import type { StorageFile } from "../generated/graphql";
import { isStorageDirectory } from "../utils/assertion";

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
    :data-row-id="storageFile.uuid"
    class="mdc-data-table__row"
  >
    <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
      <div class="mdc-checkbox mdc-data-table__row-checkbox">
        <input
          type="checkbox"
          class="mdc-checkbox__native-control"
          aria-labelledby="u0"
        />
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path
              class="mdc-checkbox__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
        <div class="mdc-checkbox__ripple"></div>
      </div>
    </td>
    <td class="mdc-data-table__cell" scope="row" id="u0">
      {{
        storageFile.__typename === "StorageDirectory"
          ? storageFile.metaData.name
          : ""
      }}
    </td>
    <td class="mdc-data-table__cell">
      <div class="storageListItem__icon">
        <span v-if="isStorageDirectory(storageFile)" class="material-icons"
          >folder</span
        >
        <span v-else class="material-icons">image</span>
      </div>
    </td>
    <td class="mdc-data-table__cell">
      <template v-if="isStorageDirectory(storageFile)">-</template>
      <template v-else>20mb</template>
    </td>
    <td class="mdc-data-table__cell">
      <template v-if="isStorageDirectory(storageFile)">-</template>
      <template v-else>jpg</template>
    </td>
    <td class="mdc-data-table__cell">{{ storageFile.createdAt }}</td>
    <td class="mdc-data-table__cell">
      <div class="storageListItem__actions">
        <button
          @click.stop.prevent="editStorageItem(storageFile.uuid)"
          class="mdc-icon-button material-icons small"
        >
          <div class="mdc-icon-button__ripple"></div>
          edit
        </button>
        <button
          @click.stop.prevent="previewStorageItem(storageFile.uuid)"
          class="mdc-icon-button material-icons small"
        >
          <div class="mdc-icon-button__ripple"></div>
          open_in_new
        </button>
        <button
          @click.stop.prevent="deleteStorageItem(storageFile.uuid)"
          class="mdc-icon-button material-icons small"
        >
          <div class="mdc-icon-button__ripple"></div>
          delete
        </button>
      </div>
    </td>
  </tr>
</template>
