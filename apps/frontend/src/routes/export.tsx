import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { getPhoneBrandApiExportCsvGetOptions } from "@/client/@tanstack/react-query.gen";
import type { PhonePreview } from "@/client/types.gen";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export const Route = createFileRoute("/export")({
  component: RouteComponent
});

function exportToCSV(data: PhonePreview[]) {
  if (!data || data.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Phones");

  XLSX.writeFile(workbook, "phones.csv", { bookType: "csv" });
}

function RouteComponent() {
  const [hasExported, setHasExported] = useState(false);

  const { isLoading, isError, data, error, refetch, isFetched } = useQuery({
    ...getPhoneBrandApiExportCsvGetOptions(),
    enabled: false
  });

  const exportCSVCallback = useCallback(() => {
    if (data) {
      exportToCSV(data);
    } else {
      refetch();
    }
  }, [data, refetch]);

  useEffect(() => {
    if (isFetched && data && !hasExported) {
      exportToCSV(data);
      setHasExported(true);
    }

    if (isError) {
      console.error(error);
    }
  }, [data, error, hasExported, isError, isFetched]);

  return (
    <main className="min-h-screen container mx-auto p-8 flex flex-col gap-4">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-semibold"
      >
        Export CSV
      </motion.h1>

      <section className="my-auto flex flex-col justify-center ">
        <p className="text-xl">
          Output คือ <span className="underline">แสดงรายชื่อ</span>
          &ensp;ของสิ่งที่อยู่หมวดที่แต่ละกลุ่มเลือก เช่น นักแสดงไทย
          ให้แสดงเฉพาะชื่อของนักแสดงไทยทั้ง หมดที่ หน้าเว็บแอพ และ&ensp;
          <span className="underline">
            สามารถ export รายชื่อทั้งหมดที่ไ่ด้เป็นไฟล์ .csv
          </span>
          &ensp;ในรูปแบบหนึ่งชื่อต่อหนึ่งบรรทัดได้ (ควรมีความลึก ของการ Crawl
          ตั้ง แต่ 2 ระดับขึ้นไป) กลุ่ม CEDT Phone เราได้รวบรวมมือถือมากกว่า
          4333 รุ่นไว้ในปุ่มเดียวแล้ว เพียงคลิก Download CSV (อาจใช้เวลามากถึง
          3นาที โปรดรอสักครู่)
        </p>

        <Button
          className="min-w-28 ml-auto cursor-pointer bg-orange-500 hover:bg-orange-400"
          onClick={exportCSVCallback}
          disabled={isLoading}
        >
          {isLoading ? <Spinner variant="ring" /> : "Download CSV"}
        </Button>

        {/* <div className="w-1/2 flex flex-col gap-4 justify-center items-end">
          <p className="text-xl">
            กลุ่มผมได้ปรึกษาหารือเกี่ยวกับ CSV ที่อาจารย์ต้องการ
            โดยจำนวนชื่อในหมวดที่เลือก ต้องไม่ต่ำกว่า 200 ชื่อ
            ทางกลุ่มจึงเลือกแบรนด์เกี่ยวกับมือถือ รุ่น Samsung
            ซึ่งมีมือถือมากถึง 1400 เครื่อง จึงเหมาะสมที่จะทำการ Export ออกเป็น
            CSV แล้วส่งให้กับอาจารย์ครับ.
          </p>
         
        </div> */}
      </section>
    </main>
  );
}
