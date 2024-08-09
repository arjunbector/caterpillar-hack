"use client";
import { dummyServices } from "@/app/placeholders/services";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { serviceType } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const TechnicianDashboardPage = () => {
  const [services, setServices] = useState<serviceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const getData = async () => {
    setError(null);
    setLoading(true);
    try {
      //TODO: make api call
      setServices(dummyServices);
    } catch (err: any) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = (id: string) => {};
  useEffect(() => {
    getData();
  }, []);
  return (
    <main>
      <MaxWidthWrapper className="">
        <div>
          <Card className="my-10 overflow-hidden">
            <CardContent className="px-0">
              <Table>
                {/* <TableCaption>this is a table caption</TableCaption> */}
                <TableHeader className="bg-primary">
                  <TableRow>
                    <TableHead className="px-10">Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Machine</TableHead>
                    <TableHead>Date Requested</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service, idx) => (
                    <TableRow
                      key={service.id}
                      className="cursor-pointer"
                      onClick={() => {
                        handleClick(service.id);
                      }}
                    >
                      <TableCell className="px-10">{service.name}</TableCell>
                      <TableCell>{service.location}</TableCell>
                      <TableCell>{service.contact}</TableCell>
                      <TableCell>{service.machineType}</TableCell>
                      <TableCell>{formatDate(service.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default TechnicianDashboardPage;
