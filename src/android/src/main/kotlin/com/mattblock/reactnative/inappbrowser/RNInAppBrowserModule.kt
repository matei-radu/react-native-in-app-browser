/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

package com.mattblock.reactnative.inappbrowser

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.net.Uri
import android.support.customtabs.CustomTabsIntent

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

import java.net.URL

class RNInAppBrowserModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    companion object {
        private const val SETTING_COLOR = "toolbarColor"
        private const val SETTING_SHOW_TITLE = "showTitle"
        private const val SETTING_CLOSE_BUTTON = "closeButtonIcon"
        private const val SETTING_SHARE_MENU = "addDefaultShareMenu"
    }

    override fun getName() = "RNInAppBrowser"

    @ReactMethod
    fun openInApp(url: String, settings: ReadableMap) {
        val builder = CustomTabsIntent.Builder()

        if (settings.hasKey(SETTING_COLOR)) {
            val color = Color.parseColor(settings.getString(SETTING_COLOR))
            builder.setToolbarColor(color)
        }

        if (settings.hasKey(SETTING_SHOW_TITLE)) {
            builder.setShowTitle(settings.getBoolean(SETTING_SHOW_TITLE))
        }

        if (settings.hasKey(SETTING_CLOSE_BUTTON)) {
            val uriOrDrawable = settings.getString(SETTING_CLOSE_BUTTON)
            val icon = getBitmapFromUriOrDrawable(uriOrDrawable)

            icon?.let { it ->
                val sizeInPixels = convertDpToPixel(24f).toInt()
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

    private fun getBitmapFromUriOrDrawable(uriOrDrawable: String): Bitmap? {
        try {
            // Development mode when images are served from localhost.
            val url = URL(uriOrDrawable)
            val connection = url.openConnection()
            return BitmapFactory.decodeStream(connection.getInputStream())
        } catch (e: Exception) {
            return try {
                // Release mode when images are bundled as drawables.
                BitmapFactory.decodeResource(
                        this.currentActivity?.resources,
                        this.currentActivity?.resources?.getIdentifier(
                                uriOrDrawable,
                                "drawable",
                                this.currentActivity?.packageName)!!
                )
            } catch (e: Exception) {
                null
            }
        }
    }

    private fun convertDpToPixel(dp: Float): Float {
        val metrics = this.currentActivity?.resources?.displayMetrics!!
        val px = dp * (metrics.densityDpi / 160f)
        return Math.round(px).toFloat()
    }
}
