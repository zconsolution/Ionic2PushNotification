import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { Push, PushToken } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
    ,public _push:Push
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
    this._push.register().then((t: PushToken) => {
      alert("In registration"+t);
      return this._push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
      alert('Token: ${t.token}'+t.token);
    });

    this._push.rx.notification()
    .subscribe((msg) => {
      alert(msg.title + ': ' + msg.text);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // let push = Push.init({
      //   android: {
      //     senderID: '391544269714'
      //   },
      //   ios: {
      //     alert: 'true',
      //     badge: true,
      //     sound: 'false'
      //   },
      //   windows: {}
      // });
      // push.on("registration", function(data) {
      //     console.log("device token ->", data.registrationId);
      // });
      // push.on("notification", function(data) {
      //     console.log(data);
      // });
      // push.on('registration', (data) => {
          
      // });
      // push.on('notification', (data) => {
      //     console.log(data);
  
      // })

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
