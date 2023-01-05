import { useAuthContext } from "../../hooks/useAuthContext";
import { useModalContext } from "../../hooks/useModalContext";
import { useCollection } from "../../hooks/useCollection";

function Grid(props) {
  const { user } = useAuthContext();
  const {dispatch} = useModalContext();

  const { documents: images, error } = useCollection(
    "images",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );
  return (
    <>
      {error && (
        <div
          className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Error! </span>
          {error}
        </div>
      )}
      {images && (
        <div className="grid grid-flow-row-dense gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8">
          {images.map((img) => (
            <div key={img.id} className="relative">
              <img
                src={img.url}
                className="rounded-2xl object-cover h-full w-full"
                alt={img.label}
              />
              <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[rgba(0,0,0,0.4)] bg-gradient-to-b from-gray-800 opacity-0 hover:cursor-pointer hover:opacity-100 transition duration-300 ease-in-out">
                <div className="flex flex-col justify-between p-4 h-full font-montserrat">
                  <div className="self-end">
                    <button onClick={() => dispatch({type:'SHOW_DELETE', payload:{imageId: img.id, imageUrl:img.url}})} className="text-red-600 text-sm tracking-wide font-semibold border border-red-600 rounded-[38px] py-1 px-2">delete</button>
                  </div>
                  <p className="text-white font-medium text-sm leading-5">
                    {img.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Grid;
