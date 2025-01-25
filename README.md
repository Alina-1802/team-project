# team-project


## Instalacja backendu na WSL ubuntu:
```
curl --proto '=https' --tlsv1.3 https://sh.rustup.rs -sSf | sh
sudo apt update
sudo apt upgrade
sudo apt install pkg-config libssl-dev net-tools
rustup update
cd /mnt/c/Users/.../.../team-project/backend
cargo build
cargo run
```


## Instalacja frontendu:
#### polecamy nvm - upraszcza zarządzanie wersjami node gdybyście mieli więcej projektów, ewentualnie można zainstalować po prostu node.js np w wersji 22, ale tutaj pokażemy ścieżkę z nvm
```
https://github.com/coreybutler/nvm-windows?tab=readme-ov-file
nvm-setup.exe

nvm i 22
nvm use 22
cd .../team-project/frontend
npm i
# do developmentu
npm run dev
# do prezentacji
npm run build
npm run preview
```
