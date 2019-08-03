/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

package com.mattblock.reactnative.inappbrowser

import android.content.ComponentName
import android.content.pm.ApplicationInfo
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.net.Uri
import androidx.browser.customtabs.*

import com.facebook.react.bridge.*
import com.facebook.react.uimanager.PixelUtil

import java.io.IOException
import java.net.URL

class RNInAppBrowserModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        private const val SETTING_COLOR = "toolbarColor"
        private const val SETTING_SHOW_TITLE = "showTitle"
        private const val SETTING_CLOSE_BUTTON = "closeButtonIcon"
        private const val SETTING_SHARE_MENU = "addDefaultShareMenu"

        private val CUSTOMTABS_BROWSERS = listOf(
                "com.android.chrome",           // Google Chrome - Stable
                "com.chrome.beta",              // Google Chrome - Beta
                "com.chrome.dev",               // Google Chrome - Dev
                "com.chrome.canary",            // Google Chrome - Canary

                "org.mozilla.firefox",          // Mozilla Firefox - Stable
                "org.mozilla.firefox_beta",     // Mozilla Firefox - Beta
                "org.mozilla.fennec_aurora",    // Mozilla Firefox - Nightly

                "com.sec.android.app.sbrowser"  // Samsung Internet
        )
    }

    private var mClient: CustomTabsClient? = null
    private var mSession: CustomTabsSession? = null

    init {
        val packageName = getPreferredBrowserPackageName()
        CustomTabsClient.bindCustomTabsService(context, packageName, object : CustomTabsServiceConnection() {
            override fun onCustomTabsServiceConnected(name: ComponentName, client: CustomTabsClient) {
                mClient = client
                mSession = client.newSession(CustomTabsCallback())
            }

            override fun onServiceDisconnected(name: ComponentName) {
                mClient = null
                mSession = null
            }
        })
    }

    override fun getName() = "RNInAppBrowser"

    @ReactMethod
    fun openInApp(url: String, settings: ReadableMap) {
        val builder = CustomTabsIntent.Builder(mSession)

        if (settings.hasKey(SETTING_COLOR)) {
            val color = Color.parseColor(settings.getString(SETTING_COLOR))
            builder.setToolbarColor(color)
        }

        if (settings.hasKey(SETTING_SHOW_TITLE)) {
            builder.setShowTitle(settings.getBoolean(SETTING_SHOW_TITLE))
        }

        if (settings.hasKey(SETTING_CLOSE_BUTTON)) {
            val uriOrDrawable = settings.getString(SETTING_CLOSE_BUTTON)
            val icon = uriOrDrawable?.let {
                getBitmapFromUriOrDrawable(it)
            }

            icon?.let { it ->
                val sizeInPixels = PixelUtil.toPixelFromDIP(24f).toInt()
                val resizedIcon = Bitmap.createScaledBitmap(it, sizeInPixels, sizeInPixels, false)
                builder.setCloseButtonIcon(resizedIcon)
            }
        }

        if (settings.hasKey(SETTING_SHARE_MENU) && settings.getBoolean(SETTING_SHARE_MENU)) {
            builder.addDefaultShareMenuItem()
        }

        val customTabsIntent = builder.build()
        customTabsIntent.launchUrl(currentActivity, Uri.parse(url))
    }

    @ReactMethod
    fun warmup(promise: Promise) {
        try {
            promise.resolve(mClient!!.warmup(0))
        } catch (e: NullPointerException) {
            promise.reject(e)
        }
    }

    @ReactMethod
    fun mayLaunchUrl(url: String, promise: Promise) =
            promise.resolve(mSession?.mayLaunchUrl(Uri.parse(url), null, null) ?: false)

    private fun getBitmapFromUriOrDrawable(uriOrDrawable: String): Bitmap? {
        return if (isDebug()) {
            getBitmapFromUri(uriOrDrawable)
        } else {
            getBitmapFromDrawable(uriOrDrawable)
        }
    }

    /**
     * Load image from development server.
     */
    private fun getBitmapFromUri(uri: String): Bitmap? {
        return try {
            val url = URL(uri)
            val connection = url.openConnection()
            BitmapFactory.decodeStream(connection.getInputStream())
        } catch (e: IOException) {
            null
        }
    }

    private fun getBitmapFromDrawable(drawableName: String): Bitmap? {
        return this.currentActivity?.let { activity ->
            BitmapFactory.decodeResource(
                    activity.resources,
                    activity.resources?.getIdentifier(drawableName, "drawable", activity.packageName)!!
            )
        }
    }

    private fun getPreferredBrowserPackageName() =
            CustomTabsClient.getPackageName(this.reactApplicationContext, CUSTOMTABS_BROWSERS)

    /**
     * Since this is a separate module, [BuildConfig.DEBUG] is not reliable.
     *
     * @see [https://medium.com/@elye.project/checking-debug-build-the-right-way-d12da1098120]
     */
    private fun isDebug() = this.reactApplicationContext.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0
}
