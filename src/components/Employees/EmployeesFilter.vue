<template>
  <Dropdown
    id="status-filter"
    v-model="selectedStatus"
    :options="statusOptions"
    @update:modelValue="handleStatusChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dropdown from '../Dropdown.vue';

interface Emits {
  (e: 'statusChange', status: string): void;
}

const emit = defineEmits<Emits>();

const selectedStatus = ref('all');

const statusOptions = [
  { value: 'all', label: 'All employees' },
  { value: 'ACTIVE', label: 'Active employees' },
  { value: 'DEACTIVATED', label: 'Deactivated employees' }
];

const handleStatusChange = (status: string) => {
  selectedStatus.value = status;
  emit('statusChange', status);
};
</script>
