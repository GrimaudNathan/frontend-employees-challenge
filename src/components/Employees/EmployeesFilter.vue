<template>
  <Dropdown
    id="status-filter"
    v-model="selectedStatus"
    :options="statusOptions"
  />
</template>

<script setup lang="ts">
import Dropdown from '../Dropdown.vue';

const selectedStatus = defineModel<string>({ default: 'all' });

const statusOptions = [
  { value: 'all', label: 'All employees' },
  { value: 'ACTIVE', label: 'Active employees' },
  { value: 'DEACTIVATED', label: 'Deactivated employees' }
];
</script>
