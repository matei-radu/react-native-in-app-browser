require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name = package['name'].gsub(/@matt-block\//, '')
  s.version = package['version']
  s.summary = package['description']
  s.license = package['license']
  s.requires_arc = true
  s.author = package['author']
  s.homepage = package['homepage']
  s.source = { :git => 'https://github.com/matei-radu/react-native-in-app-browser' }
  s.platform = :ios, '9.0'
  s.dependency 'React'
  s.swift_versions = ['4.2', '5']
  s.source_files = '**/*.{h,m,swift}'
  s.preserve_paths = '*.js'
end
