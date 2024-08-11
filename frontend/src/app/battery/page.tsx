"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};
const BatteryForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });
  const [waterLevel, setWaterLevel] = useState("Good");
  const [batteryDamage, setBatteryDamage] = useState("no");
  const [batteryLeak, setBatteryLeak] = useState("no");
  useEffect(() => {
   
  }, [waterLevel, batteryDamage, batteryLeak]);
  const handleFormSubmit = (e:any) => {
    e.preventDefault();
   
  };
  return (
    <MaxWidthWrapper>
      <h1 className="mt-10 text-3xl font-bold">Enter the battery details</h1>

      <form className="my-10 flex flex-col gap-5" onSubmit={handleFormSubmit}>
        <div>
          <Label htmlFor="batteryMake">Battery Make</Label>
          <Input
            {...register("batteryMake")}
            id="batteryMake"
            placeholder="Ex: CAT"
            type="text"
           
          />
        </div>
        <div>
          <Label htmlFor="batteryReplacementDate">
            Battery Replacement Date
          </Label>
          <Input
            {...register("batteryReplacementDate")}
            id="batteryReplacementDate"
            type="date"
           
           
          />
        </div>
        <div>
          <Label htmlFor="batteryVoltage">Battery Voltage</Label>
          <Input
            {...register("batteryVoltage")}
            id="batteryVoltage"
            type="text"
          
           
            
          />
        </div>
        <div>
          <Label className="mr-2">Battery Water Level: </Label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="flex w-52 items-center justify-between"
                variant="outline"
              >
                {waterLevel}
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuCheckboxItem
                checked={waterLevel === "Good"}
                onCheckedChange={() => {
                  setWaterLevel("Good");
                }}
              >
                Good
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={waterLevel === "OK"}
                onCheckedChange={() => {
                  setWaterLevel("OK");
                }}
              >
                OK
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={waterLevel === "Low"}
                onCheckedChange={() => {
                  setWaterLevel("Low");
                }}
              >
                Needs Replacement
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          {/* TODO: ADD images */}
          <Label>Condition of Battery ( Any damage)</Label>
          <RadioGroup
            defaultValue="no"
            onValueChange={(value) => {
              setBatteryDamage(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="r2" />
              <Label htmlFor="r2">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r3" />
              <Label htmlFor="r3">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Battery Leaks / Rust</Label>
          <RadioGroup
            defaultValue="no"
            onValueChange={(value) => {
              setBatteryLeak(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="r21" />
              <Label htmlFor="r21">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r31" />
              <Label htmlFor="r31">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="summary">Overall Summary</Label>
          <Textarea
            id="summary"
            {...register("summary")}
            rows={10}
            placeholder="Max 1000 characters"
          
          />
        </div>
        <div className="flex justify-end gap-5">
          <Button variant="secondary">Back</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </MaxWidthWrapper>
  );
};

export default BatteryForm;
