import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";


function Grid(props) {
  const { user } = useAuthContext();

  const { documents: images, error } = useCollection('images',["uid","==", user.uid]);
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
            <div key={img.id}>
              <img
                src={img.url}
                className="rounded-2xl"
                alt={img.label}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Grid;
