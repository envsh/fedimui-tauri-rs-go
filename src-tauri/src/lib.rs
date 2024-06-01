
extern crate libc;
// use libc::c_char;
use std::ffi::CStr;
extern crate log;
extern crate env_logger;
extern crate rspp;
use tauri::Manager;

// use log::{debug, error, log_enabled, info, Level};
use log::{debug, error, warn, info};

// demo code
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet,callfwdgo])
        .setup(|app| {
            let _a2 : &mut tauri::App = app;
            let pkginfo = app.package_info();
            debug!("appsetup {} {}", pkginfo.name, pkginfo.version);
            let vno = rspp::globvarput(app);
            unsafe { trapp = vno; }
            debug!("varno {}", vno);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

////////// extern
fn remlogo(line : String) {
    let mut line2 = line.replace("\"", "\\\"");
    line2 = line2 + " fromrs";
    let jstr = format!("{{\"cmd\":\"remlog\",\"argc\":1,\"argv\":[\"{}\"]}}", line2);
    // callfwdgo(req);
    {
        log::debug!("reqdata={}", jstr);
        let prm = &mut rspp::ffiparam::default();
        prm.ptr = jstr.as_ptr() as usize;
        prm.len = jstr.len();
        unsafe { ffifuncproxy_rs2go(prm); }
        let rspcc = rspp::cstrfrom_usizeptr(prm.resp, prm.len2);
        debug!("go resp: {}", rspcc);
        // format!("Hello, {}! You've been greeted from Rust!", "ooo");
        rspp::cfree_usize(prm.resp);
    }
}

#[tauri::command(async)]
fn callfwdgo(jstr: String) -> String {
    log::debug!("reqdata={}", jstr);
    remlogo(format!("reqdata={}", jstr));
    let prm = &mut rspp::ffiparam::default();
    prm.ptr = jstr.as_ptr() as usize;
    prm.len = jstr.len();
    unsafe { ffifuncproxy_rs2go(prm); }
    remlogo(prm.tostr());
    let rspcc = rspp::cstrfrom_usizeptr3(prm.resp, prm.len2);
    debug!("go resp: {}", rspcc);
    remlogo(format!("go resp: '{}' len1 {} len2 {}", rspcc, rspcc.len(), prm.len2));
    // format!("Hello, {}! You've been greeted from Rust!", "ooo");
    rspp::cfree_usize(prm.resp);
    return rspcc;
}

#[allow(non_upper_case_globals)]
static mut trapp : usize = 0;
// static mut trapp : tauri::app = tauri::app::default();
#[no_mangle]
pub extern "C"
fn taurirs_ffi_emitfwdts(v: &mut rspp::ffiparam) {
    debug!("emitfwdts ptr{} len{}", v as *const rspp::ffiparam as usize, v.len);
    // debug!("emitfwdts {}", rspp::ptrtostr(v)); // why not work
    let data = rspp::cstrfrom_usizeptr(v.ptr, v.len);
    unsafe {
    let app : &mut tauri::App = rspp::globvarget(trapp);
    let res = app.emit("evtchan", data);
    match res {
        Err(e) => {
            debug!("emitres res {}", e);
            v.code = 500;
        }
        Ok(()) => {
            debug!("emitres {}", "ok");
            v.code = 200
        }
    }

    }
    if false {
        unsafe {
        info!("{} {}",123, rspp::globvars.len());
        warn!("{}",123);
        error!("{} {}",123, 456);
        }
    }
}


fn dummy_fnptrstub(v: &rspp::ffiparam) {
    // let p = v as *const rspp::ffiparam;
    debug!("dummy_fnptrstub 0x{} {}", rspp::ptrtostr2(v), v.len);
}
#[allow(non_upper_case_globals)]
static mut ffifuncproxy_rs2go : fn(_v:&rspp::ffiparam) = dummy_fnptrstub;

// #[no_mangle]
// pub extern "C"
// fn ffipxyrscxgoset(fnptr : fn(v:&str) ) {
//     unsafe { ffipxyrscxgo = fnptr; }
//     // ffipxyrscxgo = fnptr;
// }

////////////////

// rarely: On macOS, `EventLoop` must be created on the main thread!

#[allow(improper_ctypes_definitions)]
#[no_mangle]
pub extern "C"
fn taurirs_ffi_runasc(fnptr : fn(v: &rspp::ffiparam)) {
    env_logger::init();
    log::set_max_level(log::LevelFilter::Trace); // 无效果？？？
    // 使用环境变量，RUST_LOG=debug path/to/rsapp
    // log::info!("{} {}", "hehehe", log::max_level());
    // println!("log level {}", log::Level);

    unsafe {
        // let oldgvlen = rspp::globvarlen();        
        let oldfnptr = ffifuncproxy_rs2go;
        ffifuncproxy_rs2go = fnptr;
        // rspp::globvarput2(&oldfnptr);
        // rspp::globvarput2(&oldfnptr);
        // println!("htcnt {} => {}", oldgvlen, rspp::globvarlen());
        // oldfnptr as *const libc::c_void as usize
        // 在 android 上有bug，unwrap() crash
        // println!("ffifnptr {} => {}", rspp::ptrtostr(oldfnptr), fnptr as usize);
        println!("ffifnptr {} => {}", oldfnptr as *const libc::c_void as usize, fnptr as usize);
    }

    if std::env::consts::OS == "android" {
        // android java call run, dont need go
    }else{
        run();
    }
}

