import { Application } from '@nativescript/core';
import { Common } from './applozic-chat.common';

declare const com: any;

export class ApplozicChat extends Common {
  constructor() {
    super();
  }

  public login(alUser: any, successCallback: any, errorCallback: any) {
    const user = new com.applozic.mobicomkit.api.account.user.User();
    user.setUserId(alUser.userId);
    user.setPassword(alUser.password);
    user.setApplicationId(alUser.applicationId);
    user.setDisplayName(alUser.displayName);
    user.setContactNumber(alUser.contactNumber);
    user.setAuthenticationTypeId(new java.lang.Short(alUser.authenticationTypeId));
    user.setImageLink(alUser.imageLink);
    if (alUser.pushNotificationFormat > 0) {
      user.setPushNotificationFormat(new java.lang.Short(alUser.pushNotificationFormat));
    } else {
      user.setPushNotificationFormat(new java.lang.Short(0));
    }

    if (alUser.enableEncryption !== undefined) {
      user.setEnableEncryption(alUser.enableEncryption);
    }

    const User = com.applozic.mobicomkit.api.account.user.User;
    const RegistrationResponse = com.applozic.mobicomkit.api.account.register.RegistrationResponse;
    let arg: java.lang.Void;
    arg = null;

    const ctx = this._getAndroidContext();
    com.applozic.mobicomkit.Applozic.init(ctx, alUser.applicationId);

    const listener = new com.applozic.mobicomkit.api.account.user.UserLoginTask.TaskListener({
      onSuccess: (registrationResponse: any, context: any) => {
        successCallback(registrationResponse);
        return true;
      },

      onFailure: (response: any, exception: any) => {
        if (response) {
          errorCallback(response);
        } else {
          errorCallback(exception);
        }
        return true;
      }
    });

    const task = new com.applozic.mobicomkit.api.account.user.UserLoginTask(user, listener, ctx);
    com.applozic.mobicommons.task.AlTask.execute(task);
  }

  public registerForPushNotification(successCallback, errorCallback) {
    const ctx = this._getAndroidContext();
    const args = (java.lang.Void = null);

    const listener = new com.applozic.mobicomkit.api.account.user.PushNotificationTask.TaskListener({
      onSuccess: (response: any) => {
        successCallback(response);
      },

      onFailure: (response: any, exception: any) => {
        if (response) {
          errorCallback(response);
        } else {
          errorCallback(exception);
        }
      }
    });

    const task = new com.applozic.mobicomkit.api.account.user.PushNotificationTask(
      com.applozic.mobicomkit.Applozic.getInstance(ctx).getDeviceRegistrationId(),
      listener,
      ctx
    );
    com.applozic.mobicommons.task.AlTask.execute(task);
  }

  public refreshToken(token: any, successCallback, errorCallback) {
    const ctx = this._getAndroidContext();
    const args = (java.lang.Void = null);

    const listener = new com.applozic.mobicomkit.api.account.user.PushNotificationTask.TaskListener({
      onSuccess: (response: any) => {
        successCallback(response);
      },

      onFailure: (response: any, exception: any) => {
        if (response) {
          errorCallback(response);
        } else {
          errorCallback(exception);
        }
      }
    });

    const task = new com.applozic.mobicomkit.api.account.user.PushNotificationTask(token, listener, ctx);
    com.applozic.mobicommons.task.AlTask.execute(task);
  }

  public launchChat() {
    const ctx = this._getCurrentActivity();
    const intent = new android.content.Intent(
      ctx,
      com.applozic.mobicomkit.uiwidgets.conversation.activity.ConversationActivity.class
    );
    if (com.applozic.mobicomkit.ApplozicClient.getInstance(ctx).isContextBasedChat()) {
      intent.putExtra(com.applozic.mobicomkit.uiwidgets.conversation.ConversationUIService.CONTEXT_BASED_CHAT, true);
    }
    ctx.startActivity(intent);
  }

  public isLoggedIn(successCallback: any, errorCallback: any) {
    const ctx = this._getAndroidContext();

    if (com.applozic.mobicomkit.api.account.user.MobiComUserPreference.getInstance(ctx).isLoggedIn()) {
      successCallback('true');
    } else {
      successCallback('false');
    }
  }

  public launchChatWithUserId(userId: any) {
    const ctx = this._getCurrentActivity();

    const intent = new android.content.Intent(
      ctx,
      com.applozic.mobicomkit.uiwidgets.conversation.activity.ConversationActivity.class
    );
    intent.putExtra('userId', userId);
    intent.putExtra('takeOrder', true);

    ctx.startActivity(intent);
  }

  public launchChatWithGroupId(groupId: number, successCallback, errorCallback) {
    const ctx = this._getAndroidContext();
    const activity = this._getCurrentActivity();
    const args = (java.lang.Void = null);
    const listener = new com.applozic.mobicomkit.uiwidgets.async.AlGroupInformationAsyncTask.GroupMemberListener({
      onSuccess: (response: any, context: any) => {
        const intent = new android.content.Intent(
          activity,
          com.applozic.mobicomkit.uiwidgets.conversation.activity.ConversationActivity.class
        );
        intent.putExtra('groupId', response.getKey().intValue());
        intent.putExtra('takeOrder', true);
        activity.startActivity(intent);
        successCallback('success');
      },

      onFailure: (response: any, exception: any, context: any) => {
        if (response === 'undefined' || response === null) {
          errorCallback('Error in launching group');
        } else {
          errorCallback('Error in launching group');
        }
      }
    });

    const task = new com.applozic.mobicomkit.uiwidgets.async.AlGroupInformationAsyncTask(
      ctx,
      new java.lang.Integer(groupId),
      listener
    );
    com.applozic.mobicommons.task.AlTask.execute(task);
  }

