export interface Employee {
  id: string;
  email: string;
  name: string;
  profilePictureUrl: string;
  status: 'ACTIVE' | 'DEACTIVATED';
  createdAt: string;
}
