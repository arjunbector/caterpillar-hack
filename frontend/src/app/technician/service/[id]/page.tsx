"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeaderForm from "./HeaderForm";
import { useEffect, useState } from "react";
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
  const [pageReloaded, setPageReloaded] = useState(false);
  const [formData, setFormData] = useState({
    header: {
      model: "",
      inspectionId: "",
      inspectorName: "",
      inspectionEmployeeId: "",
      date: "",
      time: "",
      location: "",
      latitude: "",
      longitude: "",
      meterHours: "",
      customerName: "",
      catCustomerId: "",
    },
    tire: {
      tirePressureLeftFront: "",
      tirePressureRightFront: "",
      tirePressureLeftRear: "",
      tirePressureRightRear: "",
      summary: "",
      leftFrontTireCondition: "",
      rightFrontTireCondition: "",
      leftRearTireCondition: "",
      rightRearTireCondition: "",
    },
    battery: {
      batteryMake: "",
      batteryReplacementDate: "",
      batteryVoltage: "",
      waterLevel: "",
      batteryDamage: "",
      batteryLeak: "",
      summary: "",
    },
    exterior: {
      damage: "",
      oilLeak: "",
      summary: "",
    },
    brakes: {
      brakeFluidLevel: "",
      brakeConditionFront: "",
      brakeConditionRear: "",
      emergencyBrake: "",
      summary: "",
    },
    engine: {
      engineOilLevel: "",
      engineOilLeak: "",
      coolantLevel: "",
      coolantLeak: "",
      summary: "",
    },
  });
  useEffect(() => {
    if (pageReloaded) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData, pageReloaded]);

  useEffect(() => {
    if (localStorage.getItem("formData")) {
      const localFormData = JSON.parse(
        localStorage.getItem("formData") || "{}",
      );
      console.log("setting form data");
      console.log("local", localFormData);
      setFormData(localFormData);
    }
    setPageReloaded(true);
  }, []);

  return (
    <main>
      <MaxWidthWrapper className="py-10">
        {page === 1 && (
          <HeaderForm
            id={params.id}
            page={page}
            setPage={setPage}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {page === 2 && (
          <Tabs defaultValue="tires" className="w-full">
            <TabsList>
              <TabsTrigger value="tires">Tires</TabsTrigger>
              <TabsTrigger value="battery">Battery</TabsTrigger>
              <TabsTrigger value="exterior">Exterior</TabsTrigger>
              <TabsTrigger value="brakes">Brake</TabsTrigger>
              <TabsTrigger value="engine">Engine</TabsTrigger>
            </TabsList>
            <TabsContent value="tires">
              <TireForm formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="battery">
              <BatteryForm formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="exterior">
              <ExteriorForm formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="brakes">
              <BrakesForm formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="engine">
              <EngineForm formData={formData} setFormData={setFormData} />
            </TabsContent>
          </Tabs>
        )}
      </MaxWidthWrapper>
    </main>
  );
};

export default ServiceFormPage;
