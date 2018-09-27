# Challenge : Movie Ticket Machine

## Technologies
#### Next.js
- เป็น framework ที่มีส่วนสำเร็จรูปหลายอย่างในเรื่องของการ routing, pages history ทำให้น่าสนใจและคิดว่าน่าจะช่วยทุ่นแรงได้กว่า CRA และคิดว่าน่าจะใช้แนวความคิดเดียวกันกับ Vue.js
#### next-routes/express
- ใช้เพื่อรองรับ custom url และแสดงลิ้งค์ที่สอดคล้องกับการแสดงผล
#### firebase
- เป็น NoSQL database ที่มี API รองรับการ query และคุ้นเคยกับการทำงานมาก่อน และชอบลักษณะของการจัดการข้อมูลแบบ document
#### SaSS/SCSS
- Preprocessor ที่ช่วยทุ่นแรงในการตกแต่งให้กับหน้าเว็บ และมี syntax ที่ช่วยให้ข้อมูลจัดเรียงเป็นระบบระเบียบ
#### nodemon
- ใช้สำหรับ live-reload และ debug

## Architecture Design
- ใช้แนวคิดของตู้ขายตั๋วหนัง ที่มีการใช้งานเรียบง่าย คือการเลือกซื้อตั๋วทันทีไม่จำเป็นต้อง login จึงประกอบไปด้วย `หน้าการค้นหา` กับ `หน้าชำระเงิน`
- ใช้ Firebase, Storage เป็นตัวเก็บข้อมูลหนังทั้งหมด และดึงข้อมูลมาแสดงผลตามที่ผู้ใช้ต้องการ
- การประมวลผลข้อมูลจะอยู่ที่ฝั่ง client มากเพราะคำสั่ง firebase query นั้นไม่สามารถค้นหาหรือผสมได้ซับซ้อนเท่า SQL และ API ปกติเรียกใช้จาก server-side ไม่ได้
- ข้อมูลหนังที่เก็บในรูปแบบดังนี้
   > `movie-name(key): {poster, description, price, length, showtimes[]}`
   
## Installation
1. Clone or Download the repository
2. Install and run
```
npm install
npm run dev
```
## Deployment

URL : https://ticket-machine-cc.herokuapp.com/
#### Heroku - hosting
- เลือกใช้เพราะ deploy บน firebase hosting ไม่สำเร็จ เนื่องจากโฟลเดอร์ .next ที่ build ออกมาไม่ถูกอัพขึ้นไป
- วิธีการ deploy เรียบง่าย`กว่า` และไม่ต้อง config อะไรมาก
#### Firebase - database
- ใช้งานได้แบบ read-only อย่างเดียว เนื่องจากทำระบบ authentication ไม่ทัน
