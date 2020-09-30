/**
 * Copyright (c) 2018-2020, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

package com.mattblock.reactnative.inappbrowser

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class RNInAppBrowserPackage : ReactPackage {
    override fun createNativeModules(context: ReactApplicationContext) =
            listOf(RNInAppBrowserModule(context))

    override fun createViewManagers(context: ReactApplicationContext) =
            listOf<ViewManager<*, *>>()
}
