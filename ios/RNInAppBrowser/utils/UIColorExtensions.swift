/**
 * Copyright (c) 2018-2020, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import Foundation

extension UIColor {
    convenience init(hex: String) {
        var colors: String = hex

        // Remove #
        colors.remove(at: colors.startIndex)

        var rgbValue:UInt32 = 0
        Scanner(string: colors).scanHexInt32(&rgbValue)

        self.init(
            red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
            alpha: CGFloat(1.0)
        )
    }
}
