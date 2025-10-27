import { ref, onMounted, onUnmounted } from 'vue';

export function useDropdown() {
  const isOpen = ref(false);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const closeOnOutsideClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      close();
    }
  };

  onMounted(() => {
    document.addEventListener('click', closeOnOutsideClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', closeOnOutsideClick);
  });

  return {
    isOpen,
    toggle,
    open,
    close
  };
}
