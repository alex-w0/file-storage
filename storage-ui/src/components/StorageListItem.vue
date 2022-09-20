<script setup lang="ts">
const props = defineProps({
  storageId: String,
  fileName: String,
  imageUrl: String,
});
</script>

<template>
  <tr :data-row-id="storageId" class="mdc-data-table__row">
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
    <th class="mdc-data-table__cell" scope="row" id="u0">
      {{ props.fileName }}
    </th>
    <td class="mdc-data-table__cell">File</td>
    <td class="mdc-data-table__cell">20mb</td>
    <td class="mdc-data-table__cell">jpg</td>
    <td class="mdc-data-table__cell">2022-10-10</td>
    <td class="mdc-data-table__cell">
      <div class="storageListItem__actions">
        <button class="mdc-icon-button material-icons small">
          <div class="mdc-icon-button__ripple"></div>
          edit
        </button>
        <button class="mdc-icon-button material-icons small">
          <div class="mdc-icon-button__ripple"></div>
          open_in_new
        </button>
        <button class="mdc-icon-button material-icons small">
          <div class="mdc-icon-button__ripple"></div>
          delete
        </button>
      </div>
    </td>
  </tr>
</template>
