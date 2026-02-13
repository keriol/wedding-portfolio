param(
  [string]$TargetRoot = "\\192.168.69.38\Website\wedding-deploy\web\apps\web"
)

$ErrorActionPreference = "Stop"

Write-Host "== Build =="
npm --prefix apps/web install
npm --prefix apps/web run build

# Sanity check
if (-not (Test-Path "apps/web/.next/standalone/server.js")) {
  throw "Missing apps/web/.next/standalone/server.js. Check next.config.* output:'standalone'."
}

Write-Host "== Prepare target =="
New-Item -ItemType Directory -Force $TargetRoot | Out-Null
New-Item -ItemType Directory -Force (Join-Path $TargetRoot ".next\static") | Out-Null

Write-Host "== Copy standalone server (server.js + required files) =="
robocopy "apps\web\.next\standalone" $TargetRoot /MIR /NFL /NDL /NJH /NJS /NP

Write-Host "== Copy static assets (/_next/static) =="
robocopy "apps\web\.next\static" (Join-Path $TargetRoot ".next\static") /MIR /NFL /NDL /NJH /NJS /NP

Write-Host "== Copy public =="
robocopy "apps\web\public" (Join-Path $TargetRoot "public") /MIR /NFL /NDL /NJH /NJS /NP

Write-Host ""
Write-Host "OK. Restart QNAP container and open: http://192.168.69.38:8088"
