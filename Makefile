all: rslib go

rslib:
	cd src-tauri && cargo build --lib

go:
	cd src-go && go build

rsdoc:
	cd src-tauri && cargo doc --open -p log -p env_logger -p tauri