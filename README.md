# CEDT Phone

TOC project eiei

## Requirement

Bun >= 1.1.0

Python >= 3.10

## How to start (Development)

![oiia_cat](https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif)

ez โคตรรรร ทำตามนี้

สร้าง python environment ขึ้นมา ณ root path ของ project

เปิด code editor แล้ว new terminal ขึ้นมา แล้วพิม

```py
python -m venv apps/backend/venv
```

สร้าง symlink folder เพื่อให้ path ตรงกับ script ที่ตั้งไว้

ณ root path ของ project **(ใช้ command prompt ด้วยสิทธิ์ admin เท่านั้น!!!)**

command prompt run as admin แล้วไปที่ root path ของโปรเจค จากนั้นพิม

```py
cd apps/backend/venv && mklink /d bin Scripts
```

จากวันนั้น (จากนั้น) ปิด command prompt กลับไปที่ code editor

```js
bun install
bun run dev
```

> เมื่อแก้ไช backend เสร็จให้พิมพ์คำสั่งตามนี้
> เพื่อให้ generate helper สำหรับ query จาก backend ได้

```sh
cd apps/frontend && bun run openapi-ts
```

ปล. package ทั้งหมดจะลงไว้ใน folder โปรเจคนี้ ไม่ต้องห่วง backdoor เพราะโดนอยู่แล้ว (หยอก)
