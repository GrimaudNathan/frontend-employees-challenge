<template>
  <div class="p-6">
    <EmployeeFilter @status-change="handleStatusChange" />
    <Table
      :data="filteredEmployees"
      :columns="tableColumns"
      :loading="loading"
      :error="error"
      class="mt-4"
    >
      <template #cell-name="{ row }">
        <div class="flex items-center gap-2.5">
          <Avatar 
            :src="row.profilePictureUrl" 
            :alt="row.name"
            size="sm"
          />
          <div>{{ row.name }}</div>
        </div>
      </template>
      
      <template #cell-status="{ row }">
        <span 
          :class="[row.status === 'ACTIVE' ? 'text-green' : 'text-steel']"
        >
          {{ row.status === 'ACTIVE' ? 'Active' : 'Deactivated' }}
        </span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { EmployeeService } from '../../services/EmployeeService';
import type { Employee } from '../../types/Employee';
import EmployeeFilter from './EmployeeFilter.vue';
import Table from '../Table.vue';
import Avatar from '../Avatar.vue';

const employees = ref<Employee[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedStatus = ref('all');

const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
];

const filteredEmployees = computed(() => {
  if (selectedStatus.value === 'all') {
    return employees.value;
  }
  return employees.value.filter(employee => employee.status === selectedStatus.value);
});

const fetchEmployees = async () => {
  try {
    loading.value = true;
    error.value = null;
    const data = await EmployeeService.getEmployees();
    employees.value = data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred';
  } finally {
    loading.value = false;
  }
};

const handleStatusChange = (status: string) => {
  selectedStatus.value = status;
};

onMounted(() => {
  fetchEmployees();
});
</script>
