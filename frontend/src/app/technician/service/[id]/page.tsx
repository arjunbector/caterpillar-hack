"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeaderForm from "./HeaderForm";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TireForm from "./TireForm";
type Props = {
  params: {
    id: string;
  };
};

const ServiceFormPage = ({ params }: Props) => {
  const [page, setPage] = useState(2);
  return (
    <main>
      <MaxWidthWrapper>
        {page === 1 && (
          <HeaderForm id={params.id} page={page} setPage={setPage} />
        )}
        <Tabs defaultValue="tires" className="w-full">
          <TabsList>
            <TabsTrigger value="tires">Tires</TabsTrigger>
            <TabsTrigger value="battery">Battery</TabsTrigger>
          </TabsList>
          <TabsContent value="tires">
            <TireForm />
          </TabsContent>
          <TabsContent value="battery">battery</TabsContent>
        </Tabs>
      </MaxWidthWrapper>
    </main>
  );
};

export default ServiceFormPage;
