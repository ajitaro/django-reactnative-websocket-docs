# django-reactnative-websocket-docs
Documentation for making realtime app using django as backend and react native as frontend

Follow the step from https://github.com/mitchtabian/HOWTO-django-channels-daphne

Thank you to [mitchtabian](https://github.com/mitchtabian) !!!

# Error after deployment

### 1. Obtain a Trusted SSL/TLS Certificate

To resolve the "java.security.cert.CertPathValidatorException: Trust anchor for certification path not found" error, you need to obtain a valid SSL/TLS certificate from a trusted Certificate Authority (CA) like Let's Encrypt or a commercial CA. Make sure the certificate is properly configured on your WebSocket server.

```
openssl s_client -showcerts -connect your.domain.com:443 < /dev/null
```

Copy the certificate starting from **-----BEGIN CERTIFICATE-----** to **-----END CERTIFICATE-----**, and save it as **server.crt**.
```
1 s:C = US, O = Let's Encrypt, CN = R3
i:C = US, O = Internet Security Research Group, CN = ISRG Root X1
a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA256
v:NotBefore: Sep  4 00:00:00 2020 GMT; NotAfter: Sep 15 16:00:00 2025 GMT
```


### 2. Include the SSL Certificate in Your Android Project

- Place the `server.crt` certificate file in the `android/app/src/main/res/raw/` directory of your Android project.

### 3. Configure Network Security for Android

- Create a file named `network_security_config.xml` in the `android/app/src/main/res/xml/` directory.

### 4. Add the Certificate to the Network Security Configuration

Inside `network_security_config.xml`, add the following lines to include the `server.crt` certificate:

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">YOUR_IP_ADDRESS</domain><!-- Debug port -->
        <domain includeSubdomains="true">your_website.com</domain>
        <trust-anchors>
            <certificates src="@raw/server" />
        </trust-anchors>
    </domain-config>
</network-security-config>
```

### 5. Reference the Network Security Configuration in AndroidManifest.xml

In the android/app/src/main/AndroidManifest.xml file, add the following line to reference the network security configuration:

```xml
<application
    ...
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
```

### 6. Clean and Rebuild the Android Project

```
cd android
./gradlew clean
```

### 7. Run Your React Native App

After cleaning, run **`npx react-native run-android`** again to rebuild the project with the network security configuration.

By following these steps, the error should be resolved, and your React Native app should be able to connect to the WebSocket server with the trusted SSL/TLS certificate.

