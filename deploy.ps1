# Script para desplegar a GitHub Pages
# Recarga el PATH para incluir Git
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Ejecuta gh-pages
npx gh-pages -d docs


