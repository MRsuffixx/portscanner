const net = require("net");
const fs = require("fs");
const readline = require("readline");
const { promisify } = require("util");
const config = require("./config.json");

const appendFileAsync = promisify(fs.appendFile);

const startPort = config.startPort;
const endPort = config.endPort;
const timeout = config.timeout;
const fileName = "ports.txt";

// Dosya yoksa oluştur.
if (!fs.existsSync(fileName)) {
  fs.writeFileSync(fileName, "", "utf8");
}

async function checkPort(ip, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);

    socket.on("connect", async () => {
      console.log(`${port} Denendi: Açık`);
      await appendFileAsync(fileName, `${port}\n`);
      socket.destroy();
      resolve(true);
    });

    socket.on("timeout", () => {
      console.log(`${port} Denendi: Kapalı`);
      socket.destroy();
      resolve(false);
    });

    socket.on("error", () => {
      console.log(`${port} Denendi: Kapalı`);
      resolve(false);
    });

    socket.connect(port, ip);
  });
}

async function scanPorts(ip) {
  console.log(`${ip} İp adresinin açık portları deneniyor.`);

  for (let port = startPort; port <= endPort; port++) {
    if (port % 1000 === 0) {
      console.log(`${port} Portu Arandı...`);
    }
    await checkPort(ip, port);
  }
  console.log("Port Arama Bitti.");
  console.log(`Sonuçlar ${filename} Dosyasına Kaydedildi`);
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function main() {
  console.log(
    "Bu uygulama sürekli bağlantı isteği gönderdiği için karşı taraftan ip ban yeme ihtimaliniz yüksek."
  );
  const answer = await askQuestion(
    "Tüm Sorumlulukları kabul edip uygulamayı başlatmak istiyormusunuz? (y/n): "
  );

  if (answer.toLowerCase() !== "y") {
    console.log("Uygulama kapatılıyor.");
    process.exit();
  }

  let ip = config.ip;
  if (!ip) {
    ip = await askQuestion("Lütfen sorgulanacak IP adresini girin: ");
    if (!ip) {
      console.log("Geçerli bir IP adresi girilmedi. Uygulama kapatılıyor.");
      process.exit();
    }
  }

  await scanPorts(ip);
}

main().catch(console.error);
