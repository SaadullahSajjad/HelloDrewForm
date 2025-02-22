"use client";
import { useState } from "react";
import { Button, Switch, Card, Progress } from "antd";
import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const transactionTools = {
  Dotloop: false,
  docusign: false,
  SkySlope: false,
};

const featuresLeft = [
  {
    key: "DrewTalk",
    title: "DrewTalk™",
    description:
      "AI-powered human-like conversations that handle calls and convert leads.",
  },
  {
    key: "DrewIntel",
    title: "DrewIntel™",
    description: "Know which leads are hot before they even raise a hand.",
  },
  {
    key: "DrewPresence",
    title: "DrewPresence™",
    description:
      "AI joins your meetings, takes notes, and follows up automatically.",
  },
  {
    key: "DrewInsights",
    title: "DrewInsights™",
    description: "Market trends and home values, delivered in real-time.",
  },
  {
    key: "DrewMatch",
    title: "DrewMatch™",
    description: "Smarter home search that finds the perfect match instantly.",
  },
  {
    key: "DrewTask",
    title: "DrewTask™",
    description: "Never miss a follow-up, deadline, or to-do.",
  },
];

const featuresRight = [
  {
    key: "DrewDocs",
    title: "DrewDocs™",
    description: "Contracts, signatures, and compliance, handled by AI.",
  },
  {
    key: "DrewMobile",
    title: "DrewMobile™",
    description: "Your AI assistant, now in your pocket.",
  },
  {
    key: "DrewCRM",
    title: "DrewCRM™",
    description: "Organize, nurture, and close more deals effortlessly.",
  },
  {
    key: "DrewEnterprise",
    title: "DrewEnterprise™",
    description: "AI built for brokerages, fully branded to you.",
  },
  {
    key: "DrewScheduler",
    title: "DrewScheduler™",
    description: "Without lifting a finger, showings and meetings booked.",
  },
  {
    key: "DrewTeam",
    title: "DrewTeam™",
    description:
      "Smart lead distribution and collaboration for high-performing teams.",
  },
];

const newsecretpage = () => {
  const router = useRouter();
  const [selectedTools, setSelectedTools] = useState(transactionTools);
  const [selectedFeatures, setSelectedFeatures] = useState({});

  const toggleTool = (key, checked) =>
    setSelectedTools((prev) => ({ ...prev, [key]: checked }));

  const toggleFeature = (key, checked) =>
    setSelectedFeatures((prev) => ({ ...prev, [key]: checked }));

  const handlesubmit = () => {
    const storedData = sessionStorage.getItem("formData");
    const parsedData = storedData ? JSON.parse(storedData) : {};

    const updatedData = { ...parsedData, selectedTools, selectedFeatures };

    sessionStorage.setItem("formData", JSON.stringify(updatedData));

    console.log("Updated Session Data:", updatedData); // Debugging log
    console.log(selectedTools, selectedFeatures);
    router.push("/talkpage");
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-white text-black">
      {/* Left Section (Covers Half of Screen) */}
      <div className="w-full sm:w-1/2 p-6 sm:p-10">
        <div className="flex items-center space-x-2">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          />
          <h1 className="text-2xl font-bold">Your New Secret Weapons</h1>
        </div>
        <Progress percent={70} size="small" className="mb-4" showInfo={false} />
        <p className="text-gray-600 mt-2">
          Effortless Integration, Powerful Results.
        </p>

        {/* Transaction Tools Selection */}
        <Card className="mt-6">
          <p className="font-normal text-lg mb-2">
            What's your go-to transaction management tool?
          </p>
          {Object.keys(selectedTools).map((key) => (
            <div key={key} className="flex items-center justify-between py-2">
              {/* Transaction Tool Icon */}
              <div className="flex items-center">
                <img
                  src={`/images/page4/${key}.png`} // Assuming images are named as per keys (e.g., "Dotloop.png")
                  alt={key}
                  className="w-6 h-6 mr-2"
                />
                <span>{key}</span>
              </div>
              <div className="flex items-center space-x-2">
                {selectedTools[key] && (
                  <span className="text-green-700 font-semibold flex justify-end text-right text-sm items-center sm:text-sm">
                    Your Power Moves
                    <CheckCircleFilled className="text-green-500 ml-1" />
                  </span>
                )}
                <Switch
                  checked={selectedTools[key]}
                  onChange={(checked) => toggleTool(key, checked)}
                />
              </div>
            </div>
          ))}
        </Card>

        <Card className="mt-6">
          <p className="font-normal text-lg mb-2">
            What's your flavor? Tell me what you're into.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col h-[17%]">
              {featuresLeft.map(({ key, title, description }) => (
                <div
                  key={key}
                  className="py-4 border-b flex items-center justify-between min-h-[100%]"
                >
                  <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-gray-600 text-sm mb-2 pr-3">
                      {description}
                    </p>
                  </div>
                  <Switch
                    checked={selectedFeatures[key] || false}
                    onChange={(checked) => toggleFeature(key, checked)}
                    className="mr-4"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col h-[17%]">
              {featuresRight.map(({ key, title, description }) => (
                <div
                  key={key}
                  className="py-4 border-b flex items-center justify-between min-h-[100%]"
                >
                  <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-gray-600 text-sm mb-2 pr-3">
                      {description}
                    </p>
                  </div>
                  <Switch
                    checked={selectedFeatures[key] || false}
                    onChange={(checked) => toggleFeature(key, checked)}
                    className="mr-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

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
            src="/images/Picture4.jpg" // Replace with your image
            className="h-auto w-4/6 px-3 "
            style={{ color: "transparent" }}
          />
        </div>
      </div>
    </div>
  );
};

export default newsecretpage;
