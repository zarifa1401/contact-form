async function getMessages() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/contact`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.messages || [];
  } catch (error) {
    return [];
  }
}

export default async function MessagesPreview() {
  const messages = await getMessages();

  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-1 text-sm font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-300">
          GET Example
        </span>

        <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
          Recent Demo Messages
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
          This section reads data from the same API route using a GET request.
          It helps students compare reading data and submitting data.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-lg backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
            No demo messages available.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Start the development server and submit a message to see results
            here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {messages.slice(0, 3).map((message) => (
            <article
              key={message.id}
              className="group rounded-3xl border border-white/20 bg-white/70 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="mb-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                    Message
                  </span>

                  <span className="text-sm text-slate-500">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                  {message.subject}
                </h3>

                <p className="line-clamp-4 text-slate-600 dark:text-slate-400">
                  {message.message}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {message.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}