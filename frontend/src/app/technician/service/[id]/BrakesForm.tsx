import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};
const BrakesForm = ({
  formData,
  setFormData,
  currentTab,
  setCurrentTab,
}: Props) => {
  const [brakeFluidLevel, setBrakeFluidLevel] = useState("Good");
  const [brakeConditionFront, setBrakeConditionFront] = useState("Good");
  const [brakeConditionRear, setBrakeConditionRear] = useState("Good");
  const [emergencyBrake, setEmergencyBrake] = useState("Good");
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      brakes: {
        ...prev.brakes,
        brakeFluidLevel,
        brakeConditionFront,
        brakeConditionRear,
        emergencyBrake,
      },
    }));
  }, [
    brakeFluidLevel,
    brakeConditionFront,
    brakeConditionRear,
    emergencyBrake,
  ]);
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setCurrentTab("engine");
  };
  return (
    <div>
      <h1 className="mt-10 text-3xl font-bold">Enter the brakes details</h1>
      <form className="my-10 flex flex-col gap-10" onSubmit={handleFormSubmit}>
        <div>
          <Label className="mr-2">Brake Fluid Level: </Label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="flex w-52 items-center justify-between"
                variant="outline"
              >
                {brakeFluidLevel}
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuCheckboxItem
                checked={brakeFluidLevel === "Good"}
                onCheckedChange={() => {
                  setBrakeFluidLevel("Good");
                }}
              >
                Good
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={brakeFluidLevel === "OK"}
                onCheckedChange={() => {
                  setBrakeFluidLevel("OK");
                }}
              >
                OK
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={brakeFluidLevel === "Low"}
                onCheckedChange={() => {
                  setBrakeFluidLevel("Low");
                }}
              >
                Needs Replacement
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Label className="mr-2">Brake Condition for front: </Label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="flex w-52 items-center justify-between"
                variant="outline"
              >
                {brakeConditionFront}
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuCheckboxItem
                checked={brakeConditionFront === "Good"}
                onCheckedChange={() => {
                  setBrakeConditionFront("Good");
                }}
              >
                Good
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={brakeConditionFront === "OK"}
                onCheckedChange={() => {
                  setBrakeConditionFront("OK");
                }}
              >
                OK
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={brakeConditionFront === "Needs Relacement"}
                onCheckedChange={() => {
                  setBrakeConditionFront("Needs Relacement");
                }}
              >
                Needs Replacement
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Label className="mr-2">Brake Condition for rear: </Label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="flex w-52 items-start justify-between"
                variant="outline"
              >
                {brakeConditionRear}
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuCheckboxItem
                checked={brakeConditionRear === "Good"}
                onCheckedChange={() => {
                  setBrakeConditionRear("Good");
                }}
              >
                Good
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={brakeConditionRear === "OK"}
                onCheckedChange={() => {
                  setBrakeConditionRear("OK");
                }}
              >
                OK
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={brakeConditionRear === "Needs Relacement"}
                onCheckedChange={() => {
                  setBrakeConditionRear("Needs Relacement");
                }}
              >
                Needs Replacement
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Label className="mr-2">Emergency Brake: </Label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="flex w-52 items-center justify-between"
                variant="outline"
              >
                {emergencyBrake}
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuCheckboxItem
                checked={emergencyBrake === "Good"}
                onCheckedChange={() => {
                  setEmergencyBrake("Good");
                }}
              >
                Good
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={emergencyBrake === "OK"}
                onCheckedChange={() => {
                  setEmergencyBrake("OK");
                }}
              >
                OK
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={emergencyBrake === "Low"}
                onCheckedChange={() => {
                  setEmergencyBrake("Low");
                }}
              >
                Needs Replacement
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Label htmlFor="summary">Overall Summary</Label>
          <Textarea
            value={formData.brakes?.summary}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                brakes: { ...prev.brakes, summary: e.target.value },
              }));
            }}
            id="summary"
            rows={10}
            placeholder="Max 1000 characters"
          />
        </div>
        <div className="flex justify-end gap-5">
          <Button
            variant="secondary"
            onClick={() => {
              setCurrentTab("exterior");
            }}
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default BrakesForm;
