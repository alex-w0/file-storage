<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import StorageListItem from "./StorageListItem.vue";

import { MDCDataTable } from "@material/data-table";
import { MDCLinearProgress } from "@material/linear-progress";
import { useFiles } from "@/composition-api/useFiles";

const dataTableElement: Ref<HTMLElement | null> = ref(null);
const dataTableLoadingElement: Ref<HTMLElement | null> = ref(null);

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
  {{ files }}
  <div class="mdc-data-table storageList" ref="dataTableElement">
    <div class="mdc-data-table__table-container">
      <table class="mdc-data-table__table" aria-label="Dessert calories">
        <thead>
          <tr class="mdc-data-table__header-row">
            <th
              class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox"
              role="columnheader"
              scope="col"
            >
              <div
                class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected"
              >
                <input
                  type="checkbox"
                  class="mdc-checkbox__native-control"
                  aria-label="Toggle all rows"
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
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
            >
              Name
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
            >
              Storage Type
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
            >
              Size
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
            >
              File extension
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
            >
              Created at
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
            >
              <div class="storageListItem__actions">
                <button class="mdc-icon-button material-icons small">
                  <div class="mdc-icon-button__ripple"></div>
                  file_upload
                </button>
                <button class="mdc-icon-button material-icons small">
                  <div class="mdc-icon-button__ripple"></div>
                  create_new_folder
                </button>
                <button class="mdc-icon-button material-icons small">
                  <div class="mdc-icon-button__ripple"></div>
                  delete_forever
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="files" class="mdc-data-table__content">
          <template v-if="files.length">
            <StorageListItem
              v-for="file in files"
              :key="file.uuid"
              :storage-file="file"
            ></StorageListItem>
          </template>
          <tr v-else>
            <td class="storageList__noData" colspan="7">
              This directory is empty
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="mdc-data-table__progress-indicator storageList__loader"
      :style="`display: ${isLoading ? 'block' : 'none'}`"
    >
      <div class="mdc-data-table__scrim"></div>
      <div
        class="mdc-linear-progress mdc-linear-progress--indeterminate mdc-data-table__linear-progress"
        role="progressbar"
        ref="dataTableLoadingElement"
        aria-label="Data is being loaded..."
      >
        <div class="mdc-linear-progress__buffer">
          <div class="mdc-linear-progress__buffer-bar"></div>
          <div class="mdc-linear-progress__buffer-dots"></div>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div
          class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
        >
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>
    </div>
  </div>
</template>
