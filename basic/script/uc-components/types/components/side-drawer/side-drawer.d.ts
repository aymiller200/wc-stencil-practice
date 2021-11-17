export declare class SideDrawer {
  showContactInfo: boolean;
  title: string;
  opened: boolean;
  onCloseDrawer(): void;
  onChangeContent(content: string): void;
  open(): void;
  render(): any[];
}
