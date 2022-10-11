import {
  GetAllFilesDocument,
  type GetAllFilesQuery,
  type GetAllFilesQueryVariables,
} from "@/generated/graphql";
import { useQuery } from "@vue/apollo-composable";
import { ref, watchEffect, type Ref } from "vue";
import { configuration } from "./configuration";

const files: Ref<GetAllFilesQuery["files"]> = ref([]);
const isLoading: Ref<boolean> = ref(false);

export function useFiles() {
  const loadFiles = (options?: GetAllFilesQueryVariables["options"]) => {
    const { result, loading } = useQuery(GetAllFilesDocument, {
      bucketNameArguments: {
        bucketName: configuration.bucketName,
      },
      options,
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
