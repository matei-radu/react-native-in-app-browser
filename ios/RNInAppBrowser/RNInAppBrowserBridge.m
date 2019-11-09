/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNInAppBrowser, NSObject)

RCT_EXTERN_METHOD(openInApp:(NSString *)url settings:(NSDictionary *)settings)
RCT_EXTERN_METHOD(closeInApp)

@end
