


/*
import React from 'react';

function CategoryCard({ data }) {
  if (!data) return null;

  return (
    <div className='min-w-[110px] md:min-w-[120px] 
    rounded-xl bg-[#f5f5f5] 
    p-2 flex flex-col items-center 
    shadow-sm hover:shadow-md transition cursor-pointer'>

      
      <div className='w-full h-[90px] rounded-lg overflow-hidden bg-white'>
        <img
          src={data.image}
          alt={data.name}
          className='w-full h-full object-cover'
        />
      </div>

      
      <p className='text-[13px] text-gray-700 mt-2 font-medium text-center'>
        {data.name}
      </p>

    </div>
  );
}

export default CategoryCard;*/

/*
import React from 'react';

function CategoryCard({ name,image }) {
  if (!data) return null;

  return (
    <div
      className="
      w-[120px] h-[120px] md:w-[180px] md:h-[180px]
      rounded-2xl
      border-2 border-[#ff4d2d]
      shrink-0
      overflow-hidden
      bg-white
      shadow-xl shadow-gray-200
      hover:shadow-lg
      transition-shadow
      relative
    "
    >
     
      <img
        src={image}
        alt=""
        className="
        w-full h-full object-cover
        transition-transform duration-300
        hover:scale-110
        "
      />

     
      <div
        className="
        absolute bottom-0 left-0 w-full
        bg-white/70 backdrop-blur-sm
        px-2 py-1
        text-center
        text-sm font-medium text-gray-800
      "
      >
        {name}
      </div>
    </div>
  );
}

export default CategoryCard;*/




import React from 'react';

function CategoryCard({ name, image, onClick }) {
  if (!name && !image) return null; // ✅ fixed

  return (
    <div
      className="
      w-[120px] h-[120px] md:w-[180px] md:h-[180px]
      rounded-2xl
      border-2 border-[#ff4d2d]
      shrink-0
      overflow-hidden
      bg-white
      shadow-xl shadow-gray-200
      hover:shadow-lg
      transition-shadow
      relative
    " onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="
        w-full h-full object-cover
        transition-transform duration-300
        hover:scale-110
        "
      />

      <div
        className="
        absolute bottom-0 left-0 w-full
        bg-white/70 backdrop-blur-sm
        px-2 py-1
        text-center
        text-sm font-medium text-gray-800
      "
      >
        {name}
      </div>
    </div>
  );
}

export default CategoryCard;