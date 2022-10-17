<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";

import { MDCDialog } from "@material/dialog";

const dialogElement: Ref<HTMLElement | null> = ref(null);

defineProps({
  dialogTitle: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  if (dialogElement.value === null) {
    throw new Error("DataTableElement is not defined");
  }

  const dialog = new MDCDialog(dialogElement.value);
});
</script>

<template>
  <div
    ref="dialogElement"
    class="mdc-dialog mdc-dialog--open mdc-dialog--fullscreen"
  >
    <div class="mdc-dialog__container">
      <div
        class="mdc-dialog__surface"
        role="dialog"
        aria-modal="true"
        aria-labelledby="my-dialog-title"
        aria-describedby="my-dialog-content"
      >
        <div class="mdc-dialog__header">
          <h2 class="mdc-dialog__title" id="my-dialog-title">
            {{ dialogTitle }}
          </h2>
          <button
            class="mdc-icon-button material-icons mdc-dialog__close"
            data-mdc-dialog-action="close"
          >
            close
          </button>
        </div>
        <div class="mdc-dialog__content" id="my-dialog-content">
          <slot />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          scelerisque metus dapibus, maximus massa pulvinar, commodo nunc.
          Quisque vitae luctus lectus, ut tempus ipsum. Sed suscipit gravida
          scelerisque. Aenean vulputate elementum est, quis consectetur orci
          consectetur ac. Quisque accumsan vel nisi id dapibus. Suspendisse nec
          urna eu massa ornare rutrum. Vivamus at nisi sit amet nulla pretium
          volutpat sit amet in justo. Donec mi metus, interdum ac tincidunt at,
          vehicula vitae nisl. Morbi fermentum dapibus massa, nec lobortis massa
          vestibulum eu.
        </div>
        <div class="mdc-dialog__actions">
          <button
            type="button"
            class="mdc-button mdc-dialog__button"
            data-mdc-dialog-action="close"
          >
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Cancel</span>
          </button>
          <button
            type="button"
            class="mdc-button mdc-dialog__button"
            data-mdc-dialog-action="accept"
            data-mdc-dialog-button-default
          >
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">OK</span>
          </button>
        </div>
      </div>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>
