import { useForm } from "react-hook-form";

export default function PostModalForm({ onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-200 rounded-lg shadow-xl w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Create Post</h2>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            onClose();
          })}
        >
          <div>
            <input
              type="text"
              placeholder="Title"
              className="shadow-2xl bg-white p-2 rounded-lg outline-0"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Min 3 chars" },
              })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Body"
              className="shadow-2xl bg-white p-2 rounded-lg outline-0"
              {...register("body", {
                required: "Body is required",
                minLength: { value: 10, message: "Min 10 chars" },
              })}
            />
            {errors.body && (
              <p className="text-red-500">{errors.body.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-amber-900 text-white py-2 rounded-lg hover:bg-amber-800"
          >
            Save Post
          </button>
        </form>
      </div>
    </div>
  );
}
