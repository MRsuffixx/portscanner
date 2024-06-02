# Port Scanner Projesi

Bu proje, belirli bir IP adresinde tüm portları tarayan ve açık olan portları `ports.txt` dosyasına kaydeden bir Node.js uygulamasıdır. Ayrıca, kullanıcıdan belirli onay ve IP adresi bilgileri alarak işlemleri gerçekleştirir.

## İçindekiler

1. [Projenin Amacı](#projenin-amacı)
2. [Özellikler](#özellikler)
3. [Kurulum](#kurulum)
4. [Kullanım](#kullanım)
5. [Çalışma Mantığı](#çalışma-mantığı)
6. [Olası Durumlar ve Olaylar](#olası-durumlar-ve-olaylar)
7. [Geri Bildirim](#geri-bildirim)

## Projenin Amacı

Bu proje, ağ güvenliğini arttırmak amacıyla belirli bir IP adresindeki tüm portları tarayarak açık olan portları tespit etmek ve kayıt altına almak için kullanılır. Sistem yöneticilerine ve güvenlik uzmanlarına, ağdaki açık portları hızlı bir şekilde belirleme imkanı sağlar.

## Özellikler

- Belirtilen IP adresindeki tüm portları (1-65535) tarar.
- Açık olan portları `ports.txt` dosyasına kaydeder.
- Kullanıcıdan başlangıçta onay alır ("test123" sorusu).
- `config.json` dosyasından yapılandırma bilgilerini alır.
- IP adresi `config.json` dosyasında belirtilmemişse kullanıcıdan IP adresi ister.

## Kurulum

1. Projeyi klonlayın veya indirin.
2. Proje dizininde aşağıdaki komutu çalıştırarak gerekli paketleri kurun:
    ```sh
    npm install
    ```

## Kullanım

1. `config.json` dosyasını aşağıdaki gibi yapılandırın:
    ```json
    {
        "ip": "İP_ADRESS",
        "startPort": 1,
        "endPort": 65535,
        "timeout": 2000
    }
    ```
    - `ip`: Tarama yapılacak IP adresi. Boş bırakılırsa kullanıcıdan istenir.
    - `startPort`: Taramanın başlayacağı port numarası (varsayılan: 1).
    - `endPort`: Taramanın biteceği port numarası (varsayılan: 65535).
    - `timeout`: Her bir port için zaman aşımı süresi (milisaniye cinsinden, varsayılan: 2000 ms).

2. Uygulamayı başlatın:
    ```sh
    node index.js
    ```

3. Başlangıçta "test123 (y/n): " sorusu sorulacaktır. Devam etmek için "y" tuşuna basın.
4. IP adresi belirtilmemişse, sizden IP adresi girmeniz istenecektir.

## Çalışma Mantığı

- Uygulama başlatıldığında `config.json` dosyasını okur.
- `config.json` dosyasındaki `ip` alanı boşsa kullanıcıdan IP adresi istenir.
- Kullanıcı "Tüm Sorumlulukları kabul edip uygulamayı başlatmak istiyormusunuz?" sorusuna "y" cevabını verirse port tarama işlemi başlar.
- Belirtilen IP adresindeki portlar taranır ve açık olanlar `ports.txt` dosyasına kaydedilir.
- `ports.txt` dosyası yoksa otomatik olarak oluşturulur.
- Tarama tamamlandığında, sonuçlar konsola yazdırılır ve `ports.txt` dosyasına kaydedilir.

## Olası Durumlar ve Olaylar

- **Başarılı Bağlantı:** Port açık ise, port numarası `ports.txt` dosyasına kaydedilir ve konsola "Açık" olarak yazdırılır.
- **Zaman Aşımı:** Port kapalı ise, konsola "Kapalı" olarak yazdırılır.
- **Hata Durumu:** Port kapalı ise veya bağlantı sağlanamıyorsa, konsola "Kapalı" olarak yazdırılır.
- **IP Adresi Girmeme:** Kullanıcı geçerli bir IP adresi girmezse, uygulama kapatılır.
- **Onay Reddedilirse:** Kullanıcı "test123" sorusuna "n" cevabını verirse, uygulama kapatılır.

## Geri Bildirim

Herhangi bir geri bildirim veya sorunuz varsa lütfen benimle iletişime geçin.
Discord: https://discord.mrsuffix.com
