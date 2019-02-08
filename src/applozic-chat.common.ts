import { Observable } from 'tns-core-modules/data/observable';

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
  }

  public login(alUser: any, successCallback: any, errorCallback: any) {}

  public registerForPushNotification(successCallback: any, errorCallback: any) {}

  public isLoggedIn(successCallback: any, errorCallback: any) {}

  public launchChat() {}

  public launchChatWithUserId(userId: any) {}

  public launchChatWithGroupId(groupId: number, successCallback: any, errorCallback: any) {}

  public refreshToken(token: any, successCallback: any, errorCallback: any) {}

  public proccessNotification(data: any) {}

  public logout(successCallback: any, errorCallback: any) {}

  public showAllRegisteredUsers(showAll: boolean) {}

  public createGroup(groupInfo: any, successCallback: any, errorCallback: any) {}

  public addContacts(contacts: any, successCallback: any, errorCallback: any) {}

  public showOnlyMyContacts(show: boolean) {}

  public getTotalUnreadCount(successCallback: any) {}

  public getUnreadCountForChannel(groupId: number, successCallback: any) {}

  public getUnreadCountForContact(contactId: string, successCallback: any) {}
}
