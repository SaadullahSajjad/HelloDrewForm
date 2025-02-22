"use client";
import { Switch, Button, Progress } from "antd";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function TalkPage() {
  const router = useRouter();

  // Define state for form fields
  const [talkFormData, setFormData] = useState({
    budget: "",
    teamSize: "",
    leads: "",
    leadDistribution: "",
    challenge: "",
    additionalInfo: "",
  });

  const handleSwitchChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTextareaChange = (e) => {
    setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }));
  };

  const handleSubmit = async () => {
    const storedData = sessionStorage.getItem("formData");
    const parsedData = storedData ? JSON.parse(storedData) : {};

    const updatedData = { ...parsedData, talkFormData };

    sessionStorage.setItem("formData", JSON.stringify(updatedData));

    console.log("END:::::", updatedData);

    // Extracting only keys with `true` values for CRM and Features
    const formatTrueKeys = (obj) =>
      Object.keys(obj)
        .filter((key) => obj[key] === true)
        .join(", "); // Convert to a structured string

    const crmTools = formatTrueKeys(updatedData.crmTools || {}); // Handling null/undefined cases
    const selectedFeatures = formatTrueKeys(updatedData.selectedFeatures || {});

    // Prepare data for email
    const userData = {
      firstName: updatedData.name, // Assuming you have this in your form data
      email: updatedData.email, // Assuming you have this in your form data
      company: updatedData.brokerage, // Assuming you have this in your form data
      phone: updatedData.phone, // Assuming you have this in your form data
    };

    const internalData = {
      teamSize:
        updatedData.talkFormData.teamSize.length > 0
          ? updatedData.talkFormData.teamSize
          : "None",
      crm: crmTools.length > 0 ? crmTools : "None",
      features: selectedFeatures.length > 0 ? selectedFeatures : "None",
      budget:
        updatedData.talkFormData.budget.length > 0
          ? updatedData.talkFormData.budget
          : "None",
      additionalInfo:
        updatedData.talkFormData.additionalInfo.length > 0
          ? updatedData.talkFormData.additionalInfo
          : "None",
    };

    console.log(userData, internalData);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData, internalData }),
      });

      if (response.ok) {
        router.push("/finalpage");
      } else {
        console.error("Failed to send emails");
      }
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-white sm:p-4 sm:m-4">
      {/* Left Section */}
      <div className="w-full sm:w-1/2 p-6">
        {/* Back Button + Heading */}
        <div className="flex items-center space-x-2">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          />
          <h1 className="text-2xl font-bold">
            Final Touch: Let’s Talk Numbers
          </h1>
        </div>
        <Progress
          percent={100}
          size="small"
          className="mb-4"
          showInfo={false}
        />
        <p className="text-gray-600 mt-2">
          Let’s get real, AI this powerful does not price itself.
        </p>
        <div className="mt-6 space-y-6">
          {/* Budget Section */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
              What is your budget for AI automation?
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-between justify-between items-center mt-4 space-y-4 sm:space-y-0">
              {["< $500/month", "$500-$1K/month", "$1K-$2.5K/month"].map(
                (option) => (
                  <div className="w-full sm:w-1/3">
                    <div
                      key={option}
                      className="flex items-center space-x-2 sm:space-x-2 sm:mb-0"
                    >
                      <Switch
                        checked={talkFormData.budget === option}
                        onChange={() => handleSwitchChange("budget", option)}
                      />
                      <span className="text-sm sm:text-sm">{option}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Team Size Section */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold">How many people are on your team?</h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
              {["1-5", "6-10", "11-50"].map((option) => (
                <div className="w-full sm:w-1/3">
                  <div key={option} className="flex items-center space-x-2">
                    <Switch
                      checked={talkFormData.teamSize === option}
                      onChange={() => handleSwitchChange("teamSize", option)}
                    />
                    <span className="text-sm">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leads Managed Daily Section */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold">
              How many leads are you managing daily?
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
              {["< 15/day", "15-50/day", "50-100/day"].map((option) => (
                <div className="w-full sm:w-1/3">
                  <div key={option} className="flex items-center space-x-2">
                    <Switch
                      checked={talkFormData.leads === option}
                      onChange={() => handleSwitchChange("leads", option)}
                    />
                    <span className="text-sm">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Distribution Section */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold">
              How would you like leads to be divided?
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
              {["Evenly", "Expertise or Region", "Manual"].map((option) => (
                <div className="w-full sm:w-1/3">
                  <div key={option} className="flex items-center space-x-2">
                    <Switch
                      checked={talkFormData.leadDistribution === option}
                      onChange={() =>
                        handleSwitchChange("leadDistribution", option)
                      }
                    />
                    <span className="text-sm">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biggest Challenge Section */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold">
              What is your team’s biggest challenge right now?
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
              {["No automation", "Slow follow ups", "Too many leads"].map(
                (option) => (
                  <div className="w-full sm:w-1/3">
                    <div key={option} className="flex items-center space-x-2">
                      <Switch
                        checked={talkFormData.challenge === option}
                        onChange={() => handleSwitchChange("challenge", option)}
                      />
                      <span className="text-sm">{option}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Additional Input */}
          <textarea
            placeholder="Make it perfect, what else should we know?"
            className="w-full mt-4 p-3 border rounded-lg"
            value={talkFormData.additionalInfo}
            onChange={handleTextareaChange}
          ></textarea>

          <div className="flex justify-end mt-6">
            <Button
              type="primary"
              className="w-48 h-10 mt-6 py-2 text-lg rounded-2xl"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="sm:block hidden w-full sm:w-1/2 flex items-center justify-center mt-6 sm:mt-0">
        <div className="flex justify-center items-center h-[calc(100vh-2rem)] w-full sticky top-4">
          <img
            alt="Dashboard Preview"
            loading="lazy"
            decoding="async"
            src="/images/Picture5.jpg" // Replace with your image
            className="h-auto w-4/6 px-3"
            style={{ color: "transparent" }}
          />
        </div>
      </div>
    </div>
  );
}
