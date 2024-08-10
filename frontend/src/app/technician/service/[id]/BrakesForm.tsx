import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const BrakesForm = () => {
  const [brakeFluidLevel, setBrakeFluidLevel] = useState("Good");
  const [brakeConditionFront, setBrakeConditionFront] = useState("Good");
  const [brakeConditionRear, setBrakeConditionRear] = useState("Good");
  const [emergencyBrake, setEmergencyBrake] = useState("Good");

  return (
    <div>
      <form className="my-10 flex flex-col gap-10">
        <div>
          <Label className="mr-2">Brake Fluid Level: </Label>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="w-52" variant="outline">
                {brakeFluidLevel}
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
              <Button className="w-52" variant="outline">
                {brakeConditionFront}
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
              <Button className="w-52" variant="outline">
                {brakeConditionRear}
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
              <Button className="w-52" variant="outline">
                {emergencyBrake}
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
          <Textarea id="summary" rows={10} placeholder="Max 1000 characters" />
        </div>
      </form>
    </div>
  );
};

export default BrakesForm;
