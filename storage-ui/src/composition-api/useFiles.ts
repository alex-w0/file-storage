import {
  GetAllFilesDocument,
  type GetAllFilesQuery,
} from "@/generated/graphql";
import { useQuery } from "@vue/apollo-composable/dist";
import { ref, watchEffect, type Ref } from "vue";

export function useFiles() {
  const files: Ref<GetAllFilesQuery["files"]> = ref([]);
  const isLoading: Ref<boolean> = ref(false);

  const loadFiles = () => {
    const { result, loading } = useQuery(GetAllFilesDocument, {
      bucketNameArguments: {
        bucketName: "---",
      },
    });

    watchEffect(() => {
      isLoading.value = loading.value;
      files.value = result.value?.files ?? [];
    });
  };

  return {
    files,
    isLoading,
    loadFiles,
  };
}
