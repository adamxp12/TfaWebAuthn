# Processwire-TfaWebAuthn
![Security Key](https://raw.githubusercontent.com/adamxp12/Processwire-TfaU2F/master/assets/bluekeyside.png)

This module is essentially an update to my existing [U2F Module](https://github.com/adamxp12/Processwire-TfaU2F) but upgraded to use WebAuthn instead of U2F so it will continue to work in Chrome after Febuary 2022.


Note this is very much a proof of concept. it does work but I cant guarantee its reliability. its also sadly limited to a single non cross platform credential (Windows Hello, Apple TouchID/FaceID) due to the Tfa class which only allows one Tfa method at a time and also locks out the options once setup.

Its easy to setup just install the module then enable Tfa under your user profile. Enroll your key then next time you need to login you will be asked to use your WebAuthn Credential. Add as many as you like (though the will be a limit I have tested 4x succesfully)

Unlike the previous U2F libary this has many advantages. Not only do you get on device credentials like Windows Hello but you also get far better cross platform support includng NFC/Bluetooth support. I have tested it with a YubiKey on an iPhone. registered from USB on my laptop and authenticated via NFC on my phone.

This module is not a direct upgrade from the previous U2F module and will require setting up all your keys again but the was no easy way to transistion from the old U2F data. It is also a stop-gap solution until ProcessWire adds native WebAuthn support in the futue.


The Yubikey Security Key Graphic was sourced from Pixabay https://pixabay.com/illustrations/google-secure-key-u2f-security-key-3598222/

## Demo
![Demo](https://adamxp12blob.blob.core.windows.net/sharex-share/2019-08-28_12-06-18.gif)
