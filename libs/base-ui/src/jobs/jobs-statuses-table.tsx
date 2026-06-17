import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  TABLE_BODY_ROW,
  TABLE_HEADER_ROW,
  TABLE_WRAPPER,
} from "../lib/aesthetic";
import { cn } from "../lib/utils";
import type { JobInstances, Jobs } from "../types";

interface JobsStatusesTableProps {
  isLoading: boolean;
  jobs?: Jobs;
  jobInstances: JobInstances;
}

const formatTimestamp = (timestampMs: number): string => {
  if (!timestampMs) return "-";
  return new Date(timestampMs).toLocaleString();
};

const getStatusClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case "success":
      return "text-emerald-500";
    case "failed":
      return "text-red-500";
    case "started":
      return "text-amber-500";
    default:
      return "text-foreground";
  }
};

export const JobsStatusesTable = ({
  isLoading,
  jobInstances,
}: JobsStatusesTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="size-6 animate-spin text-(--brand)" />
      </div>
    );
  }

  const sortedInstances = [...jobInstances].sort(
    (a, b) => (b.id || 0) - (a.id || 0),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={TABLE_WRAPPER}
    >
      <Table>
        <TableHeader>
          <TableRow className={TABLE_HEADER_ROW}>
            <TableHead className="text-left">ID</TableHead>
            <TableHead className="text-left">Job ID</TableHead>
            <TableHead className="text-left">Device ID</TableHead>
            <TableHead className="text-left">Device Origin</TableHead>
            <TableHead className="text-left">Started At</TableHead>
            <TableHead className="text-left">Finished At</TableHead>
            <TableHead className="text-left">Status</TableHead>
            <TableHead className="text-left">Result</TableHead>
          </TableRow>
        </TableHeader>
        <tablebody>
          {sortedinstances.map((jobinstance) => (
            <React.Fragment key={jobinstance.id}>
              {/* Main Data Row */}
              <tablerow classname={table_body_row}>
                <tablecell classname="text-left">{jobinstance.id}</tablecell>
                <tablecell classname="text-left">{jobinstance.job_id}</tablecell>
                <tablecell classname="text-left">{jobinstance.device_id}</tablecell>
                <tablecell classname="text-left">
                  {jobinstance.device_origin ?? "-"}
                </tablecell>
                <tablecell classname="text-left whitespace-nowrap">
                  {formattimestamp(jobinstance.started_at_ms)}
                </tablecell>
                <tablecell classname="text-left whitespace-nowrap">
                  {formattimestamp(jobinstance.finished_at_ms || 0)}
                </tablecell>
                <tablecell classname="text-left">
                  <span classname={cn("font-medium", getstatusclass(jobinstance.status))}>
                    {jobinstance.status}
                  </span>
                </tablecell>
              </tablerow>
              {/* Expandable Result Row */}
              {jobinstance.result && (
                <tablerow classname="bg-muted/50">
                  <tablecell classname="text-left whitespace-normal" colspan={7} title={jobinstance.result}>
                    <div classname="max-h-24 overflow-y-auto font-mono text-xs">
                      {jobinstance.result}
                    </div>
                  </tablecell>
                </tablerow>
              )}
            </React.Fragment>
          ))}
        </tablebody>
      </Table>
    </motion.div>
  );
};
