all: rslib go

rslib:
	cd src-tauri && cargo build --lib

pcapp:
	npm run tauri build --no-bundle

# todo
# Unknown Kotlin JVM target: 22
# 指定 jdk17的目录即可。
# https://docs.gradle.org/current/userguide/compatibility.html
# now olny build -t aarch64 -t armv7
# [possible values: aarch64, armv7, i686, x86_64]
# 支持的版本，gradle7.6,jdk17,
apk:
	NDK_HOME=/usr/local/share/android-ndk ANDROID_HOME=/opt/android-sdk/ JAVA_HOME=/nix/store/rflj4qrjp5km8kqfwh2s70s64y4d904v-zulu-ca-jdk-17.0.10/ ./node_modules/.bin/tauri android build -t aarch64
#	NDK_HOME=/usr/local/share/android-ndk ANDROID_HOME=/opt/android-sdk/ JAVA_HOME=/nix/store/rflj4qrjp5km8kqfwh2s70s64y4d904v-zulu-ca-jdk-17.0.10/ npm run tauri android build --target=aarch64-linux-android --verbose

go:
	cd src-go && go build

# android aarch64
golib:
	cd src-go && go build -os android -arch aarch64 -o libuigo.so

rsdoc:
	cd src-tauri && cargo doc --open -p log -p env_logger -p tauri