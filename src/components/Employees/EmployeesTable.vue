<template>
  <div class="p-6">
    <EmployeesFilter v-model="selectedStatus" />
    <Table
      :data="filteredEmployees"
      :columns="tableColumns"
      :loading="loading"
      :error="error"
      class="mt-4"
    >
      <template #cell-name="{ row }: { row: Employee }">
        <div class="flex items-center gap-2.5">
          <Avatar 
            :src="row.profilePictureUrl" 
            :alt="row.name"
            size="sm"
          />
          <div>{{ row.name }}</div>
        </div>
      </template>
      
      <template #cell-status="{ row }: { row: Employee }">
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
import type { Employee } from '../../types/Employee';
import EmployeesFilter from './EmployeesFilter.vue';
import Table from '../Table.vue';
import Avatar from '../Avatar.vue';
import { useEmployees } from '../../composables/useEmployees';

const { filteredEmployees, loading, error, selectedStatus } = useEmployees();

const tableColumns = [
  { key: 'name' as const, label: 'Name' },
  { key: 'status' as const, label: 'Status' },
] as const satisfies Array<{
  key: keyof Employee;
  label: string;
}>;
</script>
