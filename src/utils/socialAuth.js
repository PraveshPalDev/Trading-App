//Here all social media auth
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NativeModules} from 'react-native';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const {RNTwitterSignIn} = NativeModules;

const APIKEY = {
  TWITTER_API_KEY: 'HiPHhcFNIOviKNHIYofAXOTCs',
  TWITTER_API_KEY_SECRET: '31otQOHeSQfJ2INgXs4gTsrRQA7E1pAkTGagNZLqhJ7WAVChdM',
};

export const configureGoogleSignIn = () => {
  GoogleSignin.configure();
};

const fbLogin = () => {
  return new Promise((resolve, reject) => {
    LoginManager.logOut();

    LoginManager.logInWithPermissions(['email', 'public_profile'])
      .then(result => {
        if (result.isCancelled) {
          reject(new Error('Login was cancelled'));
          return;
        }

        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          reject(new Error('Email is required'));
          return;
        }

        const infoRequest = new GraphRequest(
          '/me?fields=first_name,last_name,email,picture.width(300).height(400),friends',
          null,
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        new GraphRequestManager().addRequest(infoRequest).start();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const singWithFaceBook = async () => {
  try {
    const facebookResponse = await fbLogin();
    return {userInfo: facebookResponse, error: null};
  } catch (error) {
    console.log('Error raised:', error);
  }
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return {userInfo, error: null};
  } catch (error) {
    const errorMessage = handleSignInError(error);
    return {userInfo: null, error: errorMessage};
  }
};

const handleSignInError = error => {
  if (error.code) {
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        return error;
      case statusCodes.IN_PROGRESS:
        return error;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        return error;
      default:
        return `Some other error happened: ${error.message}`;
    }
  } else {
    return `An error not related to Google Sign-In occurred: ${error.message}`;
  }
};

export const signInWithX = async () => {
  RNTwitterSignIn.init(APIKEY?.TWITTER_API_KEY, APIKEY?.TWITTER_API_KEY_SECRET);

  try {
    const loginData = await RNTwitterSignIn.logIn();
    console.log('login data =>', loginData);
    return loginData;
  } catch (error) {
    console.log('Login X failed:', error.message);
  }
};
