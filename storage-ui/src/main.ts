import { defineCustomElement } from "vue";
import StorageGallery from "./widgets/StorageGallery.ce.vue";

const StorageGalleryWidget = defineCustomElement(StorageGallery);

// Register the custom element.
customElements.define("file-storage-gallery-widget", StorageGalleryWidget);
