
extern crate libc;
// use libc::c_char;
// use std::ffi::CStr;
extern crate log;
extern crate env_logger;
extern crate rspp;
use tauri::Manager;

// use log::{debug, error, log_enabled, info, Level};
use log::{debug, error, warn, info};

fn logger_setup() {
    env_logger::init();
    log::set_max_level(log::LevelFilter::Trace); // 无效果？？？
    // 使用环境变量，RUST_LOG=debug path/to/rsapp
    // log::info!("{} {}", "hehehe", log::max_level());
    // println!("log level {}", log::Level);
}

// demo code
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    logger_setup();
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet,callfwdgo,devtools])
        .setup(|app| {
            let _a2 : &mut tauri::App = app;
            let pkginfo = app.package_info();
            debug!("appsetup {} {}", pkginfo.name, pkginfo.version);
            let vno = rspp::globvarput(app);
            unsafe { trapp = vno; }
            debug!("varno {}", vno);

            listenallbuiltinevents(app);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// enum TauriEvent {
//     WINDOW_RESIZED = 'tauri://resize',
//     WINDOW_MOVED = 'tauri://move',
//     WINDOW_CLOSE_REQUESTED = 'tauri://close-requested',
//     WINDOW_DESTROYED = 'tauri://destroyed',
//     WINDOW_FOCUS = 'tauri://focus',
//     WINDOW_BLUR = 'tauri://blur',
//     WINDOW_SCALE_FACTOR_CHANGED = 'tauri://scale-change',
//     WINDOW_THEME_CHANGED = 'tauri://theme-changed',
//     WINDOW_CREATED = 'tauri://window-created',
//     WEBVIEW_CREATED = 'tauri://webview-created',
//     DRAG = 'tauri://drag',
//     DROP = 'tauri://drop',
//     DROP_OVER = 'tauri://drop-over',
//     DROP_CANCELLED = 'tauri://drag-cancelled'
// };

fn listenallbuiltinevents(app: & tauri::App) {
            // \see builtin event here
            // https://github.com/tauri-apps/tauri/blob/5b769948a81cac333f64c870a470ba6525bd5cd3/tooling/api/src/event.ts#L50

    let cbfn = |evstr : String, evt : tauri::Event| {
        error!("evt: {}, id: {}, dlen: {}, data: {}", evstr, evt.id(), evt.payload().len(), evt.payload());
        
        callfwdgo(evt.payload().to_string());
    };
    // todo evtcb not called???
    // let x = tauri::event::TargetEvent;
    info!("listen builtin event tauri://* ...");
    app.listen("component-loaded", move |evt| { 
        info!("winccc {}", evt.id());
     });
    let  mut evtall = "tauri://*".to_string();
    evtall = "tauri://window-created".to_string();
    // app.listen(evtall.clone(), move |evt| { cbfn(evtall.to_string(), evt); });
    evtall = "tauri://webview-created".to_string();
    app.listen(evtall.clone(), move |evt| { cbfn(evtall.to_string(), evt); });
    evtall = "tauri://destroyed".to_string();
    app.listen(evtall.clone(), move |evt| { cbfn(evtall.to_string(), evt); });
    evtall = "tauri://focus".to_string();
    app.listen(evtall.clone(), move |evt| { cbfn(evtall.to_string(), evt); });
    evtall = "tauri://blur".to_string();

    // let mw = app.get_window("main");
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
        let rspcc = rspp::cstrfrom_usizeptr3(prm.resp, prm.len2);
        debug!("go resp: {}", rspcc);
        // format!("Hello, {}! You've been greeted from Rust!", "ooo");
        rspp::cfree_usize(prm.resp);
    }
}

// jstr, json string...
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
#[tauri::command(async)]
fn devtools(jstr: String) -> String {
    log::debug!("reqdata={}", jstr);
    remlogo(format!("reqdata={}", jstr));
    let mut res = "";
    let app = trappget();
    // let mut app = trappget();
    // unsafe {
    //     // let app : &mut tauri::App = rspp::globvarget(trapp);
    //     app = rspp::globvarget(trapp);
    // }

    let window = app.get_webview_window("main").unwrap();
    if !window.is_devtools_open() {
        window.open_devtools();
            // window.close_devtools();
        res = "open ok"
    }else {
        // window.open_devtools();
        window.close_devtools();
        res = "close ok"
    }

    return res.into()
}

#[allow(non_upper_case_globals)]
static mut trapp : usize = 0;
// static mut trapp : tauri::App = tauri::app::default();
fn trappget() -> &'static mut tauri::App { unsafe{ rspp::globvarget(trapp) } }

#[no_mangle]
pub extern "C"
fn taurirs_ffi_emitfwdts(v: &mut rspp::ffiparam) {
    // v as *const rspp::ffiparam as usize
    debug!("emitfwdts ptr{} len{}", rspp::ptrtostr2(v), v.len);
    // debug!("emitfwdts {}", rspp::ptrtostr(v)); // why not work
    remlogo(format!("emitfwdts ptr{} len{}", rspp::ptrtostr2(v), v.len));
    // let data = rspp::cstrfrom_usizeptr3(v.ptr, v.len);
    let data2 = rspp::cstrfrom_usizeptr3(v.ptr, v.len);
    let mut emitres : String = "emitres".into();
    unsafe {
    let app : &mut tauri::App = rspp::globvarget(trapp);
    
    let runmtres = app.run_on_main_thread(  ||  {
        let app : &mut tauri::App = rspp::globvarget(trapp);
        // let t = "{\"message\": \"hello world呵呵呵\"}";
        let mut emitres : String = "emitres".into();
        let dlen = data2.len();
        let res = app.emit("evtchan", data2); // evtch.glob,
        match res {
            Err(e) => {
                emitres = format!("{} {}", emitres, e);
                // debug!("emitres res {}", e);
                // v.code = 500;
            }
            Ok(()) => {
                // emitres += "ok";
                // debug!("emitres {}", "ok");
                // v.code = 200
            }
        }
        info!("emit len {}, {}", dlen, emitres);
    });
    match runmtres {
        Ok(()) => {
            emitres += "ok";
            // debug!("emitres {}", "ok");
            v.code = 200
        }
        Err(e) => {
            emitres = format!("{} {}", emitres, e);
            // debug!("emitres res {}", e);
            v.code = 500;
        }
    }

    // let res = app.emit("evtchan", data); // Result<()>
    // match res {
    //     Ok(()) => {
    //         emitres += "ok";
    //         // debug!("emitres {}", "ok");
    //         v.code = 200
    //     }
    //     Err(e) => {
    //         emitres = format!("{} {}", emitres, e);
    //         // debug!("emitres res {}", e);
    //         v.code = 500;
    //     }
    // }
    remlogo(format!("emitfwdts ptr {} len {} res {}", rspp::ptrtostr2(v), v.len, emitres));

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

