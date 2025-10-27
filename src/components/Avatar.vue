<template>
  <div class="relative">
    <img 
      :src="src" 
      :alt="alt"
      :class="sizeClasses"
      loading="lazy"
      @error="handleImageError"
    />
    <div 
      v-if="showFallback"
      :class="sizeClasses"
      class="absolute inset-0 flex items-center justify-center"
    >
      <img 
        src="/src/assets/icons/user-fallback.svg"
        :alt="alt"
        class="w-full h-full"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm'
});

const showFallback = ref(false);

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'size-6',
    md: 'size-8', 
    lg: 'size-12'
  };
  return `${sizes[props.size]} rounded-full`;
});

const handleImageError = () => {
  showFallback.value = true;
};
</script>
