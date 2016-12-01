package com.awesomeness;

import android.net.Uri;
import android.support.customtabs.CustomTabsIntent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ChromeCustomTab extends ReactContextBaseJavaModule {

  public ChromeCustomTab(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  public void open(String url) {
    CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
    CustomTabsIntent customTabsIntent = builder.build();
    customTabsIntent.launchUrl(getCurrentActivity(), Uri.parse(url));
  }

  @Override
  public String getName() {
    return "chrome_custom_tab";
  }
}
