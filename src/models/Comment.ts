export interface Comment {
  userId: string;
  laureateId: string;
  content: string; // TODO: Check if there is an attack vector here for injection
  createdAt: string;
}
