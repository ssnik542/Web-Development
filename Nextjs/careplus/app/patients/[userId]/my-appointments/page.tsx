export const fetchCache = "force-no-store";
import { StatCard } from "@/components/StatCard";
// import { useRouter } from "next/router";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getPatient } from "@/lib/actions/patient.actions";
import { getAppointmentByPatient } from "@/lib/actions/appointment.actions";
import { Button } from "@/components/ui/button";
import { patientColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import SubmitButton from "@/components/SubmitButton";
async function Myappointments({ params: { userId } }: SearchParamProps) {
  const patient = await getPatient(userId);
  const appointments = await getAppointmentByPatient(patient.$id);
  const cancApp = appointments.documents.filter(
    (app: { status: string }) => app.status === "cancelled"
  ).length;
  const penApp = appointments.documents.filter(
    (app: { status: string }) => app.status === "pending"
  ).length;
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <div className="flex">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={32}
              width={162}
              alt="logo"
              className="h-8 w-fit"
            />
            <p className="ml-1 font-bold text-xl">CarePlus +</p>
          </div>
        </Link>

        <div className="text-16-semibold cursor-pointer flex gap-2 items-center">
          <Link href="/">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="admin-main">
        <section className="w-full flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
          <div className="md:space-y-4 text-center md:text-left">
            <h1 className="header">Welcome , {patient.name} 👋</h1>
            <p className="text-dark-700">Check your Appointments</p>
          </div>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link
              href={`/patients/${userId}/new-appointment`}
              className="text-green-500 text-lg font-semibold"
            >
              Schedule a Appointment
            </Link>
          </Button>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.total}
            label="Total appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={penApp}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={cancApp}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        <DataTable columns={patientColumns} data={appointments.documents} />
      </main>
    </div>
  );
}

export default Myappointments;
