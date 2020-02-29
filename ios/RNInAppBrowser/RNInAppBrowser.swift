/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import SafariServices

@objc(RNInAppBrowser)
class RNInAppBrowser: NSObject {
    private let SETTING_BARTINT = "preferredBarTintColor"
    private let SETTING_CONTROLTINT = "preferredControlTintColor"
    private let SETTING_COLLAPSEBAR = "barCollapsingEnabled"
    private let SETTING_READERMODE = "entersReaderIfAvailable"
    private let presentedSafariVC = RCTPresentedViewController()

    @objc(openInApp:settings:)
    func openInApp(url: String, settings: NSDictionary) -> Void {
        // Can be safely unwrapped as the provided url was already validated
        // on the JS side before reaching this point.
        let url = URL(string: url)!

        if #available(iOS 9.0, *) {
            var safariVC: SFSafariViewController;

            if #available(iOS 11.0, *) {
                let config = SFSafariViewController.Configuration()
                config.entersReaderIfAvailable = readerModeIsEnabled(settings: settings)
                safariVC = SFSafariViewController(url: url, configuration: config)
            } else {
                safariVC = SFSafariViewController(url: url, entersReaderIfAvailable: readerModeIsEnabled(settings: settings))
            }

            customize(safariView: safariVC, settings: settings)

            DispatchQueue.main.async { [weak self] in
                self?.presentedSafariVC?.present(safariVC, animated: true)
            }
        }

        // Fallback to default browser.
        else {
            DispatchQueue.main.async {
                UIApplication.shared.openURL(url)
            }
        }
    }

    @available(iOS 9.0, *)
    private func customize(safariView: SFSafariViewController, settings: NSDictionary) -> Void {
        if #available(iOS 10.0, *) , settings.value(forKey: SETTING_BARTINT) != nil {
            let barTint = settings.value(forKey: SETTING_BARTINT) as! String
            safariView.preferredBarTintColor = UIColor(hex: barTint)
        }

        if #available(iOS 10.0, *) , settings.value(forKey: SETTING_CONTROLTINT) != nil {
            let ctrlTint = settings.value(forKey: SETTING_CONTROLTINT) as! String
            safariView.preferredControlTintColor = UIColor(hex: ctrlTint)
        }

        if #available(iOS 11.0, *) , settings.value(forKey: SETTING_COLLAPSEBAR) != nil {
            let collapse = settings.value(forKey: SETTING_COLLAPSEBAR) as! Bool
            safariView.configuration.barCollapsingEnabled = collapse
        }
    }

    @available(iOS 9.0, *)
    private func readerModeIsEnabled(settings: NSDictionary) -> Bool {
        if settings.value(forKey: SETTING_READERMODE) != nil {
            let readerMode = settings.value(forKey: SETTING_READERMODE) as! Bool
            return readerMode
        }
        return false
    }

    @objc(closeInApp)
    func closeInApp() -> Void {
        DispatchQueue.main.async {
            self.presentedSafariVC?.dismiss(animated: true)
        }
    }

    /// See [Difference requiresMainQueueSetup and dispatch_get_main_queue?](https://stackoverflow.com/a/50775641)
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
