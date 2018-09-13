# Keep in sync with package.json

Pod::Spec.new do |s|
  s.name = '@matt-block/react-native-in-app-browser'
  s.version = '0.5.0'
  s.description = 'React Native in-app browser'
  s.license = 'MIT'
  s.requires_arc = true
  s.author = { 'Matei Bogdan Radu' => 'matei.radu.92@gmail.com' }
  s.homepage = 'https://github.com/matt-block'
  s.source = { :git => 'https://github.com/matt-block/react-native-in-app-browser' }
  s.platform = :ios, '9.0'
  s.dependency 'React'
  s.source_files = '*.{h,m,swift}'
  s.preserve_paths = '*.js'
end
