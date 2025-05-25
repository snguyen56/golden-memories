function DemoNotice() {
  return (
    <aside
      role="note"
      aria-label="Demo version notice"
      className="mt-20 px-4 lg:mt-10"
    >
      <div className="mx-auto flex w-full max-w-150 items-start gap-2 rounded-lg border p-4">
        <div className="pt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Notice:</h2>
          <p>
            You are viewing a demo version of this website. Certain features are
            simulated and may not reflect real data or functionality.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default DemoNotice;
