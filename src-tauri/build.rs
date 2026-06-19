fn main() {
    println!("cargo:rerun-if-changed=icons/icon.ico");
    println!("cargo:rerun-if-changed=../public/rustero-icon.png");
    println!("cargo:rerun-if-changed=tauri.conf.json");
    tauri_build::build()
}
