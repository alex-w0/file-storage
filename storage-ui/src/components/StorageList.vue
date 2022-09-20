<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import StorageListItem from "./StorageListItem.vue";

import { MDCDataTable } from "@material/data-table";

const dataTableElement: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  if (dataTableElement.value === null) {
    throw new Error("DataTableElement is not defined");
  }

  new MDCDataTable(dataTableElement.value);
});
</script>

<template>
  <div class="storageList__actions">
    <button class="mdc-button mdc-button--outlined">
      <span class="mdc-button__ripple"></span>
      <i class="material-icons mdc-button__icon" aria-hidden="true">delete</i>
      <span class="mdc-button__label">Delete</span>
    </button>

    <button class="mdc-button mdc-button--outlined">
      <span class="mdc-button__ripple"></span>
      <i class="material-icons mdc-button__icon" aria-hidden="true"
        >file_download</i
      >
      <span class="mdc-button__label">Download</span>
    </button>

    <button class="mdc-button mdc-button--raised">
      <span class="mdc-button__ripple"></span>
      <i class="material-icons mdc-button__icon" aria-hidden="true"
        >file_upload</i
      >
      <span class="mdc-button__label">Upload</span>
    </button>
  </div>

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
              colspan="2"
            >
              Created at
            </th>
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
          <StorageListItem
            v-for="index in 10"
            :key="index"
            file-name="Item 1"
            :storage-id="index.toString()"
            image-url="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
          ></StorageListItem>
        </tbody>
      </table>
    </div>
  </div>
</template>
