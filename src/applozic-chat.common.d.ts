import { Observable } from '@nativescript/core';
export declare class Common extends Observable {
  message: string;
  constructor();
  login(alUser: any, successCallback: any, errorCallback: any): void;
  registerForPushNotification(successCallback: any, errorCallback: any): void;
  isLoggedIn(successCallback: any, errorCallback: any): void;
  launchChat(): void;
  launchChatWithUserId(userId: any): void;
  launchChatWithGroupId(groupId: number, successCallback: any, errorCallback: any): void;
  refreshToken(token: any, successCallback: any, errorCallback: any): void;
  proccessNotification(data: any): void;
  logout(successCallback: any, errorCallback: any): void;
  showAllRegisteredUsers(showAll: boolean): void;
  createGroup(groupInfo: any, successCallback: any, errorCallback: any): void;
  addContacts(contacts: any, successCallback: any, errorCallback: any): void;
  showOnlyMyContacts(show: boolean): void;
  getTotalUnreadCount(successCallback: any): void;
  getUnreadCountForChannel(groupId: number, successCallback: any): void;
  getUnreadCountForContact(contactId: string, successCallback: any): void;
}
