import { ref, type Ref } from 'vue';

export function useAsyncData<T>(asyncFn: () => Promise<T>) {
  const data = ref<T | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const execute = async () => {
    try {
      loading.value = true;
      error.value = null;
      data.value = await asyncFn();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    data.value = null;
    loading.value = false;
    error.value = null;
  };

  return {
    data: data as Ref<T | null>,
    loading,
    error,
    execute,
    reset
  };
}
