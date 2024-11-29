export interface Messenger {
  id: number;
  name: string;

  link: string;
  icon?: string;
  bonus?: boolean;
  confirmed?: boolean;
}
