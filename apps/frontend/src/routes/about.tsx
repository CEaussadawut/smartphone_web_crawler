import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  component: About
});

function About() {
  return (
    <main className="min-h-screen container mx-auto p-8 lg:p-12 flex flex-col gap-12 lg:gap-24">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-semibold"
      >
        About
      </motion.h1>

      <section className="flex flex-col gap-4">
        <p className="indent-8">
          โจทย์: ให้แต่ละกลุ่มสร้าง Web Application ที่ทำหน้าที่เป็น Web Crawler
          โดยใช้ Regular Expression Library ของ Python (import re)
          ในการรวบรวมรายชื่อของหมวดหมู่ที่นักศึกษาสนใจ จำนวน 1 หมวด
          (แต่ละกลุ่มห้ามซ้ำหมวดกัน) เช่น นักแสดงไทย นักร้องเกาหลี อาหารนานาชาติ
          เป็นต้น โดยจำนวนชื่อในหมวดที่เลือกต้องไม่ต่ำกว่า 200 ชื่อ สามารถ Crawl
          มาจากหลายแหล่งได้ เช่น Wikipedia, IMDb เป็นต้น และต้องใช้ Regular
          Expression ในการ Extract รายชื่อ.
        </p>
        <video
          className="rounded-lg h-56 lg:h-96 w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="/galaxy-z-flip7-features-unveiling.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>

        <p className="indent-8">
          กลุ่ม CEDT Phone ได้เลือกหมวดหมู่ที่เกี่ยวข้องกับ โทรศัพท์มือถือ
          (Mobile Phones) โดยใช้เว็บไซต์ GSMArena
          เป็นแหล่งข้อมูลหลักในการรวบรวมรายชื่อรุ่นมือถือ
          ซึ่งเว็บไซต์นี้เป็นศูนย์รวมข้อมูลสมาร์ทโฟนจากหลายแบรนด์ทั่วโลก เช่น
          Samsung, Apple, Xiaomi, Oppo และอีกมากมาย
          กระบวนการทำงานของโปรเจ็กต์จะเริ่มจากการสร้าง Web Application
          ที่ทำหน้าที่เป็น Web Crawler โดยขั้นตอนการทำงานแบ่งออกเป็น 3 ส่วนหลัก
          ๆ คือ
        </p>

        <div className="pl-4 lg:pl-8">
          <p></p>

          <ol className="pl-4 lg:pl-8 list-decimal">
            <li>
              จากหน้าแรก&ensp;
              <a
                href="https://www.gsmarena.com/makers.php3"
                className="underline"
                target="_blank"
              >
                https://www.gsmarena.com/makers.php3
              </a>
              &ensp;ทำการดึงรายชื่อยี่ห้อและ URL ของมือถือแต่ละแบรนด์
            </li>
            <li>
              เมื่อได้ URL ของแต่ละแบรนด์ เช่น&ensp;
              <a
                href=" https://www.gsmarena.com/oneplus-phones-95.php"
                className="underline"
                target="_blank"
              >
                https://www.gsmarena.com/oneplus-phones-95.php
              </a>
              &ensp;หรือ&ensp;
              <a
                href="https://www.gsmarena.com/nokia-phones-1.php"
                className="underline"
                target="_blank"
              >
                https://www.gsmarena.com/nokia-phones-1.php
              </a>
              &ensp;ระบบจะดึงรายชื่อทุกรุ่นของแบรนด์นั้น ๆ
            </li>
            <li>
              จากนั้นเข้าไปยังหน้าของมือถือแต่ละรุ่น เพื่อดึง รายละเอียดสเปก
              (Specifications) มาจัดเก็บไว้
            </li>
          </ol>
        </div>

        <p className="indent-8">
          เมื่อรวบรวมข้อมูลจากหลายแบรนด์และหลายรุ่นจนครบตามเงื่อนไขที่กำหนด
          (ไม่น้อยกว่า 200 รุ่น) ข้อมูลเหล่านี้จะถูกนำมาแสดงผลใน Web Application
          เพื่อให้ผู้ใช้สามารถเข้าถึงรายชื่อและสเปกของมือถือได้อย่างเป็นระบบ
          โดยตลอดทั้งกระบวนการจะใช้ Regular Expression (re ของ Python)
          เป็นเครื่องมือหลักในการ extract ข้อมูลจาก HTML โดยไม่อาศัยไลบรารีอื่น
          เช่น BeautifulSoup หรือ Scrapy ทำให้เป็นการฝึกการใช้งาน Regex ในการทำ
          Data Extraction จากเว็บเพจจริงได้อย่างมีประสิทธิภาพ.
        </p>
      </section>
    </main>
  );
}
