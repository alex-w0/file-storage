<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import StorageListItem from "./StorageListItem.vue";

import { MDCDataTable } from "@material/data-table";
import { MDCLinearProgress } from "@material/linear-progress";
import { useFiles } from "@/composition-api/useFiles";
import Dialog from "./Dialog.vue";
import {
  ArrowUpTrayIcon,
  FolderPlusIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";

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
  <div class="w-full shadow rounded-lg overflow-hidden">
    <table class="w-full">
      <thead>
        <tr>
          <th
            scope="col"
            class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
          >
            Name
          </th>
          <th
            scope="col"
            class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
          >
            Storage Type
          </th>
          <th
            scope="col"
            class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
          >
            Size
          </th>
          <th
            scope="col"
            class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
          >
            File extension
          </th>
          <th
            scope="col"
            class="leading-normal px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
          >
            Created At
          </th>
          <th
            scope="col"
            class="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
          >
            <div class="flex gap-4">
              <ArrowUpTrayIcon
                class="w-18 h-18 cursor-pointer"
              ></ArrowUpTrayIcon>
              <FolderPlusIcon
                @click="showCreateDirectoryDialog = true"
                class="w-18 h-18 cursor-pointer"
              ></FolderPlusIcon>
              <TrashIcon class="w-18 h-18 cursor-pointer"></TrashIcon>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <a href="#" class="block relative">
                  <img
                    alt="profil"
                    src="/images/person/8.jpg"
                    class="mx-auto object-cover rounded-full h-10 w-10"
                  />
                </a>
              </div>
              <div class="ml-3">
                <p class="text-gray-900 whitespace-no-wrap">Jean marc</p>
              </div>
            </div>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Admin</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span
                aria-hidden="true"
                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              >
              </span>
              <span class="relative"> active </span>
            </span>
          </td>
        </tr>
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <a href="#" class="block relative">
                  <img
                    alt="profil"
                    src="/images/person/8.jpg"
                    class="mx-auto object-cover rounded-full h-10 w-10"
                  />
                </a>
              </div>
              <div class="ml-3">
                <p class="text-gray-900 whitespace-no-wrap">Jean marc</p>
              </div>
            </div>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Admin</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span
                aria-hidden="true"
                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              >
              </span>
              <span class="relative"> active </span>
            </span>
          </td>
        </tr>
        <tr>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <a href="#" class="block relative">
                  <img
                    alt="profil"
                    src="/images/person/8.jpg"
                    class="mx-auto object-cover rounded-full h-10 w-10"
                  />
                </a>
              </div>
              <div class="ml-3">
                <p class="text-gray-900 whitespace-no-wrap">Jean marc</p>
              </div>
            </div>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">Admin</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p class="text-gray-900 whitespace-no-wrap">12/09/2020</p>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
            >
              <span
                aria-hidden="true"
                class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              >
              </span>
              <span class="relative"> active </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
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
                <button
                  @click="showCreateDirectoryDialog = true"
                  class="mdc-icon-button material-icons small"
                >
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
