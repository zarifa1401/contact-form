import ContactForm from "@/components/ContactForm";
import MessagesPreview from "@/components/MessagesPreview";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
              Week 15 · Day 3 Lab
            </span>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-6xl">
              Contact Form with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Next.js API
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Build a real form that sends data to a Next.js API route.
              Practice controlled inputs, client-side validation,
              POST requests, server-side validation, and JSON responses.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#contact-form"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Start the Lab
              </a>

              <a
                href="/api/contact"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                View GET API
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Blur Effects */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl"></div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-form"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/30 dark:text-indigo-300">
            Mini Project
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
            Send a Message
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Test your form validation and API integration skills.
          </p>
        </div>

        <ContactForm />
      </section>

      {/* Messages Preview Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-white/20 bg-white/70 p-8 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <MessagesPreview />
        </div>
      </section>
    </main>
  );
}