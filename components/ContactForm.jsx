"use client";

import { useState } from "react";
import { validateContactForm } from "@/utils/validation";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [lastSubmission, setLastSubmission] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatus({ type: "error", message: "Check the fields and try again." });
      return;
    }

    setStatus({ type: "loading", message: "Sending your message..." });
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors || {});
        setStatus({
          type: "error",
          message: result.message || "Something went wrong.",
        });
        return;
      }

      setLastSubmission(result.data);
      setFormData(initialForm);
      setStatus({ type: "success", message: result.message });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Make sure the Next.js dev server is running.",
      });
    }
  }

  const isLoading = status.type === "loading";

  return (
  <div className="grid gap-8 lg:grid-cols-2">
    {/* Contact Form */}
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Send a Message
        </h2>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Fill out the form below and submit it to the Next.js API.
        </p>
      </div>

      {/* Name */}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Full Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Example: Sana Ahmadi"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        {errors.name && (
          <p className="mt-2 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="sana@example.com"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Subject */}
      <div className="mb-5">
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Subject
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is your message about?"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        {errors.subject && (
          <p className="mt-2 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          placeholder="Write at least 10 characters..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        {errors.message && (
          <p className="mt-2 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Status */}
      {status.message && (
        <div
          className={`mb-5 rounded-xl p-4 text-sm font-medium ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : status.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>
    </form>

    {/* API Info Panel */}
    <aside className="rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
      <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm">
        API Route
      </span>

      <h2 className="mt-5 text-3xl font-bold">
        What happens after submit?
      </h2>

      <ol className="mt-6 space-y-4 text-white/90">
        <li>✓ The client form validates the fields.</li>
        <li>✓ The browser sends a POST request to /api/contact.</li>
        <li>✓ The API route validates again on the server.</li>
        <li>✓ The server returns a JSON success or error response.</li>
      </ol>

      <div className="mt-8 rounded-2xl bg-black/20 p-4 backdrop-blur-md">
        <p className="mb-2 text-sm uppercase tracking-wider text-white/70">
          Endpoint
        </p>

        <code className="font-mono text-lg">
          POST /api/contact
        </code>
      </div>

      {lastSubmission && (
        <div className="mt-6 rounded-2xl bg-white/10 p-5 backdrop-blur-md">
          <p className="mb-2 text-sm text-white/70">
            Last message saved
          </p>

          <p className="font-semibold">
            {lastSubmission.name}
          </p>

          <p className="text-white/90">
            {lastSubmission.subject}
          </p>
        </div>
      )}
    </aside>
  </div>
);
}
