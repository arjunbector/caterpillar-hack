import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};
const EngineForm = ({ formData, setFormData }: Props) => {
  const [damage, setDamage] = useState("no");
  const [engineOilCondition, setEngineOilCondition] = useState("Good");
  const [engineOilColor, setEngineOilColor] = useState("Clean");
  const [brakeFluidCondition, setBrakeFluidCondition] = useState("Good");
  const [brakeFluidColor, setBrakeFluidColor] = useState("Clean");
  const [oilLeak, setOilLeak] = useState("no");
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      engine: {
        ...prev.engine,
        damage,
        engineOilCondition,
        engineOilColor,
        brakeFluidCondition,
        brakeFluidColor,
        oilLeak,
      },
    }));
  }, [
    damage,
    engineOilCondition,
    engineOilColor,
    brakeFluidCondition,
    brakeFluidColor,
    oilLeak,
  ]);
  return (
    <div>
      <form className="flex flex-col gap-10">
        <div>
          <Label>Rust, Dents or Damage in Engine</Label>
          <RadioGroup
            defaultValue="no"
            onValueChange={(value) => {
              setDamage(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="1r1" />
              <Label htmlFor="1r1">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="1r2" />
              <Label htmlFor="1r2">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Engine Oil Condition</Label>
          <RadioGroup
            defaultValue="good"
            onValueChange={(value) => {
              setEngineOilCondition(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="good" id="2r1" />
              <Label htmlFor="2r1">Good</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bad" id="2r2" />
              <Label htmlFor="2r2">Bad</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Engine Oil Color</Label>
          <RadioGroup
            defaultValue="clean"
            onValueChange={(value) => {
              setEngineOilColor(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clean" id="3r1" />
              <Label htmlFor="3r1">Clean</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="brown" id="3r2" />
              <Label htmlFor="3r2">Brown</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="black" id="3r3" />
              <Label htmlFor="3r3">Black</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Brake Fluid Condition</Label>
          <RadioGroup
            defaultValue="good"
            onValueChange={(value) => {
              setBrakeFluidCondition(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="good" id="4r1" />
              <Label htmlFor="4r1">Good</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bad" id="4r2" />
              <Label htmlFor="4r2">Bad</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Brake Fluid Color</Label>
          <RadioGroup
            defaultValue="clean"
            onValueChange={(value) => {
              setBrakeFluidColor(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clean" id="5r1" />
              <Label htmlFor="5r1">Clean</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="brown" id="5r2" />
              <Label htmlFor="5r2">Brown</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="black" id="5r3" />
              <Label htmlFor="5r3">Black</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Any oil leak in Engine</Label>
          <RadioGroup
            defaultValue="no"
            onValueChange={(value) => {
              setOilLeak(value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="6r1" />
              <Label htmlFor="6r1">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="6r2" />
              <Label htmlFor="6r2">No</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="summary">Overall Summary</Label>
          <Textarea
            value={formData.engine?.summary}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                engine: { ...prev.engine, summary: e.target.value },
              }));
            }}
            id="summary"
            rows={10}
            placeholder="Max 1000 characters"
          />
        </div>
        <div className="flex justify-end">
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default EngineForm;
