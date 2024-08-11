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
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
type Props = {
  params: {
    id: string;
  };
};

const ServiceFormPage = ({ params }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageReloaded, setPageReloaded] = useState(false);
  const [currentTab, setCurrentTab] = useState("header");
  const [formData, setFormData] = useState({
    id: params.id,
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
      damage: "",
      engineOilCondition: "",
      engineOilColor: "",
      brakeFluidCondition: "",
      brakeFluidColor: "",
      oilLeak: "",
      summary: "",
    },
  });
  useEffect(() => {
    if (pageReloaded) {
      console.log("setting local storage");
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
      console.log(localFormData.id);
      console.log(params.id);
      if (localFormData && localFormData.id&& localFormData.id.toString() !== params.id.toString()) return;
      setFormData(localFormData);
      console.log("done setting form data");
    }
    setPageReloaded(true);
    localStorage.setItem("id", params.id);
    setCurrentTab(tab || "header");
  }, []);
  useEffect(() => {
    router.replace(`/technician/service/${params.id}?tab=${currentTab}`);
  }, [currentTab]);
  console.log("formData ---->", formData);
  const submitForm = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("sending data = ", formData);
      const res = await axios.post(`/api/form/${params.id}`, {
        sections: { ...formData },
      });
      if (res.status === 200) {
        setLoading(false);
        toast.success("Form submitted successfully");
      } else {
        toast.error("Failed to submit form");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <MaxWidthWrapper className="py-10">
        {currentTab === "header" && (
          <HeaderForm
            id={params.id}
            page={page}
            setPage={setPage}
            formData={formData}
            setFormData={setFormData}
            currentTab={currentTab}
            setCuurentTab={setCurrentTab}
          />
        )}
        {/* {page === 2 && (
          <Tabs defaultValue="tires" className="w-full">
            <TabsList>
              <TabsTrigger value="tires">Tires</TabsTrigger>
              <TabsTrigger value="battery">Battery</TabsTrigger>
              <TabsTrigger value="exterior">Exterior</TabsTrigger>
              <TabsTrigger value="brakes">Brake</TabsTrigger>
              <TabsTrigger value="engine">Engine</TabsTrigger>
            </TabsList>
            <TabsContent value="tires">
              <TireFcorm formData={formData} setFormData={setFormData} />
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
        )} */}
        {currentTab === "tires" && (
          <TireForm
            formData={formData}
            setFormData={setFormData}
            currentTab={currentTab}
            setCuurentTab={setCurrentTab}
          />
        )}
        {currentTab === "battery" && (
          <BatteryForm
            formData={formData}
            setFormData={setFormData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        )}
        {currentTab === "exterior" && (
          <ExteriorForm
            formData={formData}
            setFormData={setFormData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        )}
        {currentTab === "brakes" && (
          <BrakesForm
            formData={formData}
            setFormData={setFormData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        )}
        {currentTab === "engine" && (
          <EngineForm
            formData={formData}
            setFormData={setFormData}
            loading={loading}
            setLoading={setLoading}
            setCurrentTab={setCurrentTab}
            submitForm={submitForm}
          />
        )}
      </MaxWidthWrapper>
    </main>
  );
};

export default ServiceFormPage;
