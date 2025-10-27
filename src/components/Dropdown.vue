<template>
  <div class="relative inline-block">
    <button 
      @click="toggle"
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
import { computed } from 'vue';
import { useDropdown } from '../composables/useDropdown';

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

const { isOpen, toggle, close } = useDropdown();

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue);
});

const selectOption = (option: DropdownOption) => {
  emit('update:modelValue', option.value);
  close();
};
</script>