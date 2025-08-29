import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/export")({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <main className="h-screen container mx-auto p-8 flex flex-col gap-4">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-semibold"
      >
        Export CSV
      </motion.h1>

      <section className="h-full flex gap-24">
        <div className="w-1/2 flex items-center">
          <p className="text-3xl">
            Output คือ <span className="underline">แสดงรายชื่อ</span>
            ของสิ่งที่อยู่หมวดที่แต่ละกลุ่มเลือก เช่น นักแสดงไทย
            ให้แสดงเฉพาะชื่อของนักแสดงไทยทั้ง หมดที่ หน้าเวบแอพ และ
            <span className="underline">
              สามารถ export รายชื่อทั้งหมดที่ไ่ด้เป็นไฟล์ csv
            </span>
            ในรูปแบบหนึ่งชื่อต่อหนึ่งบรรทัดได้ (ควรมีความลึก ของการ Crawl ตั้ง
            แต่ 2 ระดับขึ้นไป)
          </p>
        </div>

        <div className="w-1/2 flex flex-col gap-4 justify-center items-end">
          <p className="text-xl">
            กลุ่มผมได้ปรึกษาหารือเกี่ยวกับ CSV ที่อาจารย์ต้องการ
            โดยจำนวนชื่อในหมวดที่เลือก ต้องไม่ต่ำกว่า 200 ชื่อ
            ทางกลุ่มจึงเลือกแบรนด์เกี่ยวกับมือถือ รุ่น Samsung
            ซึ่งมีมือถือมากถึง 1400 เครื่อง จึงเหมาะสมที่จะทำการ Export ออกเป็น
            CSV แล้วส่งให้กับอาจารย์ครับ.
          </p>
          <Button
            className="cursor-pointer bg-orange-500 hover:bg-orange-400"
            onClick={() => console.log("Hello World!")}
          >
            Download CSV
          </Button>
        </div>
      </section>
    </main>
  );
}
