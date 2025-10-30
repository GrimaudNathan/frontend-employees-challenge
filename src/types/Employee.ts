export interface Employee extends Record<string, unknown> {
  id: string;
  email: string;
  name: string;
  profilePictureUrl: string;
  status: 'ACTIVE' | 'DEACTIVATED';
  createdAt: string;
}
