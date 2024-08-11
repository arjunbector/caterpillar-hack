import { Button } from "@/components/ui/button";
import CustomFormError from "@/components/ui/custom-form-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import VoiceActivation from "../../../voicereco";

type Props = {
  id: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
  currentTab: string;
  setCuurentTab: Dispatch<SetStateAction<string>>;
};

const HeaderForm = ({
  id,
  page,
  setPage,
  formData,
  setFormData,
  currentTab,
  setCuurentTab,
}: Props) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [isVoiceActivated, setIsVoiceActivated] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data: any) => {
    //TODO: send data to the server
    // setPage((prev) => prev + 1);
    setCuurentTab("tires");
    console.log(data);
  };

  const handleVoiceCommand = (command: string) => {
    // Handle voice commands if needed
    console.log("Voice command received:", command);
    if (command.toLowerCase() === "submit") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="mx-auto">
      <h1 className="mt-10 text-3xl font-bold">Enter the basic details</h1>
      <VoiceActivation onCommand={handleVoiceCommand} />

      <form
        onSubmit={onSubmit}
        className="my-10 space-y-5 md:grid md:grid-cols-2 md:gap-10 md:space-y-0"
      >
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            {...register("model", { required: "Model is required" })}
            type="text"
            id="model"
            value={formData.header?.model}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: { ...prev.header, model: e.target.value },
              }));
            }}
          />
          {errors.model && (
            <CustomFormError>{errors.model.message}</CustomFormError>
          )}
        </div>
        <div>
          <Label htmlFor="inspectionId">Inspection ID</Label>
          <Input
            {...register("inspectionId")}
            type="text"
            id="inspectionId"
            value={id}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="inspectorName">Inspector Name</Label>
          <Input
            {...register("inspectorName", {
              required: "Inspector Name is required",
            })}
            type="text"
            id="inspectorName"
            value={formData.header?.inspectorName}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: { ...prev.header, inspectorName: e.target.value },
              }));
            }}
          />
          {errors.inspectorName && (
            <CustomFormError>{errors.inspectorName.message}</CustomFormError>
          )}
        </div>
        <div>
          <Label htmlFor="inspectionEmployeeId">Inspection Employee ID</Label>
          <Input
            {...register("inspectionEmployeeId", {
              required: "Inspection Employee ID is required",
            })}
            type="text"
            id="inspectionEmployeeId"
            value={formData.header?.inspectionEmployeeId}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: {
                  ...prev.header,
                  inspectionEmployeeId: e.target.value,
                },
              }));
            }}
          />
          {errors.inspectionEmployeeId && (
            <CustomFormError>
              {errors.inspectionEmployeeId.message}
            </CustomFormError>
          )}
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            {...register("date", { required: "Date is required" })}
            type="date"
            id="date"
            value={formData.header?.date}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: { ...prev.header, date: e.target.value },
              }));
            }}
          />
          {errors.date && (
            <CustomFormError>{errors.date.message}</CustomFormError>
          )}
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            {...register("time", { required: "Time is required" })}
            type="time"
            id="time"
            value={formData.header?.time}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: { ...prev.header, time: e.target.value },
              }));
            }}
          />
          {errors.time && (
            <CustomFormError>{errors.time.message}</CustomFormError>
          )}
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            {...register("location", { required: "Location is required" })}
            type="text"
            id="location"
            value={formData.header?.location}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: { ...prev.header, location: e.target.value },
              }));
            }}
          />
          {errors.location && (
            <CustomFormError>{errors.location.message}</CustomFormError>
          )}
        </div>
        <div className="col-span-2">
          <h1 className="my-4 text-lg font-semibold">
            Coordinates of Inspection
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                {...register("latitude", { required: "Latitude is required" })}
                type="text"
                id="latitude"
                value={position.latitude.toString()}
                onChange={(e) => {
                  setPosition((prev) => ({
                    ...prev,
                    latitude: parseFloat(e.target.value),
                  }));
                }}
              />
              {errors.latitude && (
                <CustomFormError>{errors.latitude.message}</CustomFormError>
              )}
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                {...register("longitude", {
                  required: "Longitude is required",
                })}
                type="text"
                id="longitude"
                value={position.longitude.toString()}
                onChange={(e) => {
                  setPosition((prev) => ({
                    ...prev,
                    longitude: parseFloat(e.target.value),
                  }));
                }}
              />
              {errors.longitude && (
                <CustomFormError>{errors.longitude.message}</CustomFormError>
              )}
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="meterHours">
            Service meter hours (Odometer Reading)
          </Label>
          <Input
            {...register("meterHours", {
              required: "Service meter hours are required",
            })}
            type="text"
            id="meterHours"
            value={formData.header?.meterHours}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: { ...prev.header, meterHours: e.target.value },
              }));
            }}
          />
          {errors.meterHours && (
            <CustomFormError>{errors.meterHours.message}</CustomFormError>
          )}
        </div>
        <div>
          <Label htmlFor="customerName">Customer Name / Company Name</Label>
          <Input
            {...register("customerName", {
              required: "Customer Name is required",
            })}
            type="text"
            id="customerName"
            value={formData.header?.customerName}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: { ...prev.header, customerName: e.target.value },
              }));
            }}
          />
          {errors.customerName && (
            <CustomFormError>{errors.customerName.message}</CustomFormError>
          )}
        </div>
        <div>
          <Label htmlFor="catCustomerId">CAT Customer ID</Label>
          <Input
            {...register("catCustomerId", {
              required: "CAT Customer ID is required",
            })}
            type="text"
            id="catCustomerId"
            value={formData.header?.catCustomerId}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                header: { ...prev.header, catCustomerId: e.target.value },
              }));
            }}
          />
          {errors.catCustomerId && (
            <CustomFormError>{errors.catCustomerId.message}</CustomFormError>
          )}
        </div>
        <div />
        <div className="col-span-2 flex justify-end">
          //@ts-ignore
          <Button type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeaderForm;
