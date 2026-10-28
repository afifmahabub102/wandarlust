import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    ArrowLeft,
    MapPin,
    Star,
    CalendarDays,
    Check,
} from 'lucide-react';
import { getDestination } from '@/app/lib/db';
import EditModal from '@/app/components/EditModal';
import { DeleteModal } from '@/app/components/DeleteModal';

// const getDestination = async (id) => {
//     const res = await fetch(`http://localhost:5000/destinations/${id}`, {
//         cache: 'no-store',
//     });
//     if (!res.ok) return null;
//     return res.json();
// };

const defaultHighlights = [
    'Guided local sightseeing',
    'Comfortable accommodation',
    'Authentic local food experience',
    'Professional tour guide',
    'Photo-worthy scenic spots',
];

const DestinationDetails = async ({ params }) => {
    const { id } = await params; // Next 15+ e params Promise
    const destination = await getDestination(id); 
    if (!destination) notFound();

    const {
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description,
        rating = 4.9,
        reviews = 234,
        highlights = defaultHighlights,
    } = destination;

    return (
        <main className="mx-auto max-w-5xl px-4 py-6">
            {/* Top bar */}
            <div className="mb-4 flex items-center justify-between">
                <Link
                    href="/destinations"
                    className="flex items-center gap-2 text-sm text-[#6C696D] hover:text-black"
                >
                    <ArrowLeft size={14} />
                    Back to Destinations
                </Link>

                <div className="flex items-center gap-2">

                    <EditModal id={id} destination={destination}></EditModal> 
                    <DeleteModal destination={destination}></DeleteModal> 
 
                </div>
            </div>

            {/* Hero image */}
            <div className="relative h-55 w-full overflow-hidden sm:h-75 lg:h-95">
                <Image
                    src={imageUrl}
                    alt={destinationName}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                />
            </div>

            <hr className="my-8 border-gray-100" />

            {/* Content */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
                {/* Left */}
                <section>
                    <div className="flex items-center gap-1 text-xs text-[#6C696D]">
                        <MapPin size={12} />
                        <span>{country}</span>
                    </div>

                    <h1 className="mt-1 text-4xl font-medium text-[#0C0B0B]">
                        {destinationName}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                            <Star size={13} className="fill-[#1E9E35] text-[#1E9E35]" />
                            <span className="font-semibold">{rating}</span>
                            <span className="text-[#6C696D]">({reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CalendarDays size={13} />
                            <span>{duration}</span>
                        </div>
                        <span className="rounded-full bg-[#EDFCFF] px-2 py-0.5 text-[#15A1BF]">
                            {category}
                        </span>
                    </div>

                    {/* Overview */}
                    <h2 className="mt-8 text-xl font-medium">Overview</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#6C696D]">
                        {description}
                    </p>

                    {/* Highlights */}
                    <h2 className="mt-8 text-xl font-medium">Highlights</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#6C696D]">
                        {description}
                    </p>

                    <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                        {highlights.map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-2 text-xs text-[#6C696D]"
                            >
                                <Check size={14} className="text-[#1E9E35]" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Right: booking card */}
                <aside className="h-fit rounded border border-gray-100 bg-white p-4 shadow-md lg:sticky lg:top-6">
                    <p className="text-xs text-[#6C696D]">Starting from</p>
                    <p className="text-3xl font-medium text-[#15A1BF]">${price}</p>
                    <p className="text-xs text-[#6C696D]">per person</p>

                    <input
                        type="date"
                        defaultValue={departureDate}
                        className="mt-6 w-full rounded bg-gray-50 px-3 py-2.5 text-xs outline-none"
                    />

                    <button
                        type="button"
                        className="mt-5 w-full bg-[#15A1BF] py-2.5 text-xs font-medium text-white hover:opacity-90"
                    >
                        Book Now →
                    </button>

                    <ul className="mt-4 space-y-1.5">
                        {[
                            'Free cancellation up to 7 days',
                            'Travel insurance included',
                            '24/7 customer support',
                        ].map((text) => (
                            <li
                                key={text}
                                className="flex items-center gap-2 text-[10px] text-[#6C696D]"
                            >
                                <Check size={12} className="text-[#1E9E35]" />
                                {text}
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </main>
    );
};

export default DestinationDetails;