import { Common } from './applozic-chat.common';
export declare class ApplozicChat extends Common {
    constructor();
    login(user: any, successCallback: any, errorCallback: any): void;
    registerForPushNotification(successCallback: any, errorCallback: any): void;
    refreshToken(token: any): void;
    proccessNotification(data: any): void;
    launchChat(): void;
    launchChatWithUserId(userId: any): void;
    launchChatWithGroupId(groupId: number, successCallback: any, errorCallback: any): void;
    logout(successCallback: any, errorCallback: any): void;
    createGroup(groupInfo: any, successCallback: any, errorCallback: any): void;
    addContacts(contacts: any): void;
    showAllRegisteredUsers(showAll: boolean): void;
    defaultSettings(): void;
    disableNotifications(disable: boolean, successCallback: any, errorCallback: any): void;
}
