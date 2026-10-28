import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MapPin, CalendarDays, Star, ArrowUpRight } from 'lucide-react';

const Destination = ({ destination }) => {
    const {
        destinationName,
        _id,
        country,
        price,
        duration,
        imageUrl,
        rating = 4.5, // DB te rating field nai, tai default 4.5
    } = destination;

    return (
        <div className="w-full">
            {/* Image + Rating badge */}
            <div className="relative w-full aspect-3/2 overflow-hidden rounded-md">
                <Image
                    src={imageUrl}
                    alt={destinationName}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded bg-white/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                    <span>{rating}</span>
                    <Star size={12} className="fill-black text-black" />
                </div>
            </div>

            {/* Info */}
            <div className="mt-3 space-y-1.5">
                {/* Country */}
                <div className="flex items-center gap-1 text-xs text-[#6C696D]">
                    <MapPin size={12} />
                    <span>{country}</span>
                </div>

                {/* Name + Price */}
                <div className="flex items-baseline justify-between">
                    <h1 className="text-base font-medium text-[#0C0B0B]">
                        {destinationName}
                    </h1>
                    <p className="text-base font-medium text-[#0C0B0B]">
                        ${price}
                        <span className="text-[10px] font-normal text-[#6C696D]">
                            /Person
                        </span>
                    </p>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1 text-xs text-[#6C696D]">
                    <CalendarDays size={12} />
                    <span>{duration}</span>
                </div>

                {/* Book now */}
                <Link
                    href={`/destinations/${_id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#15A1BF] underline underline-offset-2"
                >
                    BOOK NOW
                    <ArrowUpRight size={12} />
                </Link>
            </div>
        </div>
    );
};

export default Destination;