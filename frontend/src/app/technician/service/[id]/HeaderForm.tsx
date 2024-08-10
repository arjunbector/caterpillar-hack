import { Button } from "@/components/ui/button";
import CustomFormError from "@/components/ui/custom-form-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  id: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const HeaderForm = ({ id, page, setPage }: Props) => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

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
    setPage((prev) => prev + 1);
    console.log(data);
  };

  return (
    <div className="mx-auto">
      <h1 className="mt-10 text-3xl font-bold">Enter the basic details</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-10 space-y-5 md:grid md:grid-cols-2 md:gap-10 md:space-y-0"
      >
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            {...register("model", { required: "Model is required" })}
            type="text"
            id="model"
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
          />
          {errors.catCustomerId && (
            <CustomFormError>{errors.catCustomerId.message}</CustomFormError>
          )}
        </div>
        <div />
        <div className="col-span-2 flex justify-end">
          <Button type="submit" size="lg">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeaderForm;
