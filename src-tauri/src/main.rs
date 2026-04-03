// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use async_trait::async_trait;
use futures_lite::StreamExt;
use powersync::error::PowerSyncError;
use powersync::{BackendConnector, PowerSyncCredentials, PowerSyncDatabase, SyncOptions};
use tauri::{AppHandle, Runtime};
use tauri_plugin_powersync::PowerSyncExt;

#[tauri::command]
async fn connect<R: Runtime>(
    app: AppHandle<R>,
    handle: usize,
    powersync_url: String,
    powersync_token: String,
) -> tauri_plugin_powersync::Result<()> {
    let ps = app.powersync();
    let database = ps.database_from_javascript_handle(handle)?;

    let options = SyncOptions::new(AppBackendConnector {
        db: database.clone(),
        powersync_url,
        powersync_token,
    });
    database.connect(options).await;

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_powersync::init())
        .invoke_handler(tauri::generate_handler![connect])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

struct AppBackendConnector {
    db: PowerSyncDatabase,
    powersync_url: String,
    powersync_token: String,
}

#[async_trait]
impl BackendConnector for AppBackendConnector {
    async fn fetch_credentials(&self) -> Result<PowerSyncCredentials, PowerSyncError> {
        Ok(PowerSyncCredentials {
            endpoint: self.powersync_url.clone(),
            token: self.powersync_token.clone(),
        })
    }

    async fn upload_data(&self) -> Result<(), PowerSyncError> {
        let mut transactions = self.db.crud_transactions();
        let mut last_tx = None;

        while let Some(tx) = transactions.try_next().await? {
            // TODO: Upload CRUD transactions to your backend here.
            // For each transaction, serialize and POST to your API endpoint.
            // See https://docs.powersync.com/client-sdks/reference/tauri

            last_tx = Some(tx);
        }

        if let Some(tx) = last_tx {
            tx.complete().await?;
        }

        Ok(())
    }
}
