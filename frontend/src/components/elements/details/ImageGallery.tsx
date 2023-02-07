import { Tab } from "@headlessui/react";
import { classNames } from "@/lib/class-names";

type Props = {
  children: Array<string> | undefined;
  alt: string | undefined;
};

const ImageGallery = ({ children, alt }: Props) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-sm sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-5 gap-6">
          {children?.map((picture, index) => (
            <Tab
              key={index}
              className="relative flex h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
            >
              {({ selected }) => (
                <>
                  <span className="absolute inset-0 overflow-hidden">
                    <img
                      src={picture}
                      alt={alt}
                      className="h-full w-full object-cover object-center"
                    />
                  </span>
                  <span
                    className={classNames(
                      selected
                        ? "ring-indigo-100"
                        : "ring-transparent",
                      "pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
        {children?.map((picture, index) => (
          <Tab.Panel key={index}>
            <img
              src={picture}
              className="h-full w-full object-cover object-center"
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ImageGallery;