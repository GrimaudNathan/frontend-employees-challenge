<template>
  <div class="p-6">
    <EmployeesFilter @status-change="handleStatusChange" />
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
import EmployeesFilter from './EmployeesFilter.vue';
import Table from '../Table.vue';
import Avatar from '../Avatar.vue';
import { useAsyncData } from '../../composables/useAsyncData';

const selectedStatus = ref('all');

const tableColumns = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
];

const { data: employees, loading, error, execute } = useAsyncData<Employee[]>(
  () => EmployeeService.getEmployees()
);

const filteredEmployees = computed(() => {
  if (!employees.value) return [];
  
  if (selectedStatus.value === 'all') {
    return employees.value;
  }
  return employees.value.filter(employee => employee.status === selectedStatus.value);
});

const handleStatusChange = (status: string) => {
  selectedStatus.value = status;
};

onMounted(() => {
  execute();
});
</script>
