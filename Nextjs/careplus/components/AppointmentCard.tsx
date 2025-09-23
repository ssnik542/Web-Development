import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { Doctors } from "@/constants";
type TAppCard = {
  title: string;
  description: string;
  physician: string;
  status: string;
};
function AppointmentCard(props: TAppCard) {
  const doctor = Doctors.find((doctor) => doctor.name === props.physician);
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="tracking-wider">
          {props.title.toUpperCase()}
        </CardTitle>
        <CardDescription className="text-dark-700">
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(props.description).dateTime}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <p>
            <span className="font-bold tracking-wide">STATUS : </span>
            {props.status}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-red-400  text-dark-200 font-bold text-sm w-full">
          Cancel Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AppointmentCard;
