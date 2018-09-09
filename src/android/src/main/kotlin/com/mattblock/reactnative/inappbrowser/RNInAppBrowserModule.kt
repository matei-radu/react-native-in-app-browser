/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

package com.mattblock.reactnative.inappbrowser

import android.graphics.Color
import android.net.Uri
import android.support.customtabs.CustomTabsIntent

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class RNInAppBrowserModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        private const val SETTING_COLOR = "toolbarColor"
    }

    override fun getName() = "RNInAppBrowser"

    @ReactMethod
    fun openInApp(url: String, settings: ReadableMap) {
        val builder = CustomTabsIntent.Builder()

        if (settings.hasKey(SETTING_COLOR)) {
            val color = Color.parseColor(settings.getString(SETTING_COLOR))
            builder.setToolbarColor(color)
        }

        val customTabsIntent = builder.build()
        customTabsIntent.launchUrl(currentActivity, Uri.parse(url))
    }
}
