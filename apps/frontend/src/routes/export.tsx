import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useCallback, useRef } from "react";
import { toast, type ToastT } from "sonner";
import * as XLSX from "xlsx";

import { exportCsvApiExportCsvPostMutation } from "@/client/@tanstack/react-query.gen";
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
  const exportCSVMutation = useMutation(exportCsvApiExportCsvPostMutation());
  const exportCSVToast = useRef<ToastT["id"] | null>(null);
  const isCancelled = useRef(false);

  const exportCSVCallback = useCallback(async () => {
    isCancelled.current = false;
    const exportCSV = exportCSVMutation.mutateAsync({});

    exportCSVToast.current = toast.promise(exportCSV, {
      loading: "กำลัง export csv",
      success: (data) => {
        if (isCancelled.current) {
          return "การ export ถูกยกเลิก";
        }
        exportToCSV(data);
        return "Export CSV เสร็จสิ้น";
      },
      error: (err) => {
        console.error(err);
        return "ไม่สามารถ export csv ได้!";
      }
    }) as string | number;
  }, [exportCSVMutation]);

  const handleCancel = useCallback(() => {
    isCancelled.current = true;
    if (exportCSVToast.current) {
      toast.dismiss(exportCSVToast.current);
    }
    exportCSVMutation.reset();
    toast.success("ยกเลิก export csv แล้ว");
  }, [exportCSVMutation]);

  return (
    <main className="min-h-screen container mx-auto p-8 flex flex-col gap-4">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-semibold"
      >
        Export CSV
      </motion.h1>

      <section className="my-auto flex flex-col justify-center">
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

        <div className="pt-8 lg:p-0 flex flex-row space-x-3">
          <Button
            className="min-w-28 ml-auto cursor-pointer bg-orange-500 hover:bg-orange-400"
            onClick={
              exportCSVMutation.isPaused
                ? exportCSVMutation.reset
                : exportCSVCallback
            }
            disabled={exportCSVMutation.isPending}
          >
            {exportCSVMutation.isPending ? (
              <>
                <Spinner variant="ring" />
                Exporting...
              </>
            ) : (
              "Download CSV"
            )}
          </Button>

          {exportCSVMutation.isPending && (
            <Button variant="destructive" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}
