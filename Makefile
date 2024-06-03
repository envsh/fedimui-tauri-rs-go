all: rslib go

rslib:
	cd src-tauri && cargo build --lib

pcapp:
	npm run tauri build --no-bundle

genmob:
	NDK_HOME=/usr/local/share/android-ndk ANDROID_HOME=/opt/android-sdk/ ./node_modules/.bin/tauri android init

# todo
# Unknown Kotlin JVM target: 22
# 指定 jdk17的目录即可。
# https://docs.gradle.org/current/userguide/compatibility.html
# now olny build -t aarch64 -t armv7
# [possible values: aarch64, armv7, i686, x86_64]
# 支持的版本，gradle7.6,jdk17,
# 调试版本，--debug
apk:
	NDK_HOME=/usr/local/share/android-ndk ANDROID_HOME=/opt/android-sdk/ JAVA_HOME=/nix/store/rflj4qrjp5km8kqfwh2s70s64y4d904v-zulu-ca-jdk-17.0.10/ ./node_modules/.bin/tauri android build --apk -t aarch64
	jarsigner -verify ./src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk
	JAVA_HOME=/nix/store/rflj4qrjp5km8kqfwh2s70s64y4d904v-zulu-ca-jdk-17.0.10/ /opt/android-sdk/build-tools/30.0.3/apksigner sign --ks-pass pass:changeit --ks ../seckeys/apksign_keystore.jks ./src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk

#	NDK_HOME=/usr/local/share/android-ndk ANDROID_HOME=/opt/android-sdk/ JAVA_HOME=/nix/store/rflj4qrjp5km8kqfwh2s70s64y4d904v-zulu-ca-jdk-17.0.10/ npm run tauri android build --target=aarch64-linux-android --verbose

gensignkey:
	~/.nix-profile/bin/keytool -genkeypair -keyalg RSA -alias thekeystore -keystore keystore.jks -storepass changeit -keysize 2048
	ls -lh keystore.jks

apksign:
	JAVA_HOME=/nix/store/rflj4qrjp5km8kqfwh2s70s64y4d904v-zulu-ca-jdk-17.0.10/ /opt/android-sdk/build-tools/30.0.3/apksigner sign --ks-pass pass:changeit --ks ../seckeys/apksign_keystore.jks ./src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk

apkinst:
	/opt/android-sdk/adbtools/adb install ./src-tauri/gen/android/app/build/outputs/apk/universal/release/app-universal-release-unsigned.apk

go:
	cd src-go && go build

# android aarch64
golib:
	cd src-go && ./buildandroid.sh
	cp -v fedimuigo.so src-tauri/gen/android/app/src/main/jniLibs/arm64-v8a/libfedimuigo.so
#	cd src-go && GOOS=android  GOARCH=arm64  CGO_CFLAGS="-arch arm64" CGO_LDFLAGS="-arch arm64" CGO_ENABLED=1 go build -buildmode=c-shared -o ../fedimuigo.so
# cd src-go && go build - android -arch aarch64 -o libuigo.so

alogc:
	/opt/android-sdk/adbtools/adb logcat | grep -i tauri

rsdoc:
	cd src-tauri && cargo doc --open -p log -p env_logger -p tauri

# just demo
updemo:
	cargo update foo --precise 1.2.3
uptr:
	cd src-tauri && cargo update tauri --precise 2.0.0-beta.20