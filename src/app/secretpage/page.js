"use client";
import { useState } from "react";
import { Button, Switch, Card, Progress } from "antd";
import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const SecretPage = () => {
  const router = useRouter();

  const [crmTools, setCrmTools] = useState({
    followUpBoss: false,
    kvcore: false,
    boomtown: false,
    liondesk: false,
    realGeeks: false,
    lofty: false,
  });

  const [calendarTools, setCalendarTools] = useState({
    googleCalendar: false,
    outlook: false,
    opentable: false,
  });

  const handlesubmit = () => {
    console.log(crmTools, calendarTools);
    const storedData = sessionStorage.getItem("formData");
    const parsedData = storedData ? JSON.parse(storedData) : {};

    const updatedData = { ...parsedData, crmTools, calendarTools };

    sessionStorage.setItem("formData", JSON.stringify(updatedData));

    console.log("Updated Session Data:", updatedData); // Debugging log
    router.push("/getyoupage");
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Left Section (Covers Half of Screen) */}
      <div className="w-full sm:w-1/2 bg-white rounded-2xl p-6 sm:p-12">
        {/* Back Button + Heading */}
        <div className="flex items-center space-x-2">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          />
          <h1 className="text-2xl font-bold">Your New Secret Weapons</h1>
        </div>
        {/* Progress Bar (30% Completion) */}
        <Progress percent={30} size="small" className="mb-4" showInfo={false} />
        <p className="text-gray-600 mt-2">Power Up Your Workflow.</p>

        {/* CRM Selection */}
        <Card className="mt-4">
          <h2 className="text-lg font-semibold text-center">
            Which CRM(s) are you currently using?
          </h2>
          {Object.keys(crmTools).map((key) => (
            <div key={key} className="flex justify-between items-center py-2">
              {/* CRM Icon */}
              <div className="flex items-center">
                <img
                  src={`/images/page2/${key}.png`} // Assumes your images are named the same as the CRM keys (e.g., "followUpBoss.png")
                  alt={key}
                  className="w-6 h-6 mr-2"
                />
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {crmTools[key] && (
                  <span className="text-green-700 font-semibold flex justify-end text-right text-sm items-center sm:text-sm">
                    Your Power Moves
                    <CheckCircleFilled className="text-green-500 ml-1" />
                  </span>
                )}
                <Switch
                  checked={crmTools[key]}
                  onChange={(checked) =>
                    setCrmTools({ ...crmTools, [key]: checked })
                  }
                />
              </div>
            </div>
          ))}
        </Card>

        {/* Calendar Selection */}
        <Card className="mt-4">
          <h2 className="text-lg font-semibold">
            Which calendar & scheduling tools do you use?
          </h2>
          {Object.keys(calendarTools).map((key) => (
            <div key={key} className="flex justify-between items-center py-2">
              {/* Calendar Icon */}
              <div className="flex items-end justify-end">
                <img
                  src={`/images/page2/${key}.png`} // Assumes your images are named the same as the calendar tool keys (e.g., "googleCalendar.png")
                  alt={key}
                  className="w-6 h-6 mr-2"
                />
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {calendarTools[key] && (
                  <span className="text-green-700 font-semibold flex justify-end text-right text-sm items-center sm:text-sm">
                    Your Power Moves
                    <CheckCircleFilled className="text-green-500 ml-1" />
                  </span>
                )}
                <Switch
                  checked={calendarTools[key]}
                  onChange={(checked) =>
                    setCalendarTools({ ...calendarTools, [key]: checked })
                  }
                />
              </div>
            </div>
          ))}
        </Card>

        {/* Next Button */}
        <div className="flex justify-end mt-6">
          <Button
            type="primary"
            className="w-48 h-10 mt-6 py-2 text-lg rounded-2xl"
            onClick={handlesubmit}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Right Section (Covers Other Half of Screen) */}
      <div className="sm:block hidden w-full sm:w-1/2  flex items-center justify-center mt-6 sm:mt-0">
        <div className="flex justify-center items-center h-[calc(100vh-2rem)] w-full sticky top-4">
          <img
            alt="Dashboard Preview"
            loading="lazy"
            decoding="async"
            src="/images/Picture2.jpg" // Replace with your image
            className="h-auto w-4/6 px-3 "
            style={{ color: "transparent" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SecretPage;
