import { Post } from "@/models/postSchema";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  post: Post;
};

function ShareButton({ isOpen, setIsOpen, post }: Props) {
  const [copying, setCopying] = useState(false);

  const URL = encodeURIComponent(post.url);
  const text = encodeURIComponent(post.name);
  const socialLinks = [
    {
      name: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-full"
          viewBox="0 0 448 512"
        >
          <path
            fill="black"
            d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"
          ></path>
        </svg>
      ),
      shareURL: `https://twitter.com/intent/tweet?url=${URL}&text=${text}`,
      color: "black",
    },
    {
      name: "Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-full"
          viewBox="0 0 24 24"
        >
          <path
            d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8.615v-6.96h-2.338v-2.725h2.338v-2c0-2.325 1.42-3.592 3.5-3.592c.699-.002 1.399.034 2.095.107v2.42h-1.435c-1.128 0-1.348.538-1.348 1.325v1.735h2.697l-.35 2.725h-2.348V21H20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"
            fill="#1877F2"
          ></path>
        </svg>
      ),
      shareURL: `https://www.facebook.com/sharer/sharer.php?u=${URL}`,
    },
    {
      name: "Reddit",
      icon: (
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full"
          viewBox="0 0 24 24"
        >
          <title>Reddit</title>
          <path
            d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z"
            fill="#FF4500"
          />
        </svg>
      ),
      shareURL: `https://www.reddit.com/submit?url=${URL}&title=${text}`,
    },
    {
      name: "Email",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
      shareURL: `mailto:?subject=${text}&body=${post.url}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.url);
      setCopying(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCopying(false);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  if (isOpen)
    return (
      <div
        className="fixed inset-0 grid place-items-center bg-black/50"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        <div className="relative flex flex-col justify-center gap-6 rounded-xl bg-white p-10 text-center md:w-125">
          <div>
            <h3 className="text-2xl font-bold text-black">Share this post</h3>
            <p>Share this post with your friends and family</p>
          </div>
          <div className="flex justify-center gap-5 p-1">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                title={social.name}
                href={social.shareURL}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="relative mt-5 flex rounded-lg border p-1">
            <label htmlFor="copy_name" className="absolute -top-7">
              Copy link to image
            </label>
            <input
              type="text"
              name="copy_name"
              id="copy_name"
              value={post.url}
              readOnly
              className="grow p-1 outline-0"
            />
            <button
              type="button"
              disabled={copying}
              className={`${copying ? "cursor-not-allowed" : "cursor-pointer"} rounded-lg bg-black p-2 text-white hover:bg-zinc-800`}
              onClick={handleCopy}
            >
              {copying ? (
                "Copied!"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="button"
            aria-label="Close Share Modal"
            className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-zinc-100"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
}

export default ShareButton;
