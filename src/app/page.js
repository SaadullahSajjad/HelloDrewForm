"use client";
import { useForm, Controller } from "react-hook-form";
import styles from "./landingpage/LandingPage.module.css";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const storedData = sessionStorage.getItem("formData");
    const parsedData = storedData ? JSON.parse(storedData) : {};

    const updatedData = { ...parsedData, ...data };

    sessionStorage.setItem("formData", JSON.stringify(updatedData));
    router.push("/secretpage");
    console.log(data);
  };

  return (
    <div className={styles.formContainer}>
      <div className="flex flex-col sm:flex-row w-full max-w-7xl mx-auto">
        {/* Left Section (Form) */}
        <div className="flex flex-col sm:p-8 sm:w-1/2 w-full">
          <p className={styles.title}>
            Say Hello to <span className="font-bold">Drew 👋</span>
          </p>
          <h1
            className={`${styles.subtitle} font-bold`}
            style={{ fontFamily: "Harmonia Sans" }}
          >
            Your MVP is Here, Time to Dominate.
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className={styles.lableText}>
              Let’s make it official. What’s your name?
            </label>
            <input
              id="name"
              type="text"
              style={{ marginBottom: "0.5rem" }}
              className={styles.inputField}
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name.message}</p>
            )}

            {/* Email Field with Validation */}
            <label htmlFor="email" className={styles.lableText}>
              Where should I send your daily dose of real estate brilliance?
            </label>
            <input
              id="email"
              type="email"
              className={styles.inputField}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}

            {/* Phone Number Field with Formatting */}
            <label htmlFor="phone" className={styles.lableText}>
              Phone number, please. Drew’s calling magic is just one step away.
            </label>
            <div className={styles.inputContainer}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  validate: (value) =>
                    isValidPhoneNumber(value) || "Invalid phone number",
                }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    defaultCountry="US"
                    international
                    className={styles.phoneInput}
                  />
                )}
              />
            </div>
            {errors.phone && (
              <p
                className={styles.errorMessage}
                style={{ marginTop: "0.5rem" }}
              >
                {errors.phone.message}
              </p>
            )}

            <label htmlFor="brokerage" className={styles.lableText}>
              Who’s your crew? Brokerage name, please!
            </label>
            <input
              id="brokerage"
              type="text"
              className={styles.inputField}
              {...register("brokerage", {
                required: "Brokerage name is required",
              })}
              placeholder="Enter your current brokerage"
            />
            {errors.brokerage && (
              <p className={styles.errorMessage}>{errors.brokerage.message}</p>
            )}

            <label htmlFor="website" className={styles.lableText}>
              Any personal site I should bookmark for inspiration?
            </label>
            <input
              id="website"
              type="text"
              className={styles.inputField}
              placeholder="Enter Personal Website"
              {...register("website", {
                required: "Personal website is required",
              })}
            />
            {errors.website && (
              <p className={styles.errorMessage}>{errors.website.message}</p>
            )}

            <label htmlFor="teamWebsite">
              Your team’s website where should Drew look? (optional)
            </label>
            <input
              id="teamWebsite"
              type="text"
              className={styles.inputField}
              placeholder="Enter Team Name"
              {...register("teamWebsite")}
            />

            <label htmlFor="teamName" className={styles.lableText}>
              Every great team has a name, what's yours? (optional)
            </label>
            <input
              id="teamName"
              type="text"
              className={styles.inputField}
              placeholder="Enter Team Website"
              {...register("teamName")}
            />
            {errors.teamWebsite && (
              <p className={styles.errorMessage}>
                {errors.teamWebsite.message}
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
              {/* Submit Button */}
              <button
                type="submit"
                className={`${styles.button} w-full sm:w-auto`}
              >
                Let's Go →
              </button>

              {/* Terms & Conditions Section */}
              <div className="flex flex-col justify-center items-center sm:items-end w-full sm:w-auto">
                <Controller
                  name="terms"
                  control={control}
                  rules={{ required: "You must agree to the terms." }}
                  render={({ field }) => (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        {...field}
                        checked={field.value || false}
                        className={`h-5 w-5 border ${
                          errors.terms ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 text-sm sm:text-base"
                      >
                        I agree to the Terms & Conditions
                      </label>
                    </div>
                  )}
                />
                {errors.terms && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.terms.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Right Section (Image) */}
        <div className="sm:block hidden w-full sm:w-1/2  flex items-center justify-center mt-6 sm:mt-0">
          <div className="flex justify-center items-center h-[calc(100vh-2rem)] w-full sticky top-4">
            <img
              alt="HelloDrew Logo"
              loading="lazy"
              width="3" // Smaller width
              height="30" // Smaller height
              decoding="async"
              src="/images/Picture1.jpg" // Replace with your image
              className="h-auto w-4/5 px-3"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
