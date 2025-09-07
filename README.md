# CEDT Phone
โจทย์: ให้แต่ละกลุ่มสร้าง Web Application ที่ทำหน้าที่เป็น Web Crawler โดยใช้ Regular Expression Library ของ Python (import re) ในการรวบรวมรายชื่อของหมวดหมู่ที่นักศึกษาสนใจ จำนวน 1 หมวด (แต่ละกลุ่มห้ามซ้ำหมวดกัน) เช่น นักแสดงไทย นักร้องเกาหลี อาหารนานาชาติ เป็นต้น โดยจำนวนชื่อในหมวดที่เลือกต้องไม่ต่ำกว่า 200 ชื่อ สามารถ Crawl มาจากหลายแหล่งได้ เช่น Wikipedia, IMDb เป็นต้น และต้องใช้ Regular Expression ในการ Extract รายชื่อ.

## Screenshots

| Home                                                                                              | All brand phone                                                                                          |
|:------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| ![home_page](https://github.com/user-attachments/assets/4fe7966d-2943-4c1e-9efb-9fe1a1f93153)     | ![all_brand_phone_page](https://github.com/user-attachments/assets/8c39cc45-fd07-426d-bba6-c233bb2f2b5b) |
| Phones in brand                                                                                   | Phone specs                                                                                              |
| ![samsung_brand](https://github.com/user-attachments/assets/9ae09234-6e2d-4a06-a7f9-fbdf82eff95c) | ![specs_page]() |
| About                                                                                             | Export CSV file                                                                                          |
| ![about_page](https://github.com/user-attachments/assets/5834d7d0-5a3b-4d8c-b6f8-a84e919876dd)    | ![export_csv_page](https://github.com/user-attachments/assets/1424eb68-a2c0-4ef8-b0dd-e3774f50850f) |

## Requirement

| Tech Stack                                    | Version                                                   | Download                                 |
| --------------------------------------------- | --------------------------------------------------------- | :--------------------------------------: |
| ![Bun](https://skillicons.dev/icons?i=bun)    | ![bun](https://img.shields.io/badge/Bun_>=-1.1.0-blue)    | [link](https://bun.com)                  |
| ![Bun](https://skillicons.dev/icons?i=python) | ![bun](https://img.shields.io/badge/Python_>=-3.10-blue)  | [link](https://www.python.org/downloads) |

## Run Locally (Development)

![oiia_cat](https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif)

### 1. สร้าง python environment ขึ้นมา ณ root path ของ project

```py
python -m venv apps/backend/venv
```

### 2. สร้าง symlink folder เพื่อให้ path ตรงกับ script ที่ตั้งไว้ (หากใช้ linux ข้ามขั้นตอนนี้ได้เลอ)

ณ root path ของ project **(ใช้ command prompt ด้วยสิทธิ์ admin เท่านั้น!!!)**

```py
cd apps/backend/venv && mklink /d bin Scripts
```

### 3. รันเลยย

ปิด command prompt กลับไปที่ code editor จากนั้นพิม
```js
bun install
```
ตามด้วย
```js
bun run dev
```

> เมื่อแก้ไช backend เสร็จให้พิมพ์คำสั่งตามนี้
> เพื่อให้ generate helper สำหรับ query จาก backend ได้

```sh
cd apps/frontend && bun run openapi-ts
```

ปล. package ทั้งหมดจะลงไว้ใน folder โปรเจคนี้ ไม่ต้องห่วง backdoor เพราะโดนอยู่แล้ว (หยอก)

## Deployment (Production with Docker)

### 1. Build the Docker image

```sh
docker build -t phone-web-crawler .
```

### 2. Run the Docker container

```sh
docker run -p 8000:8000 --rm phone-web-crawler
```
