export interface Comment {
  userName: string;
  content: string;
  timeSent: string;
  id: string;
  privateMsg?: boolean;
  target?: string;
}
