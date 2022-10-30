<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { DialogAction } from "../shared/enums/DialogAction";

const dialog: Ref<HTMLDialogElement | null> = ref(null);

defineProps({
  dialogTitle: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["onDialogClose"]);

onMounted(() => {
  if (dialog.value) {
    dialog.value.showModal();

    dialog.value.addEventListener("close", () => {
      console.log(dialog.value?.returnValue);

      emit("onDialogClose");
    });
  }
});
</script>

<template>
  <dialog ref="dialog" class="w-full max-w-lg rounded">
    <form method="dialog">
      <h2 class="mb-8">
        {{ dialogTitle }}
      </h2>
      <div class="flex gap-8 justify-end mt-8">
        <button
          class="px-4 py-4 border border-gray text-gray rounded hover:bg-gray hover:text-white"
          :value="DialogAction.Cancel"
        >
          Cancel
        </button>
        <button
          class="px-4 py-4 bg-green text-white rounded hover:bg-green/90"
          :value="DialogAction.Confirm"
        >
          Confirm
        </button>
      </div>
    </form>
  </dialog>
</template>
