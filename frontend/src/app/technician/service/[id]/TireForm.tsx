import { Button } from "@/components/ui/button";
import CustomFormError from "@/components/ui/custom-form-error";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  currentTab: string;
  setCuurentTab: React.Dispatch<React.SetStateAction<string>>;
};
const TireForm = ({ formData, setFormData, currentTab, setCuurentTab }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });
  const [tireConditions, setTireConditions] = useState({
    leftFront: "OK",
    rightFront: "OK",
    leftRear: "OK",
    rightRear: "OK",
  });
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      tire: {
        ...prev.tire,
        leftFrontTireCondition: tireConditions.leftFront,
        rightFrontTireCondition: tireConditions.rightFront,
        leftRearTireCondition: tireConditions.leftRear,
        rightRearTireCondition: tireConditions.rightRear,
      },
    }));
  }, [tireConditions]);
  const handleFormSubmit = (e:any)=>{
    e.preventDefault();
    setCuurentTab("battery")
  }
  return (
    <div className="mx-auto">
      <h1 className="mt-10 text-3xl font-bold">Enter the tire details</h1>
      <form className="flex flex-col gap-10" onSubmit={handleFormSubmit}>
        <div>
          <h1 className="my-2 text-lg font-semibold">Tire Pressure</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="tirePressureLeftFront">Left Front</Label>
              <Input
                {...register("tirePressureLeftFront")}
                id="tirePressureLeftFront"
                type="text"
                value={formData.tire?.tirePressureLeftFront}
                onChange={(e) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    tire: {
                      ...prev.tire,
                      tirePressureLeftFront: e.target.value,
                    },
                  }));
                }}
              />
            </div>
            <div>
              <Label htmlFor="tirePressureRightFront">Right Front</Label>
              <Input
                {...register("tirePressureRightFront")}
                id="tirePressureRightFront"
                type="text"
                value={formData.tire?.tirePressureRightFront}
                onChange={(e) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    tire: {
                      ...prev.tire,
                      tirePressureRightFront: e.target.value,
                    },
                  }));
                }}
              />
            </div>
            <div>
              <Label htmlFor="tirePressureRightRear">Right Rear</Label>
              <Input
                {...register("tirePressureRightRear")}
                id="tirePressureRightRear"
                type="text"
                value={formData.tire?.tirePressureRightRear}
                onChange={(e) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    tire: {
                      ...prev.tire,
                      tirePressureRightRear: e.target.value,
                    },
                  }));
                }}
              />
            </div>
            <div>
              <Label htmlFor="tirePressureLeftRear">Right Rear</Label>
              <Input
                {...register("tirePressureLeftRear")}
                id="tirePressureRightRear"
                type="text"
                onChange={(e) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    tire: {
                      ...prev.tire,
                      tirePressureLeftRear: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="my-2 text-lg font-semibold">Tire Condition</h1>
          <div className="flex flex-wrap gap-5">
            <div>
              <Label className="mr-2">Left Front: </Label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    className="flex w-52 items-center justify-between"
                    variant="outline"
                  >
                    {tireConditions.leftFront}
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.leftFront === "Good"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        leftFront: "Good",
                      }));
                    }}
                  >
                    Good
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.leftFront === "OK"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        leftFront: "OK",
                      }));
                    }}
                  >
                    OK
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.leftFront === "Needs Replacement"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        leftFront: "Needs Replacement",
                      }));
                    }}
                  >
                    Needs Replacement
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Label className="mr-2">Right Front: </Label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    className="flex w-52 items-center justify-between"
                    variant="outline"
                  >
                    {tireConditions.rightFront}
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.rightFront === "Good"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        rightFront: "Good",
                      }));
                    }}
                  >
                    Good
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.rightFront === "OK"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        rightFront: "OK",
                      }));
                    }}
                  >
                    OK
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.rightFront === "Needs Replacement"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        rightFront: "Needs Replacement",
                      }));
                    }}
                  >
                    Needs Replacement
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Label className="mr-2">Left Rear: </Label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    className="flex w-52 items-center justify-between"
                    variant="outline"
                  >
                    {tireConditions.leftRear}
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.leftRear === "Good"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        leftRear: "Good",
                      }));
                    }}
                  >
                    Good
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.leftRear === "OK"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        leftRear: "OK",
                      }));
                    }}
                  >
                    OK
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.leftRear === "Needs Replacement"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        leftRear: "Needs Replacement",
                      }));
                    }}
                  >
                    Needs Replacement
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Label className="mr-2">Right Rear: </Label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    className="flex w-52 items-center justify-between"
                    variant="outline"
                  >
                    {tireConditions.rightRear}
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.rightRear === "Good"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        rightRear: "Good",
                      }));
                    }}
                  >
                    Good
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.rightRear === "OK"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        rightRear: "OK",
                      }));
                    }}
                  >
                    OK
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={tireConditions.rightRear === "Needs Replacement"}
                    onCheckedChange={() => {
                      setTireConditions((prev) => ({
                        ...prev,
                        rightRear: "Needs Replacement",
                      }));
                    }}
                  >
                    Needs Replacement
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-5 w-full">
              <Label className="my-2 font-semibold">Overall Tire Summary</Label>
              <Textarea
                rows={10}
                placeholder="Max 1000 characters"
                {...register("summary", {
                  maxLength: {
                    value: 1000,
                    message: "Summary cannot exceed 1000 characters",
                  },
                })}
                value={formData.tire?.summary}
                onChange={(e) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    tire: {
                      ...prev.tire,
                      summary: e.target.value,
                    },
                  }));
                }}
              />
              {errors.summary && (
                <CustomFormError>{errors.summary.message}</CustomFormError>
              )}
            </div>
            <div>
              {/* TODO: add images input */}
              <Label>Add Images</Label>
            </div>
          </div>
        </div>
        <div className="flex justify-end"><Button>Next</Button></div>
      </form>
    </div>
  );
};

export default TireForm;
