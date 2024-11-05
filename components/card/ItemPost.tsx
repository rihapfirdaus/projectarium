import Image from "next/image";

export default function ItemPost() {
  const images: string[] = ["/blank_project.jpg"];
  return (
    <div className="bg-white flex gap-2 p-2 select-none max-w-96 rounded-xl border shadow justify-center items-center">
      <Image
        draggable="false"
        className={`rounded-2xl object-cover w-24 h-24`}
        src={images[0]}
        alt="project image"
        width={1920}
        height={1080}
      />

      <div className={`flex flex-col gap-2`}>
        <div className="flex gap-2 self-end">
          {["AI"].map((item, index) => (
            <p
              key={index}
              className="bg-primary-darker py-1 px-4 text-white rounded-3xl"
            >
              {item}
            </p>
          ))}
        </div>
        <p className="px-2 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nihil
          sint neque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Rem nostrum ipsa sequi illum optio. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Facilis nihil sint neque. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Rem nostrum ipsa sequi
          illum optio. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Facilis nihil sint neque. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Rem nostrum ipsa sequi illum optio.
        </p>
      </div>
    </div>
  );
}
