import { Component } from '@angular/core';
import { Platform, Button } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

declare const window:any;
declare const FB:any

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;
  onClick() {
    FB.getLoginStatus(res => {
      if (res.status !== 'connected') {
        this.logIn()
      }
    })
  }
  logIn() {
    const loginButton = document.querySelector('button')
    FB.login(() => {
      loginButton.disabled = true
      this.grabData()
    })
  }
  grabData() {
    const user = document.createElement('p')
    const photo = document.createElement('img')
    const container = document.querySelector('#log_container')
    user.id = 'user'
    photo.id = 'photo'
    FB.api('/me', res => {
      user.textContent = res.name
      container.appendChild(user)
      FB.api(
        `/${res.id}/picture`,
        'GET',
        {"redirect": "false"},
        response => {
          photo.src = response.data.url
          container.appendChild(photo)
        }
      )
    })
  }
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    // FaceBook SDK boilerplate code for install and initialization
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = () => {
      FB.init({
        appId            : '2274502912837375',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.10'
      })
        FB.AppEvents.logPageView()
      FB.getLoginStatus(res => {
        const loginButton = document.querySelector('button')
        if (res.status === 'connected') {
          loginButton.disabled = true
          this.grabData()
        }
      })
  }
    platform.ready().then(() => {
      statusBar.styleDefault()
      splashScreen.hide()
    })
  }
}
