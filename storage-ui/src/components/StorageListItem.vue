<script setup lang="ts">
const props = defineProps({
  fileName: String,
  imageUrl: String,
});
</script>

<template>
  <li class="mdc-list-item" tabindex="0">
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__graphic">
      <div class="mdc-checkbox">
        <input
          type="checkbox"
          class="mdc-checkbox__native-control"
          id="storageListItem"
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
      </div>
    </span>
    <!-- <span class="mdc-list-item__graphic">
      <div class="storageListItem__preview">
        <img :src="$props.imageUrl" />
      </div>
    </span> -->
    <span class="mdc-list-item__text">
      <span class="mdc-list-item__primary-text">{{ props.fileName }}</span>
      <span class="mdc-list-item__secondary-text">20mb</span>
    </span>
    <span
      aria-hidden="true"
      class="mdc-list-item__meta storageListItem__actions"
    >
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
    </span>
  </li>
</template>
