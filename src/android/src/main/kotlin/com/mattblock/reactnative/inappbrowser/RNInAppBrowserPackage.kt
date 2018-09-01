/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

package com.mattblock.reactnative.inappbrowser

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class RNInAppBrowserPackage : ReactPackage {
    override fun createNativeModules(context: ReactApplicationContext) =
            listOf(RNInAppBrowserModule(context))

    override fun createViewManagers(context: ReactApplicationContext) =
            listOf<ViewManager<*, *>>()
}
