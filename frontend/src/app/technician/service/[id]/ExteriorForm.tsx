import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};
const ExteriorForm = ({ formData, setFormData }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });
  const [damage, setDamage] = useState("no");
  const [oilLeak, setOilLeak] = useState("no");
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      exterior: {
        ...prev.exterior,
        damage,
        oilLeak,
      },
    }));
  }, [damage, oilLeak]);
  return (
    <div>
      <form className="my-10 flex flex-col gap-10">
        <div>
          <Label>
            Rust, Dent or Damage to Exterior:{" "}
            <span className="text-zinc-500">
              If yes explain in notes and attach images
            </span>
          </Label>
          <RadioGroup
            defaultValue="no"
            onValueChange={(value) => {
              setDamage(value);
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
          <Label>Oil leak in Suspension </Label>
          <RadioGroup
            defaultValue="no"
            onValueChange={(value) => {
              setOilLeak(value);
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
            value={formData.exterior?.summary}
            onChange={(e) => {
              setFormData((prev: any) => ({
                ...prev,
                exterior: { ...prev.exterior, summary: e.target.value },
              }));
            }}
            id="summary"
            rows={10}
            placeholder="Max 1000 characters"
          />
        </div>
      </form>
    </div>
  );
};

export default ExteriorForm;
