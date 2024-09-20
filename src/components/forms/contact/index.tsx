"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  console.log(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);

  const { submit: onSubmit } = useWeb3Forms({
    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY as string,
    settings: {
      from_name: "Mission Control",
      subject: "New Contact Message from Website",
    },
    onSuccess: (msg) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="checkbox"
        id=""
        className="hidden"
        style={{ display: "none" }}
        {...register("botcheck")}
      />

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Your email address
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message?.toString() ?? "Invalid email"}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Topic
        </label>
        <select
          id="topic"
          {...register("topic", { required: "Please select a topic" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a topic</option>
          <option value="token-creation">Token Creation</option>
          <option value="account">Account Management</option>
          <option value="technical">Technical Support</option>
          <option value="billing">Billing</option>
          <option value="other">Other</option>
        </select>
        {errors.topic && (
          <p className="text-red-500 text-sm mt-1">
            {errors.topic.message?.toString() ?? "Invalid topic"}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          {...register("subject", { required: "Subject is required" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">
            {errors.subject.message?.toString()}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message", { required: "Message is required" })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.message.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          {...register("terms", {
            required: "You must agree to the terms",
          })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="terms"
          className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
        >
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-500 text-sm mt-1">
          {errors.terms.message?.toString() ?? "Invalid terms"}
        </p>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <svg
            className="w-5 h-5 mx-auto text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Send message"
        )}
      </button>

      {isSuccess && (
        <div className="text-green-500 mt-4">
          <p>{message}</p>
        </div>
      )}

      {!isSuccess && message && (
        <div className="text-red-500 mt-4">
          <p>{message}</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
