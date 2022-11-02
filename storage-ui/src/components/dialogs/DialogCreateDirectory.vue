<script setup lang="ts">
import Dialog from "./Dialog.vue";
import Input from "../base/Input.vue";

function createDirectory(formData: any) {
  console.log("test");
}
</script>

<template>
  <Dialog
    dialog-title="Create a new directory"
    :on-dialog-close="createDirectory"
  >
    <Input id="directoryName" label="Name" required />
  </Dialog>
</template>
