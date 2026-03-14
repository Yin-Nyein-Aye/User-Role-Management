import React, { useState } from "react";
import breadImg from "../assets/homepage1.jpg";
import Portal from "./Portal";

function Card({ post, handleDeletePost, handleUpdatePost }) {
  let [title, setTitle] = useState(post?.title || "");
  let [context, setContext] = useState(post?.body || "");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="shadow-lg py-3 list-none">
      <img className="w-full" src={breadImg} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {post.title.length > 20
            ? post.title.substring(0, 20) + "..."
            : post.title}
        </div>
        <p className="text-black-700 text-base">
          {post.body.length > 100
            ? post.body.substring(0, 100) + "..."
            : post.body}
        </p>
      </div>

      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black-700 mr-2 mb-2">
          #winter
        </span>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-600 text-white px-2 py-1 rounded-2xl"
        >
          Update
        </button>
        <button
          onClick={() => handleDeletePost(post.id)}
          className="bg-red-700 text-white px-2 py-1 rounded-2xl"
        >
          Delete
        </button>
        {isOpen && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-gray-200 rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                  ✕
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">
                  Edit Post
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdatePost(post.id, title, context);
                  }}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="shadow-md bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-900"
                  />

                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Body"
                    className="shadow-md bg-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-amber-900 resize-none h-40"
                  />

                  <button
                    type="submit"
                    className="bg-amber-900 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors"
                  >
                    Update Post
                  </button>
                </form>
              </div>
            </div>
          </Portal>
        )}
      </div>
    </li>
  );
}
export default React.memo(Card);
