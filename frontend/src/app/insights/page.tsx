import graph1 from "@/../public/graphs/Air_Filter_Pressure_value_distribution.png";
import graph2 from "@/../public/graphs/correlation_heatmap.png";
import graph3 from "@/../public/graphs/Hydraulic_Pump_Rate_value_distribution.png";
import graph4 from "@/../public/graphs/image.png";
import graph5 from "@/../public/graphs/parameter_value_distribution.png";
import graph6 from "@/../public/graphs/Hydraulic_Pump_Rate_swarmplot_risk.png";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
const Page = () => {
  return (
    <MaxWidthWrapper className="my-10">
      <h1 className="mb-5 text-center text-3xl font-bold">Report Analysis</h1>
      <p className="mt-5">
        The provided box plot visualizes the distribution of air filter pressure
        values across three different risk statuses: High Risk, Medium Risk, and
        Low Risk. The plot is used to identify how air filter pressure varies
        with different levels of risk.
      </p>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-4 text-sm">
          <Image src={graph1} alt="graph1" />
          <p>
            <strong>High Risk:</strong> Median Value: Approximately 34.
            Interquartile Range (IQR): The IQR is relatively narrow, indicating
            that the values are closely packed around the median. Range: The
            overall range (from minimum to maximum) is between approximately 33
            to 36, showing low variability within this category.
          </p>
          <p>
            <strong>Medium Risk:</strong> Median Value: Approximately 30.
            Interquartile Range (IQR): The IQR is wider compared to the High
            Risk category, indicating more variability in the air filter
            pressure values. Range: The values range between 26 and 32. This
            category shows more spread in values than High Risk.
          </p>
          <p>
            <strong>Low Risk:</strong> Median Value: Approximately 28.
            Interquartile Range (IQR): The IQR is the widest among the three
            categories, indicating the highest variability in the values.
          </p>
          <p>
            <strong>Range:</strong> The values range between 22 and 30. The
            broader range suggests that in the Low Risk category, air filter
            pressure values can vary significantly.
          </p>
        </div>
        <Image src={graph2} alt="graph1" />
        <Image src={graph3} alt="graph1" />
        <Image src={graph4} alt="graph1" />
        <Image src={graph5} alt="graph1" />
        <Image src={graph6} alt="graph1" />
      </div>
      <p>
        <strong>Conclusion:</strong>The box plot effectively illustrates how air
        filter pressure values vary by risk status. The data suggests a clear
        correlation between higher air filter pressure and increased risk. The
        low variability in the High Risk category implies a strong and
        consistent relationship, whereas the Low Risk category shows greater
        variability, indicating that other factors might be influencing the air
        filter pressure in these conditions.
      </p>
    </MaxWidthWrapper>
  );
};

export default Page;
