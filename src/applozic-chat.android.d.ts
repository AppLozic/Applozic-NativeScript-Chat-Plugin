import { Common } from './applozic-chat.common';
export declare class ApplozicChat extends Common {
  constructor();
  login(alUser: any, successCallback: any, errorCallback: any): void;
  registerForPushNotification(successCallback: any, errorCallback: any): void;
  launchChat(): void;
  isLoggedIn(successCallback: any, errorCallback: any): void;
  launchChatWithUserId(userId: any): void;
  launchChatWithGroupId(groupId: number, successCallback: any, errorCallback: any): void;
  logout(successCallback: any, errorCallback: any): void;
  showAllRegisteredUsers(showAll: boolean): void;
  createGroup(groupInfo: any, successCallback: any, errorCallback: any): void;
  addContacts(contacts: any): void;
  showOnlyMyContacts(): void;
  private _getAndroidContext();
  private _getCurrentActivity();
  disableNotifications(disable: boolean, successCallback: any, errorCallback: any): void;
}