  public proccessNotification(data: any) {
    const ctx = this._getAndroidContext();
    const gsonUtils = com.applozic.mobicommons.json.GsonUtils;
    const dataMap = gsonUtils.getObjectFromJson(data, java.util.HashMap.class);
    com.applozic.mobicomkit.api.notification.MobiComPushReceiver.processMessageAsync(ctx, dataMap);
  }

  public logout(successCallback: any, errorCallback: any) {
    const ctx = this._getAndroidContext();
    const args = (java.lang.Void = null);

    const listener = new com.applozic.mobicomkit.api.account.user.UserLogoutTask.TaskListener({
      onSuccess: (context: any) => {
        successCallback('Successfully logged out');
      },

      onFailure: (exception: any) => {
        errorCallback('Failed to logout');
      }
    });

    const task = new com.applozic.mobicomkit.api.account.user.UserLogoutTask(listener, ctx);
    com.applozic.mobicommons.task.AlTask.execute(task);
  }

  public showAllRegisteredUsers(showAll: boolean) {
    const ctx = this._getAndroidContext();
    if (showAll) {
      com.applozic.mobicomkit.uiwidgets.ApplozicSetting.getInstance(ctx).enableRegisteredUsersContactCall();
    }
  }

  public createGroup(groupInfo: any, successCallback: any, errorCallback: any) {
    const ctx = this._getAndroidContext();
    const gsonUtils = com.applozic.mobicommons.json.GsonUtils;
    let channelInfo = com.applozic.mobicomkit.api.people.ChannelInfo;

    channelInfo = gsonUtils.getObjectFromJson(JSON.stringify(groupInfo), channelInfo.class); // this returns object, needs to convert to ChannelInfo object

    const group = com.applozic.mobicommons.people.channel.Channel;
    const listener = new com.applozic.mobicomkit.uiwidgets.async.AlChannelCreateAsyncTask.TaskListenerInterface({
      onSuccess: (channel, context) => {
        successCallback(gsonUtils.getJsonFromObject(channel, group.class));
      },

      onFailure: (response, context) => {
        errorCallback(gsonUtils.getJsonFromObject(response, com.applozic.mobicomkit.feed.ChannelFeedApiResponse.class));
      }
    });

    const task = new com.applozic.mobicomkit.uiwidgets.async.AlChannelCreateAsyncTask(ctx, channelInfo, listener);
    com.applozic.mobicommons.task.AlTask.execute(task);
  }

  public addContacts(contacts: any) {
    const ctx = this._getAndroidContext();

    const gsonUtils = com.applozic.mobicommons.json.GsonUtils;
    contacts.forEach(user => {
      new com.applozic.mobicomkit.contact.AppContactService(ctx).upsert(
        gsonUtils.getObjectFromJson(JSON.stringify(user), com.applozic.mobicommons.people.contact.Contact.class)
      );
    });
  }

  public showOnlyMyContacts(show: boolean) {
    const ctx = this._getAndroidContext();
    if (show) {
      com.applozic.mobicomkit.ApplozicClient.getInstance(ctx).enableShowMyContacts();
    } else {
      com.applozic.mobicomkit.ApplozicClient.getInstance(ctx).disableShowMyContacts();
    }
  }

  public getTotalUnreadCount(successCallback: any) {
    const ctx = this._getAndroidContext();
    const count = new com.applozic.mobicomkit.api.conversation.database.MessageDatabaseService(
      ctx
    ).getTotalUnreadCount();
    successCallback(count);
  }

  public getUnreadCountForChannel(groupId: number, successCallback: any) {
    const ctx = this._getAndroidContext();
    const count = new com.applozic.mobicomkit.api.conversation.database.MessageDatabaseService(
      ctx
    ).getUnreadMessageCountForChannel(new java.lang.Integer(groupId));
    successCallback(count);
  }

  public getUnreadCountForContact(contactId: string, successCallback: any) {
    const ctx = this._getAndroidContext();
    const count = new com.applozic.mobicomkit.api.conversation.database.MessageDatabaseService(
      ctx
    ).getUnreadMessageCountForContact(contactId);
    successCallback(count);
  }

  /**
   * Helper method to ensure context usage.
   */
  private _getAndroidContext() {
    const ctx = Application.android.context;
    if (ctx === null) {
      setTimeout(() => {
        this._getAndroidContext();
      }, 200);
      return;
    } else {
      return ctx;
    }
  }

  private _getCurrentActivity() {
    const ctx = Application.android.foregroundActivity;
    if (ctx === null) {
      setTimeout(() => {
        this._getCurrentActivity();
      }, 200);
      return;
    } else {
      return ctx;
    }
  }
}
