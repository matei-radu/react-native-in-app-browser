/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

package com.mattblock.reactnative.inappbrowser

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class RNInAppBrowserModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName() = "RNInAppBrowser"

    @ReactMethod
    fun openInApp(url: String) {
        // Open the URL!
    }
}
