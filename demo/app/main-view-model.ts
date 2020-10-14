import { Observable } from "@nativescript/core";
import { ApplozicChat } from 'nativescript-applozic-chat';

export class HelloWorldModel extends Observable {
  public message: string;
  private applozicChat: ApplozicChat;
  public onLoginSuccess: any;

  constructor() {
    super();

    this.applozicChat = new ApplozicChat();
    this.message = this.applozicChat.message;

    var alUser = {
      'userId' : 'debug4',   //Replace it with the userId of the logged in user
      'password' : 'debug4',  //Put password here
      'authenticationTypeId' : 1,
      'applicationId' : 'applozic-sample-app',  //replace "applozic-sample-app" with Application Key from Applozic Dashboard
      'deviceApnsType' : 0    //Set 0 for Development and 1 for Distribution (Release)
    }

    var that = this;

    /*this.applozicChat.logout(function(response) {
      console.log("logout success: " + response);
    }, function(error) {
      console.log("logout error: "+ error);
    });*/

    this.applozicChat.login(alUser, function(response) {
        console.log("onLoginSuccess: " + response);
        that.applozicChat.showAllRegisteredUsers(false);
        that.applozicChat.launchChat();
        //that.applozicChat.launchChatWithGroupId(3930445);
      }, function(error) {
        console.log("onLoginFailure: " + error);
      });
  }

}
