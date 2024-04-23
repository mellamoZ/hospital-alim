import Image from "next/image";
import React from "react";

const About = () => {
  const coreValues = [
    {
      id: 1,
      title: "Partnership and Collaboration",
    },
    {
      id: 2,
      title: "Quality and Excellence",
    },
    {
      id: 3,
      title: "Participatory and Ownership",
    },
    {
      id: 4,
      title: "Professional Ethics and Respecting the Law",
    },
    {
      id: 5,
      title: "Sustainability and Self-Reliance",
    },
    {
      id: 6,
      title: "Client-Centred Care and Safety",
    },
    {
      id: 7,
      title: "Confidentiality",
    },
  ];

  return (
    <div>
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={"/about-images/about-page-hero.jpg"}
            alt="all donation accounts"
            sizes="600"
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 text-white">
          <h1 className="text-center text-3xl font-bold md:text-5xl">
            Rehabilitative and supportive services for all patients on referral
            basis
          </h1>
        </div>
      </div>
      <div className="mx-4 my-8 rounded-lg bg-blue-100 p-8 shadow-md md:mx-auto md:max-w-2xl lg:max-w-4xl">
        <h2 className="mb-6 text-center text-4xl font-semibold text-gray-800">
          At the center of Jigjiga City
        </h2>
        <p className="mb-8 text-center text-lg text-gray-700">
          JigJiga University, Sheik Hassen Yabare Comprehensive Specialized
          Hospital is the first and largest specialized hospital and medical
          school linked in Somali Regional State of Ethiopia. It is at the
          center of Jigjiga city, located 610 Km away from Addis Ababa in the
          Eastern part of Ethiopia.
        </p>
      </div>

      <div className="bg-gray-100 py-12 text-center">
        <h2 className="mb-8 text-4xl font-bold text-gray-800">Core Values</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {coreValues.map((value) => (
            <div
              key={value.id}
              className="mb-6 rounded-lg bg-blue-200 p-8 text-center shadow-md"
            >
              <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                {value.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-4xl font-bold text-gray-800">
            {"THE HOSPITAL'S SERVICES"}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Bed Capacity
              </h3>
              <p className="text-gray-600">
                The hospital has up to 355 beds capacity (currently 291
                functional beds).
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Operation Theatres
              </h3>
              <p className="text-gray-600">
                4 major operation theatres (under renovation and upgrading to 8
                major theatres).
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Cesarean Section (C/S) Rooms
              </h3>
              <p className="text-gray-600">
                Two operational theatres for Cesarean Section.
              </p>
            </div>
          </div>

          <div className="mt-8 p-5 text-gray-700">
            <p>
              The hospital is designed to provide tertiary care services related
              to preventive, diagnostic, curative, therapeutic, rehabilitative,
              and support services for all patients on a referral basis.
              Currently, it also provides primary and secondary care services to
              all citizens.
            </p>

            <p className="mt-4">
              It undertakes training, teaching, and research activities for
              Jigjiga University, College of Medicine and Health Science, which
              include undergraduate and postgraduate students in medicine and
              other health science disciplines. The hospital also conducts
              clinical attachments training for students from other health
              science colleges in the region.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="mb-8 text-4xl font-bold text-gray-800">
            Structure of SHYCRH
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-gray-600">
                The Hospital is led by the Chief Executive Director (CED), at
                the rank of vice president of Jigjiga University, accountable to
                the university president.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-gray-600">
                The directors for chief academic affairs and research (CARD),
                chief clinical services director (CCD)
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-gray-600">
                Chief administrative and business development director (CADD)
                and Directors of different directorates of the hospital &
                College of MHS support the activities of the CED.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Image
              src={"/about-images/structure.png"}
              alt="all donation accounts"
              sizes="600"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* map */}
      <div className="flex justify-center">
        <iframe
          className="w-full border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.744427978377!2d42.783166210613295!3d9.355869290680433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x162e3732d11fc969%3A0x7f7dd5b7603f2085!2sJigjiga%20Sheik%20Hassen%20Yabare%20Referral%20Hospital!5e0!3m2!1sen!2sso!4v1708571652588!5m2!1sen!2sso"
          width="800"
          height="600"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default About;
