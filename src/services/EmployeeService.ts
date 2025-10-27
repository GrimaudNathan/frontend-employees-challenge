import type { Employee } from '../types/Employee';

const API_BASE_URL = 'http://localhost:9000';

export class EmployeeService {
  static async getEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const employees: Employee[] = await response.json();
      return employees;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }
}
