### Günlük Uygulaması Servis Demo Nodejs

### `npm install`
diyerek bağımlılıkların yüklenmesi

### `npm start`
diyerek projenin ayağa kaldırılması.

## Katmanlar
- DataAcces (İlgili Modele Ait Db İşlemleri )
- Business (İlgili Modele Ait İş Katmanı Kodlamaları)
- Database (Mongoose Bağlantısı)
- Jobs      (Cron Job ile Mail Gönderilmesi )
- Middleware (Dosya ve Auth Kontrolü)
- Controller (Routedan Gelen İsteklerin Karşılanması)
- Routes     (EndPoint Tanımları)
- Model (Mongoose Schemlarının Tanımları)
- Utils (Redis, Sendemail,Queryparser)

## Teknolojiler

1. Nodejs
2. Express
3. Redis
4. SocketIO
5. BodyParser
6. Multer
7. Express-Validator
8. Token
9. NodeMailer
10. Kue
11. Moment
12. Md5
13. Cors
