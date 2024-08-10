"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeaderForm from "./HeaderForm";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TireForm from "./TireForm";
import BatteryForm from "./BatteryForm";
import ExteriorForm from "./ExteriorForm";
import BrakesForm from "./BrakesForm";
import EngineForm from "./EngineForm";
type Props = {
  params: {
    id: string;
  };
};

const ServiceFormPage = ({ params }: Props) => {
  const [page, setPage] = useState(1);
  return (
    <main>
      <MaxWidthWrapper className="py-10">
        {page === 1 && (
          <HeaderForm id={params.id} page={page} setPage={setPage} />
        )}
        <Tabs defaultValue="tires" className="w-full">
          <TabsList>
            <TabsTrigger value="tires">Tires</TabsTrigger>
            <TabsTrigger value="battery">Battery</TabsTrigger>
            <TabsTrigger value="exterior">Exterior</TabsTrigger>
            <TabsTrigger value="brakes">Brake</TabsTrigger>
            <TabsTrigger value="engine">Engine</TabsTrigger>
          </TabsList>
          <TabsContent value="tires">
            <TireForm />
          </TabsContent>
          <TabsContent value="battery">
            <BatteryForm />
          </TabsContent>
          <TabsContent value="exterior">
            <ExteriorForm />
          </TabsContent>
          <TabsContent value="brakes">
            <BrakesForm/>
          </TabsContent>
          <TabsContent value="engine">
            <EngineForm/>
          </TabsContent>
        </Tabs>
      </MaxWidthWrapper>
    </main>
  );
};

export default ServiceFormPage;
