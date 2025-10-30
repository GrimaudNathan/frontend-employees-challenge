import { ref, computed, onMounted } from 'vue';
import type { Ref } from 'vue';
import { useAsyncData } from './useAsyncData';
import { EmployeeService } from '../services/EmployeeService';
import type { Employee } from '../types/Employee';

type EmployeeStatus = 'ACTIVE' | 'DEACTIVATED';
export type FilterStatus = 'all' | EmployeeStatus;

export function useEmployees() {
  const selectedStatus = ref<FilterStatus>('all');

  const { data: employees, loading, error, execute } = useAsyncData<Employee[]>(
    () => EmployeeService.getEmployees()
  );

  const filteredEmployees = computed(() => {
    if (!employees.value) return [];
    
    if (selectedStatus.value === 'all') {
      return employees.value;
    }
    
    return employees.value.filter(
      employee => employee.status === selectedStatus.value
    );
  });

  onMounted(() => {
    execute();
  });

  return {
    filteredEmployees: filteredEmployees as Ref<Employee[]>,
    loading,
    error,
    selectedStatus,
    refresh: execute
  };
}
