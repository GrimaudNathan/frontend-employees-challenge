<template>
  <div class="relative inline-block">
    <button 
      @click="toggleDropdown"
      class="py-1.5 pl-3 pr-1.5 inline-flex items-center rounded-lg bg-white text-sb-13 text-charcoal shadow-regular-1 cursor-pointer hover:bg-steel/10"
    >
      {{ selectedOption?.label || 'Select an option' }}
      <img 
        :class="['w-5 h-5 transition-transform duration-200', isOpen ? 'rotate-180' : '']"
        src="/src/assets/icons/chevron.svg"
        alt="Dropdown chevron"
        aria-hidden="true"
        loading="lazy"
      />
    </button>

    <div 
      v-if="isOpen"
      class="absolute z-10 mt-2 min-w-full rounded-lg bg-white shadow-regular-1"
    >
      <div class="py-1">
        <button
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="block w-full px-4 py-2 text-sb-13 text-charcoal text-left cursor-pointer hover:bg-steel/10 text-nowrap"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface DropdownOption {
  value: string;
  label: string;
}

interface Props {
  modelValue: string;
  options: DropdownOption[];
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isOpen = ref(false);

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: DropdownOption) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const closeDropdown = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>