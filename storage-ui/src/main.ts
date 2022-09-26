import { defineCustomElement } from "vue";
import StorageGallery from "./widgets/StorageGallery.ce.vue";
import "./assets/main.css";

const StorageGalleryWidget = defineCustomElement(StorageGallery);

// Register the custom element.
customElements.define("file-storage-gallery-widget", StorageGalleryWidget);
